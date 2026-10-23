import { getLearningOption } from "./learningCatalog";
import { schoolSkillUnits } from "./schoolSkillUnits";

const topicLessons: Record<string, Record<string, readonly string[]>> = {
  "brain-development": {
    memory: [
      "Distinguish encoding, storage, and retrieval",
      "Recognize familiarity without recall",
      "Turn ten facts into retrieval questions",
      "Schedule spaced review around missed answers",
      "Compare initial and delayed recall",
      "Revise a review plan using an error log",
    ],
    focus: [
      "Identify task switching and distraction cues",
      "Define an observable focus goal",
      "Prepare a low-distraction work session",
      "Record interruptions and task completion",
      "Compare planned and actual focus time",
      "Adjust the environment and break schedule",
    ],
    discipline: [
      "Map a cue, routine, and consequence",
      "Distinguish a small commitment from an unrealistic goal",
      "Write if-then plans for common obstacles",
      "Track completion without inventing progress",
      "Analyze a missed commitment",
      "Revise a routine with a recovery plan",
    ],
    "critical-thinking": [
      "Separate claims, evidence, and assumptions",
      "Distinguish correlation from causation",
      "Compare sources with conflicting claims",
      "Identify a missing piece of evidence",
      "Write a justified conclusion",
      "State what would change your view",
    ],
    "problem-solving": [
      "Separate symptoms from possible causes",
      "Define constraints and success criteria",
      "Compare alternative explanations",
      "Design a small test of one proposed change",
      "Interpret results and unresolved risks",
      "Document a decision and next experiment",
    ],
    "study-habits": [
      "Compare rereading with retrieval practice",
      "Choose worked examples and mixed practice",
      "Build a realistic weekly study calendar",
      "Keep a correction and review log",
      "Test understanding without notes",
      "Adjust the plan around actual errors",
    ],
    "time-management": [
      "Separate priorities from a long task list",
      "Estimate durations and dependencies",
      "Build a calendar with buffers",
      "Negotiate a conflicting deadline",
      "Compare time estimates with actual work",
      "Revise the coming week with explicit trade-offs",
    ],
    "learning-strategies": [
      "Connect new information to prior knowledge",
      "Recognize feedback and transfer of learning",
      "Break a new skill into practice components",
      "Teach back a process without notes",
      "Try the skill in a different situation",
      "Identify the next specific practice need",
    ],
  },
  "general-knowledge": {
    history: [
      "Place events in a defensible chronology",
      "Separate causes, triggers, and consequences",
      "Compare a primary and secondary source",
      "Identify missing perspectives in an account",
      "Build a cited timeline",
      "Defend an interpretation with uncertainty",
    ],
    technology: [
      "Trace a browser request to a server",
      "Distinguish software, devices, and networks",
      "Map an API and database interaction",
      "Troubleshoot a fictional account problem safely",
      "Explain privacy and access-control choices",
      "Write an update and backup checklist",
    ],
    science: [
      "Distinguish a hypothesis from an observation",
      "Identify variables and measurement uncertainty",
      "Design a safe hypothetical investigation",
      "Interpret example measurements and confounders",
      "Compare alternative scientific explanations",
      "Write a methods and limitations summary",
    ],
    economics: [
      "Explain opportunity cost and incentives",
      "Read a simple supply-and-demand graph",
      "Compare stakeholder choices in a fictional market",
      "Interpret a price change without assuming its cause",
      "Write a recommendation with trade-offs",
      "Identify possible unintended consequences",
    ],
    geography: [
      "Use map scales and coordinates",
      "Compare physical and human geography",
      "Read population, transport, and hazard maps",
      "Evaluate a fictional location decision",
      "Create an annotated map with sources",
      "Explain the limits of a regional comparison",
    ],
    culture: [
      "Separate cultural context from stereotypes",
      "Recognize variation within a community",
      "Compare sourced examples without generalizing",
      "Ask respectful questions about an unfamiliar practice",
      "Revise an assumption after new evidence",
      "Write a context-aware communication guide",
    ],
    communication: [
      "Set a message purpose and audience",
      "Listen and restate another person's concern",
      "Draft a concise request and explanation",
      "Role-play a disagreement with neutral language",
      "Summarize decisions and action owners",
      "Revise a message after specific feedback",
    ],
    "life-skills": [
      "Organize responsibilities and due dates",
      "Read a sample bill and identify a fee",
      "Build a fictional monthly budget",
      "Prepare an appointment and document checklist",
      "Role-play asking a provider for clarification",
      "Identify situations requiring qualified assistance",
    ],
  },
  "book-intelligence": {
    "book-summaries": [
      "Separate a main idea from supporting detail",
      "Distinguish an author's view from your opinion",
      "Outline a supplied passage or chapter",
      "Draft a concise summary with source references",
      "Check that the summary preserves meaning",
      "Use recall questions to find missing context",
    ],
    "key-lessons": [
      "Locate the author's actual claim",
      "Connect a principle to its supporting example",
      "Distinguish interpretation from quoted evidence",
      "Plan a small application of a supported idea",
      "Record when the principle may not apply",
      "Review the result of an application attempt",
    ],
    "chapter-breakdown": [
      "Map a chapter's sequence of ideas or events",
      "Identify a chapter's claim and supporting passages",
      "Create a referenced chapter outline",
      "Write questions about cause and inference",
      "Explain the chapter to another reader",
      "Revise an outline after a recall check",
    ],
    vocabulary: [
      "Infer a word's meaning from its sentence",
      "Use roots and affixes as clues",
      "Verify a definition and record the source",
      "Write original example sentences",
      "Create a spaced vocabulary quiz",
      "Correct words used in the wrong context",
    ],
    "study-notes": [
      "Separate claims, evidence, and open questions",
      "Choose outline or Cornell-style notes",
      "Record page references and useful connections",
      "Convert notes into self-test prompts",
      "Test recall before rereading",
      "Revise notes to restore missing context",
    ],
    "book-quizzes": [
      "Distinguish recall, inference, and evaluation",
      "Identify textual evidence for an answer",
      "Write plausible but unambiguous answer choices",
      "Create open-response questions and a rubric",
      "Explain why an answer is unsupported",
      "Revise a quiz using an error-analysis log",
    ],
    "critical-analysis": [
      "Identify argument, theme, and perspective",
      "Locate assumptions and author choices",
      "Support an interpretation with passages",
      "Test a reasonable counterinterpretation",
      "Write a source-backed critique",
      "State the limits of your interpretation",
    ],
    "personalized-reading-path": [
      "Clarify a reading goal and current level",
      "Compare difficulty, availability, and interest",
      "Sequence books with realistic checkpoints",
      "Write reflection and comprehension questions",
      "Review a reading log for actual understanding",
      "Explain why the next book fits the goal",
    ],
  },
};

