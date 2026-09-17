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
  CalendarDays,
  CheckCircle2,
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

type LearningProgressRow = {
  id: string;
  world_slug: string;
  topic: string;
  lesson_id: string;
  status: "in_progress" | "completed";
  progress_percent: number;
  score: number | null;
  started_at: string;
  last_activity_at: string;
  completed_at: string | null;
};

type AssignmentRow = {
  id: string;
  world_slug: string;
  topic: string | null;
  title: string;
  description: string | null;
  due_at: string | null;
  status: "assigned" | "in_progress" | "submitted" | "graded";
  score: number | null;
  max_score: number;
  created_at: string;
  submitted_at: string | null;
  graded_at: string | null;
};

type WorldDefinition = {
  slug: string;
  Icon: LucideIcon;
  title: string;
  text: string;
};

const navItems: { label: string; Icon: LucideIcon; href: string }[] = [
  { label: "Dashboard", Icon: LayoutDashboard, href: "/dashboard" },
  { label: "AI Instructors", Icon: Bot, href: "/in-progress" },
  { label: "My Notes", Icon: StickyNote, href: "/in-progress" },
  { label: "Certificates", Icon: Award, href: "/in-progress" },
  { label: "Portfolio", Icon: FolderKanban, href: "/in-progress" },
  { label: "Progress", Icon: TrendingUp, href: "/in-progress" },
  { label: "Community", Icon: Users, href: "/in-progress" },
];

