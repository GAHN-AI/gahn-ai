import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: { sameSite: "lax", secure: process.env.VERCEL === "1" || process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://") === true },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Some server contexts cannot write refreshed auth cookies.
          }
        },
      },
    },
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || user.is_anonymous || !user.email_confirmed_at)
    return { user: null, error: error || new Error("Unauthenticated") };
  const { data: registration, error: registrationError } = await supabase
    .from("account_registrations")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  return {
    user: registration && !registrationError ? user : null,
    error:
      registrationError ||
      (!registration ? new Error("Signup required") : null),
  };
}
