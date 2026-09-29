"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle2,
  Crown,
  Flame,
  Globe2,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  LogOut,
  MessageSquareText,
  StickyNote,
  TrendingUp,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";
import { LEARNING_WORLD_AVAILABILITY } from "@/lib/learningWorldAvailability";

const navItems: { label: string; Icon: LucideIcon; href: string }[] = [
  { label: "Dashboard", Icon: LayoutDashboard, href: "/dashboard" },
  { label: "My Notes", Icon: StickyNote, href: "/notes" },
  { label: "Study Guides", Icon: BookOpen, href: "/study-guides" },
  { label: "Progress", Icon: TrendingUp, href: "/progress" },
  { label: "Feedback", Icon: MessageSquareText, href: "/feedback" },
];

const worlds: {
  slug: string;
  Icon: LucideIcon;
  title: string;
  text: string;
}[] = [
  {
    slug: "career-skills",
    Icon: Briefcase,
    title: "Career Skills",
    text: "Business, leadership, communication, finance, interviews, and other practical career skills.",
  },
  {
    slug: "school-help",
    Icon: GraduationCap,
    title: "School Help",
    text: "Math, science, English, reading, study skills, homework, quizzes, and tests.",
  },
  {
    slug: "brain-development",
    Icon: Brain,
    title: "Brain Development",
    text: "Memory, focus, discipline, reasoning, and learning performance.",
  },
  {
    slug: "general-knowledge",
    Icon: Globe2,
    title: "General Knowledge",
    text: "History, technology, economics, geography, culture, and life knowledge.",
  },
  {
    slug: "book-intelligence",
    Icon: BookOpen,
    title: "Book Intelligence",
    text: "Book summaries, chapter breakdowns, vocabulary, quizzes, and analysis.",
  },
];

type ProgressRow = {
  world_slug: string;
  section_slug: string | null;
  topic_slug: string | null;
  lesson_id: string;
  lesson_title: string | null;
  topic: string;
  status: string;
  mastery_state: string | null;
  attempts_count: number;
  correct_count: number;
  retry_count: number;
  evidence: Record<string, unknown> | null;
  last_activity_at: string;
};

type EvidenceRow = {
  created_at: string;
  correct: boolean | null;
};

function getInitials(name: string) {
  return (
    String(name)
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AI"
  );
}

function localDateKey(value: Date) {
  return [
    value.getFullYear(),
    String(value.getMonth() + 1).padStart(2, "0"),
    String(value.getDate()).padStart(2, "0"),
  ].join("-");
}

