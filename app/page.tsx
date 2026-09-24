"use client";

import Link from "next/link";
import { Inter } from "next/font/google";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Award,
  BarChart3,
  Bot,
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Flame,
  Globe2,
  GraduationCap,
  History,
  ListChecks,
  Menu,
  MessageSquare,
  Minus,
  StickyNote,
  TrendingUp,
  UserCircle2,
  Users,
  X,
  XCircle,
} from "lucide-react";
const sourceSans = Inter({
  subsets: ["latin"],
});
const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#programs", label: "Programs" },
  { href: "#platform", label: "Platform" },
  { href: "#instructors", label: "Instructors" },
  { href: "#how-it-works", label: "How It Works" },
];

const worlds = [
  {
    Icon: Briefcase,
    title: "Career Skills",
    text: "Business, leadership, entrepreneurship, communication, and job-ready skills.",
  },
  {
    Icon: GraduationCap,
    title: "School Help",
    text: "Math, science, writing, reading, study support, and guided homework help.",
  },
  {
    Icon: Brain,
    title: "Brain Development",
    text: "Memory, focus, discipline, reasoning, habits, and learning performance.",
  },
  {
    Icon: Globe2,
    title: "General Knowledge",
    text: "History, technology, communication, culture, life skills, current events, and real-world knowledge.",
  },
  {
    Icon: BookOpen,
    title: "Book Intelligence",
    text: "Turn books into summaries, lessons, quizzes, notes, and study paths.",
  },
];

const instructors = [
  {
    name: "Career Fields",
    instructorName: "Alex",
    role: "Career Skills Instructor",
    desc: "Explore a wide range of career skills, including communication, leadership, business, workplace habits, interviews, resumes, entrepreneurship, teamwork, and professional growth.",
    image: "/instructors/alexCareerSkills.png",
  },
  {
    name: "School Help",
    instructorName: "Henry",
    role: "School Help Instructor",
    desc: "Get guided support with math, science, reading, writing, history, homework, studying, assignments, and test preparation.",
    image: "/instructors/HenrySchoolHelp.jpg",
  },
  {
    name: "Brain Development",
    instructorName: "Aanya",
    role: "Brain Development Instructor",
    desc: "Strengthen focus, memory, discipline, reasoning, productive habits, emotional control, and learning performance.",
    image: "/instructors/AanyaBrainDevelopment.png",
  },
  {
    name: "General Knowledge",
    instructorName: "Sarah",
    role: "General Knowledge Instructor",
    desc: "Learn history, technology, culture, communication, life skills, current events, and practical real-world knowledge.",
    image: "/instructors/sarahGeneralKnowledge.png",
  },
  {
    name: "Book Intelligence",
    instructorName: "Hannah",
    role: "Book Intelligence Instructor",
    desc: "Understand books through summaries, key lessons, notes, quizzes, study paths, reading improvement, and practical applications.",
    image: "/instructors/HannahBookIntelligence.jpg",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your account",
    text: "Sign up, create your profile, and enter your dashboard.",
  },
  {
    number: "02",
    title: "Choose a learning world",
    text: "Pick the area you want to improve first.",
  },
  {
    number: "03",
    title: "Learn with AI instructors",
    text: "Get explanations, practice, corrections, and feedback.",
  },
  {
    number: "04",
    title: "Track your growth",
    text: "Save notes, complete lessons, build skills, and unlock progress.",
  },
];

const platformFeatures = [
  "Start with a clean dashboard after signup.",
  "Choose a learning world before lessons appear.",
  "Progress stays at zero until the user starts.",
  "Future upgrades add certificates, portfolios, and classroom tools.",
];

const previewPages = [
  { Icon: Bot, title: "AI Lesson", text: "The live teaching session with your instructor." },
  { Icon: StickyNote, title: "Notes", text: "Everything saved automatically as you learn." },
  { Icon: TrendingUp, title: "Progress", text: "Completion, streaks, and skill growth over time." },
  { Icon: History, title: "Learning History", text: "Every past session, searchable and reviewable." },
  { Icon: UserCircle2, title: "Instructor Page", text: "Meet your instructor and their teaching style." },
];

