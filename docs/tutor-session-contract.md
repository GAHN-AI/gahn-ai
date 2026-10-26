# Tutor-led course session contract

This revision prepares the course catalogue and session UI. It does not enable Tavus, an AI provider, microphone access, assessment generation, persistent progress, or paid teaching. All existing launch and entitlement gates remain off.

## Implemented

- One versioned course definition for every active career, school subject/grade, and topic in the five worlds (97 courses).
- Authored topic sequences in `lib/course-content/`. A unit contains specific skills, a practical task and a section check. Shared units are genuine prerequisites, not lesson-count padding. Counts include teaching entries, practice tasks, capstones and checkpoints; they are not recorded video hours.
- Course outlines are browsable without granting lesson access. The workspace always starts with the first lesson in preview. Known later lesson URLs show a locked notice. Invalid lesson IDs return 404. Legacy career lesson URLs return to the revised beginning without modifying old records.
- Left tutor slot, right read-only Magic Canvas, and course sequence below both panels. Static canvas examples are labeled as examples and never count as teaching.
- `applyTrustedTutorEvent` models teaching → taught → check → pass → tutor advance. Failure requires teaching again and a new assessment ID. Every lesson and section boundary uses the same rule. No learner “complete” or “next” control exists.
- Course, version, learner, session, lesson and monotonically increasing revision scope every event. Exact last-event retries are idempotent; altered retries, stale revisions, future lessons and invalid scores are rejected. Progress must be an exact prefix of the authored sequence.
- Canvas accepts bounded text, steps, code, equations and tables. It renders escaped text, never arbitrary HTML, scripts, URLs or embeds. No editable teaching surface is exposed.

## Boundary that must be implemented before launch

The reducer is domain logic, **not authentication or a production session service**. Do not expose it as an endpoint accepting arbitrary client events. Before connecting Tavus:

1. Authenticate the learner on the server. Resolve enrollment and the allowed course version from server-owned records, not query strings or client storage.
2. Bind a provider conversation to a server-created session and learner. Implement provider authentication and event verification against the official integration documentation at integration time. A browser message or a transcript saying “passed” is not an assessment result.
3. Give the teaching agent the current lesson brief and its prerequisites. It should explain one concept, show an accurate worked example, invite the learner's attempt, and address misconceptions. Validate generated teaching material against subject references; the catalogue is a sequence, not a prevalidated textbook or question bank.
4. Build and validate a short lesson-specific assessment (2–10 items; this reducer requires at least 80% correct). Store its answer key/rubric server-side. Grade the learner's actual answers independently of client assertions. For practice and capstones, assess the actual work and explanation rather than accepting self-reported completion. Keep assessment content grounded in the supplied text for Book Intelligence.
5. Send only verified, normalized events to the reducer. A `teaching-finished` event must reflect completed instruction, not a client timer. A passing assessment leaves the lesson in `passed` until the tutor emits `advance`.
6. Persist progress and the last accepted event in a transaction with compare-and-swap on the expected revision. Resolve duplicate deliveries, concurrent sessions, reconnects and session expiry. Associate grades and attempts with the issued quiz ID. The in-memory reducer alone does not provide durable multi-session replay protection.
7. Stream a read-only state projection to the UI. Replace static examples with accepted tutor canvas blocks. Connect the live video/audio slot. Add separate learner question/answer controls without making canvas content editable.
8. Implement resume, completed-lesson review, accessibility captions, microphone consent and interruption recovery. Make the teacher adapt pace and explanations without allowing prerequisite skips.
9. Test a full authenticated session, a failed check, reteaching, a passed check, a section transition, reconnect/resume and account isolation in staging before enabling launch flags.

## Versioning and course review

Version 2 IDs use authored unit keys and topic positions. Treat the published version as immutable. Reordering or substantively changing entries requires another version and an explicit migration decision. Do not infer version-2 completion from a version-1 lesson number. This revision runs no data migration and writes no learner records.

School grade labels are a planning guide, with a common algebra/geometry progression and science subject progression. Collect the learner's actual syllabus before adapting instruction. Healthcare, finance, insurance and legal pathways use synthetic practice records and require qualified review where professional judgment or current rules apply. Course completion is not a license or professional credential.

## Checks

`npm run verify:curriculum` checks all 97 plans, IDs, ordered development prerequisites, 41 distinct photographic URLs and paused launch gates. `npm run verify:tutor` exercises every lesson and section transition plus failure, replay, version, scope, threshold and payload cases for every course. `npm run verify:routes` checks public routes, later-lesson locks, signed-out redirects, paused provider APIs and invalid IDs against a local production build. Browser review covers representative course and workspace pages; it is not a claim that live provider or saved progress flows have been tested.
