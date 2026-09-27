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
  Check,
  CheckCircle2,
  Code2,
  ChevronDown,
  CirclePlay,
  Globe2,
  GraduationCap,
  Layers3,
  ListChecks,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { getCareerSection } from "@/lib/careerCatalog";
import {
  getLearningOption,
  slugifyLearningTitle,
  type LearningOption,
} from "@/lib/learningCatalog";
import { getMvpLearningPath } from "@/lib/mvpLearningPaths";

type WorldConfig = {
  title: string;
  instructor: string;
  Icon: LucideIcon;
};

const worlds: Record<string, WorldConfig> = {
  "career-skills": {
    title: "Career Skills",
    instructor: "Maya",
    Icon: Briefcase,
  },
  "school-help": {
    title: "School Help",
    instructor: "AI Instructor",
    Icon: GraduationCap,
  },
  "brain-development": {
    title: "Brain Development",
    instructor: "AI Instructor",
    Icon: Brain,
  },
  "general-knowledge": {
    title: "General Knowledge",
    instructor: "AI Instructor",
    Icon: Globe2,
  },
  "book-intelligence": {
    title: "Book Intelligence",
    instructor: "AI Instructor",
    Icon: BookOpen,
  },
};

type LearningDetail = {
  whatYouLearn: string[];
  skills: string[];
  resources: string[];
  modules: { title: string; description: string }[];
  requirementNote?: string;
};

function buildLearningDetail(
  world: string,
  _sectionSlug: string,
  sectionTitle: string,
  title: string,
  description: string,
  _option?: LearningOption
): LearningDetail {
  const path = getMvpLearningPath(world, sectionTitle, title);

  if (path) {
    return {
      whatYouLearn: path.whatYouLearn,
      skills: path.skills,
      resources: path.resources,
      modules: path.sections.map((section) => ({
        title: section.title,
        description: section.description,
      })),
      requirementNote: path.requirementNote,
    };
  }

  return {
    whatYouLearn: [
      description,
      `Learn ${title} through clear examples and guided practice.`,
      "Apply what you learn through questions, tasks, and feedback.",
    ],
    skills: ["Understanding", "Practice", "Application"],
    resources: ["Examples", "Practice Questions", "Notes"],
    modules: [
      {
        title: title,
        description: `Learn ${title} step by step and apply it in a practical task.`,
      },
    ],
  };
}

