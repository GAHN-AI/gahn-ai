import type { Course } from "../course-content/schema";

export type CanvasBlock =
  | { type: "text"; title: string; text: string }
  | { type: "steps"; title: string; items: string[] }
  | { type: "code"; title: string; language: string; code: string }
  | { type: "equation"; title: string; lines: string[] }
  | { type: "table"; title: string; headers: string[]; rows: string[][] };
export type TutorProgress = {
  learnerId: string;
  sessionId: string;
  courseId: string;
  courseVersion: number;
  revision: number;
  currentIndex: number;
  completed: string[];
  phase:
    | "ready"
    | "teaching"
    | "taught"
    | "checking"
    | "review"
    | "passed"
    | "complete";
  quiz?: { id: string; questionCount: number; requiredCorrect: number };
  usedQuizIds: string[];
  canvas: CanvasBlock[];
  // The latest event is retained for exact retry idempotency. Earlier revisions are rejected.
  lastEvent?: { id: string; payload: string };
};
export type TutorEvent = {
  id: string;
  revision: number;
  learnerId: string;
  sessionId: string;
  courseId: string;
  courseVersion: number;
  lessonId: string;
} & (
  | { type: "teach"; blocks: CanvasBlock[] }
  | { type: "teaching-finished" }
  | {
      type: "issue-quiz";
      quizId: string;
      questionCount: number;
      requiredCorrect: number;
    }
  | { type: "assessed"; quizId: string; correct: number }
  | { type: "advance" }
);
export function flattenLessons(course: Course) {
  return course.sections.flatMap((section) => section.lessons);
}
export function createTutorProgress(
  course: Course,
  learnerId: string,
  sessionId: string,
): TutorProgress {
  if (!learnerId || !sessionId || !flattenLessons(course).length)
    throw new Error("Missing session or course");
  return {
    learnerId,
    sessionId,
    courseId: course.id,
    courseVersion: course.version,
    revision: 0,
    currentIndex: 0,
    completed: [],
    phase: "ready",
    usedQuizIds: [],
    canvas: [],
  };
}
function requireCondition(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) throw new Error(message);
}
function validText(value: unknown, max = 12000): value is string {
  return (
    typeof value === "string" && value.trim().length > 0 && value.length <= max
  );
}
export function validateCanvas(blocks: CanvasBlock[]) {
  requireCondition(
    Array.isArray(blocks) && blocks.length > 0 && blocks.length <= 20,
    "Invalid canvas",
  );
  for (const block of blocks) {
    requireCondition(
      block && validText(block.title, 200),
      "Invalid block title",
    );
    switch (block.type) {
      case "text":
        requireCondition(validText(block.text), "Invalid text");
        break;
      case "code":
        requireCondition(
          validText(block.code) && validText(block.language, 40),
          "Invalid code",
        );
        break;
      case "equation":
        requireCondition(
          Array.isArray(block.lines) &&
            block.lines.length > 0 &&
            block.lines.length <= 30 &&
            block.lines.every((line) => validText(line, 500)),
          "Invalid equation",
        );
        break;
      case "steps":
        requireCondition(
          Array.isArray(block.items) &&
            block.items.length > 0 &&
            block.items.length <= 30 &&
            block.items.every((item) => validText(item, 1000)),
          "Invalid steps",
        );
        break;
      case "table":
        requireCondition(
          Array.isArray(block.headers) &&
            block.headers.length > 0 &&
            block.headers.length <= 8 &&
            block.headers.every((v) => validText(v, 100)) &&
            Array.isArray(block.rows) &&
            block.rows.length <= 40 &&
            block.rows.every(
              (row) =>
                Array.isArray(row) &&
                row.length === block.headers.length &&
                row.every((v) => validText(v, 500)),
            ),
          "Invalid table",
        );
        break;
      default:
        throw new Error("Unsupported canvas block");
    }
  }
}
/** Domain reducer, NOT an authentication boundary. Call ONLY from a future authenticated
 * server adapter after it verifies provider events and grades the issued assessment.
 * Never accept browser-posted events, scores, or provider text as verified assessments.
 * Persist the result atomically using the expected revision; no persistence is enabled yet. */
