"use client";

import Link from "next/link";
import { Source_Sans_3 } from "next/font/google";
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
  EyeOff,
  Flame,
  Globe2,
  GraduationCap,
  History,
  ListChecks,
  Lock,
  Mail,
  Menu,
  MessageSquare,
  Minus,
  ShieldCheck,
  StickyNote,
  TrendingUp,
  UserCircle2,
  Users,
  X,
  XCircle,
} from "lucide-react";
const sourceSans = Source_Sans_3({
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
    role: "Career Skills Instructor",
    desc: "Explore a wide range of career skills, including communication, leadership, business, workplace habits, interviews, resumes, entrepreneurship, teamwork, and professional growth.",
    image: "/instructors/alex.jpg",
  },
  {
    name: "School Help",
    role: "School Help Instructor",
    desc: "Get guided support with math, science, reading, writing, history, homework, studying, assignments, and test preparation.",
    image: "/instructors/arin.jpg",
  },
  {
    name: "Brain Development",
    role: "Brain Development Instructor",
    desc: "Strengthen focus, memory, discipline, reasoning, productive habits, emotional control, and learning performance.",
    image: "/instructors/lena.jpg",
  },
  {
    name: "General Knowledge",
    role: "General Knowledge Instructor",
    desc: "Learn history, technology, culture, communication, life skills, current events, and practical real-world knowledge.",
    image: "/instructors/jada.jpg",
  },
  {
    name: "Book Intelligence",
    role: "Book Intelligence Instructor",
    desc: "Understand books through summaries, key lessons, notes, quizzes, study paths, reading improvement, and practical applications.",
    image: "/instructors/john.jpg",
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
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0056d2]">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.02em] text-[#111827] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#4b5563] sm:text-lg sm:leading-8">
        {text}
      </p>
    </div>
  );
}

