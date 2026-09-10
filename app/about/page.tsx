"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const shellClass = "mx-auto w-full max-w-[900px] px-5 sm:px-8";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-[#0A1628]">
      <header className="border-b border-[#E3E6EC]">
        <div
          className={`${shellClass} flex items-center justify-between py-5`}
        >
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-10 w-10 rounded-full object-cover"
            />

            <p className="text-xl font-extrabold tracking-[-0.025em]">
              GAHN AI
            </p>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-[#5B6472] transition hover:text-[#2952A3]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            Back to home
          </Link>
        </div>
      </header>

      <section className="border-b border-[#E3E6EC] bg-[#F7F8FA] py-16 sm:py-20">
        <div className={shellClass}>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2952A3]">
            About GAHN AI
          </p>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-[-0.035em] sm:text-5xl">
            Learning that adapts to you, not the other way around.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5B6472]">
            GAHN AI — Global AI Human Helper Network — is a structured learning
            platform built around one idea: an AI instructor should teach the
            way a good tutor does. It explains a concept, checks that you
            actually understood it, corrects you when you didn&apos;t, and
            adjusts based on how you&apos;re doing.
          </p>
        </div>
      </section>

      <section className={`${shellClass} space-y-10 py-16 sm:py-20`}>
        <div>
          <h2 className="text-2xl font-bold">Why we built this</h2>

          <p className="mt-4 text-base leading-7 text-[#5B6472]">
            Most AI tools answer whatever you ask, in whatever order you ask
            it. That&apos;s useful, but it isn&apos;t teaching — it&apos;s
            lookup. GAHN AI was built to do something different: run an actual
            lesson. Teach a concept, give you a task, check your answer, correct
            mistakes, and ask you to try again until it sticks. The goal
            isn&apos;t a fast answer. It&apos;s real understanding that lasts.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            What &quot;adapts to you&quot; actually means
          </h2>

          <p className="mt-4 text-base leading-7 text-[#5B6472]">
            An AI instructor on GAHN AI notices your current level, adjusts
            explanations when you&apos;re confused, remembers what you&apos;ve
            struggled with, and paces future lessons around that. It isn&apos;t
            a replacement for great human teachers — it&apos;s a way to give
            more people access to personalized, patient instruction whenever
            they need it.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Who it&apos;s for</h2>

          <p className="mt-4 text-base leading-7 text-[#5B6472]">
            Students working through school subjects, self-learners building
            career and life skills, and anyone who wants to actually understand
            something instead of just getting an answer. GAHN AI is designed to
            work across five learning worlds — Career Skills, School Help, Brain
            Development, General Knowledge, and Book Intelligence — with more
            built as the platform grows.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Where we are</h2>

          <p className="mt-4 text-base leading-7 text-[#5B6472]">
            GAHN AI is early. We&apos;re building in public, taking feedback
            seriously, and shipping improvements constantly. If something on
            the platform doesn&apos;t work the way you&apos;d expect, we want
            to hear about it.
          </p>
        </div>

        <div className="rounded-2xl bg-[#0A1628] px-6 py-8 text-white sm:px-8">
          <h2 className="text-2xl font-bold">Get in touch</h2>

          <p className="mt-3 max-w-lg text-base leading-7 text-white/75">
            Questions, feedback, or partnership interest — reach out any time.
          </p>

          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#0A1628] transition hover:bg-[#F7F8FA]"
          >
            support@gahnai.com
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}