export type CanvasField = {
  label: string;
  placeholder?: string;
};

export type CanvasBlock = {
  type: "concept" | "diagram" | "question" | "activity" | "summary" | "mastery";
  title: string;
  body?: string;
  bullets?: string[];
  nodes?: string[];
  question?: string;
  options?: string[];
  answerType?: "choice" | "text";
  hint?: string;
  instructions?: string;
  fields?: CanvasField[];
  checks?: string[];
};

export type TeachingAction =
  | "start"
  | "respond"
  | "repeat"
  | "explain_differently"
  | "summary"
  | "study_guide"
  | "review";

export type InstructorTurn = {
  message: string;
  mode: "teach" | "question" | "feedback" | "activity" | "summary" | "mastery";
  canvas: {
    title: string;
    subtitle?: string;
    blocks: CanvasBlock[];
  };
  evaluation: {
    correct: boolean | null;
    concept: string;
    state:
      | "learning"
      | "practicing"
      | "proficient"
      | "mastered"
      | "needs_review";
    reason: string;
  };
  suggestedReply?: string;
};

function compact(values: unknown[]): string[] {
  return values
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean);
}

export function extractOpenAIText(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";

  const candidate = payload as {
    output_text?: unknown;
    output?: Array<{
      content?: Array<{
        type?: string;
        text?: unknown;
      }>;
    }>;
  };

  if (typeof candidate.output_text === "string") {
    return candidate.output_text;
  }

  const pieces =
    candidate.output?.flatMap((item) =>
      item.content?.flatMap((content) =>
        content.type === "output_text" && typeof content.text === "string"
          ? [content.text]
          : []
      ) ?? []
    ) ?? [];

  return pieces.join("\n").trim();
}

