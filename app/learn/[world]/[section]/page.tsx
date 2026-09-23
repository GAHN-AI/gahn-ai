"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Globe2,
  GraduationCap,
  Search,
  Sparkles,
} from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import {
  getLearningSection,
  slugifyLearningTitle,
} from "@/lib/learningCatalog";

const worldInformation: Record<
  string,
  { title: string; Icon: LucideIcon; optionLabel: string }
> = {
  "school-help": {
    title: "School Help",
    Icon: GraduationCap,
    optionLabel: "subject",
  },
  "brain-development": {
    title: "Brain Development",
    Icon: Brain,
    optionLabel: "skill",
  },
  "general-knowledge": {
    title: "General Knowledge",
    Icon: Globe2,
    optionLabel: "topic",
  },
  "book-intelligence": {
    title: "Book Intelligence",
    Icon: BookOpen,
    optionLabel: "learning path",
  },
};

export default function LearningSectionPage() {
  const params = useParams<{ world: string; section: string }>();
  const searchParams = useSearchParams();
  const worldInfo = worldInformation[params.world];
  const section = getLearningSection(params.world, params.section);

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

  const filteredOptions = useMemo(() => {
    if (!section) return [];
    const query = search.trim().toLowerCase();
    if (!query) return section.options;

    return section.options.filter(
      (option) =>
        option.title.toLowerCase().includes(query) ||
        option.description.toLowerCase().includes(query) ||
        option.skills?.some((skill) => skill.toLowerCase().includes(query))
    );
  }, [section, search]);

  if (!worldInfo || !section) {
    return (
      <main className="min-h-screen bg-[#F8FBFF] px-5 py-10 font-sans text-[#0B1739] sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/learn/${params.world}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1677FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learning World
          </Link>

          <div className="mt-10 rounded-[1.5rem] border border-[#D7E3F2] bg-white p-10 text-center">
            <h1 className="text-3xl font-extrabold">Learning section not found</h1>
          </div>
        </div>
      </main>
    );
  }

  const { Icon } = worldInfo;

  return (
    <main className="min-h-screen bg-[#F8FBFF] px-5 py-8 font-sans text-[#0B1739] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/learn/${params.world}?language=${encodeURIComponent(language)}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#53657D] hover:text-[#1677FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {worldInfo.title}
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
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#EAF3FF]"
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#EAF3FF] text-[#1677FF]">
              <Icon className="h-7 w-7" strokeWidth={1.75} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
                {params.world === "school-help"
                  ? "Grade-Level Subjects"
                  : `${worldInfo.title} Section`}
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                {section.title}
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#53657D] sm:text-base">
                {section.description}
              </p>

              <p className="mt-3 text-sm font-semibold text-[#1677FF]">
                Teaching language: {language}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[1.5rem] border border-[#CFE0F5] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_58%,#EAF3FF_100%)] p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[#1677FF] shadow-sm">
              <Sparkles className="h-5 w-5" strokeWidth={1.75} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1677FF]">
                Browse the section
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.02em]">
                Choose a {worldInfo.optionLabel}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#53657D]">
                Open an option to see exactly what you will learn, the skills you
                will build, useful tools or resources, and the learning sequence
                before you enter the AI instructor panel.
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
              placeholder={`Search ${section.title.toLowerCase()}...`}
              className="h-14 w-full rounded-xl border border-[#D7E3F2] bg-white pl-12 pr-4 text-sm text-[#0B1739] outline-none placeholder:text-[#7A8AA0] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
            />
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
                {params.world === "school-help" ? "Subjects" : "Learning Options"}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">
                {params.world === "school-help"
                  ? `Learn ${section.title} subjects`
                  : "Pick what you want to master"}
              </h2>
            </div>

            <p className="text-sm font-semibold text-[#53657D]">
              {filteredOptions.length} option
              {filteredOptions.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredOptions.map((option) => {
              const topicSlug = slugifyLearningTitle(option.title);

              return (
                <Link
                  key={option.title}
                  href={`/learn/${params.world}/${section.slug}/${topicSlug}?language=${encodeURIComponent(
                    language
                  )}`}
                  className="group flex min-h-56 flex-col rounded-[1.4rem] border border-[#D7E3F2] bg-white p-5 shadow-[0_10px_30px_rgba(11,23,57,0.05)] hover:border-[#1677FF]/45 hover:shadow-md"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-[#0B1739]">
                    {option.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-6 text-[#53657D]">
                    {option.description}
                  </p>

                  {option.skills && option.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {option.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-[#F1F7FF] px-3 py-1 text-[11px] font-semibold text-[#53657D]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1677FF]">
                    View what you&apos;ll learn
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>

          {!filteredOptions.length && (
            <div className="mt-6 rounded-[1.5rem] border border-dashed border-[#D7E3F2] bg-white p-8 text-center text-sm text-[#53657D]">
              No matching options. Try another search.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
