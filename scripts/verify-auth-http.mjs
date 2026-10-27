import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
const base = "http://127.0.0.1:3149";
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3149",
  ],
  { stdio: "ignore" },
);
let checks = 0;
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(base);
      ready = true;
      break;
    } catch {
      await delay(250);
    }
  }
  assert(ready);
  for (const route of [
    "/login",
    "/signup",
    "/update-password",
    "/auth/error",
  ]) {
    assert.equal((await fetch(base + route)).status, 200);
    checks++;
  }
  for (const [route, target] of [
    ["/?code=example", "/auth/callback?code=example"],
    ["/auth/callback", "/auth/error"],
    ["/auth/callback?token_hash=fake&type=invalid", "/auth/error"],
    ["/auth/callback?error=access_denied", "/auth/error"],
    ["/auth/complete", "/login?error=session_expired"],
    ["/dashboard", "/login?error=session_expired"],
    ["/dashboard/nested", "/login?error=session_expired"],
  ]) {
    const response = await fetch(base + route, { redirect: "manual" });
    assert.equal(new URL(response.headers.get("location"), base).href, base + target);
    assert.match(response.headers.get("cache-control"), /no-store/);
    checks += 2;
  }
  let response = await fetch(base + "/api/auth/registration");
  assert.deepEqual(await response.json(), { authenticated: false });
  checks++;
  response = await fetch(base + "/auth/google", {
    method: "POST",
    headers: { origin: "https://evil.example" },
    body: '{"intent":"signup"}',
  });
  assert.equal(response.status, 403);
  checks++;
  response = await fetch(base + "/auth/google", {
    method: "POST",
    headers: { origin: base, "Content-Type": "application/json" },
    body: '{"intent":"not-valid"}',
  });
  assert.equal(response.status, 400);
  checks++;
  // signInWithOAuth only constructs a URL here; no provider request is followed.
  response = await fetch(base + "/auth/google", {
    method: "POST",
    headers: { origin: base, "Content-Type": "application/json" },
    body: '{"intent":"signup"}',
  });
  assert.equal(response.status, 200);
  const provider = new URL((await response.json()).url);
  assert.equal(
    provider.searchParams.get("redirect_to"),
    base + "/auth/callback",
  );
  assert.equal(provider.searchParams.get("provider"), "google");
  assert.match(response.headers.get("set-cookie"), /gahn-auth-intent=signup/);
  assert.match(response.headers.get("set-cookie"), /HttpOnly/);
  checks += 5;
  response = await fetch(base + "/api/auth/registration", {
    method: "POST",
    headers: { origin: base, "Content-Type": "application/json" },
    body: '{"confirmSignup":true}',
  });
  assert.equal(response.status, 401);
  checks++;
  console.log(
    JSON.stringify({
      httpChecks: checks,
      status: "passed",
      providerRequestsFollowed: 0,
    }),
  );
} finally {
  server.kill("SIGTERM");
}