function calculateStreak(activityTimes: string[]) {
  const activityDays = new Set(
    activityTimes.map((value) => localDateKey(new Date(value)))
  );

  const cursor = new Date();

  if (!activityDays.has(localDateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;

  while (activityDays.has(localDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function resumeHref(row: ProgressRow | null) {
  if (!row) return "/learn/career-skills";

  if (!row.section_slug || !row.topic_slug) {
    return `/learn/${row.world_slug}`;
  }

  return `/lesson/custom?world=${encodeURIComponent(
    row.world_slug
  )}&section=${encodeURIComponent(
    row.section_slug
  )}&topic=${encodeURIComponent(
    row.topic
  )}&topicSlug=${encodeURIComponent(row.topic_slug)}`;
}

export default function DashboardPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("Learner");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [planName, setPlanName] = useState("Explore");
  const [planId, setPlanId] = useState("explore");
  const [mayaRemainingMinutes, setMayaRemainingMinutes] = useState<number | null>(null);
  const [mayaLimitMinutes, setMayaLimitMinutes] = useState<number | null>(null);
  const [progressRows, setProgressRows] = useState<ProgressRow[]>([]);
  const [evidenceRows, setEvidenceRows] = useState<EvidenceRow[]>([]);
  const [notesCount, setNotesCount] = useState(0);
  const [studyGuidesCount, setStudyGuidesCount] = useState(0);

  const initials = useMemo(() => getInitials(fullName), [fullName]);

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const [
        subscriptionResponse,
        mayaUsageResponse,
        progressResult,
        evidenceResult,
        notesResult,
        guidesResult,
      ] = await Promise.all([
          fetch("/api/subscription/current"),
          fetch("/api/liveavatar/usage"),
          supabase
            .from("learning_progress")
            .select(
              "world_slug, section_slug, topic_slug, lesson_id, lesson_title, topic, status, mastery_state, attempts_count, correct_count, retry_count, evidence, last_activity_at"
            )
            .eq("user_id", user.id)
            .order("last_activity_at", { ascending: false }),
          supabase
            .from("lesson_evidence")
            .select("created_at, correct")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(1000),
          supabase
            .from("learner_notes")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user.id),
          supabase
            .from("study_guides")
            .select("id", { count: "exact", head: true })
            .eq("user_id", user.id),
        ]);

      if (subscriptionResponse.ok) {
        const subscription = await subscriptionResponse.json();
        setPlanId(subscription.planId || "explore");
        setPlanName(subscription.entitlements?.name || "Explore");
      }

      if (mayaUsageResponse.ok) {
        const mayaUsage = await mayaUsageResponse.json();
        setMayaRemainingMinutes(
          typeof mayaUsage.remainingSeconds === "number"
            ? Math.ceil(mayaUsage.remainingSeconds / 60)
            : null
        );
        setMayaLimitMinutes(
          typeof mayaUsage.limitSeconds === "number"
            ? Math.ceil(mayaUsage.limitSeconds / 60)
            : null
        );
      }

      setProgressRows((progressResult.data || []) as ProgressRow[]);
      setEvidenceRows((evidenceResult.data || []) as EvidenceRow[]);
      setNotesCount(notesResult.count || 0);
      setStudyGuidesCount(guidesResult.count || 0);

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, avatar_url, email")
        .eq("id", user.id)
        .maybeSingle();

      const fallbackName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Learner";

      if (!profile) {
        await supabase.from("profiles").insert({
          id: user.id,
          full_name: fallbackName,
          avatar_url: "",
          email: user.email,
        });

        setFullName(fallbackName);
        return;
      }

      setFullName(profile.full_name || fallbackName);
      setAvatarUrl(profile.avatar_url || "");
    }

    void loadDashboard();
  }, [router]);

  const meaningfulProgressRows = progressRows.filter((row) => {
    const evidence = row.evidence || {};
    const hasConnectedLearning =
      evidence.meaningfulStart === true ||
      evidence.lastActivitySource === "live_instructor" ||
      evidence.lastActivitySource === "adaptive_instructor";

    return (
      hasConnectedLearning ||
      (row.attempts_count || 0) > 0 ||
      ["practicing", "proficient", "mastered", "needs_review"].includes(
        row.mastery_state || ""
      )
    );
  });

  const activeLessons = meaningfulProgressRows.filter(
    (row) => row.status === "in_progress"
  );
  const masteredLessons = meaningfulProgressRows.filter(
    (row) => row.mastery_state === "mastered"
  );
  const reviewLessons = meaningfulProgressRows.filter(
    (row) => row.mastery_state === "needs_review"
  );

  const recentLearning = meaningfulProgressRows[0] || null;
  const nextLearning = reviewLessons[0] || activeLessons[0] || null;

  const totalAttempts = meaningfulProgressRows.reduce(
    (sum, row) => sum + (row.attempts_count || 0),
    0
  );
  const totalCorrect = meaningfulProgressRows.reduce(
    (sum, row) => sum + (row.correct_count || 0),
    0
  );
  const totalRetries = meaningfulProgressRows.reduce(
    (sum, row) => sum + (row.retry_count || 0),
    0
  );
  const accuracy =
    totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const streak = calculateStreak(
    evidenceRows.map((row) => row.created_at)
  );

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#F4F7FB] font-sans text-black">
      <div className="grid min-h-screen lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="bg-[#07162F] px-5 py-6 text-white lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="min-w-0">
              <h1 className="truncate text-xl font-black text-white">GAHN AI</h1>
              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/80">
                Global AI Human Helper Network
              </p>
            </div>
          </Link>

          <nav className="mt-8 grid gap-2">
            {navItems.map(({ label, Icon, href }, index) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${
                  index === 0
                    ? "bg-white text-[#07162F]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#07162F]">
              <Crown className="h-4 w-4" />
            </div>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-white/80">
              Current plan
            </p>
            <h2 className="mt-1 text-xl font-black text-white">{planName}</h2>
            <p className="mt-2 text-sm leading-6 text-white">
              {planId === "explore"
                ? "Explore keeps the low-cost parts of GAHN free. Maya Live AI Instructor is unlocked with Learner Plus."
                : "Your paid plan controls the learning tools and AI usage available to your account."}
            </p>

            {planId !== "explore" &&
              mayaRemainingMinutes !== null &&
              mayaLimitMinutes !== null && (
                <div className="mt-4 rounded-xl border border-white/20 bg-white/10 px-3 py-2">
                  <p className="text-xs font-bold text-white/80">
                    Maya time
                  </p>
                  <p className="mt-1 text-sm font-black text-white">
                    {mayaRemainingMinutes} of {mayaLimitMinutes} minutes remaining
                  </p>
                </div>
              )}
            <Link
              href="/pricing"
              className="mt-5 block rounded-xl bg-white px-4 py-3 text-center text-sm font-black text-[#07162F]"
            >
              View Plan
            </Link>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-bold text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </aside>

        <section className="min-w-0 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
          <header className="rounded-[1.6rem] border border-[#D8E0EA] bg-white p-5 shadow-[0_12px_32px_rgba(11,23,57,0.05)] sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1677FF]">
                  Learning Dashboard
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#0B1739]">
                  Welcome back, {fullName}
                </h2>
                <p className="mt-2 text-sm font-medium leading-6 text-black">
                  Dashboard numbers now come from connected learning activity:
                  checked responses, mastery evidence, saved materials, and real
                  instructor sessions — not from simply opening a page.
                </p>
              </div>

              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-2xl border border-[#D8E0EA] bg-[#F4F7FB] p-3"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[#1677FF] text-sm font-black text-white">
                    {initials}
                  </div>
                )}
                <div>
                  <p className="text-sm font-black text-black">{fullName}</p>
                  <p className="text-xs font-bold text-black">{planName}</p>
                </div>
              </Link>
            </div>
          </header>

          <section className="mt-6 overflow-hidden rounded-[1.5rem] bg-[#07162F] text-white shadow-[0_14px_34px_rgba(7,22,47,0.12)]">
            <div className="grid sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  Icon: Flame,
                  value: streak,
                  label: "Learning streak",
                  detail: streak === 1 ? "day with learning evidence" : "days with learning evidence",
                },
                {
                  Icon: ListChecks,
                  value: totalAttempts,
                  label: "Questions answered",
                  detail: "checked learning responses",
                },
                {
                  Icon: TrendingUp,
                  value: `${accuracy}%`,
                  label: "Answer accuracy",
                  detail: totalAttempts ? `${totalCorrect} correct of ${totalAttempts}` : "waiting for checked answers",
                },
                {
                  Icon: CheckCircle2,
                  value: masteredLessons.length,
                  label: "Skills mastered",
                  detail: "requires mastery evidence",
                },
              ].map(({ Icon, value, label, detail }, index) => (
                <div
                  key={label}
                  className={`p-5 sm:p-6 ${
                    index > 0 ? "border-t border-white/10 sm:border-t-0 sm:border-l" : ""
                  } ${
                    index === 2 ? "sm:border-t sm:border-l-0 xl:border-t-0 xl:border-l" : ""
                  } ${
                    index === 3 ? "sm:border-t sm:border-l xl:border-t-0" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 text-[#8DB8FF]">
                    <Icon className="h-4 w-4" />
                    <p className="text-xs font-black uppercase tracking-[0.12em]">
                      {label}
                    </p>
                  </div>
                  <p className="mt-4 text-3xl font-black text-white">{value}</p>
                  <p className="mt-1 text-xs font-medium leading-5 text-white/70">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1677FF]">
                Learning Worlds
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#0B1739]">
                Choose where you want to learn
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-black">
                Career Skills and School Help are the only learning worlds being
                tested in this MVP.
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {worlds.map(({ slug, Icon, title, text }) => {
                const availability = LEARNING_WORLD_AVAILABILITY[slug];
                const available = availability?.available;

                const card = (
                  <div
                    className={`h-full rounded-[1.4rem] border p-5 ${
                      available
                        ? "border-[#BFD3ED] bg-white shadow-[0_10px_28px_rgba(11,23,57,0.05)]"
                        : "border-[#D8E0EA] bg-[#EEF2F7]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`grid h-11 w-11 place-items-center rounded-xl ${
                          available
                            ? "bg-[#EAF3FF] text-[#1677FF]"
                            : "bg-white text-[#07162F]"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] ${
                          available
                            ? "bg-[#EAF3FF] text-[#1677FF]"
                            : "bg-[#07162F] text-white"
                        }`}
                      >
                        {available ? "Available" : "Not available"}
                      </span>
                    </div>

                    <h4 className="mt-5 text-xl font-black text-[#0B1739]">
                      {title}
                    </h4>
                    <p className="mt-2 text-sm font-medium leading-6 text-black">
                      {text}
                    </p>

                    <div className="mt-5 text-sm font-black text-[#1677FF]">
                      {available ? "Open learning world →" : "Coming after MVP testing"}
                    </div>
                  </div>
                );

                return available ? (
                  <Link key={slug} href={`/learn/${slug}`}>
                    {card}
                  </Link>
                ) : (
                  <div key={slug} aria-disabled="true">
                    {card}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-8 grid gap-4 xl:grid-cols-2">
            <Link
              href={resumeHref(recentLearning)}
              className="rounded-[1.4rem] border border-[#BFD3ED] bg-white p-6 shadow-[0_10px_28px_rgba(11,23,57,0.04)]"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
                Learning Overview
              </p>
              <h3 className="mt-3 text-xl font-black text-[#0B1739]">
                {recentLearning?.lesson_title || "No lesson started yet"}
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-black">
                {recentLearning
                  ? `${recentLearning.topic} · ${recentLearning.mastery_state?.replace(
                      "_",
                      " "
                    ) || "learning"} · ${recentLearning.correct_count}/${recentLearning.attempts_count} checked answers`
                  : "Open Career Skills or School Help and start your first private lesson."}
              </p>
              <p className="mt-4 text-sm font-black text-[#1677FF]">
                {recentLearning ? "Continue learning →" : "Start learning →"}
              </p>
            </Link>

            <Link
              href={resumeHref(nextLearning)}
              className="rounded-[1.4rem] border border-[#D8E0EA] bg-[#0B1739] p-6 text-white shadow-[0_10px_28px_rgba(11,23,57,0.08)]"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8DB8FF]">
                What To Do Next
              </p>
              <h3 className="mt-3 text-xl font-black text-white">
                {nextLearning?.lesson_title || "Choose your first learning world"}
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-white">
                {reviewLessons.length
                  ? "This lesson has saved evidence that needs review."
                  : activeLessons.length
                    ? "Continue the lesson you already started."
                    : "Start with Career Skills or School Help."}
              </p>
              <p className="mt-4 text-sm font-black text-[#8DB8FF]">
                Open next step →
              </p>
            </Link>

            <Link
              href="/progress"
              className="rounded-[1.4rem] border border-[#D8E0EA] bg-white p-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
                Mastery Evidence
              </p>
              <h3 className="mt-3 text-xl font-black text-[#0B1739]">
                {masteredLessons.length} mastered · {reviewLessons.length} need review
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-black">
                These numbers come from saved lesson states and checked learning
                activity. GAHN does not invent a progress percentage.
              </p>
              <p className="mt-4 text-sm font-black text-[#1677FF]">
                View progress →
              </p>
            </Link>

            <Link
              href="/notes"
              className="rounded-[1.4rem] border border-[#D8E0EA] bg-white p-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
                Saved Notes
              </p>
              <h3 className="mt-3 text-xl font-black text-[#0B1739]">
                {notesCount} note{notesCount === 1 ? "" : "s"}
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-black">
                Notes are saved to your account and stay connected to your
                learning history.
              </p>
              <p className="mt-4 text-sm font-black text-[#1677FF]">
                Open notes →
              </p>
            </Link>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.4rem] border border-[#D8E0EA] bg-white p-6">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
                Learning Status
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[
                  ["Active", activeLessons.length],
                  ["Mastered", masteredLessons.length],
                  ["Review", reviewLessons.length],
                ].map(([label, value]) => (
                  <div
                    key={String(label)}
                    className="rounded-xl bg-[#F4F7FB] p-4"
                  >
                    <p className="text-2xl font-black text-[#0B1739]">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.08em] text-black">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm font-medium leading-6 text-black">
                Status changes only when GAHN saves real lesson activity.
              </p>
            </div>

            <div className="rounded-[1.4rem] border border-[#BFD3ED] bg-[#EAF3FF] p-6">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
                Your Learning Data
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                {[
                  ["Attempts", totalAttempts],
                  ["Correct", totalCorrect],
                  ["Retries", totalRetries],
                  ["Study guides", studyGuidesCount],
                ].map(([label, value]) => (
                  <div key={String(label)} className="rounded-xl bg-white p-4">
                    <p className="text-2xl font-black text-[#0B1739]">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.08em] text-black">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm font-medium leading-6 text-black">
                This data comes from your account records in Supabase, not from
                placeholder dashboard numbers.
              </p>
              <Link
                href="/progress"
                className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#0B1739]"
              >
                <ListChecks className="h-4 w-4" />
                View full progress
              </Link>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
