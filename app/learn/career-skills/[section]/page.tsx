"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Briefcase } from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";
import { getCareerSection } from "@/lib/careerCatalog";
import { slugifyLearningTitle } from "@/lib/learningCatalog";

export default function CareerSectionPage() {
  const params = useParams<{ section: string }>();
  const searchParams = useSearchParams();
  const careerSection = getCareerSection(params.section);

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

  if (!careerSection) {
    return (
      <main className="min-h-screen bg-[#F4F7FB] px-5 py-10 text-black sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/learn/career-skills"
            className="inline-flex items-center gap-2 text-sm font-black text-[#0B1739]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Career Skills
          </Link>
          <div className="mt-8 rounded-2xl border border-[#D8E0EA] bg-white p-10 text-center">
            <h1 className="text-3xl font-black text-[#0B1739]">
              Career section not found
            </h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F7FB] px-5 py-8 font-sans text-black sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/learn/career-skills?language=${encodeURIComponent(language)}`}
            className="inline-flex items-center gap-2 text-sm font-black text-[#0B1739]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Career Skills
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector value={language} onChange={changeLanguage} compact />
            <Link href="/" className="font-black text-[#0B1739]">
              GAHN AI
            </Link>
          </div>
        </div>

        <section className="mt-8 overflow-hidden rounded-[1.75rem] border border-[#BFD3ED] bg-white shadow-[0_18px_48px_rgba(11,23,57,0.06)]">
          <div className="bg-[#07162F] p-7 text-white sm:p-9">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#07162F]">
              <Briefcase className="h-6 w-6" />
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#8DB8FF]">
              Career Skills
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-white">
              {careerSection.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-white">
              {careerSection.description}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
              Available course
            </p>

            <div className="mt-4 grid gap-4">
              {careerSection.lessons.map((lesson) => (
                <Link
                  key={lesson.title}
                  href={`/learn/career-skills/${careerSection.slug}/${slugifyLearningTitle(
                    lesson.title
                  )}?language=${encodeURIComponent(language)}`}
                  className="group flex flex-col justify-between gap-5 rounded-[1.35rem] border border-[#D8E0EA] bg-white p-5 sm:flex-row sm:items-center"
                >
                  <div>
                    <h2 className="text-xl font-black text-[#0B1739]">
                      {lesson.title}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-black">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="inline-flex shrink-0 items-center gap-2 text-sm font-black text-[#1677FF]">
                    Open course
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
