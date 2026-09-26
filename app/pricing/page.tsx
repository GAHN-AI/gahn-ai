"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const earlyAccessFeatures = [
  "Access all 5 learning worlds",
  "AI-guided lessons and structured learning paths",
  "Live AI instructor experiences as they become available",
  "Real-time voice learning with supported AI instructors",
  "Interactive visual explanations, examples, quizzes, and guided practice",
  "Adaptive reteaching when you make mistakes",
  "Homework photo, screenshot, PDF, and document support",
  "Saved learner memory for strengths, weaknesses, and preferences",
  "Personalized lesson difficulty and pacing",
  "Detailed lesson summaries",
  "Searchable personal notes",
  "Generated study guides and review questions",
  "Multilingual instruction across supported languages",
  "Mastery checks and guided practice",
  "Learning history and progress tracking",
  "Access to new early-access learning features as they are released",
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#F8FBFF] font-sans text-[#0B1739]">
      <header className="sticky top-0 z-50 border-b border-[#D7E3F2] bg-white/95 backdrop-blur-xl">
        <nav className="mx-auto flex min-h-[78px] max-w-7xl items-center justify-between gap-5 px-5 py-3 sm:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-11 w-11 flex-none rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-xl font-extrabold tracking-[-0.025em]">
                GAHN AI
              </p>

              <p className="hidden text-[8px] font-bold uppercase tracking-[0.17em] text-[#53657D] sm:block">
                Global AI Human Helper Network
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-7 text-sm font-semibold text-[#53657D] lg:flex">
            <Link href="/" className="hover:text-[#1677FF]">
              Home
            </Link>

            <Link href="/#programs" className="hover:text-[#1677FF]">
              Programs
            </Link>

            <Link href="/#platform" className="hover:text-[#1677FF]">
              Platform
            </Link>

            <Link href="/#instructors" className="hover:text-[#1677FF]">
              Instructors
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-[#D7E3F2] bg-white px-4 py-2.5 text-sm font-semibold text-[#0B1739] hover:border-[#1677FF]/40 hover:bg-[#F8FBFF] sm:px-5"
            >
              Log In
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-[#1677FF] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0F65E8] sm:px-5"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden border-b border-[#D7E3F2] bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#FFFFFF_0%,#FFFFFF_46%,#F5F8FC_46%,#F5F8FC_72%,#EAF3FF_100%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-56 h-[680px] w-[680px] rounded-full bg-[#EAF3FF]/85"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-[30%] h-64 w-[620px] rotate-[-8deg] rounded-[999px] bg-white/90"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 sm:py-24 lg:py-28">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#CFE0F5] bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1677FF] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Early Access
          </div>

          <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-[-0.05em] text-[#0B1739] sm:text-6xl lg:text-7xl">
            Start learning with
            <span className="block text-[#1677FF]">
              full access at no cost.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#53657D] sm:text-lg">
            During early access, GAHN AI is open for learners to explore the
            complete learning experience, test new tools, and help shape what
            comes next.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              "No credit card required",
              "Full early-access learning experience",
              "New features added as they are ready",
            ].map((item) => (
              <p
                key={item}
                className="flex items-center gap-2 text-sm font-semibold text-[#53657D]"
              >
                <CheckCircle2
                  className="h-4 w-4 text-[#1677FF]"
                  strokeWidth={1.8}
                />
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
              Early Access
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
              One plan. Everything available to early learners.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#53657D]">
              Explore GAHN AI without choosing between subscriptions while the
              platform is being tested, improved, and expanded with real learner
              feedback.
            </p>
          </div>

          <div className="mx-auto max-w-3xl overflow-hidden rounded-[1.6rem] border border-[#0B356F] bg-white shadow-[0_22px_60px_rgba(11,53,111,0.11)]">
            <div className="bg-[#0B356F] px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-white">
              Full Early Access
            </div>

            <div className="p-7 sm:p-9 lg:p-10">
              <div className="text-center">
                <h3 className="text-3xl font-extrabold tracking-[-0.035em] text-[#0B1739]">
                  GAHN AI Early Access
                </h3>

                <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#53657D]">
                  Built for students, self-learners, and anyone who wants a
                  structured way to learn with AI.
                </p>

                <div className="mt-7 flex items-end justify-center gap-2">
                  <span className="text-6xl font-extrabold tracking-[-0.05em] text-[#0B1739]">
                    $0
                  </span>
                </div>

                <p className="mt-3 text-sm font-semibold text-[#1677FF]">
                  Free during early access
                </p>

                <Link
                  href="/signup"
                  className="mx-auto mt-7 inline-flex w-full max-w-md items-center justify-center gap-2 rounded-xl bg-[#1677FF] px-6 py-4 text-sm font-bold text-white shadow-[0_10px_28px_rgba(22,119,255,0.22)] hover:bg-[#0F65E8]"
                >
                  Start Learning Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="my-9 h-px bg-[#E1E7EF]" />

              <p className="text-sm font-bold text-[#0B1739]">
                Included during early access:
              </p>

              <ul className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
                {earlyAccessFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 h-[18px] w-[18px] flex-none text-[#1267D6]"
                      strokeWidth={2.2}
                    />

                    <span className="text-sm leading-6 text-[#24364D]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 rounded-xl border border-[#CFE0F5] bg-[#F8FBFF] px-5 py-4">
                <p className="text-sm leading-6 text-[#53657D]">
                  Early access is the testing and improvement stage of GAHN AI.
                  Features, limits, and plan structure may evolve as the platform
                  grows. Learners will be notified before any future pricing
                  changes take effect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-[#CFE0F5] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_58%,#EAF3FF_100%)] px-6 py-9 text-center shadow-[0_18px_50px_rgba(11,23,57,0.06)] sm:px-10 sm:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
            Start Today
          </p>

          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
            Learn first. Help shape what GAHN AI becomes.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#53657D]">
            Join early, explore the platform, and use the learning tools available
            while GAHN AI continues improving around real learners.
          </p>

          <Link
            href="/signup"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1677FF] px-8 py-4 text-sm font-bold text-white shadow-[0_10px_28px_rgba(22,119,255,0.22)] hover:bg-[#0F65E8]"
          >
            Create Free Account
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
