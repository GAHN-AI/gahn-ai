import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import LearningStudio from "@/components/lessons/LearningStudio";
import { getCareerSection } from "@/lib/careerCatalog";
import { getCareerLesson } from "@/lib/careerCurricula";
import { isLearningWorldAvailable } from "@/lib/learningWorldAvailability";
import {
  getPracticalSkillRoadmap,
  practicalLessonPoints,
} from "@/lib/practicalSkillRoadmaps";

const worldNames: Record<string, string> = {
  "career-skills": "Career Skills",
  "school-help": "School Help",
  "brain-development": "Brain Development",
  "general-knowledge": "General Knowledge",
  "book-intelligence": "Book Intelligence",
};

export default async function LessonPage({
  params,
  searchParams: rawSearchParams,
}: {
  params: Promise<{ lessonId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [route, query] = await Promise.all([params, rawSearchParams]);
  const searchParams = {
    get: (name: string) =>
      typeof query[name] === "string" ? (query[name] as string) : null,
  };

  const worldSlug = searchParams.get("world") || "career-skills";
  const sectionSlug = searchParams.get("section");
  const topicSlug = searchParams.get("topicSlug");
  const requestedTopic =
    searchParams.get("topic") ||
    (route.lessonId !== "custom" ? route.lessonId : "Lesson workspace");
  const worldTitle = worldNames[worldSlug] || "Learning World";

  const careerSection =
    worldSlug === "career-skills" && sectionSlug
      ? getCareerSection(sectionSlug)
      : null;
  // Career learning always uses an approved digital career title, not a
  // free-form URL that could accidentally resurrect a retired clinical/trade path.
  const topic =
    worldSlug === "career-skills" && careerSection
      ? careerSection.title
      : requestedTopic;
  const requestedLesson = searchParams.get("lesson");
  const selectedLesson =
    careerSection && requestedLesson
      ? getCareerLesson(careerSection.slug, requestedLesson)
      : null;
  const curriculumSection = selectedLesson?.section;
  const curriculumLesson = selectedLesson?.lesson;
  if (requestedLesson && !curriculumLesson) notFound();
  const lessonTitle = curriculumLesson?.title || topic;
  const skillRoadmap = getPracticalSkillRoadmap(
    worldSlug,
    sectionSlug,
    topicSlug,
  );
  const lessonPoints = practicalLessonPoints(skillRoadmap);
  const lessonGoals = curriculumSection
    ? [
        curriculumSection.outcome,
        `Planned practice: ${curriculumSection.practice}`,
      ]
    : lessonPoints.length > 0
      ? lessonPoints
      : [
          `Explain the essential knowledge behind ${topic} with accurate examples.`,
          `Practice a realistic ${topic} task, show your reasoning, and correct mistakes.`,
          `Explain how to apply ${topic} responsibly and communicate the result to someone else.`,
        ];

  const backHref =
    sectionSlug && worldSlug === "career-skills"
      ? `/learn/career-skills/${sectionSlug}#curriculum`
      : sectionSlug && topicSlug
        ? `/learn/${worldSlug}/${sectionSlug}/${topicSlug}`
        : sectionSlug && worldSlug === "career-skills"
          ? `/learn/career-skills/${sectionSlug}`
          : `/learn/${worldSlug}`;

  if (worldSlug === "career-skills" && !careerSection) {
    return (
      <main
        id="main-content"
        className="min-h-screen bg-[#F7F8FA] px-5 py-10 font-sans text-[#0B1739]"
      >
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#D7E3F2] bg-white p-8">
          <h1 className="text-2xl font-extrabold">
            This career lesson is no longer offered
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#53657D]">
            Career Skills now focuses on digital work that can be practiced
            online. Previous clinical, in-person trade and other removed career
            paths are no longer in the active catalog.
          </p>
          <Link
            href="/learn/career-skills"
            className="mt-5 inline-block rounded-lg bg-[#0B5CFF] px-5 py-3 text-sm font-bold text-white"
          >
            Browse current digital careers
          </Link>
        </div>
      </main>
    );
  }

  if (!isLearningWorldAvailable(worldSlug)) {
    return (
      <main
        id="main-content"
        className="min-h-screen bg-[#F7F8FA] px-5 py-10 font-sans text-[#0B1739]"
      >
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="text-sm font-semibold text-[#0B5CFF]"
          >
            ← Back to Dashboard
          </Link>
          <div className="mt-8 rounded-2xl border border-[#D7E3F2] bg-white p-10 text-center">
            <h1 className="text-2xl font-extrabold">
              This learning world is not available yet.
            </h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F5F7FB] px-4 py-6 font-sans text-[#0B1739] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1480px]">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#24344D] hover:bg-[#EDF3FB]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to course
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-extrabold"
          >
            <Image
              src="/logo/favicon.png"
              width={28}
              height={28}
              alt=""
              className="h-7 w-7 rounded-full object-cover"
            />
            GAHN AI
          </Link>
        </header>

        <section className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-[#D7E3F2] bg-white px-5 py-4 shadow-[0_12px_30px_rgba(11,23,57,0.04)] sm:px-7">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-2xl font-extrabold tracking-tight text-[#0B1739]">
                GAHN AI
              </span>
              <span className="rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-semibold text-[#1F6BFF]">
                {worldTitle}
              </span>
            </div>
            <h1 className="mt-1 text-sm font-semibold text-[#40536D]">
              {lessonTitle}
            </h1>
            {curriculumSection && (
              <p className="mt-1 text-xs text-[#65758A]">
                {topic} · {curriculumSection.title}
              </p>
            )}
          </div>
          <p className="text-sm text-[#65758A]">
            Workspace preview · Interactive lessons coming later
          </p>
        </section>

        <LearningStudio
          key={`${worldSlug}-${sectionSlug || ""}-${curriculumLesson?.id || topicSlug || ""}-${topic}`}
          worldSlug={worldSlug}
          worldTitle={worldTitle}
          sectionSlug={sectionSlug}
          sectionTitle={careerSection?.category || undefined}
          topicSlug={curriculumLesson?.id || topicSlug}
          topic={topic}
          lessonTitle={lessonTitle}
          lessonPoints={lessonGoals}
          language="English"
        />
      </div>
    </main>
  );
}
