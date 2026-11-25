# GAHN AI customer feedback → Resend support

This change connects the two authenticated website feedback forms to Resend and preserves the existing founder's Zoho Mail copy.

## What happens after a customer submits feedback
1. The submission is saved in Supabase (the database still enforces one submission per account).
2. An internal notification is sent to support@updates.gahnai.com (Resend Inbox) and the original Zoho support inbox.
3. A separate email goes to the verified email on the customer's logged-in account, regardless of which email provider the customer uses.
4. For routine requests, if OPENAI_API_KEY is set, the backend asks a restricted support model for a short factual reply. The support message is treated as untrusted text.
5. Sensitive issues (billing, login, refunds, legal, privacy, security, investor inquiries) and model failures receive a safe receipt acknowledgment and require founder review. The Resend Inbox agent labels incoming notices for review.
6. Resend's email idempotency key and the database's one-feedback-per-user rule help prevent duplicate replies.

The Resend Inbox built-in agent does not automatically send its drafts. This implementation sends website-feedback replies in the website's server-side API handlers. Emails written directly to the Resend support address are still drafted/triaged by the inbox agent and are NOT sent automatically without a separate verified webhook workflow.

## Required configuration
- RESEND_API_KEY: a domain-authorized server key already used for feedback notifications.
- OPENAI_API_KEY: optional for generating a personalized response; without it, users receive a reliable generic acknowledgment.
- OPENAI_SUPPORT_MODEL: optional, defaults to gpt-4o-mini.
- FEEDBACK_NOTIFICATION_EMAIL: existing Zoho backup inbox for the dashboard feedback route.
- Resend domain updates.gahnai.com must have verified sending and receiving and a working support@updates.gahnai.com inbox.

Never expose API keys through NEXT_PUBLIC variables or commit them to GitHub.

## Verification
- Ensure TypeScript/build and route tests pass.
- Use a NEW registered test account because each feedback form permits one submission per account.
- Submit a short routine question and check the Resend Inbox, Zoho Mail, and the test account's Gmail/other mailbox.
- Submit a sensitive issue on a separate test account; check it is preserved and receives acknowledgment without invented promises.
- Check Resend email logs for delivery errors and confirm that the team can answer the customer directly.
- Confirm a bounce, missing OPENAI_API_KEY, or LLM failure does not lose the saved feedback.
- If customers need ongoing back-and-forth support, consider a dedicated support form or verified inbox webhook; do not remove the one-submission rule without a separate anti-spam plan.
