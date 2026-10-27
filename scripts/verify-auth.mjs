// Real route handlers and NextResponse cookies, isolated Supabase responses.
// No production identities, email delivery, or Google sessions are used.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import ts from "typescript";
const require = createRequire(import.meta.url);
const next = require("next/server");
const root = process.cwd();
let state;
const user = (provider = "google") => ({
  id: "user-1",
  email: "learner@example.test",
  email_confirmed_at: "2026-01-01",
  app_metadata: { provider },
  user_metadata: { full_name: "Existing name" },
  is_anonymous: false,
});
function reset(extra = {}) {
  state = {
    user: user(),
    registered: true,
    dbError: false,
    exchangeError: false,
    otpError: false,
    writes: [],
    ...extra,
  };
}
function db(table) {
  return {
    select() {
      return this;
    },
    eq() {
      return this;
    },
    async maybeSingle() {
      return {
        data: state.dbError
          ? null
          : table === "account_registrations"
            ? state.registered
              ? { id: state.user?.id }
              : null
            : { id: state.user?.id },
        error: state.dbError ? { code: "DB_DOWN" } : null,
      };
    },
    async upsert(value, options) {
      state.writes.push({ table, value, options });
      if (!state.dbError && table === "account_registrations")
        state.registered = true;
      return { error: state.dbError ? { code: "DB_DOWN" } : null };
    },
  };
}
const originalLoad = Module._load;
Module._load = function (name, parent, isMain) {
  if (name === "@/lib/supabaseAdmin") return { supabaseAdmin: { from: db } };
  if (name === "@/lib/auth/welcome") return { sendWelcome: async () => {} };
  if (name === "next/server") return { ...next, after: () => {} };
  if (name === "next/headers")
    return { cookies: async () => ({ getAll: () => [], set: () => {} }) };
  if (name === "@supabase/ssr")
    return {
      createServerClient: (_url, _key, options) => ({
        from: db,
        auth: {
          getUser: async () => {
            if (state.refresh)
              options.cookies.setAll(
                [
                  {
                    name: "session",
                    value: "refreshed",
                    options: { path: "/" },
                  },
                ],
                { "Cache-Control": "private, no-store" },
              );
            return {
              data: { user: state.user },
              error: state.userError ? { code: "invalid" } : null,
            };
          },
          exchangeCodeForSession: async () => {
            options.cookies.setAll([
              {
                name: "session",
                value: "verified",
                options: { path: "/", sameSite: "lax" },
              },
            ]);
            return {
              data: {
                session: state.exchangeError ? null : {},
                redirectType: state.recovery ? "recovery" : null,
              },
              error: state.exchangeError ? { code: "expired" } : null,
            };
          },
          verifyOtp: async () => ({
            data: { session: state.otpError ? null : {} },
            error: state.otpError ? { code: "expired" } : null,
          }),
          signInWithOAuth: async (params) => {
            state.oauth = params;
            options.cookies.setAll([
              { name: "pkce", value: "verifier", options: { path: "/" } },
            ]);
            return {
              data: { url: "https://accounts.google.com/test" },
              error: null,
            };
          },
        },
      }),
    };
  if (name.startsWith("@/")) name = path.join(root, name.slice(2));
  return originalLoad.call(this, name, parent, isMain);
};
require.extensions[".ts"] = (module, filename) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
    filename,
  );
const callback = require("../app/auth/callback/route.ts");
const complete = require("../app/auth/complete/route.ts");
const registration = require("../app/api/auth/registration/route.ts");
const google = require("../app/auth/google/route.ts");
const { proxy } = require("../proxy.ts");
const { getAuthenticatedUser } = require("../lib/serverAuth.ts");
const policy = require("../lib/auth/policy.ts");
let checks = 0;
const request = (pathname, options = {}) =>
  new next.NextRequest("https://www.gahnai.com" + pathname, options);
