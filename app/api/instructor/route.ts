import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireEntitlement } from "@/lib/requireEntitlement";
import { buildInstructorPrompt } from "@/lib/ai/instructorPrompt";
import {
  checkAiUsageLimit,
  recordAiUsage,
} from "@/lib/ai/usageLimits";
import type { SubscriptionPlanId } from "@/lib/subscriptionEntitlements";
import {
  buildFallbackTurn,
  extractOpenAIText,
  lessonIdFromParts,
  parseInstructorTurn,
  type InstructorTurn,
  type TeachingAction,
} from "@/lib/ai/lessonEngine";

export const runtime = "nodejs";

type InstructorRequest = {
  action?: TeachingAction;
  sessionId?: string | null;
  worldSlug: string;
  worldTitle: string;
  sectionSlug?: string | null;
  sectionTitle?: string | null;
  topicSlug?: string | null;
  topic: string;
  lessonTitle: string;
  lessonPoints?: string[];
  language?: string;
  learnerMessage?: string;
  history?: Array<{
    role: "student" | "instructor";
    content: string;
  }>;
};

async function authenticatedUser() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server components may not always allow cookie writes.
          }
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;
  return user;
}

function validRequest(body: Partial<InstructorRequest>) {
  return Boolean(
    body.worldSlug &&
      body.worldTitle &&
      body.topic &&
      body.lessonTitle
  );
}

async function createOrTouchSession(
  userId: string,
  body: InstructorRequest,
  lessonId: string
) {
  if (body.sessionId) {
    const { data } = await supabaseAdmin
      .from("lesson_sessions")
      .update({
        last_activity_at: new Date().toISOString(),
        language: body.language || "English",
      })
      .eq("id", body.sessionId)
      .eq("user_id", userId)
      .select("id")
      .maybeSingle();

    if (data?.id) return data.id as string;
  }

  const { data, error } = await supabaseAdmin
    .from("lesson_sessions")
    .insert({
      user_id: userId,
      world_slug: body.worldSlug,
      section_slug: body.sectionSlug || null,
      topic_slug: body.topicSlug || null,
      topic: body.topic,
      lesson_id: lessonId,
      lesson_title: body.lessonTitle,
      language: body.language || "English",
      status: "in_progress",
      metadata: {
        sectionTitle: body.sectionTitle || null,
      },
    })
    .select("id")
    .single();

  if (error) throw error;

  await supabaseAdmin.from("learning_progress").upsert(
    {
      user_id: userId,
      world_slug: body.worldSlug,
      topic: body.topic,
      lesson_id: lessonId,
      section_slug: body.sectionSlug || null,
      topic_slug: body.topicSlug || null,
      lesson_title: body.lessonTitle,
      status: "in_progress",
      mastery_state: "learning",
      last_activity_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id,world_slug,lesson_id",
    }
  );

  return data.id as string;
}

