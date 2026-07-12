"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const navItems = [
  ["🏠", "Dashboard"],
  ["💼", "Career Skills"],
  ["🎓", "School Help"],
  ["🧠", "Brain Development"],
  ["🌍", "General Knowledge"],
  ["📚", "Book Intelligence"],
  ["🤖", "AI Instructors"],
  ["📝", "My Notes"],
  ["🏆", "Certificates"],
  ["🗂️", "Portfolio"],
  ["📊", "Progress"],
  ["👥", "Community"],
];

const worlds = [
  ["💼", "Career Skills", "Build real skills. Get job ready."],
  ["🎓", "School Help", "Master your subjects. Excel in school."],
  ["🧠", "Brain Development", "Train your brain. Upgrade your mind."],
  ["🌍", "General Knowledge", "Learn life skills. Grow every day."],
  ["📚", "Book Intelligence", "Learn from books. Remember more."],
];

const instructors = [
  ["/instructors/lena.jpg", "Lena", "Medical Instructor"],
  ["/instructors/alex.jpg", "Alex", "Software Engineer"],
  ["/instructors/arin.jpg", "Arin", "Finance Instructor"],
  ["/instructors/jada.jpg", "jada", "Nurse Instructor"],
];

function getInitials(name: string) {
  return String(name)
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "AI";
}

