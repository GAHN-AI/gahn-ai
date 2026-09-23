"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  Camera,
  FileUp,
  Globe2,
  GraduationCap,
  Library,
  Search,
  Sparkles,
} from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { careerSections } from "@/lib/careerCatalog";
import { getLearningSections } from "@/lib/learningCatalog";

type LearningWorld = {
  title: string;
  eyebrow: string;
  description: string;
  placeholder: string;
  Icon: LucideIcon;
};

const learningWorlds: Record<string, LearningWorld> = {
  "career-skills": {
    title: "Career Skills",
    eyebrow: "Career Library",
    description:
      "Choose a career field, explore the paths inside it, preview exactly what you will learn, then enter a private AI-guided learning experience.",
    placeholder:
      "Search a career or skill: web development, nursing, finance, electrician...",
    Icon: Briefcase,
  },
  "school-help": {
    title: "School Help",
    eyebrow: "School Learning",
    description:
      "Learn by grade level like a complete academic library, get help across core subjects, and bring real homework when you need step-by-step support.",
    placeholder:
      "Search a school topic: algebra, biology, essay writing, chemistry...",
    Icon: GraduationCap,
  },
  "brain-development": {
    title: "Brain Development",
    eyebrow: "Cognitive Training",
    description:
      "Build focus, memory, reasoning, study ability, discipline, problem solving, and mental flexibility through structured skill paths.",
    placeholder:
      "Search a mental skill: focus, active recall, critical thinking...",
    Icon: Brain,
  },
  "general-knowledge": {
    title: "General Knowledge",
    eyebrow: "Knowledge Library",
    description:
      "Explore major areas of human knowledge, then choose the exact topic you want explained clearly and taught step by step.",
    placeholder:
      "Search anything: space, economics, history, technology, psychology...",
    Icon: Globe2,
  },
  "book-intelligence": {
    title: "Book Intelligence",
    eyebrow: "Book Library",
    description:
      "Explore fiction for imagination and creativity, nonfiction for real facts and documented ideas, plus tools for analysis, recall, and application.",
    placeholder:
      "Search a book, genre, author, idea, or reading skill...",
    Icon: BookOpen,
  },
};

