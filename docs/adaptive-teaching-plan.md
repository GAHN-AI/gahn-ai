# Planned adaptive teaching: instructional strategy map

GAHN AI currently offers early-access previews; **live instructor sessions and automatic strategy selection are not implemented by this document**. This is the future behavior contract for the instructor engine across all five Learning Worlds.

## Product rule

Adapt teaching using observable learner behavior: submitted answers, reasoning, corrections, practice results, and progress. Do **not** claim to measure brain activity, intelligence, neural pathways, innate "learning styles," or invisible cognitive profiles. Do not infer sensitive traits or use passive surveillance. Explain in product/Privacy copy that lesson activity informs personalized teaching. Learners do not need to see academic method names during each lesson.

| Internal instructional method | Trigger based on learner evidence | Tutor behavior | Observable outcome |
| --- | --- | --- | --- |
| Teach-back (Feynman technique) | Learner has answered a worked example | Ask for a simple explanation in their own words; find any conceptual gaps | Can explain without repeating tutor wording |
| Socratic questions | Learner gives an unsupported conclusion or is unsure | Ask one targeted why/how question, then offer a hint if needed; never withhold essential support | Can justify the next step |
| Spaced retrieval / Leitner-like scheduling | Concepts have confirmed mastery records and review dates | Revisit a small set of due concepts, rescheduling based on retrieval performance | Recall after delays |
| Scaffolding and fading | Repeated errors on an established prerequisite | Show a worked example or partially completed step, then reduce hints after success | Solves a comparable problem independently |
| Interleaved practice | Learner has practiced two or more related skills separately | Mix problem types so the learner chooses an appropriate strategy | Selects the correct approach in varied context |
| Elaborative interrogation | Learner knows what happened but not why | Ask why the rule is true, or how two ideas connect | Explains the causal relationship accurately |
| Dual coding | An idea can benefit from a real diagram, code sample, or timeline | Pair concise spoken/text explanation with an appropriate Magic Canvas visual | Applies both representations without conflicting information |
| Retrieval pre-check | Start of a lesson with prerequisites | Ask one low-stakes question about prior knowledge before explaining | Identifies prerequisites worth revisiting |

## Selection rules

1. Review current lesson objective and allowed activities. Choose a method *only* if its trigger matches observed evidence; do not randomly use eight methods every time.
2. Prefer clear teaching and corrective feedback over prolonged questioning when the learner is struggling.
3. Choose at most one primary method and, when useful, one complementary method at a time. Avoid repeatedly asking for the same explanation or retesting already-mastered content without a clear review reason.
4. Record only necessary learning progress, such as concept, error category, assessment evidence and next review date, under existing account access rules. Respect the product's retention and deletion controls.
5. Do not award mastery or unlock the next lesson without independent demonstration. Learner may request a different explanation, slower pace, or accessible format.
6. Display normal learner-facing prompts: "Explain it in your own words," "Why does that work?" and "Try this mixed example." Do not announce the internal technique name on every turn, but explain the adaptation approach plainly if asked.
7. If tutor or Magic Canvas streaming is disabled, keep previews honest; no fake personalized session, review schedule, stored mastery, or score.
8. Verify with tests using both correct and incorrect responses across a representative sample of subjects, grades, and disability-access needs before enabling in production.

## Landing page alignment

The existing landing page's **Learning Principles** section is replaced by **Teaching that adjusts as you learn**, explaining the learner experience without making unsupported brain-monitoring claims. Its six cards represent the eight methods above without adding another duplicate "teach, check, reteach" feature block. Live delivery remains explicitly future-facing.
