# GAHN AI verified-email-first authentication (November 2026)

## Intended learner journey

1. New learners go to /signup and enter full name, email, password, and password confirmation.
2. Supabase must send an email-confirmation link. The form has a 60-second resend cooldown.
3. The link goes through /auth/callback. A verified email signup completes the server-owned account registration, schedules the welcome email, clears the temporary session, and redirects to /login?verified=1.
4. Learners now sign in using email/password, or use Google login **only if their verified account email matches the Google email**. Supabase automatically links matching verified provider identities; it does not blindly merge accounts from client-supplied email.
5. Google authentication is started on /login via an OAuth POST and Google's real provider page. The request has `prompt=select_account`; it is an account chooser during a redirect, not a custom GAHN popup.
6. Existing registered Google-only accounts retain their Google login. New Google identities may still be provisionally created by Supabase Auth, but GAHN forbids registration through Google and gates its dashboard and account API access on the trusted `account_registrations` table.
7. Password reset still uses the separate recovery link, not the signup-complete path. New users are never taken to the dashboard by clicking the email confirmation link alone.

## Supabase production settings (must be checked manually)

1. Supabase Dashboard → Authentication → Providers → Email → enable **Confirm email**. Without it, email/password `signUp` may return a session immediately; the website refuses to treat that as verification.
2. Authentication → URL Configuration: set the canonical production Site URL and allow `https://www.gahnai.com/auth/callback` and `https://gahnai.com/auth/callback`, plus the actual production/preview URLs used for testing.
3. Authentication → Email Templates → Confirm signup: verify the template contains a working Supabase `{{ .ConfirmationURL }}` link or a supported token-hash link that points to /auth/callback. Do not send a second passwordless email on every page load.
4. Authentication → Providers → Google: keep OAuth credentials, client ID/secret, authorized origins, and Supabase OAuth redirect authorized in Google Cloud. Do not publish secret values.
5. Verify SMTP settings, deliverability, and sender identity to make sure the verification email arrives.
6. To prevent even a provisional Google Auth user from being created, enable the prepared **Before User Created** hook in Supabase Dashboard → Authentication → Hooks. Choose **Postgres** and select `public.gahn_reject_new_google_users`, then save/enable it. It was added to the hosted database with migration `20261126005536_gahn_reject_new_google_users`; it only rejects creation of new Google Auth rows and allows normal email registrations. The hook was confirmed with read-only SQL examples: Google rejected (403), email allowed. The connector cannot activate the hosted Auth hook, so this dashboard step is REQUIRED for Google-first blocking. Confirm that no other Before User Created hook is being replaced before enabling.
7. Check Supabase → Authentication → Attack Protection and enable leaked-password protection where the current plan supports it. The current security advisor flags it as disabled.

## Test matrix

- New email sign-up: no dashboard, verification email arrives, click verify → login with success notice; no authenticated dashboard session remains after verification.
- Email login before verification: denied; email login after verification: dashboard.
- Google login for verified matching email: official account picker → existing account's dashboard; no second profile.
- New Google email with no GAHN registration: no dashboard; redirected to login explaining email signup is required. No account-registry row should be created.
- Returning Google-only GAHN accounts with an existing registration: still sign in and reach dashboard.
- Password reset: recovery link opens password update instead of signup/dashboard.
- Bad or expired verification link: error page, no registration.
- Cross-tab and logout: no stale account access; protected pages reject provisional and signed-out sessions.

## Verification limitation

The GitHub auth unit tests and Vercel build checks do not run the real Google account chooser or deliver a genuine Supabase confirmation email. Production testing requires a new test email and a Google account using the same address. Never test with or expose personal passwords or tokenized links in public logs.