export function getTopicStudyPlan(
  world: string,
  section: string,
  topic: string,
) {
  const found = getLearningOption(world, section, topic);
  if (!found) return null;
  if (world === "school-help") {
    const unit = schoolSkillUnits[section]?.[found.option.title];
    if (!unit) return null;
    return {
      note: "Grade labels are a planning guide. Exact topics and prerequisites vary by school, course, and syllabus; a future lesson will need the learner's classroom context.",
      sections: [
        {
          title: "Subject focus",
          lessons: [
            `Work with ${unit[0]}`,
            "Explain a worked example and identify each reasoning step",
          ],
        },
        {
          title: "Planned application",
          lessons: [
            `Plan how to ${unit[1]}`,
            "Attempt a related problem or draft independently and show the reasoning",
          ],
        },
        {
          title: "Review and explanation",
          lessons: [
            "Compare an attempt against the stated criteria and correct a specific error",
            "Explain the method and test it on a new example",
          ],
        },
      ],
    };
  }
  const lessons = topicLessons[world]?.[section];
  if (!lessons) return null;
  const headings =
    world === "brain-development"
      ? ["Understand the strategy", "Practice and record", "Review and adjust"]
      : world === "book-intelligence"
        ? [
            "Read and locate evidence",
            "Build the interpretation",
            "Recall and review",
          ]
        : [
            "Ideas and evidence",
            "Applied investigation",
            "Explain a conclusion",
          ];
  return {
    note:
      world === "book-intelligence"
        ? "Future book activities will work from the text and references a learner can lawfully provide. Summaries and interpretations must stay tied to the source."
        : "This outline describes planned study activities. It does not represent active instruction or a guaranteed learning outcome.",
    sections: headings.map((title, index) => ({
      title,
      lessons: lessons.slice(index * 2, index * 2 + 2),
    })),
  };
}
