"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import EarlyAccessVoices from "@/components/EarlyAccessVoices";
import {
  ArrowRight,
  BookOpenCheck,
  Brain,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleDot,
  FileText,
  Globe2,
  GraduationCap,
  Menu,
  MessageSquareText,
  NotebookTabs,
  Play,
  Sparkles,
  Target,
  Upload,
  X,
} from "lucide-react";

const shell = "mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12";

const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#learning-worlds", label: "Learning Worlds" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
];

const worlds = [
  {
    title: "Career Skills",
    description:
      "Business, technology, finance, communication, and job focused learning paths.",
    available: true,
    icon: BriefcaseBusiness,
  },
  {
    title: "School Help",
    description:
      "Math, science, English, reading, study skills, and guided homework help.",
    available: true,
    icon: GraduationCap,
  },
  {
    title: "Brain Development",
    description: "Memory, focus, reasoning, habits, and learning performance.",
    available: false,
    icon: Brain,
  },
  {
    title: "General Knowledge",
    description: "History, technology, culture, life skills, and current topics.",
    available: false,
    icon: Globe2,
  },
  {
    title: "Book Intelligence",
    description: "Learn from books through guided explanations and practice.",
    available: false,
    icon: BookOpenCheck,
  },
];

const faqs = [
  {
    q: "What ages is GAHN AI built for?",
    a: "GAHN AI is built for learners ages 12 and up. It can support teens and adults who are studying for school, building career skills, or learning something new on their own.",
  },
  {
    q: "What are the learning worlds?",
    a: "GAHN AI is designed around five learning worlds. Career Skills and School Help are available during the MVP. Brain Development, General Knowledge, and Book Intelligence stay visible but unavailable until the core teaching experience is proven.",
  },
  {
    q: "What is the AI instructor supposed to do?",
    a: "The instructor teaches, asks questions, checks your response, identifies misunderstandings, explains the idea differently, gives practice, and checks understanding again before moving forward.",
  },
  {
    q: "Can I upload homework?",
    a: "School Help includes guided homework support for screenshots, worksheets, PDFs, and documents. The goal is to help you understand the work, not simply return an answer.",
  },
  {
    q: "Is my learning data private?",
    a: "Your notes, lesson history, and progress are tied to your account and are not visible to other learners. See the Privacy Policy for more detail.",
  },
];

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/pricing" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Logo() {
  return (
    <span className="flex items-center gap-3">
      <img
        src="/logo/favicon.png"
        alt=""
        className="h-9 w-9 rounded-full object-cover"
      />
      <span>
        <span className="block text-[18px] font-semibold tracking-[-0.45px] text-[#0B1739]">
          GAHN AI
        </span>
        <span className="hidden text-[8px] font-semibold uppercase tracking-[0.19em] text-[#757682] sm:block">
          Global AI Human Helper Network
        </span>
      </span>
    </span>
  );
}