async function callTeachingModel(
  userId: string,
  planId: SubscriptionPlanId,
  body: InstructorRequest,
  fallback: InstructorTurn,
  capabilities: string[]
) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      turn: fallback,
      aiConnected: false,
      usageLimited: false,
    };
  }

  const usage = await checkAiUsageLimit({
    userId,
    planId,
    kind: "teaching_turn",
  });

  if (!usage.allowed) {
    return {
      turn: {
        ...fallback,
        message:
          "You reached today’s adaptive-AI learning limit. Your structured lesson, Magic Canvas, notes, review tools, and saved progress still work. Adaptive instructor feedback resets with the next daily allowance.",
      },
      aiConnected: false,
      usageLimited: true,
    };
  }

  const [{ data: memoryRows }, { data: learnerProfile }] =
    await Promise.all([
      supabaseAdmin
        .from("learner_memory")
        .select("concept, state, last_evidence")
        .eq("user_id", userId)
        .order("last_seen_at", { ascending: false })
        .limit(8),
      supabaseAdmin
        .from("profiles")
        .select("learner_role, learning_pace, explanation_style")
        .eq("id", userId)
        .maybeSingle(),
    ]);

  const prompt = buildInstructorPrompt({
    learnerRole:
      (learnerProfile?.learner_role as
        | "student"
        | "self_learner"
        | "teacher"
        | "professor"
        | "other"
        | undefined) || "unknown",
    learningPace:
      (learnerProfile?.learning_pace as
        | "slower"
        | "steady"
        | "faster"
        | undefined) || "steady",
    explanationStyle:
      (learnerProfile?.explanation_style as
        | "balanced"
        | "visual"
        | "step_by_step"
        | "examples_first"
        | undefined) || "balanced",
    worldTitle: body.worldTitle,
    sectionTitle: body.sectionTitle || undefined,
    topic: body.topic,
    lessonTitle: body.lessonTitle,
    lessonPoints: body.lessonPoints || [],
    language: body.language || "English",
    learnerMemory: (memoryRows || []).map((row) => ({
      concept: row.concept,
      state: row.state,
      lastEvidence: row.last_evidence,
    })),
    capabilities,
  });

  const recentHistory = (body.history || []).slice(-8);

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_TEACHING_MODEL || "gpt-5.6-luna",
      instructions: prompt,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify({
                action: body.action || "respond",
                learnerMessage: body.learnerMessage || "",
                recentHistory,
              }),
            },
          ],
        },
      ],
      max_output_tokens: 1200,
      store: false,
      text: {
        format: {
          type: "json_object",
        },
      },
    }),
  });

  if (!response.ok) {
    console.error(
      "Teaching model request failed:",
      response.status,
      await response.text()
    );

    return {
      turn: fallback,
      aiConnected: false,
      usageLimited: false,
    };
  }

  const payload = await response.json();
  const raw = extractOpenAIText(payload);

  const turn = parseInstructorTurn(raw, fallback);
  const model =
    process.env.OPENAI_TEACHING_MODEL || "gpt-5.6-luna";

  await recordAiUsage({
    userId,
    planId,
    kind: "teaching_turn",
    model,
    metadata: {
      worldSlug: body.worldSlug,
      topic: body.topic,
      lessonTitle: body.lessonTitle,
      action: body.action || "respond",
    },
  });

  return {
    turn,
    aiConnected: true,
    usageLimited: false,
  };
}

async function enforceEvidenceState(args: {
  userId: string;
  lessonId: string;
  body: InstructorRequest;
  turn: InstructorTurn;
}) {
  const { userId, lessonId, body } = args;
  const turn = {
    ...args.turn,
    evaluation: { ...args.turn.evaluation },
  };

  if (!body.learnerMessage?.trim()) {
    if (turn.evaluation.state === "mastered") {
      turn.evaluation.state = "learning";
      turn.evaluation.correct = null;
      turn.evaluation.reason =
        "Mastery cannot be awarded without a learner response.";
    }
    return turn;
  }

  const { data: current } = await supabaseAdmin
    .from("learning_progress")
    .select("attempts_count, correct_count, retry_count")
    .eq("user_id", userId)
    .eq("world_slug", body.worldSlug)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  const attempts = (current?.attempts_count || 0) + 1;
  const correct =
    (current?.correct_count || 0) +
    (turn.evaluation.correct === true ? 1 : 0);
  const retries =
    (current?.retry_count || 0) +
    (turn.evaluation.correct === false ? 1 : 0);

  if (turn.evaluation.correct === false && retries >= 2) {
    turn.evaluation.state = "needs_review";
  }

  if (turn.evaluation.state === "mastered") {
    const enoughEvidence =
      body.action === "mastery_check" &&
      turn.evaluation.correct === true &&
      attempts >= 3 &&
      correct >= 3;

    if (!enoughEvidence) {
      turn.evaluation.state =
        turn.evaluation.correct === true ? "proficient" : "practicing";
      turn.evaluation.reason =
        "The response may be strong, but GAHN requires at least three correct checked responses including a mastery check before marking this lesson mastered.";
    }
  }

  return turn;
}

