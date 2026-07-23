import posthog from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (projectToken) {
  posthog.init(projectToken, {
    api_host: posthogHost,
    defaults: "2026-05-30",
  });
}