const schoolFeatures = [
  {
    Icon: Users,
    title: "Teacher dashboard",
    text: "Teachers track student progress, lesson activity, and learning gaps.",
  },
  {
    Icon: MessageSquare,
    title: "Classroom AI support",
    text: "Students receive explanations and practice without waiting for one-on-one help.",
  },
  {
    Icon: BarChart3,
    title: "School analytics",
    text: "Schools can review progress, usage, skills, and outcomes across classrooms.",
  },
];

const roadmap = [
  {
    stage: "Stage 1",
    text: "Student dashboard, learning worlds, AI instructors, notes, and guided lessons.",
  },
  {
    stage: "Stage 2",
    text: "Certificates, portfolios, projects, assessments, and career-ready profiles.",
  },
  {
    stage: "Stage 3",
    text: "Teacher dashboards, classroom tools, school accounts, and advanced analytics.",
  },
  {
    stage: "Stage 4",
    text: "Mobile apps, community features, employer partnerships, and interview preparation tools.",
  },
  {
    stage: "Stage 5",
    text: "Global expansion, university partnerships, enterprise plans, and a full certification network.",
  },
];

const comparisonRows: { feature: string; values: [boolean, boolean, boolean, boolean] }[] = [
  { feature: "Structured, sequential lessons", values: [true, false, false, true] },
  { feature: "Checks your understanding", values: [true, false, false, false] },
  { feature: "Corrects mistakes and asks you to retry", values: [true, false, false, false] },
  { feature: "Tracks progress across sessions", values: [true, false, false, true] },
  { feature: "Adapts pacing to how you're doing", values: [true, false, false, false] },
  { feature: "Built around active recall, not passive reading", values: [true, false, false, false] },
];

const comparisonColumns = ["GAHN AI", "ChatGPT", "Google Search", "Online Courses"];

const faqs = [
  {
    q: "What ages is GAHN AI built for?",
    a: "GAHN AI is designed to work for students, self-learners, and adults alike — the explanations stay clear and structured regardless of age or experience level.",
  },
  {
    q: "How does the AI check if I actually understood a lesson?",
    a: "Through recall questions, applied scenarios, and short practice exercises. If your answer shows a gap, the instructor re-explains and asks you to try again before continuing.",
  },
  {
    q: "What happens if I get an answer wrong?",
    a: "The instructor doesn't just mark it wrong and move on — it explains what was missed, walks through the correct approach, and asks you to retry so the concept actually sticks.",
  },
  {
    q: "Is my data and progress private?",
    a: "Yes. Your notes, lesson history, and progress are tied to your account and are not visible to other users. See the Security & Privacy section below for more detail.",
  },
  {
    q: "Can I use GAHN AI on my phone?",
    a: "Yes, the platform is fully responsive and works on phones, tablets, and desktop browsers.",
  },
  {
    q: "Will certificates be available?",
    a: "Certificates and portfolios are planned for a future stage of the platform, tied to Career Skills and School Help completions.",
  },
];

const footerColumns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Programs", href: "#programs" },
      { label: "Platform", href: "#platform" },
      { label: "Instructors", href: "#instructors" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Schools", href: "#schools" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "Security & Privacy", href: "#security" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const shellClass =
  "mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-12 2xl:px-16";

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
    <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-14">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1677FF]">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-[#0B1739] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-[17px] leading-8 text-[#53657D] sm:text-lg">
        {text}
      </p>
    </div>
  );
}