function getInitialColor(name: string) {
  const colors = [
    "bg-[#071f4d]",
    "bg-blue-700",
    "bg-violet-700",
    "bg-indigo-700",
    "bg-sky-700",
    "bg-cyan-700",
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
    <main className="min-h-screen bg-[#f4f7fb] text-[#061633]">
      <div className="mx-auto grid min-h-screen w-full max-w-[1800px] grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] 2xl:grid-cols-[280px_minmax(0,1fr)_340px]">
        <aside className="bg-[#02122b] p-4 text-white sm:p-5 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14"
            />
            <div>
              <h1 className="text-xl font-black sm:text-2xl">GAHN AI</h1>
              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-blue-200/70">
                Global AI Human Helper Network
              </p>
            </div>
          </Link>

          <nav className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:block lg:space-y-2">
            {navItems.map(([icon, item], index) => (
              <Link
                key={item}
                href={index === 0 ? "/dashboard" : "/in-progress"}
                className={`flex items-center gap-2 rounded-xl px-3 py-3 text-xs font-bold transition sm:text-sm lg:gap-3 lg:px-4 ${
                  index === 0
                    ? "bg-white text-[#061633]"
                    : "text-blue-100 hover:bg-white/10"
                }`}
              >
                <span>{icon}</span>
                <span className="truncate">{item}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-6 rounded-2xl border border-blue-300/20 bg-[#061633] p-5 text-center shadow-xl">
            <div className="text-4xl">👑</div>
            <h3 className="mt-3 text-xl font-black">Mastery Plan</h3>
            <p className="mt-2 text-sm leading-6 text-blue-100/70">
              Unlock certificates, portfolio tools, instructor support, and career features.
            </p>
            <Link
              href="/pricing"
              className="mt-5 block rounded-xl bg-white px-4 py-3 text-sm font-black text-[#061633]"
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
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-5 pr-12 text-sm shadow-sm outline-none"
                />
                <span className="absolute right-4 top-3 text-slate-400">⌕</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white px-4 py-3 text-xs font-bold shadow-sm sm:text-sm">
                  🔥 0 Day Streak
                </span>

                <Link
                  href="/in-progress"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white text-lg shadow-sm"
                >
                  🔔
                </Link>

                <Link
                  href="/in-progress"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white text-lg shadow-sm"
                >
                  💬
                </Link>

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
                    <div className={`grid h-10 w-10 place-items-center rounded-full ${avatarColor} text-sm font-black text-white`}>
                      {initials}
                    </div>
                  )}

                  <div className="max-w-[130px]">
                    <p className="truncate text-sm font-black">{fullName}</p>
                    <p className="text-xs text-slate-500">Free Plan</p>
                  </div>

                  <span className="text-sm font-black">⌄</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </header>

            <section className="mt-8">
              <h2 className="text-2xl font-black sm:text-3xl">
                Welcome back, {fullName} 👋
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Continue your learning journey. Your progress starts after your first lesson.
              </p>
            </section>

            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["🔥", "0", "Day Streak"],
                ["📘", "0", "Active Lessons"],
                ["🏆", "0", "Certificates"],
                ["⭕", "0%", "Overall Progress"],
              ].map(([icon, number, label]) => (
                <div key={label} className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-2xl">
                      {icon}
                    </div>
                    <div>
                      <p className="text-2xl font-black">{number}</p>
                      <p className="text-xs font-bold text-slate-500">{label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section className="mt-6">
              <h3 className="text-xl font-black">Choose Your Learning World</h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                {worlds.map(([icon, title, text]) => (
                  <Link
                    href="/in-progress"
                    key={title}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#071f4d] text-2xl text-white">
                      {icon}
                    </div>
                    <h4 className="mt-4 text-sm font-black uppercase leading-tight">
                      {title}
                    </h4>
                    <p className="mt-3 text-xs leading-5 text-slate-600">{text}</p>
                    <div className="mt-5 inline-block rounded-lg bg-[#071f4d] px-4 py-2 text-xs font-bold text-white">
                      Explore →
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black">Continue Learning</h3>
                <Link href="/in-progress" className="text-sm font-bold text-blue-600">
                  View All
                </Link>
              </div>

              <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm sm:p-8">
                <p className="text-lg font-black sm:text-xl">
                  Your saved work will be displayed here.
                </p>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  After you start lessons, this section will show your active lessons,
                  saved notes, practice, projects, and recent progress.
                </p>
              </div>
            </section>

            <section className="mt-6 grid gap-4 xl:grid-cols-3">
              <DashboardMiniCard title="Learning Overview" sideText="This Week">
                <p className="font-black">No learning data yet</p>
                <p className="mt-1 text-sm text-slate-500">
                  Activity appears after your first lesson.
                </p>
              </DashboardMiniCard>

              <DashboardMiniCard title="Instructor Recommendations" linkText="View All">
                <p className="text-sm font-black">No recommendations yet</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your instructors will recommend practice after you start a lesson.
                </p>
              </DashboardMiniCard>

              <DashboardMiniCard title="Recent Achievements" linkText="View All">
                <p className="text-sm text-slate-500">
                  Achievements appear after completed lessons.
                </p>
              </DashboardMiniCard>
            </section>

            <section className="mt-6 grid gap-4 2xl:hidden">
              <DashboardRightColumn />
            </section>
          </section>
        </div>

        <aside className="hidden space-y-4 p-5 2xl:block">
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
      <div className="flex items-center justify-between">
        <h3 className="font-black">{title}</h3>
        {sideText && <span className="text-xs font-bold text-slate-400">{sideText}</span>}
        {linkText && (
          <Link href="/in-progress" className="text-sm text-blue-600">
            {linkText}
          </Link>
        )}
      </div>

      <div className="mt-5 grid min-h-36 place-items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
        <div>{children}</div>
      </div>
    </div>
  );
}

function DashboardRightColumn() {
  return (
    <>
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-black">AI Instructor</h3>
          <Link href="/in-progress" className="text-sm text-blue-600">
            View All
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {instructors.map(([image, name, role]) => (
            <div
              key={name}
              className="flex items-center gap-3 rounded-xl border border-slate-200 p-3"
            >
              <img
                src={image}
                alt={name}
                className="h-12 w-12 rounded-xl object-cover object-top"
              />
              <div>
                <p className="text-sm font-black">{name}</p>
                <p className="text-xs text-slate-500">{role}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/in-progress"
          className="mt-4 block rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white"
        >
          Choose Instructor
        </Link>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="font-black">Today&apos;s Schedule</h3>
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500">
          No lessons scheduled yet.
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="font-black">Your Progress</h3>
        <div className="mx-auto mt-5 grid h-28 w-28 place-items-center rounded-full border-[12px] border-slate-200 text-2xl font-black">
          0%
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="font-black">Community Feed</h3>
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500">
          Community activity appears after launch.
        </div>
      </div>
    </>
  );
}