const worlds: WorldDefinition[] = [
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

function formatDate(value: string | null) {
  if (!value) return "No due date";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatWorldName(slug: string) {
  return worlds.find((world) => world.slug === slug)?.title || slug;
}

function getPercentageScore(score: number | null, maxScore = 100) {
  if (score === null || !maxScore) return null;
  return Math.round((Number(score) / Number(maxScore)) * 100);
}

function getLetterGrade(score: number | null) {
  if (score === null) return "—";
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function dayKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

function calculateStreak(progress: LearningProgressRow[]) {
  if (!progress.length) return 0;

  const activeDays = new Set(
    progress.map((item) => dayKey(new Date(item.last_activity_at)))
  );

  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  if (!activeDays.has(dayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!activeDays.has(dayKey(cursor))) return 0;
  }

  let streak = 0;
  while (activeDays.has(dayKey(cursor))) {
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
  const [learningProgress, setLearningProgress] = useState<LearningProgressRow[]>([]);
  const [assignments, setAssignments] = useState<AssignmentRow[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const avatarColor = useMemo(() => getInitialColor(fullName), [fullName]);

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const fallbackName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Learner";

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, avatar_url, email")
        .eq("id", user.id)
        .maybeSingle();

      if (!profile) {
        await supabase.from("profiles").insert({
          id: user.id,
          full_name: fallbackName,
          avatar_url: "",
          email: user.email,
        });
        setFullName(fallbackName);
        setInitials(getInitials(fallbackName));
      } else {
        const savedName = profile.full_name || fallbackName;
        setFullName(savedName);
        setInitials(getInitials(savedName));
        setAvatarUrl(profile.avatar_url || "");
      }

      const [progressResult, assignmentResult] = await Promise.all([
        supabase
          .from("learning_progress")
          .select(
            "id, world_slug, topic, lesson_id, status, progress_percent, score, started_at, last_activity_at, completed_at"
          )
          .eq("user_id", user.id)
          .order("last_activity_at", { ascending: false }),
        supabase
          .from("assignments")
          .select(
            "id, world_slug, topic, title, description, due_at, status, score, max_score, created_at, submitted_at, graded_at"
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ]);

      if (!progressResult.error) {
        setLearningProgress(
          (progressResult.data || []).map((item) => ({
            ...item,
            progress_percent: Number(item.progress_percent || 0),
            score: item.score === null ? null : Number(item.score),
          })) as LearningProgressRow[]
        );
      }

      if (!assignmentResult.error) {
        setAssignments(
          (assignmentResult.data || []).map((item) => ({
            ...item,
            score: item.score === null ? null : Number(item.score),
            max_score: Number(item.max_score || 100),
          })) as AssignmentRow[]
        );
      }

      setDashboardLoading(false);
    }

    loadDashboard();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const dashboardData = useMemo(() => {
    const activeLessons = learningProgress.filter((item) => item.status === "in_progress");
    const completedTopics = learningProgress.filter((item) => item.status === "completed");
    const overallProgress = learningProgress.length
      ? Math.round(
          learningProgress.reduce(
            (total, item) => total + Number(item.progress_percent || 0),
            0
          ) / learningProgress.length
        )
      : 0;

    const openAssignments = assignments.filter(
      (item) => item.status === "assigned" || item.status === "in_progress"
    );

    const now = Date.now();
    const sevenDays = now + 7 * 24 * 60 * 60 * 1000;
    const overdueAssignments = openAssignments.filter(
      (item) => item.due_at && new Date(item.due_at).getTime() < now
    );
    const dueSoonAssignments = openAssignments.filter((item) => {
      if (!item.due_at) return false;
      const due = new Date(item.due_at).getTime();
      return due >= now && due <= sevenDays;
    });

    const gradedAssignments = assignments
      .filter((item) => item.score !== null)
      .sort(
        (a, b) =>
          new Date(b.graded_at || b.created_at).getTime() -
          new Date(a.graded_at || a.created_at).getTime()
      );

    const gradePercentages = gradedAssignments
      .map((item) => getPercentageScore(item.score, item.max_score))
      .filter((value): value is number => value !== null);

    const overallGrade = gradePercentages.length
      ? Math.round(
          gradePercentages.reduce((total, grade) => total + grade, 0) /
            gradePercentages.length
        )
      : null;

    const worldSummaries = worlds.map((world) => {
      const rows = learningProgress.filter((item) => item.world_slug === world.slug);
      const scored = rows.filter((item) => item.score !== null);
      const progress = rows.length
        ? Math.round(
            rows.reduce((total, item) => total + Number(item.progress_percent || 0), 0) /
              rows.length
          )
        : 0;
      const score = scored.length
        ? Math.round(
            scored.reduce((total, item) => total + Number(item.score || 0), 0) /
              scored.length
          )
        : null;

      return {
        ...world,
        progress,
        score,
        completed: rows.filter((item) => item.status === "completed").length,
      };
    });

    return {
      activeLessons,
      completedTopics,
      overallProgress,
      openAssignments,
      overdueAssignments,
      dueSoonAssignments,
      recentGrades: gradedAssignments.slice(0, 4),
      overallGrade,
      worldSummaries,
      streak: calculateStreak(learningProgress),
    };
  }, [assignments, learningProgress]);

  return (
    <main className="min-h-screen bg-[#F8FBFF] font-sans text-[#0B1739]">
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)_260px]">
        <aside className="border-r border-[#D7E3F2] bg-white p-4 sm:p-5 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo/favicon.png" alt="GAHN AI" className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14" />
            <div>
              <h1 className="text-xl font-extrabold tracking-[-0.02em] text-[#0B1739] sm:text-lg">GAHN AI</h1>
              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#53657D]">Global AI Human Helper Network</p>
            </div>
          </Link>

          <nav className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:block lg:space-y-1.5">
            {navItems.map(({ label, Icon, href }, index) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-2 rounded-lg px-3 py-3 text-xs font-semibold sm:text-sm lg:gap-3 lg:px-4 ${
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

          <div className="mt-6 rounded-2xl border border-[#D7E3F2] bg-[#F5F8FC] p-5 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#EAF3FF]">
              <Crown className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#0B1739]">Mastery Plan</h3>
            <p className="mt-2 text-sm leading-6 text-[#53657D]">Unlock certificates, portfolio tools, instructor support, and career features.</p>
            <Link href="/pricing" className="mt-5 block rounded-lg bg-[#1677FF] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0F65E8]">Upgrade Now</Link>
          </div>
        </aside>

        <div className="min-w-0">
          <section className="min-w-0 p-4 sm:p-6 xl:p-8">
            <header className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative w-full xl:max-w-xl">
                <input placeholder="Search for skills, topics, careers..." className="h-12 w-full rounded-lg border border-[#D7E3F2] bg-white px-5 pr-12 text-sm text-[#0B1739] outline-none focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15" />
                <Search className="pointer-events-none absolute right-4 top-3.5 h-5 w-5 text-[#53657D]" strokeWidth={1.75} />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3">
                <span className="flex items-center gap-2 rounded-full border border-[#D7E3F2] bg-white px-4 py-3 text-xs font-bold shadow-sm sm:text-sm">
                  <Flame className="h-4 w-4 text-[#1677FF]" strokeWidth={1.75} />
                  {dashboardData.streak} Day Streak
                </span>
                <Link href="/in-progress" className="grid h-11 w-11 place-items-center rounded-full border border-[#D7E3F2] bg-white text-[#0B1739] shadow-sm hover:bg-[#F5F8FC]">
                  <Bell className="h-4.5 w-4.5" strokeWidth={1.75} />
                </Link>
                <Link href="/in-progress" className="grid h-11 w-11 place-items-center rounded-full border border-[#D7E3F2] bg-white text-[#0B1739] shadow-sm hover:bg-[#F5F8FC]">
                  <MessageSquare className="h-4.5 w-4.5" strokeWidth={1.75} />
                </Link>

                <Link href="/profile" className="flex items-center gap-3 rounded-full border border-[#D7E3F2] bg-white px-3 py-2 shadow-sm">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={fullName} className="h-10 w-10 rounded-full object-cover" onError={() => setAvatarUrl("")} />
                  ) : (
                    <div className={`grid h-10 w-10 place-items-center rounded-full ${avatarColor} text-sm font-bold text-white`}>{initials}</div>
                  )}
                  <div className="max-w-[130px]">
                    <p className="truncate text-sm font-bold text-[#0B1739]">{fullName}</p>
                    <p className="text-xs text-[#53657D]">Free Plan</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-[#53657D]" strokeWidth={1.75} />
                </Link>

                <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg border border-[#D7E3F2] bg-white px-5 py-3 text-sm font-semibold text-[#0B1739] hover:border-[#1677FF]/40 hover:bg-[#F5F8FC]">
                  <LogOut className="h-4 w-4" strokeWidth={1.75} />
                  Logout
                </button>
              </div>
            </header>

            <section className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1677FF]">Learning Dashboard</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-[#0B1739] sm:text-3xl">Welcome back, {fullName}</h2>
              <p className="mt-1 text-sm text-[#53657D]">Track lessons, homework, deadlines, grades, and learning progress in one place.</p>
            </section>

            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { Icon: Flame, number: String(dashboardData.streak), label: "Day Streak" },
                { Icon: BookOpen, number: String(dashboardData.activeLessons.length), label: "Active Lessons" },
                { Icon: ListChecks, number: String(dashboardData.openAssignments.length), label: "Assigned Work" },
                { Icon: TrendingUp, number: `${dashboardData.overallProgress}%`, label: "Overall Progress" },
              ].map(({ Icon, number, label }) => (
                <div key={label} className="min-w-0 rounded-2xl border border-[#D7E3F2] bg-white px-3 py-3 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
                  <div className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xl font-bold leading-none text-[#0B1739]">{dashboardLoading ? "—" : number}</p>
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
                  <Link href={`/learn/${slug}`} key={title} className="rounded-2xl border border-[#D7E3F2] bg-white p-4 shadow-[0_8px_24px_rgba(11,23,57,0.04)] hover:border-[#1677FF]/40 hover:shadow-md">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h4 className="mt-4 text-sm font-bold uppercase leading-tight text-[#0B1739]">{title}</h4>
                    <p className="mt-3 text-xs leading-5 text-[#53657D]">{text}</p>
                    <div className="mt-5 inline-block rounded-lg bg-[#1677FF] px-4 py-2 text-xs font-semibold text-white">Explore →</div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#0B1739]">Continue Learning</h3>
                <Link href="/in-progress" className="text-sm font-semibold text-[#1677FF]">View All</Link>
              </div>

              {dashboardData.activeLessons.length ? (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {dashboardData.activeLessons.slice(0, 4).map((item) => (
                    <Link
                      key={item.id}
                      href={`/lesson/${encodeURIComponent(item.lesson_id || "custom")}?world=${encodeURIComponent(item.world_slug)}&topic=${encodeURIComponent(item.topic)}`}
                      className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)] hover:border-[#1677FF]/40"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1677FF]">{formatWorldName(item.world_slug)}</p>
                      <h4 className="mt-2 text-lg font-bold text-[#0B1739]">{item.topic}</h4>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#EAF3FF]">
                        <div className="h-full rounded-full bg-[#1677FF]" style={{ width: `${item.progress_percent}%` }} />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs font-semibold text-[#53657D]">
                        <span>{item.progress_percent}% complete</span>
                        <span>Continue →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-dashed border-[#D7E3F2] bg-white p-6 text-center shadow-sm sm:p-8">
                  <p className="text-lg font-bold text-[#0B1739] sm:text-xl">No active lessons yet.</p>
                  <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#53657D]">Start a topic in any learning world and it will appear here automatically.</p>
                </div>
              )}
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2">
              <DashboardMiniCard title="Learning Overview" sideText="This Week">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-2xl font-extrabold text-[#0B1739]">{dashboardData.activeLessons.length}</p>
                    <p className="mt-1 text-xs text-[#53657D]">Active</p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-[#0B1739]">{dashboardData.completedTopics.length}</p>
                    <p className="mt-1 text-xs text-[#53657D]">Completed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-[#0B1739]">{dashboardData.overallProgress}%</p>
                    <p className="mt-1 text-xs text-[#53657D]">Progress</p>
                  </div>
                </div>
              </DashboardMiniCard>

              <DashboardMiniCard title="Instructor Recommendations" linkText="View All">
                <p className="text-base font-bold leading-6 text-[#0B1739]">No recommendations yet</p>
                <p className="mt-2 text-sm leading-6 text-[#53657D]">Your instructor will recommend practice after you start a lesson.</p>
              </DashboardMiniCard>

              <DashboardMiniCard title="Recent Achievements" linkText="View All">
                <p className="text-base font-bold leading-6 text-[#0B1739]">No achievements yet</p>
                <p className="mt-2 text-sm leading-6 text-[#53657D]">Achievements appear after completed lessons.</p>
              </DashboardMiniCard>

              <HomeworkGradesCard
                assignments={dashboardData.openAssignments}
                dueSoon={dashboardData.dueSoonAssignments.length}
                overdue={dashboardData.overdueAssignments.length}
                overallGrade={dashboardData.overallGrade}
              />
            </section>

            <section className="mt-6 grid gap-4 2xl:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1739]">Recent Grades</h3>
                    <p className="mt-1 text-sm text-[#53657D]">Graded homework and assessments.</p>
                  </div>
                  <div className="rounded-xl bg-[#EAF3FF] px-4 py-3 text-right">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1677FF]">Overall</p>
                    <p className="mt-1 text-xl font-extrabold text-[#0B1739]">{dashboardData.overallGrade === null ? "—" : `${dashboardData.overallGrade}%`}</p>
                  </div>
                </div>

                {dashboardData.recentGrades.length ? (
                  <div className="mt-5 space-y-3">
                    {dashboardData.recentGrades.map((assignment) => {
                      const grade = getPercentageScore(assignment.score, assignment.max_score);
                      return (
                        <div key={assignment.id} className="flex items-center justify-between gap-4 rounded-xl border border-[#D7E3F2] bg-[#F8FBFF] p-4">
                          <div className="min-w-0">
                            <p className="truncate font-bold text-[#0B1739]">{assignment.title}</p>
                            <p className="mt-1 text-xs text-[#53657D]">{formatWorldName(assignment.world_slug)}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-lg font-extrabold text-[#1677FF]">{grade}%</p>
                            <p className="text-xs font-bold text-[#53657D]">{getLetterGrade(grade)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-5 rounded-xl border border-dashed border-[#D7E3F2] bg-[#F8FBFF] p-6 text-center">
                    <Award className="mx-auto h-5 w-5 text-[#1677FF]" />
                    <p className="mt-3 font-bold text-[#0B1739]">No grades yet</p>
                    <p className="mt-1 text-sm text-[#53657D]">Scores will appear here after graded work is completed.</p>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
                <h3 className="text-lg font-bold text-[#0B1739]">Progress Across All 5 Worlds</h3>
                <p className="mt-1 text-sm text-[#53657D]">Topic completion, average progress, and mastery scores.</p>

                <div className="mt-5 space-y-4">
                  {dashboardData.worldSummaries.map((world) => (
                    <div key={world.slug}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#EAF3FF] text-[#1677FF]">
                            <world.Icon className="h-4 w-4" strokeWidth={1.75} />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-[#0B1739]">{world.title}</p>
                            <p className="text-xs text-[#53657D]">{world.completed} completed topic{world.completed === 1 ? "" : "s"}</p>
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold text-[#0B1739]">{world.progress}%</p>
                          <p className="text-xs text-[#53657D]">Score {world.score === null ? "—" : `${world.score}%`}</p>
                        </div>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EAF3FF]">
                        <div className="h-full rounded-full bg-[#1677FF]" style={{ width: `${world.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 xl:hidden">
              <DashboardRightColumn
                overallProgress={dashboardData.overallProgress}
                dueSoon={dashboardData.dueSoonAssignments}
                overdue={dashboardData.overdueAssignments}
              />
            </section>
          </section>
        </div>

        <aside className="hidden space-y-4 border-l border-[#D7E3F2] bg-white p-5 xl:block">
          <DashboardRightColumn
            overallProgress={dashboardData.overallProgress}
            dueSoon={dashboardData.dueSoonAssignments}
            overdue={dashboardData.overdueAssignments}
          />
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
        {sideText && <span className="shrink-0 pt-0.5 text-xs font-semibold text-[#53657D]">{sideText}</span>}
        {linkText && <Link href="/in-progress" className="shrink-0 pt-0.5 text-sm font-semibold text-[#1677FF]">{linkText}</Link>}
      </div>
      <div className="mt-5 grid min-h-36 w-full place-items-center rounded-xl border border-dashed border-[#D7E3F2] bg-[#F5F8FC] px-5 py-7 text-center sm:px-6">
        <div className="mx-auto w-full max-w-[340px]">{children}</div>
      </div>
    </div>
  );
}

function HomeworkGradesCard({
  assignments,
  dueSoon,
  overdue,
  overallGrade,
}: {
  assignments: AssignmentRow[];
  dueSoon: number;
  overdue: number;
  overallGrade: number | null;
}) {
  return (
    <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold leading-6 text-[#0B1739]">Homework & Grades</h3>
        <span className="rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-bold text-[#1677FF]">{assignments.length} assigned</span>
      </div>

      <div className="mt-5 min-h-36 rounded-xl border border-dashed border-[#D7E3F2] bg-[#F5F8FC] p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-white p-3">
            <p className="text-lg font-extrabold text-[#0B1739]">{dueSoon}</p>
            <p className="mt-1 text-[11px] font-semibold text-[#53657D]">Due Soon</p>
          </div>
          <div className="rounded-lg bg-white p-3">
            <p className="text-lg font-extrabold text-[#0B1739]">{overdue}</p>
            <p className="mt-1 text-[11px] font-semibold text-[#53657D]">Overdue</p>
          </div>
          <div className="rounded-lg bg-white p-3">
            <p className="text-lg font-extrabold text-[#0B1739]">{overallGrade === null ? "—" : `${overallGrade}%`}</p>
            <p className="mt-1 text-[11px] font-semibold text-[#53657D]">Grade</p>
          </div>
        </div>

        {assignments.length ? (
          <div className="mt-3 space-y-2">
            {assignments.slice(0, 2).map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-left">
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-[#0B1739]">{assignment.title}</p>
                  <p className="mt-0.5 text-[11px] text-[#53657D]">{formatWorldName(assignment.world_slug)}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[#53657D]">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formatDate(assignment.due_at)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-center text-sm text-[#53657D]">No homework has been assigned yet.</p>
        )}
      </div>
    </div>
  );
}

function DashboardRightColumn({
  overallProgress,
  dueSoon,
  overdue,
}: {
  overallProgress: number;
  dueSoon: AssignmentRow[];
  overdue: AssignmentRow[];
}) {
  const schedule = [...overdue, ...dueSoon].slice(0, 3);

  return (
    <>
      <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
          <Bot className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <h3 className="mt-4 text-base font-bold leading-5 text-[#0B1739]">Your AI Instructor</h3>
        <p className="mt-3 text-sm leading-6 text-[#53657D]">Your instructor teaches inside each learning world and adapts lessons to the topic you choose.</p>
        <Link href="/in-progress" className="mt-4 inline-flex text-sm font-semibold text-[#1677FF]">AI Instructor →</Link>
      </div>

      <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
        <h3 className="font-bold text-[#0B1739]">Today&apos;s Schedule</h3>
        {schedule.length ? (
          <div className="mt-4 space-y-3">
            {schedule.map((assignment) => (
              <div key={assignment.id} className="rounded-xl border border-[#D7E3F2] bg-[#F8FBFF] p-3">
                <p className="text-sm font-bold text-[#0B1739]">{assignment.title}</p>
                <p className="mt-1 text-xs text-[#53657D]">Due {formatDate(assignment.due_at)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-[#D7E3F2] bg-[#F5F8FC] p-5 text-center text-sm text-[#53657D]">No lessons or assignments scheduled yet.</div>
        )}
      </div>

      <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
        <h3 className="font-bold text-[#0B1739]">Your Progress</h3>
        <div className="mx-auto mt-5 grid h-28 w-28 place-items-center rounded-full border-[12px] border-[#EAF3FF] text-2xl font-bold text-[#0B1739]">{overallProgress}%</div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#53657D]">
          <CheckCircle2 className="h-4 w-4 text-[#1677FF]" />
          Across all learning worlds
        </div>
      </div>

      <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
        <h3 className="font-bold text-[#0B1739]">Community Feed</h3>
        <div className="mt-4 rounded-xl border border-dashed border-[#D7E3F2] bg-[#F5F8FC] p-5 text-center text-sm text-[#53657D]">Community activity appears after launch.</div>
      </div>
    </>
  );
}
