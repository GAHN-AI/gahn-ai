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
  language?: string;
};

export default function AIInstructor({
  instructorName = "AI Instructor",
  world = "Learning World",
  lessonTitle = "Current Lesson",
  language = "English",
}: AIInstructorProps) {
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[#D7E3F2] bg-white shadow-[0_16px_45px_rgba(11,23,57,0.06)]">
      <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_55%,#EAF3FF_100%)]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#DDEBFF]/80" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 left-[12%] h-44 w-[520px] rotate-[-8deg] rounded-[999px] bg-white/75" />
        <div aria-hidden="true" className="pointer-events-none absolute left-[18%] top-[22%] h-28 w-28 rounded-full border border-[#D7E3F2]/70" />

        <div className="relative px-6 text-center">
          <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-[#CFE0F5] bg-white shadow-[0_12px_35px_rgba(22,119,255,0.10)]">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-[#EAF3FF]">
              <Volume2 className="h-10 w-10 text-[#1677FF]" strokeWidth={1.6} />
            </div>
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#1677FF]">AI Instructor</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-[#0B1739]">{instructorName}</h2>
          <p className="mt-2 font-semibold text-[#1677FF]">{world}</p>
          <div className="mx-auto mt-3 w-fit rounded-full border border-[#CFE0F5] bg-white px-3 py-1.5 text-xs font-bold text-[#53657D]">
            Teaching in {language}
          </div>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#53657D]">
            {started
              ? paused
                ? "Lesson paused."
                : `Teaching: ${lessonTitle}`
              : "Your realistic AI instructor will appear here."}
          </p>

          <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-[#7A8AA0]">
            The live avatar system will later support natural speech, facial expressions, gestures, sitting, standing, demonstrations, and whiteboard instruction.
          </p>
        </div>

        <div className="absolute left-5 top-5 rounded-full border border-[#CFE0F5] bg-white/95 px-3 py-1.5 text-xs font-bold text-[#1677FF] shadow-sm">
          {started && !paused ? "● LIVE LESSON" : "READY"}
        </div>
      </div>

      <div className="border-t border-[#D7E3F2] bg-white p-4">
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <button
            type="button"
            onClick={() => {
              setStarted(true);
              setMicrophoneEnabled((value) => !value);
            }}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#D7E3F2] bg-white px-3 py-3 text-sm font-semibold text-[#0B1739] hover:border-[#1677FF]/45 hover:bg-[#F1F7FF]"
          >
            {microphoneEnabled ? (
              <Mic className="h-4 w-4 text-[#1677FF]" />
            ) : (
              <MicOff className="h-4 w-4 text-[#53657D]" />
            )}
            Mic
          </button>

          <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-[#D7E3F2] bg-white px-3 py-3 text-sm font-semibold text-[#0B1739] hover:border-[#1677FF]/45 hover:bg-[#F1F7FF]">
            <MessageSquareText className="h-4 w-4 text-[#53657D]" />
            Type
          </button>

          <button
            type="button"
            onClick={() => {
              if (!started) setStarted(true);
              setPaused((value) => !value);
            }}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#D7E3F2] bg-white px-3 py-3 text-sm font-semibold text-[#0B1739] hover:border-[#1677FF]/45 hover:bg-[#F1F7FF]"
          >
            {paused ? (
              <Play className="h-4 w-4 text-[#1677FF]" />
            ) : (
              <Pause className="h-4 w-4 text-[#53657D]" />
            )}
            {paused ? "Resume" : "Pause"}
          </button>

          <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-[#D7E3F2] bg-white px-3 py-3 text-sm font-semibold text-[#0B1739] hover:border-[#1677FF]/45 hover:bg-[#F1F7FF]">
            <RefreshCcw className="h-4 w-4 text-[#53657D]" />
            Repeat
          </button>

          <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-[#D7E3F2] bg-white px-3 py-3 text-sm font-semibold text-[#0B1739] hover:border-[#1677FF]/45 hover:bg-[#F1F7FF]">
            <RefreshCcw className="h-4 w-4 text-[#53657D]" />
            Explain Differently
          </button>

          <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-[#D7E3F2] bg-white px-3 py-3 text-sm font-semibold text-[#0B1739] hover:border-[#1677FF]/45 hover:bg-[#F1F7FF]">
            <StickyNote className="h-4 w-4 text-[#53657D]" />
            Notes
          </button>
        </div>

        {!started && (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1677FF] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#0F65E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] focus-visible:ring-offset-2"
          >
            <Play className="h-4 w-4" />
            Start Lesson
          </button>
        )}
      </div>
    </div>
  );
}
