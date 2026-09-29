import { NextResponse } from "next/server";

import { recordMeaningfulLessonStart } from "@/lib/learningActivity";
import { getAuthenticatedUser } from "@/lib/serverAuth";

type StartedRequest = {
  usageEventId?: string | null;
  providerSessionId?: string | null;
  lessonContext?: {
    worldSlug?: string;
    sectionSlug?: string | null;
    topicSlug?: string | null;
    topic?: string;
    lessonId?: string;
    lessonTitle?: string;
    language?: string;
  };
};

export async function POST(req: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "You must be signed in." },
        { status: 401 }
      );
    }

    const body = (await req.json()) as StartedRequest;
    const lesson = body.lessonContext;

    if (
      !lesson?.worldSlug ||
      !lesson.topic ||
      !lesson.lessonId ||
      !lesson.lessonTitle
    ) {
      return NextResponse.json(
        { error: "Lesson context is missing." },
        { status: 400 }
      );
    }

    await recordMeaningfulLessonStart({
      userId: user.id,
      worldSlug: lesson.worldSlug,
      sectionSlug: lesson.sectionSlug || null,
      topicSlug: lesson.topicSlug || null,
      topic: lesson.topic,
      lessonId: lesson.lessonId,
      lessonTitle: lesson.lessonTitle,
      language: lesson.language || "English",
      source: "live_instructor",
      providerSessionId: body.providerSessionId || null,
      usageEventId: body.usageEventId || null,
    });

    return NextResponse.json({ recorded: true });
  } catch (error) {
    console.error("Could not record live instructor lesson start:", error);

    return NextResponse.json(
      { error: "Could not record lesson activity." },
      { status: 500 }
    );
  }
}
