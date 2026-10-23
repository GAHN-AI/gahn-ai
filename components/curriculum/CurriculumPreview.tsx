"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, FileText } from "lucide-react";
import type { CareerCurriculumPreview } from "@/lib/careerCurricula";

export default function CurriculumPreview({
  curriculum,
}: {
  curriculum: CareerCurriculumPreview;
}) {
  const container = useRef<HTMLDivElement>(null);
  function setAll(open: boolean) {
    container.current?.querySelectorAll("details").forEach((section) => {
      section.open = open;
    });
  }
  return (
    <section
      id="curriculum"
      aria-labelledby="curriculum-heading"
      className="scroll-mt-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="gahn-eyebrow">A clear path through the material</p>
          <h2
            id="curriculum-heading"
            className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Course curriculum
          </h2>
          <p className="mt-3 text-sm text-[#53657D]">
            {curriculum.sections.length} sections · {curriculum.lessonCount}{" "}
            planned lessons · Self-paced
          </p>
        </div>
        <div className="flex gap-4 text-xs font-semibold text-[#325A94]">
          <button
            type="button"
            className="min-h-10 underline-offset-4 hover:underline"
            onClick={() => setAll(true)}
          >
            Expand all
          </button>
          <button
            type="button"
            className="min-h-10 underline-offset-4 hover:underline"
            onClick={() => setAll(false)}
          >
            Collapse all
          </button>
        </div>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-[#53657D]">
        This is a curriculum preview. Lessons, exercises, and instructor
        feedback are planned; there are no active lectures to play. Sections
        follow a suggested order, with no calendar-day deadlines.
      </p>
      <div
        ref={container}
        className="mt-6 overflow-hidden rounded-2xl border border-[#DCE3EC] bg-white"
      >
        {curriculum.sections.map((section, index) => (
          <details
            key={section.id}
            open={index === 0}
            className="group border-b border-[#E5EAF1] last:border-b-0"
          >
            <summary className="flex min-h-20 cursor-pointer list-none items-center gap-3 bg-[#F8FAFC] px-4 py-5 transition-colors hover:bg-[#F0F4F9] sm:gap-5 sm:px-6">
              <span className="text-xs font-medium tabular-nums text-[#718096]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1 text-sm font-semibold leading-6 text-[#142B47] sm:text-base">
                {section.title}
              </span>
              <span className="hidden shrink-0 text-xs text-[#64748B] sm:block">
                {section.lessons.length} lessons
              </span>
              <ChevronDown
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[#64748B] transition-transform group-open:rotate-180"
              />
            </summary>
            <ol className="divide-y divide-[#F0F3F7] px-4 sm:px-6">
              {section.lessons.map((lesson, lessonIndex) => {
                const query = new URLSearchParams({
                  world: "career-skills",
                  section: curriculum.careerSlug,
                  lesson: lesson.id,
                });
                return (
                  <li key={lesson.id}>
                    <Link
                      href={`/lesson/custom?${query}`}
                      className="group/lesson flex items-center gap-3 py-4 text-sm leading-6 transition-colors hover:text-[#1557C0] sm:gap-4"
                      aria-label={`Preview workspace for ${lesson.title}`}
                    >
                      <FileText
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-[#8B99AC]"
                      />
                      <span className="hidden w-7 shrink-0 text-xs tabular-nums text-[#8B99AC] sm:block">
                        {index + 1}.{lessonIndex + 1}
                      </span>
                      <span className="min-w-0 flex-1">{lesson.title}</span>
                      <span className="hidden shrink-0 text-xs text-[#718096] md:block">
                        Workspace preview
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-[#8B99AC] group-hover/lesson:text-[#1557C0]"
                      />
                    </Link>
                  </li>
                );
              })}
            </ol>
            <div className="mx-4 mb-5 grid gap-4 rounded-xl border border-[#DFE9E3] bg-[#F5F9F6] p-4 text-sm leading-6 sm:mx-6 sm:grid-cols-2 sm:p-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#37664E]">
                  Planned practice
                </p>
                <p className="mt-2 text-[#365044]">{section.practice}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#37664E]">
                  Review checkpoint
                </p>
                <p className="mt-2 text-[#365044]">{section.outcome}</p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
