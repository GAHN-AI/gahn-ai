/**
 * Prelaunch policy for GAHN's interactive teaching environment.
 *
 * The public site and learner signups remain open, while teaching sessions
 * are unavailable until the real-time instructor has passed acceptance tests,
 * received founder approval and is ready for an authorized commercial launch.
 *
 * Keep the existing lesson code and user data intact. Turning this flag on is
 * NOT sufficient to release a paid provider: entitlement, session controls,
 * spending limits, safeguarding and pricing require separate checks.
 */
export const INTERACTIVE_LESSONS_AVAILABLE: boolean = false;

export const LESSON_PREVIEW_MESSAGE =
  "Interactive AI lessons are not available yet. Explore the Learning Worlds and preview the workspace while GAHN AI is being developed.";
