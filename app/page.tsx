"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { MotionConfig, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Menu, X } from "lucide-react";

const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#learning-worlds", label: "Learning Worlds" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
];

const worlds = [
  {
    title: "Career Skills",
    text: "Business, leadership, entrepreneurship, communication, and job-ready skills.",
    image: "/instructors/alexCareerSkills.png",
  },
  {
    title: "School Help",
    text: "Math, science, writing, reading, study support, and guided homework help.",
    image: "/instructors/HenrySchoolHelp.jpg",
  },
  {
    title: "Brain Development",
    text: "Memory, focus, discipline, reasoning, habits, and learning performance.",
    image: "/instructors/AanyaBrainDevelopment.png",
  },
  {
    title: "General Knowledge",
    text: "History, technology, communication, culture, life skills, current events, and real-world knowledge.",
    image: "/instructors/sarahGeneralKnowledge.png",
  },
  {
    title: "Book Intelligence",
    text: "Turn books into summaries, lessons, quizzes, notes, and study paths.",
    image: "/instructors/HannahBookIntelligence.jpg",
  },
];

const heroPoints = [
  ["Structured lessons", "Not random chats"],
  ["Active practice", "You think and respond"],
  ["Five learning worlds", "Career, school, and more"],
  ["Your language", "Learn the way you speak"],
];

const audiences = [
  {
    title: "Students",
    text: "Get help understanding school subjects, practice difficult concepts, and receive corrections before moving forward.",
  },
  {
    title: "Self-Learners",
    text: "Learn business, finance, technology, communication, books, and other real-world skills through structured learning paths.",
  },
  {
    title: "Skill Builders",
    text: "Use short guided lessons to improve focus, memory, decision-making, career knowledge, and practical ability over time.",
  },
];

const steps = [
  {
    title: "Create your account",
    text: "Sign up for free and set up your profile.",
  },
  {
    title: "Choose a learning world",
    text: "Pick the area you want to improve first.",
  },
  {
    title: "Start learning",
    text: "Work through guided lessons step by step.",
  },
];

const faqs = [
  {
    q: "What ages is GAHN AI built for?",
    a: "GAHN AI is built for learners ages 12 and up. It's useful for both teens and adults — whether you're studying for school, building career skills, or learning something new on your own.",
  },
  {
    q: "What are the learning worlds?",
    a: "GAHN AI is organized into five learning worlds: Career Skills, School Help, Brain Development, General Knowledge, and Book Intelligence. You choose the one you want to start with and can explore the others anytime.",
  },
  {
    q: "Is my data and progress private?",
    a: "Yes. Your notes, lesson history, and progress are tied to your account and are not visible to other users. See our Privacy Policy for more detail.",
  },
  {
    q: "Can I use GAHN AI on my phone?",
    a: "Yes, the platform is fully responsive and works on phones, tablets, and desktop browsers.",
  },
  {
    q: "Will certificates be available?",
    a: "Certificates and portfolios are planned for a future stage of the platform, tied to Career Skills and School Help completions.",
  },
];

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/pricing" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const shellClass = "mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-full bg-gahn-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gahn-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gahn-blue focus-visible:ring-offset-2";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-full border border-gahn-line bg-white px-6 py-3 text-sm font-semibold text-gahn-navy transition-colors hover:border-gahn-navy/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gahn-blue focus-visible:ring-offset-2";

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-xl"}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gahn-blue">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-gahn-navy sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {text && (
        <p
          className={`mt-5 text-base leading-7 text-gahn-slate sm:text-lg sm:leading-8 ${
            centered ? "mx-auto max-w-2xl" : ""
          }`}
        >
          {text}
        </p>
      )}
    </Reveal>
  );
}

function Logo({ dark }: { dark: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <img
        src="/logo/favicon.png"
        alt=""
        className="h-9 w-9 flex-none rounded-full object-cover sm:h-10 sm:w-10"
      />
      <span className="min-w-0">
        <span
          className={`block truncate text-lg font-bold tracking-[-0.02em] sm:text-xl ${
            dark ? "text-white" : "text-gahn-navy"
          }`}
        >
          GAHN AI
        </span>
        <span
          className={`hidden text-[8px] font-semibold uppercase tracking-[0.18em] sm:block ${
            dark ? "text-gahn-mist" : "text-gahn-slate"
          }`}
        >
          Global AI Human Helper Network
        </span>
      </span>
    </span>
  );
}

