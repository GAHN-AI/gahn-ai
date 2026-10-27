import {
  BookOpen,
  ClipboardCheck,
  LockKeyhole,
  MicOff,
  Monitor,
  Radio,
  VideoOff,
} from "lucide-react";
import type { Course } from "@/lib/course-content/schema";
import CourseSequence from "./CourseSequence";

export default function TutorWorkspace({
  course,
  requestedLocked = false,
  legacyLink = false,
}: {
  course: Course;
  requestedLocked?: boolean;
  legacyLink?: boolean;
}) {
  const firstSection = course.sections[0],
    firstLesson = firstSection.lessons[0];
  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="gahn-eyebrow">Learning workspace</p>
          <h1 className="mt-2 max-w-4xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {course.title}
          </h1>
          <p className="mt-3 text-sm text-[#60748C]">
            Section 1 of {course.sections.length}{" "}
            <span className="px-2 text-[#B5C1CF]">/</span> Lesson 1 of{" "}
            {course.lessonCount}
          </p>
        </div>
        <span className="rounded-full border border-[#D7E2EE] bg-white px-3 py-2 text-xs font-medium text-[#60748C]">
          Workspace preview
        </span>
      </div>
      <p className="mb-5 rounded-lg border border-[#DDE6F1] bg-[#EDF3FA] px-4 py-3 text-sm leading-6 text-[#49627F]">
        Live teaching is not available yet. This preview shows the session
        layout and course order; it does not start a call or record progress.
      </p>
      {requestedLocked ? (
        <p
          role="status"
          className="mb-5 rounded-lg border border-[#E8DFC9] bg-[#FCF8EF] px-4 py-3 text-sm leading-6 text-[#785F30]"
        >
          That lesson is locked. Your course begins here; your tutor will open
          the next lesson after teaching this one and checking your
          understanding.
        </p>
      ) : null}
      {legacyLink ? (
        <p role="status" className="mb-5 text-sm leading-6 text-[#60748C]">
          This link belongs to an earlier outline. You are viewing the revised
          course from its beginning. Previous records have not been changed.
        </p>
      ) : null}
      <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section
          aria-labelledby="tutor-heading"
          className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#D9E2ED] bg-white"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#E4EAF2] px-5 py-4">
            <h2
              id="tutor-heading"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <Radio aria-hidden="true" className="h-4 w-4 text-[#557496]" />
              Your AI tutor
            </h2>
            <span className="text-[11px] text-[#71849A]">Not connected</span>
          </div>
          <div data-instructor-video-slot="instructor" className="flex min-h-[300px] flex-1 flex-col items-center justify-center bg-[#142B43] px-8 py-12 text-center sm:min-h-[410px]">
            <div className="grid h-20 w-20 place-items-center rounded-full border border-white/15 bg-white/5">
              <VideoOff aria-hidden="true" className="h-7 w-7 text-[#A9BDD4]" />
            </div>
            <p className="mt-6 text-xl font-medium text-white">
              Your private AI instructor
            </p>
            <p className="mt-3 max-w-xs text-sm leading-7 text-[#B7C8DA]">
              Your real-time AI instructor will appear here when private sessions become available.
            </p>
            <span className="mt-6 rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-[#B7C8DA]">
              Private sessions coming soon
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
            <p className="flex items-center gap-2 text-xs text-[#71849A]">
              <MicOff aria-hidden="true" className="h-4 w-4" />
              Microphone inactive
            </p>
            <button
              disabled
              type="button"
              className="min-h-10 cursor-not-allowed rounded-lg bg-[#DDEBFF] px-4 py-2 text-xs font-semibold text-[#2A64B8] opacity-75"
            >
              Start private session · Coming soon
            </button>
          </div>
        </section>
        <section
          aria-labelledby="canvas-heading"
          className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#D9E2ED] bg-white"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4EAF2] px-5 py-4">
            <h2
              id="canvas-heading"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <Monitor aria-hidden="true" className="h-4 w-4 text-[#557496]" />
              Magic Canvas
            </h2>
            <span className="flex items-center gap-1.5 text-[11px] text-[#71849A]">
              <LockKeyhole aria-hidden="true" className="h-3 w-3" />
              Tutor controlled
            </span>
          </div>
          <div aria-label="Blank Magic Canvas, awaiting an AI lesson" className="min-h-[300px] flex-1 bg-white sm:min-h-[410px]" data-learning-workspace="magic-canvas" />
        </section>
      </div>
      <section
        aria-labelledby="current-lesson-heading"
        className="mt-6 rounded-xl border border-[#D9E2ED] bg-white p-5 sm:p-7"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.65fr)]">
          <div>
            <p className="gahn-eyebrow">
              Your starting point · Section 1, lesson 1
            </p>
            <h2
              id="current-lesson-heading"
              className="mt-3 text-xl font-semibold tracking-tight"
            >
              {firstLesson.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#60748C]">
              {firstSection.title}
            </p>
          </div>
          <div className="rounded-lg bg-[#F6F8FB] px-4 py-3">
            <p className="flex items-center gap-2 text-xs font-semibold text-[#4E6784]">
              <ClipboardCheck aria-hidden="true" className="h-4 w-4" />
              Understanding check
            </p>
            <p className="mt-2 text-xs leading-6 text-[#60748C]">
              After teaching, your tutor will ask a few questions. If you need
              more practice, you will revisit the idea before moving on.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#E8EDF4] pt-5 text-xs text-[#71849A]">
          <span className="flex items-center gap-2">
            <BookOpen aria-hidden="true" className="h-4 w-4" />0 of{" "}
            {course.lessonCount} completed
          </span>
          <span className="flex items-center gap-2">
            <LockKeyhole aria-hidden="true" className="h-4 w-4" />
            Next lesson locked until the check is passed
          </span>
        </div>
      </section>
      <div className="mt-10">
        <CourseSequence
          sections={course.sections}
          lessonCount={course.lessonCount}
          workspace
        />
      </div>
    </>
  );
}
