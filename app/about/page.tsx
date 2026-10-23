"use client";

import Image from "next/image";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const shellClass = "mx-auto w-full max-w-[900px] px-5 sm:px-8";

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white font-sans text-[#0A1628]">
      <header className="border-b border-[#E3E6EC]">
        <div
          className={`${shellClass} flex items-center justify-between py-5`}
        >
          <Link href="/" className="flex items-center gap-3">
            <Image unoptimized width={64} height={64}
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
            className="flex items-center gap-2 text-sm font-semibold text-black transition hover:text-[#2952A3]"
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
            A clearer path from a question to understanding.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-black">
            GAHN AI, Global AI Human Helper Network, is an education project
            in development. We are designing a learning environment where an
            AI instructor explains an idea, gives you a task, reviews your
            reasoning, and helps you work through mistakes.
          </p>
        </div>
      </section>

      <section className={`${shellClass} space-y-10 py-16 sm:py-20`}>
        <div>
          <h2 className="text-2xl font-bold">What we are building</h2>

          <p className="mt-4 text-base leading-7 text-black">
            GAHN will bring conversation and practical work into one workspace.
            The instructor will guide the discussion while Magic Canvas holds
            examples, questions, notes, and exercises. The planned teaching
            process includes independent attempts, specific feedback, and review
            of earlier mistakes. That experience still needs implementation and testing.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            How the planned lessons will work
          </h2>

          <p className="mt-4 text-base leading-7 text-black">
            Learner responses should determine what happens next: another
            example, a simpler explanation, more practice, or a harder task.
            Progress should reflect work a learner has demonstrated. The planned
            system will support learning alongside teachers and other qualified
            professionals. Required schooling, supervised training, licensing,
            and professional judgment remain separate responsibilities.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Who it&apos;s for</h2>

          <p className="mt-4 text-base leading-7 text-black">
            Students, independent learners, and people exploring digital career
            skills can browse five Learning Worlds: Career Skills, School Help,
            Brain Development, General Knowledge, and Book Intelligence. All
            five are open for exploration. Interactive instruction is not available yet.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Where we are</h2>

          <p className="mt-4 text-base leading-7 text-black">
            You can create an early-access account, explore planned curricula,
            preview the instructor and Magic Canvas layout, and share feedback.
            The live instructor and paid subscriptions are not active. Your
            feedback will help us decide what to improve before a learner pilot.
          </p>
        </div>

        <div className="rounded-2xl bg-[#0A1628] px-6 py-8 text-white sm:px-8">
          <h2 className="text-2xl font-bold">Get in touch</h2>

          <p className="mt-3 max-w-lg text-base leading-7 text-white/75">
            Questions, feedback, or partnership interest, reach out any time.
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
