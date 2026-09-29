"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";
import { getCareerSection } from "@/lib/careerCatalog";

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
              Career path not found
            </h1>
          </div>
        </div>
      </main>
    );
  }

  const lessonHref = `/lesson/custom?world=career-skills&section=${encodeURIComponent(
    careerSection.slug
  )}&topic=${encodeURIComponent(careerSection.title)}&topicSlug=${encodeURIComponent(
    careerSection.slug
  )}&language=${encodeURIComponent(language)}`;

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

      <section className="bg-[#07162F] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8DB8FF]">
              {careerSection.category} · {careerSection.pathLabel}
            </p>

            <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              {careerSection.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/90">
              {careerSection.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {careerSection.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href={lessonHref}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black text-[#07162F]"
              >
                Start with Maya
                <ArrowRight className="h-4 w-4" />
              </Link>

              <span className="text-sm font-bold text-white/75">
                {careerSection.level} · Taught by Maya
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/10 p-2 shadow-[0_24px_50px_rgba(0,0,0,0.22)]">
            <img
              src={careerSection.imageUrl}
              alt=""
              className="h-[320px] w-full rounded-[1.1rem] object-cover sm:h-[380px]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
            What this path teaches
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] text-[#0B1739]">
            Learn the work, not just the job title
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[#33455F]">
            Maya stays the same Career Skills instructor across every career
            section. GAHN keeps the career you selected attached to the lesson
            record, practice, and progress so one instructor can serve the
            entire Career Skills learning world.
          </p>

          <div className="mt-7 divide-y divide-[#E1E8F0] border-y border-[#E1E8F0]">
            {careerSection.skills.map((skill, index) => (
              <div
                key={skill}
                className="flex items-start gap-4 py-5"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EAF3FF] text-[#1677FF]">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#0B1739]">
                    {skill}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-6 text-[#52647C]">
                    This skill becomes part of the lesson context, practice,
                    questions, and examples used in the private learning
                    session.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-[1.4rem] border border-[#D8E0EA] bg-white p-6 shadow-[0_12px_30px_rgba(11,23,57,0.05)] lg:sticky lg:top-6">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
            <Briefcase className="h-5 w-5" />
          </div>

          <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-[#1677FF]">
            Private career lesson
          </p>
          <h2 className="mt-2 text-xl font-black text-[#0B1739]">
            One instructor, career-specific teaching
          </h2>
          <p className="mt-3 text-sm font-medium leading-6 text-[#52647C]">
            Maya is the Career Skills instructor across this learning world.
            Your selected career stays connected to the lesson record and
            learning progress instead of creating a different avatar for every
            career.
          </p>

          <Link
            href={lessonHref}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1739] px-5 py-3.5 text-sm font-black text-white"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </section>
    </main>
  );
}
