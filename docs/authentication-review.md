# Authentication review and deployment

## Findings

The previous login/signup buttons sent different query-bearing OAuth callback URLs (`?intent=login` and `?intent=signup`), but the callback ignored intent. Supabase OAuth signs in or creates a provider identity; it has no email-OTP-style `shouldCreateUser: false` option for `signInWithOAuth`.

The reported landing-page behavior is consistent with Supabase rejecting a redirect URL and falling back to Site URL. The homepage had no server callback dispatch, while its browser Supabase client could exchange a code automatically and establish a session without navigating. Clicking Login then caused the proxy to find that session and redirect to Dashboard. The code supports this failure mode; the exact hosted URL allowlist and email templates were not available through the connected tools, so a configuration mismatch is not claimed as proven.

The callback also waited for profile and welcome-email work. Profile errors redirected an already-authenticated user to Login, where the proxy immediately redirected them back. Dashboard logout ignored errors and used client routing, allowing stale prefetched state. Auth cookies refreshed in the proxy did not consistently carry explicit private/no-store headers.

## Changes

- One exact same-origin `/auth/callback` for Google, email signup/resend and password recovery. Recovery is recognized from auth-js's verified PKCE recovery marker or a verified recovery OTP. Existing `next=/update-password` links remain compatible; arbitrary `next` values are never honored.
- Google initiation is a same-origin POST. Its short-lived HttpOnly intent cookie and PKCE cookies are written on the same response. Query-string `intent=signup` is not trusted.
- Root-level auth codes are forwarded to the callback before homepage rendering or analytics. The browser no longer independently consumes callback URLs.
- Callback responses explicitly retain auth cookies and private/no-store headers. Cookies use SameSite=Lax and Secure on HTTPS; browser-readable Supabase session cookies remain necessary for its browser client. Provider denial, expired codes and setup failures have an error page outside the login redirect loop.
- Successful password login and authenticated email signup use server account completion, then `/dashboard`. No successful auth route targets the landing page.
- New Google users choosing Login must explicitly finish signup. Existing users go straight to their dashboard. Existing email accounts and Google with the same verified email retain Supabase's automatic identity linking; the app never merges accounts by matching client-supplied email.
- A server-owned `account_registrations` record tracks application signup completion. Protected pages and authenticated application APIs require it. Client metadata and profile existence cannot grant registration. Email-origin accounts can finish after email verification because email/password `signUp` is itself explicit signup.
- The additive migration backfills every existing Auth ID and does not alter Auth users, passwords, identities, profiles or learner data. Registration inserts and profile repair ignore duplicate IDs.
- Homepage auth links reflect the current session. Logout checks errors and performs a full replacement navigation; cross-tab sign-out and protected-page focus validation clear stale account views.
- Welcome delivery runs after the response and uses a per-user idempotency key. Optional email delivery cannot block authentication.

**Supabase distinction:** A first-time Google Login can still create a provisional Supabase Auth identity (and the existing database trigger creates its profile). This PR blocks dashboard/application access until explicit signup completion; it does not pretend to prevent provider identity creation, and never deletes a first-time user. Preventing even the provisional Auth row requires a separately designed before-user-created hook/registration protocol. New users who deliberately choose Sign up with Google complete signup directly.

Registration is an application onboarding gate, not a replacement for ownership RLS. Existing tables continue enforcing their own user-ID policies. Pending users may have access to their own provider-created profile through those existing policies; they cannot access another user's data through this change.

## Required rollout, before merging/deploying

1. The production migration is already applied as version `20261027013347`; do not reapply it. For other environments, apply **only** `supabase/migrations/20261027013347_auth_registration_completion.sql` to the target project using the normal migration workflow. It is intentionally not applied to production by this PR. Verify registration count equals the existing Auth-user count immediately afterward. Deploy promptly; users created through old code between migration and deployment may need to complete signup once. Do not rerun the backfill later, as that would enroll provisional users.
2. Supabase → Authentication → URL Configuration: use your canonical production Site URL, and allow the exact `https://www.gahnai.com/auth/callback` and `https://gahnai.com/auth/callback` URLs. Keep legacy callback URLs while outstanding email links are in use. Allow each preview's exact callback only when testing it; avoid a wildcard for all vercel.app tenants.
3. Email templates should use `{{ .ConfirmationURL }}` for PKCE confirmation/recovery, or a separately verified token-hash callback template with the correct `type`. They must not link directly to the homepage. PKCE email links should open in the requesting browser; test cross-device requirements separately.
4. Vercel: retain the existing matching Supabase URL, anon/publishable key and server-only service-role key. `NEXT_PUBLIC_SITE_URL` must be the canonical production origin. No new secret is required. The callback recognizes Vercel's exact deployment and branch hosts; preview URLs also need the Supabase allowlist entry. Avoid a www/apex redirect that moves a callback away from the host holding its PKCE cookie.
5. Test the acceptance matrix below against staging, then merge. **Do not deploy the code before the migration**: registration reads intentionally fail closed with a recoverable setup error.

Read-only hosted review found five verified Auth users, all with profiles, and no accounts were changed. Supabase's security advisor reported leaked-password protection disabled; enable it if supported by the project's plan. Four other informational findings were RLS-enabled service-only analytics/feedback tables with no client policies; no broad grants were added. [Password protection guidance](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).

## Verification

- `npm run verify:auth`: real route-handler and cookie-response regression tests with isolated Supabase responses. Covers successful/failed OAuth and OTP callbacks, recovery, open-redirect rejection, registration intent, anonymous/unverified users, DB failures, protected routes, refresh cookies and cross-origin POST rejection.
- `node scripts/verify-auth-migration.mjs`: ten checks against isolated PostgreSQL via PGlite, including legacy preservation, own-row RLS, denied anonymous/client writes, service-role insertion, uniqueness and foreign keys. Install test-only PGlite outside the repository: `npm install --prefix /tmp/gahn-auth-test-deps --ignore-scripts @electric-sql/pglite@0.5.12`, then set `GAHN_PGLITE_MODULE=/tmp/gahn-auth-test-deps/node_modules/@electric-sql/pglite/dist/index.js` when running the script.
- `node scripts/verify-auth-sdk.mjs`: installed Supabase SDK password-session persistence, server cookie reading, logout success/failure and PKCE recovery, using an in-process fake Auth transport.
- `node scripts/verify-auth-http.mjs` after a production build: real local Next.js HTTP checks for auth pages, fallback routing, error routes, signed-out protection, OAuth initiation cookies and registration endpoint protection. Uses local fake Supabase configuration; it never follows the provider URL.
- ESLint, TypeScript, production build and the existing 341-route acceptance suite are required. Exact results are recorded in the PR.

### Live acceptance still required

Use disposable staging accounts, not existing production users. Check email signup with and without confirmation, duplicate email signup, verified link reuse/expiry, returning password login, wrong password, new Google signup, returning Google login, first-time Google Login followed by explicit signup completion, Google cancellation, same-verified-email linking (same user ID), recovery and Google password setup, refresh/reopen, two-tab logout, global logout and protected URL access. Confirm dashboard navigation without a second click and verify existing notes remain tied to the same user ID.

These provider/account flows are not claimed as live-tested. No real verification/reset messages were sent, no credentials were requested, and no hosted account or database records were modified.

## References reviewed

- https://supabase.com/docs/guides/auth/server-side/advanced-guide
- https://supabase.com/docs/guides/auth/auth-identity-linking
- https://supabase.com/docs/guides/auth/auth-hooks/before-user-created-hook
- Installed `@supabase/ssr` and `@supabase/auth-js` source for PKCE recovery and cookie behavior.
