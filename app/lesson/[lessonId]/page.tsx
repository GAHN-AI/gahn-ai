"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  CirclePlay,
  LockKeyhole,
} from "lucide-react";

import LearningStudio from "@/components/lessons/LearningStudio";
import LanguageSelector from "@/components/LanguageSelector";
import { getCareerSection } from "@/lib/careerCatalog";
import { getLearningSection } from "@/lib/learningCatalog";
import { getMvpLearningPath } from "@/lib/mvpLearningPaths";

const worldInformation = {
  "career-skills": { title: "Career Skills", instructor: "Maya" },
  "school-help": { title: "School Help", instructor: "AI Instructor" },
  "brain-development": { title: "Brain Development", instructor: "AI Instructor" },
  "general-knowledge": { title: "General Knowledge", instructor: "AI Instructor" },
  "book-intelligence": { title: "Book Intelligence", instructor: "AI Instructor" },
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
  const learningSection = searchParams.get("section");
  const topicSlug = searchParams.get("topicSlug");

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

  const learningSectionTitle = learningSection
    ? resolvedWorldSlug === "career-skills"
      ? getCareerSection(learningSection)?.title
      : getLearningSection(resolvedWorldSlug, learningSection)?.title
    : undefined;

  const learningPath =
    learningSectionTitle
      ? getMvpLearningPath(
          resolvedWorldSlug,
          learningSectionTitle,
          requestedTopic
        )
      : null;

  const courseSections = learningPath?.sections ?? [];
  const currentLesson = courseSections[0]?.lessons[0] || requestedTopic;

  const backHref =
    learningSection && topicSlug
      ? `/learn/${resolvedWorldSlug}/${encodeURIComponent(
          learningSection
        )}/${encodeURIComponent(topicSlug)}?language=${encodeURIComponent(language)}`
      : learningSection
        ? `/learn/${resolvedWorldSlug}/${encodeURIComponent(
            learningSection
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
            Back to {topicSlug ? "learning path" : learningSection ? "section options" : world.title}
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
                    Progress is saved from real lesson activity and mastery evidence.
                  </span>
                  <span className="rounded-full bg-[#F1F7FF] px-3 py-1.5 text-[#1677FF]">
                    Teaching in {language}
                  </span>
                </div>
              </div>

              <div className="w-fit rounded-full border border-[#CFE0F5] bg-[#EAF3FF] px-4 py-2 text-sm font-bold text-[#1677FF]">
                {courseSections.length ? "Section 1 · Lesson 1" : "Lesson 1"}
              </div>
            </div>
          </div>
        </section>

        <LearningStudio
          worldSlug={resolvedWorldSlug}
          worldTitle={world.title}
          sectionSlug={learningSection}
          sectionTitle={learningSectionTitle}
          topicSlug={topicSlug}
          topic={requestedTopic}
          lessonTitle={currentLesson}
          lessonPoints={courseSections[0]?.lessons ?? [currentLesson]}
          instructorName={world.instructor}
          language={language}
        />

        <section className="mt-6 rounded-[1.5rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_12px_35px_rgba(11,23,57,0.05)]">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1677FF]">Lesson Sequence</p>
              <h2 className="mt-1 text-xl font-extrabold">Your Learning Path</h2>
              <p className="mt-1 text-sm text-[#53657D]">Later lessons remain locked until you demonstrate mastery.</p>
            </div>
            <span className="w-fit rounded-full bg-[#EAF3FF] px-4 py-2 text-sm font-bold text-[#1677FF]">
              {courseSections.length
                ? `${courseSections.length} course sections`
                : "Lesson 1 in progress"}
            </span>
          </div>

          {courseSections.length ? (
            <div className="mt-5 overflow-hidden rounded-2xl border border-[#D7E3F2] bg-white">
              {courseSections.map((courseSection, sectionIndex) => (
                <details
                  key={`${courseSection.title}-${sectionIndex}`}
                  open={sectionIndex === 0}
                  className="group border-b border-[#E7EDF5] last:border-b-0"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-[#FBFCFE] p-5 hover:bg-[#F5F8FC]">
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1677FF]">
                        Section {sectionIndex + 1}
                      </p>
                      <h3 className="mt-1 font-bold text-[#0B1739]">
                        {courseSection.title}
                      </h3>
                      <p className="mt-1 max-w-3xl text-xs leading-5 text-[#53657D]">
                        {courseSection.description}
                      </p>
                      <p className="mt-2 text-xs font-semibold text-[#1677FF]">
                        {courseSection.lessons.length} lessons
                      </p>
                    </div>
                    <ChevronDown className="h-5 w-5 shrink-0 text-[#53657D] transition-transform group-open:rotate-180" />
                  </summary>

                  <div className="border-t border-[#E7EDF5]">
                    {courseSection.lessons.map((lessonTitle, lessonIndex) => {
                      const isCurrent = sectionIndex === 0 && lessonIndex === 0;

                      return (
                        <div
                          key={`${lessonTitle}-${lessonIndex}`}
                          className={`flex items-start justify-between gap-4 border-b border-[#EEF2F7] px-5 py-4 last:border-b-0 sm:pl-8 ${
                            isCurrent ? "bg-[#F1F7FF]" : "bg-white"
                          }`}
                        >
                          <div className="flex min-w-0 items-start gap-3">
                            {isCurrent ? (
                              <CirclePlay
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#1677FF]"
                                strokeWidth={1.8}
                              />
                            ) : (
                              <LockKeyhole
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#93A1B3]"
                                strokeWidth={1.8}
                              />
                            )}

                            <div className="min-w-0">
                              <p
                                className={`text-sm font-semibold ${
                                  isCurrent ? "text-[#0B1739]" : "text-[#40536D]"
                                }`}
                              >
                                {lessonTitle}
                              </p>
                              <p className="mt-1 text-xs text-[#7A8AA0]">
                                {isCurrent
                                  ? "Current lesson"
                                  : "Unlock after earlier mastery checks"}
                              </p>
                            </div>
                          </div>

                          <span className="shrink-0 text-xs font-semibold text-[#7A8AA0]">
                            {lessonIndex + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-[#CFE0F5] bg-[#F1F7FF] p-4">
              <p className="text-xs font-bold text-[#1677FF]">LESSON 1</p>
              <p className="mt-1 font-bold">{requestedTopic}</p>
              <p className="mt-2 text-xs text-[#53657D]">Unlocked</p>
            </div>
          )}

          <div className="mt-5 flex items-center gap-2 text-sm text-[#53657D]">
            <CheckCircle2 className="h-4 w-4 text-[#1677FF]" />
            Your AI instructor will test your understanding before unlocking the next lesson.
          </div>
        </section>
      </div>
    </main>
  );
}
