import { NextRequest, NextResponse } from "next/server";
import { authRoute } from "@/lib/auth/routeClient";
import {
  AUTH_CALLBACK_PATH,
  AUTH_INTENT_COOKIE,
  authRequestOrigin,
  sameOriginPost,
} from "@/lib/auth/policy";
export async function POST(request: NextRequest) {
  if (!sameOriginPost(request))
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 },
    );
  const route = authRoute(request);
  try {
    const body = await request.json();
    if (body.intent !== "signup" && body.intent !== "login")
      return route.finish(
        NextResponse.json(
          { error: "Invalid authentication intent." },
          { status: 400 },
        ),
      );
    const { data, error } = await route.supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${authRequestOrigin(request)}${AUTH_CALLBACK_PATH}`,
        skipBrowserRedirect: true,
        queryParams: { prompt: "select_account" },
      },
    });
    if (error || !data.url)
      return route.finish(
        NextResponse.json(
          { error: "Google authentication could not start." },
          { status: 502 },
        ),
      );
    const response = route.finish(NextResponse.json({ url: data.url }));
    response.cookies.set(AUTH_INTENT_COOKIE, body.intent, {
      httpOnly: true,
      secure: authRequestOrigin(request).startsWith("https://"),
      sameSite: "lax",
      path: "/",
      maxAge: 1200,
    });
    return response;
  } catch {
    return route.finish(
      NextResponse.json(
        { error: "Unable to start Google authentication." },
        { status: 503 },
      ),
    );
  }
}
