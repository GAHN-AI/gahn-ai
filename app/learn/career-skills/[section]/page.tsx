"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Search,
  Sparkles,
} from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { getCareerSection } from "@/lib/careerCatalog";

export default function CareerSectionPage() {
  const params = useParams<{ section: string }>();
  const searchParams = useSearchParams();
  const careerSection = getCareerSection(params.section);
  const [search, setSearch] = useState("");
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

  const filteredLessons = useMemo(() => {
    if (!careerSection) return [];
    const query = search.trim().toLowerCase();
    if (!query) return careerSection.lessons;

    return careerSection.lessons.filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(query) ||
        lesson.description.toLowerCase().includes(query)
    );
  }, [careerSection, search]);

  if (!careerSection) {
    return (
      <main className="min-h-screen bg-[#F8FBFF] px-5 py-10 font-sans text-[#0B1739] sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/learn/career-skills"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1677FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Career Skills
          </Link>
          <div className="mt-10 rounded-[1.5rem] border border-[#D7E3F2] bg-white p-10 text-center">
            <h1 className="text-3xl font-extrabold">Career section not found</h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FBFF] px-5 py-8 font-sans text-[#0B1739] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/learn/career-skills?language=${encodeURIComponent(language)}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#53657D] hover:text-[#1677FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Career Skills
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector value={language} onChange={changeLanguage} compact />
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo/favicon.png"
                alt="GAHN AI"
                className="h-9 w-9 rounded-full object-cover"
              />
              <span className="hidden text-sm font-extrabold sm:block">GAHN AI</span>
            </Link>
          </div>
        </div>

        <section className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_18px_55px_rgba(11,23,57,0.07)] sm:p-8 lg:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#EAF3FF]" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#EAF3FF] text-[#1677FF]">
              <Briefcase className="h-7 w-7" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">Career Section</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                {careerSection.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#53657D] sm:text-base">
                {careerSection.description}
              </p>
              <p className="mt-3 text-sm font-semibold text-[#1677FF]">Teaching language: {language}</p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[1.5rem] border border-[#CFE0F5] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_58%,#EAF3FF_100%)] p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[#1677FF] shadow-sm">
              <Sparkles className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1677FF]">Choose what to learn</p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.02em]">Pick a career or skill path</h2>
              <p className="mt-2 text-sm leading-6 text-[#53657D]">
                Choose one option below. It opens the same AI learning panel you already use, with Alex teaching that specific path in {language}.
              </p>
            </div>
          </div>

          <div className="relative mt-6">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7A8AA0]"
              strokeWidth={1.75}
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Search ${careerSection.title.toLowerCase()}...`}
              className="h-14 w-full rounded-xl border border-[#D7E3F2] bg-white pl-12 pr-4 text-sm text-[#0B1739] outline-none placeholder:text-[#7A8AA0] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
            />
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">Career Paths</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">
                Learn a specific path
              </h2>
            </div>
            <p className="text-sm font-semibold text-[#53657D]">
              {filteredLessons.length} option{filteredLessons.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredLessons.map((lesson) => (
              <Link
                key={lesson.title}
                href={`/lesson/custom?world=career-skills&section=${encodeURIComponent(
                  careerSection.slug
                )}&topic=${encodeURIComponent(lesson.title)}&language=${encodeURIComponent(language)}`}
                className="group flex min-h-48 flex-col rounded-[1.4rem] border border-[#D7E3F2] bg-white p-5 shadow-[0_10px_30px_rgba(11,23,57,0.05)] hover:border-[#1677FF]/45 hover:shadow-md"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                  <Briefcase className="h-4.5 w-4.5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#0B1739]">{lesson.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#53657D]">{lesson.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#1677FF]">
                  Start this lesson
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          {!filteredLessons.length && (
            <div className="mt-6 rounded-[1.5rem] border border-dashed border-[#D7E3F2] bg-white p-8 text-center text-sm text-[#53657D]">
              No matching career paths. Try another search.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
