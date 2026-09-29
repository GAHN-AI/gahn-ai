"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  GraduationCap,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";
import { getCareerSection } from "@/lib/careerCatalog";
import {
  getLearningOption,
  slugifyLearningTitle,
  type LearningOption,
} from "@/lib/learningCatalog";
import { isLearningWorldAvailable } from "@/lib/learningWorldAvailability";

export default function TopicOverviewPage() {
  const params = useParams<{ world: string; section: string; topic: string }>();
  const searchParams = useSearchParams();

  const [language, setLanguage] = useState(
    searchParams.get("language") || "English"
  );

  useEffect(() => {
    const stored = window.localStorage.getItem("gahn-language");
    if (!searchParams.get("language") && stored) {
      setLanguage(stored);
    }
  }, [searchParams]);

  function changeLanguage(nextLanguage: string) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("gahn-language", nextLanguage);
  }

  const resolved = useMemo(() => {
    if (params.world === "career-skills") {
      const section = getCareerSection(params.section);
      if (!section) return null;

      const topic = section.lessons.find(
        (lesson) => slugifyLearningTitle(lesson.title) === params.topic
      );

      if (!topic) return null;

      return {
        sectionTitle: section.title,
        title: topic.title,
        description: topic.description,
        option: undefined as LearningOption | undefined,
      };
    }

    const found = getLearningOption(params.world, params.section, params.topic);
    if (!found) return null;

    return {
      sectionTitle: found.section.title,
      title: found.option.title,
      description: found.option.description,
      option: found.option,
    };
  }, [params.section, params.topic, params.world]);

  const available = isLearningWorldAvailable(params.world);

  if (!available) {
    return (
      <main className="min-h-screen bg-[#F4F7FB] px-5 py-8 text-black sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-black text-[#0B1739]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="mt-10 rounded-[1.6rem] border border-[#D8E0EA] bg-white p-10 text-center">
            <LockKeyhole className="mx-auto h-7 w-7 text-[#0B1739]" />
            <h1 className="mt-4 text-3xl font-black text-[#0B1739]">
              Not available
            </h1>
            <p className="mt-3 text-sm font-medium text-black">
              This learning world is disabled during the current MVP test.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!resolved) {
    return (
      <main className="min-h-screen bg-[#F4F7FB] px-5 py-8 text-black sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/learn/${params.world}`}
            className="inline-flex items-center gap-2 text-sm font-black text-[#0B1739]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learning World
          </Link>
          <div className="mt-10 rounded-[1.6rem] border border-[#D8E0EA] bg-white p-10 text-center">
            <h1 className="text-3xl font-black text-[#0B1739]">
              Course not found
            </h1>
          </div>
        </div>
      </main>
    );
  }

  const isCareer = params.world === "career-skills";
  const Icon = isCareer ? Briefcase : GraduationCap;
  const instructorName = isCareer ? "Maya" : "GAHN School Tutor";

  const startHref = `/lesson/custom?world=${encodeURIComponent(
    params.world
  )}&section=${encodeURIComponent(params.section)}&topic=${encodeURIComponent(
    resolved.title
  )}&topicSlug=${encodeURIComponent(params.topic)}&language=${encodeURIComponent(
    language
  )}`;

  return (
    <main className="min-h-screen bg-[#F4F7FB] px-5 py-8 font-sans text-black sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={
              isCareer
                ? `/learn/career-skills?language=${encodeURIComponent(language)}`
                : `/learn/school-help/${params.section}?language=${encodeURIComponent(
                    language
                  )}`
            }
            className="inline-flex items-center gap-2 text-sm font-black text-[#0B1739]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector value={language} onChange={changeLanguage} compact />
            <Link href="/" className="font-black text-[#0B1739]">
              GAHN AI
            </Link>
          </div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#BFD3ED] bg-white shadow-[0_18px_48px_rgba(11,23,57,0.06)]">
            <div className="bg-[#07162F] p-7 text-white sm:p-9">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#07162F]">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#8DB8FF]">
                {isCareer ? "Career Skills" : "School Help"} · {resolved.sectionTitle}
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-white">
                {resolved.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-white">
                {resolved.description}
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
                How your lesson works
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#0B1739]">
                Learn this topic with a private AI instructor
              </h2>
              <p className="mt-3 text-sm font-medium leading-7 text-[#33455F]">
                Your instructor uses the topic you selected as the lesson context,
                teaches it in conversation, asks questions, and builds practice
                around what you are learning.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ["1", "Meet your instructor"],
                  ["2", "Learn through conversation"],
                  ["3", "Practice and check understanding"],
                ].map(([step, label]) => (
                  <div
                    key={step}
                    className="rounded-xl border border-[#D8E0EA] bg-[#F4F7FB] p-4"
                  >
                    <p className="text-xs font-black text-[#1677FF]">STEP {step}</p>
                    <p className="mt-2 text-sm font-black text-black">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-[#0B1739] bg-white p-6 shadow-[0_18px_48px_rgba(11,23,57,0.08)] lg:sticky lg:top-6 lg:self-start">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
              Private lesson
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#0B1739]">
              Learn with {instructorName}
            </h2>

            <div className="mt-5 grid gap-3">
              <div className="rounded-xl bg-[#F4F7FB] p-4">
                <p className="text-xs font-black uppercase tracking-[0.08em] text-black">
                  Language
                </p>
                <p className="mt-1 text-sm font-black text-[#0B1739]">
                  {language}
                </p>
              </div>
              <div className="rounded-xl bg-[#F4F7FB] p-4">
                <p className="text-xs font-black uppercase tracking-[0.08em] text-black">
                  Session layout
                </p>
                <p className="mt-1 text-sm font-black text-[#0B1739]">
                  AI instructor + learning panel
                </p>
              </div>
            </div>

            <Link
              href={startHref}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1739] px-5 py-3.5 text-sm font-black text-white"
            >
              Start Private Lesson
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}