async function saveLearningMaterial(args: {
  userId: string;
  lessonId: string;
  body: InstructorRequest;
  turn: InstructorTurn;
  autoSaveNotes: boolean;
}) {
  if (args.body.action !== "study_guide" && args.body.action !== "summary") return;

  const isSummary = args.body.action === "summary";
  const title = `${args.body.lessonTitle} ${isSummary ? "Summary" : "Study Guide"}`;
  const materialType = isSummary ? "summary" : "study_guide";

  // Repeated summary/guide requests refresh a lesson's materials rather than
  // filling the learner's dashboard with identical entries.
  const { data: existing, error: lookupError } = await supabaseAdmin
    .from("study_guides")
    .select("id")
    .eq("user_id", args.userId)
    .eq("lesson_id", args.lessonId)
    .eq("material_type", materialType)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (lookupError) throw lookupError;

  const guideValues = {
    title,
    content: args.turn.canvas,
    updated_at: new Date().toISOString(),
  };
  const guideResult = existing
    ? await supabaseAdmin.from("study_guides").update(guideValues).eq("id", existing.id).eq("user_id", args.userId)
    : await supabaseAdmin.from("study_guides").insert({
        user_id: args.userId,
        world_slug: args.body.worldSlug,
        topic: args.body.topic,
        lesson_id: args.lessonId,
        material_type: materialType,
        ...guideValues,
      });
  if (guideResult.error) throw guideResult.error;

  if (!isSummary || !args.autoSaveNotes) return;

  // These are instructor-generated recap notes. They are kept in a separate
  // record so that creating a summary never overwrites a student's own notes.
  const recap = args.turn.canvas.blocks
    .filter((block) => block.type === "summary" || block.type === "concept")
    .flatMap((block) => [
      block.title,
      block.body || "",
      ...(block.bullets || []).map((item) => `• ${item}`),
    ])
    .filter(Boolean)
    .join("\n")
    .trim()
    .slice(0, 12000);
  if (!recap) return;

  const noteTitle = `${args.body.lessonTitle} lesson summary`;
  const { data: savedNote, error: noteLookupError } = await supabaseAdmin
    .from("learner_notes")
    .select("id")
    .eq("user_id", args.userId)
    .eq("lesson_id", args.lessonId)
    .eq("title", noteTitle)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (noteLookupError) throw noteLookupError;

  const noteValues = {
    body: recap,
    updated_at: new Date().toISOString(),
  };
  const noteResult = savedNote
    ? await supabaseAdmin.from("learner_notes").update(noteValues).eq("id", savedNote.id).eq("user_id", args.userId)
    : await supabaseAdmin.from("learner_notes").insert({
        user_id: args.userId,
        world_slug: args.body.worldSlug,
        lesson_id: args.lessonId,
        lesson_title: args.body.lessonTitle,
        title: noteTitle,
        ...noteValues,
      });
  if (noteResult.error) throw noteResult.error;
}

