"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

type Plan = {
  name: string;
  price: string;
  period: string;
  audience: string;
  description: string;
  buttonLabel: string;
  available: boolean;
  featured?: boolean;
  badge?: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Explore",
    price: "$0",
    period: "/ month",
    audience: "Try GAHN before paying",
    description:
      "Explore the learning system, browse every world, and test the core guided-learning experience.",
    buttonLabel: "Start free",
    available: true,
    features: [
      "Browse all 5 learning worlds and their structured libraries",
      "Limited AI-guided lesson access as live instructors roll out",
      "Basic explanations, practice questions, corrections, and retries",
      "School homework text help and learning-path previews",
      "Basic notes, lesson history, and account-based learning data",
      "Access to new free MVP features as they become available",
    ],
  },
  {
    name: "Learner Plus",
    price: "$29",
    period: "/ month",
    audience: "For consistent personal learning",
    description:
      "A complete everyday learning plan with live instruction, adaptive support, richer memory, and interactive learning tools.",
    buttonLabel: "Coming soon",
    available: false,
    featured: true,
    badge: "Best value",
    features: [
      "Everything in Explore",
      "Higher monthly allowance for live conversational AI instructor sessions",
      "Voice-based learning with realistic AI instructors",
      "Interactive learning canvas with visuals, guided examples, quizzes, and practice",
      "Homework photo, screenshot, PDF, and document analysis when file teaching launches",
      "Adaptive reteaching that changes explanations after mistakes",
      "Saved learner memory for strengths, weak areas, preferences, and previous lessons",
      "Detailed lesson recaps, searchable notes, study guides, and generated review questions",
      "Multilingual instruction across supported teaching languages",
      "Expanded progress, mastery checks, and learning history",
      "Priority access to newly released learner tools",
    ],
  },
  {
    name: "Career Pro",
    price: "$149",
    period: "/ month",
    audience: "For serious career and professional skill building",
    description:
      "The highest individual plan for deep career programs, advanced AI tools, real projects, and professional preparation.",
    buttonLabel: "Coming soon",
    available: false,
    badge: "Most advanced",
    features: [
      "Everything in Learner Plus",
      "Highest individual live-instructor allowance and longer career learning sessions",
      "Complete career curricula with role-specific languages, software, tools, standards, and workflows",
      "Advanced browser-guided learning for approved websites and professional resources",
      "Full coding workspace for software careers with editor, testing, debugging, and project guidance",
      "Advanced file analysis for projects, documents, assignments, resumes, and professional work",
      "Real-world projects, simulations, case studies, and portfolio-building guidance",
      "Career mastery assessments with detailed skill-gap feedback",
      "Resume, LinkedIn, interviewing, presentation, and professional communication coaching",
      "Role-specific tool training such as GitHub, spreadsheets, analytics, design, cloud, or industry software",
      "Deeper long-term learning memory and career progress analytics",
      "Certificates and portfolio evidence when verified completion features launch",
      "Priority access to advanced instructor and career tools",
    ],
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`gahn-card-hover relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border bg-white shadow-[0_14px_40px_rgba(11,23,57,0.055)] ${
        plan.featured
          ? "border-[#0B356F] shadow-[0_20px_55px_rgba(11,53,111,0.10)]"
          : "border-[#D7E3F2]"
      }`}
    >
      {plan.featured && (
        <div className="bg-[#0B356F] px-6 py-2.5 text-center text-xs font-bold uppercase tracking-[0.14em] text-white">
          {plan.badge}
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div>
          {!plan.featured && plan.badge && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#1677FF]">
              {plan.badge}
            </p>
          )}

          <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#0B1739]">
            {plan.name}
          </h2>

          <p className="mt-2 text-sm font-semibold text-[#53657D]">
            {plan.audience}
          </p>
        </div>

        <div className="mt-7 flex items-end gap-1.5">
          <span className="text-4xl font-bold tracking-[-0.045em] text-[#0B1739] sm:text-5xl">
            {plan.price}
          </span>
          <span className="pb-1.5 text-sm font-medium text-[#53657D]">
            {plan.period}
          </span>
        </div>

        <p className="mt-5 min-h-[76px] text-[15px] leading-7 text-[#53657D]">
          {plan.description}
        </p>

        {plan.available ? (
          <Link
            href="/signup"
            className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-[#1267D6] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#0B56BA]"
          >
            {plan.buttonLabel}
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="mt-5 w-full cursor-not-allowed rounded-lg border border-[#C9D4E2] bg-[#F7F9FB] px-5 py-3.5 text-sm font-bold text-[#68798E]"
          >
            {plan.buttonLabel}
          </button>
        )}

        <div className="my-7 h-px bg-[#E1E7EF]" />

        <p className="text-sm font-bold text-[#0B1739]">Key features:</p>

        <ul className="mt-5 space-y-3.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check
                className="mt-0.5 h-4.5 w-4.5 flex-none text-[#1267D6]"
                strokeWidth={2.2}
              />
              <span className="text-sm leading-6 text-[#24364D]">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {!plan.available && (
          <p className="mt-auto pt-7 text-xs leading-5 text-[#7A8AA0]">
            Planned subscription. It will not accept payment until the listed
            features and entitlement delivery are connected and tested.
          </p>
        )}
      </div>
    </div>
  );
}

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
            MVP Early Access
          </div>

          <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-[-0.05em] text-[#0B1739] sm:text-6xl lg:text-7xl">
            Advanced learning.
            <span className="block text-[#1677FF]">Simple pricing.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#53657D] sm:text-lg">
            Start with Explore during MVP testing. Paid plans are shown now so
            learners can see what GAHN AI is building toward, but they are not
            available to purchase yet.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              "No credit card required",
              "Explore the core learning system",
              "Paid plans coming later",
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
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
              Choose Your Plan
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
              Start free. Upgrade when the paid plans launch.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch xl:gap-6">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-[#CFE0F5] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_58%,#EAF3FF_100%)] px-6 py-9 text-center shadow-[0_18px_50px_rgba(11,23,57,0.06)] sm:px-10 sm:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
            Start Today
          </p>

          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
            Start learning before paid plans are launched.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#53657D]">
            Create your account and begin testing the GAHN AI learning
            experience with Explore.
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
