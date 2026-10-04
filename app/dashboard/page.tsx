"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  ChevronDown,
  Clock3,
  FileText,
  Globe2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  NotebookPen,
  Rocket,
  Search,
  Sparkles,
  TrendingUp,
  Upload,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

const sidebarItems: { label: string; Icon: LucideIcon; href: string }[] = [
  { label: "Recents", Icon: Clock3, href: "/dashboard" },
  { label: "Learning Worlds", Icon: LayoutDashboard, href: "#learning-worlds" },
  { label: "My Notes", Icon: NotebookPen, href: "/notes" },
  { label: "Study Guides", Icon: BookOpen, href: "/study-guides" },
  { label: "Progress", Icon: TrendingUp, href: "/progress" },
  { label: "Feedback", Icon: MessageSquareText, href: "/feedback" },
];

const worlds: {
  slug: string;
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  eyebrow: string;
}[] = [
  {
    slug: "career-skills",
    Icon: BriefcaseBusiness,
    title: "Career Skills",
    subtitle: "Business, technology, finance, communication, and job skills.",
    eyebrow: "CAREER WORLD",
  },
  {
    slug: "school-help",
    Icon: GraduationCap,
    title: "School Help",
    subtitle: "Math, science, English, reading, study skills, and homework help.",
    eyebrow: "SCHOOL WORLD",
  },
  {
    slug: "brain-development",
    Icon: Brain,
    title: "Brain Development",
    subtitle: "Memory, focus, reasoning, habits, and learning performance.",
    eyebrow: "BRAIN WORLD",
  },
  {
    slug: "general-knowledge",
    Icon: Globe2,
    title: "General Knowledge",
    subtitle: "History, technology, culture, life skills, and useful knowledge.",
    eyebrow: "KNOWLEDGE WORLD",
  },
  {
    slug: "book-intelligence",
    Icon: BookOpen,
    title: "Book Intelligence",
    subtitle: "Learn from books through guided explanations and practice.",
    eyebrow: "BOOK WORLD",
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

function WorldPreview({
  slug,
  Icon,
  title,
}: {
  slug: string;
  Icon: LucideIcon;
  title: string;
}) {
  const common =
    "relative h-[220px] overflow-hidden rounded-[14px] border border-[#E7E7EA] bg-white";

  if (slug === "career-skills") {
    return (
      <div className={common}>
        <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(90deg,#0B5CFF,#59A2FF)]" />
        <div className="absolute left-6 top-7 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#0B5CFF] shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div className="absolute inset-x-6 bottom-5 rounded-xl border border-[#E7E7EA] bg-white p-4 shadow-[0_10px_28px_rgba(23,25,35,0.08)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6C6D75]">
            Career path
          </p>
          <p className="mt-1 text-base font-semibold text-[#1D1E24]">{title}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <span className="h-2 rounded-full bg-[#DCEAFF]" />
            <span className="h-2 rounded-full bg-[#BFD7FF]" />
            <span className="h-2 rounded-full bg-[#92BCFF]" />
          </div>
        </div>
      </div>
    );
  }

  if (slug === "school-help") {
    return (
      <div className={common}>
        <div className="absolute inset-0 bg-[#F8FAFF]" />
        <div className="absolute left-5 top-5 right-5 rounded-xl border border-[#DDE4F0] bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#0B5CFF]">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6C6D75]">
                School help
              </p>
              <p className="text-sm font-semibold text-[#1D1E24]">Choose a subject</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-3">
          {["Math", "Science", "English", "Reading"].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-[#E7E7EA] bg-white px-3 py-3 text-xs font-medium text-[#1D1E24]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slug === "brain-development") {
    return (
      <div className={common}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#F7FAFF,#EEF4FF)]" />
        <div className="absolute left-5 top-5 right-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6C6D75]">
              Learning practice
            </p>
            <p className="mt-1 text-base font-semibold text-[#1D1E24]">Build stronger skills</p>
          </div>
          <Icon className="h-6 w-6 text-[#0B5CFF]" />
        </div>
        <div className="absolute left-5 right-5 top-[92px] grid gap-3">
          {[
            ["Focus", "Short guided practice"],
            ["Memory", "Recall what you learned"],
            ["Reasoning", "Work through a challenge"],
          ].map(([label, text]) => (
            <div key={label} className="flex items-center justify-between rounded-lg border border-[#E1E7F0] bg-white px-4 py-3">
              <div>
                <p className="text-xs font-semibold text-[#1D1E24]">{label}</p>
                <p className="mt-0.5 text-[11px] text-[#6C6D75]">{text}</p>
              </div>
              <span className="h-2.5 w-2.5 rounded-sm bg-[#0B5CFF]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slug === "general-knowledge") {
    return (
      <div className={common}>
        <div className="absolute inset-0 bg-[#FAFAFB]" />
        <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#0B5CFF]">
          <Icon className="h-5 w-5" />
        </div>
        <p className="absolute left-5 top-[76px] text-base font-semibold text-[#1D1E24]">
          Explore useful knowledge
        </p>
        <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
          {["History", "Technology", "Culture", "Economics", "Geography", "Life skills"].map(
            (item) => (
              <div
                key={item}
                className="rounded-lg border border-[#E7E7EA] bg-white px-2 py-3 text-center text-[11px] font-medium text-[#1D1E24]"
              >
                {item}
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={common}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF,#F4F7FF)]" />
      <div className="absolute left-5 top-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#0B5CFF]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6C6D75]">
            Book learning
          </p>
          <p className="text-sm font-semibold text-[#1D1E24]">Read with guidance</p>
        </div>
      </div>
      <div className="absolute bottom-5 left-5 right-5 space-y-3">
        {[88, 72, 58].map((width, index) => (
          <div
            key={width}
            className="rounded-lg border border-[#E7E7EA] bg-white p-3 shadow-sm"
          >
            <div
              className="h-2 rounded-full bg-[#D9E8FF]"
              style={{ width: `${width}%` }}
            />
            <div
              className="mt-2 h-2 rounded-full bg-[#ECEEF2]"
              style={{ width: `${Math.max(width - 18, 38)}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("Learner");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [planName, setPlanName] = useState("Explore");
  const [planId, setPlanId] = useState("explore");
  const [progressRows, setProgressRows] = useState<ProgressRow[]>([]);
  const [notesCount, setNotesCount] = useState(0);
  const [studyGuidesCount, setStudyGuidesCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"worlds" | "activity">("worlds");

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

      const [subscriptionResponse, progressResult, notesResult, guidesResult] =
        await Promise.all([
          fetch("/api/subscription/current"),
          supabase
            .from("learning_progress")
            .select(
              "world_slug, section_slug, topic_slug, lesson_id, lesson_title, topic, status, mastery_state, attempts_count, correct_count, retry_count, evidence, last_activity_at"
            )
            .eq("user_id", user.id)
            .order("last_activity_at", { ascending: false }),
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

      setProgressRows((progressResult.data || []) as ProgressRow[]);
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

  const recentLearning = meaningfulProgressRows[0] || null;
  const activeLessons = meaningfulProgressRows.filter(
    (row) => row.status === "in_progress"
  );
  const masteredLessons = meaningfulProgressRows.filter(
    (row) => row.mastery_state === "mastered"
  );

  const totalAttempts = meaningfulProgressRows.reduce(
    (sum, row) => sum + (row.attempts_count || 0),
    0
  );

  const filteredWorlds = worlds.filter((world) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return (
      world.title.toLowerCase().includes(query) ||
      world.subtitle.toLowerCase().includes(query) ||
      world.eyebrow.toLowerCase().includes(query)
    );
  });

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-white font-sans text-[#1D1E24]">
      <div className="min-h-screen lg:grid lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="hidden min-h-screen border-r border-[#E7E7EA] bg-white lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-screen">
          <div className="flex items-center justify-between px-5 pt-5">
            <Link href="/profile" className="flex min-w-0 items-center gap-3">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={fullName}
                  className="h-9 w-9 rounded-lg object-cover"
                />
              ) : (
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#EEF4FF] text-xs font-bold text-[#0B5CFF]">
                  {initials}
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-semibold text-[#1D1E24]">
                    {fullName}
                  </p>
                  <ChevronDown className="h-3.5 w-3.5 text-[#6C6D75]" />
                </div>
                <p className="mt-0.5 truncate text-xs text-[#6C6D75]">{planName}</p>
              </div>
            </Link>

            <button
              type="button"
              aria-label="Notifications"
              className="grid h-9 w-9 place-items-center rounded-lg text-[#4F515A] transition hover:bg-[#F6F6F8]"
            >
              <Bell className="h-4 w-4" />
            </button>
          </div>

          <Link
            href="/pricing"
            className="mx-4 mt-5 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#6F45E8] transition hover:bg-[#F6F2FF]"
          >
            <Rocket className="h-4 w-4" />
            {planId === "explore" ? "Upgrade your learning plan" : "View your learning plan"}
          </Link>

          <div className="relative mx-4 mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9698A1]" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search learning worlds"
              className="h-10 w-full rounded-lg border border-[#DEDFE4] bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-[#9698A1] focus:border-[#A9C9FF] focus:ring-2 focus:ring-[#EAF2FF]"
            />
          </div>

          <nav className="mt-4 space-y-1 px-3">
            {sidebarItems.map(({ label, Icon, href }, index) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  index === 0
                    ? "bg-[#F1F1F3] text-[#1D1E24]"
                    : "text-[#4F515A] hover:bg-[#F6F6F8] hover:text-[#1D1E24]"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-5 border-t border-[#EEEEF1] px-5 pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#92949D]">
              Learning
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between text-[#4F515A]">
                <span>Saved notes</span>
                <span className="font-semibold text-[#1D1E24]">{notesCount}</span>
              </div>
              <div className="flex items-center justify-between text-[#4F515A]">
                <span>Study guides</span>
                <span className="font-semibold text-[#1D1E24]">{studyGuidesCount}</span>
              </div>
            </div>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-xl border border-[#E7E7EA] bg-[#FAFAFB] p-4">
              <div className="flex items-center gap-2 text-[#0B5CFF]">
                <Sparkles className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-[0.12em]">
                  GAHN AI
                </p>
              </div>
              <p className="mt-3 text-sm font-semibold text-[#1D1E24]">
                Private learning workspace
              </p>
              <p className="mt-1 text-xs leading-5 text-[#6C6D75]">
                Your worlds, lessons, notes, study guides, and progress in one place.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#5C5E66] transition hover:bg-[#F6F6F8] hover:text-[#1D1E24]"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </aside>

        <section className="min-w-0 bg-white">
          <header className="flex items-center justify-between border-b border-[#EEEEF1] px-5 py-4 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo/favicon.png"
                alt="GAHN AI"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="font-semibold">GAHN AI</span>
            </Link>
            <Link
              href="/profile"
              className="grid h-9 w-9 place-items-center rounded-lg bg-[#EEF4FF] text-xs font-bold text-[#0B5CFF]"
            >
              {initials}
            </Link>
          </header>

          <div className="mx-auto w-full max-w-[1320px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div>
              <h1 className="text-[30px] font-semibold tracking-[-0.035em] text-[#1D1E24]">
                Recents
              </h1>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <Link
                  href="/learn/career-skills"
                  className="group flex min-h-[76px] items-center gap-4 rounded-xl border border-[#E2E3E7] bg-white px-5 py-4 transition hover:border-[#C6D9FF] hover:shadow-[0_8px_24px_rgba(29,30,36,0.05)]"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#D7E5FF] text-[#0B5CFF]">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#1D1E24]">
                      Start a new lesson
                    </span>
                    <span className="mt-0.5 block text-xs text-[#6C6D75]">
                      Choose a learning world
                    </span>
                  </span>
                </Link>

                <Link
                  href={resumeHref(recentLearning)}
                  className="group flex min-h-[76px] items-center gap-4 rounded-xl border border-[#E2E3E7] bg-white px-5 py-4 transition hover:border-[#C6D9FF] hover:shadow-[0_8px_24px_rgba(29,30,36,0.05)]"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#D7E5FF] text-[#0B5CFF]">
                    <Clock3 className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#1D1E24]">
                      Continue learning
                    </span>
                    <span className="mt-0.5 block max-w-[220px] truncate text-xs text-[#6C6D75]">
                      {recentLearning?.lesson_title || "Your next lesson will appear here"}
                    </span>
                  </span>
                </Link>

                <Link
                  href="/learn/school-help/homework-upload"
                  className="group flex min-h-[76px] items-center gap-4 rounded-xl border border-[#E2E3E7] bg-white px-5 py-4 transition hover:border-[#C6D9FF] hover:shadow-[0_8px_24px_rgba(29,30,36,0.05)]"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#D7E5FF] text-[#0B5CFF]">
                    <Upload className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#1D1E24]">
                      Upload homework
                    </span>
                    <span className="mt-0.5 block text-xs text-[#6C6D75]">
                      Learn from an assignment you already have
                    </span>
                  </span>
                </Link>
              </div>
            </div>

            <section id="learning-worlds" className="mt-7">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setView("worlds")}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    view === "worlds"
                      ? "bg-[#ECECEF] text-[#1D1E24]"
                      : "text-[#5C5E66] hover:bg-[#F6F6F8]"
                  }`}
                >
                  Learning worlds
                </button>
                <button
                  type="button"
                  onClick={() => setView("activity")}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    view === "activity"
                      ? "bg-[#ECECEF] text-[#1D1E24]"
                      : "text-[#5C5E66] hover:bg-[#F6F6F8]"
                  }`}
                >
                  Your activity
                </button>
              </div>

              {view === "worlds" ? (
                <>
                  <div className="mt-6 grid gap-x-5 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
                    {filteredWorlds.map(({ slug, Icon, title, subtitle, eyebrow }) => (
                      <Link
                        key={slug}
                        href={`/learn/${slug}`}
                        className="group block min-w-0"
                      >
                        <div className="transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_30px_rgba(29,30,36,0.08)]">
                          <WorldPreview slug={slug} Icon={Icon} title={title} />
                        </div>
                        <div className="mt-3 px-0.5">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#8B8D96]">
                            {eyebrow}
                          </p>
                          <h2 className="mt-1 text-[16px] font-semibold text-[#1D1E24]">
                            {title}
                          </h2>
                          <p className="mt-1 text-[13px] leading-5 text-[#6C6D75]">
                            {subtitle}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {filteredWorlds.length === 0 && (
                    <div className="mt-8 rounded-xl border border-dashed border-[#D9DADE] bg-[#FAFAFB] p-8 text-center">
                      <p className="text-sm font-semibold text-[#1D1E24]">
                        No learning world matches “{searchQuery}”.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="mt-2 text-sm font-medium text-[#0B5CFF]"
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  <Link
                    href={resumeHref(recentLearning)}
                    className="rounded-xl border border-[#E2E3E7] bg-white p-5 transition hover:border-[#C6D9FF] hover:shadow-[0_8px_24px_rgba(29,30,36,0.05)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8B8D96]">
                      Most recent
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-[#1D1E24]">
                      {recentLearning?.lesson_title || "No lesson started yet"}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#6C6D75]">
                      {recentLearning
                        ? recentLearning.topic
                        : "Open a learning world and start your first lesson."}
                    </p>
                  </Link>

                  <Link
                    href="/progress"
                    className="rounded-xl border border-[#E2E3E7] bg-white p-5 transition hover:border-[#C6D9FF] hover:shadow-[0_8px_24px_rgba(29,30,36,0.05)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8B8D96]">
                      Progress
                    </p>
                    <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#1D1E24]">
                      {masteredLessons.length}
                    </p>
                    <p className="mt-1 text-sm text-[#6C6D75]">
                      mastered skill{masteredLessons.length === 1 ? "" : "s"}
                    </p>
                  </Link>

                  <div className="rounded-xl border border-[#E2E3E7] bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8B8D96]">
                      Learning activity
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-[#F7F7F8] p-3">
                        <p className="text-2xl font-semibold text-[#1D1E24]">
                          {activeLessons.length}
                        </p>
                        <p className="mt-1 text-xs text-[#6C6D75]">active lessons</p>
                      </div>
                      <div className="rounded-lg bg-[#F7F7F8] p-3">
                        <p className="text-2xl font-semibold text-[#1D1E24]">
                          {totalAttempts}
                        </p>
                        <p className="mt-1 text-xs text-[#6C6D75]">checked answers</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/notes"
                    className="rounded-xl border border-[#E2E3E7] bg-white p-5 transition hover:border-[#C6D9FF]"
                  >
                    <FileText className="h-5 w-5 text-[#0B5CFF]" />
                    <h3 className="mt-4 text-base font-semibold text-[#1D1E24]">
                      Saved notes
                    </h3>
                    <p className="mt-1 text-sm text-[#6C6D75]">
                      {notesCount} note{notesCount === 1 ? "" : "s"} saved to your account
                    </p>
                  </Link>

                  <Link
                    href="/study-guides"
                    className="rounded-xl border border-[#E2E3E7] bg-white p-5 transition hover:border-[#C6D9FF]"
                  >
                    <BookOpen className="h-5 w-5 text-[#0B5CFF]" />
                    <h3 className="mt-4 text-base font-semibold text-[#1D1E24]">
                      Study guides
                    </h3>
                    <p className="mt-1 text-sm text-[#6C6D75]">
                      {studyGuidesCount} guide{studyGuidesCount === 1 ? "" : "s"} saved
                    </p>
                  </Link>
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
