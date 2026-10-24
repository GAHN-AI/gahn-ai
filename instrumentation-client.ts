import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

// Keep compatibility with the older NEXT_PUBLIC_POSTHOG_KEY name while
// standardizing new environments on NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN.
const projectToken =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
  process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (projectToken) {
  posthog.init(projectToken, {
    api_host: posthogHost,
    defaults: "2026-08-30",
  });
}
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
