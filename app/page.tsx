"use client";

import Link from "next/link";

const worlds = [
  ["💼", "Career Skills", "Business, leadership, entrepreneurship, communication, and job-ready skills."],
  ["🎓", "School Help", "Math, science, writing, reading, study support, and guided homework help."],
  ["🧠", "Brain Development", "Memory, focus, discipline, reasoning, habits, and learning performance."],
  ["🌍", "General Knowledge", "History, technology, communication, culture, life skills, current events, and real-world knowledge."],
  ["📚", "Book Intelligence", "Turn books into summaries, lessons, quizzes, notes, and study paths."],
];

const instructors = [
  ["Lena", "Medical Instructor", "Healthcare basics, medical terminology, patient-care concepts, and clinical learning support.", "/instructors/lena.jpg"],
  ["Alex", "Software Engineer", "Coding, full-stack development, databases, debugging, and software project guidance.", "/instructors/alex.jpg"],
  ["Arin", "Finance Instructor", "Money management, business finance, investing basics, budgeting, and financial decision-making.", "/instructors/arin.jpg"],
  ["Jada", "Nurse Instructor", "Nursing fundamentals, patient support, care routines, safety, and healthcare readiness.", "/instructors/jada.jpg"],
];

const steps = [
  ["01", "Create your account", "Sign up, create your profile, and enter your dashboard."],
  ["02", "Choose a learning world", "Pick the area you want to improve first."],
  ["03", "Learn with AI instructors", "Get explanations, practice, corrections, and feedback."],
  ["04", "Track your growth", "Save notes, complete lessons, build skills, and unlock progress."],
];

const roadmap = [
  ["Stage 1", "Student dashboard, learning worlds, AI instructors, notes, and guided lessons."],
  ["Stage 2", "Certificates, portfolios, projects, assessments, and career-ready profiles."],
  ["Stage 3", "Teacher dashboards, classroom tools, school accounts, and advanced analytics."],
];

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-700 sm:text-xs sm:tracking-[0.24em]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-[#061633] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
        {text}
      </p>
    </div>
  );
}

function ProgramCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#071f4d] text-4xl text-white">
        {icon}
      </div>

      <p className="mt-6 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
        Program
      </p>
      <h3 className="mt-3 text-2xl font-black">{title}</h3>
      <p className="mt-3 min-h-[84px] text-sm leading-7 text-slate-600 sm:text-base">
        {text}
      </p>

      <Link
        href="/signup"
        className="mt-6 block rounded-xl border border-slate-300 bg-slate-50 px-5 py-4 text-center text-xs font-black uppercase tracking-[0.14em]"
      >
        Start {title}
      </Link>
    </div>
  );
}

