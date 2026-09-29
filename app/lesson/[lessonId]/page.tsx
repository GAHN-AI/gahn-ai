"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Target,
} from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";
import WorldInstructorSession from "@/components/lessons/WorldInstructorSession";
import { lessonIdFromParts } from "@/lib/ai/lessonEngine";
import { getLearningWorldInstructor } from "@/lib/ai/worldInstructors";
import { getCareerSection } from "@/lib/careerCatalog";
import { isLearningWorldAvailable } from "@/lib/learningWorldAvailability";

const worldNames: Record<string, string> = {
  "career-skills": "Career Skills",
  "school-help": "School Help",
  "brain-development": "Brain Development",
  "general-knowledge": "General Knowledge",
  "book-intelligence": "Book Intelligence",
};

export default function LessonPage() {
  const params = useParams<{ lessonId: string }>();
  const searchParams = useSearchParams();

  const worldSlug = searchParams.get("world") || "career-skills";
  const sectionSlug = searchParams.get("section");
  const topicSlug = searchParams.get("topicSlug");

  const topic =
    searchParams.get("topic") ||
    (params.lessonId !== "custom"
      ? params.lessonId
      : "Private Lesson");

  const [language, setLanguage] = useState(
    searchParams.get("language") || "English"
  );

  const worldTitle =
    worldNames[worldSlug] || "Learning World";

  const available =
    isLearningWorldAvailable(worldSlug);

  const instructor = getLearningWorldInstructor(worldSlug);
  const careerSection =
    worldSlug === "career-skills" && sectionSlug
      ? getCareerSection(sectionSlug)
      : null;

  const workspaceSkills =
    careerSection?.skills || [
      "Understand the topic",
      "Work through examples",
      "Practice explaining what you learned",
    ];

  const progressLessonId = useMemo(
    () =>
      lessonIdFromParts(
        worldSlug,
        topicSlug || undefined,
        topic
      ),
    [topic, topicSlug, worldSlug]
  );

  useEffect(() => {
    const stored =
      window.localStorage.getItem("gahn-language");

    if (!searchParams.get("language") && stored) {
      setLanguage(stored);
    }
  }, [searchParams]);

  function changeLanguage(
    nextLanguage: string
  ) {
    setLanguage(nextLanguage);

    window.localStorage.setItem(
      "gahn-language",
      nextLanguage
    );
  }

  const backHref =
    sectionSlug && topicSlug
      ? `/learn/${worldSlug}/${sectionSlug}/${topicSlug}?language=${encodeURIComponent(
          language
        )}`
      : `/learn/${worldSlug}?language=${encodeURIComponent(
          language
        )}`;

  if (!available) {
    return (
      <main className="min-h-screen bg-[#F4F7FB] px-5 py-10 text-black sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/dashboard"
            className="font-black text-[#0B1739]"
          >
            ← Back to Dashboard
          </Link>

          <div className="mt-10 rounded-2xl border border-[#D8E0EA] bg-white p-10 text-center">
            <h1 className="text-3xl font-black text-[#0B1739]">
              This learning world is not
              available yet.
            </h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F7FB] font-sans text-black">
      <header className="border-b border-[#D8E0EA] bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-black text-[#0B1739]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to course
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector
              value={language}
              onChange={changeLanguage}
              compact
            />

            <Link
              href="/"
              className="font-black text-[#0B1739]"
            >
              GAHN AI
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-5 py-6 sm:px-8 lg:py-8">
        <section className="mb-6 rounded-[1.4rem] border border-[#BFD3ED] bg-white p-5 shadow-[0_10px_28px_rgba(11,23,57,0.04)] sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
                {worldTitle}
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-[-0.035em] text-[#0B1739]">
                {topic}
              </h1>

              <p className="mt-2 text-sm font-medium leading-6 text-black">
                Learn with a real-time AI
                instructor and an interactive
                learning workspace.
              </p>
            </div>

            <div className="rounded-full bg-[#EAF3FF] px-4 py-2 text-sm font-black text-[#0B1739]">
              Teaching in {language}
            </div>
          </div>
        </section>

        <section className="grid min-h-[680px] gap-5 xl:grid-cols-[0.88fr_1.12fr]">
          <div className="overflow-hidden rounded-[1.6rem] border border-[#07162F] bg-[#07162F] shadow-[0_18px_48px_rgba(7,22,47,0.16)]">
            <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8DB8FF]">
                  AI Instructor
                </p>

                <p className="mt-1 text-sm font-black text-white">
                  {instructor?.enabled
                    ? `${instructor.name} — ${instructor.role}`
                    : instructor?.role || "AI Instructor"}
                </p>
              </div>

              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-white">
                {instructor?.enabled ? "Live" : "Coming Next"}
              </span>
            </div>

            <WorldInstructorSession
              worldSlug={worldSlug}
              sectionSlug={sectionSlug}
              topicSlug={topicSlug}
              topic={topic}
              lessonId={progressLessonId}
              lessonTitle={topic}
              language={language}
            />
          </div>

          <div className="overflow-hidden rounded-[1.6rem] border border-[#BFD3ED] bg-white shadow-[0_18px_48px_rgba(11,23,57,0.06)]">
            <div className="flex items-center justify-between border-b border-[#D8E0EA] bg-white px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
                  Lesson Workspace
                </p>

                <p className="mt-1 text-sm font-black text-[#0B1739]">
                  {topic}
                </p>
              </div>

              <span className="rounded-full bg-[#EAF3FF] px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#0B1739]">
                Lesson context
              </span>
            </div>

            <div className="min-h-[540px] bg-[#F8FAFD] p-5 sm:p-7">
              <div className="rounded-[1.35rem] border border-[#D8E0EA] bg-white p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                    <Target className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#1677FF]">
                      Current focus
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-[#0B1739]">
                      {topic}
                    </h2>
                    <p className="mt-2 text-sm font-medium leading-7 text-[#52647C]">
                      This workspace is connected to the path you selected so
                      the lesson stays focused on the same career or subject
                      while you learn.
                    </p>
                  </div>
                </div>

                <div className="mt-7 border-t border-[#E1E8F0] pt-6">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#52647C]">
                    Skills in this lesson path
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {workspaceSkills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-start gap-3 rounded-xl bg-[#F4F7FB] px-4 py-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1677FF]" />
                        <span className="text-sm font-bold leading-5 text-[#24344D]">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 border-t border-[#E1E8F0] pt-6">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#52647C]">
                    Learning flow
                  </p>

                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    {[
                      ["01", "Explain", "Break the topic into clear ideas."],
                      ["02", "Practice", "Work through questions and examples."],
                      ["03", "Prove", "Show what you understand before mastery."],
                    ].map(([step, title, text]) => (
                      <div key={step}>
                        <p className="text-xs font-black text-[#1677FF]">{step}</p>
                        <p className="mt-1 text-sm font-black text-[#0B1739]">
                          {title}
                        </p>
                        <p className="mt-1 text-xs font-medium leading-5 text-[#65758A]">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#D8E0EA] bg-white px-4 py-3">
          <GraduationCap className="h-4 w-4 text-[#1677FF]" />

          <p className="text-sm font-bold text-black">
            Opening a lesson does not count as learning. GAHN records the
            lesson only after the instructor actually connects or the learner
            produces real learning activity. Mastery still requires evidence.
          </p>
        </div>
      </div>
    </main>
  );
}