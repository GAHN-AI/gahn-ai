# GAHN AI — Public early-access preview (October 2026)

## Current launch policy
**GAHN AI is publicly accessible for early-access registration and product exploration, not for interactive teaching.**

- Visitors can open the landing page, browse the five Learning Worlds, see career and grade/topic roadmaps, and sign up or sign in.
- The lesson route keeps the black, inactive Tavus-ready instructor window and a blank Magic Canvas with "No learning workspace started". Instead of running the old text-based teaching fallback, it displays **"Interactive lessons coming later"**.
- Lesson video/microphone/sound controls are visibly disabled in preview mode. No fake or simulated live AI session is presented.
- The server rejects all `POST /api/instructor` attempts with HTTP **503** and `code: "LESSONS_NOT_LAUNCHED"` before session creation, OpenAI calls, or learning-record writes.
- Homework uploads are paused in the public interface. The file-analysis API is likewise gated.
- `textLessons: false` and `liveInstructor: false` for all plans. Paid plan purchase controls remain off. **No Tavus video, OpenAI teaching turns, or Stripe checkout is enabled by this change.**
- Existing learner accounts, notes, guides, saved progress, files and history are not modified or deleted.

## Single source of truth
`lib/lessonLaunch.ts` exports `INTERACTIVE_LESSONS_AVAILABLE = false`, referenced by the teaching API and front-end lesson, dashboard, settings, and homework routes.

**Do not switch this to true during ordinary website work.** It is a release decision, not a quick feature toggle. A future launch also requires proper entitlements, supported provider integrations and approved billing.

## Required checks before future instructor launch
1. Complete Tavus licensing and secure authenticated server-side session allocation, with media mute/unmute, disconnection/cleanup, minute metering, and strict concurrency limits.
2. Replace/review the text-only teaching approach with a quality-tested, evidence-based real-time instructor and Magic Canvas tool events.
3. Confirm actual pricing, unit economics, plan limits, cancellation, and Stripe business verification.
4. Obtain user/privacy and child/teen safety review as needed. Validate accessibility and media permissions.
5. Test all five Learning Worlds, text/voice fallback accessibility where applicable, notes, study guides, progress and account isolation.
6. Review production credentials, rate limits, logging, incident response and cost ceilings.
7. Obtain the founder's approval, turn on required entitlements deliberately, run a staging/pilot release, then move to production gradually.
8. Update all early-access/pricing copy to match what is truly available, and keep rollback controls.

Previous testing notes in `docs/free-text-lessons-and-launch-safeguards.md` described an **earlier** implementation with free text lessons available. They do **not** describe the present prelaunch public-access policy.
