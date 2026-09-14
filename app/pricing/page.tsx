"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type Plan = {
  name: string;
  price: string;
  period: string;
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
    price: "$0.00",
    period: "USD / month",
    description:
      "A simple way to test GAHN AI and experience the core learning system.",
    buttonLabel: "Start Explore",
    available: true,
    features: [
      "Access to all 5 learning worlds",
      "Limited AI instructor learning sessions",
      "Basic adaptive explanations",
      "Practice questions and corrections",
      "Basic lesson notes and history",
      "Progress tracking",
    ],
  },
  {
    name: "Learner Plus",
    price: "$29.00",
    period: "USD / month",
    description:
      "For learners who want more AI instruction, personalization, and learning history.",
    buttonLabel: "Not Available Yet",
    available: false,
    featured: true,
    badge: "Planned",
    features: [
      "Everything in Explore",
      "More AI instructor learning time",
      "Full adaptive instruction and retries",
      "Personalized lesson recommendations",
      "Saved notes and detailed lesson recaps",
      "Expanded learning history and progress",
      "Priority access to new learning tools",
    ],
  },
  {
    name: "Career Pro",
    price: "$149.00",
    period: "USD / month",
    description:
      "For serious career development with advanced guidance and professional learning tools.",
    buttonLabel: "Not Available Yet",
    available: false,
    badge: "Planned",
    features: [
      "Everything in Learner Plus",
      "Advanced career learning paths",
      "Portfolio and project guidance",
      "Resume and interview coaching",
      "Career-focused mastery assessments",
      "Priority access to advanced instructor tools",
      "Early access to professional features",
    ],
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative flex min-h-[620px] flex-col rounded-[1.6rem] border bg-white p-6 shadow-[0_18px_55px_rgba(11,23,57,0.06)] sm:p-7 ${
        plan.featured
          ? "border-[#1677FF] shadow-[0_24px_70px_rgba(22,119,255,0.12)]"
          : "border-[#D7E3F2]"
      }`}
    >
      {plan.badge && (
        <div
          className={`absolute right-5 top-5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] ${
            plan.featured
              ? "bg-[#EAF3FF] text-[#1677FF]"
              : "bg-[#F5F8FC] text-[#53657D]"
          }`}
        >
          {plan.badge}
        </div>
      )}

      <div className="pr-20">
        <h2 className="text-xl font-extrabold tracking-[-0.02em] text-[#0B1739]">
          {plan.name}
        </h2>
      </div>

      <div className="mt-7">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-extrabold tracking-[-0.04em] text-[#0B1739] sm:text-5xl">
            {plan.price}
          </span>
        </div>
        <p className="mt-1 text-xs font-semibold text-[#7A8AA0]">
          {plan.period}
        </p>
      </div>

      <p className="mt-6 min-h-[84px] text-sm leading-7 text-[#53657D]">
        {plan.description}
      </p>

      {plan.available ? (
        <Link
          href="/signup"
          className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#1677FF] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#0F65E8]"
        >
          {plan.buttonLabel}
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="mt-2 w-full cursor-not-allowed rounded-xl border border-[#D7E3F2] bg-[#F5F8FC] px-5 py-3.5 text-sm font-bold text-[#7A8AA0]"
        >
          {plan.buttonLabel}
        </button>
      )}

      <div className="my-7 h-px bg-[#D7E3F2]" />

      <p className="text-sm font-bold text-[#0B1739]">
        {plan.name === "Explore" ? "Includes:" : "Plan includes:"}
      </p>

      <ul className="mt-5 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={`mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full ${
                plan.featured
                  ? "bg-[#EAF3FF] text-[#1677FF]"
                  : "bg-[#F1F7FF] text-[#1677FF]"
              }`}
            >
              <Check className="h-3 w-3" strokeWidth={2.4} />
            </span>

            <span className="text-sm leading-6 text-[#0B1739]">{feature}</span>
          </li>
        ))}
      </ul>

      {!plan.available && (
        <p className="mt-auto pt-7 text-xs leading-5 text-[#7A8AA0]">
          This plan is shown as a preview and cannot be purchased during MVP
          testing.
        </p>
      )}
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

          <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#D7E3F2] bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
              Why Start Now
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
              Early users help shape what GAHN AI becomes.
            </h2>
            <p className="mt-4 text-base leading-8 text-[#53657D]">
              Your feedback helps us improve the core learning experience before
              future plans, institution features, and advanced tools become
              available.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                Icon: Brain,
                title: "Adaptive learning",
                text: "Lessons can respond to mistakes, progress, and changing understanding.",
              },
              {
                Icon: BookOpen,
                title: "Five learning worlds",
                text: "Move between school, careers, brain training, general knowledge, and books.",
              },
              {
                Icon: ShieldCheck,
                title: "Built around your account",
                text: "Progress, lesson history, notes, and future learning features stay connected.",
              },
            ].map(({ Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#D7E3F2] bg-[#F8FBFF] p-6"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#53657D]">
                  {text}
                </p>
              </div>
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
