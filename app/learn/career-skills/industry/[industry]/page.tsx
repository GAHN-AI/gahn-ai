"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, BriefcaseBusiness } from "lucide-react";

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
            <h1 className="text-3xl font-semibold">Career section not found</h1>
          </div>
        </div>
      </main>
    );
  }

  const careers = getCareersByIndustry(industry.title);

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
        <section className="grid gap-7 overflow-hidden rounded-[16px] border border-[#E1E3E8] bg-white p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF2FF] text-[#0B5CFF]">
                <BriefcaseBusiness className="h-5 w-5" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
                Career Skills
              </p>
            </div>

            <h1 className="mt-5 text-[34px] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[40px]">
              {industry.displayTitle}
            </h1>
            <p className="mt-4 max-w-[690px] text-[15px] leading-7 text-[#34363D]">
              {industry.description}
            </p>
            <p className="mt-4 text-sm font-medium text-[#0B5CFF]">
              {careers.length} career paths
            </p>
          </div>

          <img
            src={industry.imageUrl}
            alt=""
            className="w-full rounded-[12px] object-cover"
            style={{ height: 210, maxHeight: 210 }}
          />
        </section>

        <section className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
            Career paths
          </p>
          <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.03em]">
            Choose a job to explore
          </h2>
          <p className="mt-3 max-w-[720px] text-[14px] leading-6 text-[#3C3E45]">
            Open a role to see the work, practical skills, and private lesson for that career.
          </p>

          <div className="mt-6 grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
            {careers.map((career) => (
              <Link
                key={career.slug}
                href={`/learn/career-skills/${career.slug}?language=${encodeURIComponent(language)}`}
                className="group self-start overflow-hidden rounded-[14px] border border-[#E1E3E8] bg-white transition hover:-translate-y-0.5 hover:border-[#BDD3F7] hover:shadow-[0_12px_28px_rgba(29,30,36,0.07)]"
              >
                <img
                  src={career.imageUrl}
                  alt=""
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
                  style={{ height: 180, maxHeight: 180 }}
                />

                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B5CFF]">
                    {career.pathLabel}
                  </p>
                  <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.02em]">
                    {career.title}
                  </h3>
                  <p className="mt-2 min-h-[72px] text-[13px] leading-6 text-[#3C3E45]">
                    {career.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#EEEEF1] pt-4">
                    <span className="text-sm font-semibold text-[#0B5CFF]">
                      Explore career
                    </span>
                    <ArrowRight className="h-4 w-4 text-[#0B5CFF] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
