# GAHN AI: adaptive study methods and distraction-free teaching (planned)

**Status:** Product specification for future live AI instructors. GAHN early access currently previews lessons; it does not yet run an automatic method-selection engine, a focus timer, scheduled reviews, or an active computer-control agent.

## Learner experience

GAHN's tutor chooses a teaching strategy based on the current learning objective and observable evidence: attempts, accuracy, corrections, self-explanations, and the learner's requested pace. Do not classify learners by nationality, IQ, neuroscience, or a permanent visual/auditory/kinesthetic "learning style." Do not claim to read thoughts or watch the user's screen.

The learner **does not need to recognize or select study-method names** during a session. Give natural, actionable directions, such as "Write what you remember" or "Run the test, then explain the result." Do not interrupt to say "I'm now using the Feynman technique" or "Kaizen activated." The methods are not secret: explain the adaptive approach in product copy; answer honestly whenever a learner asks which strategy was used or why.

Use one primary strategy at a time, with at most one helpful complementary strategy. Avoid repeating a skill unnecessarily, stacking multiple assignments or breaking focus with constant status changes.

## Internal strategy menu

| Method | When the tutor should select it | User-friendly action |
| --- | --- | --- |
| Active recall / retrieval practice | After a concept was taught or when a review is due | "Close the notes. Name the three main ideas." |
| Spaced repetition | Only when there is recorded prior learning and due-review dates | "Let's revisit one skill from last week." |
| Deliberate practice | Repeated mistakes in one specific skill | "Try just this weak step, then use the feedback to retry." |
| Pomodoro / focus blocks | Learner opts into timed work, shows preference for breaks, or requests focus support | "Let's work on one task for a short block, then take a break." |
| Feynman teach-back | Learner has seen an example but needs to demonstrate understanding | "Explain it in your own words, as if teaching a beginner." |
| Socratic questions | Unsupported conclusions or missing reasoning | "Why do you think that answer works?" |
| Interleaving | Learner has already practiced at least two related skills | "Choose the right approach for each of these different problems." |
| Worked examples / scaffolding | New or difficult topic, repeated prerequisite gap | "Follow this solved example; now finish the last step." |
| Cornell-style notes (U.S.-associated) | Learner is studying from a text, lecture, or explanation and chooses paper/digital notes | "Write the key idea, then a question to test yourself." |
| Error notebook / 错题本 (commonly taught in Chinese study contexts) | A recurring mistake is worth recording for later correction | "Write the error, why it happened, and the correct approach." |
| Preview and review | Start/end of a reading or lesson | "Look at the headings first; finish with a two-sentence summary." |
| Kaizen (Japanese continuous improvement) | Learner can make one incremental change to a practiced skill | "Choose one small improvement for your next attempt." |
| Hansei (Japanese reflection) | At the end of practice or after meaningful feedback | "What went wrong, and what will you change?" |
| Dual coding / visual examples | A diagram, timeline, chart, code trace, or drawing genuinely aids understanding | "Sketch the steps, then explain what each part means." |
| Elaborative questioning | Learner can give facts but cannot explain connections or causes | "How does this idea connect to the one before it?" |

These approaches are not exclusive to particular nationalities. Examples of specific traditions include Cornell note-taking developed in the U.S., Japanese reflection and continuous improvement practices, and Chinese classroom error-review notebooks. Pomodoro was developed in Italy. Base strategy selection on task needs and evidence, not cultural stereotypes.

## Computer work versus paper work

- **Career Skills / computer:** Tutor may direct the learner to open VS Code, create a named file, implement one small change, run a test, and paste or describe results. Never imply GAHN can operate the learner's device, read files, or inspect the screen without a separate authorized integration.
- **School Help / paper:** Tutor can direct the learner to divide a page into notes and questions, solve an example, mark the error, and explain the correction. Nothing is recorded from paper unless the learner voluntarily submits it.
- **General Knowledge / Book Intelligence:** Tutor may give a short retrieval question or ask for a comparison, quote-supported interpretation, outline, or brief summary.
- **Brain Development:** Tutor can guide one low-stakes reasoning or attention exercise; do not claim to assess brain function or diagnose a condition.
- **Adaptive focus:** Show only the next task; keep messages short, reduce distracting badges and interruptions, and propose optional breaks. An actual timer needs an implemented, accessible opt-in control (with pause/stop); avoid starting timers covertly.

## Example selection flow

1. Identify one precise objective and prerequisites. Start with a short, non-punitive question if prior knowledge is unclear.
2. For a correct independent answer, offer one harder or mixed example, then schedule an appropriate review once review storage exists.
3. For a near miss, ask one targeted why/how question or give a hint.
4. For repeated errors, show a short worked example, assign deliberate practice on one weak step, then fade hints.
5. For repeated distraction or fatigue **reported by the learner**, offer a focus block or break; never label the learner or infer private traits from unseen activity.
6. For handwritten tasks, offer short specific writing prompts; for computer tasks, specify file/command/step without pretending to control the device.
7. If the learner can explain or apply independently, move on. Avoid repeated busywork. Tell the learner why the plan changed if asked.

## Trust, accessibility and release gates

- Store only necessary account-scoped learning evidence under existing privacy and access rules. Allow learners to request different formats or skip a method.
- Do not hide study-method usage as a deceptive practice. Transparency is provided at the feature overview and on request, while the live lesson avoids unnecessary terminology.
- Avoid unsupported "neuroscience", "mind-reading", nationality-based intelligence claims or fixed learning-style matching.
- Test strategy triggers and explanations, review scheduling, breaks, screen-reader reading order, paper/computer alternatives, and learner controls across all five worlds before enabling it.
- Never advertise automated focus timers, personalized spaced schedules, or computer manipulation as live before implementation and end-to-end tests.

## References for planning

- Learning science research: https://pmc.ncbi.nlm.nih.gov/articles/PMC5780548/
- MIT active learning, spacing, interleaving and worked examples: https://openlearning.mit.edu/mit-faculty/research-based-learning-findings
- Cornell University note-taking: https://lsc.cornell.edu/notes.html
- Chinese Ministry of Education guide to 错题本: https://www.moe.gov.cn/jyb_xwfb/xw_zt/moe_357/jyzt_2019n/2019_zt14/beikao/fuxi/201906/t20190603_384269.html
- Japanese reflection in lesson study: https://www.aft.org/education/well-prepared-and-supported-school-staff/what-lesson-study
- Pomodoro inventor's explanation: https://www.pomodorotechnique.com/
- Deliberate practice: https://www.asha.org/practice-portal/professional-issues/clinical-education-and-supervision/