export default function TopicOverviewPage() {
  const params = useParams<{ world: string; section: string; topic: string }>();
  const searchParams = useSearchParams();

  const world = worlds[params.world];
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

  const resolved = useMemo(() => {
    if (!world) return null;

    if (params.world === "career-skills") {
      const section = getCareerSection(params.section);
      if (!section) return null;

      const topic = section.lessons.find(
        (lesson) => slugifyLearningTitle(lesson.title) === params.topic
      );

      if (!topic) return null;

      return {
        sectionTitle: section.title,
        title: topic.title,
        description: topic.description,
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
  }, [params.section, params.topic, params.world, world]);

  if (!world || !resolved) {
    return (
      <main className="min-h-screen bg-[#F8FBFF] px-6 py-12 text-[#0B1739]">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/learn/${params.world}/${params.section}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1677FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to section
          </Link>
          <div className="mt-10 rounded-2xl border border-[#D7E3F2] bg-white p-10 text-center">
            <h1 className="text-3xl font-extrabold">Learning path not found</h1>
          </div>
        </div>
      </main>
    );
  }

  const detail = buildLearningDetail(
    params.world,
    params.section,
    resolved.sectionTitle,
    resolved.title,
    resolved.description,
    resolved.option
  );
  const { Icon } = world;
  const learningPathSections =
    getMvpLearningPath(
      params.world,
      resolved.sectionTitle,
      resolved.title
    )?.sections ??
    detail.modules.map((module) => ({
      title: module.title,
      description: module.description,
      lessons: [module.title],
    }));

  const startHref = `/lesson/custom?world=${encodeURIComponent(
    params.world
  )}&section=${encodeURIComponent(params.section)}&topic=${encodeURIComponent(
    resolved.title
  )}&topicSlug=${encodeURIComponent(params.topic)}&language=${encodeURIComponent(
    language
  )}`;

  return (
    <main className="min-h-screen bg-[#F8FBFF] font-sans text-[#0B1739]">
      <div className="border-b border-[#D7E3F2] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-2 text-sm text-[#53657D]">
            <Link
              href={`/learn/${params.world}?language=${encodeURIComponent(language)}`}
              className="hover:text-[#1677FF]"
            >
              {world.title}
            </Link>
            <span>/</span>
            <Link
              href={`/learn/${params.world}/${params.section}?language=${encodeURIComponent(language)}`}
              className="truncate hover:text-[#1677FF]"
            >
              {resolved.sectionTitle}
            </Link>
            <span className="hidden sm:inline">/</span>
            <span className="hidden truncate font-semibold text-[#0B1739] sm:inline">
              {resolved.title}
            </span>
          </div>

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
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        <Link
          href={`/learn/${params.world}/${params.section}?language=${encodeURIComponent(language)}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#53657D] hover:text-[#1677FF]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {resolved.sectionTitle}
        </Link>

        <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#D7E3F2] bg-white shadow-[0_18px_50px_rgba(11,23,57,0.06)]">
            <div className="relative overflow-hidden border-b border-[#D7E3F2] bg-[linear-gradient(135deg,#FFFFFF_0%,#F7FAFF_55%,#EAF3FF_100%)] p-7 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#DDEBFF]"
              />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#1677FF] shadow-sm">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1677FF]">
                      GAHN AI Learning Path
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#53657D]">
                      {resolved.sectionTitle}
                    </p>
                  </div>
                </div>

                <h1 className="mt-6 max-w-4xl text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                  {resolved.title}
                </h1>

                <p className="mt-4 max-w-3xl text-base leading-8 text-[#53657D]">
                  {resolved.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#CFE0F5] bg-white px-4 py-2 text-xs font-bold text-[#0B1739]">
                    Private AI instruction
                  </span>
                  <span className="rounded-full border border-[#CFE0F5] bg-white px-4 py-2 text-xs font-bold text-[#0B1739]">
                    Self-paced
                  </span>
                  <span className="rounded-full border border-[#CFE0F5] bg-white px-4 py-2 text-xs font-bold text-[#0B1739]">
                    Teaching in {language}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-8 p-6 sm:p-8 lg:p-10">
              <section>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
                  <h2 className="text-2xl font-extrabold tracking-[-0.02em]">
                    What you&apos;ll learn
                  </h2>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {detail.whatYouLearn.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-xl border border-[#E2EAF4] bg-[#F8FBFF] p-4"
                    >
                      <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EAF3FF] text-[#1677FF]">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.25} />
                      </div>
                      <p className="text-sm leading-6 text-[#40536D]">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="border-t border-[#E2EAF4] pt-8">
                <h2 className="text-2xl font-extrabold tracking-[-0.02em]">
                  Skills you&apos;ll gain
                </h2>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {detail.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[#EAF3FF] px-4 py-2 text-sm font-semibold text-[#164F9C]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section className="border-t border-[#E2EAF4] pt-8">
                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
                  <h2 className="text-2xl font-extrabold tracking-[-0.02em]">
                    {params.world === "career-skills" &&
                    params.section === "technology-computing"
                      ? "Languages, technologies & tools you’ll learn"
                      : "Tools, systems & resources you’ll use"}
                  </h2>
                </div>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {detail.resources.map((resource) => (
                    <span
                      key={resource}
                      className="rounded-full border border-[#D7E3F2] bg-white px-4 py-2 text-sm font-semibold text-[#40536D]"
                    >
                      {resource}
                    </span>
                  ))}
                </div>
              </section>

              {detail.requirementNote && (
                <section className="rounded-2xl border border-[#CFE0F5] bg-[#F1F7FF] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1677FF]">
                    Important note
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#40536D]">
                    {detail.requirementNote}
                  </p>
                </section>
              )}

              <section className="border-t border-[#E2EAF4] pt-8">
                <div className="flex items-center gap-3">
                  <Layers3 className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-[-0.02em]">
                      Learning path
                    </h2>
                    <p className="mt-1 text-sm text-[#53657D]">
                      The live AI instructor can adapt the pace and examples based on your responses.
                    </p>
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-[#D7E3F2] bg-white">
                  {learningPathSections.map((courseSection, sectionIndex) => (
                    <details
                      key={`${courseSection.title}-${sectionIndex}`}
                      open={sectionIndex === 0}
                      className="group border-b border-[#E7EDF5] last:border-b-0"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-[#F8FBFF]">
                        <div className="min-w-0">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1677FF]">
                            Section {sectionIndex + 1}
                          </p>
                          <h3 className="mt-1 font-bold text-[#0B1739]">
                            {courseSection.title}
                          </h3>
                          <p className="mt-1 max-w-3xl text-sm leading-6 text-[#53657D]">
                            {courseSection.description}
                          </p>
                          <p className="mt-2 text-xs font-semibold text-[#1677FF]">
                            {courseSection.lessons.length} built-in lessons
                          </p>
                        </div>
                        <ChevronDown className="h-5 w-5 shrink-0 text-[#53657D] transition-transform group-open:rotate-180" />
                      </summary>

                      <div className="border-t border-[#E7EDF5] bg-[#FBFCFE]">
                        {courseSection.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={`${lesson}-${lessonIndex}`}
                            className="flex items-center gap-3 border-b border-[#EEF2F7] px-5 py-3.5 last:border-b-0 sm:pl-8"
                          >
                            <CirclePlay
                              className="h-4 w-4 shrink-0 text-[#1677FF]"
                              strokeWidth={1.8}
                            />
                            <span className="text-sm font-medium text-[#24364D]">
                              {lesson}
                            </span>
                          </div>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              <section className="border-t border-[#E2EAF4] pt-8">
                <h2 className="text-2xl font-extrabold tracking-[-0.02em]">
                  How GAHN is designed to teach it
                </h2>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-[#D7E3F2] bg-[#F8FBFF] p-5">
                    <Sparkles className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
                    <h3 className="mt-3 font-bold">Explain clearly</h3>
                    <p className="mt-2 text-sm leading-6 text-[#53657D]">
                      Break difficult ideas into plain language, examples, visuals, and step-by-step reasoning.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#D7E3F2] bg-[#F8FBFF] p-5">
                    <Code2 className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
                    <h3 className="mt-3 font-bold">Practice actively</h3>
                    <p className="mt-2 text-sm leading-6 text-[#53657D]">
                      Give you tasks, questions, examples, and real work instead of only talking at you.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#D7E3F2] bg-[#F8FBFF] p-5">
                    <ListChecks className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
                    <h3 className="mt-3 font-bold">Check mastery</h3>
                    <p className="mt-2 text-sm leading-6 text-[#53657D]">
                      Find misunderstandings, reteach weak areas, and check whether you can do it independently.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-[1.5rem] border border-[#BFD7F7] bg-white p-6 shadow-[0_16px_42px_rgba(11,23,57,0.08)]">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#1677FF]">
                Private Instructor
              </p>
              <h2 className="mt-1 text-xl font-extrabold">
                Learn with {world.instructor}
              </h2>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#40536D]">
                  <ShieldCheck className="h-4 w-4 text-[#1677FF]" />
                  Private learning session
                </div>
                <div className="flex items-center gap-3 text-sm text-[#40536D]">
                  <Globe2 className="h-4 w-4 text-[#1677FF]" />
                  {language}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#40536D]">
                  <ListChecks className="h-4 w-4 text-[#1677FF]" />
                  Adaptive lesson sequence
                </div>
              </div>

              <Link
                href={startHref}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1677FF] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#0F65E8]"
              >
                Start Private AI Lesson
                <ArrowRight className="h-4 w-4" />
              </Link>

              <p className="mt-3 text-center text-xs leading-5 text-[#7A8AA0]">
                Live AI teaching features will activate as the instructor software is connected.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
