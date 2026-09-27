"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  Bell,
  Bot,
  BookOpen,
  Brain,
  Briefcase,
  ChevronDown,
  Crown,
  Flame,
  FolderKanban,
  Globe2,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  LogOut,
  MessageSquare,
  Search,
  StickyNote,
  TrendingUp,
  Users,
} from "lucide-react";

const navItems: { label: string; Icon: LucideIcon; href: string }[] = [
  { label: "Dashboard", Icon: LayoutDashboard, href: "/dashboard" },
  { label: "My Notes", Icon: StickyNote, href: "/notes" },
  { label: "Study Guides", Icon: BookOpen, href: "/study-guides" },
  { label: "Progress", Icon: TrendingUp, href: "/progress" },
  { label: "Feedback", Icon: MessageSquare, href: "/feedback" },
];

const worlds: { slug: string; Icon: LucideIcon; title: string; text: string }[] = [
  {
    slug: "career-skills",
    Icon: Briefcase,
    title: "Career Skills",
    text: "Explore careers, job skills, and professional paths.",
  },
  {
    slug: "school-help",
    Icon: GraduationCap,
    title: "School Help",
    text: "Master subjects, homework, quizzes, and tests.",
  },
  {
    slug: "brain-development",
    Icon: Brain,
    title: "Brain Development",
    text: "Train focus, memory, reasoning, and learning ability.",
  },
  {
    slug: "general-knowledge",
    Icon: Globe2,
    title: "General Knowledge",
    text: "Learn useful knowledge about the world and everyday life.",
  },
  {
    slug: "book-intelligence",
    Icon: BookOpen,
    title: "Book Intelligence",
    text: "Understand books, remember ideas, and apply what you read.",
  },
];

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

function getInitialColor(name: string) {
  const colors = [
    "bg-[#1677FF]",
    "bg-[#0F65E8]",
    "bg-[#3B8CFF]",
    "bg-[#0B5FCC]",
  ];

  const total = String(name)
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return colors[total % colors.length];
}

type ProgressRow = {
  lesson_title: string | null;
  topic: string;
  status: string;
  mastery_state: string | null;
  attempts_count: number;
  correct_count: number;
  retry_count: number;
  last_activity_at: string;
};

function localDateKey(value: Date) {
  return [
    value.getFullYear(),
    String(value.getMonth() + 1).padStart(2, "0"),
    String(value.getDate()).padStart(2, "0"),
  ].join("-");
}

