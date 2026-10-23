# Professional platform audit and curriculum cleanup

## Scope and release policy

This review builds on main after PR #25. It preserves the existing application, account records, database security, and early-access policy. Course plans describe future lessons, not operational teaching or accredited training. No database migrations, provider purchases, or real learner-record changes are part of this work.

## Implemented improvements

- All 41 active careers have authored plans with different depth: 6–12 sections per role, 292 sections and 876 specific planned lessons in total. Each section includes a practice brief and a review outcome; every pathway concludes with a role-specific project.
- Course previews show starting requirements, broad earning guidance, learning outcomes, expandable sections, lesson links, projects, and the existing inactive workspace.
- Original self-contained SVG illustrations replace all 41 repeated career photo assignments. The generator is included so the scenes remain editable and reproducible.
- All 56 non-career topic/grade pages have subject-appropriate study outlines. Single-topic paths redirect directly to their topic overview; classroom plans explain syllabus variation.
- Shared original world/navigation symbols replace decorative rockets and sparkles. Existing functional icons remain where useful.
- About, signup/login, FAQ, and Learning World copy describe what is available during early access. The FAQ minimum age now matches the existing Terms and Privacy Policy.
- The workspace resolves specific career lesson previews, rejects unknown lesson IDs, and returns to the correct career curriculum. Retired instructor URLs return to the public Learning World directory.
- Profile typography and responsive spacing replace viewport zoom. Profile fields, feedback selection controls, plan comparison scrolling, global keyboard focus, and skip navigation have clearer accessible behavior.
- Settings and Feedback now use the same server-side signed-out redirect protection as other account pages. Profile/dashboard loading failures are surfaced instead of triggering unnecessary fallback profile inserts.
- Legacy video-session creation now explicitly fails closed before authentication or provider calls while lessons are paused. Existing termination and records remain intact.
- Existing hook, ref, typing, image, and unused-component lint findings were corrected; browser preference reads use external-store subscriptions. Build-system telemetry is disabled and local build checks can skip source-map uploads.

## Route inventory

| Route source | Review scope |
| --- | --- |
| `/about` | Public source, wording, navigation, and read-only HTTP checks where listed |
| `/admin/analytics` | Internal/demo source and authorization-boundary review; no admin or error-demo interaction |
| `/admin/early-access` | Internal/demo source and authorization-boundary review; no admin or error-demo interaction |
| `/assigned-homework` | Account UI/source review and passed signed-out guard; real-account writes remain untested |
| `/contact` | Public source, wording, navigation, and read-only HTTP checks where listed |
| `/dashboard` | Account UI/source review and passed signed-out guard; real-account writes remain untested |
| `/feedback` | Account UI/source review and passed signed-out guard; real-account writes remain untested |
| `/in-progress` | Public source, wording, navigation, and read-only HTTP checks where listed |
| `/instructor/[instructorId]` | Public source, wording, navigation, and read-only HTTP checks where listed |
| `/learn/[world]/[section]/[topic]` | Study-plan, navigation, HTTP, and paused-workspace checks |
| `/learn/[world]/[section]` | Study-plan, navigation, HTTP, and paused-workspace checks |
| `/learn/[world]` | Study-plan, navigation, HTTP, and paused-workspace checks |
| `/learn/career-skills/[section]` | Curriculum, artwork, and HTTP route checks passed; browser visual review pending |
| `/learn/career-skills/industry/[industry]` | Curriculum, artwork, and HTTP route checks passed; browser visual review pending |
| `/learn/school-help/homework-upload` | Study-plan, navigation, HTTP, and paused-workspace checks |
| `/lesson/[lessonId]` | Study-plan, navigation, HTTP, and paused-workspace checks |
| `/login` | Public source, wording, navigation, and read-only HTTP checks where listed |
| `/notes` | Account UI/source review and passed signed-out guard; real-account writes remain untested |
| `/` | Public source, wording, navigation, and read-only HTTP checks where listed |
| `/pricing` | Public source, wording, navigation, and read-only HTTP checks where listed |
| `/privacy` | Public source, wording, navigation, and read-only HTTP checks where listed |
| `/profile` | Account UI/source review and passed signed-out guard; real-account writes remain untested |
| `/progress` | Account UI/source review and passed signed-out guard; real-account writes remain untested |
| `/sentry-example-page` | Internal/demo source and authorization-boundary review; no admin or error-demo interaction |
| `/settings` | Account UI/source review and passed signed-out guard; real-account writes remain untested |
| `/signup` | Public source, wording, navigation, and read-only HTTP checks where listed |
| `/study-guides` | Account UI/source review and passed signed-out guard; real-account writes remain untested |
| `/terms` | Public source, wording, navigation, and read-only HTTP checks where listed |
| `/update-password` | Public source, wording, navigation, and read-only HTTP checks where listed |

## Verification record

The automated curriculum acceptance check validates all 41 catalog/roadmap/course mappings, 876 lesson IDs and preview links, 41 distinct local illustration files, 56 non-career study plans, and disabled teaching/video/purchase entitlements. All existing public image URLs inspected during this review returned HTTP 200 (41 distinct URLs).

Local lint, TypeScript, and the telemetry-disabled production build passed. The initial read-only HTTP pass checked 270 public pages/assets, eight signed-out account redirects, and three paused API endpoints without failures. The Vercel deployment-preview build passed. Direct browser inspection reached Vercel Authentication. Automatic approval review rejected a temporary access-link request because it would broaden protected-preview access. No deployment protection was changed; desktop, tablet, and mobile browser review remains pending. The temporary responsive review helper has been removed from the merge candidate. Browser-only or account-write checks must not be described as passed without direct evidence.

## Validation limits and future work

- A real authenticated learner session is needed to validate profile uploads/saves, note edits, password email delivery, feedback submission, sign-out across devices, and account isolation end to end. Those actions were not simulated against production learner records.
- Local browser access and the deployment connection may be restricted in this environment. Report any preview or production access failure rather than treating a successful compile or GitHub merge as proof of live behavior.
- The existing curriculum content is an editorial preview, not a completed course or subject-matter certification. Domain specialists should review the future teaching content, exercises, rubrics, accessibility, and learner safeguards before launch.
- Medical/financial/legal administration plans use synthetic cases and explicit professional boundaries. They do not qualify a learner for regulated services or replace required training.
- The existing leaked-password protection warning requires the owner to review the available Supabase configuration/plan; no paid upgrade or database-permission expansion is made here.

## Editorial source notes

The lesson titles, exercises, illustrations, and interface are original GAHN planning work. The following primary references inform role boundaries and accessibility review; they are not copied courses or promised credentials.

- [O*NET: Software Developers](https://www.onetonline.org/link/summary/15-1252.00) and [Data Scientists](https://www.onetonline.org/link/summary/15-2051.00): occupational task and entry-context checks.
- [W3C: Forms](https://www.w3.org/WAI/tutorials/forms/) and [Page Structure](https://www.w3.org/WAI/tutorials/page-structure/): labels, regions, headings, and keyboard access.
- [CMS Medicare Learning Network training](https://www.cms.gov/training-education/medicare-learning-networkr-mln/resources-training/mln-web-based-training): current billing/coding educational context and limits.
- [HHS minimum-necessary guidance](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/minimum-necessary-requirement/index.html): limiting access to health information; actual applicability and exceptions require qualified review.

No salary numbers, lecture durations, completion certificates, employment guarantees, unlimited usage, or provider-capacity promises were added.
