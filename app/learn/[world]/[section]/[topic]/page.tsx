"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Globe2,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";
import { getCareerSection } from "@/lib/careerCatalog";
import {
  getLearningOption,
  type LearningOption,
} from "@/lib/learningCatalog";
import { isLearningWorldAvailable } from "@/lib/learningWorldAvailability";

const worldMeta = {
  "career-skills": { title: "Career Skills", Icon: BriefcaseBusiness },
  "school-help": { title: "School Help", Icon: GraduationCap },
  "brain-development": { title: "Brain Development", Icon: Brain },
  "general-knowledge": { title: "General Knowledge", Icon: Globe2 },
  "book-intelligence": { title: "Book Intelligence", Icon: BookOpen },
} as const;

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

      return {
        sectionTitle: section.category,
        title: section.title,
        description: section.description,
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
  const meta = worldMeta[params.world as keyof typeof worldMeta];

  if (!available || !resolved || !meta) {
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
              {!available ? "Learning world unavailable" : "Lesson not found"}
            </h1>
          </div>
        </div>
      </main>
    );
  }

  const Icon = meta.Icon;
  const isSchool = params.world === "school-help";
  const isCareer = params.world === "career-skills";

  const backHref = isCareer
    ? `/learn/career-skills/${params.section}?language=${encodeURIComponent(language)}`
    : isSchool
      ? `/learn/school-help/${params.section}?language=${encodeURIComponent(language)}`
      : `/learn/${params.world}/${params.section}?language=${encodeURIComponent(language)}`;

  const startHref = `/lesson/custom?world=${encodeURIComponent(
    params.world
  )}&section=${encodeURIComponent(params.section)}&topic=${encodeURIComponent(
    resolved.title
  )}&topicSlug=${encodeURIComponent(params.topic)}&language=${encodeURIComponent(
    language
  )}`;

  return (
    <main className="min-h-screen bg-[#F7F8FA] font-sans text-[#1D1E24]">
      <header className="border-b border-[#E7E7EA] bg-white">
        <div className="mx-auto flex min-h-[68px] max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1E24]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
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
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="rounded-[16px] border border-[#E1E3E8] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF2FF] text-[#0B5CFF]">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
                {meta.title} · {resolved.sectionTitle}
              </p>
            </div>

            <h1 className="mt-5 text-[34px] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[40px]">
              {resolved.title}
            </h1>
            <p className="mt-4 max-w-[720px] text-[15px] leading-7 text-[#34363D]">
              {resolved.description}
            </p>

            <div className="mt-8 border-t border-[#EEEEF1] pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
                How the lesson works
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  "The instructor teaches the concept clearly.",
                  "You answer questions so GAHN can check understanding.",
                  "Weak points are taught again before more practice.",
                ].map((label) => (
                  <div
                    key={label}
                    className="flex gap-3 rounded-[12px] border border-[#E1E3E8] bg-[#FAFAFB] p-4"
                  >
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0B5CFF]" />
                    <p className="text-[13px] leading-5 text-[#303239]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-[16px] border border-[#E1E3E8] bg-white p-6 lg:sticky lg:top-6">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF2FF] text-[#0B5CFF]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
              Private AI lesson
            </p>
            <h2 className="mt-2 text-xl font-semibold">
              Start this lesson
            </h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="rounded-xl bg-[#F7F8FA] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6C6D75]">
                  Language
                </p>
                <p className="mt-1 font-semibold text-[#1D1E24]">{language}</p>
              </div>
              <div className="rounded-xl bg-[#F7F8FA] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6C6D75]">
                  Workspace
                </p>
                <p className="mt-1 font-semibold text-[#1D1E24]">
                  AI instructor and learning canvas
                </p>
              </div>
            </div>

            <Link
              href={startHref}
              className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0B5CFF] px-5 text-sm font-semibold text-white transition hover:bg-[#094FD9]"
            >
              Start private lesson
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}
