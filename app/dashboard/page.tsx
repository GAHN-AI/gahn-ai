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
  LogOut,
  MessageSquare,
  Search,
  StickyNote,
  TrendingUp,
  Users,
} from "lucide-react";

const navItems: { label: string; Icon: LucideIcon }[] = [
  { label: "Dashboard", Icon: LayoutDashboard },
  { label: "Career Skills", Icon: Briefcase },
  { label: "School Help", Icon: GraduationCap },
  { label: "Brain Development", Icon: Brain },
  { label: "General Knowledge", Icon: Globe2 },
  { label: "Book Intelligence", Icon: BookOpen },
  { label: "AI Instructors", Icon: Bot },
  { label: "My Notes", Icon: StickyNote },
  { label: "Certificates", Icon: Award },
  { label: "Portfolio", Icon: FolderKanban },
  { label: "Progress", Icon: TrendingUp },
  { label: "Community", Icon: Users },
];

const worlds: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: Briefcase, title: "Career Skills", text: "Build real skills. Get job ready." },
  { Icon: GraduationCap, title: "School Help", text: "Master your subjects. Excel in school." },
  { Icon: Brain, title: "Brain Development", text: "Train your brain. Upgrade your mind." },
  { Icon: Globe2, title: "General Knowledge", text: "Learn life skills. Grow every day." },
  { Icon: BookOpen, title: "Book Intelligence", text: "Learn from books. Remember more." },
];

const instructors = [
  { image: "/instructors/lena.jpg", name: "Lena", role: "Medical Instructor" },
  { image: "/instructors/alex.jpg", name: "Alex", role: "Software Engineer" },
  { image: "/instructors/arin.jpg", name: "Arin", role: "Finance Instructor" },
  { image: "/instructors/jada.jpg", name: "Jada", role: "Nurse Instructor" },
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
  const colors = ["bg-[#0A1628]", "bg-[#0F2247]", "bg-[#16305F]", "bg-[#2952A3]"];

  const total = String(name)
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return colors[total % colors.length];
}

