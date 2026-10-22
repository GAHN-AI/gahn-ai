# Tavus integration handoff — GAHN AI lesson workspace

## Status
The lesson UI is prepared for a future Tavus integration; **no Tavus credentials, API requests, paid usage, or video stream are connected yet**. Do not describe the black video slot as a live instructor.

## Shared location
- `components/lessons/LearningStudio.tsx` is the existing cross-Learning-World lesson experience. It contains a black, responsive 16:9 video mount with `data-tavus-video-slot="instructor"`, along with microphone, text, and sound controls.
- `components/lessons/MagicCanvas.tsx` retains lesson blocks and answer input. Its empty state reads **No learning workspace started** before a teaching turn exists.
- The existing `/api/instructor` endpoint and lesson-engine structures provide text learning, teaching turns, canvas blocks, session state, notes and progress. Do not bypass their entitlement checks or persistence rules.

## Engineering integration tasks (future paid, approved work only)
1. Create an authenticated **server-only** Tavus session creation/termination adapter. API keys must remain server-side; do not embed Tavus secrets in the browser or GitHub.
2. On a learner-initiated start, check paid entitlements, available monthly/daily minutes, concurrent-session limits and provider billing controls **before** allocating a provider session.
3. Connect the Tavus client to the existing labeled video slot using the currently supported Tavus embedding/streaming API, with consent and media permissions. Leave the black placeholder intact on unavailable/failed/disconnected states.
4. Replace placeholder microphone/speaker state with the provider's actual media-track mute and audio-output controls when available. Until then, they affect only the existing browser speech input/speech-synthesis helpers. Text mode should continue to accept typed responses.
5. Subscribe to Tavus **real-time tool-call events**, not assumed webhook delivery. Translate approved validated event types into the existing Magic Canvas block updates / learning actions. Never execute arbitrary event payloads or bypass backend authorization.
6. Keep lesson/canvas state, study notes, submissions and progress in GAHN's backend, not in the video provider. Save assessments only after verified learner evidence.
7. Explicitly end provider sessions on Finish, unmount, navigation, sign-out, network loss, timeout and entitlement exhaustion; reconcile actual minutes in a server-owned usage ledger. Do not rely exclusively on client-side timers.
8. Add structured monitoring, error recovery, rate limits, browser microphone permissions, keyboard accessibility, privacy review for young learners, and realistic end-to-end QA.

## Required acceptance tests
- Empty workspace shows the correct message; video is black and says Tavus is not connected.
- Start Lesson uses the existing text engine and updates Magic Canvas without Tavus credentials.
- Media buttons work for existing browser features without triggering provider billing.
- All five Learning Worlds reuse the shared workspace.
- Once Tavus is licensed: provider video, audio, text fallback, real-time canvas actions, secure session creation/termination, and exact usage limits work end to end.

## Provider contract prerequisites
Obtain from Tavus: approved API credentials, current SDK/embed docs, per-minute price and included minutes, concurrency limits, overage policy, timeouts, engineering scope, and data/retention agreements. Do not assume 1,000 concurrent sessions or unlimited minutes are included in the base Enterprise price.