function destination(response, pathname) {
  assert.equal(
    response.headers.get("location"),
    "https://www.gahnai.com" + pathname,
  );
  assert.match(response.headers.get("cache-control"), /no-store/);
  checks++;
}
reset();
destination(
  await callback.GET(request("/auth/callback?code=good")),
  "/dashboard",
);
reset();
let response = await callback.GET(
  request("/auth/callback?code=good&next=https://evil.example"),
);
destination(response, "/dashboard");
assert.equal(response.cookies.get("session").value, "verified");
checks++;
for (const suffix of [
  "",
  "?code=bad",
  "?error=access_denied",
  "?token_hash=bad&type=invalid",
]) {
  reset({ exchangeError: true });
  destination(
    await callback.GET(request("/auth/callback" + suffix)),
    "/auth/error",
  );
  assert.equal(state.writes.length, 0);
  checks++;
}
reset({ user: null });
destination(
  await callback.GET(request("/auth/callback?code=good")),
  "/auth/error",
);
reset({ user: { ...user(), is_anonymous: true } });
destination(
  await callback.GET(request("/auth/callback?code=good")),
  "/auth/error",
);
reset({ user: { ...user(), email_confirmed_at: null } });
destination(
  await callback.GET(request("/auth/callback?code=good")),
  "/auth/error",
);
reset({ recovery: true });
destination(
  await callback.GET(request("/auth/callback?code=recovery")),
  "/update-password",
);
assert.equal(state.writes.length, 0);
checks++;
reset();
destination(
  await callback.GET(
    request("/auth/callback?token_hash=verified&type=recovery"),
  ),
  "/update-password",
);
reset({ otpError: true });
destination(
  await callback.GET(
    request("/auth/callback?token_hash=expired&type=recovery"),
  ),
  "/auth/error",
);
reset({ registered: false });
destination(
  await callback.GET(request("/auth/callback?code=good&intent=signup")),
  "/signup?complete=1",
);
assert.equal(state.writes.length, 0);
checks++;
reset({ registered: false });
response = await callback.GET(
  request("/auth/callback?code=good", {
    headers: { cookie: "gahn-auth-intent=signup" },
  }),
);
destination(response, "/dashboard");
assert.equal(response.cookies.get("gahn-auth-intent").value, "");
assert(state.registered);
checks += 2;
reset({ registered: false, user: user("email") });
destination(
  await callback.GET(request("/auth/callback?token_hash=good&type=signup")),
  "/dashboard",
);
assert.equal(state.writes[1].value.method, "email");
checks++;
reset({
  registered: false,
  user: {
    ...user(),
    user_metadata: { registration_complete: true, provider: "email" },
  },
});
destination(
  await complete.GET(request("/auth/complete")),
  "/signup?complete=1",
);
reset({ dbError: true });
destination(
  await callback.GET(request("/auth/callback?code=good")),
  "/auth/error?reason=account_setup",
);
reset();
destination(await complete.GET(request("/auth/complete")), "/dashboard");
assert(state.writes.every((w) => w.options.ignoreDuplicates));
checks++;
reset({ user: null });
destination(
  await complete.GET(request("/auth/complete")),
  "/login?error=session_expired",
);
reset({ registered: false });
destination(
  await complete.GET(request("/auth/complete")),
  "/signup?complete=1",
);
reset();
response = await proxy(request("/?code=good"));
destination(response, "/auth/callback?code=good");
assert.equal(response.headers.get("referrer-policy"), "no-referrer");
checks++;
for (const pathname of policy.ACCOUNT_PATHS) {
  reset({ user: null });
  destination(await proxy(request(pathname)), "/login?error=session_expired");
}
reset({ refresh: true });
response = await proxy(request("/login"));
destination(response, "/dashboard");
assert.equal(response.cookies.get("session").value, "refreshed");
checks++;
reset({ registered: false });
destination(await proxy(request("/dashboard")), "/signup?complete=1");
assert.equal((await proxy(request("/signup"))).headers.get("location"), null);
checks++;
reset({ registered: false, user: user("email") });
destination(await proxy(request("/dashboard")), "/auth/complete");
reset({ dbError: true });
destination(
  await proxy(request("/dashboard")),
  "/auth/error?reason=account_setup",
);
reset();
assert.equal(
  (await proxy(request("/dashboard"))).headers.get("location"),
  null,
);
checks++;
for (const registered of [true, false]) {
  reset({ registered });
  assert.equal(Boolean((await getAuthenticatedUser()).user), registered);
  checks++;
}
reset({ userError: true });
assert.equal((await getAuthenticatedUser()).user, null);
checks++;
for (const origin of [null, "https://evil.example"]) {
  reset();
  response = await google.POST(
    request("/auth/google", {
      method: "POST",
      headers: origin ? { origin } : {},
      body: JSON.stringify({ intent: "signup" }),
    }),
  );
  assert.equal(response.status, 403);
  checks++;
}
for (const intent of ["signup", "login"]) {
  reset();
  response = await google.POST(
    request("/auth/google", {
      method: "POST",
      headers: { origin: "https://www.gahnai.com" },
      body: JSON.stringify({ intent }),
    }),
  );
  assert.equal(response.status, 200);
  assert.equal(
    state.oauth.options.redirectTo,
    "https://www.gahnai.com/auth/callback",
  );
  assert.equal(response.cookies.get("gahn-auth-intent").httpOnly, true);
  assert.equal(response.cookies.get("pkce").value, "verifier");
  checks += 4;
}
reset({ registered: false });
response = await registration.POST(
  request("/api/auth/registration", {
    method: "POST",
    headers: { origin: "https://evil.example" },
    body: '{"confirmSignup":true}',
  }),
);
assert.equal(response.status, 403);
assert.equal(state.writes.length, 0);
checks += 2;
for (const confirmSignup of [false, true]) {
  reset({ registered: false });
  response = await registration.POST(
    request("/api/auth/registration", {
      method: "POST",
      headers: { origin: "https://www.gahnai.com" },
      body: JSON.stringify({ confirmSignup }),
    }),
  );
  assert.equal(response.status, confirmSignup ? 200 : 400);
  assert.equal(state.registered, confirmSignup);
  checks += 2;
}
reset({ user: null });
response = await registration.POST(
  request("/api/auth/registration", {
    method: "POST",
    headers: { origin: "https://www.gahnai.com" },
    body: '{"confirmSignup":true}',
  }),
);
assert.equal(response.status, 401);
checks++;
for (const url of [
  "https://evil.example",
  "https://www.gahnai.com.evil.example",
  "https://www.gahnai.com:9999",
]) {
  assert.equal(policy.authOrigin(new URL(url)), "https://www.gahnai.com");
  checks++;
}

reset();
assert.equal(policy.authRequestOrigin(new Request('http://localhost:3149/auth/callback', {headers:{host:'www.gahnai.com'}})), 'https://www.gahnai.com'); checks++;
assert.equal(policy.sameOriginPost(new Request('http://localhost:3149/auth/google', {headers:{host:'www.gahnai.com',origin:'https://evil.example'}})), false); checks++;

console.log(
  JSON.stringify(
    {
      checks,
      handlers: "passed",
      productionWrites: 0,
      realProviderFlows: "not exercised",
    },
    null,
    2,
  ),
);