function InstructorAvatar({ image, name }: { image: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`grid h-12 w-12 flex-none place-items-center rounded-xl text-sm font-bold text-white ${getInitialColor(
          name
        )}`}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={name}
      onError={() => setFailed(true)}
      className="h-12 w-12 flex-none rounded-xl object-cover object-top"
    />
  );
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
  const { error } = await supabase.auth.signOut({
    scope: "local",
  });

  if (error) {
    console.error("Logout failed:", error);
    alert("Logout failed. Please try again.");
    return;
  }

  window.location.replace("/login");
}

  return (
    <main className="min-h-screen bg-[#F7F8FA] font-sans text-[#0A1628]">
      <div className="mx-auto grid min-h-screen w-full max-w-[1800px] grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_340px]">
        <aside className="bg-[#0A1628] p-4 text-white sm:p-5 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14"
            />
            <div>
              <h1 className="text-xl font-extrabold tracking-[-0.02em] sm:text-2xl">
                GAHN AI
              </h1>
              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/50">
                Global AI Human Helper Network
              </p>
            </div>
          </Link>

          <nav className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:block lg:space-y-1.5">
            {navItems.map(({ label, Icon }, index) => (
              <Link
                key={label}
                href={index === 0 ? "/dashboard" : "/in-progress"}
                className={`flex items-center gap-2 rounded-lg px-3 py-3 text-xs font-semibold transition sm:text-sm lg:gap-3 lg:px-4 ${
                  index === 0
                    ? "bg-white text-[#0A1628]"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4 flex-none" strokeWidth={1.75} />
                <span className="truncate">{label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-white/15">
              <Crown className="h-5 w-5 text-[#7FA3E0]" strokeWidth={1.75} />
            </div>
            <h3 className="mt-4 text-lg font-bold">Mastery Plan</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Unlock certificates, portfolio tools, instructor support, and career features.
            </p>
            <Link
              href="/pricing"
              className="mt-5 block rounded-lg bg-white px-4 py-3 text-sm font-semibold text-[#0A1628] transition hover:bg-[#F7F8FA]"
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
                  className="h-12 w-full rounded-lg border border-[#E3E6EC] bg-white px-5 pr-12 text-sm outline-none focus:border-[#2952A3]"
                />
                <Search className="pointer-events-none absolute right-4 top-3.5 h-5 w-5 text-[#5B6472]" strokeWidth={1.75} />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-bold shadow-sm sm:text-sm">
                    <Flame className="h-4 w-4 text-[#2952A3]" strokeWidth={1.75} />
                    0 Day Streak
                  </span>

                  <Link
                    href="/in-progress"
                    className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#0A1628] shadow-sm"
                  >
                    <Bell className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </Link>

                  <Link
                    href="/in-progress"
                    className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#0A1628] shadow-sm"
                  >
                    <MessageSquare className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </Link>
                </div>

                <div className="flex flex-nowrap items-center gap-3">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-sm"
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={fullName}
                        className="h-10 w-10 rounded-full object-cover"
                        onError={() => setAvatarUrl("")}
                      />
                    ) : (
                      <div className={`grid h-10 w-10 place-items-center rounded-full ${avatarColor} text-sm font-bold text-white`}>
                        {initials}
                      </div>
                    )}

                    <div className="max-w-[130px]">
                      <p className="truncate text-sm font-bold">{fullName}</p>
                      <p className="text-xs text-[#5B6472]">Free Plan</p>
                    </div>

                    <ChevronDown className="h-4 w-4 text-[#5B6472]" strokeWidth={1.75} />
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-lg border border-[#E3E6EC] bg-white px-5 py-3 text-sm font-semibold text-[#0A1628] transition hover:border-[#0F2247]/30"
                  >
                    <LogOut className="h-4 w-4" strokeWidth={1.75} />
                    Logout
                  </button>
                </div>
              </div>
            </header>

            <section className="mt-8">
              <h2 className="text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
                Welcome back, {fullName}
              </h2>
              <p className="mt-1 text-sm text-[#5B6472]">
                Continue your learning journey. Your progress starts after your first lesson.
              </p>
            </section>

            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { Icon: Flame, number: "0", label: "Day Streak" },
                { Icon: BookOpen, number: "0", label: "Active Lessons" },
                { Icon: Award, number: "0", label: "Certificates" },
                { Icon: TrendingUp, number: "0%", label: "Overall Progress" },
              ].map(({ Icon, number, label }) => (
                <div key={label} className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#0F2247]/20 text-[#0F2247]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{number}</p>
                      <p className="text-xs font-semibold text-[#5B6472]">{label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section className="mt-6">
              <h3 className="text-xl font-bold">Choose Your Learning World</h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                {worlds.map(({ Icon, title, text }) => (
                  <Link
                    href="/in-progress"
                    key={title}
                    className="rounded-2xl border border-[#E3E6EC] bg-white p-4 shadow-sm transition hover:shadow-[0_16px_40px_rgba(15,34,71,0.08)]"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#0F2247] text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h4 className="mt-4 text-sm font-bold uppercase leading-tight">
                      {title}
                    </h4>
                    <p className="mt-3 text-xs leading-5 text-[#5B6472]">{text}</p>
                    <div className="mt-5 inline-block rounded-lg bg-[#0F2247] px-4 py-2 text-xs font-semibold text-white">
                      Explore →
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Continue Learning</h3>
                <Link href="/in-progress" className="text-sm font-semibold text-[#2952A3]">
                  View All
                </Link>
              </div>

              <div className="mt-4 rounded-2xl border border-dashed border-[#E3E6EC] bg-white p-6 text-center shadow-sm sm:p-8">
                <p className="text-lg font-bold sm:text-xl">
                  Your saved work will be displayed here.
                </p>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#5B6472]">
                  After you start lessons, this section will show your active lessons,
                  saved notes, practice, projects, and recent progress.
                </p>
              </div>
            </section>

            <section className="mt-6 grid gap-4 xl:grid-cols-3">
              <DashboardMiniCard title="Learning Overview" sideText="This Week">
                <p className="font-bold text-[#0A1628]">No learning data yet</p>
                <p className="mt-1 text-sm text-[#0A1628]">
                  Activity appears after your first lesson.
                </p>
              </DashboardMiniCard>

              <DashboardMiniCard title="Instructor Recommendations" linkText="View All">
                <p className="text-sm font-bold text-[#0A1628]">No recommendations yet</p>
                <p className="mt-1 text-xs leading-5 text-[#0A1628]">
                  Your instructors will recommend practice after you start a lesson.
                </p>
              </DashboardMiniCard>

              <DashboardMiniCard title="Recent Achievements" linkText="View All">
                <p className="text-sm font-bold text-[#0A1628]">No achievements yet</p>
                <p className="mt-1 text-xs leading-5 text-[#0A1628]">
                  Achievements appear after completed lessons.
                </p>
              </DashboardMiniCard>
            </section>

            <section className="mt-6 grid gap-4 xl:hidden">
              <DashboardRightColumn />
            </section>
          </section>
        </div>

        <aside className="hidden space-y-4 p-5 xl:block">
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
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
        <h3 className="font-bold">{title}</h3>
        {sideText && <span className="shrink-0 text-xs font-semibold text-[#5B6472]">{sideText}</span>}
        {linkText && (
          <Link href="/in-progress" className="shrink-0 text-sm font-semibold text-[#2952A3]">
            {linkText}
          </Link>
        )}
      </div>

      <div className="mt-5 grid min-h-36 w-full place-items-center rounded-xl border border-dashed border-[#E3E6EC] bg-[#F7F8FA] px-2 py-7 text-center">
  <div className="mx-auto w-full max-w-[240px] text-center">
    {children}
  </div>
</div>
    </div>
  );
}

function DashboardRightColumn() {
  return (
    <>
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">AI Instructor</h3>
          <Link href="/in-progress" className="text-sm font-semibold text-[#2952A3]">
            View All
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {instructors.map(({ image, name, role }) => (
            <div
              key={name}
              className="flex items-center gap-3 rounded-xl border border-[#E3E6EC] p-3"
            >
              <InstructorAvatar image={image} name={name} />
              <div>
                <p className="text-sm font-bold">{name}</p>
                <p className="text-xs text-[#5B6472]">{role}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/in-progress"
          className="mt-4 block rounded-lg bg-[#0F2247] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#16305F]"
        >
          Choose Instructor
        </Link>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="font-bold">Today&apos;s Schedule</h3>
        <div className="mt-4 rounded-xl border border-dashed border-[#E3E6EC] bg-[#F7F8FA] p-5 text-center text-sm text-[#5B6472]">
          No lessons scheduled yet.
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="font-bold">Your Progress</h3>
        <div className="mx-auto mt-5 grid h-28 w-28 place-items-center rounded-full border-[12px] border-[#E3E6EC] text-2xl font-bold">
          0%
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="font-bold">Community Feed</h3>
        <div className="mt-4 rounded-xl border border-dashed border-[#E3E6EC] bg-[#F7F8FA] p-5 text-center text-sm text-[#5B6472]">
          Community activity appears after launch.
        </div>
      </div>
    </>
  );
}