function AnnouncementBar() {
  return (
    <a
      href="#learning-worlds"
      className="flex min-h-[42px] items-center justify-center bg-gradient-to-r from-[#77E8E9] via-[#6ABAFB] to-[#1F6BFF] px-5 text-center text-[13px] font-medium leading-5 text-white"
    >
      GAHN AI early access is open for Career Skills and School Help
      <ArrowRight className="ml-2 h-3.5 w-3.5" />
    </a>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 border-b border-[#EEEEF0] bg-white/95 backdrop-blur-xl">
        <div className={cx(shell, "flex h-[76px] items-center justify-between gap-6")}>
          <a href="#top" aria-label="GAHN AI home">
            <Logo />
          </a>

          <nav className="hidden items-center gap-7 text-[14px] font-normal leading-6 text-[#1D1D20] lg:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="transition-opacity hover:opacity-60">
                {item.label}
              </a>
            ))}
            <Link href="/pricing" className="transition-opacity hover:opacity-60">
              Pricing
            </Link>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center px-2 text-[14px] font-medium text-[#1D1D20]"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#0B1739] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#132754]"
            >
              Sign Up
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#EEEEF0] text-[#1D1D20] lg:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-[#EEEEF0] bg-white lg:hidden">
            <div className={cx(shell, "py-5")}>
              <div className="grid gap-1">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-[#1D1D20] hover:bg-[#F7F7F8]"
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  href="/pricing"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-[#1D1D20] hover:bg-[#F7F7F8]"
                >
                  Pricing
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#EEEEF0] pt-4">
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[#D9D9DE] text-sm font-medium text-[#1D1D20]"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#0B1739] text-sm font-medium text-white"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13.5px] font-medium leading-5 tracking-[-0.4px] text-[#1F6BFF]">
      {children}
    </p>
  );
}

function CanvasSkeleton() {
  return (
    <div className="h-full bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-[#EEEEF0] pb-4">
        <div className="flex items-center gap-5 text-[12px] font-medium text-[#757682]">
          <span className="border-b-2 border-[#1F6BFF] pb-3 text-[#1D1D20]">
            Canvas
          </span>
          <span>Notes</span>
          <span>Practice</span>
        </div>
        <span className="rounded-full bg-[#EEF4FF] px-3 py-1 text-[10px] font-semibold text-[#1F6BFF]">
          Live workspace
        </span>
      </div>

      <div className="mt-5 grid h-[310px] grid-rows-[84px_1fr_68px] gap-4">
        <div className="rounded-lg border border-[#EEEEF0] bg-[#F7F7F8] p-4">
          <div className="h-3 w-24 rounded-full bg-[#D9D9DE]" />
          <div className="mt-3 h-3 w-[72%] rounded-full bg-[#E5E7EB]" />
          <div className="mt-2 h-3 w-[54%] rounded-full bg-[#E5E7EB]" />
        </div>

        <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-[#EEEEF0] p-4">
            <div className="h-3 w-20 rounded-full bg-[#D9D9DE]" />
            <div className="mt-4 space-y-3">
              <div className="h-11 rounded-md bg-[#F7F7F8]" />
              <div className="h-11 rounded-md bg-[#F7F7F8]" />
              <div className="h-11 rounded-md bg-[#F7F7F8]" />
            </div>
          </div>
          <div className="sequence-ui-grid rounded-lg border border-[#EEEEF0] bg-[#FBFCFD] p-4">
            <div className="grid h-full place-items-center">
              <div className="grid h-24 w-24 place-items-center rounded-full border border-[#D7E3F2] bg-white shadow-sm">
                <div className="h-10 w-10 rounded-lg bg-[#EEF4FF]" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-[#EEEEF0] bg-[#F7F7F8] p-3">
            <div className="h-2.5 w-12 rounded-full bg-[#D9D9DE]" />
            <div className="mt-2 h-5 rounded bg-white" />
          </div>
          <div className="rounded-lg border border-[#EEEEF0] bg-[#F7F7F8] p-3">
            <div className="h-2.5 w-12 rounded-full bg-[#D9D9DE]" />
            <div className="mt-2 h-5 rounded bg-white" />
          </div>
          <div className="rounded-lg border border-[#EEEEF0] bg-[#F7F7F8] p-3">
            <div className="h-2.5 w-12 rounded-full bg-[#D9D9DE]" />
            <div className="mt-2 h-5 rounded bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

function InstructorPlaceholder() {
  return (
    <div className="relative h-full overflow-hidden border-b border-[#EEEEF0] bg-[#0B1739] p-5 text-white md:border-b-0 md:border-r">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(31,107,255,0.34),transparent_34%),radial-gradient(circle_at_78%_88%,rgba(119,232,233,0.12),transparent_30%)]" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium">
            AI Instructor
          </span>
          <span className="flex items-center gap-2 text-[11px] text-[#C8D5EA]">
            <span className="h-2 w-2 rounded-full bg-[#38D68A]" />
            Ready
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
          <div className="relative grid h-28 w-28 place-items-center rounded-full border border-white/15 bg-white/10">
            <div className="absolute inset-3 rounded-full border border-[#6EA4FF]/35" />
            <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-sm font-semibold text-[#0B1739]">
              AI
            </div>
          </div>
          <p className="mt-5 text-[15px] font-medium">Instructor placeholder</p>
          <p className="mt-2 max-w-[190px] text-[12px] leading-5 text-[#B7C5DA]">
            Real time teaching will appear here.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/10"
            aria-label="Voice placeholder"
          >
            <MessageSquareText className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/10"
            aria-label="Lesson tools placeholder"
          >
            <Sparkles className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/10"
            aria-label="Play placeholder"
          >
            <Play className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function HeroProductPreview() {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-[768px]">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[46%] h-[180px] w-[78%] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#77E8E9]/25 via-[#1F6BFF]/25 to-[#8DB8FF]/10 blur-[28px]"
      />

      <div className="sequence-card relative overflow-hidden rounded-t-lg bg-white">
        <div className="grid min-h-[400px] md:grid-cols-[240px_1fr]">
          <InstructorPlaceholder />
          <CanvasSkeleton />
        </div>
      </div>

      <div className="absolute -left-16 top-[110px] hidden items-center gap-2 rounded-lg border border-dashed border-[#B9BAC0] bg-white px-3 py-1.5 text-[12px] font-medium text-[#42424A] xl:flex">
        Private AI lesson
      </div>

      <div className="absolute -right-4 bottom-[-14px] hidden rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-[#1D1D20] shadow-[0_0_0_1px_rgba(29,29,32,0.08),0_4px_6px_-1px_rgba(0,0,0,0.1)] md:block">
        Learning workspace
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-16 sm:pt-20">
      <div aria-hidden="true" className="sequence-hero-grid absolute inset-x-0 top-24 h-[620px]" />

      <div className={cx(shell, "relative")}>
        <div className="mx-auto max-w-[768px] text-center">
          <Eyebrow>Private AI instruction built around active learning</Eyebrow>

          <h1 className="mx-auto mt-3 text-[44px] font-semibold leading-[1.06] tracking-[-1.3px] text-[#1D1D20] sm:text-[56px] sm:leading-[1.08] lg:text-[63px] lg:leading-[72px] lg:tracking-[-1.6px]">
            Learning built for what you want to become.
          </h1>

          <p className="mx-auto mt-5 max-w-[560px] text-[15.75px] font-normal leading-7 tracking-[-0.4px] text-[#42424A]">
            Start with Career Skills and School Help while GAHN tests a private AI instructor that teaches, checks understanding, and adapts when you get stuck.
          </p>

          <div className="mx-auto mt-7 flex min-h-[56px] w-full max-w-[376px] items-center rounded-full border border-[#E5E7EB] bg-white p-[10px] pl-5 shadow-sm">
            <span className="min-w-0 flex-1 truncate text-left text-[13px] text-[#92939E]">
              Early access is open
            </span>
            <Link
              href="/signup"
              className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-[#1F6BFF] px-5 text-[14px] font-medium leading-5 text-white transition-colors hover:bg-[#1858E0]"
            >
              Start free
            </Link>
          </div>

          <a
            href="#learning-worlds"
            className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-[#1F6BFF]"
          >
            Explore Learning Worlds
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <HeroProductPreview />
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    "Career Skills",
    "School Help",
    "Homework Upload",
    "Saved Notes",
    "Progress",
  ];

  return (
    <section className="bg-white pb-24">
      <div className={shell}>
        <p className="text-center text-[14px] font-medium leading-6 text-[#42424A]">
          One learning system across the tools learners use most
        </p>
        <div className="mt-9 grid grid-cols-2 gap-y-7 border-y border-[#EEEEF0] py-7 sm:grid-cols-5">
          {items.map((item, index) => (
            <div
              key={item}
              className={cx(
                "text-center text-[13px] font-medium text-[#757682]",
                index > 0 && "sm:border-l sm:border-[#EEEEF0]"
              )}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 text-[14px] leading-6 text-[#42424A]">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#EEF4FF] text-[#1F6BFF]">
        <Check className="h-3 w-3" />
      </span>
      <span>{children}</span>
    </div>
  );
}

function TutorFlowUI() {
  const steps = [
    ["Teach", "Clear explanation"],
    ["Ask", "Learner responds"],
    ["Evaluate", "Check understanding"],
    ["Re teach", "Explain it differently"],
    ["Practice", "Try the skill again"],
  ];

  return (
    <div className="relative mx-auto w-full max-w-[475px]">
      <div className="sequence-card rounded-lg bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-[#EEEEF0] pb-4">
          <div>
            <p className="text-[11px] text-[#92939E]">Learning session</p>
            <p className="mt-1 text-[15px] font-medium text-[#1D1D20]">
              Teaching loop
            </p>
          </div>
          <Target className="h-5 w-5 text-[#1F6BFF]" />
        </div>

        <div className="mt-4 grid gap-2">
          {steps.map(([title, text], index) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-md border border-[#EEEEF0] px-3 py-3"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#EEF4FF] text-[11px] font-semibold text-[#1F6BFF]">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-[#1D1D20]">{title}</p>
                <p className="text-[11px] leading-4 text-[#92939E]">{text}</p>
              </div>
              {index < steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-[#B9BAC0]" />}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -left-8 bottom-10 hidden rounded-lg border border-[#EEEEF0] bg-white px-3 py-2 text-[11px] font-medium text-[#42424A] shadow-sm sm:block">
        Re teach when needed
      </div>
    </div>
  );
}

function HistoryLessonUI() {
  return (
    <div className="sequence-card mx-auto w-full max-w-[475px] overflow-hidden rounded-lg bg-white">
      <div className="flex items-center justify-between border-b border-[#EEEEF0] px-5 py-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#92939E]">
            Grade 8 History
          </p>
          <p className="mt-1 text-[15px] font-medium text-[#1D1D20]">
            Primary source response
          </p>
        </div>
        <span className="rounded-full bg-[#EEF4FF] px-3 py-1 text-[10px] font-semibold text-[#1F6BFF]">
          School Help
        </span>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-lg bg-[#F7F7F8] p-4">
          <p className="text-[11px] font-medium text-[#757682]">Source excerpt</p>
          <div className="mt-4 space-y-3">
            <div className="h-3 w-full rounded bg-[#D9D9DE]" />
            <div className="h-3 w-[92%] rounded bg-[#E5E7EB]" />
            <div className="h-3 w-[86%] rounded bg-[#E5E7EB]" />
            <div className="h-3 w-[68%] rounded bg-[#E5E7EB]" />
          </div>
        </div>

        <div className="rounded-lg border border-[#EEEEF0] p-4">
          <p className="text-[12px] font-medium text-[#1D1D20]">
            Explain the author's main argument in your own words.
          </p>
          <div className="mt-4 rounded-md border border-dashed border-[#C9D5E6] bg-[#FBFCFD] p-3">
            <div className="h-3 w-[88%] rounded bg-[#E5E7EB]" />
            <div className="mt-2 h-3 w-[72%] rounded bg-[#E5E7EB]" />
            <div className="mt-2 h-3 w-[55%] rounded bg-[#E5E7EB]" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-[#1F6BFF]">
            <CircleDot className="h-3.5 w-3.5" />
            Instructor checks your reasoning
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({
  eyebrow,
  title,
  body,
  points,
  visual,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  visual: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className={cx(reverse && "lg:order-2")}>
        <span className="inline-flex rounded-full border border-[#EEEEF0] bg-[#F7F7F8] px-3 py-1 text-[12px] font-medium leading-5 text-[#42424A]">
          {eyebrow}
        </span>
        <h2 className="mt-5 max-w-[520px] text-[34px] font-medium leading-[48px] tracking-[-0.9px] text-[#1D1D20] sm:text-[36px]">
          {title}
        </h2>
        <p className="mt-5 max-w-[470px] text-[15.75px] leading-7 text-[#1D1D20]">
          {body}
        </p>
        <div className="mt-7 grid gap-3">
          {points.map((point) => (
            <CheckRow key={point}>{point}</CheckRow>
          ))}
        </div>
      </div>

      <div className={cx(reverse && "lg:order-1")}>{visual}</div>
    </div>
  );
}

function InstructionSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className={shell}>
        <FeatureRow
          eyebrow="Private AI instruction"
          title="Built for teaching, not another answer box."
          body="GAHN is designed around a teaching loop that keeps the learner involved. The instructor explains the idea, asks a question, evaluates the response, and changes the explanation when the learner is still confused."
          points={[
            "Questions are part of the lesson, not an afterthought.",
            "Wrong answers trigger feedback and a different explanation.",
            "Practice happens before the learner moves on.",
          ]}
          visual={<TutorFlowUI />}
        />

        <div className="my-24 border-t border-[#EEEEF0]" />

        <FeatureRow
          eyebrow="School Help"
          title="Use school material as part of the lesson."
          body="School Help can work from the assignment a learner already has. The instructor can guide the student through reading, reasoning, writing, math, science, and other subject work."
          points={[
            "Use worksheets, screenshots, readings, PDFs, and documents.",
            "Keep the explanation connected to the learner's grade and subject.",
            "Ask the learner to explain ideas in their own words.",
          ]}
          visual={<HistoryLessonUI />}
          reverse
        />
      </div>
    </section>
  );
}

function LearningToolsPanel() {
  const tabs = ["Lesson", "Practice", "Notes", "Review"];

  return (
    <div className="sequence-card overflow-hidden rounded-lg bg-white">
      <div className="grid min-h-[520px] lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-[#EEEEF0] bg-[#F7F7F8] p-5 lg:border-b-0 lg:border-r">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#92939E]">
            Learning tools
          </p>
          <div className="mt-5 grid gap-2">
            {tabs.map((tab, index) => (
              <div
                key={tab}
                className={cx(
                  "flex items-center gap-3 rounded-md px-3 py-3 text-[13px] font-medium",
                  index === 0 ? "bg-white text-[#1D1D20] shadow-sm" : "text-[#757682]"
                )}
              >
                <span
                  className={cx(
                    "h-2 w-2 rounded-full",
                    index === 0 ? "bg-[#1F6BFF]" : "bg-[#D9D9DE]"
                  )}
                />
                {tab}
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-[#E5E7EB] pt-5">
            <p className="text-[11px] text-[#92939E]">Current world</p>
            <p className="mt-1 text-[13px] font-medium text-[#1D1D20]">School Help</p>
          </div>
        </aside>

        <div className="p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#92939E]">Magic Canvas</p>
              <h3 className="mt-1 text-[17px] font-medium text-[#1D1D20]">
                A workspace that changes with the lesson
              </h3>
            </div>
            <span className="rounded-full border border-[#D7E3F2] bg-[#EEF4FF] px-3 py-1 text-[10px] font-semibold text-[#1F6BFF]">
              Active
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[#EEEEF0] p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#1F6BFF]" />
                <span className="text-[12px] font-medium text-[#1D1D20]">Explanation</span>
              </div>
              <div className="mt-4 space-y-3">
                <div className="h-3 rounded bg-[#E5E7EB]" />
                <div className="h-3 w-[90%] rounded bg-[#E5E7EB]" />
                <div className="h-3 w-[70%] rounded bg-[#E5E7EB]" />
              </div>
            </div>

            <div className="rounded-lg border border-[#EEEEF0] p-4">
              <div className="flex items-center gap-2">
                <CircleDot className="h-4 w-4 text-[#1F6BFF]" />
                <span className="text-[12px] font-medium text-[#1D1D20]">Question</span>
              </div>
              <div className="mt-4 h-20 rounded-md bg-[#F7F7F8]" />
            </div>

            <div className="rounded-lg border border-[#EEEEF0] p-4">
              <div className="flex items-center gap-2">
                <NotebookTabs className="h-4 w-4 text-[#1F6BFF]" />
                <span className="text-[12px] font-medium text-[#1D1D20]">Notes</span>
              </div>
              <div className="mt-4 grid gap-2">
                <div className="h-9 rounded-md bg-[#F7F7F8]" />
                <div className="h-9 rounded-md bg-[#F7F7F8]" />
              </div>
            </div>

            <div className="rounded-lg border border-[#EEEEF0] p-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-[#1F6BFF]" />
                <span className="text-[12px] font-medium text-[#1D1D20]">Mastery check</span>
              </div>
              <div className="mt-4 flex h-[74px] items-end gap-2">
                {[35, 48, 64, 78, 92].map((height) => (
                  <span
                    key={height}
                    className="flex-1 rounded-t bg-[#AFCBFF]"
                    style={{ height: String(height) + "%" }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-[#EEEEF0] bg-[#F7F7F8] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-[#1D1D20]">
                Learner response
              </span>
              <span className="text-[10px] text-[#92939E]">Saved to history</span>
            </div>
            <div className="mt-3 h-16 rounded-md bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolsSection() {
  return (
    <section className="bg-[#F7F7F8] py-24 sm:py-32">
      <div className={shell}>
        <div className="max-w-[560px]">
          <span className="inline-flex rounded-full border border-[#D9D9DE] bg-white px-3 py-1 text-[12px] font-medium text-[#42424A]">
            Tools built for learning
          </span>
          <h2 className="mt-5 text-[34px] font-medium leading-[48px] tracking-[-0.9px] text-[#1D1D20] sm:text-[36px]">
            One workspace for the parts of learning that usually get scattered.
          </h2>
          <p className="mt-5 text-[15.75px] leading-7 text-[#42424A]">
            The instructor and canvas are connected to notes, practice, review, homework help, and progress so the lesson can continue instead of starting over every time.
          </p>
        </div>

        <div className="mt-12">
          <LearningToolsPanel />
        </div>
      </div>
    </section>
  );
}

function DarkPrinciplesSection() {
  const principles = [
    ["Ask before telling", "The learner should think and respond during the lesson."],
    ["Re teach when needed", "A wrong answer should change the explanation, not just the score."],
    ["Practice before progress", "The learner should use the skill before moving forward."],
  ];

  return (
    <section className="bg-[#1D1D20] py-24 text-white sm:py-32">
      <div className={shell}>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <span className="inline-flex rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium text-white/75">
              Learning principles
            </span>
            <h2 className="mt-5 max-w-[430px] text-[36px] font-medium leading-[48px] tracking-[-0.9px]">
              A stronger learning experience than passive content.
            </h2>
            <p className="mt-5 max-w-[430px] text-[15.75px] leading-7 text-white/65">
              GAHN is being built around interaction, correction, and repeated understanding checks instead of long streams of content.
            </p>
          </div>

          <div className="grid gap-4">
            {principles.map(([title, text], index) => (
              <div
                key={title}
                className="rounded-lg border border-white/10 bg-[#2A2A2F] p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[12px] font-semibold text-[#1D1D20]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[16px] font-medium">{title}</h3>
                    <p className="mt-2 text-[14px] leading-6 text-white/60">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LearningSystemMap() {
  const items = [
    ["Lesson", "Explain and demonstrate"],
    ["Practice", "Learner responds"],
    ["Notes", "Save key ideas"],
    ["Review", "Retrieve old material"],
    ["Progress", "Keep learning history"],
  ];

  return (
    <div className="relative mx-auto mt-14 max-w-[960px]">
      <div className="sequence-rings absolute inset-0" />
      <div className="relative grid gap-5 lg:grid-cols-[1fr_220px_1fr] lg:items-center">
        <div className="grid gap-4">
          {items.slice(0, 2).map(([title, text]) => (
            <div key={title} className="sequence-mini-card rounded-lg bg-white p-4">
              <p className="text-[13px] font-medium text-[#1D1D20]">{title}</p>
              <p className="mt-1 text-[12px] leading-5 text-[#757682]">{text}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto grid h-[180px] w-[180px] place-items-center rounded-full border border-[#C7D7EF] bg-white shadow-[0_12px_30px_rgba(31,107,255,0.10)]">
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-[#0B1739] text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="mt-3 text-[13px] font-semibold text-[#1D1D20]">Learner memory</p>
            <p className="mt-1 text-[11px] text-[#92939E]">One learning record</p>
          </div>
        </div>

        <div className="grid gap-4">
          {items.slice(2).map(([title, text]) => (
            <div key={title} className="sequence-mini-card rounded-lg bg-white p-4">
              <p className="text-[13px] font-medium text-[#1D1D20]">{title}</p>
              <p className="mt-1 text-[12px] leading-5 text-[#757682]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SystemSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="sequence-ui-grid absolute inset-x-0 top-0 h-full opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]" />
      <div className={cx(shell, "relative text-center")}>
        <span className="inline-flex rounded-full border border-[#EEEEF0] bg-white px-3 py-1 text-[12px] font-medium text-[#42424A]">
          Connected learning
        </span>
        <h2 className="mx-auto mt-5 max-w-[650px] text-[34px] font-medium leading-[48px] tracking-[-0.9px] text-[#1D1D20] sm:text-[36px]">
          One learning system instead of disconnected tools.
        </h2>
        <p className="mx-auto mt-5 max-w-[560px] text-[15.75px] leading-7 text-[#42424A]">
          Lessons, practice, notes, review, and progress can share the same learner context so each session starts with what GAHN already knows about your learning.
        </p>

        <LearningSystemMap />
      </div>
    </section>
  );
}

function HomeworkUploadUI() {
  return (
    <div className="sequence-card rounded-lg bg-white p-5 sm:p-6">
      <div className="rounded-lg border border-dashed border-[#C9D5E6] bg-[#FBFCFD] p-6 text-center">
        <div className="mx-auto grid h-10 w-10 place-items-center rounded-lg bg-[#EEF4FF] text-[#1F6BFF]">
          <Upload className="h-5 w-5" />
        </div>
        <p className="mt-4 text-[14px] font-medium text-[#1D1D20]">Upload homework</p>
        <p className="mx-auto mt-2 max-w-[280px] text-[12px] leading-5 text-[#757682]">
          Worksheet, screenshot, reading passage, PDF, or document
        </p>
        <button
          type="button"
          className="mt-5 inline-flex h-9 items-center justify-center rounded-full bg-[#0B1739] px-5 text-[12px] font-medium text-white"
        >
          Choose file
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          ["Subject", "History"],
          ["Grade", "Grade 8"],
          ["Topic", "Primary sources"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-[#EEEEF0] p-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#92939E]">
              {label}
            </p>
            <p className="mt-1 text-[11px] font-medium text-[#1D1D20]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorldsSection() {
  return (
    <section id="learning-worlds" className="scroll-mt-24 bg-[#F7F7F8] py-24 sm:py-32">
      <div className={shell}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-[#D9D9DE] bg-white px-3 py-1 text-[12px] font-medium text-[#42424A]">
              Learning Worlds
            </span>
            <h2 className="mt-5 text-[34px] font-medium leading-[48px] tracking-[-0.9px] text-[#1D1D20] sm:text-[36px]">
              Start with the learning world that matches your goal.
            </h2>
          </div>
          <p className="max-w-[540px] text-[15.75px] leading-7 text-[#42424A] lg:justify-self-end">
            Career Skills and School Help are available during the MVP. The other worlds stay visible so learners can see where the platform is going without pretending unfinished features are ready.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {worlds.filter((world) => world.available).map((world) => {
            const Icon = world.icon;
            return (
              <Link
                key={world.title}
                href="/signup"
                className="group rounded-lg bg-white p-6 shadow-[0_0_0_1px_rgba(29,29,32,0.08)] transition-shadow hover:shadow-[0_10px_30px_rgba(29,29,32,0.10)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#EEF4FF] text-[#1F6BFF]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#92939E] transition-transform group-hover:translate-x-1" />
                </div>
                <h3 className="mt-5 text-[20px] font-medium text-[#1D1D20]">{world.title}</h3>
                <p className="mt-2 max-w-[420px] text-[14px] leading-6 text-[#757682]">
                  {world.description}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {worlds.filter((world) => !world.available).map((world) => {
            const Icon = world.icon;
            return (
              <div
                key={world.title}
                className="rounded-lg bg-[#F1F1F3] p-5 shadow-[0_0_0_1px_rgba(29,29,32,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-[#92939E]" />
                  <span className="rounded-full border border-[#D9D9DE] bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#757682]">
                    Not available
                  </span>
                </div>
                <h3 className="mt-4 text-[14px] font-medium text-[#42424A]">{world.title}</h3>
                <p className="mt-1 text-[12px] leading-5 text-[#92939E]">{world.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="inline-flex rounded-full border border-[#D9D9DE] bg-white px-3 py-1 text-[12px] font-medium text-[#42424A]">
              Homework help
            </span>
            <h3 className="mt-5 text-[30px] font-medium leading-[42px] tracking-[-0.8px] text-[#1D1D20]">
              Bring the assignment you already have.
            </h3>
            <p className="mt-4 max-w-[460px] text-[15px] leading-7 text-[#42424A]">
              Upload the material, tell GAHN the subject and grade, and use the instructor to work through the part you do not understand.
            </p>
          </div>
          <HomeworkUploadUI />
        </div>
      </div>
    </section>
  );
}

function StepsSection() {
  const steps = [
    ["Create your account", "Start free and set up your learner profile."],
    ["Choose a learning world", "Pick Career Skills or School Help."],
    ["Start a lesson", "Learn with explanations, questions, and practice."],
    ["Save what matters", "Keep notes, study guides, and progress."],
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white py-24 sm:py-32">
      <div className={shell}>
        <span className="inline-flex rounded-full border border-[#EEEEF0] bg-[#F7F7F8] px-3 py-1 text-[12px] font-medium text-[#42424A]">
          Get started today
        </span>
        <h2 className="mt-5 max-w-[520px] text-[34px] font-medium leading-[48px] tracking-[-0.9px] text-[#1D1D20] sm:text-[36px]">
          Start learning in a few simple steps.
        </h2>

        <div className="relative mt-14 grid gap-7 md:grid-cols-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-5 hidden border-t border-dashed border-[#D9D9DE] md:block" />
          {steps.map(([title, text], index) => (
            <div key={title} className="relative">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[#C9D5E6] bg-white text-[11px] font-semibold text-[#1F6BFF]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-[15px] font-medium text-[#1D1D20]">{title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-[#757682]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityGrid() {
  const items = [
    {
      title: "Adaptive re teaching",
      text: "Change the explanation when a learner is still confused.",
      icon: Sparkles,
    },
    {
      title: "Active recall",
      text: "Bring back material from earlier lessons for retrieval practice.",
      icon: Brain,
    },
    {
      title: "Saved notes",
      text: "Keep useful lesson notes attached to the learner account.",
      icon: NotebookTabs,
    },
    {
      title: "Mastery checks",
      text: "Use practice and retries before marking a concept understood.",
      icon: Target,
    },
    {
      title: "Homework upload",
      text: "Use school files and screenshots as part of guided help.",
      icon: Upload,
    },
    {
      title: "Study guides",
      text: "Turn lesson material into organized review resources.",
      icon: FileText,
    },
  ];

  return (
    <section className="bg-[#F7F7F8] py-24 sm:py-32">
      <div className={shell}>
        <span className="inline-flex rounded-full border border-[#D9D9DE] bg-white px-3 py-1 text-[12px] font-medium text-[#42424A]">
          Designed for modern learning
        </span>
        <h2 className="mt-5 max-w-[620px] text-[34px] font-medium leading-[48px] tracking-[-0.9px] text-[#1D1D20] sm:text-[36px]">
          High quality learning tools without turning the MVP into a cluttered dashboard.
        </h2>
        <p className="mt-5 max-w-[560px] text-[15.75px] leading-7 text-[#42424A]">
          Each tool should support the lesson itself. The point is not to add more screens. The point is to help learners understand, remember, and continue.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-lg bg-white p-5 shadow-[0_0_0_1px_rgba(29,29,32,0.08)]"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#EEF4FF] text-[#1F6BFF]">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="mt-5 text-[15px] font-medium text-[#1D1D20]">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-[#757682]">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#EEEEF0]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-5 py-6 text-left"
        aria-expanded={open}
      >
        <span className="text-[16px] font-medium text-[#1D1D20]">{question}</span>
        <ChevronDown className={cx("h-4 w-4 text-[#757682] transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <p className="-mt-2 max-w-[650px] pb-6 text-[14px] leading-7 text-[#757682]">
          {answer}
        </p>
      )}
    </div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-24 sm:py-32">
      <div className={cx(shell, "grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20")}>
        <div>
          <span className="inline-flex rounded-full border border-[#EEEEF0] bg-[#F7F7F8] px-3 py-1 text-[12px] font-medium text-[#42424A]">
            FAQ
          </span>
          <h2 className="mt-5 text-[34px] font-medium leading-[48px] tracking-[-0.9px] text-[#1D1D20] sm:text-[36px]">
            Questions, answered.
          </h2>
          <p className="mt-4 text-[14px] leading-6 text-[#757682]">
            Still have questions?{" "}
            <Link href="/contact" className="font-medium text-[#1F6BFF]">
              Contact us
            </Link>
            .
          </p>
        </div>

        <div className="border-t border-[#EEEEF0]">
          {faqs.map((item, index) => (
            <FaqItem
              key={item.q}
              question={item.q}
              answer={item.a}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-[#1D1D20] py-24 text-white sm:py-28">
      <div className="sequence-rings absolute inset-0 opacity-80" />
      <div className={cx(shell, "relative text-center")}>
        <h2 className="mx-auto max-w-[650px] text-[36px] font-medium leading-[48px] tracking-[-0.9px] sm:text-[38px]">
          Start learning with GAHN AI.
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-[15.75px] leading-7 text-white/70">
          Career Skills and School Help are available during early access. Start free, learn how the system works, and upgrade when you want the full instructor experience.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#1F6BFF] px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#1858E0]"
          >
            Start free
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-10 items-center justify-center rounded-full border border-white/20 px-6 text-[14px] font-medium text-white"
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white py-12">
      <div className={shell}>
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
          <Logo />
          <nav className="flex flex-wrap gap-x-7 gap-y-3 text-[13px] text-[#757682]">
            {footerLinks.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-[#1D1D20]">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 border-t border-[#EEEEF0] pt-6 text-[12px] text-[#92939E]">
          (c) 2026 GAHN AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main id="top" className="sequence-marketing min-h-screen bg-white text-[#1D1D20]">
      <SiteHeader />
      <Hero />
      <TrustStrip />
      <InstructionSection />
      <ToolsSection />
      <DarkPrinciplesSection />
      <SystemSection />
      <WorldsSection />
      <StepsSection />
      <CapabilityGrid />
      <EarlyAccessVoices />
      <FaqSection />
      <ClosingCta />
      <Footer />
    </main>
  );
}
