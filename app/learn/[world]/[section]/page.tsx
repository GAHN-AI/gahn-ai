"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Globe2,
  GraduationCap,
} from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";
import {
  getLearningSection,
  slugifyLearningTitle,
} from "@/lib/learningCatalog";
import { isLearningWorldAvailable } from "@/lib/learningWorldAvailability";

const worldMeta = {
  "school-help": { title: "School Help", Icon: GraduationCap },
  "brain-development": { title: "Brain Development", Icon: Brain },
  "general-knowledge": { title: "General Knowledge", Icon: Globe2 },
  "book-intelligence": { title: "Book Intelligence", Icon: BookOpen },
} as const;

export default function LearningSectionPage() {
  const params = useParams<{ world: string; section: string }>();
  const searchParams = useSearchParams();

  const section = getLearningSection(params.world, params.section);
  const available = isLearningWorldAvailable(params.world);
  const meta = worldMeta[params.world as keyof typeof worldMeta];

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

  if (!available || !section || !meta) {
    return (
      <main className="min-h-screen bg-[#F7F8FA] px-5 py-10 font-sans text-[#1D1E24] sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/learn/${params.world}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1E24]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to learning world
          </Link>

          <div className="mt-8 rounded-[14px] border border-[#E1E3E8] bg-white p-10 text-center">
            <h1 className="text-3xl font-semibold">
              {!available ? "Learning world unavailable" : "Learning path not found"}
            </h1>
          </div>
        </div>
      </main>
    );
  }

  const Icon = meta.Icon;
  const isSchool = params.world === "school-help";

  return (
    <main className="min-h-screen bg-[#F7F8FA] font-sans text-[#1D1E24]">
      <header className="border-b border-[#E7E7EA] bg-white">
        <div className="mx-auto flex min-h-[68px] max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href={`/learn/${params.world}?language=${encodeURIComponent(language)}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1E24]"
          >
            <ArrowLeft className="h-4 w-4" />
            {meta.title}
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
        <section className="grid gap-7 overflow-hidden rounded-[16px] border border-[#E1E3E8] bg-white p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF2FF] text-[#0B5CFF]">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
                {meta.title}
              </p>
            </div>
            <h1 className="mt-5 text-[34px] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[40px]">
              {section.title}
            </h1>
            <p className="mt-4 max-w-[690px] text-[15px] leading-7 text-[#34363D]">
              {section.description}
            </p>
          </div>

          <img
            src={section.imageUrl}
            alt=""
            className="h-[220px] w-full rounded-[12px] object-cover"
          />
        </section>

        {isSchool ? (
          <section className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
              Grade level
            </p>
            <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.03em]">
              Choose the level you want to study
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {section.options.map((option) => (
                <Link
                  key={option.title}
                  href={`/learn/school-help/${section.slug}/${slugifyLearningTitle(
                    option.title
                  )}?language=${encodeURIComponent(language)}`}
                  className="group rounded-[14px] border border-[#E1E3E8] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#BDD3F7] hover:shadow-[0_10px_24px_rgba(29,30,36,0.05)]"
                >
                  <p className="text-[17px] font-semibold">{option.title}</p>
                  <p className="mt-2 text-[13px] leading-5 text-[#4F515A]">
                    {option.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#0B5CFF]">
                    Open level
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-8 rounded-[16px] border border-[#E1E3E8] bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
              Private lesson
            </p>
            <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.03em]">
              Learn {section.title.toLowerCase()} with the GAHN AI instructor
            </h2>
            <p className="mt-3 max-w-[720px] text-[14px] leading-6 text-[#3C3E45]">
              The lesson will teach the concept, ask you to respond, check what you understand, explain weak points differently, and give you practice before moving on.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {section.options.map((option) => (
                <Link
                  key={option.title}
                  href={`/learn/${params.world}/${section.slug}/${slugifyLearningTitle(
                    option.title
                  )}?language=${encodeURIComponent(language)}`}
                  className="group flex items-center justify-between gap-5 rounded-[14px] border border-[#E1E3E8] bg-[#FAFAFB] p-5 transition hover:border-[#BDD3F7]"
                >
                  <div>
                    <p className="text-[17px] font-semibold">{option.title}</p>
                    <p className="mt-2 text-[13px] leading-5 text-[#4F515A]">
                      {option.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#0B5CFF] transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
