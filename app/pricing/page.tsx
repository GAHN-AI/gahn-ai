"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock3 } from "lucide-react";

type Plan = {
  id: "explore" | "learner_plus" | "mastery" | "career_pro";
  name: string;
  price: string;
  description: string;
  available: boolean;
  featured?: boolean;
  features: string[];
};

const plans: Plan[] = [
  {
    id: "explore",
    name: "Early Access",
    price: "$0",
    description:
      "Start learning across all five learning worlds with the core GAHN lesson experience.",
    available: true,
    features: [
      "Access to all five learning worlds",
      "AI guided text lessons",
      "Magic Canvas for examples and lesson content",
      "Progress saved across lessons",
      "Save your own lesson notes",
      "Multiple supported teaching languages",
    ],
  },
  {
    id: "learner_plus",
    name: "Learner Plus",
    price: "$29",
    description:
      "Add live AI instruction, homework help, mastery checks, and stronger study tools.",
    available: true,
    featured: true,
    features: [
      "Everything in Early Access",
      "30 live AI instructor minutes each day",
      "Real time voice conversations with your AI instructor",
      "Adaptive re teaching when you are still confused",
      "Mastery checks with retries before moving on",
      "Upload homework, PDFs, screenshots, and documents",
      "Learner memory for mistakes and concepts to review",
      "Personalized study guides and review questions",
    ],
  },
  {
    id: "mastery",
    name: "Mastery",
    price: "$79",
    description:
      "For learners who want more instructor time and deeper tools for difficult material.",
    available: false,
    features: [
      "Everything in Learner Plus",
      "90 live AI instructor minutes each day",
      "Advanced Magic Canvas tools",
      "Code workspace for technical lessons",
      "Browser assisted learning workspace",
      "Advanced file and document analysis",
      "Deeper learner memory across sessions",
      "Advanced progress and mastery analytics",
    ],
  },
  {
    id: "career_pro",
    name: "Career Pro",
    price: "$149",
    description:
      "Career focused learning with projects, simulations, interview practice, and professional tools.",
    available: false,
    features: [
      "Everything in Mastery",
      "180 live AI instructor minutes each day",
      "Structured career programs",
      "Portfolio and project based learning",
      "Career simulations for real work scenarios",
      "Mock interview practice",
      "Training with professional tools used on the job",
      "Certificates for completed career programs",
    ],
  },
];

const comparisonRows = [
  ["All five learning worlds", "Included", "Included", "Included", "Included"],
  ["AI guided text lessons", "Included", "Included", "Included", "Included"],
  ["Live AI instructor time", "None", "30 min", "90 min", "180 min"],
  ["Homework file uploads", "Not included", "Included", "Included", "Included"],
  ["Study guides and review questions", "Not included", "Included", "Included", "Included"],
  ["Advanced Magic Canvas", "Not included", "Not included", "Included", "Included"],
  ["Advanced learner analytics", "Not included", "Not included", "Included", "Included"],
  ["Career projects and simulations", "Not included", "Not included", "Not included", "Included"],
  ["Interview practice", "Not included", "Not included", "Not included", "Included"],
];

