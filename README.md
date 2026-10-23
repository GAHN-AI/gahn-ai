# GAHN AI

GAHN AI is an education MVP in **early-access preview mode**. Visitors can register, sign in, browse five Learning Worlds, inspect planned curricula, and preview the instructor/Magic Canvas layout. Interactive teaching, paid subscriptions, homework analysis, and provider-session creation are paused.

## Application

- Next.js App Router, React, and TypeScript.
- Supabase account authentication and learner records.
- Vercel hosting; Stripe, Resend, PostHog, and Sentry integrations already exist.
- 41 active digital-career previews, with role-specific course plans and original SVG illustrations.

## Development

Install the committed dependencies with `npm ci`. Configure environment values locally using `.env.example` as a guide; never commit credentials. `npm run dev` starts the application.

Checks:

```sh
npm run lint
npx tsc --noEmit
npm run verify:curriculum
GAHN_LOCAL_CHECKS=true NEXT_TELEMETRY_DISABLED=1 npm run build
npm run verify:routes
```

The local-check build disables source-map uploads, and build-system telemetry is disabled in `next.config.ts`. The normal production build remains `npm run build`.

## Curriculum and artwork

- `lib/careerCatalog.ts`: the active career directory and image assignments.
- `lib/curricula/`: authored plans grouped by career field.
- `lib/careerCurricula.ts`: normalized section/lesson IDs and preview route helpers.
- `lib/topicStudyPlans.ts`: the other Learning Worlds' study outlines.
- `scripts/generate-career-artwork.py`: original SVG scene source; no remote image or paid generation API is used.
- `scripts/verify-curriculum.mjs`: coverage, lesson links, original assets, and prelaunch invariants.

Legacy `lib/careerCurriculum.ts` and provider components remain for future engineering work. Check callers before reusing or removing them.

## Release boundaries

`lib/lessonLaunch.ts` is the shared launch policy. Do not enable it as part of ordinary design or content work. Keep paid plan purchase flags and live/text entitlements off until a separately approved product launch. Do not create paid provider sessions while testing previews. Preserve existing accounts, notes, progress, files, and subscriptions.

See [the audit record](docs/professional-platform-audit.md), [early-access policy](docs/public-early-access-preview-mode.md), [Tavus handoff](docs/tavus-integration-handoff.md), and [future teaching-model policy](docs/future-teacher-brain-model-policy.md).
