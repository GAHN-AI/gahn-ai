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
    tag: "Explore",
    desc: "For learners who want to experience structured AI learning before upgrading.",
    features: [
      "Access to all 5 learning worlds",
      "5 AI learning sessions per month",
      "Active learning tasks",
      "AI feedback and corrections",
      "Lesson recaps",
      "Basic notes",
      "Basic progress tracking",
      "Recent learning sessions",
    ],
  },
  {
    name: "Mastery",
    price: "$19",
    tag: "Most Popular",
    desc: "For learners who want consistent AI instruction, deeper feedback, and stronger progress tracking.",
    popular: true,
    stripePlan: "mastery",
    features: [
      "Access to all 5 learning worlds",
      "30 AI learning sessions per month",
      "Adaptive AI instruction",
      "Mistake detection and retries",
      "Personalized lesson recommendations",
      "Full learning history",
      "Progress and streak tracking",
      "Saved notes and detailed recaps",
    ],
  },
];

const outcomePillars = [
  ["Learn", "AI instructors explain concepts clearly."],
  ["Practice", "Recall, quizzes, and exercises build retention."],
  ["Prove Mastery", "Certificates and assessments show progress."],
  ["Build Portfolio", "Projects and achievements create proof of skill."],
  ["Scale Learning", "Teacher and school tools support classrooms."],
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
      className={`relative flex min-h-[640px] flex-col rounded border p-7 shadow-sm ${
        highlighted
          ? "border-[#071f4d] bg-white shadow-xl"
          : "border-slate-200 bg-white"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-6 rounded bg-[#071f4d] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white">
          Most Popular
        </div>
      )}

      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
        {plan.tag}
      </p>

      <h2 className="mt-5 text-3xl font-black text-[#061633]">{plan.name}</h2>

      <div className="mt-5 flex items-end gap-1">
        <span className="text-5xl font-black tracking-tight text-[#061633]">
          {plan.price}
        </span>
        <span className="mb-2 text-slate-500">/mo</span>
      </div>

      <p className="mt-5 min-h-[96px] text-sm leading-6 text-slate-600">
        {plan.desc}
      </p>

      <div className="my-6 h-px bg-slate-200" />

      <ul className="space-y-4 text-sm text-slate-700">
        {plan.features.map((feature: string) => (
          <li key={feature} className="flex gap-3">
            <span className="font-black text-[#071f4d]">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`mt-auto block rounded px-5 py-4 text-center text-sm font-black uppercase tracking-[0.14em] transition disabled:cursor-not-allowed disabled:opacity-60 ${
          highlighted
            ? "bg-[#071f4d] text-white hover:bg-[#0b2f6d]"
            : "border border-slate-300 bg-slate-50 text-[#061633] hover:bg-white"
        }`}
      >
        {loading ? "Loading..." : `Start ${plan.name}`}
      </button>
    </motion.div>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-[#061633] xl:[zoom:0.63]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-11 w-11 rounded-full object-cover"
            />

            <div>
              <p className="text-xl font-black tracking-tight">GAHN AI</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Global AI Human Helper Network
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-black uppercase tracking-[0.12em] md:flex">
            <Link href="/">Home</Link>
            <Link href="/#programs">Programs</Link>
            <Link href="/#platform">Platform</Link>
            <Link href="/#instructors">Instructors</Link>
            <Link href="/#schools">Schools</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded border border-slate-300 px-5 py-3 text-sm font-black uppercase tracking-[0.12em]"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="rounded bg-[#071f4d] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <section className="border-b border-slate-200 bg-[#f5f7fb] px-6 py-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#071f4d]">
            Pricing built around outcomes
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
            Plans for learners.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-slate-700">
            Start free and upgrade when you are ready for more structured AI
            learning support.
          </p>
        </motion.div>
      </section>

      <section className="px-6 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6 }}
          className="mx-auto grid max-w-7xl gap-4 md:grid-cols-5"
        >
          {outcomePillars.map(([title, text]) => (
            <div
              key={title}
              className="rounded border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="border-t border-slate-200 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#071f4d]">
              Individual learners
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Choose the plan that matches how often you want to learn.
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Both plans include access to all five learning worlds. Mastery
              gives you more AI learning sessions and deeper progress support.
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08 }}
            className="mx-auto grid max-w-4xl items-stretch gap-6 md:grid-cols-2"
          >
            {individualPlans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f5f7fb] px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#071f4d]">
            Growing with the platform
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">
            More plans may be introduced as GAHN AI expands.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Future subscriptions may support advanced career tools, certificates,
            portfolios, teachers, classrooms, schools, and larger learning
            organizations. New plans will be introduced only as those features
            are built and the platform grows.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[420px_1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#071f4d]">
              Why pricing matters
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              The platform is priced around learning outcomes.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              [
                "For individual learners",
                "Free lets users experience structured AI learning, while Mastery supports more consistent learning and deeper progress tracking.",
              ],
              [
                "For all five learning worlds",
                "Both plans give learners access to Career Skills, School Help, Brain Development, General Knowledge, and Book Intelligence.",
              ],
              [
                "For consistent learning",
                "Mastery gives learners more AI learning sessions, adaptive instruction, retries, and personalized recommendations.",
              ],
              [
                "For real progress",
                "Saved sessions, notes, lesson recaps, streaks, and progress tracking help learners continue over time.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3 className="text-2xl font-black">{title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row">
          <div>
            <p className="text-2xl font-black">GAHN AI</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Global AI Human Helper Network
            </p>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 GAHN AI. Built for AI-powered learning.
          </p>
        </div>
      </footer>
    </main>
  );
}