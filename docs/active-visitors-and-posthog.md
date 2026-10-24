# GAHN Admin: Active Users (presence estimate) and PostHog verification

## What is new
- `/admin/analytics` now has an additional **Active now** card. It does **not** replace unique signups or historical anonymous browser IDs.
- The admin-only `/api/admin/analytics` endpoint adds `activeNow`, `activeSignedInNow`, and `activeWindowSeconds` to its existing JSON response.
- A browser ID qualifies when at least one non-admin session:
  - is still marked `active`,
  - had activity in the past **120 seconds**,
  - has continued for **5 seconds or longer** after its first page view.
- Client-side `SitePresence` sends heartbeats every 10 seconds when the tab is visible; it sends a best-effort leave beacon when the tab is hidden or closed.
- The dashboard refreshes every **30 seconds**.
- Both `activeNow` and `activeSignedInNow` count unique **browser IDs**, not provably unique people, verified members or paying customers. A person can appear more than once across devices/browsers; some bots can still appear. A visitor who exits or goes idle stops appearing after at most ~2 minutes.
- No new tables, schema migrations or deletions are required.

## PostHog setup findings (2026-10-24)
- The code already had `posthog-js` initialized once in `instrumentation-client.ts` and used for signup analytics.
- The active PostHog project is **GAHN Project**, using `https://us.i.posthog.com` as its ingestion host.
- Before the fix, PostHog's observed page-view hostname was **localhost:3000** and the production Vercel project lacked BOTH required public browser variables. So earlier client instrumentation was not proof that live production events were ingesting.
- Added to Vercel **production only**: `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` (public project token) and `NEXT_PUBLIC_POSTHOG_HOST` (ingestion URL). Do not commit tokens to GitHub. Preview/test traffic intentionally does not inherit these variables.
- `.env.example` now uses the same token variable name as the actual SDK. The legacy `NEXT_PUBLIC_POSTHOG_KEY` remains a compatible fallback for local development.
- When signed in, PostHog identifies the user by stable **Supabase user ID**, not email; sign-out resets the anonymous PostHog identity.
- Vercel Web Analytics remains installed and independent of PostHog and the Supabase counters.

## Verification after deployment
1. Verify the main production deployment builds successfully after the production env variables have been saved.
2. Open **https://www.gahnai.com/** from a regular browser (not a protected preview). Navigate between two public pages for at least 15–20 seconds.
3. Check [PostHog Live Events](https://us.posthog.com/) for `$pageview` events with `$host = "www.gahnai.com"` or `"gahnai.com"` after deployment. Confirm the event source is production, not `localhost:3000`.
4. Log in to a **test account** and verify PostHog identifies by Supabase user ID without storing an email as the distinct ID. Sign out and verify the PostHog anonymous identity resets.
5. With the site visible, check `/admin/analytics`; the Active now card should increase after a heartbeat, and should fall back after the tab is hidden/closed or two minutes pass.
6. Verify anonymous visitors and signup totals are unchanged by adding this metric.
7. Check that nonadmins cannot retrieve `/api/admin/analytics`, and existing admin email access rules still work.
8. Compare total Vercel pageviews to PostHog only over matching dates and production host. Exact equality is **not expected**: they have different privacy rules, blocking and visitor-identification methods.
9. If PostHog events still show only localhost, confirm the correct production domain/project, check client network requests to the PostHog ingestion host, and check blockers/consent restrictions.
10. Do not disclose PostHog project tokens, private API keys or learner data in logs or screenshots.

## Behavior and privacy
- Treat the Active now value as operational presence, **not verified human traffic**. Automated requests can still simulate browser IDs and heartbeats. Do not use it alone to claim investor traction.
- The card is derived from the existing Supabase tracking data, not the PostHog SDK, so PostHog blockers do not stop the card from showing active browser presence.
- No changes were made to live instructor restrictions, paid checkout, existing session history, or user accounts.
