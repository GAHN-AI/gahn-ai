"use client";

import MayaLiveAvatar from "@/components/lessons/MayaLiveAvatar";
import { getLearningWorldInstructor } from "@/lib/ai/worldInstructors";

type Props = {
  worldSlug: string;
  sectionSlug?: string | null;
  topicSlug?: string | null;
  topic: string;
  lessonId: string;
  lessonTitle: string;
  language: string;
};

export default function WorldInstructorSession(props: Props) {
  const instructor = getLearningWorldInstructor(props.worldSlug);

  if (!instructor?.enabled) {
    return (
      <div className="flex min-h-[540px] items-center justify-center px-6 text-center text-white">
        <div>
          <h2 className="text-2xl font-black text-white">
            {instructor?.name || "AI Instructor"}
          </h2>
          <p className="mt-3 max-w-md text-sm font-medium leading-7 text-white/80">
            This learning world has its own instructor slot. The instructor
            provider has not been connected yet.
          </p>
        </div>
      </div>
    );
  }

  if (instructor.provider === "heygen") {
    return <MayaLiveAvatar {...props} />;
  }

  if (instructor.provider === "tavus") {
    return (
      <div className="flex min-h-[540px] items-center justify-center px-6 text-center text-white">
        <div>
          <h2 className="text-2xl font-black text-white">
            {instructor.name}
          </h2>
          <p className="mt-3 max-w-md text-sm font-medium leading-7 text-white/80">
            The Tavus provider slot is ready in the instructor architecture.
            The Tavus session component will be connected when GAHN migrates
            avatar providers.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
