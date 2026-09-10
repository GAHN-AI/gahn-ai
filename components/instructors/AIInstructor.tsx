"use client";

import { useState } from "react";
import {
  Mic,
  MicOff,
  Pause,
  Play,
  MessageSquareText,
  RefreshCcw,
  StickyNote,
  Volume2,
} from "lucide-react";

type AIInstructorProps = {
  instructorName?: string;
  world?: string;
  lessonTitle?: string;
};

export default function AIInstructor({
  instructorName = "AI Instructor",
  world = "Learning World",
  lessonTitle = "Current Lesson",
}: AIInstructorProps) {
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#dbe3ee] bg-white shadow-sm">
      {/* AI INSTRUCTOR VIDEO AREA */}
      <div className="relative flex min-h-[520px] items-center justify-center bg-[#f0fdf4]">
        <div className="px-6 text-center">
          <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-[#dcfce7]">
            <Volume2
              className="h-12 w-12 text-[#16a34a]"
              strokeWidth={1.6}
            />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#16a34a]">
            AI Instructor
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-[#111827]">
            {instructorName}
          </h2>

          <p className="mt-2 font-semibold text-[#16a34a]">
            {world}
          </p>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#4b5563]">
            {started
              ? paused
                ? "Lesson paused."
                : `Teaching: ${lessonTitle}`
              : "Your realistic AI instructor will appear here."}
          </p>

          <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-[#6b7280]">
            The live avatar system will later support natural speech, facial
            expressions, gestures, sitting, standing, demonstrations, and
            whiteboard instruction.
          </p>
        </div>

        <div className="absolute left-5 top-5 rounded-full border border-[#bbf7d0] bg-white px-3 py-1.5 text-xs font-bold text-[#16a34a]">
          {started && !paused ? "● LIVE LESSON" : "READY"}
        </div>
      </div>

      {/* BOTTOM CONTROL BAR */}
      <div className="border-t border-[#dbe3ee] bg-white p-4">
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <button
            type="button"
            onClick={() => {
              setStarted(true);
              setMicrophoneEnabled((value) => !value);
            }}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#dbe3ee] px-3 py-3 text-sm font-semibold transition hover:border-[#22c55e] hover:bg-[#f0fdf4]"
          >
            {microphoneEnabled ? (
              <Mic className="h-4 w-4 text-[#16a34a]" />
            ) : (
              <MicOff className="h-4 w-4" />
            )}
            Mic
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#dbe3ee] px-3 py-3 text-sm font-semibold transition hover:border-[#22c55e] hover:bg-[#f0fdf4]"
          >
            <MessageSquareText className="h-4 w-4" />
            Type
          </button>

          <button
            type="button"
            onClick={() => {
              if (!started) setStarted(true);
              setPaused((value) => !value);
            }}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#dbe3ee] px-3 py-3 text-sm font-semibold transition hover:border-[#22c55e] hover:bg-[#f0fdf4]"
          >
            {paused ? (
              <Play className="h-4 w-4" />
            ) : (
              <Pause className="h-4 w-4" />
            )}
            {paused ? "Resume" : "Pause"}
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#dbe3ee] px-3 py-3 text-sm font-semibold transition hover:border-[#22c55e] hover:bg-[#f0fdf4]"
          >
            <RefreshCcw className="h-4 w-4" />
            Repeat
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#dbe3ee] px-3 py-3 text-sm font-semibold transition hover:border-[#22c55e] hover:bg-[#f0fdf4]"
          >
            <RefreshCcw className="h-4 w-4" />
            Explain Differently
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#dbe3ee] px-3 py-3 text-sm font-semibold transition hover:border-[#22c55e] hover:bg-[#f0fdf4]"
          >
            <StickyNote className="h-4 w-4" />
            Notes
          </button>
        </div>

        {!started && (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#22c55e] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#16a34a]"
          >
            <Play className="h-4 w-4" />
            Start Lesson
          </button>
        )}
      </div>
    </div>
  );
}