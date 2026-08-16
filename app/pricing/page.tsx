"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const individualPlans = [
  {
    name: "Free",
    price: "$0",
    tag: "Full MVP Access",
    desc: "Experience the complete GAHN AI learning platform free during our early access period.",
    features: [
      "Access to all 5 learning worlds",
      "AI instructor learning sessions",
      "Adaptive AI instruction",
      "Active learning tasks",
      "AI feedback and corrections",
      "Mistake detection and retries",
      "Personalized lesson recommendations",
      "Full learning history",
      "Progress and streak tracking",
      "Saved notes and detailed lesson recaps",
    ],
  },
];

function PlanCard({ plan }: { plan: any }) {
  const [loading, setLoading] = useState(false);
  const highlighted = plan.popular || plan.featured;

  async function handleCheckout() {
    if (!plan.stripePlan) {
      window.location.href = "/signup";
      return;
    }

    setLoading(true);

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan: plan.stripePlan }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
      return;
    }

    setLoading(false);
    alert("Could not start checkout. Please try again.");
  }

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`relative flex min-h-[640px] flex-col rounded-2xl p-7 sm:p-8 ${
        highlighted
          ? "border-2 border-[#22c55e] bg-white shadow-md"
          : "border border-[#dbe3ee] bg-white shadow-sm"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-6 rounded-full bg-[#22c55e] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">
          Most Popular
        </div>
      )}

      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#22c55e]">
        {plan.tag}
      </p>

      <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.02em] text-[#111827]">{plan.name}</h2>

      <div className="mt-5 flex items-end gap-1">
        <span className="text-5xl font-extrabold tracking-tight text-[#111827]">
          {plan.price}
        </span>
        <span className="mb-2 text-[#4b5563]">/mo</span>
      </div>

      <p className="mt-5 min-h-[96px] text-sm leading-6 text-[#4b5563]">
        {plan.desc}
      </p>

      <div className="my-6 h-px bg-[#dbe3ee]" />

      <ul className="space-y-4 text-sm text-[#111827]">
        {plan.features.map((feature: string) => (
          <li key={feature} className="flex gap-3">
            <span className="font-bold text-[#22c55e]">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`mt-auto block rounded-lg px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
          highlighted
            ? "bg-[#22c55e] text-white hover:bg-[#16a34a]"
            : "border border-[#dbe3ee] bg-white text-[#111827] hover:border-[#22c55e]/40 hover:bg-[#ffffff]"
        }`}
      >
        {loading ? "Loading..." : `Start ${plan.name}`}
      </button>
    </motion.div>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#111827]">
      <header className="sticky top-0 z-50 border-b border-[#dbe3ee] bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-11 w-11 rounded-full object-cover"
            />

            <div>
              <p className="text-xl font-extrabold tracking-tight text-[#111827]">GAHN AI</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#4b5563]">
                Global AI Human Helper Network
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-bold uppercase tracking-[0.12em] md:flex">
            <Link href="/" className="transition hover:text-[#22c55e]">Home</Link>
            <Link href="/#programs" className="transition hover:text-[#22c55e]">Programs</Link>
            <Link href="/#platform" className="transition hover:text-[#22c55e]">Platform</Link>
            <Link href="/#instructors" className="transition hover:text-[#22c55e]">Instructors</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-[#dbe3ee] px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] transition hover:border-[#22c55e]/40 hover:bg-[#ffffff]"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-[#22c55e] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#16a34a]"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <section className="border-b border-[#dbe3ee] bg-[#ffffff] px-6 py-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl text-center"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-[#111827] md:text-7xl">
            Plans for learners.
          </h1>
        </motion.div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08 }}
            className="mx-auto grid max-w-xl items-stretch gap-6"
          >
            {individualPlans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}