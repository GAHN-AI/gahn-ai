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
  Briefcase,
  Globe2,
  GraduationCap,
  LockKeyhole,
  Search,
} from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";
import { careerSections } from "@/lib/careerCatalog";
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
    eyebrow: "Technology careers",
    description:
      "Explore technology roles and the concrete skills used in each career. Career Skills is intentionally focused on technology for this MVP.",
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

function CareerCard({
  href,
  title,
  category,
  description,
  imageUrl,
  level,
  pathLabel,
  skills,
}: {
  href: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  level: string;
  pathLabel: string;
  skills: string[];
}) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[1.35rem] border border-[#D8E0EA] bg-white shadow-[0_12px_30px_rgba(11,23,57,0.05)] transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-[#9CC4F7] hover:shadow-[0_18px_38px_rgba(11,23,57,0.09)]"
    >
      <div className="relative h-48 overflow-hidden bg-[#DDE8F7]">
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,22,47,0.02)_15%,rgba(7,22,47,0.62)_100%)]" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#07162F]">
            {category}
          </span>
          <span className="text-xs font-black text-white">{level}</span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.13em] text-[#1677FF]">
          {pathLabel}
        </p>

        <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-[#0B1739]">
          {title}
        </h2>

        <p className="mt-2 min-h-[72px] text-sm font-medium leading-6 text-[#24344D]">
          {description}
        </p>

        <div className="mt-5 border-t border-[#E6ECF3] pt-4">
          <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[#52647C]">
            Skills you will build
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[#F1F5FA] px-2.5 py-1 text-xs font-bold text-[#25364F]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-black text-[#1677FF]">
            Explore career
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#EAF3FF] text-[#1677FF] transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function LearningSectionCard({
  href,
  title,
  description,
  imageUrl,
  skills,
  locked = false,
}: {
  href?: string;
  title: string;
  description: string;
  imageUrl: string;
  skills: string[];
  locked?: boolean;
}) {
  const content = (
    <>
      <div className="relative h-48 overflow-hidden bg-[#DDE8F7]">
        <img
          src={imageUrl}
          alt=""
          className={`h-full w-full object-cover ${locked ? "brightness-[0.72]" : "transition-transform duration-300 group-hover:scale-[1.02]"}`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,22,47,0.02)_15%,rgba(7,22,47,0.68)_100%)]" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#07162F]">
            {locked ? "Locked" : "Learning path"}
          </span>
          {locked && (
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#07162F]/85 text-white">
              <LockKeyhole className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-black tracking-[-0.025em] text-[#0B1739]">
          {title}
        </h2>

        <p className="mt-2 min-h-[72px] text-sm font-medium leading-6 text-[#24344D]">
          {description}
        </p>

        <div className="mt-5 border-t border-[#E6ECF3] pt-4">
          <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[#52647C]">
            {locked ? "What this world will cover" : "Skills you will build"}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[#F1F5FA] px-2.5 py-1 text-xs font-bold text-[#25364F]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className={`text-sm font-black ${locked ? "text-[#65758A]" : "text-[#1677FF]"}`}>
            {locked ? "Not available yet" : "Open learning path"}
          </span>
          <span className={`grid h-9 w-9 place-items-center rounded-full ${locked ? "bg-[#EEF2F7] text-[#65758A]" : "bg-[#EAF3FF] text-[#1677FF] transition-transform group-hover:translate-x-0.5"}`}>
            {locked ? <LockKeyhole className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </span>
        </div>
      </div>
    </>
  );

  if (locked || !href) {
    return (
      <div className="overflow-hidden rounded-[1.35rem] border border-[#D8E0EA] bg-white shadow-[0_12px_30px_rgba(11,23,57,0.05)]">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[1.35rem] border border-[#D8E0EA] bg-white shadow-[0_12px_30px_rgba(11,23,57,0.05)] transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-[#9CC4F7] hover:shadow-[0_18px_38px_rgba(11,23,57,0.09)]"
    >
      {content}
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
  const [careerSearch, setCareerSearch] = useState("");

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

  const filteredCareers = useMemo(() => {
    const query = careerSearch.trim().toLowerCase();

    if (!query) return careerSections;

    return careerSections.filter((career) =>
      [
        career.title,
        career.category,
        career.description,
        ...career.skills,
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [careerSearch]);

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


  const worldSections =
    world === "career-skills" ? [] : getLearningSections(world);

  return (
    <main className="min-h-screen bg-[#F4F7FB] font-sans text-black">
      <header className="border-b border-[#D8E0EA] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-black text-[#0B1739]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
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

      <section className="border-b border-[#D8E0EA] bg-[#07162F]">
        <div className="mx-auto max-w-7xl px-5 py-10 text-white sm:px-8 sm:py-12">
          <div className="flex max-w-4xl items-start gap-5">
            <div className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-[#07162F] sm:grid">
              <Icon className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8DB8FF]">
                {eyebrow}
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-white/90 sm:text-base">
                {description}
              </p>
              <p className="mt-4 text-sm font-black text-[#8DB8FF]">
                {available
                  ? `One instructor for this learning world · Teaching in ${language}`
                  : "Locked for the MVP · Preview only"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        {!available && (
          <div className="mb-7 flex items-start gap-3 rounded-2xl border border-[#D8E0EA] bg-white px-5 py-4 shadow-[0_8px_22px_rgba(11,23,57,0.04)]">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EEF2F7] text-[#33455F]">
              <LockKeyhole className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-black text-[#0B1739]">This learning world is still locked.</p>
              <p className="mt-1 text-sm font-medium leading-6 text-[#52647C]">
                You can preview the subjects and skills GAHN plans to teach here, but none of these paths can be opened yet.
              </p>
            </div>
          </div>
        )}

        {world === "career-skills" ? (
          <>
            <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
                  Technology
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] text-[#0B1739]">
                  Choose a technology role
                </h2>
                <p className="mt-3 text-sm font-medium leading-7 text-[#33455F]">
                  Career Skills contains one section for this MVP: Technology.
                  Each role uses a role-specific skill list aligned with
                  Coursera Career Academy, while Maya remains the single Career
                  Skills instructor across the whole section.
                </p>
              </div>

              <label className="relative block w-full lg:max-w-sm">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#61738B]" />
                <input
                  value={careerSearch}
                  onChange={(event) => setCareerSearch(event.target.value)}
                  placeholder="Search technology roles or skills"
                  className="w-full rounded-xl border border-[#C9D6E5] bg-white py-3 pl-11 pr-4 text-sm font-semibold text-[#0B1739] outline-none focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/10"
                />
              </label>
            </section>

            <section className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredCareers.map((section) => (
                <CareerCard
                  key={section.slug}
                  href={`/learn/career-skills/${section.slug}?language=${encodeURIComponent(language)}`}
                  title={section.title}
                  category={section.category}
                  description={section.description}
                  imageUrl={section.imageUrl}
                  level={section.level}
                  pathLabel={section.pathLabel}
                  skills={section.skills}
                />
              ))}
            </section>

            {filteredCareers.length === 0 && (
              <div className="mt-7 rounded-2xl border border-dashed border-[#BFD3ED] bg-white px-6 py-12 text-center">
                <h3 className="text-lg font-black text-[#0B1739]">
                  No career matched that search
                </h3>
                <p className="mt-2 text-sm font-medium text-[#52647C]">
                  Try a role or skill such as software development, Python,
                  cybersecurity, cloud, data, machine learning, or UX.
                </p>
              </div>
            )}
          </>
        ) : (
          <section>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1677FF]">
              {world === "school-help" ? "School subjects" : "Learning paths"}
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] text-[#0B1739]">
              {world === "school-help"
                ? "Choose what you need help with"
                : `Explore what ${title} will teach`}
            </h2>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-[#33455F]">
              {world === "school-help"
                ? "Choose a subject, then select the level you want the private instructor to teach."
                : "These paths are shown as a preview only. The learning world remains locked until it is ready for testing."}
            </p>

            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {worldSections.map((section) => (
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
                  skills={section.options[0]?.skills || []}
                  locked={!available}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
