"use client";

import Link from "next/link";
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
  Compass,
  EyeOff,
  Flame,
  Globe2,
  GraduationCap,
  History,
  LayoutDashboard,
  ListChecks,
  Lock,
  Mail,
  Menu,
  MessageSquare,
  Minus,
  RefreshCw,
  Repeat2,
  ShieldCheck,
  Sliders,
  StickyNote,
  Target,
  TrendingUp,
  UserCircle2,
  UserPlus,
  Users,
  X,
  XCircle,
  Zap,
} from "lucide-react";

const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#programs", label: "Programs" },
  { href: "#platform", label: "Platform" },
  { href: "#instructors", label: "Instructors" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#schools", label: "Schools" },
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
    name: "Lena",
    role: "Medical Instructor",
    desc: "Healthcare basics, medical terminology, patient-care concepts, and clinical learning support.",
    image: "/instructors/lena.jpg",
  },
  {
    name: "Alex",
    role: "Software Engineer",
    desc: "Coding, full-stack development, databases, debugging, and software project guidance.",
    image: "/instructors/alex.jpg",
  },
  {
    name: "Arin",
    role: "Finance Instructor",
    desc: "Money management, business finance, investing basics, budgeting, and financial decision-making.",
    image: "/instructors/arin.jpg",
  },
  {
    name: "Jada",
    role: "Nurse Instructor",
    desc: "Nursing fundamentals, patient support, care routines, safety, and healthcare readiness.",
    image: "/instructors/jada.jpg",
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

const journey = [
  { Icon: UserPlus, title: "Sign Up", text: "Create your account in under a minute." },
  { Icon: LayoutDashboard, title: "Dashboard", text: "Land in your personal learning hub." },
  { Icon: Compass, title: "Choose a World", text: "Pick the subject area you want to start with." },
  { Icon: Bot, title: "Meet Your Instructor", text: "Get matched with a specialized AI instructor." },
  { Icon: ListChecks, title: "Complete Lessons", text: "Learn, practice, and get corrected in real time." },
  { Icon: TrendingUp, title: "Track Progress", text: "Watch streaks, skills, and completion grow." },
  { Icon: Award, title: "Earn Certificates", text: "Coming soon — proof of the skills you've built.", future: true },
];

const whyFaster = [
  { Icon: Zap, title: "Active Learning", text: "You respond and think, instead of passively reading or watching." },
  { Icon: RefreshCw, title: "Adaptive Feedback", text: "Wrong answers change the next step instead of being ignored." },
  { Icon: Target, title: "Practice & Retries", text: "You try again until a concept actually sticks, not just once." },
  { Icon: Sliders, title: "Personalized Instruction", text: "Pace and explanations adjust to how you're actually doing." },
  { Icon: Repeat2, title: "Long-Term Retention", text: "Built around recall methods designed to stick, not cram." },
];

const faqs = [
  {
    q: "What is GAHN AI?",
    a: "GAHN AI is a structured learning platform where AI instructors teach a concept, ask you to apply it, check your answer, and correct you until you actually understand it — instead of just answering questions.",
  },
  {
    q: "How is this different from just using ChatGPT?",
    a: "ChatGPT answers whatever you ask, in whatever order you ask it. GAHN AI runs a structured lesson: it teaches a concept, requires you to respond, checks that response, and won't move on until you've shown understanding.",
  },
  {
    q: "Do I need any experience to start?",
    a: "No. Every learning world starts with beginner-friendly lessons, and the AI instructor adjusts difficulty based on how you're doing.",
  },
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
  "mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10 xl:px-12";

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
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2952A3]">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#0A1628] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#5B6472] sm:text-lg sm:leading-8">
        {text}
      </p>
    </div>
  );
}