async function saveEvidence(args: {
  userId: string;
  sessionId: string;
  lessonId: string;
  body: InstructorRequest;
  turn: InstructorTurn;
}) {
  const { userId, sessionId, lessonId, body, turn } = args;
  const responseText = body.learnerMessage?.trim();

  if (!responseText) return;

  const evidenceType =
    body.action === "mastery_check"
      ? "mastery_check"
      : body.action === "review"
        ? "review"
        : turn.mode === "activity"
          ? "activity"
          : "question";

  const { error } = await supabaseAdmin.from("lesson_evidence").insert({
    user_id: userId,
    session_id: sessionId,
    world_slug: body.worldSlug,
    lesson_id: lessonId,
    lesson_title: body.lessonTitle,
    concept: turn.evaluation.concept || body.lessonTitle,
    evidence_type: evidenceType,
    response_text: responseText,
    correct: turn.evaluation.correct,
    metadata: {
      evaluationReason: turn.evaluation.reason,
      state: turn.evaluation.state,
    },
  });

  if (error) throw error;

  const attemptIncrement =
    turn.evaluation.correct === null ? 0 : 1;
  const correctIncrement = turn.evaluation.correct === true ? 1 : 0;
  const retryIncrement = turn.evaluation.correct === false ? 1 : 0;

  const { data: current } = await supabaseAdmin
    .from("learning_progress")
    .select("attempts_count, correct_count, retry_count")
    .eq("user_id", userId)
    .eq("world_slug", body.worldSlug)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  const attempts =
    (current?.attempts_count || 0) + attemptIncrement;
  const correct = (current?.correct_count || 0) + correctIncrement;
  const retries = (current?.retry_count || 0) + retryIncrement;
  const completed = turn.evaluation.state === "mastered";

  const { error: progressError } = await supabaseAdmin
    .from("learning_progress")
    .upsert(
      {
        user_id: userId,
        world_slug: body.worldSlug,
        topic: body.topic,
        lesson_id: lessonId,
        section_slug: body.sectionSlug || null,
        topic_slug: body.topicSlug || null,
        lesson_title: body.lessonTitle,
        status: completed ? "completed" : "in_progress",
        mastery_state: turn.evaluation.state,
        attempts_count: attempts,
        correct_count: correct,
        retry_count: retries,
        evidence: {
          lastConcept: turn.evaluation.concept,
          lastReason: turn.evaluation.reason,
          lastCorrect: turn.evaluation.correct,
        },
        last_activity_at: new Date().toISOString(),
        completed_at: completed ? new Date().toISOString() : null,
      },
      {
        onConflict: "user_id,world_slug,lesson_id",
      }
    );

  if (progressError) throw progressError;

  if (turn.evaluation.correct !== null) {
    const memoryState =
      turn.evaluation.state === "needs_review"
        ? "needs_review"
        : turn.evaluation.state === "mastered" ||
            turn.evaluation.state === "proficient"
          ? "strength"
          : "learning";

    const { data: existingMemory } = await supabaseAdmin
      .from("learner_memory")
      .select("evidence_count")
      .eq("user_id", userId)
      .eq("concept", turn.evaluation.concept)
      .maybeSingle();

    const { error: memoryError } = await supabaseAdmin
      .from("learner_memory")
      .upsert(
        {
          user_id: userId,
          world_slug: body.worldSlug,
          topic: body.topic,
          concept: turn.evaluation.concept,
          state: memoryState,
          evidence_count: (existingMemory?.evidence_count || 0) + 1,
          last_evidence: turn.evaluation.reason,
          last_seen_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,concept",
        }
      );

    if (memoryError) throw memoryError;
  }
}

