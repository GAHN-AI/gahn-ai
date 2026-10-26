# Course revision verification

Verified October 26, 2026, with main commit f0f377d6d88e6bfcfa83aa237622469ee3905466 merged into the course revision. The newer analytics implementation and homepage images are preserved.

## Automated checks

- ESLint and TypeScript passed.
- Next.js production build passed.
- Curriculum validation passed for 97 courses across five worlds and 41 distinct career photograph references.
- Tutor progression checks passed: 2,524 counted assertions, including every lesson/section transition, failed checks, reteaching, scoped events, invalid payloads and replay handling.
- Production HTTP checks passed: 341 public routes/assets (including later-lesson lock notices), eight signed-out redirects, three paused provider APIs and four invalid-route 404s.

## Browser review

The authorized Vercel review deployment was checked on October 23 and 26. Representative desktop, 390px phone and 768px tablet views covered the software course and workspace, school mathematics, memory, history and book-summary workspaces. The design career cards and school course overview were also visually reviewed. Software section expansion/collapse, readable course rows, photography, locked future lessons, disabled session controls and the read-only canvas were checked. Small screens stack the tutor and canvas; desktop places them side by side. The temporary responsive review HTML is removed from this revision.

This is representative visual coverage, not a claim that every course has been manually inspected or professionally accredited. The final additional canvas examples are included in the automated checks; the deployed visual review used the same shared layout before those examples were added.

## Integration boundary

These are detailed course outlines and a static workspace preview, not fully authored lesson scripts or a validated quiz bank. Live audio/video, server-verified tutor events, assessment generation/grading, durable progress, resume and account-isolation flows still require integration and staging tests. No live provider calls or learner-record writes were used in this verification. See tutor-session-contract.md before enabling teaching.
