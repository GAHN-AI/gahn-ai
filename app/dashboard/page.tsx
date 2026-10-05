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
  ClipboardCheck,
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
  { label: "My Notes", Icon: NotebookPen, href: "/notes" },
  { label: "Study Guides", Icon: BookOpen, href: "/study-guides" },
  { label: "Progress", Icon: TrendingUp, href: "/progress" },
  { label: "Feedback", Icon: MessageSquareText, href: "/feedback" },
  { label: "Assigned Homework", Icon: ClipboardCheck, href: "/assigned-homework" },
];

const worlds: {
  slug: string;
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  eyebrow: string;
  imageUrl: string;
}[] = [
  {
    slug: "career-skills",
    Icon: BriefcaseBusiness,
    title: "Career Skills",
    subtitle: "Business, technology, finance, communication, and job skills.",
    eyebrow: "CAREER WORLD",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=82",
  },
  {
    slug: "school-help",
    Icon: GraduationCap,
    title: "School Help",
    subtitle: "Math, science, English, reading, study skills, and homework help.",
    eyebrow: "SCHOOL WORLD",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=84",
  },
  {
    slug: "brain-development",
    Icon: Brain,
    title: "Brain Development",
    subtitle: "Memory, focus, reasoning, habits, and learning performance.",
    eyebrow: "BRAIN WORLD",
    imageUrl: "https://images.unsplash.com/photo-1635321856029-68a8cbae50fe?auto=format&fit=crop&w=1200&q=82",
  },
  {
    slug: "general-knowledge",
    Icon: Globe2,
    title: "General Knowledge",
    subtitle: "History, technology, culture, life skills, and useful knowledge.",
    eyebrow: "KNOWLEDGE WORLD",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=82",
  },
  {
    slug: "book-intelligence",
    Icon: BookOpen,
    title: "Book Intelligence",
    subtitle: "Learn from books through guided explanations and practice.",
    eyebrow: "BOOK WORLD",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=82",
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
  imageUrl,
  Icon,
  title,
}: {
  imageUrl: string;
  Icon: LucideIcon;
  title: string;
}) {
  return (
    <div className="relative h-[200px] overflow-hidden rounded-[14px] border border-[#E7E7EA] bg-[linear-gradient(135deg,#0B1739,#1677FF)]">
      <img
        src={imageUrl}
        alt=""
        className="w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.025]"
        style={{ height: 200 }}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,12,30,0.02)_20%,rgba(5,12,30,0.62)_100%)]" />
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-white/80">
            Learning world
          </p>
          <p className="mt-1 truncate text-base font-semibold text-white">{title}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#0B5CFF] shadow-sm">
          <Icon className="h-5 w-5" />
        </span>
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
                <a
                  href="#learning-worlds"
                  className="group flex min-h-[76px] items-center gap-4 rounded-xl border border-[#E2E3E7] bg-white px-5 py-4 transition hover:border-[#C6D9FF] hover:shadow-[0_8px_24px_rgba(29,30,36,0.05)]"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#D7E5FF] text-[#0B5CFF]">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#1D1E24]">
                      Browse learning worlds
                    </span>
                    <span className="mt-0.5 block text-xs text-[#6C6D75]">
                      Choose the world that matches your goal
                    </span>
                  </span>
                </a>

                <Link
                  href="/assigned-homework"
                  className="group flex min-h-[76px] items-center gap-4 rounded-xl border border-[#E2E3E7] bg-white px-5 py-4 transition hover:border-[#C6D9FF] hover:shadow-[0_8px_24px_rgba(29,30,36,0.05)]"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#D7E5FF] text-[#0B5CFF]">
                    <ClipboardCheck className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#1D1E24]">
                      Assigned homework
                    </span>
                    <span className="mt-0.5 block text-xs text-[#6C6D75]">
                      Independent practice from School Help sessions
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
                      Upload school homework
                    </span>
                    <span className="mt-0.5 block text-xs text-[#6C6D75]">
                      Get guided help with an assignment you already have
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
                    {filteredWorlds.map(({ slug, Icon, title, subtitle, eyebrow, imageUrl }) => (
                      <Link
                        key={slug}
                        href={`/learn/${slug}`}
                        className="group block min-w-0"
                      >
                        <div className="transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_30px_rgba(29,30,36,0.08)]">
                          <WorldPreview imageUrl={imageUrl} Icon={Icon} title={title} />
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
