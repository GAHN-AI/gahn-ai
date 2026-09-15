import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
            // Cookie refresh can be handled by the app's normal auth flow.
          }
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmails = (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (!user?.email || !adminEmails.includes(user.email.toLowerCase())) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const [visitorsResult, accountsResult] = await Promise.all([
    supabaseAdmin
      .from("site_visitors")
      .select("visitor_id", { count: "exact", head: true }),
    supabaseAdmin
      .from("profiles")
      .select("id", { count: "exact", head: true }),
  ]);

  if (visitorsResult.error || accountsResult.error) {
    console.error("Failed to load cumulative analytics totals:", {
      visitorsError: visitorsResult.error,
      accountsError: accountsResult.error,
    });

    return NextResponse.json(
      { error: "Unable to load analytics totals" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    totalVisitors: visitorsResult.count ?? 0,
    totalAccounts: accountsResult.count ?? 0,
  });
}