function HeroSignupCard() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#E3E6EC] bg-white p-5 shadow-[0_18px_50px_rgba(15,34,71,0.07)] sm:p-6 lg:p-7">
      <svg
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 opacity-[0.06]"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="15" cy="15" r="3" fill="#0F2247" />
        <circle cx="50" cy="35" r="3" fill="#0F2247" />
        <circle cx="85" cy="15" r="3" fill="#0F2247" />
        <circle cx="50" cy="80" r="3" fill="#0F2247" />
        <path
          d="M15 15 L50 35 L85 15 M50 35 L50 80"
          stroke="#0F2247"
          strokeWidth="1"
        />
      </svg>

      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2952A3]">
        Start here
      </p>

      <h2 className="mt-4 text-2xl font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0A1628] sm:text-[1.75rem]">
        Ready to take your next step?
      </h2>

      <p className="mt-3 text-sm leading-6 text-[#5B6472] sm:text-[15px] sm:leading-7">
        Create your account, choose what you want to learn, and begin a guided AI lesson.
      </p>

      <div className="mt-5 space-y-3.5 sm:mt-6">
        <select
          aria-label="Select your learning world"
          defaultValue=""
          className="w-full rounded-lg border border-[#E3E6EC] bg-white px-4 py-3.5 text-sm font-semibold text-[#5B6472] outline-none transition focus:border-[#2952A3] focus:ring-2 focus:ring-[#2952A3]/10 sm:px-5 sm:text-[15px]"
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
          className="flex items-center justify-center gap-2 rounded-lg bg-[#0F2247] px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#16305F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2952A3] focus-visible:ring-offset-2"
        >
          Create Account
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 border-t border-[#E3E6EC] pt-5 sm:mt-7">
        <p className="font-bold text-[#0A1628]">Platform starts with:</p>

        <ul className="mt-3 space-y-2 text-sm leading-6 text-[#5B6472]">
          {[
            "Learning dashboard",
            "AI instructor previews",
            "Lessons, notes, and progress",
            "Certificates and portfolios planned",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2
                className="mt-1 h-4 w-4 flex-none text-[#2952A3]"
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
    <div className="w-full rounded-2xl border border-[#E3E6EC] bg-white p-3 shadow-[0_20px_60px_rgba(15,34,71,0.08)] sm:p-5">
      <div className="rounded-xl border border-[#E3E6EC] bg-[#F7F8FA] p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold leading-tight text-[#5B6472] sm:text-xl">
              Welcome back,
            </p>
            <p className="text-xl font-extrabold leading-tight tracking-[-0.02em] text-[#0A1628] sm:text-2xl">
              Learner
            </p>
          </div>

          <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-bold text-[#5B6472] shadow-sm">
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
                  index === 0 ? "bg-[#F7F8FA] text-[#0F2247]" : "text-[#5B6472]"
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
                  <Icon className="h-5 w-5 text-[#2952A3]" strokeWidth={1.75} />
                  <p className="mt-3 text-xl font-bold text-[#0A1628] sm:text-2xl">
                    {num}
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-[#5B6472] sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-white p-5 shadow-sm sm:p-6">
              <p className="text-lg font-bold text-[#0A1628]">
                Continue Learning
              </p>
              <p className="mt-3 text-sm leading-6 text-[#5B6472]">
                No courses started yet. Choose a learning world to begin your
                journey.
              </p>
              <Link
                href="/signup"
                className="mt-6 inline-flex rounded-lg bg-[#0F2247] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16305F]"
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
    <div className="flex h-full flex-col rounded-2xl border border-[#E3E6EC] bg-white p-6 transition hover:border-[#0F2247]/30 hover:shadow-[0_16px_40px_rgba(15,34,71,0.08)] lg:p-7">
      <div className="grid h-14 w-14 place-items-center rounded-xl border border-[#0F2247]/20 text-[#0F2247] lg:h-16 lg:w-16">
        <Icon className="h-7 w-7" strokeWidth={1.5} />
      </div>

      <h3 className="mt-6 text-xl font-bold text-[#0A1628]">{title}</h3>

      <p className="mt-4 flex-1 text-base leading-7 text-[#5B6472]">{text}</p>

      <Link
        href="/signup"
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#2952A3]"
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
    <div className="grid gap-6 rounded-2xl border border-[#E3E6EC] bg-white p-5 sm:p-7 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8">
      <div className="relative h-[260px] overflow-hidden rounded-xl bg-[#F7F8FA] sm:h-[300px] md:h-full md:min-h-[260px]">
        <img
          src={image}
          alt={`${name}, ${role}`}
          className="h-full w-full object-cover grayscale-[15%] contrast-[1.05] saturate-[0.85]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1628]/25 via-transparent to-[#2952A3]/10" />
      </div>

      <div className="flex min-w-0 flex-col justify-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2952A3]">
          Specialty
        </p>
        <h3 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-[#0A1628]">
          {name}
        </h3>
        <p className="mt-1 text-base font-semibold text-[#2952A3]">{role}</p>
        <p className="mt-5 text-base leading-7 text-[#5B6472]">{desc}</p>
        <Link
          href="/signup"
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#2952A3]"
        >
          View Instructor <ArrowRight className="h-3.5 w-3.5" />
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
    <div className="relative rounded-2xl border border-[#E3E6EC] bg-white p-6 lg:p-7">
      <div className="flex items-center justify-between">
        <span className="h-3 w-3 rounded-full bg-[#0F2247]" />
        <p className="text-xs font-bold text-[#2952A3]">{number}</p>
      </div>

      <h3 className="mt-7 text-lg font-bold text-[#0A1628]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#5B6472]">{text}</p>
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
    <div className="rounded-2xl border border-[#E3E6EC] bg-white p-6 sm:p-7">
      <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#0F2247]/20 text-[#0F2247]">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#0A1628]">{title}</h3>
      <p className="mt-3 text-base leading-7 text-[#5B6472]">{text}</p>
    </div>
  );
}

function RoadmapCard({ stage, text }: { stage: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#E3E6EC] bg-white p-6 sm:p-7">
      <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#0F2247]/20">
        <span className="h-3 w-3 rotate-45 bg-[#0F2247]" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#0A1628]">{stage}</h3>
      <p className="mt-3 text-base leading-7 text-[#5B6472]">{text}</p>
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
    <div className="mx-auto max-w-5xl rounded-2xl border border-[#E3E6EC] bg-white shadow-[0_18px_50px_rgba(15,34,71,0.07)]">
      {/* Lesson header + progress */}
      <div className="border-b border-[#E3E6EC] p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2952A3]">
              Career Skills · Lesson 3 of 12
            </p>
            <h3 className="mt-2 text-xl font-bold text-[#0A1628] sm:text-2xl">
              Negotiation Basics
            </h3>
          </div>
          <span className="rounded-full bg-[#F7F8FA] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#5B6472]">
            Preview
          </span>
        </div>

        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[#F7F8FA]">
          <div className="h-full w-[28%] rounded-full bg-[#0F2247]" />
        </div>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Instructor panel */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="relative h-32 w-32 overflow-hidden rounded-2xl bg-[#F7F8FA] lg:h-40 lg:w-40">
            <img
              src="/instructors/arin.jpg"
              alt="Arin, Career and Finance Instructor"
              className="h-full w-full object-cover grayscale-[15%] contrast-[1.05] saturate-[0.85]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1628]/25 via-transparent to-[#2952A3]/10" />
          </div>

          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#2952A3]">
            Your Instructor
          </p>
          <h4 className="mt-1 text-lg font-bold text-[#0A1628]">Arin</h4>
          <p className="text-sm font-semibold text-[#2952A3]">Career &amp; Finance Instructor</p>
          <p className="mt-3 text-sm leading-6 text-[#5B6472]">
            Teaching negotiation, budgeting, and real-world financial decision-making.
          </p>
        </div>

        {/* Main workspace */}
        <div className="min-w-0 space-y-6">
          {/* Concept */}
          <div className="rounded-xl border border-[#E3E6EC] bg-[#F7F8FA] p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2952A3]">
              Concept
            </p>
            <h4 className="mt-2 text-lg font-bold text-[#0A1628]">
              Before You Respond to an Offer
            </h4>
            <p className="mt-3 text-sm leading-7 text-[#5B6472]">
              Never accept or reject a job offer immediately. The strongest
              negotiators research the market rate for the role first, then
              respond with a counter that&apos;s grounded in that data instead
              of emotion.
            </p>
          </div>

          {/* Practice task */}
          <div className="rounded-xl border border-[#E3E6EC] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2952A3]">
                Practice Task
              </p>
              {attempt === 1 && stage !== "correct" && (
                <span className="rounded-full bg-[#F7F8FA] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#5B6472]">
                  Retry
                </span>
              )}
            </div>

            <p className="mt-2 text-base font-semibold leading-7 text-[#0A1628]">
              You receive a job offer of $52,000. What should you do before responding?
            </p>

            {stage !== "correct" && (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  rows={3}
                  className="w-full rounded-lg border border-[#E3E6EC] px-4 py-3 text-sm leading-6 text-[#0A1628] outline-none focus:border-[#2952A3]"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#0F2247] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16305F]"
                >
                  Submit Answer
                </button>
              </form>
            )}
          </div>

          {/* Correction panel */}
          {stage === "incorrect" && (
            <div className="rounded-xl border border-[#E3E6EC] bg-white p-5 sm:p-6">
              <div className="flex items-start gap-3 border-l-2 border-[#0F2247]/15 pl-4">
                <XCircle className="mt-0.5 h-5 w-5 flex-none text-[#5B6472]" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-bold text-[#0A1628]">
                    Not quite — here&apos;s what was missed
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#5B6472]">
                    Accepting immediately skips research and gives up room to
                    negotiate. Look up the market rate for this role first,
                    then respond with a specific counter number.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRetry}
                className="mt-5 rounded-lg border border-[#E3E6EC] px-6 py-3 text-sm font-semibold text-[#0A1628] transition hover:border-[#0F2247]/30"
              >
                Retry Task
              </button>
            </div>
          )}

          {/* Understanding confirmation */}
          {stage === "correct" && (
            <div className="rounded-xl border border-[#E3E6EC] bg-white p-5 sm:p-6">
              <div className="flex items-start gap-3 border-l-2 border-[#0F2247]/15 pl-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#2952A3]" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-bold text-[#0A1628]">
                    Correct — understanding confirmed
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#5B6472]">
                    You grounded the ask in market data instead of emotion.
                    That&apos;s the core negotiation skill for this lesson.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Notes & lesson recap controls */}
          <div className="flex flex-col gap-3 border-t border-[#E3E6EC] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setNoteSaved(true)}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#E3E6EC] px-5 py-3 text-sm font-semibold text-[#0A1628] transition hover:border-[#0F2247]/30"
            >
              <StickyNote className="h-4 w-4" strokeWidth={1.75} />
              {noteSaved ? "Saved to Notes" : "Save to Notes"}
            </button>

            <button
              type="button"
              onClick={() => setRecapOpen((open) => !open)}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#E3E6EC] px-5 py-3 text-sm font-semibold text-[#0A1628] transition hover:border-[#0F2247]/30"
            >
              <ListChecks className="h-4 w-4" strokeWidth={1.75} />
              {recapOpen ? "Hide Lesson Recap" : "View Lesson Recap"}
            </button>
          </div>

          {recapOpen && (
            <div className="rounded-xl border border-[#E3E6EC] bg-[#F7F8FA] p-5 text-sm leading-6 text-[#5B6472]">
              Research the market rate before responding to any offer, then
              counter with a specific number backed by that data.
            </div>
          )}
        </div>
      </div>

      <p className="border-t border-[#E3E6EC] p-6 text-sm leading-6 text-[#5B6472] sm:p-8">
        This is a preview of how AI instructors teach. Real lessons adapt to
        your answers in real time.
      </p>
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#E3E6EC]">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#E3E6EC] bg-[#F7F8FA]">
            <th className="p-5 text-sm font-bold text-[#0A1628]">
              What matters when learning
            </th>
            {comparisonColumns.map((col, index) => (
              <th
                key={col}
                className={`p-5 text-sm ${
                  index === 0 ? "font-bold text-[#0F2247]" : "font-semibold text-[#5B6472]"
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.feature} className="border-b border-[#E3E6EC] last:border-0">
              <td className="p-5 text-sm font-semibold text-[#0A1628]">{row.feature}</td>
              {row.values.map((value, index) => (
                <td key={index} className="p-5">
                  {value ? (
                    <CheckCircle2 className="h-5 w-5 text-[#2952A3]" strokeWidth={1.75} />
                  ) : (
                    <Minus className="h-5 w-5 text-[#5B6472]/40" strokeWidth={1.75} />
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

function JourneyTimeline() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-[#0F2247]/15 lg:block" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {journey.map((item, index) => (
          <div key={item.title} className="relative flex flex-col items-start text-left">
            <div className="relative z-10 grid h-12 w-12 flex-none place-items-center rounded-full border border-[#0F2247]/20 bg-white text-[#0F2247]">
              <item.Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <p className="mt-4 text-xs font-bold text-[#2952A3]">
              Step {index + 1}
              {item.future ? " · Future" : ""}
            </p>
            <h3 className="mt-1 text-base font-bold text-[#0A1628]">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#5B6472]">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyFasterCard({ Icon, title, text }: { Icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#E3E6EC] bg-white p-6 sm:p-7">
      <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#0F2247]/20 text-[#0F2247]">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 text-lg font-bold text-[#0A1628]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#5B6472]">{text}</p>
    </div>
  );
}

function PreviewMiniCard({ Icon, title, text }: { Icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#E3E6EC] bg-white p-5">
      <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#0F2247]/20 text-[#0F2247]">
        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-sm font-bold text-[#0A1628]">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-[#5B6472]">{text}</p>
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
    <div className="rounded-2xl border border-[#E3E6EC] bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
      >
        <span className="text-base font-bold text-[#0A1628]">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-none text-[#2952A3] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={1.75}
        />
      </button>

      {isOpen && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <p className="text-sm leading-7 text-[#5B6472]">{answer}</p>
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
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0A1628]">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-[#5B6472] transition hover:text-[#2952A3]"
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
      className="min-h-screen scroll-smooth bg-white font-sans text-[#0A1628] xl:[zoom:0.75]"
    >
      <header className="sticky top-0 z-50 border-b border-[#E3E6EC] bg-white/95 backdrop-blur">
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
              <p className="truncate text-xl font-extrabold tracking-[-0.025em] sm:text-2xl">
                GAHN AI
              </p>
              <p className="hidden text-[8px] font-bold uppercase tracking-[0.16em] text-[#5B6472] sm:block lg:text-[9px]">
                Global AI Human Helper Network
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-5 text-sm font-semibold xl:flex 2xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition hover:text-[#2952A3]"
              >
                {link.label}
              </a>
            ))}
            <Link href="/pricing" className="transition hover:text-[#2952A3]">
              Pricing
            </Link>
          </div>

          <div className="hidden items-center gap-3 xl:flex">
            <Link
              href="/login"
              className="rounded-lg border border-[#E3E6EC] px-5 py-2.5 text-sm font-semibold transition hover:border-[#0F2247]/30"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-[#0F2247] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16305F]"
            >
              Sign Up
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-11 w-11 place-items-center rounded-lg border border-[#E3E6EC] text-[#0A1628] xl:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-[#E3E6EC] bg-white xl:hidden">
            <div className={`${shellClass} py-5`}>
              <div className="flex flex-col gap-1 text-sm font-semibold">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 transition hover:bg-[#F7F8FA] hover:text-[#2952A3]"
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  href="/pricing"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 transition hover:bg-[#F7F8FA] hover:text-[#2952A3]"
                >
                  Pricing
                </Link>
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t border-[#E3E6EC] pt-4 sm:flex-row">
                <Link
                  href="/login"
                  className="w-full rounded-lg border border-[#E3E6EC] px-6 py-3 text-center text-sm font-semibold transition hover:border-[#0F2247]/30"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="w-full rounded-lg bg-[#0F2247] px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#16305F]"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="bg-[#F7F8FA]">
        <div
          className={`${shellClass} grid items-center gap-10 py-12 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(340px,390px)] lg:gap-14 lg:py-16 xl:gap-16 xl:py-20`}
        >
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2952A3] sm:text-sm">
              AI-Powered Learning for Students and Self-Learners
            </p>

            <h1 className="mt-5 max-w-[920px] text-5xl font-extrabold leading-[1.03] tracking-[-0.045em] text-[#0A1628] sm:mt-6 sm:text-7xl">
              AI instructors that{" "}
              <span className="lg:block">
                teach, check, and <span className="text-[#2952A3]">adapt to you.</span>
              </span>
            </h1>

            <p className="mt-6 max-w-[760px] text-base leading-7 text-[#5B6472] sm:mt-7 sm:text-lg sm:leading-8 lg:text-lg lg:leading-8">
              GAHN AI helps students and self-learners build real skills through
              structured lessons. Instead of only giving answers, the AI teaches
              concepts, gives practice, checks understanding, corrects mistakes,
              and guides learners until the lesson makes sense.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/signup"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#0F2247] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#16305F] sm:w-auto sm:px-8 sm:text-base"
              >
                Start Learning
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#E3E6EC] bg-white px-8 py-4 text-base font-semibold transition hover:border-[#0F2247]/30 sm:w-auto sm:px-9"
              >
                See How It Works <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-[#E3E6EC] pt-7 sm:mt-10 sm:pt-8 lg:grid-cols-4">
              {[
                ["Structured Lessons", "Not random chats"],
                ["Active Practice", "You must think and respond"],
                ["Adaptive Feedback", "Mistakes change the lesson"],
                ["Saved Progress", "Continue where you left off"],
              ].map(([item, sub]) => (
                <div key={item}>
                  <p className="flex items-start gap-1.5 text-sm font-bold text-[#0A1628]">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-none text-[#2952A3]"
                      strokeWidth={1.75}
                    />
                    <span>{item}</span>
                  </p>
                  <p className="mt-1 text-sm text-[#5B6472]">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          <HeroSignupCard />
        </div>
      </section>

      {/* WHO IT IS FOR */}
      <section className="border-y border-[#E3E6EC] bg-white py-16 sm:py-20">
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
                className="rounded-2xl border border-[#E3E6EC] bg-[#F7F8FA] p-6 sm:p-7"
              >
                <h3 className="text-xl font-bold text-[#0A1628]">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#5B6472]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-[#0A1628] px-6 py-7 text-white sm:px-8 sm:py-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6F9BFF]">
              Why It Is Different
            </p>
            <p className="mt-3 max-w-5xl text-lg leading-8 text-white/85 sm:text-xl">
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
            {instructors.map((instructor) => (
              <InstructorCard key={instructor.name} {...instructor} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY STUDENTS LEARN FASTER */}
      <section className="scroll-mt-24 bg-[#F7F8FA] py-20 sm:py-24">
        <div className={shellClass}>
          <SectionIntro
            eyebrow="The Learning Science"
            title="Why students learn faster with GAHN AI."
            text="Every lesson is built around methods proven to build real, lasting understanding — not just short-term answers."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6">
            {whyFaster.map((item) => (
              <WhyFasterCard key={item.title} {...item} />
            ))}
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

      {/* LEARNING JOURNEY TIMELINE */}
      <section className="scroll-mt-24 bg-[#F7F8FA] py-20 sm:py-24">
        <div className={shellClass}>
          <SectionIntro
            eyebrow="The Full Journey"
            title="From first signup to a finished skill."
            text="A closer look at the complete path a learner takes through GAHN AI, start to finish."
          />

          <JourneyTimeline />
        </div>
      </section>

      {/* COMPARISON */}
      <section className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className={shellClass}>
          <SectionIntro
            eyebrow="GAHN AI vs. Everything Else"
            title="Answers are easy to find. Understanding isn't."
            text="Here's how a structured AI instructor compares to the tools people usually reach for instead."
          />

          <ComparisonTable />
        </div>
      </section>

      {/* PLATFORM PREVIEW */}
      <section
        id="platform"
        className="scroll-mt-24 bg-[#F7F8FA] py-20 sm:py-24"
      >
        <div
          className={`${shellClass} grid items-center gap-12 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[410px_minmax(0,1fr)]`}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2952A3]">
              Platform Preview
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              A dashboard built for learning action.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#5B6472] sm:text-lg sm:leading-8">
              The dashboard is where users choose learning worlds, meet AI
              instructors, continue lessons, track progress, save notes, and
              build a skill portfolio over time.
            </p>

            <ul className="mt-8 space-y-3">
              {platformFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 flex-none text-[#2952A3]"
                    strokeWidth={1.75}
                  />
                  <span className="text-base leading-7 text-[#5B6472]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <DashboardPreview />
        </div>

        <div className={`${shellClass} mt-10 sm:mt-14`}>
          <p className="text-sm font-bold text-[#0A1628]">Every page you'll actually use:</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {previewPages.map((page) => (
              <PreviewMiniCard key={page.title} {...page} />
            ))}
          </div>
        </div>
      </section>

      {/* SCHOOLS */}
      <section id="schools" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className={shellClass}>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2952A3]">
              Schools &amp; Classrooms
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              Built to expand from learners to classrooms.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#5B6472] sm:text-lg sm:leading-8">
              The long-term platform vision includes teacher dashboards,
              classroom analytics, and school accounts.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 sm:mt-14">
            {schoolFeatures.map((feature) => (
              <SchoolCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY & PRIVACY */}
      <section id="security" className="scroll-mt-24 bg-[#F7F8FA] py-20 sm:py-24">
        <div className={shellClass}>
          <SectionIntro
            eyebrow="Security & Privacy"
            title="Your learning data stays yours."
            text="Notes, lesson history, and progress are tied to your account only — not shared, sold, or made visible to other users."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                Icon: EyeOff,
                title: "Private by default",
                text: "Your notes, progress, and lesson history are visible only to you, never to other learners.",
              },
              {
                Icon: Lock,
                title: "Secure storage",
                text: "Account data is stored using encrypted, access-controlled infrastructure.",
              },
              {
                Icon: ShieldCheck,
                title: "You're in control",
                text: "You can review, export, or request deletion of your account and data at any time.",
              },
            ].map((item) => (
              <WhyFasterCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className={shellClass}>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2952A3]">
              Expansion Roadmap
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              A serious platform built in stages.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:mt-14">
            {roadmap.map((item) => (
              <RoadmapCard key={item.stage} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 bg-[#F7F8FA] py-20 sm:py-24">
        <div className={shellClass}>
          <SectionIntro
            eyebrow="Frequently Asked Questions"
            title="Everything you're probably wondering."
            text="Can't find what you're looking for? Reach out any time — see the Contact link in the footer."
          />

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.q}
                question={faq.q}
                answer={faq.a}
                isOpen={openFaqIndex === index}
                onToggle={() =>
                  setOpenFaqIndex((current) => (current === index ? null : index))
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-white py-20 sm:py-24">
        <div className={shellClass}>
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-[#0A1628] px-6 py-9 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:px-10 lg:py-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6F9BFF]">
                Get started today
              </p>
              <h2 className="mt-3 max-w-3xl text-2xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
                Your first AI-guided lesson is one click away.
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-white/70">
                New users create an account first. Returning users log in with
                their email.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {["No credit card required to start", "Cancel anytime", "Built for every learner"].map(
                  (point) => (
                    <p key={point} className="flex items-center gap-2 text-sm font-semibold text-white/80">
                      <CheckCircle2 className="h-4 w-4 flex-none text-[#6F9BFF]" strokeWidth={1.75} />
                      {point}
                    </p>
                  )
                )}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 lg:flex-none">
              <Link
                href="/signup"
                className="w-full rounded-lg bg-white px-8 py-4 text-center text-sm font-semibold text-[#0A1628] transition hover:bg-[#F7F8FA] sm:w-auto"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="w-full rounded-lg border border-white/25 px-8 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E3E6EC] py-14">
        <div className={shellClass}>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
            <div className="sm:col-span-2 lg:col-span-2">
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
                  <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#5B6472]">
                    Global AI Human Helper Network
                  </p>
                </div>
              </Link>
              <p className="mt-5 max-w-xs text-sm leading-6 text-[#5B6472]">
                A structured AI learning platform for students, self-learners,
                and future classrooms.
              </p>
            </div>

            {footerColumns.map((column) => (
              <FooterColumn key={column.title} {...column} />
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E3E6EC] pt-8 sm:flex-row">
            <p className="text-xs text-[#5B6472]">
              © 2026 GAHN AI. All rights reserved.
            </p>

            <a
              href="mailto:hello@gahnai.com"
              className="flex items-center gap-2 text-xs font-semibold text-[#2952A3]"
            >
              <Mail className="h-4 w-4" strokeWidth={1.75} />
              hello@gahnai.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}