export async function POST(req: Request) {
  try {
    const user = await authenticatedUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be signed in to start a lesson." },
        { status: 401 }
      );
    }

    const body = (await req.json()) as InstructorRequest;

    if (!validRequest(body)) {
      return NextResponse.json(
        { error: "Missing lesson context." },
        { status: 400 }
      );
    }

    const access = await requireEntitlement(user.id, "liveInstructor");

    if (!access.allowed) {
      return NextResponse.json(
        {
          error: "Instructor access is not included in your current plan.",
          planId: access.planId,
        },
        { status: 403 }
      );
    }

    const entitlements = access.entitlements;

    const actionEntitlement: Partial<
      Record<TeachingAction, keyof typeof entitlements>
    > = {
      mastery_check: "masteryAssessments",
      study_guide: "studyGuides",
      review: "reviewQuestions",
    };

    const requiredEntitlement =
      actionEntitlement[body.action || "respond"];

    if (
      requiredEntitlement &&
      entitlements[requiredEntitlement] !== true
    ) {
      return NextResponse.json(
        {
          error:
            "This learning capability is not included in your current plan.",
          planId: access.planId,
          requiredEntitlement,
        },
        { status: 403 }
      );
    }

    const capabilities = [
      "Structured curriculum and guided lesson sequencing",
      "Core Magic Canvas explanations, diagrams, questions, and activities",
      entitlements.adaptiveLearning
        ? "Adaptive reteaching based on learner answers and saved evidence"
        : null,
      entitlements.masteryAssessments
        ? "Evidence-based mastery checks"
        : null,
      entitlements.homeworkHelp && entitlements.fileUploads
        ? "Homework and uploaded-file learning support"
        : null,
      entitlements.learnerMemory
        ? "Saved learner memory for strengths and review needs"
        : null,
      entitlements.studyGuides ? "Generated study guides" : null,
      entitlements.reviewQuestions ? "Active-recall review questions" : null,
      entitlements.multilingualLearning
        ? "Teaching in the learner's selected supported language"
        : null,
      entitlements.advancedLearningCanvas
        ? "Advanced Magic Canvas workspaces"
        : null,
      entitlements.codeWorkspace ? "Interactive code workspace" : null,
      entitlements.browserLearning ? "Guided browser learning tools" : null,
      entitlements.advancedFileAnalysis
        ? "Advanced document and file analysis"
        : null,
      entitlements.advancedLearnerMemory
        ? "Advanced learner memory across topics"
        : null,
      entitlements.careerProjects ? "Career project coaching" : null,
      entitlements.careerSimulations ? "Career simulations" : null,
      entitlements.interviewPractice ? "Interview practice" : null,
      entitlements.portfolioTools ? "Portfolio-building tools" : null,
    ].filter((item): item is string => Boolean(item));

    const lessonId = lessonIdFromParts(
      body.worldSlug,
      body.topicSlug || undefined,
      body.lessonTitle
    );

    // Finishing a session is separate from mastery: it records that the
    // learner stopped studying without pretending they passed an assessment.
    if (body.action === "finish") {
      if (!body.sessionId) {
        return NextResponse.json({ error: "Start a lesson before finishing it." }, { status: 400 });
      }
      const { data: activeSession, error: sessionLookupError } = await supabaseAdmin
        .from("lesson_sessions")
        .select("id")
        .eq("id", body.sessionId)
        .eq("user_id", user.id)
        .eq("lesson_id", lessonId)
        .maybeSingle();
      if (sessionLookupError) throw sessionLookupError;
      if (!activeSession) {
        return NextResponse.json({ error: "This lesson session was not found." }, { status: 404 });
      }
      const now = new Date().toISOString();
      const { error: finishError } = await supabaseAdmin
        .from("lesson_sessions")
        .update({ status: "completed", completed_at: now, last_activity_at: now })
        .eq("id", activeSession.id)
        .eq("user_id", user.id);
      if (finishError) throw finishError;

      const { error: progressError } = await supabaseAdmin
        .from("learning_progress")
        .update({ status: "completed", last_activity_at: now })
        .eq("user_id", user.id)
        .eq("world_slug", body.worldSlug)
        .eq("lesson_id", lessonId);
      if (progressError) throw progressError;
      return NextResponse.json({ finished: true, sessionId: activeSession.id });
    }

    const sessionId = await createOrTouchSession(
      user.id,
      body,
      lessonId
    );

    const fallback = buildFallbackTurn({
      lessonTitle: body.lessonTitle,
      lessonPoints: body.lessonPoints || [],
      learnerMessage: body.learnerMessage,
      action: body.action,
    });

    const modelResult = await callTeachingModel(
      user.id,
      access.planId,
      body,
      fallback,
      capabilities
    );

    const turn = await enforceEvidenceState({
      userId: user.id,
      lessonId,
      body,
      turn: modelResult.turn,
    });

    await saveEvidence({
      userId: user.id,
      sessionId,
      lessonId,
      body,
      turn,
    });

    await saveLearningMaterial({
      userId: user.id,
      lessonId,
      body,
      turn,
      autoSaveNotes: entitlements.notes === true,
    });

    await supabaseAdmin
      .from("lesson_sessions")
      .update({
        last_activity_at: new Date().toISOString(),
        current_step: body.learnerMessage ? 1 : 0,
        status:
          turn.evaluation.state === "mastered"
            ? "completed"
            : "in_progress",
        completed_at:
          turn.evaluation.state === "mastered"
            ? new Date().toISOString()
            : null,
      })
      .eq("id", sessionId)
      .eq("user_id", user.id);

    return NextResponse.json({
      sessionId,
      lessonId,
      turn,
      aiConnected: modelResult.aiConnected,
      usageLimited: modelResult.usageLimited,
    });
  } catch (error) {
    console.error("Instructor route failed:", error);

    return NextResponse.json(
      {
        error: "The lesson could not continue. Please try again.",
      },
      { status: 500 }
    );
  }
}
