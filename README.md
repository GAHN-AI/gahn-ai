# GAHN AI

GAHN AI is an education MVP in **early-access preview mode**. Visitors can register, sign in, browse five Learning Worlds, inspect planned curricula, and preview the instructor/Magic Canvas layout. Interactive teaching, paid subscriptions, homework analysis, and provider-session creation are paused.

## Application

- Next.js App Router, React, and TypeScript.
- Supabase account authentication and learner records.
- Vercel hosting; Stripe, Resend, PostHog, and Sentry integrations already exist.
- 97 structured course plans across five Learning Worlds, including 41 careers with distinct professional photographs.

## Development

Install the committed dependencies with `npm ci`. Configure environment values locally using `.env.example` as a guide; never commit credentials. `npm run dev` starts the application.

Checks:

```sh
npm run lint
npx tsc --noEmit
npm run verify:curriculum
npm run verify:tutor
GAHN_LOCAL_CHECKS=true NEXT_TELEMETRY_DISABLED=1 npm run build
npm run verify:routes
```

The local-check build disables source-map uploads, and build-system telemetry is disabled in `next.config.ts`. The normal production build remains `npm run build`.

## Curricula and tutor workspace

- `lib/careerCatalog.ts`: career directory and photographic image assignments.
- `lib/course-content/`: authored sections, specific skills, practice tasks and pathway order.
- `lib/courses.ts`: unified version-2 registry for 41 careers and 56 topic/grade plans.
- `components/courses/`: shared course outline, tutor slot and read-only Magic Canvas.
- `lib/tutor/progression.ts`: tested domain transitions for teaching, checks, review and tutor advancement. This is not yet an authenticated or persistent session service.
- `lib/tutor/canvasExamples.ts`: explicitly labeled static examples; these award no progress.
- `scripts/verify-curriculum.mjs` and `scripts/verify-tutor-progression.mjs`: coverage, prerequisites, event ordering and prelaunch checks.

See [curriculum authoring](docs/curriculum-authoring.md), [photography sources](docs/career-photography.md) and [the tutor session contract](docs/tutor-session-contract.md). Earlier provider components and original SVG assets remain unused by the new course pages; check callers before reusing or removing legacy code.

## Release boundaries

`lib/lessonLaunch.ts` is the shared launch policy. Do not enable it as part of ordinary design or content work. Keep paid plan purchase flags and live/text entitlements off until a separately approved product launch. Do not create paid provider sessions while testing previews. Preserve existing accounts, notes, progress, files, and subscriptions.

See [the audit record](docs/professional-platform-audit.md), [early-access policy](docs/public-early-access-preview-mode.md), [Tavus handoff](docs/tavus-integration-handoff.md), and [future teaching-model policy](docs/future-teacher-brain-model-policy.md).
