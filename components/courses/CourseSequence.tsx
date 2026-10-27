"use client";

import { useRef } from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  CircleDot,
  ClipboardCheck,
  LockKeyhole,
  PencilRuler,
} from "lucide-react";
import type { CourseSection } from "@/lib/course-content/schema";

type Props = {
  sections: CourseSection[];
  lessonCount: number;
  currentIndex?: number;
  workspace?: boolean;
};
const kinds = {
  lesson: "Lesson",
  practice: "Practice",
  project: "Project",
  checkpoint: "Section check",
};
export default function CourseSequence({
  sections,
  lessonCount,
  currentIndex = 0,
  workspace = false,
}: Props) {
  const container = useRef<HTMLDivElement>(null);
  const sectionsWithOffsets = sections.map((section, index) => ({
    section,
    start: sections
      .slice(0, index)
      .reduce((total, item) => total + item.lessons.length, 0),
  }));
  function expand(open: boolean) {
    container.current?.querySelectorAll("details").forEach((item) => {
      item.open = open;
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
          <p className="gahn-eyebrow">
            {workspace
              ? "Your learning sequence"
              : "From the first skill to independent practice"}
          </p>
          <h2
            id="curriculum-heading"
            className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {workspace ? "Course content" : "Course curriculum"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#53657D]">
            {sections.length} sections · {lessonCount} lessons, practice tasks &
            checks
          </p>
        </div>
        <div className="flex gap-4 text-xs font-semibold text-[#1677FF]">
          <button
            type="button"
            onClick={() => expand(true)}
            className="min-h-11 hover:underline"
          >
            Expand all
          </button>
          <button
            type="button"
            onClick={() => expand(false)}
            className="min-h-11 hover:underline"
          >
            Collapse all
          </button>
        </div>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-[#53657D]">
        {workspace
          ? "Your tutor teaches the current lesson, checks your understanding, then opens the next. You can explore the outline below; future lessons stay locked."
          : "Explore the complete sequence. Live teaching will follow this order, with practice and a short understanding check before your tutor moves you forward. Your pace depends on practice and understanding."}
      </p>
      <div
        ref={container}
        className="mt-6 overflow-hidden rounded-xl border border-[#D9E2ED] bg-white"
      >
        {sectionsWithOffsets.map(({ section, start }, index) => {
          const current =
            currentIndex >= start &&
            currentIndex < start + section.lessons.length;
          const completed = currentIndex >= start + section.lessons.length;
          return (
            <details
              key={section.id}
              open={workspace ? current : index === 0}
              className="group border-b border-[#E1E7EF] last:border-b-0"
            >
              <summary
                className={`flex min-h-[76px] cursor-pointer list-none items-center gap-3 px-4 py-5 hover:bg-[#F0F4F9] sm:gap-4 sm:px-6 ${current && workspace ? "bg-[#EDF4FC]" : "bg-[#F7F9FC]"}`}
              >
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[#64748B] transition-transform group-open:rotate-180"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-[#6A7D94]">
                    Section {index + 1}
                    {workspace && current ? " · Current section" : ""}
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-6 text-[#142B47] sm:text-base">
                    {section.title}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-[#64748B]">
                  {section.lessons.length}{" "}
                  <span className="hidden sm:inline">lessons</span>
                </span>
                {workspace ? (
                  completed ? (
                    <Check
                      aria-label="Section complete"
                      className="h-4 w-4 text-[#337355]"
                    />
                  ) : current ? (
                    <CircleDot
                      aria-label="Current section"
                      className="h-4 w-4 text-[#1677FF]"
                    />
                  ) : (
                    <LockKeyhole
                      aria-label="Section locked"
                      className="h-4 w-4 text-[#8392A5]"
                    />
                  )
                ) : null}
              </summary>
              <ol className="divide-y divide-[#EEF2F6]">
                {section.lessons.map((lesson, i) => {
                  const absolute = start + i;
                  const status =
                    absolute < currentIndex
                      ? "Completed"
                      : absolute === currentIndex
                        ? "Current lesson"
                        : "Locked";
                  const Icon = workspace
                    ? status === "Completed"
                      ? Check
                      : status === "Locked"
                        ? LockKeyhole
                        : CircleDot
                    : lesson.kind === "checkpoint"
                      ? ClipboardCheck
                      : lesson.kind === "practice"
                        ? PencilRuler
                        : BookOpen;
                  return (
                    <li
                      key={lesson.id}
                      aria-current={
                        workspace && status === "Current lesson"
                          ? "step"
                          : undefined
                      }
                      className={`flex items-start gap-3 px-4 py-4 text-sm leading-6 sm:gap-4 sm:px-6 ${workspace && status === "Current lesson" ? "bg-[#F4F8FE]" : ""}`}
                    >
                      <Icon
                        aria-hidden="true"
                        className={`mt-1 h-4 w-4 shrink-0 ${workspace && status === "Current lesson" ? "text-[#2865AD]" : "text-[#8392A5]"}`}
                      />
                      <span className="hidden w-9 shrink-0 text-xs tabular-nums leading-6 text-[#8392A5] sm:block">
                        {index + 1}.{i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <span
                          className={
                            workspace && status === "Current lesson"
                              ? "font-semibold text-[#204D82]"
                              : "text-[#334A65]"
                          }
                        >
                          {lesson.title}
                        </span>
                        <span className="mt-1 block text-[11px] text-[#6D7D91]">
                          {kinds[lesson.kind]}
                        </span>
                      </div>
                      {workspace ? (
                        <span
                          className={`shrink-0 text-[11px] ${status === "Current lesson" ? "font-semibold text-[#2865AD]" : "text-[#718096]"}`}
                        >
                          {status === "Current lesson"
                            ? currentIndex === 0
                              ? "Up first"
                              : "Current"
                            : status}
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
              <div className="border-t border-[#E9EEF3] bg-[#F7FAF8] px-5 py-5 sm:px-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#47715B]">
                  Apply what you learned
                </p>
                <p className="mt-2 text-sm leading-6 text-[#365044]">
                  {section.practice}
                </p>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
