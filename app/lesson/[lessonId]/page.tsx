"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import LearningStudio from "@/components/lessons/LearningStudio";
import { getCareerSection } from "@/lib/careerCatalog";
import { isLearningWorldAvailable } from "@/lib/learningWorldAvailability";

const worldNames: Record<string, string> = {
  "career-skills": "Career Skills",
  "school-help": "School Help",
  "brain-development": "Brain Development",
  "general-knowledge": "General Knowledge",
  "book-intelligence": "Book Intelligence",
};

export default function LessonPage() {
  const params = useParams<{ lessonId: string }>();
  const searchParams = useSearchParams();

  const worldSlug = searchParams.get("world") || "career-skills";
  const sectionSlug = searchParams.get("section");
  const topicSlug = searchParams.get("topicSlug");
  const topic =
    searchParams.get("topic") ||
    (params.lessonId !== "custom" ? params.lessonId : "Private Lesson");
  const worldTitle = worldNames[worldSlug] || "Learning World";

  const careerSection =
    worldSlug === "career-skills" && sectionSlug
      ? getCareerSection(sectionSlug)
      : null;
  const lessonPoints = careerSection?.skills || [
    "Understand the concept",
    "Practice with examples",
    "Explain what you learned",
  ];

  const backHref = sectionSlug && topicSlug
    ? `/learn/${worldSlug}/${sectionSlug}/${topicSlug}`
    : sectionSlug && worldSlug === "career-skills"
      ? `/learn/career-skills/${sectionSlug}`
      : `/learn/${worldSlug}`;

  if (!isLearningWorldAvailable(worldSlug)) {
    return (
      <main className="min-h-screen bg-[#F7F8FA] px-5 py-10 font-sans text-[#0B1739]">
        <div className="mx-auto max-w-5xl">
          <Link href="/dashboard" className="text-sm font-semibold text-[#0B5CFF]">← Back to Dashboard</Link>
          <div className="mt-8 rounded-2xl border border-[#D7E3F2] bg-white p-10 text-center">
            <h1 className="text-2xl font-extrabold">This learning world is not available yet.</h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F7FB] px-4 py-6 font-sans text-[#0B1739] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1480px]">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link href={backHref} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#24344D] hover:bg-[#EDF3FB]">
            <ArrowLeft className="h-4 w-4" /> Back to course
          </Link>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-extrabold">
            <img src="/logo/favicon.png" alt="" className="h-7 w-7 rounded-full object-cover" />
            GAHN AI
          </Link>
        </header>

        <section className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-[#D7E3F2] bg-white px-5 py-4 shadow-[0_12px_30px_rgba(11,23,57,0.04)] sm:px-7">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-2xl font-extrabold tracking-tight text-[#0B1739]">GAHN AI</span>
              <span className="rounded-full bg-[#EAF3FF] px-3 py-1 text-xs font-semibold text-[#1F6BFF]">{worldTitle}</span>
            </div>
            <h1 className="mt-1 text-sm font-semibold text-[#40536D]">{topic}</h1>
          </div>
          <p className="text-sm text-[#65758A]">Your topic. A guided lesson workspace.</p>
        </section>

        <LearningStudio
          key={`${worldSlug}-${sectionSlug || ""}-${topicSlug || ""}-${topic}`}
          worldSlug={worldSlug}
          worldTitle={worldTitle}
          sectionSlug={sectionSlug}
          sectionTitle={careerSection?.category || undefined}
          topicSlug={topicSlug}
          topic={topic}
          lessonTitle={topic}
          lessonPoints={lessonPoints}
          language="English"
        />
      </div>
    </main>
  );
}
