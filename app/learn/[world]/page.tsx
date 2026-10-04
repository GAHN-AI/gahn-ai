"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Globe2,
  GraduationCap,
  LockKeyhole,
} from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";
import { careerIndustries } from "@/lib/careerCatalog";
import { getLearningSections } from "@/lib/learningCatalog";
import { isLearningWorldAvailable } from "@/lib/learningWorldAvailability";

type LearningWorld = {
  title: string;
  eyebrow: string;
  description: string;
  Icon: LucideIcon;
};

const learningWorlds: Record<string, LearningWorld> = {
  "career-skills": {
    title: "Career Skills",
    eyebrow: "Career learning world",
    description:
      "Choose an industry, then explore real job paths and the practical skills used in that field.",
    Icon: BriefcaseBusiness,
  },
  "school-help": {
    title: "School Help",
    eyebrow: "School learning world",
    description:
      "Choose a subject and grade level, upload schoolwork when needed, and learn with guided explanations and practice.",
    Icon: GraduationCap,
  },
  "brain-development": {
    title: "Brain Development",
    eyebrow: "Brain learning world",
    description:
      "Build memory, focus, reasoning, discipline, problem solving, study habits, and learning strategies.",
    Icon: Brain,
  },
  "general-knowledge": {
    title: "General Knowledge",
    eyebrow: "Knowledge learning world",
    description:
      "Learn history, technology, science, economics, geography, culture, communication, and practical life knowledge.",
    Icon: Globe2,
  },
  "book-intelligence": {
    title: "Book Intelligence",
    eyebrow: "Book learning world",
    description:
      "Understand books through summaries, chapter breakdowns, key lessons, vocabulary, quizzes, notes, and critical analysis.",
    Icon: BookOpen,
  },
};

function LearningSectionCard({
  href,
  title,
  description,
  imageUrl,
  locked = false,
}: {
  href?: string;
  title: string;
  description: string;
  imageUrl: string;
  locked?: boolean;
}) {
  const body = (
    <>
      <div className="relative h-[180px] overflow-hidden bg-[#EEF2F6]">
        <img
          src={imageUrl}
          alt=""
          className={`h-full w-full object-cover transition duration-300 ${
            locked ? "grayscale-[20%] opacity-75" : "group-hover:scale-[1.025]"
          }`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(8,18,40,0.58)_100%)]" />
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#1D1E24] shadow-sm">
            {locked ? "Unavailable" : "Learning path"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-[#1D1E24]">
          {title}
        </h2>
        <p className="mt-2 min-h-[66px] text-[14px] leading-6 text-[#3C3E45]">
          {description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-[#EEEEF1] pt-4">
          <span className={`text-sm font-semibold ${locked ? "text-[#8A8C94]" : "text-[#0B5CFF]"}`}>
            {locked ? "Not available" : "Open"}
          </span>
          {locked ? (
            <LockKeyhole className="h-4 w-4 text-[#8A8C94]" />
          ) : (
            <ArrowRight className="h-4 w-4 text-[#0B5CFF] transition-transform group-hover:translate-x-1" />
          )}
        </div>
      </div>
    </>
  );

  if (locked || !href) {
    return (
      <div className="overflow-hidden rounded-[14px] border border-[#E1E3E8] bg-white">
        {body}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[14px] border border-[#E1E3E8] bg-white transition hover:-translate-y-0.5 hover:border-[#BDD3F7] hover:shadow-[0_12px_28px_rgba(29,30,36,0.07)]"
    >
      {body}
    </Link>
  );
}

export default function LearningWorldPage() {
  const params = useParams<{ world: string }>();
  const searchParams = useSearchParams();
  const world = params.world;
  const learningWorld = learningWorlds[world];

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

  if (!learningWorld) {
    return (
      <main className="min-h-screen bg-[#F7F8FA] px-5 py-10 font-sans text-black">
        <div className="mx-auto max-w-5xl">
          <Link href="/dashboard" className="text-sm font-medium text-[#0B5CFF]">
            Back to dashboard
          </Link>
          <div className="mt-8 rounded-[14px] border border-[#E1E3E8] bg-white p-10 text-center">
            <h1 className="text-3xl font-semibold">Learning world not found</h1>
          </div>
        </div>
      </main>
    );
  }

  const available = isLearningWorldAvailable(world);
  const { title, eyebrow, description, Icon } = learningWorld;
  const worldSections = world === "career-skills" ? [] : getLearningSections(world);

  return (
    <main className="min-h-screen bg-[#F7F8FA] font-sans text-[#1D1E24]">
      <header className="border-b border-[#E7E7EA] bg-white">
        <div className="mx-auto flex min-h-[68px] max-w-[1320px] flex-wrap items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1E24]"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
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

      <div className="mx-auto max-w-[1320px] px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
        <section className="grid gap-6 border-b border-[#E7E7EA] pb-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-[760px]">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF2FF] text-[#0B5CFF]">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0B5CFF]">
                {eyebrow}
              </p>
            </div>

            <h1 className="mt-5 text-[36px] font-semibold leading-[1.12] tracking-[-0.04em] text-[#1D1E24] sm:text-[42px]">
              {title}
            </h1>
            <p className="mt-4 max-w-[720px] text-[15px] leading-7 text-[#34363D]">
              {description}
            </p>
          </div>

          <div className="rounded-xl border border-[#E1E3E8] bg-white px-4 py-3 text-sm">
            <span className="font-medium text-[#1D1E24]">{language}</span>
            <span className="ml-2 text-[#6C6D75]">instruction language</span>
          </div>
        </section>

        {!available && (
          <div className="mt-7 rounded-xl border border-[#E1E3E8] bg-white p-5 text-sm text-[#4F515A]">
            This learning world is not available yet.
          </div>
        )}

        <section className="pt-8">
          <div className="max-w-[760px]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
              {world === "career-skills"
                ? "Industries"
                : world === "school-help"
                  ? "Subjects and homework"
                  : "Learning paths"}
            </p>
            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.03em] text-[#1D1E24]">
              {world === "career-skills"
                ? "Choose an industry"
                : world === "school-help"
                  ? "Choose what you need help with"
                  : `Choose a path inside ${title}`}
            </h2>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {world === "career-skills"
              ? careerIndustries.map((industry) => (
                  <LearningSectionCard
                    key={industry.slug}
                    href={
                      available
                        ? `/learn/career-skills/industry/${industry.slug}?language=${encodeURIComponent(language)}`
                        : undefined
                    }
                    title={industry.displayTitle}
                    description={industry.description}
                    imageUrl={industry.imageUrl}
                    locked={!available}
                  />
                ))
              : worldSections.map((section) => (
                  <LearningSectionCard
                    key={section.slug}
                    href={
                      available
                        ? `/learn/${world}/${section.slug}?language=${encodeURIComponent(language)}`
                        : undefined
                    }
                    title={section.title}
                    description={section.description}
                    imageUrl={section.imageUrl}
                    locked={!available}
                  />
                ))}
          </div>
        </section>
      </div>
    </main>
  );
}
