import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
const load = createRequire(import.meta.url);
load.extensions[".ts"] = (module, filename) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
    filename,
  );
const { allCourses } = load("../lib/courses.ts");
const {
  createTutorProgress,
  applyTrustedTutorEvent,
  flattenLessons,
  lessonAccess,
  validateCanvas,
} = load("../lib/tutor/progression.ts");
const { canvasExampleFor } = load("../lib/tutor/canvasExamples.ts");
let checks = 0;
function rejects(fn, message) {
  assert.throws(fn, message);
  checks++;
}
for (const course of allCourses) {
  validateCanvas(canvasExampleFor(course));
  const lessons = flattenLessons(course);
  let state = createTutorProgress(
    course,
    "synthetic-learner",
    "synthetic-session",
  );
  function event(type, extra = {}) {
    return {
      id: `${course.id}:event:${state.revision + 1}`,
      revision: state.revision + 1,
      learnerId: state.learnerId,
      sessionId: state.sessionId,
      courseId: course.id,
      courseVersion: course.version,
      lessonId: lessons[state.currentIndex]?.id,
      type,
      ...extra,
    };
  }
  function send(type, extra) {
    const e = event(type, extra);
    state = applyTrustedTutorEvent(course, state, e);
    return e;
  }
  const initial = structuredClone(state);
  const blocks = [
    {
      type: "text",
      title: "Explanation",
      text: "A synthetic worked example for transition testing.",
    },
  ];
  rejects(
    () => applyTrustedTutorEvent(course, state, event("advance")),
    /not passed/,
  );
  rejects(
    () => applyTrustedTutorEvent(course, state, event("teaching-finished")),
    /must happen/,
  );
  rejects(
    () =>
      applyTrustedTutorEvent(
        course,
        state,
        event("issue-quiz", {
          quizId: "q1",
          questionCount: 3,
          requiredCorrect: 3,
        }),
      ),
    /Teach/,
  );
  rejects(
    () =>
      applyTrustedTutorEvent(
        course,
        state,
        event("teach", { lessonId: lessons[1].id, blocks }),
      ),
    /locked/,
  );
  rejects(
    () =>
      applyTrustedTutorEvent(
        course,
        state,
        event("teach", { learnerId: "other", blocks }),
      ),
    /scope/,
  );
  rejects(
    () =>
      applyTrustedTutorEvent(
        course,
        state,
        event("teach", { sessionId: "other", blocks }),
      ),
    /scope/,
  );
  rejects(
    () =>
      applyTrustedTutorEvent(
        course,
        state,
        event("teach", { courseId: "other", blocks }),
      ),
    /scope/,
  );
  rejects(
    () =>
      applyTrustedTutorEvent(
        course,
        state,
        event("teach", { courseVersion: 1, blocks }),
      ),
    /scope/,
  );
  rejects(
    () =>
      applyTrustedTutorEvent(
        { ...course, version: 3 },
        state,
        event("teach", { blocks }),
      ),
    /revision mismatch/,
  );
  rejects(
    () =>
      applyTrustedTutorEvent(
        course,
        state,
        event("teach", { revision: 3, blocks }),
      ),
    /out-of-order/,
  );
  assert.deepEqual(state, initial, "Rejected events must not mutate state");
  const taughtEvent = send("teach", { blocks });
  assert.strictEqual(
    applyTrustedTutorEvent(course, state, taughtEvent),
    state,
    "Exact retries are idempotent",
  );
  checks++;
  rejects(
    () => applyTrustedTutorEvent(course, state, { ...taughtEvent, blocks: [] }),
    /Conflicting/,
  );
  rejects(
    () => applyTrustedTutorEvent(course, state, event("advance")),
    /not passed/,
  );
  send("teaching-finished");
  rejects(
    () =>
      applyTrustedTutorEvent(
        course,
        state,
        event("issue-quiz", {
          quizId: "bad",
          questionCount: 3,
          requiredCorrect: 0,
        }),
      ),
    /threshold/,
  );
  send("issue-quiz", { quizId: "q1", questionCount: 3, requiredCorrect: 3 });
  rejects(
    () =>
      applyTrustedTutorEvent(
        course,
        state,
        event("assessed", { quizId: "other", correct: 3 }),
      ),
    /does not match/,
  );
  rejects(
    () =>
      applyTrustedTutorEvent(
        course,
        state,
        event("assessed", { quizId: "q1", correct: 99 }),
      ),
    /Invalid/,
  );
  send("assessed", { quizId: "q1", correct: 1 });
  assert.equal(state.phase, "review");
  assert.equal(state.currentIndex, 0);
  checks++;
  rejects(
    () => applyTrustedTutorEvent(course, state, event("advance")),
    /not passed/,
  );
  rejects(
    () =>
      applyTrustedTutorEvent(
        course,
        state,
        event("issue-quiz", {
          quizId: "q2",
          questionCount: 3,
          requiredCorrect: 3,
        }),
      ),
    /Teach/,
  );
  send("teach", { blocks });
  send("teaching-finished");
  rejects(
    () =>
      applyTrustedTutorEvent(
        course,
        state,
        event("issue-quiz", {
          quizId: "q1",
          questionCount: 3,
          requiredCorrect: 3,
        }),
      ),
    /already used/,
  );
  send("issue-quiz", { quizId: "q2", questionCount: 3, requiredCorrect: 3 });
  send("assessed", { quizId: "q2", correct: 3 });
  assert.equal(state.currentIndex, 0, "A pass alone must not silently advance");
  checks++;
  const advanced = send("advance");
  assert.equal(state.currentIndex, 1);
  assert.equal(state.phase, "ready");
  assert.equal(state.canvas.length, 0);
  assert.equal(lessonAccess(state, 0), "completed");
  assert.equal(lessonAccess(state, 1), "current");
  assert.equal(lessonAccess(state, 2), "locked");
  checks++;
  assert.strictEqual(applyTrustedTutorEvent(course, state, advanced), state);
  checks++;
  rejects(
    () => applyTrustedTutorEvent(course, state, taughtEvent),
    /out-of-order/,
  );
  // Exercise every lesson, section boundary and final-course transition.
  while (state.currentIndex < lessons.length) {
    send("teach", { blocks });
    send("teaching-finished");
    send("issue-quiz", {
      quizId: `q-${state.currentIndex}`,
      questionCount: 3,
      requiredCorrect: 3,
    });
    send("assessed", { quizId: state.quiz.id, correct: 3 });
    send("advance");
  }
  assert.equal(state.phase, "complete");
  assert.deepEqual(
    state.completed,
    lessons.map((l) => l.id),
  );
  checks++;
  rejects(
    () => applyTrustedTutorEvent(course, state, event("advance")),
    /locked/,
  );
}
rejects(
  () => validateCanvas([{ type: "html", title: "Unsafe", html: "<script>" }]),
  /Unsupported/,
);
rejects(
  () =>
    validateCanvas([
      {
        type: "table",
        title: "Bad",
        headers: ["One"],
        rows: [["Two", "Columns"]],
      },
    ]),
  /Invalid/,
);
console.log(
  JSON.stringify(
    {
      courses: allCourses.length,
      assertions: checks,
      allLessonAndSectionTransitions: "passed",
      liveCalls: 0,
      learnerWrites: 0,
    },
    null,
    2,
  ),
);