export function parseInstructorTurn(
  raw: string,
  fallback: InstructorTurn
): InstructorTurn {
  const cleaned = raw
    .trim()
    .replace(/^\`\`\`json\s*/i, "")
    .replace(/\`\`\`$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned) as Partial<InstructorTurn>;

    if (
      typeof parsed.message !== "string" ||
      !parsed.canvas ||
      !Array.isArray(parsed.canvas.blocks)
    ) {
      return fallback;
    }

    const allowedModes = new Set([
      "teach",
      "question",
      "feedback",
      "activity",
      "summary",
      "mastery",
    ]);

    const evaluation = parsed.evaluation ?? fallback.evaluation;

    return {
      message: parsed.message.trim() || fallback.message,
      mode: allowedModes.has(String(parsed.mode))
        ? (parsed.mode as InstructorTurn["mode"])
        : fallback.mode,
      canvas: {
        title:
          typeof parsed.canvas.title === "string" && parsed.canvas.title.trim()
            ? parsed.canvas.title.trim()
            : fallback.canvas.title,
        subtitle:
          typeof parsed.canvas.subtitle === "string"
            ? parsed.canvas.subtitle.trim()
            : undefined,
        blocks: parsed.canvas.blocks
          .filter(
            (block): block is CanvasBlock =>
              Boolean(block) &&
              typeof block === "object" &&
              typeof (block as CanvasBlock).type === "string" &&
              typeof (block as CanvasBlock).title === "string"
          )
          .slice(0, 6),
      },
      evaluation: {
        correct:
          typeof evaluation.correct === "boolean"
            ? evaluation.correct
            : null,
        concept:
          typeof evaluation.concept === "string" && evaluation.concept.trim()
            ? evaluation.concept.trim()
            : fallback.evaluation.concept,
        state: [
          "learning",
          "practicing",
          "proficient",
          "mastered",
          "needs_review",
        ].includes(String(evaluation.state))
          ? (evaluation.state as InstructorTurn["evaluation"]["state"])
          : fallback.evaluation.state,
        reason:
          typeof evaluation.reason === "string"
            ? evaluation.reason.trim()
            : fallback.evaluation.reason,
      },
      suggestedReply:
        typeof parsed.suggestedReply === "string"
          ? parsed.suggestedReply.trim()
          : undefined,
    };
  } catch {
    return fallback;
  }
}

export function buildFallbackTurn(args: {
  lessonTitle: string;
  lessonPoints: string[];
  learnerMessage?: string;
  action?: TeachingAction;
}): InstructorTurn {
  const points = compact(args.lessonPoints).slice(0, 6);
  const primary = points[0] || args.lessonTitle;
  const action = args.action || "respond";

  if (action === "summary" || action === "study_guide") {
    return {
      message:
        action === "study_guide"
          ? "Here is a study guide built from the lesson structure. It is saved from the actual curriculum points rather than invented progress."
          : "Here is a concise summary of the lesson so you can review what matters.",
      mode: "summary",
      canvas: {
        title: action === "study_guide" ? "Study Guide" : "Lesson Summary",
        subtitle: args.lessonTitle,
        blocks: [
          {
            type: "summary",
            title: "Key ideas",
            body: primary,
            bullets: points.slice(1),
          },
          {
            type: "mastery",
            title: "What you should be able to do",
            checks: [
              `Explain ${args.lessonTitle} in your own words`,
              "Give one concrete example",
              "Apply the idea without copying the lesson wording",
            ],
          },
        ],
      },
      evaluation: {
        correct: null,
        concept: args.lessonTitle,
        state: "learning",
        reason: "A summary does not count as mastery evidence.",
      },
      suggestedReply: "Close the guide and explain the lesson from memory.",
    };
  }

  if (action === "review") {
    return {
      message:
        "Review should make you retrieve the idea, not reread it. Answer this without looking back first.",
      mode: "question",
      canvas: {
        title: "Active Review",
        subtitle: args.lessonTitle,
        blocks: [
          {
            type: "question",
            title: "Recall from memory",
            question: `Explain ${args.lessonTitle} and give one example of when it matters.`,
            answerType: "text",
            hint: "Try from memory before checking your notes.",
          },
        ],
      },
      evaluation: {
        correct: null,
        concept: args.lessonTitle,
        state: "practicing",
        reason: "The learner is beginning a review attempt.",
      },
      suggestedReply: "Answer from memory.",
    };
  }

  if (args.learnerMessage?.trim()) {
    return {
      message:
        "I saved your response. The full adaptive AI feedback service is not connected yet, so I will not pretend to grade an open-ended answer. Compare your answer with the lesson evidence on the Canvas, then try the teach-back prompt.",
      mode: "feedback",
      canvas: {
        title: "Check your reasoning",
        subtitle: args.lessonTitle,
        blocks: [
          {
            type: "concept",
            title: "What your answer should connect to",
            body: primary,
            bullets: points.slice(1),
          },
          {
            type: "question",
            title: "Teach it back",
            question: `Explain ${args.lessonTitle} in your own words and give one concrete example.`,
            answerType: "text",
            hint: "Use the lesson points on the Canvas instead of copying the wording.",
          },
        ],
      },
      evaluation: {
        correct: null,
        concept: args.lessonTitle,
        state: "practicing",
        reason:
          "Open-ended answers are not automatically graded when the adaptive AI service is unavailable.",
      },
      suggestedReply: "Explain the idea in your own words.",
    };
  }

  return {
    message: `We are starting with ${args.lessonTitle}. I will keep the lesson focused, show the important ideas on the Canvas, and ask you to apply them instead of only reading.`,
    mode: "teach",
    canvas: {
      title: args.lessonTitle,
      subtitle: "Learn it, use it, then prove it",
      blocks: [
        {
          type: "concept",
          title: "What you need to understand",
          body: primary,
          bullets: points.slice(1),
        },
        {
          type: "diagram",
          title: "Lesson map",
          nodes: points.length ? points : [args.lessonTitle, "Example", "Practice"],
        },
        {
          type: "question",
          title: "First check",
          question: `What does ${args.lessonTitle} mean in practical terms?`,
          answerType: "text",
          hint: "Explain what it is, why it matters, and one example.",
        },
      ],
    },
    evaluation: {
      correct: null,
      concept: args.lessonTitle,
      state: "learning",
      reason: "The lesson has started; mastery has not been assessed yet.",
    },
    suggestedReply: `Explain ${args.lessonTitle} in your own words.`,
  };
}

export function lessonIdFromParts(
  worldSlug: string,
  topicSlug: string | undefined,
  lessonTitle: string
) {
  const normalized = lessonTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  return [worldSlug, topicSlug || "topic", normalized].join(":");
}
