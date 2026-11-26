import { NextRequest, NextResponse } from "next/server";
import { authRoute } from "@/lib/auth/routeClient";
import {
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
    // New registrations are completed only by a verified email/signup
    // link at /auth/callback. A Google login must not create a GAHN account.
    return route.finish(
      NextResponse.json(
        { error: "New accounts must be created using email signup and verification." },
        { status: 403 },
      ),
    );
  } catch {
    return route.finish(
      NextResponse.json(
        { error: "We couldn't finish account setup. Please retry." },
        { status: 503 },
      ),
    );
  }
}
