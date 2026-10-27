import { sendWelcome } from "@/lib/auth/welcome";
import { after, NextRequest } from "next/server";
import { authRoute } from "@/lib/auth/routeClient";
import { completeRegistration } from "@/lib/auth/registration";\nimport { isEmailSignup } from "@/lib/auth/policy";
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
    return route.redirect(\n      completed ? "/dashboard" : isEmailSignup(user) ? "/signup?verify=email" : "/signup?complete=1"\n    );
  } catch {
    return route.redirect("/auth/error?reason=account_setup");
  }
}
