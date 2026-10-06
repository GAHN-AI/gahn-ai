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

async function getUniqueSignups() {
  const users: Array<{ email?: string | null; created_at?: string }> = [];
  const perPage = 1000;

  for (let page = 1; ; page += 1) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage,
    });

    if (error) throw error;

    users.push(...data.users);

    if (data.users.length < perPage) break;
  }

  const byEmail = new Map<string, { email: string; createdAt: string }>();

  for (const user of users) {
    const email = user.email?.trim().toLowerCase();
    if (!email) continue;

    const existing = byEmail.get(email);
    const createdAt = user.created_at ?? "";

    if (!existing || (createdAt && createdAt < existing.createdAt)) {
      byEmail.set(email, { email, createdAt });
    }
  }

  const signupEmails = Array.from(byEmail.values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );

  return {
    signupCount: signupEmails.length,
    signupEmails,
  };
}

async function getVisitorCounts() {
  const perPage = 1000;
  const visitorFlags = new Map<
    string,
    { everAuthenticated: boolean; everAnonymous: boolean }
  >();

  for (let from = 0; ; from += perPage) {
    const { data, error } = await supabaseAdmin
      .from("analytics_sessions")
      .select("visitor_id, authenticated")
      .range(from, from + perPage - 1);

    if (error) throw error;

    for (const row of data ?? []) {
      const visitorId = String(row.visitor_id ?? "");
      if (!visitorId) continue;

      const current = visitorFlags.get(visitorId) ?? {
        everAuthenticated: false,
        everAnonymous: false,
      };

      if (row.authenticated === true) {
        current.everAuthenticated = true;
      } else {
        current.everAnonymous = true;
      }

      visitorFlags.set(visitorId, current);
    }

    if (!data || data.length < perPage) break;
  }

  let anonymousVisitors = 0;

  for (const flags of visitorFlags.values()) {
    if (flags.everAnonymous && !flags.everAuthenticated) {
      anonymousVisitors += 1;
    }
  }

  return {
    trackedVisitors: visitorFlags.size,
    anonymousVisitors,
  };
}

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
  const requestedRange = requestUrl.searchParams.get("range") ?? "30d";
  const range = requestedRange in RANGE_MS ? requestedRange : "30d";
  const since = new Date(Date.now() - RANGE_MS[range]).toISOString();

  try {
    const [{ data, error }, signupSummary, visitorSummary] = await Promise.all([
      supabaseAdmin.rpc("get_site_analytics_summary", {
        p_since: since,
      }),
      getUniqueSignups(),
      getVisitorCounts(),
    ]);

    if (error) throw error;

    return NextResponse.json(
      {
        ...data,
        ...signupSummary,
        ...visitorSummary,
        range,
        since,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Admin analytics summary failed:", error);
    return NextResponse.json(
      { error: "Unable to load analytics" },
      { status: 500 }
    );
  }
}