function SectionCard({
  href,
  title,
  description,
  count,
  Icon,
  label = "Explore section",
}: {
  href: string;
  title: string;
  description: string;
  count: number;
  Icon: LucideIcon;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-[1.5rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_12px_35px_rgba(11,23,57,0.045)] hover:border-[#1677FF]/45 hover:shadow-[0_16px_40px_rgba(11,23,57,0.08)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>

        <span className="rounded-full bg-[#F1F7FF] px-3 py-1 text-xs font-bold text-[#1677FF]">
          {count} options
        </span>
      </div>

      <h3 className="mt-5 text-xl font-bold tracking-[-0.02em] text-[#0B1739]">
        {title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-[#53657D]">
        {description}
      </p>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1677FF]">
        {label}
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}

export default function LearningWorldPage() {
  const params = useParams<{ world: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const world = params.world;
  const learningWorld = learningWorlds[world];
  const [learningRequest, setLearningRequest] = useState("");
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

  if (!learningWorld) {
    return (
      <main className="min-h-screen bg-[#F8FBFF] px-6 py-12 text-[#0B1739]">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1677FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="mt-12 rounded-[1.5rem] border border-[#D7E3F2] bg-white p-10 text-center">
            <h1 className="text-3xl font-extrabold">Learning world not found</h1>
          </div>
        </div>
      </main>
    );
  }

  const { title, eyebrow, description, placeholder, Icon } = learningWorld;
  const sections = getLearningSections(world);

  function startLearning(topic: string) {
    const cleanTopic = topic.trim();
    if (!cleanTopic) return;

    router.push(
      `/lesson/custom?world=${encodeURIComponent(
        world
      )}&topic=${encodeURIComponent(cleanTopic)}&language=${encodeURIComponent(
        language
      )}`
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startLearning(learningRequest);
  }

  const sectionHref = (slug: string) =>
    `/learn/${world}/${slug}?language=${encodeURIComponent(language)}`;

  const schoolGroups =
    world === "school-help"
      ? [
          {
            title: "Elementary School",
            description: "Grades 1–5",
            items: sections.filter((section) =>
              ["grade-1", "grade-2", "grade-3", "grade-4", "grade-5"].includes(
                section.slug
              )
            ),
          },
          {
            title: "Middle School",
            description: "Grades 6–8",
            items: sections.filter((section) =>
              ["grade-6", "grade-7", "grade-8"].includes(section.slug)
            ),
          },
          {
            title: "High School",
            description: "Grades 9–12",
            items: sections.filter((section) =>
              ["grade-9", "grade-10", "grade-11", "grade-12"].includes(
                section.slug
              )
            ),
          },
          {
            title: "College",
            description: "College-level support",
            items: sections.filter((section) => section.slug === "college"),
          },
        ]
      : [];

  return (
    <main className="min-h-screen bg-[#F8FBFF] px-5 py-8 font-sans text-[#0B1739] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#53657D] hover:text-[#1677FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

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

        <section className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_18px_55px_rgba(11,23,57,0.07)] sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#EAF3FF]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-[35%] h-44 w-96 rotate-[-8deg] rounded-[999px] bg-[#F5F8FC]"
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#EAF3FF] text-[#1677FF]">
              <Icon className="h-7 w-7" strokeWidth={1.75} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
                {eyebrow}
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                {title}
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#53657D] sm:text-base">
                {description}
              </p>

              <p className="mt-3 text-sm font-semibold text-[#1677FF]">
                Teaching language: {language}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[1.5rem] border border-[#CFE0F5] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_58%,#EAF3FF_100%)] p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[#1677FF] shadow-sm">
              <Search className="h-5 w-5" strokeWidth={1.75} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1677FF]">
                Learn your way
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.02em]">
                Search anything or browse the structured library
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#53657D]">
                Use the library when you want a guided path. Search directly when
                you already know exactly what you want your private instructor to
                teach.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7A8AA0]"
                strokeWidth={1.75}
              />
              <input
                value={learningRequest}
                onChange={(event) => setLearningRequest(event.target.value)}
                placeholder={placeholder}
                className="h-14 w-full rounded-xl border border-[#D7E3F2] bg-white pl-12 pr-4 text-sm text-[#0B1739] outline-none placeholder:text-[#7A8AA0] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
              />
            </div>

            <button
              type="submit"
              disabled={!learningRequest.trim()}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#1677FF] px-6 text-sm font-bold text-white hover:bg-[#0F65E8] disabled:cursor-not-allowed disabled:bg-[#B8C7DA]"
            >
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </section>

        {world === "school-help" && (
          <>
            <section className="mt-10 rounded-[1.6rem] border border-[#BFD7F7] bg-white p-6 shadow-[0_14px_38px_rgba(11,23,57,0.06)] sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                      <FileUp className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1677FF]">
                        Homework Help
                      </p>
                      <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.02em]">
                        Bring the assignment you actually received
                      </h2>
                    </div>
                  </div>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-[#53657D] sm:text-base">
                    Upload a PDF, document, screenshot, or photo of a physical
                    worksheet. GAHN is designed to teach the concepts, explain the
                    instructions, check your work, and guide you step by step.
                  </p>

                  <Link
                    href={`/learn/school-help/homework?language=${encodeURIComponent(
                      language
                    )}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#1677FF] px-5 py-3 text-sm font-bold text-white hover:bg-[#0F65E8]"
                  >
                    Open Homework Help
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-[#D7E3F2] bg-[#F8FBFF] p-5">
                    <Camera className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
                    <p className="mt-3 font-bold">Photo or screenshot</p>
                    <p className="mt-1 text-xs leading-5 text-[#53657D]">
                      Use a phone photo for physical worksheets and handwritten work.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#D7E3F2] bg-[#F8FBFF] p-5">
                    <FileUp className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
                    <p className="mt-3 font-bold">School file</p>
                    <p className="mt-1 text-xs leading-5 text-[#53657D]">
                      Select PDFs, documents, images, or text-based assignments.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
                  Grade-Level Learning
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">
                  Choose your grade level
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[#53657D]">
                  Each grade opens a subject library. Choose a subject to preview
                  what you will learn before entering the AI lesson.
                </p>
              </div>

              <div className="mt-7 space-y-8">
                {schoolGroups.map((group) => (
                  <div key={group.title}>
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-extrabold">{group.title}</h3>
                        <p className="mt-1 text-sm text-[#53657D]">
                          {group.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {group.items.map((section) => (
                        <Link
                          key={section.slug}
                          href={sectionHref(section.slug)}
                          className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_10px_28px_rgba(11,23,57,0.04)] hover:border-[#1677FF]/45 hover:shadow-md"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                              <GraduationCap className="h-4.5 w-4.5" strokeWidth={1.75} />
                            </div>
                            <span className="text-xs font-bold text-[#53657D]">
                              {section.options.length} subjects
                            </span>
                          </div>
                          <h4 className="mt-4 text-lg font-extrabold">{section.title}</h4>
                          <p className="mt-2 text-sm leading-6 text-[#53657D]">
                            {section.description}
                          </p>
                          <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#1677FF]">
                            View subjects
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {world === "career-skills" && (
          <section className="mt-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
                Career Library
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">
                Choose a career field
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#53657D]">
                Open a field, choose a career or professional skill, then preview
                the skills, tools, and learning path before starting your private
                AI lesson.
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {careerSections.map((section) => (
                <SectionCard
                  key={section.slug}
                  href={sectionHref(section.slug)}
                  title={section.title}
                  description={section.description}
                  count={section.lessons.length}
                  Icon={Briefcase}
                  label="Explore careers"
                />
              ))}
            </div>
          </section>
        )}

        {world === "book-intelligence" && (
          <section className="mt-10">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                <Library className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
                  Book Library
                </p>
                <h2 className="mt-1 text-3xl font-extrabold tracking-[-0.03em]">
                  Fiction, nonfiction, and deeper book learning
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[#53657D]">
                  Fiction develops imagination and literary thinking. Nonfiction
                  focuses on real facts, people, research, ideas, and documented
                  events. Use the other shelves to analyze, remember, and apply
                  what you read.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {sections.slice(0, 2).map((section) => (
                <SectionCard
                  key={section.slug}
                  href={sectionHref(section.slug)}
                  title={section.title}
                  description={section.description}
                  count={section.options.length}
                  Icon={BookOpen}
                  label="Open shelf"
                />
              ))}
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {sections.slice(2).map((section) => (
                <SectionCard
                  key={section.slug}
                  href={sectionHref(section.slug)}
                  title={section.title}
                  description={section.description}
                  count={section.options.length}
                  Icon={BookOpen}
                />
              ))}
            </div>
          </section>
        )}

        {world !== "school-help" &&
          world !== "career-skills" &&
          world !== "book-intelligence" && (
            <section className="mt-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
                  Structured Library
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em]">
                  Choose a section
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[#53657D]">
                  Open a broad section first, then choose the exact skill or topic
                  you want to learn. Every option includes a course-style preview
                  before the AI lesson begins.
                </p>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {sections.map((section) => (
                  <SectionCard
                    key={section.slug}
                    href={sectionHref(section.slug)}
                    title={section.title}
                    description={section.description}
                    count={section.options.length}
                    Icon={Icon}
                  />
                ))}
              </div>
            </section>
          )}

        <section className="mt-10 rounded-[1.5rem] border border-[#D7E3F2] bg-white p-6 text-center shadow-[0_12px_35px_rgba(11,23,57,0.05)] sm:p-8">
          <Sparkles className="mx-auto h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
          <h2 className="mt-3 text-xl font-extrabold">
            Can&apos;t find exactly what you need?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#53657D]">
            Use the search box above. GAHN AI is designed to create a private
            learning path around the exact subject, career, book, or skill you
            want to understand.
          </p>
        </section>
      </div>
    </main>
  );
}
