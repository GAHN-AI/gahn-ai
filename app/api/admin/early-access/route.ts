import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function adminEmails() {
  return new Set(
    (process.env.GAHN_ADMIN_EMAILS || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

async function getUser() {
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
            // Safe to ignore when cookie writes are unavailable.
          }
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return error ? null : user;
}

export async function GET() {
  try {
    const user = await getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allowed = adminEmails();

    if (!allowed.size || !allowed.has(user.email.toLowerCase())) {
      return NextResponse.json(
        { error: "This account does not have founder analytics access." },
        { status: 403 }
      );
    }

    const weekAgo = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    ).toISOString();

    const [
      profilesCount,
      activeSessionsCount,
      evidenceCount,
      masteredCount,
      feedbackCount,
      recentFeedback,
      recentSessions,
      recentUsage,
    ] = await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("id", { count: "exact", head: true }),
      supabaseAdmin
        .from("lesson_sessions")
        .select("id", { count: "exact", head: true })
        .gte("last_activity_at", weekAgo),
      supabaseAdmin
        .from("lesson_evidence")
        .select("id", { count: "exact", head: true })
        .gte("created_at", weekAgo),
      supabaseAdmin
        .from("learning_progress")
        .select("id", { count: "exact", head: true })
        .eq("mastery_state", "mastered"),
      supabaseAdmin
        .from("learner_feedback")
        .select("id", { count: "exact", head: true }),
      supabaseAdmin
        .from("learner_feedback")
        .select("id, category, rating, message, context_path, created_at")
        .order("created_at", { ascending: false })
        .limit(30),
      supabaseAdmin
        .from("lesson_sessions")
        .select(
          "world_slug, topic, lesson_title, status, last_activity_at"
        )
        .order("last_activity_at", { ascending: false })
        .limit(100),
      supabaseAdmin
        .from("ai_usage_events")
        .select("usage_kind, created_at")
        .gte("created_at", weekAgo),
    ]);

    const topicCounts = new Map<string, number>();
    for (const row of recentSessions.data || []) {
      const key = String(row.topic || "Unknown topic");
      topicCounts.set(key, (topicCounts.get(key) || 0) + 1);
    }

    const topTopics = Array.from(topicCounts.entries())
      .map(([topic, sessions]) => ({ topic, sessions }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 8);

    const usage = {
      teachingTurns: (recentUsage.data || []).filter(
        (event) => event.usage_kind === "teaching_turn"
      ).length,
      fileAnalyses: (recentUsage.data || []).filter(
        (event) => event.usage_kind === "file_analysis"
      ).length,
    };

    return NextResponse.json({
      period: "Last 7 days",
      totals: {
        registeredLearners: profilesCount.count || 0,
        activeLessonSessions: activeSessionsCount.count || 0,
        evidenceEvents: evidenceCount.count || 0,
        masteredLessons: masteredCount.count || 0,
        feedbackSubmissions: feedbackCount.count || 0,
      },
      usage,
      topTopics,
      recentFeedback: recentFeedback.data || [],
      recentSessions: recentSessions.data || [],
    });
  } catch (error) {
    console.error("Founder early-access analytics failed:", error);

    return NextResponse.json(
      { error: "Could not load early-access analytics." },
      { status: 500 }
    );
  }
}