function PlanCard({
  plan,
  checkoutLoading,
  onLearnerPlus,
}: {
  plan: Plan;
  checkoutLoading: boolean;
  onLearnerPlus: () => void;
}) {
  const isFree = plan.id === "explore";
  const isPlus = plan.id === "learner_plus";

  return (
    <article
      className={
        "flex min-h-[610px] flex-col rounded-[18px] border bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.05)] " +
        (plan.featured
          ? "border-[#1677FF] ring-1 ring-[#1677FF]/20"
          : "border-[#D9E2EF]")
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-[#0B1739]">{plan.name}</p>
          <p className="mt-2 min-h-[72px] text-sm leading-6 text-black">
            {plan.description}
          </p>
        </div>
        <span
          className={
            "shrink-0 rounded-full px-3 py-1 text-[11px] font-black " +
            (plan.available
              ? "bg-[#EAF3FF] text-[#1677FF]"
              : "bg-[#F2F4F7] text-[#667085]")
          }
        >
          {plan.available ? "AVAILABLE" : "COMING LATER"}
        </span>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className="text-5xl font-black tracking-[-0.055em] text-[#0B1739]">
          {plan.price}
        </span>
        <span className="pb-1.5 text-sm font-semibold text-black">/month</span>
      </div>

      <div className="mt-6">
        {isFree ? (
          <Link
            href="/signup"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1677FF] px-5 text-sm font-black text-white transition hover:bg-[#0F67E8]"
          >
            Start free
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : isPlus ? (
          <button
            type="button"
            onClick={onLearnerPlus}
            disabled={checkoutLoading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1677FF] px-5 text-sm font-black text-white transition hover:bg-[#0F67E8] disabled:cursor-wait disabled:opacity-60"
          >
            {checkoutLoading ? "Opening checkout..." : "Choose Learner Plus"}
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-[#D9E2EF] bg-[#F7F9FC] px-5 text-sm font-black text-[#667085]"
          >
            <Clock3 className="h-4 w-4" />
            Not available yet
          </button>
        )}
      </div>

      <div className="my-6 h-px bg-[#E6ECF3]" />

      <p className="text-sm font-black text-[#0B1739]">
        {isFree ? "Included in this plan" : "What this plan adds"}
      </p>

      <ul className="mt-4 grid gap-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#EAF3FF]">
              <Check className="h-3 w-3 text-[#1677FF]" strokeWidth={3} />
            </span>
            <span className="text-sm font-medium leading-6 text-black">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function PricingPage() {
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  async function startLearnerPlusCheckout() {
    setCheckoutLoading(true);
    setCheckoutError("");

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "learner_plus" }),
      });

      const data = await response.json();

      if (response.status === 401) {
        window.location.href = "/login?next=/pricing";
        return;
      }

      if (!response.ok || !data.url) {
        setCheckoutError(
          data.error || "Learner Plus checkout is not available right now."
        );
        return;
      }

      window.location.href = data.url;
    } catch {
      setCheckoutError("Learner Plus checkout is not available right now.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white font-sans text-black">
      <header className="border-b border-[#D9E2EF] bg-white">
        <nav className="mx-auto flex min-h-[74px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-black text-[#0B1739]">GAHN AI</p>
              <p className="text-[8px] font-black uppercase tracking-[0.16em] text-black">
                Global AI Human Helper Network
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-[#D9E2EF] bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-[#F7F9FC]"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Link>
        </nav>
      </header>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 pb-10 pt-14 text-center sm:px-8 sm:pt-16">
          <p className="text-sm font-black text-[#1677FF]">GAHN AI PRICING</p>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-black tracking-[-0.045em] text-[#0B1739] sm:text-5xl">
            Choose the learning plan that fits you
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-black">
            Every plan starts with the same five learning worlds. Higher plans add more live instructor time, stronger learning tools, and career focused features.
          </p>
        </div>
      </section>

      <section className="border-y border-[#DCE7F5] bg-[linear-gradient(90deg,#EAF8FF_0%,#EEF4FF_55%,#FFFFFF_100%)] px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-[1380px] gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              checkoutLoading={checkoutLoading}
              onLearnerPlus={startLearnerPlusCheckout}
            />
          ))}
        </div>

        {checkoutError && (
          <div className="mx-auto mt-6 max-w-[1380px] rounded-xl border border-[#BFD7FF] bg-white p-4 text-sm font-bold leading-6 text-black">
            {checkoutError}
          </div>
        )}
      </section>

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center">
            <p className="text-sm font-black text-[#1677FF]">COMPARE PLANS</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0B1739]">
              See exactly what changes between plans
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-black">
              Mastery and Career Pro are shown so you can see where GAHN is going, but only Early Access and Learner Plus can be selected right now.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-[18px] border border-[#D9E2EF] bg-white">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D9E2EF] bg-[#F7FAFF]">
                  <th className="px-5 py-4 text-sm font-black text-[#0B1739]">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="px-5 py-4 text-sm font-black text-[#0B1739]">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row[0]} className="border-b border-[#EDF1F6] last:border-b-0">
                    {row.map((cell, index) => (
                      <td
                        key={cell + index}
                        className={
                          "px-5 py-4 text-sm " +
                          (index === 0
                            ? "font-bold text-[#0B1739]"
                            : "font-medium text-black")
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-[#0B5CFF] px-5 py-14 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-white">
              One learning system
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em]">
              Start free, then upgrade when you need more instructor time.
            </h2>
            <p className="mt-4 text-base leading-7 text-white">
              Your learning worlds, progress, notes, and lesson history stay connected when your plan changes.
            </p>
          </div>

          <Link
            href="/signup"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-[#0B5CFF] transition hover:bg-[#F3F7FF]"
          >
            Start free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