function SiteHeader({ overHero }: { overHero: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dark = overHero && !menuOpen;

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        dark ? "border-white/10 bg-gahn-night/80" : "border-gahn-line bg-white/90"
      }`}
    >
      <nav className={`${shellClass} flex h-[72px] items-center justify-between gap-6`}>
        <a href="#top" aria-label="GAHN AI home">
          <Logo dark={dark} />
        </a>

        <div
          className={`hidden items-center gap-8 text-sm font-medium lg:flex ${
            dark ? "text-gahn-mist" : "text-gahn-slate"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`transition-colors ${dark ? "hover:text-white" : "hover:text-gahn-navy"}`}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/pricing"
            className={`transition-colors ${dark ? "hover:text-white" : "hover:text-gahn-navy"}`}
          >
            Pricing
          </Link>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/login"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              dark ? "text-white hover:bg-white/10" : "text-gahn-navy hover:bg-gahn-paper"
            }`}
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              dark
                ? "bg-white text-gahn-night hover:bg-white/90"
                : "bg-gahn-navy text-white hover:bg-gahn-night"
            }`}
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={`grid h-10 w-10 place-items-center rounded-full border lg:hidden ${
            dark ? "border-white/15 text-white" : "border-gahn-line text-gahn-navy"
          }`}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-gahn-line bg-white lg:hidden">
          <div className={`${shellClass} py-5`}>
            <div className="flex flex-col gap-1 text-sm font-medium text-gahn-navy">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 hover:bg-gahn-paper"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/pricing"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 hover:bg-gahn-paper"
              >
                Pricing
              </Link>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-gahn-line pt-4 sm:flex-row">
              <Link href="/login" className={`${secondaryButton} w-full`}>
                Log In
              </Link>
              <Link href="/signup" className={`${primaryButton} w-full`}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function WorldCard({ title, text, image }: { title: string; text: string; image: string }) {
  return (
    <Link
      href="/signup"
      className="group flex h-full min-h-[168px] flex-row overflow-hidden rounded-3xl border border-gahn-line bg-white transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(11,23,57,0.25)] sm:min-h-[184px] lg:min-h-[208px]"
    >
      <div className="relative w-28 flex-none overflow-hidden bg-gahn-night-2 sm:w-32 md:w-36 lg:w-40">
        <img
          src={image}
          alt={`${title} Instructor`}
          className={`absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
            title === "Career Skills"
              ? "object-contain object-top p-2"
              : "object-cover object-[center_15%]"
          }`}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gahn-night/20 to-transparent"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5 lg:p-6">
        <h3 className="text-xl font-semibold tracking-[-0.02em] text-gahn-navy">{title}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-7 text-gahn-slate">{text}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gahn-blue">
          Start learning
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gahn-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-base font-semibold text-gahn-navy sm:text-lg">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-none text-gahn-slate transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={1.75}
        />
      </button>

      {isOpen && (
        <p className="-mt-2 max-w-2xl pb-6 text-[15px] leading-7 text-gahn-slate">{answer}</p>
      )}
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [overHero, setOverHero] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    function update() {
      const hero = heroRef.current;
      if (!hero) return;
      setOverHero(hero.getBoundingClientRect().bottom > 72);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main
        id="top"
        className="marketing min-h-screen scroll-smooth bg-white font-sans text-gahn-navy antialiased"
      >
        <SiteHeader overHero={overHero} />

        {/* HERO */}
        <section
          ref={heroRef}
          className="relative -mt-[73px] overflow-hidden bg-gahn-night pt-[73px] text-white"
        >
          <div aria-hidden="true" className="gahn-hero-grid pointer-events-none absolute inset-0" />

          <div className={`${shellClass} relative py-20 text-center sm:py-24 lg:py-32`}>
            <div className="mx-auto min-w-0 max-w-[860px]">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-gahn-sky">
                <span className="h-1.5 w-1.5 rounded-full bg-gahn-sky" />
                AI-guided learning · Early access
              </p>

              <h1 className="mx-auto mt-7 max-w-[820px] text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.4rem]">
                Learning built for{" "}
                <span className="text-gahn-sky">what you want to become.</span>
              </h1>

              <p className="mx-auto mt-7 max-w-[600px] text-base leading-7 text-gahn-mist sm:text-lg sm:leading-8">
                Explore careers, school subjects, brain development, general
                knowledge, and books in one AI learning platform.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-gahn-night transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gahn-night"
                >
                  Start learning free
                </Link>
                <a
                  href="#learning-worlds"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  Explore Learning Worlds <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mx-auto mt-14 grid max-w-[680px] grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-8 sm:grid-cols-4">
                {heroPoints.map(([item, sub]) => (
                  <div key={item}>
                    <p className="text-sm font-semibold text-white">{item}</p>
                    <p className="mt-1 text-xs leading-5 text-gahn-mist">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LEARNING WORLDS */}
        <section
          id="learning-worlds"
          className="scroll-mt-20 bg-gahn-paper py-20 sm:py-28"
        >
          <div className={shellClass}>
            <SectionHeading
              eyebrow="Learning Worlds"
              title="Five worlds. One way of learning."
              text="Each world is designed around a different learning goal. Start with the area you care about most, then grow into new topics as your confidence builds."
            />

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {worlds.map((world, index) => (
                <Reveal
                  key={world.title}
                  delay={0.05 * index}
                  className={
                    index === worlds.length - 1
                      ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.625rem)]"
                      : ""
                  }
                >
                  <WorldCard {...world} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section className="bg-white py-20 sm:py-28">
          <div className={shellClass}>
            <SectionHeading
              eyebrow="Who GAHN AI Is For"
              title="Built for people who want to actually learn."
              align="left"
            />

            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {audiences.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={0.06 * index}
                  className="border-t border-gahn-navy pt-6"
                >
                  <p className="text-xs font-semibold text-gahn-slate">0{index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-gahn-slate">{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="scroll-mt-20 border-t border-gahn-line bg-gahn-paper py-20 sm:py-28"
        >
          <div className={shellClass}>
            <SectionHeading
              eyebrow="How It Works"
              title="Get started in three steps."
            />

            <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <Reveal
                  key={step.title}
                  delay={0.06 * index}
                  className="rounded-3xl border border-gahn-line bg-white p-7"
                >
                  <h3 className="text-lg font-semibold tracking-[-0.01em]">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-gahn-slate">{step.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 bg-white py-20 sm:py-28">
          <div
            className={`${shellClass} grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16`}
          >
            <div>
              <SectionHeading eyebrow="FAQ" title="Questions, answered." align="left" />
              <Reveal>
                <p className="mt-5 text-base leading-7 text-gahn-slate">
                  Still have questions?{" "}
                  <Link href="/contact" className="font-semibold text-gahn-blue hover:underline">
                    Contact us
                  </Link>
                  .
                </p>
              </Reveal>
            </div>

            <Reveal className="border-t border-gahn-line">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={faq.q}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaqIndex === index}
                  onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                />
              ))}
            </Reveal>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="bg-white px-5 pb-20 sm:px-8 sm:pb-28">
          <Reveal className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[32px] bg-gahn-night px-6 py-16 text-center text-white sm:px-12 sm:py-20">
            <div aria-hidden="true" className="gahn-hero-grid pointer-events-none absolute inset-0" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
                Start learning with GAHN AI today.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gahn-mist">
                New users create an account first. Returning users log in with
                their email.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-gahn-night transition-colors hover:bg-white/90"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  Log In
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-2">
                {["No credit card required to start", "Built for every learner"].map((point) => (
                  <p key={point} className="flex items-center gap-2 text-sm text-gahn-mist">
                    <Check className="h-4 w-4 flex-none text-gahn-sky" strokeWidth={2} />
                    {point}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-gahn-line bg-white py-10">
          <div
            className={`${shellClass} flex flex-col gap-8 md:flex-row md:items-center md:justify-between`}
          >
            <Link href="/" aria-label="GAHN AI home">
              <Logo dark={false} />
            </Link>

            <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-gahn-slate">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-gahn-navy"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className={`${shellClass} mt-8`}>
            <p className="border-t border-gahn-line pt-6 text-xs text-gahn-slate">
              © 2026 GAHN AI. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </MotionConfig>
  );
}
