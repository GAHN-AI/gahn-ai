import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // getUser() validates the session against Supabase Auth instead of trusting
  // a cached browser token. Deleted accounts must not pass this check.
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  const authenticated = Boolean(user && !sessionError);
  const pathname = request.nextUrl.pathname;

  function redirectWithCookies(path: string) {
    const redirectResponse = NextResponse.redirect(new URL(path, request.url));
    // Preserve any refreshed or cleared Supabase cookies on redirects.
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
    return redirectResponse;
  }

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  const isProtectedPage = [
    "/dashboard",
    "/profile",
    "/notes",
    "/study-guides",
    "/progress",
    "/assigned-homework",
  ].some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  // Signed-in users do not need to see login or signup pages.
  if (isAuthPage && authenticated) {
    return redirectWithCookies("/dashboard");
  }

  // Invalid or deleted sessions must not reach account-only pages.
  if (isProtectedPage && !authenticated) {
    return redirectWithCookies("/login?error=session_expired");
  }

  return response;
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/dashboard/:path*",
    "/profile/:path*",
    "/notes/:path*",
    "/study-guides/:path*",
    "/progress/:path*",
    "/assigned-homework/:path*",
  ],
};