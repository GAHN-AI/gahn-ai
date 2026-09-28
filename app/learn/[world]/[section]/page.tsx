"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  LockKeyhole,
} from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";
import {
  getLearningSection,
  slugifyLearningTitle,
} from "@/lib/learningCatalog";
import { isLearningWorldAvailable } from "@/lib/learningWorldAvailability";

export default function LearningSectionPage() {
  const params = useParams<{ world: string; section: string }>();
  const searchParams = useSearchParams();

  const section = getLearningSection(params.world, params.section);
  const available = isLearningWorldAvailable(params.world);

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

          <section className="mt-10 rounded-[1.6rem] border border-[#D8E0EA] bg-white p-10 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-[#07162F] text-white">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <h1 className="mt-5 text-3xl font-black text-[#0B1739]">
              Not available
            </h1>
            <p className="mt-3 text-sm font-medium leading-6 text-black">
              This learning world is disabled during the current MVP test.
            </p>
          </section>
        </div>
      </main>
    );
  }

  if (params.world !== "school-help" || !section) {
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
          <div className="mt-8 rounded-2xl border border-[#D8E0EA] bg-white p-10 text-center">
            <h1 className="text-3xl font-black text-[#0B1739]">
              Section not found
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
            href={`/learn/school-help?language=${encodeURIComponent(language)}`}
            className="inline-flex items-center gap-2 text-sm font-black text-[#0B1739]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to School Help
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
              <GraduationCap className="h-6 w-6" />
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#8DB8FF]">
              School Help
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-white">
              {section.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-white">
              {section.description}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
              Choose your level
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#0B1739]">
              Pick the level you want the private tutor to teach
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-black">
              No search box and no long lesson preview. Choose a level and move
              straight to the course page.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {section.options.map((option) => (
                <Link
                  key={option.title}
                  href={`/learn/school-help/${section.slug}/${slugifyLearningTitle(
                    option.title
                  )}?language=${encodeURIComponent(language)}`}
                  className="group rounded-[1.3rem] border border-[#D8E0EA] bg-white p-5 hover:border-[#1677FF]"
                >
                  <p className="text-lg font-black text-[#0B1739]">
                    {option.title}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-black">
                    {option.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#1677FF]">
                    Open level
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
