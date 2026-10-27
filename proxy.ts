import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  authRequestOrigin,
  callbackAtRoot,
  isAccountPath,
  isEmailSignup,
} from "@/lib/auth/policy";

export async function proxy(request: NextRequest) {
  // Supabase falls back to Site URL when a requested callback is not allowed.
  // Recover the code before any browser client or analytics can consume it.
  if (callbackAtRoot(request.nextUrl)) {
    const target = new URL("/auth/callback", authRequestOrigin(request));
    for (const key of [
      "code",
      "token_hash",
      "type",
      "next",
      "error",
      "error_code",
    ]) {
      const value = request.nextUrl.searchParams.get(key);
      if (value) target.searchParams.set(key, value);
    }
    const result = NextResponse.redirect(target, 303);
    result.headers.set("Cache-Control", "private, no-store");
    result.headers.set("Referrer-Policy", "no-referrer");
    return result;
  }
  if (request.nextUrl.pathname === "/") return NextResponse.next();
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: { sameSite: "lax", secure: authRequestOrigin(request).startsWith("https://") },
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(values, headers) {
          values.forEach(({ name, value }) => request.cookies.set(name, value));
          const previous = response.cookies.getAll();
          response = NextResponse.next({ request });
          previous.forEach((cookie) => response.cookies.set(cookie));
          values.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
          Object.entries(headers || {}).forEach(([key, value]) =>
            response.headers.set(key, value),
          );
          response.headers.set("Cache-Control", "private, no-store");
        },
      },
    },
  );
  response.headers.set("Cache-Control", "private, no-store");
  function redirect(path: string) {
    const result = NextResponse.redirect(
      new URL(path, authRequestOrigin(request)),
    );
    response.cookies.getAll().forEach((cookie) => result.cookies.set(cookie));
    result.headers.set("Cache-Control", "private, no-store");
    return result;
  }
  const path = request.nextUrl.pathname;
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    const authenticated = Boolean(
      user && !error && !user.is_anonymous && user.email_confirmed_at,
    );
    if (!authenticated)
      return isAccountPath(path)
        ? redirect("/login?error=session_expired")
        : response;
    const { data: registration, error: registrationError } = await supabase
      .from("account_registrations")
      .select("id")
      .eq("id", user!.id)
      .maybeSingle();
    if (registrationError) return redirect("/auth/error?reason=account_setup");
    if (!registration) {
      if (isEmailSignup(user!))
        return path === "/signup" ? response : redirect("/signup?verify=email");
      return path === "/signup" ? response : redirect("/signup?complete=1");
    }
    return path === "/login" || path === "/signup"
      ? redirect("/dashboard")
      : response;
  } catch {
    return redirect("/auth/error");
  }
}
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/feedback/:path*",
    "/notes/:path*",
    "/study-guides/:path*",
    "/progress/:path*",
    "/assigned-homework/:path*",
  ],
};
