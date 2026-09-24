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
import { getCareerCourseSections, getCareerCurriculum } from "@/lib/careerCurriculum";
import {
  getLearningOption,
  slugifyLearningTitle,
  type LearningOption,
} from "@/lib/learningCatalog";

type WorldConfig = {
  title: string;
  instructor: string;
  Icon: LucideIcon;
};

const worlds: Record<string, WorldConfig> = {
  "career-skills": {
    title: "Career Skills",
    instructor: "Alex",
    Icon: Briefcase,
  },
  "school-help": {
    title: "School Help",
    instructor: "Henry",
    Icon: GraduationCap,
  },
  "brain-development": {
    title: "Brain Development",
    instructor: "Aanya",
    Icon: Brain,
  },
  "general-knowledge": {
    title: "General Knowledge",
    instructor: "Sarah",
    Icon: Globe2,
  },
  "book-intelligence": {
    title: "Book Intelligence",
    instructor: "Hannah",
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

const techCareerSkills = [
  "Problem Solving",
  "Technical Thinking",
  "Debugging",
  "Project Building",
  "Professional Workflow",
];

function careerResources(sectionTitle: string) {
  if (sectionTitle.includes("Technology")) {
    return ["VS Code", "Git", "GitHub", "Browser DevTools", "Documentation"];
  }
  if (sectionTitle.includes("Finance")) {
    return ["Financial Models", "Case Studies", "Spreadsheets", "Market Research"];
  }
  if (sectionTitle.includes("Healthcare")) {
    return ["Clinical Scenarios", "Terminology Guides", "Case Studies", "Safety Checklists"];
  }
  if (sectionTitle.includes("Engineering")) {
    return ["Design Problems", "Technical Diagrams", "Calculations", "Project Scenarios"];
  }
  return ["Interactive Examples", "Real-World Scenarios", "Reference Guides", "Practice Projects"];
}

function subjectModules(topic: string) {
  const lower = topic.toLowerCase();

  if (lower.includes("math") || lower.includes("algebra") || lower.includes("geometry") || lower.includes("calculus") || lower.includes("statistics")) {
    return [
      { title: "Foundations", description: "Review the prerequisite ideas and vocabulary you need before moving forward." },
      { title: "Core Methods", description: "Learn the main rules, formulas, patterns, and problem-solving methods." },
      { title: "Guided Examples", description: "Work through examples step by step with explanations for every decision." },
      { title: "Independent Practice", description: "Solve new problems while the instructor checks reasoning and mistakes." },
      { title: "Assessment Review", description: "Practice the types of questions that can appear on quizzes and tests." },
      { title: "Mastery Check", description: "Explain and solve the topic independently before moving on." },
    ];
  }

  if (lower.includes("english") || lower.includes("writing") || lower.includes("reading")) {
    return [
      { title: "Core Concepts", description: "Learn the vocabulary, structure, and ideas required for the topic." },
      { title: "Read & Analyze", description: "Study examples and identify how strong reading or writing works." },
      { title: "Build the Skill", description: "Practice one part at a time with immediate feedback." },
      { title: "Apply It", description: "Use the skill in a complete paragraph, response, essay, or analysis." },
      { title: "Revision & Feedback", description: "Correct mistakes and strengthen clarity, evidence, organization, and style." },
      { title: "Mastery Check", description: "Demonstrate the skill without step-by-step support." },
    ];
  }

  return [
    { title: "Foundations", description: "Build the background knowledge and vocabulary needed for the topic." },
    { title: "Core Concepts", description: "Learn the most important ideas and how they connect." },
    { title: "Guided Examples", description: "See the ideas applied through clear examples, visuals, or demonstrations." },
    { title: "Practice & Questions", description: "Answer questions and apply what you just learned." },
    { title: "Review & Test Prep", description: "Review weak areas and prepare for quizzes, tests, or assignments." },
    { title: "Mastery Check", description: "Show that you can explain and apply the topic independently." },
  ];
}

function buildLearningDetail(
  world: string,
  sectionSlug: string,
  sectionTitle: string,
  title: string,
  description: string,
  option?: LearningOption
): LearningDetail {
  if (world === "career-skills") {
    const career = getCareerCurriculum(sectionSlug, title);

    return {
      whatYouLearn: career.whatYouLearn,
      skills: career.skills,
      resources: career.tools,
      modules: career.modules,
      requirementNote: career.requirementNote,
    };
  }
  if (title === "Web Developer") {
    return {
      whatYouLearn: [
        "Build webpages with semantic HTML and modern CSS.",
        "Use JavaScript to add logic, interaction, and dynamic behavior.",
        "Create responsive layouts that work across phones, tablets, and desktops.",
        "Use Git and GitHub to manage code and track changes.",
        "Work with JSON, APIs, browser tools, and common web-development workflows.",
        "Build, test, debug, and prepare a real web project for deployment.",
      ],
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "Responsive Web Design",
        "Front-End Development",
        "Accessibility",
        "Git",
        "GitHub",
        "JSON",
        "Debugging",
      ],
      resources: ["VS Code", "Git", "GitHub", "Browser DevTools", "MDN-style Documentation"],
      modules: [
        { title: "How the Web Works", description: "Browsers, websites, files, URLs, servers, and the basic development workflow." },
        { title: "HTML Foundations", description: "Structure pages correctly with semantic HTML, links, images, forms, and content." },
        { title: "CSS & Responsive Design", description: "Layout, spacing, typography, Flexbox, Grid, responsive design, and accessibility." },
        { title: "JavaScript Foundations", description: "Variables, functions, conditions, arrays, events, and interactive webpages." },
        { title: "Git & GitHub", description: "Version control, commits, repositories, branches, and sharing code." },
        { title: "APIs & JSON", description: "Understand data exchange and connect websites to external information." },
        { title: "Debugging & Testing", description: "Use browser tools, read errors, test behavior, and fix problems methodically." },
        { title: "Build & Deploy a Project", description: "Combine the skills into a complete project and prepare it for the web." },
      ],
    };
  }

  if (title === "Software Engineer") {
    return {
      whatYouLearn: [
        "Understand how software is planned, built, tested, and maintained.",
        "Write programs using variables, functions, logic, data structures, and reusable code.",
        "Debug problems systematically instead of guessing.",
        "Use Git and GitHub in a professional software workflow.",
        "Understand APIs, databases, testing, and software architecture at a practical level.",
        "Build projects that turn programming concepts into working software.",
      ],
      skills: ["Programming", "Debugging", "Git", "GitHub", "Algorithms", "Data Structures", "Testing", "APIs"],
      resources: ["VS Code", "Git", "GitHub", "Terminal", "Documentation"],
      modules: [
        { title: "Software Engineering Foundations", description: "How software teams turn problems into reliable software." },
        { title: "Programming Fundamentals", description: "Variables, logic, functions, data, and reusable code." },
        { title: "Data Structures & Algorithms", description: "Organize information and solve problems efficiently." },
        { title: "Git, GitHub & Team Workflow", description: "Track changes, collaborate, review work, and manage code." },
        { title: "Debugging & Testing", description: "Find errors, verify behavior, and make software more reliable." },
        { title: "APIs, Data & Architecture", description: "Understand how modern applications connect systems and organize code." },
        { title: "Engineering Project", description: "Build a working project using the full development workflow." },
      ],
    };
  }

  if (world === "school-help") {
    const baseSkills =
      option?.skills && option.skills.length
        ? option.skills
        : ["Understanding", "Practice", "Problem Solving", "Test Preparation"];

    return {
      whatYouLearn: [
        `Understand the essential ${title} concepts expected in ${sectionTitle}.`,
        "See difficult ideas broken into clear, step-by-step explanations.",
        "Practice with guided examples before working independently.",
        "Learn how to recognize and correct common mistakes.",
        "Prepare for homework, quizzes, tests, and class assignments.",
        "Demonstrate understanding through a mastery check.",
      ],
      skills: baseSkills,
      resources: option?.tools?.length
        ? option.tools
        : ["Guided Examples", "Practice Questions", "Study Guides", "Mastery Checks"],
      modules: option?.modules?.length
        ? option.modules.map((module) => ({ title: module, description: `Learn and practice ${module.toLowerCase()}.` }))
        : subjectModules(title),
    };
  }

  if (world === "brain-development") {
    return {
      whatYouLearn: [
        `Understand the mental processes behind ${title.toLowerCase()}.`,
        "Practice the skill through short guided exercises instead of only reading about it.",
        "Identify habits and environments that make the skill easier or harder.",
        "Use feedback to adjust your approach when something is not working.",
        "Build a repeatable routine you can use outside GAHN.",
      ],
      skills: option?.skills?.length
        ? option.skills
        : ["Self-Awareness", "Practice", "Mental Strategy", "Consistency"],
      resources: ["Guided Exercises", "Practice Timers", "Reflection Prompts", "Progress Checks"],
      modules: [
        { title: "Understand the Skill", description: `Learn what ${title.toLowerCase()} is and what affects it.` },
        { title: "Baseline Check", description: "See where you are starting and identify the biggest weakness." },
        { title: "Guided Training", description: "Practice the skill with short, focused exercises and coaching." },
        { title: "Real-Life Application", description: "Use the skill during studying, work, reading, or decision-making." },
        { title: "Build Your System", description: "Create a routine that makes the skill easier to repeat consistently." },
        { title: "Mastery & Reflection", description: "Test improvement, review what worked, and choose the next challenge." },
      ],
    };
  }

  if (world === "book-intelligence") {
    return {
      whatYouLearn: [
        `Use ${title.toLowerCase()} as a structured way to learn from books instead of passively reading.`,
        "Identify important ideas, themes, arguments, evidence, or creative techniques.",
        "Ask better questions and examine what the author is actually doing.",
        "Remember key information through recall and review.",
        "Connect what you read to other books, real situations, or your own projects.",
      ],
      skills: option?.skills?.length
        ? option.skills
        : ["Close Reading", "Analysis", "Recall", "Interpretation", "Application"],
      resources: ["Book Notes", "Discussion Questions", "Recall Prompts", "Concept Maps"],
      modules: [
        { title: "Preview & Context", description: "Understand what you are reading, why it matters, and what to watch for." },
        { title: "Read With Purpose", description: "Identify the important details, ideas, evidence, or creative choices." },
        { title: "Understand Deeply", description: "Explain difficult passages, themes, arguments, and concepts." },
        { title: "Remember It", description: "Use recall questions, notes, and spaced review to keep the important ideas." },
        { title: "Connect & Apply", description: "Relate the book to other ideas, real life, creativity, or decisions." },
        { title: "Mastery Discussion", description: "Explain the book or concept in your own words and defend your understanding." },
      ],
    };
  }

  if (world === "career-skills") {
    return {
      whatYouLearn: [
        `Understand what a ${title} actually does and how the work is performed.`,
        `Learn the core knowledge and practical skills used in ${sectionTitle.toLowerCase()}.`,
        "Practice realistic tasks instead of only memorizing definitions.",
        "Learn the tools, terminology, workflows, and professional standards used in the field.",
        "Build enough understanding to decide whether you want to pursue the path further.",
        "Complete a guided project or scenario that combines the major skills.",
      ],
      skills: techCareerSkills,
      resources: careerResources(sectionTitle),
      modules: [
        { title: "Career Foundations", description: `Understand the role, responsibilities, environment, and expectations of a ${title}.` },
        { title: "Core Knowledge", description: "Learn the concepts and terminology professionals use every day." },
        { title: "Essential Skills & Tools", description: "Practice the most important abilities and become familiar with the tools used in the field." },
        { title: "Guided Real-World Tasks", description: "Work through realistic scenarios with step-by-step instructor guidance." },
        { title: "Professional Workflow", description: "Learn how the work moves from an initial problem to a finished result." },
        { title: "Career Project & Mastery", description: "Complete a practical challenge and explain your decisions independently." },
      ],
    };
  }

  return {
    whatYouLearn: [
      `Build a clear foundation in ${title}.`,
      "Understand the most important concepts and vocabulary.",
      "See how the topic connects to real events, systems, or everyday life.",
      "Practice explaining the topic in your own words.",
      "Use questions and examples to correct misunderstandings.",
      "Finish with a mastery check that tests real understanding.",
    ],
    skills: option?.skills?.length
      ? option.skills
      : ["Understanding", "Analysis", "Reasoning", "Recall", "Application"],
    resources: ["Visual Explanations", "Examples", "Reference Notes", "Practice Questions"],
    modules: [
      { title: "Foundations", description: `Learn the basic ideas and vocabulary behind ${title}.` },
      { title: "Core Concepts", description: "Understand the most important relationships, systems, and explanations." },
      { title: "Examples & Connections", description: "Connect the topic to real examples and related ideas." },
      { title: "Questions & Practice", description: "Apply what you learned and correct weak understanding." },
      { title: "Go Deeper", description: "Explore more advanced ideas, nuance, and important debates or limitations." },
      { title: "Mastery Check", description: "Explain and apply the topic independently." },
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
  const careerCourseSections =
    params.world === "career-skills"
      ? getCareerCourseSections(params.section, resolved.title)
      : [];

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
                    Career requirement note
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

                {params.world === "career-skills" ? (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-[#D7E3F2] bg-white">
                    {careerCourseSections.map((courseSection, sectionIndex) => (
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
                            <p className="mt-1 text-xs text-[#53657D]">
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
                ) : (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-[#D7E3F2] bg-white">
                    {detail.modules.map((module, index) => (
                      <div
                        key={module.title}
                        className="grid gap-4 border-b border-[#E7EDF5] p-5 last:border-b-0 sm:grid-cols-[52px_minmax(0,1fr)]"
                      >
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#EAF3FF] text-sm font-extrabold text-[#1677FF]">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0B1739]">{module.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-[#53657D]">
                            {module.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
