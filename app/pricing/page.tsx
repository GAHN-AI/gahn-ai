"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";

const exploreFeatures = [
  "Career Skills and School Help",
  "Dashboard and basic progress",
  "Browse learning paths and lesson topics",
  "Basic lesson notes",
  "Multiple teaching languages",
  "No regular paid LiveAvatar usage",
];

const learnerPlusFeatures = [
  "Everything in Explore",
  "Maya Live AI Instructor — 60 minutes per billing period",
  "Interactive AI learning workspace",
  "Mastery checks and retries",
  "Homework and file help",
  "Learner memory for strong and weak areas",
  "Saved study guides",
  "Active-recall review questions",
];

type PlanCardProps = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
  action: ReactNode;
  note?: string;
};

function PlanCard({
  name,
  price,
  description,
  features,
  featured = false,
  action,
  note,
}: PlanCardProps) {
  return (
    <article
      className={`flex min-h-[660px] flex-col overflow-hidden rounded-[1.4rem] border-2 bg-white shadow-[0_18px_45px_rgba(11,23,57,0.07)] ${
        featured ? "border-[#0B1739]" : "border-[#D8E0EA]"
      }`}
    >
      <div
        className={`px-6 py-4 text-sm font-extrabold ${
          featured
            ? "bg-[#0B1739] text-white"
            : "bg-[#F4F7FB] text-[#0B1739]"
        }`}
      >
        {featured ? "Most useful for active learners" : "Start here"}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div>
          <h2 className="text-2xl font-black tracking-[-0.03em] text-black">
            {name}
          </h2>
          <p className="mt-2 min-h-14 text-sm leading-6 text-black">
            {description}
          </p>

          <div className="mt-6 flex items-end gap-2">
            <span className="text-5xl font-black tracking-[-0.05em] text-black">
              {price}
            </span>
            <span className="pb-1 text-sm font-bold text-black">/month</span>
          </div>
        </div>

        <div className="mt-7">{action}</div>

        <div className="my-7 h-px bg-[#D8E0EA]" />

        <p className="text-sm font-black text-black">
          {featured ? "Everything in Explore, plus:" : "What’s included:"}
        </p>

        <ul className="mt-5 grid gap-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border-2 border-[#0B1739]">
                <Check className="h-3 w-3 text-[#0B1739]" strokeWidth={3} />
              </span>
              <span className="text-sm font-medium leading-6 text-black">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {note && (
          <div className="mt-auto pt-7">
            <div className="rounded-xl border border-[#BFD3ED] bg-[#F2F7FD] p-4">
              <p className="text-xs font-bold leading-5 text-black">{note}</p>
            </div>
          </div>
        )}
      </div>
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
          data.error ||
            "Learner Plus checkout is not available yet."
        );
        return;
      }

      window.location.href = data.url;
    } catch {
      setCheckoutError("Learner Plus checkout is not available yet.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F4F7FB] font-sans text-black">
      <header className="border-b border-[#D8E0EA] bg-white">
        <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
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
            className="inline-flex items-center gap-2 rounded-lg border border-[#C9D4E2] bg-white px-4 py-2.5 text-sm font-bold text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Link>
        </nav>
      </header>

      <section className="border-b border-[#D8E0EA] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 sm:py-16">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1677FF]">
            Simple MVP pricing
          </p>
          <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-black tracking-[-0.045em] text-[#0B1739] sm:text-5xl">
            Start free. Pay only when you need more learning power.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-black">
            GAHN is testing two plans only. Explore keeps the low-cost parts of
            the product free. Learner Plus unlocks the paid real-time AI
            instructor and stronger learning tools. Live checkout stays behind
            the payment safety switch until the payment account is ready.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <PlanCard
            name="Explore"
            price="$0"
            description="Explore GAHN without creating ongoing paid avatar costs."
            features={exploreFeatures}
            action={
              <Link
                href="/signup"
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0B1739] bg-white px-5 py-3.5 text-sm font-black text-[#0B1739]"
              >
                Start Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
            note="No card needed. Maya Live AI Instructor is not included in Explore. Brain Development, General Knowledge, and Book Intelligence are also intentionally unavailable during this MVP test."
          />

          <PlanCard
            name="Learner Plus"
            price="$29"
            description="For learners who want the real-time Maya instructor and the stronger learning tools."
            features={learnerPlusFeatures}
            featured
            action={
              <button
                type="button"
                onClick={startLearnerPlusCheckout}
                disabled={checkoutLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1739] px-5 py-3.5 text-sm font-black text-white disabled:opacity-60"
              >
                {checkoutLoading ? "Opening checkout..." : "Get Learner Plus"}
                <ArrowRight className="h-4 w-4" />
              </button>
            }
            note="The 60-minute Maya allowance is enforced in the backend. Stripe checkout remains behind a safety switch until the payment account and final paid flow are ready."
          />
        </div>

        {checkoutError && (
          <div className="mx-auto mt-6 max-w-5xl rounded-xl border border-[#BFD3ED] bg-white p-4">
            <p className="flex items-start gap-2 text-sm font-bold leading-6 text-black">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#1677FF]" />
              {checkoutError}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
