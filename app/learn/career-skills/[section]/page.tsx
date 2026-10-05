"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
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
      <main className="min-h-screen bg-[#F7F8FA] px-5 py-10 font-sans text-[#1D1E24] sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/learn/career-skills"
            className="inline-flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Career Skills
          </Link>
          <div className="mt-8 rounded-[14px] border border-[#E1E3E8] bg-white p-10 text-center">
            <h1 className="text-3xl font-semibold">Career path not found</h1>
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
    <main className="min-h-screen bg-[#F7F8FA] font-sans text-[#1D1E24]">
      <header className="border-b border-[#E7E7EA] bg-white">
        <div className="mx-auto flex min-h-[68px] max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href={`/learn/career-skills?language=${encodeURIComponent(language)}`}
            className="inline-flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Career Skills
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector value={language} onChange={changeLanguage} compact />
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-[#0B1739]">
              <img src="/logo/favicon.png" alt="" className="h-7 w-7 rounded-full object-cover" />
              GAHN AI
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-5 py-9 sm:px-8 lg:py-12">
        <section className="grid gap-7 overflow-hidden rounded-[16px] border border-[#E1E3E8] bg-white p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF2FF] text-[#0B5CFF]">
                <BriefcaseBusiness className="h-5 w-5" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
                {careerSection.category}
              </p>
            </div>

            <h1 className="mt-5 text-[34px] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[40px]">
              {careerSection.title}
            </h1>
            <p className="mt-4 max-w-[690px] text-[15px] leading-7 text-[#34363D]">
              {careerSection.description}
            </p>
            <p className="mt-4 text-sm font-medium text-[#5C5E66]">
              {careerSection.level}
            </p>

            <Link
              href={lessonHref}
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0B5CFF] px-5 text-sm font-semibold text-white transition hover:bg-[#094FD9]"
            >
              Start private lesson
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <img
            src={careerSection.imageUrl}
            alt=""
            className="h-[250px] w-full rounded-[12px] object-cover"
          />
        </section>

        <section className="mt-8 rounded-[16px] border border-[#E1E3E8] bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
            Practical skills
          </p>
          <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.03em]">
            What this career path can teach
          </h2>
          <p className="mt-3 max-w-[760px] text-[14px] leading-6 text-[#3C3E45]">
            These skills become lesson topics, examples, questions, and practice inside the Career Skills instructor workspace.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {careerSection.skills.map((skill) => (
              <div
                key={skill}
                className="flex items-start gap-3 rounded-[12px] border border-[#E7E7EA] bg-[#FAFAFB] p-4"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0B5CFF]" />
                <p className="text-[14px] font-medium text-[#1D1E24]">{skill}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
