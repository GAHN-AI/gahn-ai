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
  "Maya Live AI Instructor with 60 minutes per billing period",
  "Interactive AI learning workspace",
  "Mastery checks and retries",
  "Homework and file help",
  "Learner memory for strong and weak areas",
  "Saved study guides",
  "Active recall review questions",
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
      className={`flex min-h-[620px] flex-col rounded-[1.5rem] border bg-white p-6 sm:p-7 ${
        featured
          ? "border-[#1677FF] shadow-[0_10px_30px_rgba(22,119,255,0.10)]"
          : "border-[#E5E7EB]"
      }`}
    >
      <div className="flex flex-1 flex-col">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black tracking-[-0.03em] text-[#111827]">
              {name}
            </h2>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${
              featured
                ? "bg-[#EAF3FF] text-[#1677FF]"
                : "bg-[#F3F4F6] text-[#4B5563]"
            }`}>
              {featured ? "Paid" : "Free"}
            </span>
          </div>
          <p className="mt-3 min-h-14 text-sm leading-6 text-[#4B5563]">
            {description}
          </p>

          <div className="mt-6 flex items-end gap-2">
            <span className="text-5xl font-black tracking-[-0.05em] text-[#111827]">
              {price}
            </span>
            <span className="pb-1 text-sm font-semibold text-[#6B7280]">/month</span>
          </div>
        </div>

        <div className="mt-7">{action}</div>

        <div className="my-7 h-px bg-[#E5E7EB]" />

        <p className="text-sm font-black text-[#111827]">
          {featured ? "Everything in Explore, plus:" : "What’s included:"}
        </p>

        <ul className="mt-5 grid gap-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#EAF3FF]">
                <Check className="h-3 w-3 text-[#1677FF]" strokeWidth={3} />
              </span>
              <span className="text-sm font-medium leading-6 text-[#374151]">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {note && (
          <div className="mt-auto pt-7">
            <div className="rounded-xl bg-[#F7F7F8] p-4">
              <p className="text-xs font-semibold leading-5 text-[#5F6368]">{note}</p>
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
    <main className="min-h-screen bg-white font-sans text-black">
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

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 pb-8 pt-14 text-center sm:px-8 sm:pt-16">
          <p className="text-sm font-bold text-[#1677FF]">
            Plans
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-black tracking-[-0.045em] text-[#111827] sm:text-5xl">
            Choose how you want to learn
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-[#5F6368]">
            Start free with Explore or upgrade when you want the live Maya
            instructor and stronger learning tools.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 pt-4 sm:px-8 sm:pb-20">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <PlanCard
            name="Explore"
            price="$0"
            description="Explore GAHN without creating ongoing paid avatar costs."
            features={exploreFeatures}
            action={
              <Link
                href="/signup"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#D1D5DB] bg-white px-5 py-3.5 text-sm font-black text-[#111827] transition hover:bg-[#F7F7F8]"
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
            description="For learners who want the real time Maya instructor and the stronger learning tools."
            features={learnerPlusFeatures}
            featured
            action={
              <button
                type="button"
                onClick={startLearnerPlusCheckout}
                disabled={checkoutLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1677FF] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#0F67E8] disabled:opacity-60"
              >
                {checkoutLoading ? "Opening checkout..." : "Upgrade"}
                <ArrowRight className="h-4 w-4" />
              </button>
            }
            note="The 60 minute Maya allowance is enforced in the backend. Stripe checkout remains behind a safety switch until the payment account and final paid flow are ready."
          />
        </div>

        {checkoutError && (
          <div className="mx-auto mt-6 max-w-5xl rounded-xl border border-[#D1D5DB] bg-white p-4">
            <p className="flex items-start gap-2 text-sm font-bold leading-6 text-[#374151]">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#1677FF]" />
              {checkoutError}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
