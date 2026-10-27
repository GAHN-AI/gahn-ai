import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { authRequestOrigin } from "./policy";

export function authRoute(request: NextRequest) {
  const pending = new NextResponse();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: { sameSite: "lax", secure: authRequestOrigin(request).startsWith("https://") },
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(values, headers) {
          values.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            pending.cookies.set(name, value, options);
          });
          Object.entries(headers || {}).forEach(([key, value]) =>
            pending.headers.set(key, value),
          );
        },
      },
    },
  );
  function finish(response: NextResponse) {
    pending.cookies.getAll().forEach((cookie) => response.cookies.set(cookie));
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  }
  return {
    supabase,
    finish,
    redirect: (path: string) =>
      finish(
        NextResponse.redirect(new URL(path, authRequestOrigin(request)), 303),
      ),
  };
}
