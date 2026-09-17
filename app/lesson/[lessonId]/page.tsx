"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
import LanguageSelector from "@/components/LanguageSelector";

const worldInformation = {
  "career-skills": { title: "Career Skills", instructor: "Alex" },
  "school-help": { title: "School Help", instructor: "Henry" },
  "brain-development": { title: "Brain Development", instructor: "Aanya" },
  "general-knowledge": { title: "General Knowledge", instructor: "Sarah" },
  "book-intelligence": { title: "Book Intelligence", instructor: "Hannah" },
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
  const requestedWorldSlug = searchParams.get("world") || "general-knowledge";
  const careerSection = searchParams.get("section");

  const resolvedWorldSlug: WorldKey =
    requestedWorldSlug in worldInformation
      ? (requestedWorldSlug as WorldKey)
      : "general-knowledge";

  const requestedTopic =
    searchParams.get("topic") ||
    (lessonId !== "custom" ? formatSlug(lessonId) : "New Learning Topic");

  const world = worldInformation[resolvedWorldSlug];
  const [language, setLanguage] = useState(
    searchParams.get("language") || "English"
  );

  useEffect(() => {
    const stored = window.localStorage.getItem("gahn-language");
    if (!searchParams.get("language") && stored) setLanguage(stored);
  }, [searchParams]);

  function changeLanguage(nextLanguage: string) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("gahn-language", nextLanguage);
  }

  const backHref =
    resolvedWorldSlug === "career-skills" && careerSection
      ? `/learn/career-skills/${encodeURIComponent(
          careerSection
        )}?language=${encodeURIComponent(language)}`
      : `/learn/${resolvedWorldSlug}?language=${encodeURIComponent(language)}`;

  return (
    <main className="min-h-screen bg-[#F8FBFF] font-sans text-[#0B1739]">
      <header className="border-b border-[#D7E3F2] bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#53657D] hover:text-[#1677FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {careerSection ? "career options" : world.title}
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector value={language} onChange={changeLanguage} compact />
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo/favicon.png"
                alt="GAHN AI"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="hidden sm:block">
                <span className="block font-extrabold tracking-[-0.02em]">GAHN AI</span>
                <span className="block text-[7px] font-bold uppercase tracking-[0.16em] text-[#53657D]">
                  Global AI Human Helper Network
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-5 py-7 sm:px-8">
        <section className="relative mb-6 overflow-hidden rounded-[1.5rem] border border-[#D7E3F2] bg-white px-6 py-6 shadow-[0_12px_35px_rgba(11,23,57,0.05)] sm:px-8">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#EAF3FF]" />

          <div className="relative">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1677FF]">
              <BookOpen className="h-4 w-4" />
              {world.title}
            </div>

            <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{requestedTopic}</h1>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-[#53657D]">
                  Your AI instructor will build this learning path around your current knowledge, responses, mistakes, and progress.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#53657D]">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1677FF]" />
                    Progress tracking is off until live AI lessons are enabled.
                  </span>
                  <span className="rounded-full bg-[#F1F7FF] px-3 py-1.5 text-[#1677FF]">
                    Teaching in {language}
                  </span>
                </div>
              </div>

              <div className="w-fit rounded-full border border-[#CFE0F5] bg-[#EAF3FF] px-4 py-2 text-sm font-bold text-[#1677FF]">Lesson 1</div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(420px,0.75fr)]">
          <div className="min-w-0">
            <AIInstructor
              instructorName={world.instructor}
              world={world.title}
              lessonTitle={requestedTopic}
              language={language}
            />
          </div>

          <aside className="overflow-hidden rounded-[1.5rem] border border-[#D7E3F2] bg-white shadow-[0_16px_45px_rgba(11,23,57,0.06)]">
            <div className="border-b border-[#D7E3F2] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_65%,#EAF3FF_100%)] p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1677FF]">Live Learning Panel</p>
              <h2 className="mt-2 text-xl font-extrabold tracking-[-0.02em]">What your instructor is teaching</h2>
              <p className="mt-2 text-sm leading-6 text-[#53657D]">
                Visual explanations, examples, notes, diagrams, questions, and activities will appear here as the instructor teaches.
              </p>
            </div>

            <div className="max-h-[640px] space-y-4 overflow-y-auto p-5 sm:p-6">
              <div className="rounded-xl border border-[#CFE0F5] bg-[#F1F7FF] p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-white text-[#1677FF]">
                    <Target className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-bold">Lesson Objective</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#53657D]">
                  Understand the foundations of {requestedTopic} and be able to explain the core idea in your own words.
                </p>
              </div>

              <div className="rounded-xl border border-[#D7E3F2] bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#EAF3FF] text-[#1677FF]">
                    <Brain className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-bold">Current Explanation</h3>
                </div>
                <div className="mt-4 rounded-xl bg-[#F8FBFF] p-4">
                  <p className="text-sm leading-7 text-[#53657D]">
                    When the AI instructor begins speaking, the most important concepts will appear here in clear visual form and in your selected teaching language.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#D7E3F2] bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#EAF3FF] text-[#1677FF]">
                    <Lightbulb className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-bold">Visual Example</h3>
                </div>
                <div className="mt-4 flex min-h-[170px] items-center justify-center rounded-xl border border-dashed border-[#CFE0F5] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_60%,#EAF3FF_100%)] p-6 text-center">
                  <div>
                    <p className="font-bold text-[#1677FF]">Interactive visual area</p>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-[#53657D]">
                      Diagrams, equations, charts, code, timelines, whiteboard work, images, and demonstrations can appear here.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#D7E3F2] bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#EAF3FF] text-[#1677FF]">
                    <PencilLine className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-bold">Write This Down</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#53657D]">Important notes the instructor wants you to remember will appear here.</p>
              </div>

              <div className="rounded-xl border border-[#D7E3F2] bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#EAF3FF] text-[#1677FF]">
                    <ListChecks className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-bold">Your Turn</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#53657D]">
                  Practice questions and activities will appear here when your instructor wants you to apply what you just learned.
                </p>
                <button type="button" disabled className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#E8EEF6] px-4 py-2.5 text-sm font-semibold text-[#8A98AA]">
                  Waiting for instructor
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-6 rounded-[1.5rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_12px_35px_rgba(11,23,57,0.05)]">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1677FF]">Lesson Sequence</p>
              <h2 className="mt-1 text-xl font-extrabold">Your Learning Path</h2>
              <p className="mt-1 text-sm text-[#53657D]">Later lessons remain locked until you demonstrate mastery.</p>
            </div>
            <span className="w-fit rounded-full bg-[#EAF3FF] px-4 py-2 text-sm font-bold text-[#1677FF]">Lesson 1 in progress</span>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <div className="rounded-xl border border-[#CFE0F5] bg-[#F1F7FF] p-4">
              <p className="text-xs font-bold text-[#1677FF]">LESSON 1</p>
              <p className="mt-1 font-bold">Foundations</p>
              <p className="mt-2 text-xs text-[#53657D]">Unlocked</p>
            </div>

            {[2, 3, 4].map((lesson) => (
              <div key={lesson} className="rounded-xl border border-[#D7E3F2] bg-[#F8FBFF] p-4 opacity-75">
                <p className="text-xs font-bold text-[#7A8AA0]">LESSON {lesson}</p>
                <p className="mt-1 font-bold">Locked</p>
                <p className="mt-2 text-xs text-[#7A8AA0]">Pass the previous mastery check</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-[#53657D]">
            <CheckCircle2 className="h-4 w-4 text-[#1677FF]" />
            Your AI instructor will test your understanding before unlocking the next lesson.
          </div>
        </section>
      </div>
    </main>
  );
}