function InstructorCard({
  name,
  role,
  desc,
  image,
}: {
  name: string;
  role: string;
  desc: string;
  image: string;
}) {
  return (
    <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex w-full flex-col">
        <div className="grid h-[360px] place-items-center bg-slate-50 p-5">
          <img
            src={image}
            alt={name}
            className="max-h-full max-w-full rounded-xl object-contain object-center"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-2xl font-black">{name}</h3>
          <p className="mt-1 text-sm font-black text-blue-700">{role}</p>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#061633] xl:[zoom:0.63]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-5">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-11 w-11 rounded-full object-cover"
            />
            <div>
              <p className="text-xl font-black tracking-tight">GAHN AI</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Global AI Human Helper Network
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-black uppercase tracking-[0.12em] lg:flex">
            <a href="#programs">Programs</a>
            <a href="#platform">Platform</a>
            <a href="#instructors">Instructors</a>
            <a href="#video-preview">Video</a>
            <a href="#schools">Schools</a>
            <Link href="/pricing">Pricing</Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
            <Link href="/login" className="rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-black uppercase tracking-[0.12em]">
              Log In
            </Link>
            <Link href="/signup" className="rounded-xl bg-[#071f4d] px-6 py-3 text-center text-sm font-black uppercase tracking-[0.12em] text-white">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f5f7fb]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,77,0.04)_1px,transparent_1px),linear-gradient(rgba(7,31,77,0.04)_1px,transparent_1px)] bg-[size:54px_54px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_430px] lg:py-24">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700 sm:text-sm sm:tracking-[0.24em]">
              AI learning platform
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-7xl">
              Learn faster with structured AI instruction.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-xl sm:leading-9">
              A serious learning platform for students, self-learners, and future classrooms. Choose a learning world, work with AI instructors, and build real skills with guided practice.
            </p>

            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
              <Link href="/signup" className="rounded-xl bg-[#071f4d] px-8 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-white">
                Start Learning
              </Link>
              <a href="#platform" className="rounded-xl border border-slate-300 bg-white px-8 py-4 text-center text-sm font-black uppercase tracking-[0.12em]">
                See How It Works
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
            <h2 className="text-2xl font-black">Ready to take your next step?</h2>
            <p className="mt-3 text-slate-600">Create your account and choose your first learning world.</p>

            <div className="mt-6 space-y-4">
              <select className="w-full rounded-xl border border-slate-300 px-4 py-4">
                <option>Select your learning world...</option>
                <option>Career Skills</option>
                <option>School Help</option>
                <option>Brain Development</option>
                <option>General Knowledge</option>
                <option>Book Intelligence</option>
              </select>

              <Link href="/signup" className="block rounded-xl bg-[#071f4d] px-5 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-white">
                Create Account
              </Link>
            </div>

            <div className="mt-8 border-t pt-6">
              <p className="font-black">Platform starts with:</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>✓ Learning dashboard</li>
                <li>✓ AI instructor previews</li>
                <li>✓ Lessons, notes, and progress</li>
                <li>✓ Certificates and portfolios planned</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="px-4 py-16 sm:px-6 sm:py-24">
        <SectionIntro
          eyebrow="Learning worlds"
          title="Choose the path that matches your goal."
          text="Each world is designed around a different learning problem: school support, career skills, personal growth, general knowledge, or book intelligence."
        />

        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {worlds.map(([icon, title, text]) => (
            <ProgramCard key={title} icon={icon} title={title} text={text} />
          ))}
        </div>
      </section>

      <section id="platform" className="bg-[#f5f7fb] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">
              Platform preview
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              A dashboard built around learning action.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              The dashboard is where users choose learning worlds, meet AI instructors, continue lessons, track progress, save notes, and build a skill portfolio over time.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Start with a clean dashboard after signup.",
                "Choose a learning world before lessons appear.",
                "Progress stays at zero until the user actually starts.",
                "Future upgrades add certificates, portfolios, and classroom tools.",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="font-black text-blue-700">✓</span>
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-5">
            <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4 sm:p-5">
              <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-black">Learning Dashboard</p>
                <span className="w-fit rounded bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  New account
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {["0 Day Streak", "0 Courses", "0 Certificates", "0% Progress"].map((item) => (
                  <div key={item} className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-black">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-white p-5 shadow-sm">
                <p className="font-black">Continue Learning</p>
                <p className="mt-2 text-sm text-slate-500">No courses started yet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="instructors" className="px-4 py-16 sm:px-6 sm:py-24">
        <SectionIntro
          eyebrow="AI instructors"
          title="Specialized instructors for different learning needs."
          text="Choose from focused AI instructors built for healthcare, software, finance, and nursing support. Each instructor is designed to guide lessons, explain concepts, and help learners practice."
        />

        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map(([name, role, desc, image]) => (
            <InstructorCard
              key={name}
              name={name}
              role={role}
              desc={desc}
              image={image}
            />
          ))}
        </div>
      </section>

      <section id="video-preview" className="bg-[#f5f7fb] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">
              AI instructor preview
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Watch a short preview of the learning experience.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              This video gives visitors a quick look at how an AI instructor can explain ideas, guide students, and make learning feel more personal.
            </p>

            <div className="mt-8 grid gap-3 sm:flex">
              <Link href="/signup" className="rounded-xl bg-[#071f4d] px-8 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-white">
                Start Learning
              </Link>
              <a href="#schools" className="rounded-xl border border-slate-300 bg-white px-8 py-4 text-center text-sm font-black uppercase tracking-[0.12em]">
                See Classroom Vision
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-5">
            <video
              controls
              preload="metadata"
              className="aspect-video w-full rounded-xl bg-black object-cover"
            >
              <source src="/videos/alessandra.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section id="schools" className="px-4 py-16 sm:px-6 sm:py-24">
        <SectionIntro
          eyebrow="Schools and classrooms"
          title="Built to expand from individual learners to classrooms."
          text="The long-term platform vision includes teacher dashboards, classroom analytics, student support, and school-level accounts."
        />

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            ["Teacher dashboard", "Teachers track student progress, lesson activity, and learning gaps."],
            ["Classroom AI support", "Students receive explanations and practice without waiting for one-on-one help."],
            ["School analytics", "Schools can review progress, usage, skills, and outcomes across classrooms."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-2xl font-black">{title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f5f7fb] px-4 py-16 sm:px-6 sm:py-24">
        <SectionIntro
          eyebrow="How it works"
          title="From signup to skill growth."
          text="The platform starts simple: create an account, choose a world, learn with instructors, and build progress over time."
        />

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([num, title, text]) => (
            <div key={num} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-sm font-black text-blue-700">{num}</p>
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <SectionIntro
          eyebrow="Expansion roadmap"
          title="A serious platform built in stages."
          text="The goal is to build the right foundation and expand with users, revenue, and demand."
        />

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {roadmap.map(([stage, text]) => (
            <div key={stage} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">{stage}</p>
              <p className="mt-4 leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f5f7fb] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">
              Get started
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Start with signup, then continue into your dashboard.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              New users create an account first. Returning users log in with their email and continue from the dashboard.
            </p>
          </div>

          <div className="grid gap-3">
            <Link href="/signup" className="rounded-xl bg-[#071f4d] px-8 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-white">
              Sign Up
            </Link>
            <Link href="/login" className="rounded-xl border border-slate-300 px-8 py-4 text-center text-sm font-black uppercase tracking-[0.14em]">
              Log In
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row">
          <div>
            <p className="text-2xl font-black">GAHN AI</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Global AI Human Helper Network
            </p>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 GAHN AI. Built for AI-powered learning.
          </p>
        </div>
      </footer>
    </main>
  );
}