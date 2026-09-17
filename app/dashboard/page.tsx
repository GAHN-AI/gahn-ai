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
  { label: "AI Instructors", Icon: Bot, href: "/in-progress" },
  { label: "My Notes", Icon: StickyNote, href: "/in-progress" },
  { label: "Certificates", Icon: Award, href: "/in-progress" },
  { label: "Portfolio", Icon: FolderKanban, href: "/in-progress" },
  { label: "Progress", Icon: TrendingUp, href: "/in-progress" },
  { label: "Community", Icon: Users, href: "/in-progress" },
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

export default function DashboardPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("Learner");
  const [initials, setInitials] = useState("AI");
  const [avatarUrl, setAvatarUrl] = useState("");
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

          <div className="mt-6 rounded-2xl border border-[#D7E3F2] bg-[#F5F8FC] p-5 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#EAF3FF]">
              <Crown className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#0B1739]">Mastery Plan</h3>
            <p className="mt-2 text-sm leading-6 text-[#53657D]">
              Unlock certificates, portfolio tools, instructor support, and career features.
            </p>
            <Link
              href="/pricing"
              className="mt-5 block rounded-lg bg-[#1677FF] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0F65E8]"
            >
              Upgrade Now
            </Link>
          </div>
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
                  0 Day Streak
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
                    <p className="text-xs text-[#53657D]">Free Plan</p>
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
                Choose what you want to learn. Activity and progress will turn on after the live AI learning system is ready.
              </p>
            </section>

            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { Icon: Flame, number: "0", label: "Day Streak" },
                { Icon: BookOpen, number: "0", label: "Active Lessons" },
                { Icon: ListChecks, number: "0", label: "Assigned Work" },
                { Icon: TrendingUp, number: "0%", label: "Overall Progress" },
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
              <DashboardMiniCard title="Learning Overview" sideText="This Week">
                <p className="text-base font-bold leading-6 text-[#0B1739]">No learning overview</p>
                <p className="mt-2 text-sm leading-6 text-[#53657D]">
                  Learning activity will appear here after the live AI instructor system is enabled.
                </p>
              </DashboardMiniCard>

              <DashboardMiniCard title="Instructor Recommendations" linkText="View All">
                <p className="text-base font-bold leading-6 text-[#0B1739]">No recommendations yet</p>
                <p className="mt-2 text-sm leading-6 text-[#53657D]">
                  Recommendations will appear when live AI lessons are available.
                </p>
              </DashboardMiniCard>

              <DashboardMiniCard title="Recent Achievements" linkText="View All">
                <p className="text-base font-bold leading-6 text-[#0B1739]">No achievements yet</p>
                <p className="mt-2 text-sm leading-6 text-[#53657D]">
                  Achievements will appear after real lessons and mastery checks are enabled.
                </p>
              </DashboardMiniCard>

              <HomeworkGradesCard />
            </section>

            <section className="mt-6 grid gap-4 xl:hidden">
              <DashboardRightColumn />
            </section>
          </section>
        </div>

        <aside className="hidden space-y-4 border-l border-[#D7E3F2] bg-white p-5 xl:block">
          <DashboardRightColumn />
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

function HomeworkGradesCard() {
  return (
    <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <h3 className="min-w-0 text-base font-bold leading-6 text-[#0B1739]">Homework & Grades</h3>
        <span className="shrink-0 rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-bold text-[#1677FF]">
          0 assigned
        </span>
      </div>

      <div className="mt-5 min-h-36 rounded-xl border border-dashed border-[#D7E3F2] bg-[#F5F8FC] p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-white p-3">
            <p className="text-lg font-extrabold text-[#0B1739]">0</p>
            <p className="mt-1 text-[11px] font-semibold text-[#53657D]">Due Soon</p>
          </div>
          <div className="rounded-lg bg-white p-3">
            <p className="text-lg font-extrabold text-[#0B1739]">0</p>
            <p className="mt-1 text-[11px] font-semibold text-[#53657D]">Overdue</p>
          </div>
          <div className="rounded-lg bg-white p-3">
            <p className="text-lg font-extrabold text-[#0B1739]">—</p>
            <p className="mt-1 text-[11px] font-semibold text-[#53657D]">Grade</p>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-[#53657D]">
          Homework and grades will appear after live instructor assignments are enabled.
        </p>
      </div>
    </div>
  );
}

function DashboardRightColumn() {
  return (
    <>
      <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
          <Bot className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <h3 className="mt-4 text-base font-bold leading-5 text-[#0B1739]">Your AI Instructor</h3>
        <p className="mt-3 text-sm leading-6 text-[#53657D]">
          Your instructor experience will activate when the live AI teaching system is connected.
        </p>
        <Link href="/in-progress" className="mt-4 inline-flex text-sm font-semibold text-[#1677FF]">
          AI Instructor →
        </Link>
      </div>

      <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
        <h3 className="font-bold text-[#0B1739]">Today&apos;s Schedule</h3>
        <div className="mt-4 rounded-xl border border-dashed border-[#D7E3F2] bg-[#F5F8FC] p-5 text-center text-sm text-[#53657D]">
          No lessons or assignments scheduled yet.
        </div>
      </div>

      <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
        <h3 className="font-bold text-[#0B1739]">Your Progress</h3>
        <div className="mx-auto mt-5 grid h-28 w-28 place-items-center rounded-full border-[12px] border-[#EAF3FF] text-2xl font-bold text-[#0B1739]">
          0%
        </div>
        <p className="mt-4 text-center text-xs font-semibold leading-5 text-[#53657D]">
          Progress tracking will activate with live AI lessons.
        </p>
      </div>

      <div className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]">
        <h3 className="font-bold text-[#0B1739]">Community Feed</h3>
        <div className="mt-4 rounded-xl border border-dashed border-[#D7E3F2] bg-[#F5F8FC] p-5 text-center text-sm text-[#53657D]">
          Community activity appears after launch.
        </div>
      </div>
    </>
  );
}
