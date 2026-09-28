"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  GraduationCap,
  MonitorUp,
  Sparkles,
} from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";
import MayaLiveAvatar from "@/components/lessons/MayaLiveAvatar";
import { lessonIdFromParts } from "@/lib/ai/lessonEngine";
import { isLearningWorldAvailable } from "@/lib/learningWorldAvailability";
import { supabase } from "@/lib/supabaseClient";

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
    (params.lessonId !== "custom"
      ? params.lessonId
      : "Private Lesson");

  const [language, setLanguage] = useState(
    searchParams.get("language") || "English"
  );

  const worldTitle =
    worldNames[worldSlug] || "Learning World";

  const available =
    isLearningWorldAvailable(worldSlug);

  const progressLessonId = useMemo(
    () =>
      lessonIdFromParts(
        worldSlug,
        topicSlug || undefined,
        topic
      ),
    [topic, topicSlug, worldSlug]
  );

  useEffect(() => {
    const stored =
      window.localStorage.getItem("gahn-language");

    if (!searchParams.get("language") && stored) {
      setLanguage(stored);
    }
  }, [searchParams]);

  useEffect(() => {
    async function recordStart() {
      if (!available) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      await supabase
        .from("learning_progress")
        .upsert(
          {
            user_id: user.id,
            world_slug: worldSlug,
            section_slug: sectionSlug || null,
            topic_slug: topicSlug || null,
            topic,
            lesson_id: progressLessonId,
            lesson_title: topic,
            status: "in_progress",
            mastery_state: "learning",
            last_activity_at:
              new Date().toISOString(),
          },
          {
            onConflict:
              "user_id,world_slug,lesson_id",
          }
        );
    }

    void recordStart();
  }, [
    available,
    progressLessonId,
    sectionSlug,
    topic,
    topicSlug,
    worldSlug,
  ]);

  function changeLanguage(
    nextLanguage: string
  ) {
    setLanguage(nextLanguage);

    window.localStorage.setItem(
      "gahn-language",
      nextLanguage
    );
  }

  const backHref =
    sectionSlug && topicSlug
      ? `/learn/${worldSlug}/${sectionSlug}/${topicSlug}?language=${encodeURIComponent(
          language
        )}`
      : `/learn/${worldSlug}?language=${encodeURIComponent(
          language
        )}`;

  if (!available) {
    return (
      <main className="min-h-screen bg-[#F4F7FB] px-5 py-10 text-black sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/dashboard"
            className="font-black text-[#0B1739]"
          >
            ← Back to Dashboard
          </Link>

          <div className="mt-10 rounded-2xl border border-[#D8E0EA] bg-white p-10 text-center">
            <h1 className="text-3xl font-black text-[#0B1739]">
              This learning world is not
              available yet.
            </h1>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F7FB] font-sans text-black">
      <header className="border-b border-[#D8E0EA] bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-black text-[#0B1739]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to course
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector
              value={language}
              onChange={changeLanguage}
              compact
            />

            <Link
              href="/"
              className="font-black text-[#0B1739]"
            >
              GAHN AI
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-5 py-6 sm:px-8 lg:py-8">
        <section className="mb-6 rounded-[1.4rem] border border-[#BFD3ED] bg-white p-5 shadow-[0_10px_28px_rgba(11,23,57,0.04)] sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
                {worldTitle}
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-[-0.035em] text-[#0B1739]">
                {topic}
              </h1>

              <p className="mt-2 text-sm font-medium leading-6 text-black">
                Learn with a real-time AI
                instructor and an interactive
                learning workspace.
              </p>
            </div>

            <div className="rounded-full bg-[#EAF3FF] px-4 py-2 text-sm font-black text-[#0B1739]">
              Teaching in {language}
            </div>
          </div>
        </section>

        <section className="grid min-h-[680px] gap-5 xl:grid-cols-[0.88fr_1.12fr]">
          <div className="overflow-hidden rounded-[1.6rem] border border-[#07162F] bg-[#07162F] shadow-[0_18px_48px_rgba(7,22,47,0.16)]">
            <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8DB8FF]">
                  AI Instructor
                </p>

                <p className="mt-1 text-sm font-black text-white">
                  {worldSlug ===
                  "career-skills"
                    ? "Maya — Live AI Instructor"
                    : "School Help AI Instructor"}
                </p>
              </div>

              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-white">
                {worldSlug ===
                "career-skills"
                  ? "Live"
                  : "Coming Next"}
              </span>
            </div>

            {worldSlug ===
            "career-skills" ? (
              <MayaLiveAvatar />
            ) : (
              <div className="flex min-h-[540px] items-center justify-center px-6 text-center text-white">
                <div>
                  <h2 className="text-2xl font-black text-white">
                    School Help instructor
                  </h2>

                  <p className="mt-3 max-w-md text-sm font-medium leading-7 text-white">
                    Maya is being tested with
                    Career Skills first. The
                    School Help instructor will
                    be connected separately.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-[1.6rem] border border-[#BFD3ED] bg-white shadow-[0_18px_48px_rgba(11,23,57,0.06)]">
            <div className="flex items-center justify-between border-b border-[#D8E0EA] bg-white px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
                  Interactive Learning Panel
                </p>

                <p className="mt-1 text-sm font-black text-[#0B1739]">
                  Live teaching workspace
                </p>
              </div>

              <span className="rounded-full bg-[#EAF3FF] px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#0B1739]">
                Next Integration
              </span>
            </div>

            <div className="min-h-[540px] bg-[#F8FAFD] p-5 sm:p-7">
              <div className="grid min-h-[490px] place-items-center rounded-[1.35rem] border-2 border-dashed border-[#BFD3ED] bg-white p-6 text-center">
                <div className="max-w-lg">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#EAF3FF] text-[#1677FF]">
                    <MonitorUp className="h-7 w-7" />
                  </div>

                  <h2 className="mt-5 text-2xl font-black text-[#0B1739]">
                    Interactive learning UI
                    will appear here
                  </h2>

                  <p className="mt-3 text-sm font-medium leading-7 text-black">
                    This panel will react to
                    the AI instructor and show
                    explanations, questions,
                    visuals, examples, and
                    activities while the
                    learner is being taught.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      "Visual",
                      "Question",
                      "Activity",
                    ].map((label) => (
                      <div
                        key={label}
                        className="rounded-xl border border-[#D8E0EA] bg-[#F4F7FB] p-4"
                      >
                        <Sparkles className="mx-auto h-4 w-4 text-[#1677FF]" />

                        <p className="mt-2 text-xs font-black text-black">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#D8E0EA] bg-white px-4 py-3">
          <GraduationCap className="h-4 w-4 text-[#1677FF]" />

          <p className="text-sm font-bold text-black">
            Opening this page records the
            lesson as started. Mastery is not
            awarded until the real teaching
            system produces learning evidence.
          </p>
        </div>
      </div>
    </main>
  );
}