function HeroInstructorShowcase() {
  return (
    <div className="relative w-full min-w-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-5 -inset-y-8 rounded-[3rem] bg-[#EAF3FF]/45 blur-3xl"
      />

      <div className="relative min-w-0">
        <div className="mb-5 flex items-center justify-end">
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#D7E3F2] bg-white/90 px-3.5 py-2.5 text-[11px] font-bold text-[#0B1739] shadow-[0_10px_30px_rgba(11,23,57,0.08)] backdrop-blur-sm xl:text-xs">
            <BarChart3 className="h-4 w-4 text-[#1677FF]" strokeWidth={1.8} />
            Realistic AI Instructors. Real Progress.
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-2 items-end gap-3 sm:grid-cols-3 xl:grid-cols-5 xl:gap-3">
          {instructors.map((instructor, index) => (
            <div
              key={instructor.instructorName}
              className={`min-w-0 ${
                index === instructors.length - 1
                  ? "col-span-2 mx-auto w-1/2 sm:col-span-1 sm:w-auto"
                  : ""
              }`}
            >
              <div className="gahn-image-hover aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] border border-[#D7E3F2] bg-white shadow-[0_16px_38px_rgba(11,23,57,0.09)]">
                <img
                  src={instructor.image}
                  alt={`${instructor.instructorName}, ${instructor.role}`}
                  className="block h-full w-full object-cover object-top"
                />
              </div>

              <p className="mt-3 truncate text-center text-sm font-extrabold text-[#0B1739]">
                {instructor.instructorName}
              </p>

              <p className="mt-0.5 truncate text-center text-[10px] font-semibold text-[#53657D] 2xl:text-[11px]">
                {instructor.role.replace(" Instructor", "")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="w-full rounded-2xl border border-[#D7E3F2] bg-white p-3 shadow-sm sm:p-5">
      <div className="rounded-xl border border-[#D7E3F2] bg-[#ffffff] p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold leading-tight text-[#53657D] sm:text-xl">
              Welcome back,
            </p>
            <p className="text-xl font-extrabold leading-tight tracking-[-0.02em] text-[#0B1739] sm:text-2xl">
              Learner
            </p>
          </div>

          <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-bold text-[#53657D] shadow-sm">
            New account
          </span>
        </div>

        <div className="mt-6 grid gap-5 xl:grid-cols-[170px_minmax(0,1fr)]">
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-white p-3 shadow-sm sm:grid-cols-3 xl:block xl:space-y-2 xl:p-4">
            {[
              "Home",
              "My Learning",
              "Instructors",
              "Notes",
              "Progress",
              "Certificates",
            ].map((item, index) => (
              <div
                key={item}
                className={`rounded-lg px-3 py-3 text-center text-xs font-bold sm:text-sm xl:px-4 xl:text-left ${
                  index === 0 ? "bg-[#EAF3FF] text-[#1677FF]" : "text-[#53657D]"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="min-w-0">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {[
                { num: "0", label: "Day Streak", Icon: Flame },
                { num: "0", label: "Courses", Icon: BookOpen },
                { num: "0", label: "Certificates", Icon: Award },
                { num: "0%", label: "Progress", Icon: TrendingUp },
              ].map(({ num, label, Icon }) => (
                <div key={label} className="rounded-xl bg-white p-4 shadow-sm">
                  <Icon className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
                  <p className="mt-3 text-xl font-bold text-[#0B1739] sm:text-2xl">
                    {num}
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-[#53657D] sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-white p-5 shadow-sm sm:p-6">
              <p className="text-lg font-bold text-[#0B1739]">
                Continue Learning
              </p>
              <p className="mt-3 text-sm leading-6 text-[#53657D]">
                No courses started yet. Choose a learning world to begin your
                journey.
              </p>
              <Link
                href="/signup"
                className="mt-6 inline-flex rounded-lg bg-[#1677FF] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0F65E8]"
              >
                Choose a World
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgramCard({
  Icon,
  title,
  text,
}: {
  Icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="gahn-card-hover flex h-full flex-col rounded-[1.35rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_10px_30px_rgba(11,23,57,0.045)] lg:p-7">
      <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF] lg:h-16 lg:w-16">
        <Icon className="h-7 w-7" strokeWidth={1.5} />
      </div>

      <h3 className="mt-6 text-xl font-bold text-[#0B1739]">{title}</h3>

      <p className="mt-4 flex-1 text-base leading-7 text-[#53657D]">{text}</p>

      <Link
        href="/signup"
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#1677FF]"
      >
        Start Learning <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function StepCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="gahn-card-hover relative rounded-[1.35rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_10px_30px_rgba(11,23,57,0.045)] lg:p-7">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 flex-none rounded-full bg-[#1677FF]" />
        <h3 className="text-lg font-bold text-[#0B1739]">{title}</h3>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#53657D]">{text}</p>
    </div>
  );
}

function SchoolCard({
  Icon,
  title,
  text,
}: {
  Icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="gahn-card-hover rounded-[1.35rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_10px_30px_rgba(11,23,57,0.045)] sm:p-7">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#0B1739]">{title}</h3>
      <p className="mt-3 text-base leading-7 text-[#53657D]">{text}</p>
    </div>
  );
}

function RoadmapCard({ stage, text }: { stage: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#D7E3F2] bg-white p-6 shadow-[0_10px_30px_rgba(11,23,57,0.045)] sm:p-7">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF3FF]">
        <span className="h-3 w-3 rotate-45 bg-[#1677FF]" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#0B1739]">{stage}</h3>
      <p className="mt-3 text-base leading-7 text-[#53657D]">{text}</p>
    </div>
  );
}

/**
 * LessonDemo — a premium tutoring-workspace preview.
 * Deliberately NOT a chat/message UI: instructor panel, lesson header with
 * progress bar, a concept block, a separate practice task, an answer input,
 * a correction panel, a retry action, a confirmation state, and notes/recap
 * controls — the shape of a real one-on-one online tutoring lesson.
 */
function LessonDemo() {
  const [stage, setStage] = useState<"task" | "incorrect" | "correct">("task");
  const [attempt, setAttempt] = useState(0);
  const [answer, setAnswer] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [recapOpen, setRecapOpen] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (attempt === 0) {
      setStage("incorrect");
    } else {
      setStage("correct");
    }
  }

  function handleRetry() {
    setAttempt(1);
    setAnswer("");
    setStage("task");
  }

  return (
    <div className="mx-auto max-w-5xl rounded-2xl border border-[#D7E3F2] bg-white shadow-sm">
      <div className="border-b border-[#D7E3F2] p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1677FF]">
              Career Skills · Lesson 3 of 12
            </p>
            <h3 className="mt-2 text-xl font-bold text-[#0B1739] sm:text-2xl">
              Negotiation Basics
            </h3>
          </div>
          <span className="rounded-full bg-[#ffffff] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#53657D]">
            Preview
          </span>
        </div>

        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[#ffffff]">
          <div className="h-full w-[28%] rounded-full bg-[#1677FF]" />
        </div>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="relative h-32 w-32 overflow-hidden rounded-2xl bg-[#ffffff] lg:h-40 lg:w-40">
            <img
              src="/instructors/arin.jpg"
              alt="Arin, Career and Finance Instructor"
              className="h-full w-full object-cover object-top grayscale-[15%] contrast-[1.05] saturate-[0.85]"
            />
          </div>

          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#1677FF]">
            Your Instructor
          </p>
          <h4 className="mt-1 text-lg font-bold text-[#0B1739]">Arin</h4>
          <p className="text-sm font-semibold text-[#1677FF]">Career &amp; Finance Instructor</p>
          <p className="mt-3 text-sm leading-6 text-[#53657D]">
            Teaching negotiation, budgeting, and real-world financial decision-making.
          </p>
        </div>

        <div className="min-w-0 space-y-6">
          <div className="rounded-xl border border-[#D7E3F2] bg-[#ffffff] p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1677FF]">
              Concept
            </p>
            <h4 className="mt-2 text-lg font-bold text-[#0B1739]">
              Before You Respond to an Offer
            </h4>
            <p className="mt-3 text-sm leading-7 text-[#53657D]">
              Never accept or reject a job offer immediately. The strongest
              negotiators research the market rate for the role first, then
              respond with a counter that&apos;s grounded in that data instead
              of emotion.
            </p>
          </div>

          <div className="rounded-xl border border-[#D7E3F2] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1677FF]">
                Practice Task
              </p>
              {attempt === 1 && stage !== "correct" && (
                <span className="rounded-full bg-[#ffffff] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#53657D]">
                  Retry
                </span>
              )}
            </div>

            <p className="mt-2 text-base font-semibold leading-7 text-[#0B1739]">
              You receive a job offer of $52,000. What should you do before responding?
            </p>

            {stage !== "correct" && (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  rows={3}
                  className="w-full rounded-lg border border-[#D7E3F2] px-4 py-3 text-sm leading-6 text-[#0B1739] outline-none focus:border-[#1677FF]"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#1677FF] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0F65E8]"
                >
                  Submit Answer
                </button>
              </form>
            )}
          </div>

          {stage === "incorrect" && (
            <div className="rounded-xl border border-[#D7E3F2] bg-white p-5 sm:p-6">
              <div className="flex items-start gap-3 border-l-2 border-[#1677FF]/20 pl-4">
                <XCircle className="mt-0.5 h-5 w-5 flex-none text-[#53657D]" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-bold text-[#0B1739]">
                    Not quite — here&apos;s what was missed
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#53657D]">
                    Accepting immediately skips research and gives up room to
                    negotiate. Look up the market rate for this role first,
                    then respond with a specific counter number.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRetry}
                className="mt-5 rounded-lg border border-[#D7E3F2] px-6 py-3 text-sm font-semibold text-[#0B1739] hover:border-[#1677FF]/40"
              >
                Retry Task
              </button>
            </div>
          )}

          {stage === "correct" && (
            <div className="rounded-xl border border-[#D7E3F2] bg-white p-5 sm:p-6">
              <div className="flex items-start gap-3 border-l-2 border-[#1677FF]/20 pl-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#1677FF]" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-bold text-[#0B1739]">
                    Correct — understanding confirmed
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#53657D]">
                    You grounded the ask in market data instead of emotion.
                    That&apos;s the core negotiation skill for this lesson.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-[#D7E3F2] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setNoteSaved(true)}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#D7E3F2] px-5 py-3 text-sm font-semibold text-[#0B1739] hover:border-[#1677FF]/40"
            >
              <StickyNote className="h-4 w-4" strokeWidth={1.75} />
              {noteSaved ? "Saved to Notes" : "Save to Notes"}
            </button>

            <button
              type="button"
              onClick={() => setRecapOpen((open) => !open)}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#D7E3F2] px-5 py-3 text-sm font-semibold text-[#0B1739] hover:border-[#1677FF]/40"
            >
              <ListChecks className="h-4 w-4" strokeWidth={1.75} />
              {recapOpen ? "Hide Lesson Recap" : "View Lesson Recap"}
            </button>
          </div>

          {recapOpen && (
            <div className="rounded-xl border border-[#D7E3F2] bg-[#ffffff] p-5 text-sm leading-6 text-[#53657D]">
              Research the market rate before responding to any offer, then
              counter with a specific number backed by that data.
            </div>
          )}
        </div>
      </div>

      <p className="border-t border-[#D7E3F2] p-6 text-sm leading-6 text-[#53657D] sm:p-8">
        This is a preview of how AI instructors teach. Real lessons adapt to
        your answers in real time.
      </p>
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#D7E3F2]">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#D7E3F2] bg-[#ffffff]">
            <th className="p-5 text-sm font-bold text-[#0B1739]">
              What matters when learning
            </th>
            {comparisonColumns.map((col, index) => (
              <th
                key={col}
                className={`p-5 text-sm ${
                  index === 0 ? "font-bold text-[#1677FF]" : "font-semibold text-[#53657D]"
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.feature} className="border-b border-[#D7E3F2] last:border-0">
              <td className="p-5 text-sm font-semibold text-[#0B1739]">{row.feature}</td>
              {row.values.map((value, index) => (
                <td key={index} className="p-5">
                  {value ? (
                    <CheckCircle2 className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
                  ) : (
                    <Minus className="h-5 w-5 text-[#53657D]/40" strokeWidth={1.75} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WhyFasterCard({ Icon, title, text }: { Icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#D7E3F2] bg-white p-6 shadow-[0_10px_30px_rgba(11,23,57,0.045)] sm:p-7">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#0B1739]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#53657D]">{text}</p>
    </div>
  );
}

function PreviewMiniCard({ Icon, title, text }: { Icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="gahn-card-hover rounded-[1.25rem] border border-[#D7E3F2] bg-white p-5 shadow-[0_10px_30px_rgba(11,23,57,0.045)]">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#EAF3FF] text-[#1677FF]">
        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-sm font-bold text-[#0B1739]">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-[#53657D]">{text}</p>
    </div>
  );
}

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#D7E3F2] bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
      >
        <span className="text-base font-bold text-[#0B1739]">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-none text-[#1677FF] ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={1.75}
        />
      </button>

      {isOpen && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <p className="text-sm leading-7 text-[#53657D]">{answer}</p>
        </div>
      )}
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B1739]">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-[#53657D] hover:text-[#1677FF]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <main
      id="top"
      className={`${sourceSans.className} min-h-screen scroll-smooth bg-white text-[#0B1739]`}
    >
      <header className="sticky top-0 z-50 border-b border-[#D7E3F2] bg-white/95 shadow-[0_1px_0_rgba(11,23,57,0.02)] backdrop-blur">
        <nav
          className={`${shellClass} flex min-h-[74px] items-center justify-between py-3 sm:min-h-[82px] sm:py-4`}
        >
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-10 w-10 flex-none rounded-full object-cover sm:h-11 sm:w-11"
            />
            <div className="min-w-0">
              <p className="truncate text-xl font-extrabold tracking-[-0.02em] sm:text-2xl">
                GAHN AI
              </p>
              <p className="hidden text-[8px] font-bold uppercase tracking-[0.16em] text-[#53657D] sm:block lg:text-[9px]">
                Global AI Human Helper Network
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-5 text-sm font-semibold xl:flex 2xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#1677FF]"
              >
                {link.label}
              </a>
            ))}
            <Link href="/pricing" className="hover:text-[#1677FF]">
              Pricing
            </Link>
          </div>

          <div className="hidden items-center gap-3 xl:flex">
            <Link
              href="/login"
              className="rounded-lg border border-[#D7E3F2] px-5 py-2.5 text-sm font-semibold hover:border-[#1677FF]/40 hover:bg-[#F5F8FC]"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-[#1677FF] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0F65E8]"
            >
              Sign Up
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-11 w-11 place-items-center rounded-lg border border-[#D7E3F2] text-[#0B1739] xl:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-[#D7E3F2] bg-white xl:hidden">
            <div className={`${shellClass} py-5`}>
              <div className="flex flex-col gap-1 text-sm font-semibold">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 hover:bg-[#F5F8FC] hover:text-[#1677FF]"
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  href="/pricing"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 hover:bg-[#F5F8FC] hover:text-[#1677FF]"
                >
                  Pricing
                </Link>
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t border-[#D7E3F2] pt-4 sm:flex-row">
                <Link
                  href="/login"
                  className="w-full rounded-lg border border-[#D7E3F2] px-6 py-3 text-center text-sm font-semibold hover:border-[#1677FF]/40"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="w-full rounded-lg bg-[#1677FF] px-7 py-3 text-center text-sm font-semibold text-white hover:bg-[#0F65E8]"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <section className="landing-wave-surface relative overflow-hidden border-b border-[#D7E3F2]">

        <div
          className={`${shellClass} relative grid items-center gap-12 py-14 sm:py-16 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:gap-10 xl:py-20 2xl:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] 2xl:gap-12 2xl:py-24`}
        >
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1677FF] sm:text-sm">
              AI-Powered Learning for Students, Professors, Self-Learners & Everyone
            </p>

            <h1 className="mt-5 max-w-[720px] text-[2.85rem] font-bold leading-[1.02] tracking-[-0.055em] text-[#0B1739] sm:mt-6 sm:text-[3.6rem] xl:text-[4rem] 2xl:text-[4.35rem]">
              <span className="block">Your Private AI Tutor for Anything.</span>
              <span className="block text-[#1677FF]">Learn Without Limits.</span>
            </h1>

            <p className="mt-6 max-w-[660px] text-[17px] leading-8 text-[#53657D] sm:mt-7 sm:text-lg xl:max-w-[610px] 2xl:max-w-[660px]">
              GAHN AI is designed to turn any subject, career, book, skill, or
              question into a guided learning experience. Learn in your language
              with clear explanations, interactive practice, adaptive feedback,
              and mastery checks—all inside one private system built to make
              learning less confusing, more personal, and far more engaging than
              traditional courses.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/signup"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#1677FF] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#0F65E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] focus-visible:ring-offset-2 sm:w-auto sm:px-8 sm:text-base"
              >
                Start Learning
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#D7E3F2] bg-white px-8 py-4 text-base font-semibold text-[#0B1739] hover:border-[#1677FF]/40 sm:w-auto sm:px-9"
              >
                See How It Works <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="gahn-glass mt-9 grid grid-cols-2 gap-3 rounded-[1.35rem] border p-4 sm:mt-10 sm:p-5 lg:grid-cols-4">
              {[
                ["Structured Lessons", "Not random chats"],
                ["Active Practice", "You must think and respond"],
                ["Adaptive Feedback", "Mistakes change the lesson"],
                ["Saved Progress", "Continue where you left off"],
              ].map(([item, sub]) => (
                <div key={item}>
                  <p className="flex items-start gap-1.5 text-sm font-bold text-[#0B1739]">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-none text-[#1677FF]"
                      strokeWidth={1.75}
                    />
                    <span>{item}</span>
                  </p>
                  <p className="mt-1 text-sm text-[#53657D]">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          <HeroInstructorShowcase />
        </div>
      </section>

      <section className="landing-wave-surface-subtle border-y border-[#D7E3F2] py-16 sm:py-20">
        <div className={shellClass}>
          <SectionIntro
            eyebrow="Who GAHN AI Is For"
            title="One platform for different learning goals."
            text="GAHN AI is built for people who want guided learning, active practice, and feedback instead of simply receiving an answer."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Students",
                text: "Get help understanding school subjects, practice difficult concepts, and receive corrections before moving forward.",
              },
              {
                title: "Self-Learners",
                text: "Learn business, finance, technology, communication, books, and other real-world skills through structured learning paths.",
              },
              {
                title: "Skill Builders",
                text: "Use short guided lessons to improve focus, memory, decision-making, career knowledge, and practical ability over time.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="gahn-card-hover rounded-[1.35rem] border border-[#D7E3F2] bg-white/90 p-6 shadow-[0_12px_30px_rgba(11,23,57,0.04)] sm:p-7"
              >
                <h3 className="text-xl font-bold text-[#0B1739]">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#53657D]">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="gahn-glass mt-8 rounded-[1.4rem] border px-6 py-7 sm:px-8 sm:py-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
              Why It Is Different
            </p>
            <p className="mt-3 max-w-5xl text-lg leading-8 text-[#0B1739] sm:text-xl">
              Traditional chatbots answer questions. GAHN AI manages the learning
              process by teaching a concept, asking the learner to do something,
              checking the response, correcting misunderstandings, and requiring
              a retry when needed.
            </p>
          </div>
        </div>
      </section>

      <section id="programs" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className={shellClass}>
          <SectionIntro
            eyebrow="Learning Worlds"
            title="Choose the path that matches your goal."
            text="Each world is designed around a different learning problem. Start with the area you care about most, then grow into new topics as your confidence builds."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6">
            {worlds.map((world) => (
              <ProgramCard key={world.title} {...world} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="instructors"
        className="landing-wave-surface-subtle scroll-mt-24 border-y border-[#D7E3F2] py-20 sm:py-24"
      >
        <div className={shellClass}>
          <SectionIntro
            eyebrow="AI Instructor Experience"
            title="See how an AI instructor teaches."
            text="The instructor experience is designed to feel natural and familiar while the software underneath handles structured teaching, feedback, correction, and problem solving."
          />

          <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-stretch">
            <div className="gahn-glass relative flex min-h-[280px] min-w-0 w-full items-center justify-center overflow-hidden rounded-[1.75rem] border sm:min-h-[360px] lg:min-h-[420px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#FFFFFF_0%,#FFFFFF_52%,#F5F8FC_52%,#EAF3FF_100%)]"
              />
              <div className="relative px-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#EAF3FF] text-[#1677FF]">
                  <Bot className="h-6 w-6" strokeWidth={1.7} />
                </div>
                <p className="mt-4 text-sm font-bold text-[#0B1739] sm:text-base">
                  AI instructor demo video
                </p>
                <p className="mt-2 text-sm text-[#53657D]">
                  Your instructor video will appear here when you add the file.
                </p>
              </div>
            </div>

            <div className="gahn-glass min-w-0 flex flex-col justify-center rounded-[1.75rem] border p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
                Simple on the surface
              </p>
              <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-[-0.025em] text-[#0B1739] sm:text-3xl">
                Human-looking instructors. Advanced software underneath.
              </h3>
              <p className="mt-5 text-sm leading-7 text-[#53657D] sm:text-base sm:leading-8">
                The instructors are intentionally familiar and easy to interact with, but the system behind them is designed for much more than appearance. Even in the MVP, GAHN AI is focused on structured teaching, adaptive reasoning, mistake correction, and real problem solving so the experience can feel natural, polished, and high-end without becoming complicated to use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24 bg-white py-20 sm:py-24"
      >
        <div className={shellClass}>
          <SectionIntro
            eyebrow="How It Works"
            title="From signup to skill growth."
            text="The platform starts simple. Create an account, choose a world, learn with instructors, and build progress over time."
          />

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {steps.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="platform"
        className="landing-wave-surface-subtle scroll-mt-24 py-20 sm:py-24"
      >
        <div
          className={`${shellClass} grid items-center gap-12 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[410px_minmax(0,1fr)]`}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1677FF]">
              Platform Preview
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              A dashboard built for learning action.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#53657D] sm:text-lg sm:leading-8">
              The dashboard is where users choose learning worlds, meet AI
              instructors, continue lessons, track progress, save notes, and
              build a skill portfolio over time.
            </p>

            <ul className="mt-8 space-y-3">
              {platformFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 flex-none text-[#1677FF]"
                    strokeWidth={1.75}
                  />
                  <span className="text-base leading-7 text-[#53657D]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <DashboardPreview />
        </div>

        <div className={`${shellClass} mt-10 sm:mt-14`}>
          <p className="text-sm font-bold text-[#0B1739]">Every page you'll actually use:</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {previewPages.map((page) => (
              <PreviewMiniCard key={page.title} {...page} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className={shellClass}>
          <div className="relative overflow-hidden flex flex-col items-start justify-between gap-8 rounded-[1.5rem] border border-[#D7E3F2] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_60%,#EAF3FF_100%)] px-6 py-9 shadow-[0_18px_50px_rgba(11,23,57,0.06)] sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:px-10 lg:py-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1677FF]">
                Get started today
              </p>
              <h2 className="mt-3 max-w-3xl text-2xl font-extrabold leading-tight tracking-[-0.02em] text-[#0B1739] sm:text-3xl lg:text-4xl">
                Your first AI-guided lesson is one click away.
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-[#53657D]">
                New users create an account first. Returning users log in with
                their email.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["No credit card required to start", "Cancel anytime", "Built for every learner"].map(
                  (point) => (
                    <p key={point} className="flex items-center gap-2 text-sm font-semibold text-[#53657D]">
                      <CheckCircle2 className="h-4 w-4 flex-none text-[#1677FF]" strokeWidth={1.75} />
                      {point}
                    </p>
                  )
                )}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 lg:flex-none">
              <Link
                href="/signup"
                className="w-full rounded-lg bg-[#1677FF] px-8 py-4 text-center text-sm font-semibold text-white hover:bg-[#0F65E8] sm:w-auto"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="w-full rounded-lg border border-[#D7E3F2] bg-white px-8 py-4 text-center text-sm font-semibold text-[#0B1739] hover:border-[#1677FF]/40 sm:w-auto"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#D7E3F2] bg-white py-14">
        <div className={shellClass}>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo/favicon.png"
                alt="GAHN AI"
                className="h-9 w-9 rounded-full object-cover"
              />
              <div>
                <p className="text-base font-extrabold tracking-[-0.02em]">GAHN AI</p>
                <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#53657D]">
                  Global AI Human Helper Network
                </p>
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-[#53657D]">
              <Link href="/about" className="hover:text-[#1677FF]">About</Link>
              <Link href="/contact" className="hover:text-[#1677FF]">Contact</Link>
              <Link href="/privacy" className="hover:text-[#1677FF]">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#1677FF]">Terms of Service</Link>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#D7E3F2] pt-8 sm:flex-row">
            <p className="text-xs text-[#53657D]">© 2026 GAHN AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
