"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Briefcase } from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";
import {
  getCareerIndustry,
  getCareersByIndustry,
} from "@/lib/careerCatalog";

export default function CareerIndustryPage() {
  const params = useParams<{ industry: string }>();
  const searchParams = useSearchParams();
  const industry = getCareerIndustry(params.industry);

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

  if (!industry) {
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

  const careers = getCareersByIndustry(industry.title);

  return (
    <main className="min-h-screen bg-[#F4F7FB] font-sans text-black">
      <header className="border-b border-[#D8E0EA] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            href={`/learn/career-skills?language=${encodeURIComponent(language)}`}
            className="inline-flex items-center gap-2 text-sm font-black text-[#0B1739]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Career Skills
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector
              value={language}
              onChange={changeLanguage}
              compact
            />
            <Link href="/" className="font-black text-[#0B1739]">
              GAHN AI
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b border-[#BFD3ED] bg-[#07162F] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#07162F]">
              <Briefcase className="h-6 w-6" />
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#8DB8FF]">
              Career Skills
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              {industry.displayTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-white/90">
              {industry.description}
            </p>
            <p className="mt-4 text-sm font-black text-[#8DB8FF]">
              {careers.length} careers in this section
            </p>
          </div>

          <img
            src={industry.imageUrl}
            alt=""
            className="h-64 w-full rounded-[1.4rem] object-cover lg:h-72"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-9 sm:px-8">
        <div className="rounded-[1.4rem] border border-[#D8E0EA] bg-white p-6 shadow-[0_12px_30px_rgba(11,23,57,0.05)] sm:p-7">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
            Skills and tools you will learn
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] text-[#0B1739]">
            Build specific skills for this industry
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[#33455F]">
            These are the concrete concepts and tools GAHN can teach across the
            careers in this section.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {industry.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[#E8EEF7] px-3.5 py-2 text-sm font-bold text-[#1D2C44]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
          Career topics
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] text-[#0B1739]">
          Choose a job to explore
        </h2>
        <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-[#33455F]">
          Each job opens its own learning path with the skills and knowledge used
          in that career.
        </p>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {careers.map((career) => (
            <Link
              key={career.slug}
              href={`/learn/career-skills/${career.slug}?language=${encodeURIComponent(language)}`}
              className="group overflow-hidden rounded-[1.35rem] border border-[#D8E0EA] bg-white shadow-[0_12px_30px_rgba(11,23,57,0.05)] hover:border-[#9CC4F7]"
            >
              <img
                src={career.imageUrl}
                alt=""
                className="h-44 w-full object-cover"
              />

              <div className="p-5">
                <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#1677FF]">
                  {career.pathLabel}
                </p>
                <h3 className="mt-2 text-xl font-black text-[#0B1739]">
                  {career.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-6 text-[#33455F]">
                  {career.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {career.skills.slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[#F1F5FA] px-2.5 py-1 text-xs font-bold text-[#25364F]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-black text-[#1677FF]">
                    Explore career
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#1677FF]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