function HeroSignupCard() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#dbe3ee] bg-white p-5 shadow-sm sm:p-6 lg:p-7">
      <svg
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 opacity-[0.08]"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="15" cy="15" r="3" fill="#0056d2" />
        <circle cx="50" cy="35" r="3" fill="#0056d2" />
        <circle cx="85" cy="15" r="3" fill="#0056d2" />
        <circle cx="50" cy="80" r="3" fill="#0056d2" />
        <path
          d="M15 15 L50 35 L85 15 M50 35 L50 80"
          stroke="#0056d2"
          strokeWidth="1"
        />
      </svg>

      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0056d2]">
        Start here
      </p>

      <h2 className="mt-4 text-2xl font-extrabold leading-[1.15] tracking-[-0.02em] text-[#111827] sm:text-[1.75rem]">
        Ready to take your next step?
      </h2>

      <p className="mt-3 text-sm leading-6 text-[#4b5563] sm:text-[15px] sm:leading-7">
        Create your account, choose what you want to learn, and begin a guided AI lesson.
      </p>

      <div className="mt-5 space-y-3.5 sm:mt-6">
        <select
          aria-label="Select your learning world"
          defaultValue=""
          className="w-full rounded-lg border border-[#dbe3ee] bg-white px-4 py-3.5 text-sm font-semibold text-[#4b5563] outline-none transition focus:border-[#0056d2] focus:ring-2 focus:ring-[#0056d2]/15 sm:px-5 sm:text-[15px]"
        >
          <option value="" disabled>
            Select your learning world...
          </option>
          <option>Career Skills</option>
          <option>School Help</option>
          <option>Brain Development</option>
          <option>General Knowledge</option>
          <option>Book Intelligence</option>
        </select>

        <Link
          href="/signup"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#0056d2] px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#00419e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056d2] focus-visible:ring-offset-2"
        >
          Create Account
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 border-t border-[#dbe3ee] pt-5 sm:mt-7">
        <p className="font-bold text-[#111827]">Platform starts with:</p>

        <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4b5563]">
          {[
            "Learning dashboard",
            "AI instructor previews",
            "Lessons, notes, and progress",
            "Certificates and portfolios planned",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2
                className="mt-1 h-4 w-4 flex-none text-[#0056d2]"
                strokeWidth={1.75}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="w-full rounded-2xl border border-[#dbe3ee] bg-white p-3 shadow-sm sm:p-5">
      <div className="rounded-xl border border-[#dbe3ee] bg-[#f5f7fb] p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold leading-tight text-[#4b5563] sm:text-xl">
              Welcome back,
            </p>
            <p className="text-xl font-extrabold leading-tight tracking-[-0.02em] text-[#111827] sm:text-2xl">
              Learner
            </p>
          </div>

          <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-bold text-[#4b5563] shadow-sm">
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
                  index === 0 ? "bg-[#dbeafe] text-[#0056d2]" : "text-[#4b5563]"
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
                  <Icon className="h-5 w-5 text-[#0056d2]" strokeWidth={1.75} />
                  <p className="mt-3 text-xl font-bold text-[#111827] sm:text-2xl">
                    {num}
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-[#4b5563] sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-white p-5 shadow-sm sm:p-6">
              <p className="text-lg font-bold text-[#111827]">
                Continue Learning
              </p>
              <p className="mt-3 text-sm leading-6 text-[#4b5563]">
                No courses started yet. Choose a learning world to begin your
                journey.
              </p>
              <Link
                href="/signup"
                className="mt-6 inline-flex rounded-lg bg-[#0056d2] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00419e]"
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
    <div className="flex h-full flex-col rounded-2xl border border-[#dbe3ee] bg-white p-6 transition hover:border-[#0056d2]/40 hover:shadow-md lg:p-7">
      <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#dbeafe] text-[#0056d2] lg:h-16 lg:w-16">
        <Icon className="h-7 w-7" strokeWidth={1.5} />
      </div>

      <h3 className="mt-6 text-xl font-bold text-[#111827]">{title}</h3>

      <p className="mt-4 flex-1 text-base leading-7 text-[#4b5563]">{text}</p>

      <Link
        href="/signup"
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#0056d2]"
      >
        Start Learning <ArrowRight className="h-3.5 w-3.5" />
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
    <div className="grid gap-6 rounded-2xl border border-[#dbe3ee] bg-white p-5 sm:p-7 md:grid-cols-[240px_minmax(0,1fr)] md:gap-8">
      <div className="relative mx-auto aspect-[16/9] w-full max-w-[280px] overflow-hidden rounded-xl bg-white md:mx-0 md:h-[200px] md:max-w-none">
  <img
    src={image}
    alt={`${name}, ${role}`}
    className="h-full w-full object-contain object-center grayscale-[15%] contrast-[1.05] saturate-[0.85]"
  />
</div>

      <div className="flex min-w-0 flex-col justify-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0056d2]">
          Specialty
        </p>
        <h3 className="mt-3 text-3xl font-extrabold tracking-[-0.02em] text-[#111827]">
          {name}
        </h3>
        <p className="mt-1 text-base font-semibold text-[#0056d2]">{role}</p>
        <p className="mt-5 text-base leading-7 text-[#4b5563]">{desc}</p>
        <Link
          href="/signup"
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0056d2]"
        >
          Enter World <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
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
    <div className="relative rounded-2xl border border-[#dbe3ee] bg-white p-6 lg:p-7">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 flex-none rounded-full bg-[#0056d2]" />
        <h3 className="text-lg font-bold text-[#111827]">{title}</h3>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#4b5563]">{text}</p>
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
    <div className="rounded-2xl border border-[#dbe3ee] bg-white p-6 sm:p-7">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#dbeafe] text-[#0056d2]">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#111827]">{title}</h3>
      <p className="mt-3 text-base leading-7 text-[#4b5563]">{text}</p>
    </div>
  );
}

function RoadmapCard({ stage, text }: { stage: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#dbe3ee] bg-white p-6 sm:p-7">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#dbeafe]">
        <span className="h-3 w-3 rotate-45 bg-[#0056d2]" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#111827]">{stage}</h3>
      <p className="mt-3 text-base leading-7 text-[#4b5563]">{text}</p>
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
    <div className="mx-auto max-w-5xl rounded-2xl border border-[#dbe3ee] bg-white shadow-sm">
      {/* Lesson header + progress */}
      <div className="border-b border-[#dbe3ee] p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0056d2]">
              Career Skills · Lesson 3 of 12
            </p>
            <h3 className="mt-2 text-xl font-bold text-[#111827] sm:text-2xl">
              Negotiation Basics
            </h3>
          </div>
          <span className="rounded-full bg-[#f5f7fb] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#4b5563]">
            Preview
          </span>
        </div>

        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[#f5f7fb]">
          <div className="h-full w-[28%] rounded-full bg-[#0056d2]" />
        </div>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Instructor panel */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="relative h-32 w-32 overflow-hidden rounded-2xl bg-[#f5f7fb] lg:h-40 lg:w-40">
            <img
              src="/instructors/arin.jpg"
              alt="Arin, Career and Finance Instructor"
              className="h-full w-full object-cover object-top grayscale-[15%] contrast-[1.05] saturate-[0.85]"
            />
          </div>

          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0056d2]">
            Your Instructor
          </p>
          <h4 className="mt-1 text-lg font-bold text-[#111827]">Arin</h4>
          <p className="text-sm font-semibold text-[#0056d2]">Career &amp; Finance Instructor</p>
          <p className="mt-3 text-sm leading-6 text-[#4b5563]">
            Teaching negotiation, budgeting, and real-world financial decision-making.
          </p>
        </div>

        {/* Main workspace */}
        <div className="min-w-0 space-y-6">
          {/* Concept */}
          <div className="rounded-xl border border-[#dbe3ee] bg-[#f5f7fb] p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0056d2]">
              Concept
            </p>
            <h4 className="mt-2 text-lg font-bold text-[#111827]">
              Before You Respond to an Offer
            </h4>
            <p className="mt-3 text-sm leading-7 text-[#4b5563]">
              Never accept or reject a job offer immediately. The strongest
              negotiators research the market rate for the role first, then
              respond with a counter that&apos;s grounded in that data instead
              of emotion.
            </p>
          </div>

          {/* Practice task */}
          <div className="rounded-xl border border-[#dbe3ee] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0056d2]">
                Practice Task
              </p>
              {attempt === 1 && stage !== "correct" && (
                <span className="rounded-full bg-[#f5f7fb] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#4b5563]">
                  Retry
                </span>
              )}
            </div>

            <p className="mt-2 text-base font-semibold leading-7 text-[#111827]">
              You receive a job offer of $52,000. What should you do before responding?
            </p>

            {stage !== "correct" && (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  rows={3}
                  className="w-full rounded-lg border border-[#dbe3ee] px-4 py-3 text-sm leading-6 text-[#111827] outline-none focus:border-[#0056d2]"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#0056d2] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00419e]"
                >
                  Submit Answer
                </button>
              </form>
            )}
          </div>

          {/* Correction panel */}
          {stage === "incorrect" && (
            <div className="rounded-xl border border-[#dbe3ee] bg-white p-5 sm:p-6">
              <div className="flex items-start gap-3 border-l-2 border-[#0056d2]/20 pl-4">
                <XCircle className="mt-0.5 h-5 w-5 flex-none text-[#4b5563]" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-bold text-[#111827]">
                    Not quite — here&apos;s what was missed
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#4b5563]">
                    Accepting immediately skips research and gives up room to
                    negotiate. Look up the market rate for this role first,
                    then respond with a specific counter number.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRetry}
                className="mt-5 rounded-lg border border-[#dbe3ee] px-6 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#0056d2]/40"
              >
                Retry Task
              </button>
            </div>
          )}

          {/* Understanding confirmation */}
          {stage === "correct" && (
            <div className="rounded-xl border border-[#dbe3ee] bg-white p-5 sm:p-6">
              <div className="flex items-start gap-3 border-l-2 border-[#0056d2]/20 pl-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#0056d2]" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-bold text-[#111827]">
                    Correct — understanding confirmed
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#4b5563]">
                    You grounded the ask in market data instead of emotion.
                    That&apos;s the core negotiation skill for this lesson.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Notes & lesson recap controls */}
          <div className="flex flex-col gap-3 border-t border-[#dbe3ee] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setNoteSaved(true)}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dbe3ee] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#0056d2]/40"
            >
              <StickyNote className="h-4 w-4" strokeWidth={1.75} />
              {noteSaved ? "Saved to Notes" : "Save to Notes"}
            </button>

            <button
              type="button"
              onClick={() => setRecapOpen((open) => !open)}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dbe3ee] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#0056d2]/40"
            >
              <ListChecks className="h-4 w-4" strokeWidth={1.75} />
              {recapOpen ? "Hide Lesson Recap" : "View Lesson Recap"}
            </button>
          </div>

          {recapOpen && (
            <div className="rounded-xl border border-[#dbe3ee] bg-[#f5f7fb] p-5 text-sm leading-6 text-[#4b5563]">
              Research the market rate before responding to any offer, then
              counter with a specific number backed by that data.
            </div>
          )}
        </div>
      </div>

      <p className="border-t border-[#dbe3ee] p-6 text-sm leading-6 text-[#4b5563] sm:p-8">
        This is a preview of how AI instructors teach. Real lessons adapt to
        your answers in real time.
      </p>
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#dbe3ee]">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#dbe3ee] bg-[#f5f7fb]">
            <th className="p-5 text-sm font-bold text-[#111827]">
              What matters when learning
            </th>
            {comparisonColumns.map((col, index) => (
              <th
                key={col}
                className={`p-5 text-sm ${
                  index === 0 ? "font-bold text-[#0056d2]" : "font-semibold text-[#4b5563]"
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.feature} className="border-b border-[#dbe3ee] last:border-0">
              <td className="p-5 text-sm font-semibold text-[#111827]">{row.feature}</td>
              {row.values.map((value, index) => (
                <td key={index} className="p-5">
                  {value ? (
                    <CheckCircle2 className="h-5 w-5 text-[#0056d2]" strokeWidth={1.75} />
                  ) : (
                    <Minus className="h-5 w-5 text-[#4b5563]/40" strokeWidth={1.75} />
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
    <div className="rounded-2xl border border-[#dbe3ee] bg-white p-6 sm:p-7">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#dbeafe] text-[#0056d2]">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#111827]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#4b5563]">{text}</p>
    </div>
  );
}

function PreviewMiniCard({ Icon, title, text }: { Icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#dbe3ee] bg-white p-5">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#dbeafe] text-[#0056d2]">
        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-sm font-bold text-[#111827]">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-[#4b5563]">{text}</p>
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
    <div className="rounded-2xl border border-[#dbe3ee] bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
      >
        <span className="text-base font-bold text-[#111827]">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-none text-[#0056d2] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={1.75}
        />
      </button>

      {isOpen && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <p className="text-sm leading-7 text-[#4b5563]">{answer}</p>
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
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#111827]">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-[#4b5563] transition hover:text-[#0056d2]"
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
      className="min-h-screen scroll-smooth bg-[#f5f7fb] font-sans text-[#111827] xl:[zoom:0.85]"
    >
      <header className="sticky top-0 z-50 border-b border-[#dbe3ee] bg-white/90 backdrop-blur">
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
              <p className="hidden text-[8px] font-bold uppercase tracking-[0.16em] text-[#4b5563] sm:block lg:text-[9px]">
                Global AI Human Helper Network
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-5 text-sm font-semibold xl:flex 2xl:gap-7">
            {navLinks.map((link) => (
  <a
    key={link.label}
    href={link.href}
    className="transition hover:text-[#0056d2]"
  >
    {link.label}
  </a>
))}
            <Link href="/pricing" className="transition hover:text-[#0056d2]">
              Pricing
            </Link>
          </div>

          <div className="hidden items-center gap-3 xl:flex">
            <Link
              href="/login"
              className="rounded-lg border border-[#dbe3ee] px-5 py-2.5 text-sm font-semibold transition hover:border-[#0056d2]/40 hover:bg-[#eef5ff]"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-[#0056d2] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00419e]"
            >
              Sign Up
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-11 w-11 place-items-center rounded-lg border border-[#dbe3ee] text-[#111827] xl:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-[#dbe3ee] bg-white xl:hidden">
            <div className={`${shellClass} py-5`}>
              <div className="flex flex-col gap-1 text-sm font-semibold">
                {navLinks.map((link) => (
  <a
    key={link.label}
    href={link.href}
    onClick={() => setMenuOpen(false)}
    className="rounded-lg px-3 py-3 transition hover:bg-[#eef5ff] hover:text-[#0056d2]"
  >
    {link.label}
  </a>
))}
                <Link
                  href="/pricing"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 transition hover:bg-[#eef5ff] hover:text-[#0056d2]"
                >
                  Pricing
                </Link>
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t border-[#dbe3ee] pt-4 sm:flex-row">
                <Link
                  href="/login"
                  className="w-full rounded-lg border border-[#dbe3ee] px-6 py-3 text-center text-sm font-semibold transition hover:border-[#0056d2]/40"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="w-full rounded-lg bg-[#0056d2] px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#00419e]"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#eef5ff]">
        <div
          className={`${shellClass} relative grid items-center gap-10 py-12 sm:py-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,430px)] lg:gap-16 lg:py-16 xl:gap-20 xl:py-20`}
        >
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0056d2] sm:text-sm">
              AI-Powered Learning for Students and Self-Learners
            </p>

            <h1 className="mt-5 max-w-[860px] text-[3.1rem] font-semibold leading-[1.12] tracking-[-0.035em] text-[#111827] sm:mt-6 sm:text-[3.9rem] xl:text-[4.55rem]">
  <span className="block">AI instructors that</span>
  <span className="block">teach, check, and</span>
  <span className="block text-[#0056d2]">adapt to you.</span>
</h1>

            <p className="mt-6 max-w-[760px] text-base leading-7 text-[#4b5563] sm:mt-7 sm:text-lg sm:leading-8 lg:text-lg lg:leading-8">
              GAHN AI helps students and self-learners build real skills through
              structured lessons. Instead of only giving answers, the AI teaches
              concepts, gives practice, checks understanding, corrects mistakes,
              and guides learners until the lesson makes sense.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/signup"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#0056d2] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#00419e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056d2] focus-visible:ring-offset-2 sm:w-auto sm:px-8 sm:text-base"
              >
                Start Learning
              </Link>

              <a
                              
                href="#how-it-works"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#dbe3ee] bg-white px-8 py-4 text-base font-semibold text-[#111827] transition hover:border-[#0056d2]/40 sm:w-auto sm:px-9"
              >
                See How It Works <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-[#dbe3ee] pt-7 sm:mt-10 sm:pt-8 lg:grid-cols-4">
              {[
                ["Structured Lessons", "Not random chats"],
                ["Active Practice", "You must think and respond"],
                ["Adaptive Feedback", "Mistakes change the lesson"],
                ["Saved Progress", "Continue where you left off"],
              ].map(([item, sub]) => (
                <div key={item}>
                  <p className="flex items-start gap-1.5 text-sm font-bold text-[#111827]">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-none text-[#0056d2]"
                      strokeWidth={1.75}
                    />
                    <span>{item}</span>
                  </p>
                  <p className="mt-1 text-sm text-[#4b5563]">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          <HeroSignupCard />
        </div>
      </section>

      {/* WHO IT IS FOR */}
      <section className="border-y border-[#dbe3ee] bg-white py-16 sm:py-20">
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
                className="rounded-2xl border border-[#dbe3ee] bg-[#f5f7fb] p-6 sm:p-7"
              >
                <h3 className="text-xl font-bold text-[#111827]">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#4b5563]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#dbe3ee] bg-[#eef5ff] px-6 py-7 sm:px-8 sm:py-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0056d2]">
              Why It Is Different
            </p>
            <p className="mt-3 max-w-5xl text-lg leading-8 text-[#111827] sm:text-xl">
              Traditional chatbots answer questions. GAHN AI manages the learning
              process by teaching a concept, asking the learner to do something,
              checking the response, correcting misunderstandings, and requiring
              a retry when needed.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
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

      {/* INSTRUCTORS */}
      <section
        id="instructors"
        className="scroll-mt-24 bg-white py-20 sm:py-24"
      >
        <div className={shellClass}>
          <SectionIntro
            eyebrow="AI Instructors"
            title="Learn from specialized AI instructors."
            text="Choose from focused AI instructors built for different fields and industries."
          />

          <div className="grid gap-6 xl:grid-cols-2">
  {instructors.map((instructor, index) => (
    <div
      key={instructor.name}
      className={
        index === instructors.length - 1
          ? "xl:col-span-2 xl:mx-auto xl:w-[calc(50%-12px)]"
          : ""
      }
    >
      <InstructorCard {...instructor} />
    </div>
  ))}
</div>

          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-[#dbe3ee] bg-[#eef5ff] p-6 sm:p-8">
            <h3 className="text-lg font-bold text-[#111827] sm:text-xl">
              Designed to feel approachable. Built for serious learning.
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#4b5563] sm:text-base sm:leading-8">
              While GAHN AI features friendly 3D instructors, the platform is
              designed primarily for teens and adults seeking meaningful skill
              development. Every lesson is built around evidence-based learning
              principles—including active recall, spaced repetition, retrieval
              practice, the Feynman Technique, blurting, interleaving, deliberate
              practice, mastery learning, adaptive feedback, and guided
              practice—to improve long-term understanding rather than short-term
              memorization. Instructors communicate in a clear, professional, and
              age-appropriate manner while adapting to each learner&apos;s pace
              and progress.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
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

      {/* PLATFORM PREVIEW */}
      <section
        id="platform"
        className="scroll-mt-24 bg-[#eef5ff] py-20 sm:py-24"
      >
        <div
          className={`${shellClass} grid items-center gap-12 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[410px_minmax(0,1fr)]`}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0056d2]">
              Platform Preview
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              A dashboard built for learning action.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#4b5563] sm:text-lg sm:leading-8">
              The dashboard is where users choose learning worlds, meet AI
              instructors, continue lessons, track progress, save notes, and
              build a skill portfolio over time.
            </p>

            <ul className="mt-8 space-y-3">
              {platformFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 flex-none text-[#0056d2]"
                    strokeWidth={1.75}
                  />
                  <span className="text-base leading-7 text-[#4b5563]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <DashboardPreview />
        </div>

        <div className={`${shellClass} mt-10 sm:mt-14`}>
          <p className="text-sm font-bold text-[#111827]">Every page you'll actually use:</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {previewPages.map((page) => (
              <PreviewMiniCard key={page.title} {...page} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-white py-20 sm:py-24">
        <div className={shellClass}>
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-[#dbe3ee] bg-[#eef5ff] px-6 py-9 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:px-10 lg:py-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0056d2]">
                Get started today
              </p>
              <h2 className="mt-3 max-w-3xl text-2xl font-extrabold leading-tight tracking-[-0.02em] text-[#111827] sm:text-3xl lg:text-4xl">
                Your first AI-guided lesson is one click away.
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-[#4b5563]">
                New users create an account first. Returning users log in with
                their email.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["No credit card required to start", "Cancel anytime", "Built for every learner"].map(
                  (point) => (
                    <p key={point} className="flex items-center gap-2 text-sm font-semibold text-[#4b5563]">
                      <CheckCircle2 className="h-4 w-4 flex-none text-[#0056d2]" strokeWidth={1.75} />
                      {point}
                    </p>
                  )
                )}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 lg:flex-none">
              <Link
                href="/signup"
                className="w-full rounded-lg bg-[#0056d2] px-8 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#00419e] sm:w-auto"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="w-full rounded-lg border border-[#dbe3ee] bg-white px-8 py-4 text-center text-sm font-semibold text-[#111827] transition hover:border-[#0056d2]/40 sm:w-auto"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#dbe3ee] bg-white py-14">
        <div className={shellClass}>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo/favicon.png"
                alt="GAHN AI"
                className="h-9 w-9 rounded-full object-cover"
              />
              <div>
                <p className="text-base font-extrabold tracking-[-0.02em]">
                  GAHN AI
                </p>
                <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#4b5563]">
                  Global AI Human Helper Network
                </p>
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-[#4b5563]">
              <Link href="/about" className="transition hover:text-[#0056d2]">
                About
              </Link>
              <Link href="/contact" className="transition hover:text-[#0056d2]">
                Contact
              </Link>
              <Link href="/privacy" className="transition hover:text-[#0056d2]">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition hover:text-[#0056d2]">
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#dbe3ee] pt-8 sm:flex-row">
            <p className="text-xs text-[#4b5563]">
              © 2026 GAHN AI. All rights reserved.
            </p>

           
          </div>
        </div>
      </footer>
    </main>
  );
}