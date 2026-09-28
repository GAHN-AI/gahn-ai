"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, MonitorUp, Sparkles } from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";
import MayaLiveAvatar from "@/components/lessons/MayaLiveAvatar";

const worldInformation = {
  "career-skills": {
    title: "Career Skills",
    instructor: "Maya",
    available: true,
  },
  "school-help": {
    title: "School Help",
    instructor: "AI Instructor",
    available: true,
  },
  "brain-development": {
    title: "Brain Development",
    instructor: "AI Instructor",
    available: false,
  },
  "general-knowledge": {
    title: "General Knowledge",
    instructor: "AI Instructor",
    available: false,
  },
  "book-intelligence": {
    title: "Book Intelligence",
    instructor: "AI Instructor",
    available: false,
  },
} as const;

type WorldKey = keyof typeof worldInformation;

function formatSlug(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function LessonPage() {
  const params = useParams<{ lessonId: string }>();
  const searchParams = useSearchParams();

  const lessonId = params.lessonId;

  const requestedWorldSlug =
    searchParams.get("world") || "career-skills";

  const learningSection = searchParams.get("section");
  const topicSlug = searchParams.get("topicSlug");

  const resolvedWorldSlug: WorldKey =
    requestedWorldSlug in worldInformation
      ? (requestedWorldSlug as WorldKey)
      : "career-skills";

  const requestedTopic =
    searchParams.get("topic") ||
    (lessonId !== "custom"
      ? formatSlug(lessonId)
      : "Private Lesson");

  const world = worldInformation[resolvedWorldSlug];

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
    window.localStorage.setItem(
      "gahn-language",
      nextLanguage
    );
  }

  const backHref =
    learningSection && topicSlug
      ? `/learn/${resolvedWorldSlug}/${encodeURIComponent(
          learningSection
        )}/${encodeURIComponent(
          topicSlug
        )}?language=${encodeURIComponent(language)}`
      : learningSection
        ? `/learn/${resolvedWorldSlug}/${encodeURIComponent(
            learningSection
          )}?language=${encodeURIComponent(language)}`
        : `/learn/${resolvedWorldSlug}?language=${encodeURIComponent(
            language
          )}`;

  if (!world.available) {
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
              This learning world is not available yet.
            </h1>

            <p className="mt-3 text-sm font-medium text-black">
              GAHN is currently focused on Career Skills and
              School Help.
            </p>
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
              className="flex items-center gap-3"
            >
              <img
                src="/logo/favicon.png"
                alt="GAHN AI"
                className="h-10 w-10 rounded-full object-cover"
              />

              <div className="hidden sm:block">
                <span className="block font-extrabold tracking-[-0.02em] text-[#0B1739]">
                  GAHN AI
                </span>

                <span className="block text-[7px] font-bold uppercase tracking-[0.16em] text-black">
                  Global AI Human Helper Network
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-5 py-6 sm:px-8 lg:py-8">
        <section className="mb-6 rounded-[1.4rem] border border-[#BFD3ED] bg-white p-5 shadow-[0_10px_28px_rgba(11,23,57,0.04)] sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
                {world.title}
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-[-0.035em] text-[#0B1739]">
                {requestedTopic}
              </h1>

              <p className="mt-2 text-sm font-medium leading-6 text-black">
                Learn through a live private AI instructor and an
                interactive learning panel.
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
                  {resolvedWorldSlug === "career-skills"
                    ? "Maya — Live AI Instructor"
                    : "School Help AI Instructor"}
                </p>
              </div>

              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-white">
                {resolvedWorldSlug === "career-skills"
                  ? "Live"
                  : "Coming Next"}
              </span>
            </div>

            {resolvedWorldSlug === "career-skills" ? (
              <MayaLiveAvatar />
            ) : (
              <div className="flex min-h-[540px] items-center justify-center px-6 text-center text-white">
                <div>
                  <h2 className="text-2xl font-black">
                    School Help instructor
                  </h2>

                  <p className="mt-3 max-w-md text-sm font-medium leading-7 text-white">
                    The Career Skills Maya integration is being
                    tested first. School Help will receive its own
                    instructor configuration.
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
                    Interactive learning UI will appear here
                  </h2>

                  <p className="mt-3 text-sm font-medium leading-7 text-black">
                    After Maya is working correctly, this panel
                    will automatically show explanations,
                    questions, visuals, examples, and activities
                    while she teaches.
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
      </div>
    </main>
  );
}