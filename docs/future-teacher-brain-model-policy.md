# GAHN AI — future Tavus instructor brain and model governance

**Status: design specification only. Nothing here turns on Tavus, upgrades a paid model, changes production API billing, or promises provider capacity.**

## Verified OpenAI models (October 2026)
The OpenAI API catalog lists `gpt-6-astra` as its highest-intelligence flagship model for complex reasoning. `gpt-6.1-sol` provides a lower-cost balance of quality and speed; `gpt-6-luna` is more cost-efficient. Official sources:
- https://developers.openai.com/api/docs/models
- https://developers.openai.com/api/docs/guides/latest-model
- https://developers.openai.com/api/docs/pricing
- https://developers.openai.com/api/reference/resources/models/methods/list

**Do not confuse a ChatGPT subscription with access to these models inside GAHN.** GAHN needs its own OpenAI API project, billing and valid model availability. The owner must approve any paid usage.

## Preferred architecture after funding and vendor contracts
1. **Tavus** supplies authorized live conversational video, realistic speaker/avatar and session media controls. The browser uses `data-tavus-video-slot="instructor"`. The provider's real configured display name should be used; never hard-code a named teacher.
2. **GAHN server-side teaching orchestrator** handles curriculum objectives, prompting, tools, session ownership, structured outputs, learning state and safety. `app/api/instructor/route.ts`, `lib/ai/instructorPrompt.ts`, `lib/ai/lessonEngine.ts` and `lib/practicalSkillRoadmaps.ts` form existing starting points.
3. **OpenAI model router** is injected behind the orchestrator, not into the client and not directly into Tavus without validated authorization. Prefer `gpt-6-astra` for complex instructional planning, multi-step reasoning, difficult learner misconceptions and quality review when latency and cost permit. Compare `gpt-6.1-sol` or other evaluated models for frequent low-latency teaching turns. Real-time conversation needs quick responses and may benefit from specialized speech models, but only if compatible with Tavus.
4. **Learning content tools** let the teaching system call trusted Magic Canvas actions: show equation, diagram, worksheet, quiz, writing exercise, worked example and formative feedback. Validate the tool schema and permission on GAHN's server; do not execute arbitrary generated code or commands.
5. **Learner memory and progression** remain in GAHN's Supabase backend and belong to the authenticated user. Save evidence (what the learner said, demonstrated or corrected), not fabricated mastery claims. Do not store or share sensitive learner recordings without legal review, suitable notices and permissions.
6. **Teacher-quality layer** uses structured lesson plans and rubrics, retrieval from reviewed educational material, ground-truth checks for calculations, diagnostic misconceptions, spaced review, and escalation to a human subject-matter expert for high-stakes or uncertain content. A powerful model alone does not guarantee teaching quality.
7. **Costs and controls**: enforce per-user session limits, concurrency, tool budgets and audio/video usage ceilings before provider allocation. Record true charges, tokens, conversation minutes, model name and latency with privacy-safe logging. Keep plan entitlements and billing separated.

## No automatic blind model upgrade
Model releases and API capabilities change. Use server-owned configuration or a feature flag to select a **currently supported API model**, with an allowlist and a fallback model. A scheduled documentation/catalog check can notify the engineering team, but **a new model must not silently replace the existing one**.

Required controlled upgrade checklist:
- Compare task accuracy, pedagogy, hallucination rate, live latency, accessibility and cost with representative GAHN lessons.
- Test five learning worlds, detailed digital-career practice, uploaded homework privacy, response formatting, Magic Canvas tool calls and rate limits.
- Verify API availability, current limits, retention and data-processing terms.
- Have the technical lead and founder approve the cost estimate and deployment.
- Roll out gradually behind a feature flag with monitoring and rollback to a known-good model.

## Pending contracts, not built today
- Approved Tavus contract, SDK/event schema, concurrency cap, usage and data-processing policies.
- OpenAI project and API credentials, budget approval and evaluation suite.
- Engineering scope, completed platform QA, subject-matter expert review and privacy/compliance controls for minors.
- At-scale costs; flagship reasoning can cost much more than economical real-time turns.

Existing production `OPENAI_TEACHING_MODEL` remains unchanged by this document. **No new billable model is activated.**
