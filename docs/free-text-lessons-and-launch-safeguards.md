# Free text lessons and prelaunch purchase/video safeguards

## What was corrected (October 2026)

- `POST /api/instructor` is the **authenticated text teaching API**, not a Tavus/LiveAvatar media-session API. It now checks the explicit `textLessons` entitlement, which is `true` for the Free Plan and every other plan.
- `mastery_check`, `review`, and `study_guide` remain protected by their own separate plan entitlements.
- Free users can receive structured, text-only turns and Magic Canvas blocks through the current lesson engine. If `OPENAI_API_KEY` is absent or the teaching model fails, the existing structured fallback lesson still works; **do not advertise the fallback as a connected advanced AI model**.
- Free text teaching remains subject to the existing daily AI-turn usage cap (currently 40 by default; configurable with `EARLY_ACCESS_AI_TURNS_PER_DAY`).
- `learner_plus.purchaseEnabled` is `false`. Every paid plan is blocked by a **second plan-level** purchase safeguard even if the global `STRIPE_CHECKOUT_ENABLED` flag is accidentally enabled.
- All live video `liveInstructor` entitlement flags are currently `false`, and proposed personal video-minute quotas are reset to zero until a licensed provider integration is ready. Legacy video reservation checks deny sessions without a live-video entitlement. No Tavus connection is activated.
- Public paid-plan video-minute allowances are marked **not finalized** instead of advertising daily minutes that disagree with the monthly quota implementation. Do not reactivate the old figures without provider pricing, cost calculations, and a reviewed limit/reset implementation.

## Manual signed-in acceptance tests (required before declaring production verified)

1. Register or sign in to a **Free Plan** test account.
2. Open a Career Skills digital career lesson and select **Start Lesson**. Expected: a successful response from `/api/instructor`, a visible text teaching turn and a populated Magic Canvas; black Tavus window stays disconnected.
3. Submit a correct and an incorrect answer, verify new text/canvas turns, and ensure learning progress is stored only for that account.
4. Finish a lesson, verify that the response is successful, that the progress record is saved, and that any enabled personal notes appear in My Notes.
5. Navigate to School Help, Brain Development, General Knowledge and Book Intelligence and verify lesson initialization in each world.
6. Verify that `mastery_check`, `review` and `study_guide` are still denied to Free Plan users with HTTP 403; enabled free functionality (e.g. personal notes) must continue working.
7. Verify that unauthenticated `/api/instructor` calls receive HTTP 401.
8. Verify that direct legacy live-video session POST requests cannot create provider sessions or charge the video provider for any plan. Existing audio buttons must not start Tavus.
9. Verify that pricing shows all paid plans as **Coming Later** and **unfinalized** video allowances.
10. Verify that POST `/api/stripe/checkout` rejects every paid plan even if the global checkout switch were enabled, and that checkout remains off in the actual environment.
11. Repeat with `OPENAI_API_KEY` deliberately unavailable **in a test environment only**, confirming structured fallback text lessons still function without pretending to be real AI.
12. Monitor database and API errors and compare the daily usage cap with actual costs before a broader public free launch.

**Important:** A successful Vercel build/preview is not an end-to-end test. Do not change production secrets or settings simply to complete QA. Use test accounts and isolated environment settings. No user data should be deleted during testing.