function calculateStreak(rows: ProgressRow[]) {
  const activityDays = new Set(
    rows.map((row) => localDateKey(new Date(row.last_activity_at)))
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

export default function DashboardPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("Learner");
  const [initials, setInitials] = useState("AI");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [planId, setPlanId] = useState("explore");
  const [planName, setPlanName] = useState("Early Access");
  const [progressRows, setProgressRows] = useState<ProgressRow[]>([]);
  const [notesCount, setNotesCount] = useState(0);
  const avatarColor = useMemo(() => getInitialColor(fullName), [fullName]);

  useEffect(() => {
    async function loadUserProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const subscriptionResponse = await fetch("/api/subscription/current");

if (subscriptionResponse.ok) {
  const subscription = await subscriptionResponse.json();

  setPlanId(subscription.planId || "explore");
  setPlanName(subscription.entitlements?.name || "Early Access");
}

      const [progressResult, notesResult] = await Promise.all([
        supabase
          .from("learning_progress")
          .select(
            "lesson_title, topic, status, mastery_state, attempts_count, correct_count, retry_count, last_activity_at"
          )
          .eq("user_id", user.id)
          .order("last_activity_at", { ascending: false }),
        supabase
          .from("learner_notes")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id),
      ]);

      setProgressRows((progressResult.data || []) as ProgressRow[]);
      setNotesCount(notesResult.count || 0);

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
        setInitials(getInitials(fallbackName));
        setAvatarUrl("");
        return;
      }

      const savedName = profile.full_name || fallbackName;
      const savedAvatar = profile.avatar_url || "";

      setFullName(savedName);
      setInitials(getInitials(savedName));
      setAvatarUrl(savedAvatar);
    }

    loadUserProfile();
  }, [router]);

  const activeLessons = progressRows.filter(
    (row) => row.status === "in_progress"
  );
  const masteredLessons = progressRows.filter(
    (row) => row.mastery_state === "mastered"
  );
  const reviewLessons = progressRows.filter(
    (row) => row.mastery_state === "needs_review"
  );
  const streak = calculateStreak(progressRows);
  const recentLearning = progressRows[0] || null;
  const nextRecommendation = reviewLessons[0] || activeLessons[0] || null;

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#F8FBFF] font-sans text-[#0B1739]">
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_260px]">
        <aside className="border-r border-[#D7E3F2] bg-white p-4 sm:p-5 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14"
            />
            <div className="min-w-0">
              <h1 className="truncate text-xl font-extrabold tracking-[-0.02em] text-[#0B1739] sm:text-lg">
                GAHN AI
              </h1>
              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#53657D]">
                Global AI Human Helper Network
              </p>
            </div>
          </Link>

          <nav className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:block lg:space-y-1.5">
            {navItems.map(({ label, Icon, href }, index) => (
              <Link
                key={label}
                href={href}
                className={`flex min-w-0 items-center gap-2 rounded-lg px-3 py-3 text-xs font-semibold sm:text-sm lg:gap-3 lg:px-4 ${
                  index === 0
                    ? "bg-[#EAF3FF] text-[#1677FF]"
                    : "text-[#53657D] hover:bg-[#F5F8FC] hover:text-[#1677FF]"
                }`}
              >
                <Icon className="h-4 w-4 flex-none" strokeWidth={1.75} />
                <span className="truncate">{label}</span>
              </Link>
            ))}
          </nav>

          {planId === "explore" && (
            <div className="mt-6 rounded-2xl border border-[#D7E3F2] bg-[#F5F8FC] p-5 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#EAF3FF]">
                <Crown className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#0B1739]">Early Access</h3>
              <p className="mt-2 text-sm leading-6 text-[#53657D]">
                You have the current GAHN AI early-access plan while the MVP is being tested and improved.
              </p>
              <Link
                href="/pricing"
                className="mt-5 block rounded-lg bg-[#1677FF] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0F65E8]"
              >
                View Plan
              </Link>
            </div>
          )}
        </aside>

        <div className="min-w-0">
          <section className="min-w-0 p-4 sm:p-6 xl:p-8">
            <header className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative w-full xl:max-w-xl">
                <input
                  placeholder="Search for skills, topics, careers..."
                  className="h-12 w-full rounded-lg border border-[#D7E3F2] bg-white px-5 pr-12 text-sm text-[#0B1739] outline-none focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
                />
                <Search
                  className="pointer-events-none absolute right-4 top-3.5 h-5 w-5 text-[#53657D]"
                  strokeWidth={1.75}
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3">
                <span className="flex items-center gap-2 rounded-full border border-[#D7E3F2] bg-white px-4 py-3 text-xs font-bold shadow-sm sm:text-sm">
                  <Flame className="h-4 w-4 text-[#1677FF]" strokeWidth={1.75} />
                  {streak} Day Streak
                </span>

                <Link
                  href="/in-progress"
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#D7E3F2] bg-white text-[#0B1739] shadow-sm hover:bg-[#F5F8FC]"
                >
                  <Bell className="h-4.5 w-4.5" strokeWidth={1.75} />
                </Link>

                <Link
                  href="/in-progress"
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#D7E3F2] bg-white text-[#0B1739] shadow-sm hover:bg-[#F5F8FC]"
                >
                  <MessageSquare className="h-4.5 w-4.5" strokeWidth={1.75} />
                </Link>

                <Link
                  href="/profile"
                  className="flex min-w-0 items-center gap-3 rounded-full border border-[#D7E3F2] bg-white px-3 py-2 shadow-sm"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={fullName}
                      className="h-10 w-10 rounded-full object-cover"
                      onError={() => setAvatarUrl("")}
                    />
                  ) : (
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-full ${avatarColor} text-sm font-bold text-white`}
                    >
                      {initials}
                    </div>
                  )}

                  <div className="max-w-[130px] min-w-0">
                    <p className="truncate text-sm font-bold text-[#0B1739]">{fullName}</p>
                    <p className="text-xs text-[#53657D]">{planName}</p>
                  </div>

                  <ChevronDown className="h-4 w-4 flex-none text-[#53657D]" strokeWidth={1.75} />
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg border border-[#D7E3F2] bg-white px-4 py-3 text-sm font-semibold text-[#0B1739] hover:border-[#1677FF]/40 hover:bg-[#F5F8FC] sm:px-5"
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.75} />
                  Logout
                </button>
              </div>
            </header>

            <section className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1677FF]">
                Learning Dashboard
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-[#0B1739] sm:text-3xl">
                Welcome back, {fullName}
              </h2>
              <p className="mt-1 text-sm text-[#53657D]">
                Choose what you want to learn. GAHN saves lesson activity, evidence, notes, and mastery state as you work.
              </p>
            </section>

            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { Icon: Flame, number: String(streak), label: "Day Streak" },
                { Icon: BookOpen, number: String(activeLessons.length), label: "Active Lessons" },
                { Icon: ListChecks, number: String(masteredLessons.length), label: "Mastered Lessons" },
                { Icon: StickyNote, number: String(notesCount), label: "Saved Notes" },
              ].map(({ Icon, number, label }) => (
                <div
                  key={label}
                  className="min-w-0 rounded-2xl border border-[#D7E3F2] bg-white px-3 py-3 shadow-[0_8px_24px_rgba(11,23,57,0.04)]"
                >
                  <div className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xl font-bold leading-none text-[#0B1739]">{number}</p>
                      <p className="mt-1 whitespace-normal text-xs font-semibold leading-4 text-[#53657D]">{label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section className="mt-6">
              <h3 className="text-xl font-bold text-[#0B1739]">Choose Your Learning World</h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                {worlds.map(({ slug, Icon, title, text }) => (
                  <Link
                    href={`/learn/${slug}`}
                    key={title}
                    className="rounded-2xl border border-[#D7E3F2] bg-white p-4 shadow-[0_8px_24px_rgba(11,23,57,0.04)] hover:border-[#1677FF]/40 hover:shadow-md"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h4 className="mt-4 text-sm font-bold uppercase leading-tight text-[#0B1739]">{title}</h4>
                    <p className="mt-3 text-xs leading-5 text-[#53657D]">{text}</p>
                    <div className="mt-5 inline-block rounded-lg bg-[#1677FF] px-4 py-2 text-xs font-semibold text-white">
                      Explore →
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2">
              <DashboardMiniCard title="Learning Overview" sideText="Latest">
                <p className="text-base font-bold leading-6 text-[#0B1739]">
                  {recentLearning?.lesson_title || "No lesson started yet"}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#53657D]">
                  {recentLearning
                    ? `${recentLearning.topic} · ${recentLearning.mastery_state?.replace("_", " ") || "learning"} · ${recentLearning.correct_count}/${recentLearning.attempts_count} checked answers`
                    : "Choose a learning world and start a lesson. Your real activity will appear here."}
                </p>
              </DashboardMiniCard>

              <DashboardMiniCard title="What To Do Next">
                <p className="text-base font-bold leading-6 text-[#0B1739]">
                  {nextRecommendation?.lesson_title || "Start your first lesson"}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#53657D]">
                  {reviewLessons.length
                    ? "This lesson has evidence that needs review. Revisit it before moving on."
                    : activeLessons.length
                      ? "Continue where you left off and build enough evidence to reach mastery."
                      : "Pick one path and complete the first interactive lesson."}
                </p>
              </DashboardMiniCard>

              <DashboardMiniCard title="Mastery Evidence">
                <p className="text-base font-bold leading-6 text-[#0B1739]">
                  {masteredLessons.length} mastered · {reviewLessons.length} need review
                </p>
                <p className="mt-2 text-sm leading-6 text-[#53657D]">
                  GAHN uses saved answers, retries, activities, and mastery checks instead of inventing a progress percentage.
                </p>
              </DashboardMiniCard>

              <DashboardMiniCard title="Saved Notes">
                <p className="text-base font-bold leading-6 text-[#0B1739]">
                  {notesCount} note{notesCount === 1 ? "" : "s"}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#53657D]">
                  Notes saved inside lessons are kept in your learning account.
                </p>
              </DashboardMiniCard>
            </section>

            <section className="mt-6 grid gap-4 xl:hidden">
              <DashboardRightColumn progressRows={progressRows} />
            </section>
          </section>
        </div>

        <aside className="hidden space-y-4 border-l border-[#D7E3F2] bg-white p-5 xl:block">
          <DashboardRightColumn progressRows={progressRows} />
        </aside>
      </div>
    </main>
  );
}

function DashboardMiniCard({
  title,
  sideText,
  linkText,
  children,
}: {
  title: string;
  sideText?: string;
  linkText?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <h3 className="min-w-0 text-base font-bold leading-6 text-[#0B1739]">{title}</h3>

        {sideText && (
          <span className="shrink-0 pt-0.5 text-xs font-semibold text-[#53657D]">{sideText}</span>
        )}

        {linkText && (
          <Link
            href="/in-progress"
            className="shrink-0 pt-0.5 text-sm font-semibold text-[#1677FF]"
          >
            {linkText}
          </Link>
        )}
      </div>

      <div className="mt-5 grid min-h-36 w-full place-items-center rounded-xl border border-dashed border-[#D7E3F2] bg-[#F5F8FC] px-5 py-7 text-center sm:px-6">
        <div className="mx-auto w-full max-w-[340px] text-center">{children}</div>
      </div>
    </div>
  );
}

function DashboardRightColumn({
  progressRows,
}: {
  progressRows: ProgressRow[];
}) {
  const mastered = progressRows.filter(
    (row) => row.mastery_state === "mastered"
  ).length;
  const needsReview = progressRows.filter(
    (row) => row.mastery_state === "needs_review"
  ).length;
  const active = progressRows.filter(
    (row) => row.status === "in_progress"
  ).length;

  return (
    <>
      <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
          <Bot className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <h3 className="mt-4 text-base font-bold leading-5 text-[#0B1739]">GAHN Learning Studio</h3>
        <p className="mt-3 text-sm leading-6 text-[#53657D]">
          Start a lesson to use the instructor, Magic Canvas, voice input, notes, and saved mastery evidence.
        </p>
        <Link href="/learn/career-skills" className="mt-4 inline-flex text-sm font-semibold text-[#1677FF]">
          Start learning →
        </Link>
      </div>

      <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
        <h3 className="font-bold text-[#0B1739]">Learning Status</h3>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-[#F5F8FC] p-3">
            <p className="text-xl font-extrabold">{active}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#53657D]">Active</p>
          </div>
          <div className="rounded-xl bg-[#F5F8FC] p-3">
            <p className="text-xl font-extrabold">{mastered}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#53657D]">Mastered</p>
          </div>
          <div className="rounded-xl bg-[#F5F8FC] p-3">
            <p className="text-xl font-extrabold">{needsReview}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#53657D]">Review</p>
          </div>
        </div>
        <p className="mt-4 text-xs font-semibold leading-5 text-[#53657D]">
          These counts come from saved lesson evidence, not a generated percentage.
        </p>
      </div>

      <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
        <h3 className="font-bold text-[#0B1739]">Your Learning Data</h3>
        <p className="mt-3 text-sm leading-6 text-[#53657D]">
          GAHN keeps your lesson attempts, correct answers, retries, mastery state, and saved notes so the experience can adapt over time.
        </p>
        <Link href="/progress" className="mt-4 inline-flex text-sm font-semibold text-[#1677FF]">
          View progress →
        </Link>
      </div>
    </>
  );
}
