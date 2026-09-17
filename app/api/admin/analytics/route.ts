import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const RANGE_MS: Record<string, number> = {
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
  "90d": 90 * 24 * 60 * 60 * 1000,
};

export async function GET(request: Request) {
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
            // Server Components and route reads cannot always refresh cookies.
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

  const requestUrl = new URL(request.url);
  const requestedRange = requestUrl.searchParams.get("range") ?? "24h";
  const range = requestedRange in RANGE_MS ? requestedRange : "24h";
  const since = new Date(Date.now() - RANGE_MS[range]).toISOString();

  const { data, error } = await supabaseAdmin.rpc("get_site_analytics_summary", {
    p_since: since,
  });

  if (error) {
    console.error("Admin analytics summary failed:", error);
    return NextResponse.json(
      { error: "Unable to load analytics" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      ...data,
      range,
      since,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