export function applyTrustedTutorEvent(
  course: Course,
  state: TutorProgress,
  event: TutorEvent,
): TutorProgress {
  const lessons = flattenLessons(course);
  requireCondition(
    course.id === state.courseId && course.version === state.courseVersion,
    "Course revision mismatch",
  );
  requireCondition(
    event.learnerId === state.learnerId &&
      event.sessionId === state.sessionId &&
      event.courseId === state.courseId &&
      event.courseVersion === state.courseVersion,
    "Session scope mismatch",
  );
  requireCondition(validText(event.id, 200), "Missing event ID");
  const payload = JSON.stringify(event);
  if (event.id === state.lastEvent?.id) {
    requireCondition(
      payload === state.lastEvent.payload,
      "Conflicting event replay",
    );
    return state;
  }
  requireCondition(
    Number.isInteger(event.revision) && event.revision === state.revision + 1,
    "Stale or out-of-order event",
  );
  requireCondition(
    state.phase !== "complete" &&
      lessons[state.currentIndex]?.id === event.lessonId,
    "Lesson is locked",
  );
  // A persisted state must represent an exact completed prefix, never a set of arbitrary IDs.
  requireCondition(
    state.currentIndex === state.completed.length &&
      state.completed.every((id, index) => lessons[index]?.id === id),
    "Invalid progress prefix",
  );
  const next: TutorProgress = {
    ...state,
    revision: event.revision,
    lastEvent: { id: event.id, payload },
  };
  switch (event.type) {
    case "teach":
      requireCondition(
        ["ready", "teaching", "review"].includes(state.phase),
        "Teaching is not available in this phase",
      );
      validateCanvas(event.blocks);
      return {
        ...next,
        phase: "teaching",
        canvas: structuredClone(event.blocks),
        quiz: undefined,
      };
    case "teaching-finished":
      requireCondition(
        state.phase === "teaching" && state.canvas.length > 0,
        "Teaching must happen before checking",
      );
      return { ...next, phase: "taught" };
    case "issue-quiz":
      requireCondition(
        state.phase === "taught",
        "Teach this lesson before issuing its check",
      );
      requireCondition(
        validText(event.quizId, 200) &&
          !state.usedQuizIds.includes(event.quizId),
        "Quiz ID already used or invalid",
      );
      requireCondition(
        Number.isInteger(event.questionCount) &&
          event.questionCount >= 2 &&
          event.questionCount <= 10 &&
          Number.isInteger(event.requiredCorrect) &&
          event.requiredCorrect >= Math.ceil(event.questionCount * 0.8) &&
          event.requiredCorrect <= event.questionCount,
        "Invalid assessment threshold",
      );
      return {
        ...next,
        phase: "checking",
        quiz: {
          id: event.quizId,
          questionCount: event.questionCount,
          requiredCorrect: event.requiredCorrect,
        },
        usedQuizIds: [...state.usedQuizIds, event.quizId],
      };
    case "assessed":
      requireCondition(
        state.phase === "checking" && state.quiz?.id === event.quizId,
        "Assessment does not match the active check",
      );
      requireCondition(
        Number.isInteger(event.correct) &&
          event.correct >= 0 &&
          event.correct <= state.quiz.questionCount,
        "Invalid assessment result",
      );
      return {
        ...next,
        phase:
          event.correct >= state.quiz.requiredCorrect ? "passed" : "review",
      };
    case "advance": {
      requireCondition(
        state.phase === "passed",
        "Understanding check has not passed",
      );
      const currentIndex = state.currentIndex + 1;
      return {
        ...next,
        currentIndex,
        completed: [...state.completed, event.lessonId],
        phase: currentIndex === lessons.length ? "complete" : "ready",
        canvas: [],
        quiz: undefined,
      };
    }
    default:
      throw new Error("Unsupported tutor event");
  }
}
export function lessonAccess(
  state: TutorProgress,
  lessonIndex: number,
): "completed" | "current" | "locked" {
  return lessonIndex < state.currentIndex
    ? "completed"
    : lessonIndex === state.currentIndex && state.phase !== "complete"
      ? "current"
      : "locked";
}
