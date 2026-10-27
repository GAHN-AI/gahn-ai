import { sendWelcome } from "@/lib/auth/welcome";
import { after, NextRequest, NextResponse } from "next/server";
import { authRoute } from "@/lib/auth/routeClient";
import {
  completeRegistration,
  registrationStatus,
} from "@/lib/auth/registration";
import { isEmailSignup, sameOriginPost } from "@/lib/auth/policy";
export async function GET(request: NextRequest) {
  const route = authRoute(request);
  try {
    const {
      data: { user },
      error,
    } = await route.supabase.auth.getUser();
    if (error || !user)
      return route.finish(NextResponse.json({ authenticated: false }));
    return route.finish(
      NextResponse.json({
        authenticated: true,
        registered: await registrationStatus(route.supabase, user.id),
        requiresEmailVerification: isEmailSignup(user),
      }),
    );
  } catch {
    return route.finish(
      NextResponse.json(
        { error: "Account setup is temporarily unavailable." },
        { status: 503 },
      ),
    );
  }
}
export async function POST(request: NextRequest) {
  if (!sameOriginPost(request))
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 },
    );
  const route = authRoute(request);
  try {
    const {
      data: { user },
      error,
    } = await route.supabase.auth.getUser();
    if (error || !user || !user.email_confirmed_at)
      return route.finish(
        NextResponse.json(
          { error: "Please authenticate and verify your email first." },
          { status: 401 },
        ),
      );
    // This endpoint is only for completing a verified Google OAuth signup.
    // Email/password accounts complete exclusively through the one-time
    // verification link processed at /auth/callback.
    if (isEmailSignup(user))
      return route.finish(NextResponse.json(
        { error: "Verify your email using the confirmation link before signing in." },
        { status: 403 },
      ));
    const body = await request.json();
    if (body.confirmSignup !== true)
      return route.finish(
        NextResponse.json(
          { error: "Confirm signup to continue." },
          { status: 400 },
        ),
      );
    await completeRegistration(user, true);
    after(() =>
      sendWelcome(user).catch(() =>
        console.error("Welcome delivery unavailable"),
      ),
    );
    return route.finish(NextResponse.json({ destination: "/dashboard" }));
  } catch {
    return route.finish(
      NextResponse.json(
        { error: "We couldn't finish account setup. Please retry." },
        { status: 503 },
      ),
    );
  }
}
