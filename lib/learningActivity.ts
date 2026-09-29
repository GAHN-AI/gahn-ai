import { supabaseAdmin } from "@/lib/supabaseAdmin";

export type MeaningfulLessonStart = {
  userId: string;
  worldSlug: string;
  sectionSlug?: string | null;
  topicSlug?: string | null;
  topic: string;
  lessonId: string;
  lessonTitle: string;
  language?: string;
  source: "live_instructor" | "adaptive_instructor";
  providerSessionId?: string | null;
  usageEventId?: string | null;
};

export async function recordMeaningfulLessonStart(
  args: MeaningfulLessonStart
) {
  const now = new Date().toISOString();

  const { data: existingProgress, error: progressReadError } =
    await supabaseAdmin
      .from("learning_progress")
      .select("id, evidence")
      .eq("user_id", args.userId)
      .eq("world_slug", args.worldSlug)
      .eq("lesson_id", args.lessonId)
      .maybeSingle();

  if (progressReadError) {
    throw progressReadError;
  }

  const evidence = {
    ...((existingProgress?.evidence as Record<string, unknown> | null) || {}),
    meaningfulStart: true,
    lastActivitySource: args.source,
    lastMeaningfulStartAt: now,
  };

  if (existingProgress?.id) {
    const { error } = await supabaseAdmin
      .from("learning_progress")
      .update({
        section_slug: args.sectionSlug || null,
        topic_slug: args.topicSlug || null,
        topic: args.topic,
        lesson_title: args.lessonTitle,
        last_activity_at: now,
        evidence,
      })
      .eq("id", existingProgress.id)
      .eq("user_id", args.userId);

    if (error) throw error;
  } else {
    const { error } = await supabaseAdmin
      .from("learning_progress")
      .insert({
        user_id: args.userId,
        world_slug: args.worldSlug,
        section_slug: args.sectionSlug || null,
        topic_slug: args.topicSlug || null,
        topic: args.topic,
        lesson_id: args.lessonId,
        lesson_title: args.lessonTitle,
        status: "in_progress",
        mastery_state: "learning",
        last_activity_at: now,
        evidence,
      });

    if (error) throw error;
  }

  const { error: sessionError } = await supabaseAdmin
    .from("lesson_sessions")
    .insert({
      user_id: args.userId,
      world_slug: args.worldSlug,
      section_slug: args.sectionSlug || null,
      topic_slug: args.topicSlug || null,
      topic: args.topic,
      lesson_id: args.lessonId,
      lesson_title: args.lessonTitle,
      language: args.language || "English",
      status: "in_progress",
      metadata: {
        source: args.source,
        providerSessionId: args.providerSessionId || null,
        usageEventId: args.usageEventId || null,
      },
    });

  if (sessionError) throw sessionError;
}
