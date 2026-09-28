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
  Briefcase,
  Globe2,
  GraduationCap,
  LockKeyhole,
} from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";
import { careerSections } from "@/lib/careerCatalog";
import {
  getLearningSections,
  slugifyLearningTitle,
} from "@/lib/learningCatalog";
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
    eyebrow: "Career Skills",
    description:
      "Choose a skill or career topic, then open a private lesson workspace built for the AI instructor integration.",
    Icon: Briefcase,
  },
  "school-help": {
    title: "School Help",
    eyebrow: "School Help",
    description:
      "Choose a school subject and level, then open a private lesson workspace for one-on-one AI teaching.",
    Icon: GraduationCap,
  },
  "brain-development": {
    title: "Brain Development",
    eyebrow: "Learning World",
    description:
      "Memory, focus, reasoning, discipline, and learning performance.",
    Icon: Brain,
  },
  "general-knowledge": {
    title: "General Knowledge",
    eyebrow: "Learning World",
    description:
      "History, technology, economics, geography, culture, and life knowledge.",
    Icon: Globe2,
  },
  "book-intelligence": {
    title: "Book Intelligence",
    eyebrow: "Learning World",
    description:
      "Book summaries, chapter breakdowns, vocabulary, quizzes, and analysis.",
    Icon: BookOpen,
  },
};

function OptionCard({
  href,
  title,
  description,
  Icon,
  buttonText,
}: {
  href: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  buttonText: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-60 flex-col rounded-[1.4rem] border border-[#BFD3ED] bg-white p-6 shadow-[0_12px_32px_rgba(11,23,57,0.05)] hover:border-[#1677FF]"
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
        <Icon className="h-5 w-5" />
      </div>

      <h2 className="mt-5 text-xl font-black text-[#0B1739]">{title}</h2>
      <p className="mt-2 flex-1 text-sm font-medium leading-6 text-black">
        {description}
      </p>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#1677FF]">
        {buttonText}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
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
      <main className="min-h-screen bg-[#F4F7FB] px-5 py-10 text-black">
        <div className="mx-auto max-w-5xl">
          <Link href="/dashboard" className="font-bold text-[#1677FF]">
            ← Back to Dashboard
          </Link>
          <div className="mt-8 rounded-2xl border border-[#D8E0EA] bg-white p-10 text-center">
            <h1 className="text-3xl font-black text-[#0B1739]">
              Learning world not found
            </h1>
          </div>
        </div>
      </main>
    );
  }

  const available = isLearningWorldAvailable(world);
  const { title, eyebrow, description, Icon } = learningWorld;

  if (!available) {
    return (
      <main className="min-h-screen bg-[#F4F7FB] px-5 py-8 font-sans text-black sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-black text-[#0B1739]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <Link href="/" className="font-black text-[#0B1739]">
              GAHN AI
            </Link>
          </div>

          <section className="mt-12 rounded-[1.75rem] border border-[#D8E0EA] bg-white p-8 text-center shadow-[0_16px_40px_rgba(11,23,57,0.05)] sm:p-12">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#07162F] text-white">
              <LockKeyhole className="h-7 w-7" />
            </div>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#1677FF]">
              Not available
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[#0B1739]">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-7 text-black">
              {description}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm font-bold leading-6 text-black">
              This learning world is intentionally disabled while GAHN tests
              Career Skills and School Help first.
            </p>
          </section>
        </div>
      </main>
    );
  }

  const schoolSections = world === "school-help" ? getLearningSections(world) : [];

  return (
    <main className="min-h-screen bg-[#F4F7FB] px-5 py-8 font-sans text-black sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-black text-[#0B1739]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector value={language} onChange={changeLanguage} compact />
            <Link href="/" className="font-black text-[#0B1739]">
              GAHN AI
            </Link>
          </div>
        </div>

        <section className="mt-8 overflow-hidden rounded-[1.75rem] border border-[#BFD3ED] bg-white shadow-[0_18px_48px_rgba(11,23,57,0.06)]">
          <div className="grid gap-6 bg-[#07162F] p-7 text-white sm:p-9 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-[#07162F]">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8DB8FF]">
                {eyebrow}
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-white">
                {title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-white">
                {description}
              </p>
              <p className="mt-3 text-sm font-black text-[#8DB8FF]">
                Teaching language: {language}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1677FF]">
              Choose a course
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] text-[#0B1739]">
              {world === "career-skills"
                ? "Choose a career skill"
                : "Choose a school subject"}
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-black">
              No search box and no long curriculum preview. Pick one option and
              move toward the private lesson experience.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {world === "career-skills" &&
              careerSections.map((section) => (
                <OptionCard
                  key={section.slug}
                  href={`/learn/career-skills/${section.slug}/${slugifyLearningTitle(
                    section.title
                  )}?language=${encodeURIComponent(language)}`}
                  title={section.title}
                  description={section.description}
                  Icon={Briefcase}
                  buttonText="Open course"
                />
              ))}

            {world === "school-help" &&
              schoolSections.map((section) => (
                <OptionCard
                  key={section.slug}
                  href={`/learn/school-help/${section.slug}?language=${encodeURIComponent(
                    language
                  )}`}
                  title={section.title}
                  description={section.description}
                  Icon={GraduationCap}
                  buttonText="Choose level"
                />
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
