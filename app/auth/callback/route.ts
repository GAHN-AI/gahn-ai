import { after, NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { authRoute } from "@/lib/auth/routeClient";
import { AUTH_INTENT_COOKIE, authRequestOrigin, isEmailSignup } from "@/lib/auth/policy";
import { completeRegistration } from "@/lib/auth/registration";
import { sendWelcome } from "@/lib/auth/welcome";

const allowedTypes = new Set([
  "signup",
  "recovery",
  "email",
  "email_change",
  "invite",
  "magiclink",
]);
export async function GET(request: NextRequest) {
  const route = authRoute(request);
  const params = request.nextUrl.searchParams;
  const intent = request.cookies.get(AUTH_INTENT_COOKIE)?.value;
  function redirect(path: string) {
    const response = route.redirect(path);
    response.cookies.set(AUTH_INTENT_COOKIE, "", {
      path: "/",
      maxAge: 0,
      httpOnly: true,
      sameSite: "lax",
      secure: authRequestOrigin(request).startsWith("https://"),
    });
    return response;
  }
  try {
    if (params.has("error") || params.has("error_code"))
      return redirect("/auth/error");
    const code = params.get("code");
    const tokenHash = params.get("token_hash");
    const type = params.get("type");
    let recovery = params.get("next") === "/update-password";
    if (code) {
      const result = await route.supabase.auth.exchangeCodeForSession(code);
      if (result.error || !result.data.session) return redirect("/auth/error");
      // auth-js returns this verified flow marker at runtime (not in its public type).
      const data = result.data as typeof result.data & {
        redirectType?: string;
      };
      recovery ||= data.redirectType === "recovery";
    } else if (tokenHash && type && allowedTypes.has(type)) {
      const result = await route.supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: type as EmailOtpType,
      });
      if (result.error || !result.data.session) return redirect("/auth/error");
      recovery ||= type === "recovery";
    } else return redirect("/auth/error");
    const {
      data: { user },
      error,
    } = await route.supabase.auth.getUser();
    if (error || !user || !user.email_confirmed_at || user.is_anonymous)
      return redirect("/auth/error");
    if (recovery) return redirect("/update-password");
    // This endpoint only gets here after exchanging a valid one-time Auth
    // callback code/token. For email signups it is the confirmation proof.
    const registered = await completeRegistration(
      user, intent === "signup" || isEmailSignup(user),
    );
    if (!registered) return redirect("/signup?complete=1");
    after(() =>
      sendWelcome(user).catch(() =>
        console.error("Welcome delivery unavailable"),
      ),
    );
    return redirect("/dashboard");
  } catch {
    // Never print codes, cookies, email addresses, or provider error payloads.
    return redirect("/auth/error?reason=account_setup");
  }
}
