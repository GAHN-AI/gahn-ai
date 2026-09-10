"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  ListChecks,
  PencilLine,
  Target,
} from "lucide-react";

import AIInstructor from "@/components/instructors/AIInstructor";

const worldInformation = {
  "career-skills": {
    title: "Career Skills",
    instructor: "Alex",
  },

  "school-help": {
    title: "School Help",
    instructor: "Arin",
  },

  "brain-development": {
    title: "Brain Development",
    instructor: "Lena",
  },

  "general-knowledge": {
    title: "General Knowledge",
    instructor: "Jada",
  },

  "book-intelligence": {
    title: "Book Intelligence",
    instructor: "John",
  },
};

type WorldKey = keyof typeof worldInformation;

function formatSlug(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function LessonPage() {
  const params = useParams<{ lessonId: string }>();
  const searchParams = useSearchParams();

  const lessonId = params.lessonId;

  const worldSlug =
    searchParams.get("world") || "general-knowledge";

  const requestedTopic =
    searchParams.get("topic") ||
    (lessonId !== "custom" ? formatSlug(lessonId) : "New Learning Topic");

  const world =
    worldInformation[worldSlug as WorldKey] ||
    worldInformation["general-knowledge"];

  return (
    <main className="min-h-screen bg-white text-[#111827]">
      {/* HEADER */}
      <header className="border-b border-[#dbe3ee] bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href={`/learn/${worldSlug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4b5563] transition hover:text-[#16a34a]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {world.title}
          </Link>

          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-10 w-10 object-contain"
            />

            <span className="font-extrabold">GAHN AI</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-5 py-7 sm:px-8">
        {/* LESSON INFORMATION */}
        <section className="mb-6">
          <div className="flex items-center gap-2 text-sm font-bold text-[#16a34a]">
            <BookOpen className="h-4 w-4" />
            {world.title}
          </div>

          <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-3xl font-extrabold tracking-[-0.025em] sm:text-4xl">
                {requestedTopic}
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-7 text-[#4b5563]">
                Your AI instructor will build this learning path around your
                current knowledge, responses, mistakes, and progress.
              </p>
            </div>

            <div className="rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-2 text-sm font-bold text-[#15803d]">
              Lesson 1
            </div>
          </div>
        </section>

        {/* MAIN CLASSROOM */}
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(420px,0.75fr)]">
          {/* LEFT — AI INSTRUCTOR */}
          <AIInstructor
            instructorName={world.instructor}
            world={world.title}
            lessonTitle={requestedTopic}
          />

          {/* RIGHT — VISUAL LEARNING PANEL */}
          <aside className="overflow-hidden rounded-2xl border border-[#dbe3ee] bg-white shadow-sm">
            <div className="border-b border-[#dbe3ee] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#16a34a]">
                Live Learning Panel
              </p>

              <h2 className="mt-1 text-xl font-extrabold">
                What your instructor is teaching
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#4b5563]">
                Visual explanations, examples, notes, diagrams, questions, and
                activities will appear here as the instructor teaches.
              </p>
            </div>

            <div className="max-h-[640px] space-y-4 overflow-y-auto p-5">
              {/* OBJECTIVE */}
              <div className="rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] p-5">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-[#16a34a]" />

                  <h3 className="font-bold">
                    Lesson Objective
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-[#4b5563]">
                  Understand the foundations of {requestedTopic} and be able to
                  explain the core idea in your own words.
                </p>
              </div>

              {/* CURRENT EXPLANATION */}
              <div className="rounded-xl border border-[#dbe3ee] p-5">
                <div className="flex items-center gap-3">
                  <Brain className="h-5 w-5 text-[#16a34a]" />

                  <h3 className="font-bold">
                    Current Explanation
                  </h3>
                </div>

                <div className="mt-4 rounded-xl bg-[#f9fafb] p-4">
                  <p className="text-sm leading-7 text-[#374151]">
                    When the AI instructor begins speaking, the most important
                    concepts will appear here in clear visual form.
                  </p>
                </div>
              </div>

              {/* VISUAL EXAMPLE */}
              <div className="rounded-xl border border-[#dbe3ee] p-5">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-5 w-5 text-[#16a34a]" />

                  <h3 className="font-bold">
                    Visual Example
                  </h3>
                </div>

                <div className="mt-4 flex min-h-[170px] items-center justify-center rounded-xl border border-dashed border-[#bbf7d0] bg-[#f0fdf4] p-6 text-center">
                  <div>
                    <p className="font-bold text-[#15803d]">
                      Interactive visual area
                    </p>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-[#4b5563]">
                      Diagrams, equations, charts, code, timelines, whiteboard
                      work, images, and demonstrations can appear here.
                    </p>
                  </div>
                </div>
              </div>

              {/* IMPORTANT NOTE */}
              <div className="rounded-xl border border-[#dbe3ee] p-5">
                <div className="flex items-center gap-3">
                  <PencilLine className="h-5 w-5 text-[#16a34a]" />

                  <h3 className="font-bold">
                    Write This Down
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-[#4b5563]">
                  Important notes the instructor wants you to remember will
                  appear here.
                </p>
              </div>

              {/* PRACTICE */}
              <div className="rounded-xl border border-[#dbe3ee] p-5">
                <div className="flex items-center gap-3">
                  <ListChecks className="h-5 w-5 text-[#16a34a]" />

                  <h3 className="font-bold">
                    Your Turn
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-[#4b5563]">
                  Practice questions and activities will appear here when your
                  instructor wants you to apply what you just learned.
                </p>

                <button
                  type="button"
                  disabled
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#e5e7eb] px-4 py-2.5 text-sm font-semibold text-[#9ca3af]"
                >
                  Waiting for instructor
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>
        </section>

        {/* LEARNING PATH */}
        <section className="mt-6 rounded-2xl border border-[#dbe3ee] bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-extrabold">
                Your Learning Path
              </h2>

              <p className="mt-1 text-sm text-[#4b5563]">
                Later lessons remain locked until you demonstrate mastery.
              </p>
            </div>

            <span className="text-sm font-bold text-[#16a34a]">
              Lesson 1 in progress
            </span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <div className="rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] p-4">
              <p className="text-xs font-bold text-[#16a34a]">
                LESSON 1
              </p>

              <p className="mt-1 font-bold">
                Foundations
              </p>

              <p className="mt-2 text-xs text-[#4b5563]">
                Unlocked
              </p>
            </div>

            {[2, 3, 4].map((lesson) => (
              <div
                key={lesson}
                className="rounded-xl border border-[#dbe3ee] bg-[#f9fafb] p-4 opacity-70"
              >
                <p className="text-xs font-bold text-[#6b7280]">
                  LESSON {lesson}
                </p>

                <p className="mt-1 font-bold">
                  Locked
                </p>

                <p className="mt-2 text-xs text-[#6b7280]">
                  Pass the previous mastery check
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-[#4b5563]">
            <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
            Your AI instructor will test your understanding before unlocking
            the next lesson.
          </div>
        </section>
      </div>
    </main>
  );
}