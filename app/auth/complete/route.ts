import { sendWelcome } from "@/lib/auth/welcome";
import { after, NextRequest } from "next/server";
import { authRoute } from "@/lib/auth/routeClient";
import { completeRegistration } from "@/lib/auth/registration";
import { isEmailSignup } from "@/lib/auth/policy";
export async function GET(request: NextRequest) {
  const route = authRoute(request);
  try {
    const {
      data: { user },
      error,
    } = await route.supabase.auth.getUser();
    if (error || !user) return route.redirect("/login?error=session_expired");
    const completed = await completeRegistration(user, false);
    if (completed)
      after(() =>
        sendWelcome(user).catch(() =>
          console.error("Welcome delivery unavailable"),
        ),
      );
    if (completed) return route.redirect("/dashboard");
    if (isEmailSignup(user)) return route.redirect("/signup?verify=email");
    // A Google-only provisional Supabase identity is not a GAHN account.
    const { error: signOutError } = await route.supabase.auth.signOut({
      scope: "local",
    });
    return route.redirect(
      signOutError ? "/auth/error?reason=account_setup" : "/login?error=signup_required",
    );
  } catch {
    return route.redirect("/auth/error?reason=account_setup");
  }
}
