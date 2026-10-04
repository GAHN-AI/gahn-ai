"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
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
  { href: "#faq", label: "FAQ" },
];

const worlds = [
  {
    slug: "career-skills",
    title: "Career Skills",
    description:
      "Business, technology, finance, communication, and job focused learning paths.",
    icon: BriefcaseBusiness,
  },
  {
    slug: "school-help",
    title: "School Help",
    description:
      "Math, science, English, reading, study skills, and guided homework help.",
    icon: GraduationCap,
  },
  {
    slug: "brain-development",
    title: "Brain Development",
    description:
      "Memory, focus, reasoning, discipline, habits, and learning performance.",
    icon: Brain,
  },
  {
    slug: "general-knowledge",
    title: "General Knowledge",
    description:
      "History, technology, science, economics, geography, culture, and life skills.",
    icon: Globe2,
  },
  {
    slug: "book-intelligence",
    title: "Book Intelligence",
    description:
      "Book summaries, key lessons, chapter breakdowns, vocabulary, quizzes, and analysis.",
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
    a: "GAHN AI has five learning worlds: Career Skills, School Help, Brain Development, General Knowledge, and Book Intelligence. Each world has its own learning paths while using the same private AI teaching system.",
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
        className="h-8 w-8 rounded-full object-cover"
      />
      <span>
        <span className="block text-[17px] font-semibold tracking-[-0.4px] text-[#0B1739]">
          GAHN AI
        </span>
        <span className="hidden text-[8px] font-semibold uppercase tracking-[0.19em] text-black sm:block">
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
      className="flex min-h-[38px] items-center justify-center bg-[#05070B] px-5 text-center text-[13px] font-medium leading-5 text-white"
    >
      Five learning worlds. One private AI learning system.
      <ArrowRight className="ml-2 h-3.5 w-3.5" />
    </a>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 border-b border-[#E8EDF5] bg-white/95 backdrop-blur-xl">
        <div className={cx(shell, "flex h-[64px] items-center justify-between gap-5")}>
          <a href="#top" aria-label="GAHN AI home">
            <Logo />
          </a>

          <nav className="hidden items-center gap-8 text-[14px] font-medium leading-6 text-black lg:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="transition-opacity hover:opacity-60">
                {item.label}
              </a>
            ))}
            <Link href="/pricing" className="transition-opacity hover:opacity-60">
              Pricing
            </Link>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center px-2 text-[14px] font-medium text-black"
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
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#D8E6FA] text-black lg:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-[#D8E6FA] bg-white lg:hidden">
            <div className={cx(shell, "py-5")}>
              <div className="grid gap-1">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-black hover:bg-[#F3F8FF]"
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  href="/pricing"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-black hover:bg-[#F3F8FF]"
                >
                  Pricing
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#EEEEF0] pt-4">
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[#D9D9DE] text-sm font-medium text-black"
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
        <div className="flex items-center gap-5 text-[12px] font-medium text-black">
          <span className="border-b-2 border-[#1F6BFF] pb-3 text-black">
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
        <div className="rounded-lg border border-[#EEEEF0] bg-[#F3F8FF] p-4">
          <div className="h-3 w-24 rounded-full bg-[#D9D9DE]" />
          <div className="mt-3 h-3 w-[72%] rounded-full bg-[#E5E7EB]" />
          <div className="mt-2 h-3 w-[54%] rounded-full bg-[#E5E7EB]" />
        </div>

        <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-[#EEEEF0] p-4">
            <div className="h-3 w-20 rounded-full bg-[#D9D9DE]" />
            <div className="mt-4 space-y-3">
              <div className="h-11 rounded-md bg-[#F3F8FF]" />
              <div className="h-11 rounded-md bg-[#F3F8FF]" />
              <div className="h-11 rounded-md bg-[#F3F8FF]" />
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
          <div className="rounded-lg border border-[#EEEEF0] bg-[#F3F8FF] p-3">
            <div className="h-2.5 w-12 rounded-full bg-[#D9D9DE]" />
            <div className="mt-2 h-5 rounded bg-white" />
          </div>
          <div className="rounded-lg border border-[#EEEEF0] bg-[#F3F8FF] p-3">
            <div className="h-2.5 w-12 rounded-full bg-[#D9D9DE]" />
            <div className="mt-2 h-5 rounded bg-white" />
          </div>
          <div className="rounded-lg border border-[#EEEEF0] bg-[#F3F8FF] p-3">
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
    <motion.div
      initial={{ opacity: 0, y: 34, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-16 w-full max-w-[768px]"
    >
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

      <div className="absolute -left-16 top-[110px] hidden items-center gap-2 rounded-lg border border-dashed border-[#B9BAC0] bg-white px-3 py-1.5 text-[12px] font-medium text-black xl:flex">
        Private AI lesson
      </div>

      <div className="absolute -right-4 bottom-[-14px] hidden rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-black shadow-[0_0_0_1px_rgba(29,29,32,0.08),0_4px_6px_-1px_rgba(0,0,0,0.1)] md:block">
        Learning workspace
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-16 sm:pt-20">
      <div aria-hidden="true" className="sequence-hero-grid absolute inset-x-0 top-24 h-[620px]" />

      <div className={cx(shell, "relative")}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[768px] text-center"
        >
          <Eyebrow>Private AI instruction built around active learning</Eyebrow>

          <h1 className="mx-auto mt-3 text-[44px] font-semibold leading-[1.06] tracking-[-1.3px] text-black sm:text-[56px] sm:leading-[1.08] lg:text-[63px] lg:leading-[72px] lg:tracking-[-1.6px]">
            Learning built for what you want to become.
          </h1>

          <p className="mx-auto mt-5 max-w-[560px] text-[15.75px] font-normal leading-7 tracking-[-0.4px] text-black">
            Choose from five learning worlds and learn with a private AI instructor designed to teach, check understanding, and adapt when you get stuck.
          </p>

          <div className="mx-auto mt-7 flex min-h-[56px] w-full max-w-[376px] items-center rounded-full border border-[#E5E7EB] bg-white p-[10px] pl-5 shadow-sm">
            <span className="min-w-0 flex-1 truncate text-left text-[13px] text-black">
              Explore all five learning worlds
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
        </motion.div>

        <HeroProductPreview />
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    "Career Skills",
    "School Help",
    "Brain Development",
    "General Knowledge",
    "Book Intelligence",
  ];

  return (
    <section className="bg-white pb-24">
      <div className={shell}>
        <p className="text-center text-[14px] font-medium leading-6 text-black">
          One learning system across the tools learners use most
        </p>
        <div className="mt-9 grid grid-cols-2 gap-y-7 border-y border-[#EEEEF0] py-7 sm:grid-cols-5">
          {items.map((item, index) => (
            <div
              key={item}
              className={cx(
                "text-center text-[13px] font-medium text-black",
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
    <div className="flex items-start gap-3 text-[14px] leading-6 text-black">
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
        <div className="border-b border-[#EEEEF0] pb-4">
          <p className="text-[11px] text-black">Learning session</p>
          <p className="mt-1 text-[15px] font-medium text-black">
            Teaching loop
          </p>
        </div>

        <div className="mt-4 grid gap-2">
          {steps.map(([title, text], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="flex items-start gap-3 rounded-md border border-[#D8E6FA] px-4 py-3.5"
            >
              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#1F6BFF]" />
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-black">{title}</p>
                <p className="mt-0.5 text-[11px] leading-4 text-black">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HistoryLessonUI() {
  return (
    <div className="sequence-card mx-auto w-full max-w-[475px] overflow-hidden rounded-lg bg-white">
      <div className="flex items-center justify-between border-b border-[#EEEEF0] px-5 py-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-black">
            Grade 8 History
          </p>
          <p className="mt-1 text-[15px] font-medium text-black">
            Primary source response
          </p>
        </div>
        <span className="rounded-full bg-[#EEF4FF] px-3 py-1 text-[10px] font-semibold text-[#1F6BFF]">
          School Help
        </span>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-lg bg-[#F3F8FF] p-4">
          <p className="text-[11px] font-medium text-black">Source excerpt</p>
          <div className="mt-4 space-y-3">
            <div className="h-3 w-full rounded bg-[#D9D9DE]" />
            <div className="h-3 w-[92%] rounded bg-[#E5E7EB]" />
            <div className="h-3 w-[86%] rounded bg-[#E5E7EB]" />
            <div className="h-3 w-[68%] rounded bg-[#E5E7EB]" />
          </div>
        </div>

        <div className="rounded-lg border border-[#EEEEF0] p-4">
          <p className="text-[12px] font-medium text-black">
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
        <span className="inline-flex rounded-full border border-[#EEEEF0] bg-[#F3F8FF] px-3 py-1 text-[12px] font-medium leading-5 text-black">
          {eyebrow}
        </span>
        <h2 className="mt-5 max-w-[520px] text-[34px] font-medium leading-[48px] tracking-[-0.9px] text-black sm:text-[36px]">
          {title}
        </h2>
        <p className="mt-5 max-w-[470px] text-[15.75px] leading-7 text-black">
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
    <section id="how-gahn-teaches" className="scroll-mt-24 bg-white py-24 sm:py-32">
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
        <aside className="border-b border-[#EEEEF0] bg-[#F3F8FF] p-5 lg:border-b-0 lg:border-r">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-black">
            Learning tools
          </p>
          <div className="mt-5 grid gap-2">
            {tabs.map((tab, index) => (
              <div
                key={tab}
                className={cx(
                  "flex items-center gap-3 rounded-md px-3 py-3 text-[13px] font-medium",
                  index === 0 ? "bg-white text-black shadow-sm" : "text-black"
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
            <p className="text-[11px] text-black">Current world</p>
            <p className="mt-1 text-[13px] font-medium text-black">School Help</p>
          </div>
        </aside>

        <div className="p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-black">Magic Canvas</p>
              <h3 className="mt-1 text-[17px] font-medium text-black">
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
                <span className="text-[12px] font-medium text-black">Explanation</span>
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
                <span className="text-[12px] font-medium text-black">Question</span>
              </div>
              <div className="mt-4 h-20 rounded-md bg-[#F3F8FF]" />
            </div>

            <div className="rounded-lg border border-[#EEEEF0] p-4">
              <div className="flex items-center gap-2">
                <NotebookTabs className="h-4 w-4 text-[#1F6BFF]" />
                <span className="text-[12px] font-medium text-black">Notes</span>
              </div>
              <div className="mt-4 grid gap-2">
                <div className="h-9 rounded-md bg-[#F3F8FF]" />
                <div className="h-9 rounded-md bg-[#F3F8FF]" />
              </div>
            </div>

            <div className="rounded-lg border border-[#EEEEF0] p-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-[#1F6BFF]" />
                <span className="text-[12px] font-medium text-black">Mastery check</span>
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

          <div className="mt-4 rounded-lg border border-[#EEEEF0] bg-[#F3F8FF] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-black">
                Learner response
              </span>
              <span className="text-[10px] text-black">Saved to history</span>
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
    <section id="learning-tools" className="scroll-mt-24 bg-[#F3F8FF] py-24 sm:py-32">
      <div className={shell}>
        <div className="max-w-[560px]">
          <span className="inline-flex rounded-full border border-[#D9D9DE] bg-white px-3 py-1 text-[12px] font-medium text-black">
            Tools built for learning
          </span>
          <h2 className="mt-5 text-[34px] font-medium leading-[48px] tracking-[-0.9px] text-black sm:text-[36px]">
            One workspace for the parts of learning that usually get scattered.
          </h2>
          <p className="mt-5 text-[15.75px] leading-7 text-black">
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
    <section className="bg-[#0B4FD6] py-24 text-white sm:py-32">
      <div className={shell}>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <span className="inline-flex rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium text-white/75">
              Learning principles
            </span>
            <h2 className="mt-5 max-w-[430px] text-[36px] font-medium leading-[48px] tracking-[-0.9px]">
              A stronger learning experience than passive content.
            </h2>
            <p className="mt-5 max-w-[430px] text-[15.75px] leading-7 text-white">
              GAHN is being built around interaction, correction, and repeated understanding checks instead of long streams of content.
            </p>
          </div>

          <div className="grid gap-4">
            {principles.map(([title, text]) => (
              <div
                key={title}
                className="rounded-lg border border-white/10 bg-[#0A3FAE] p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-white" />
                  <div>
                    <h3 className="text-[16px] font-medium">{title}</h3>
                    <p className="mt-2 text-[14px] leading-6 text-white">{text}</p>
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
  const flow = [
    {
      title: "The AI instructor teaches the concept",
      text: "GAHN explains the topic using clear language, examples, diagrams, equations, code, or the school material you uploaded.",
    },
    {
      title: "You answer a question",
      text: "You respond instead of only reading or watching, so the lesson can check what you actually understand.",
    },
    {
      title: "GAHN checks your understanding",
      text: "Your response is evaluated to find the exact idea, step, or skill that is still confusing.",
    },
    {
      title: "The instructor teaches the weak point again",
      text: "GAHN changes the explanation, gives another example, and focuses on the part you missed.",
    },
    {
      title: "You practice the concept again",
      text: "You get another question or activity and keep practicing until you can use the idea correctly.",
    },
    {
      title: "Your lesson record is saved",
      text: "GAHN keeps your notes, mistakes, mastered concepts, and topics to review so the next session can continue from where you stopped.",
    },
  ];

  return (
    <div className="mx-auto mt-14 max-w-[980px]">
      <div className="grid gap-4 md:grid-cols-2">
        {flow.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.42, delay: index * 0.06 }}
            className="rounded-lg border border-[#D8E6FA] bg-white p-5 text-left shadow-[0_10px_28px_rgba(31,107,255,0.06)]"
          >
            <div className="flex items-start gap-4">
              <span className="mt-1 h-10 w-1.5 shrink-0 rounded-full bg-[#1677FF]" />
              <div>
                <h3 className="text-[16px] font-semibold text-black">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-black">{item.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SystemSection() {
  return (
    <section id="learning-system" className="scroll-mt-24 bg-[#F3F8FF] py-24 sm:py-32">
      <div className={shell}>
        <div className="mx-auto max-w-[760px] text-center">
          <span className="inline-flex rounded-full border border-[#CFE0F8] bg-white px-3 py-1 text-[12px] font-medium text-black">
            What happens in a GAHN lesson
          </span>
          <h2 className="mx-auto mt-5 max-w-[700px] text-[34px] font-medium leading-[48px] tracking-[-0.9px] text-black sm:text-[36px]">
            GAHN teaches, checks your answer, fixes misunderstandings, and keeps the lesson moving.
          </h2>
          <p className="mx-auto mt-5 max-w-[650px] text-[15.75px] leading-7 text-black">
            The MVP is built around one private teaching loop. You learn a concept, respond, get checked, receive a different explanation when needed, practice again, and carry your learning history into the next session.
          </p>
        </div>

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
        <p className="mt-4 text-[14px] font-medium text-black">Upload homework</p>
        <p className="mx-auto mt-2 max-w-[280px] text-[12px] leading-5 text-black">
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
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-black">
              {label}
            </p>
            <p className="mt-1 text-[11px] font-medium text-black">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorldsSection() {
  return (
    <section id="learning-worlds" className="scroll-mt-24 bg-[#F3F8FF] py-24 sm:py-32">
      <div className={shell}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-[#CFE0F8] bg-white px-3 py-1 text-[12px] font-medium text-black">
              Learning Worlds
            </span>
            <h2 className="mt-5 text-[34px] font-medium leading-[48px] tracking-[-0.9px] text-black sm:text-[36px]">
              Start with the learning world that matches your goal.
            </h2>
          </div>
          <p className="max-w-[540px] text-[15.75px] leading-7 text-black lg:justify-self-end">
            Every learning world is available. Choose the area you want to learn, then open a path and work through it with the same private AI teaching system.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {worlds.map((world, index) => {
            const Icon = world.icon;
            return (
              <motion.div
                key={world.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <Link
                  href={`/learn/${world.slug}`}
                  className="group block h-full rounded-lg bg-white p-6 shadow-[0_0_0_1px_rgba(31,107,255,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(31,107,255,0.14)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#EAF3FF] text-[#1677FF]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#1677FF] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <h3 className="mt-5 text-[20px] font-medium text-black">{world.title}</h3>
                  <p className="mt-2 max-w-[420px] text-[14px] leading-6 text-black">
                    {world.description}
                  </p>
                  <p className="mt-5 text-[12px] font-semibold text-[#1677FF]">
                    Open learning world
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="inline-flex rounded-full border border-[#CFE0F8] bg-white px-3 py-1 text-[12px] font-medium text-black">
              Homework help
            </span>
            <h3 className="mt-5 text-[30px] font-medium leading-[42px] tracking-[-0.8px] text-black">
              Bring the assignment you already have.
            </h3>
            <p className="mt-4 max-w-[460px] text-[15px] leading-7 text-black">
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
    ["Choose a learning world", "Pick any of the five learning worlds."],
    ["Start a lesson", "Learn with explanations, questions, and practice."],
    ["Save what matters", "Keep notes, study guides, and progress."],
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white py-24 sm:py-32">
      <div className={shell}>
        <span className="inline-flex rounded-full border border-[#CFE0F8] bg-[#F3F8FF] px-3 py-1 text-[12px] font-medium text-black">
          Get started
        </span>
        <h2 className="mt-5 max-w-[520px] text-[34px] font-medium leading-[48px] tracking-[-0.9px] text-black sm:text-[36px]">
          Start learning in a few simple steps.
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-4">
          {steps.map(([title, text], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative border-t border-[#D8E6FA] pt-6"
            >
              <span className="block h-3 w-3 rounded-full bg-[#1677FF] shadow-[0_0_0_7px_#EAF3FF]" />
              <h3 className="mt-6 text-[15px] font-medium text-black">{title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-black">{text}</p>
            </motion.div>
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
    <section className="bg-[#F3F8FF] py-24 sm:py-32">
      <div className={shell}>
        <span className="inline-flex rounded-full border border-[#D9D9DE] bg-white px-3 py-1 text-[12px] font-medium text-black">
          Designed for modern learning
        </span>
        <h2 className="mt-5 max-w-[620px] text-[34px] font-medium leading-[48px] tracking-[-0.9px] text-black sm:text-[36px]">
          High quality learning tools that stay focused on the lesson.
        </h2>
        <p className="mt-5 max-w-[560px] text-[15.75px] leading-7 text-black">
          Each tool supports the lesson itself so learners can understand, remember, practice, and continue without jumping between disconnected apps.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45 }}
                className="rounded-lg bg-white p-5 shadow-[0_0_0_1px_rgba(31,107,255,0.14)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#EEF4FF] text-[#1F6BFF]">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="mt-5 text-[15px] font-medium text-black">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-black">{item.text}</p>
              </motion.div>
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
        <span className="text-[16px] font-medium text-black">{question}</span>
        <ChevronDown className={cx("h-4 w-4 text-black transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <p className="-mt-2 max-w-[650px] pb-6 text-[14px] leading-7 text-black">
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
          <span className="inline-flex rounded-full border border-[#EEEEF0] bg-[#F3F8FF] px-3 py-1 text-[12px] font-medium text-black">
            FAQ
          </span>
          <h2 className="mt-5 text-[34px] font-medium leading-[48px] tracking-[-0.9px] text-black sm:text-[36px]">
            Questions, answered.
          </h2>
          <p className="mt-4 text-[14px] leading-6 text-black">
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
    <section className="bg-[#0B4FD6] py-24 text-white sm:py-28">
      <div className={cx(shell, "text-center")}>
        <h2 className="mx-auto max-w-[650px] text-[36px] font-medium leading-[48px] tracking-[-0.9px] sm:text-[38px]">
          Start learning with GAHN AI.
        </h2>
        <p className="mx-auto mt-5 max-w-[560px] text-[15.75px] leading-7 text-white">
          Choose a learning world, start a lesson, and use a private AI instructor that teaches, checks your understanding, re teaches when needed, and gives you practice.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#1677FF] px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#0E63E8]"
          >
            Start free
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-10 items-center justify-center rounded-full border border-white/30 px-6 text-[14px] font-medium text-white transition-colors hover:border-white/60"
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
          <nav className="flex flex-wrap gap-x-7 gap-y-3 text-[13px] text-black">
            {footerLinks.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-black">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 border-t border-[#EEEEF0] pt-6 text-[12px] text-black">
          (c) 2026 GAHN AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main id="top" className="sequence-marketing min-h-screen bg-white text-black">
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
