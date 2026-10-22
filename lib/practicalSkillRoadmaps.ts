import { careerSkillSteps } from "@/lib/careerSkillSteps";
import { otherWorldSkillSteps } from "@/lib/otherWorldSkillSteps";
import { schoolSkillUnits } from "@/lib/schoolSkillUnits";

export type SkillStep = { phase: string; detail: string };
export type SkillRoadmap = { steps: SkillStep[]; safetyNote?: string };

const phases = [
  "01 · Understand the work",
  "02 · Practice what you learn",
  "03 · Work with other people",
  "04 · Apply and demonstrate",
] as const;

const regulatedCareers: Record<string, string> = {
  "medical-assistant": "Academic simulation only: patient care requires relevant training, supervision and applicable credentials.",
  "registered-nurse": "Academic simulation only: nursing requires formal education, supervised clinical training and licensure.",
  physician: "Academic simulation only: practicing medicine requires approved education, training and licensure.",
  paralegal: "Paralegal exercises do not authorize independent legal advice.",
  lawyer: "Legal education does not authorize practice without admission to the applicable bar.",
  "financial-advisor-wealth-management": "Personalized financial advice may require licenses, registration and professional supervision.",
  electrician: "Electrical work, especially energized installations, requires applicable licensing and qualified supervision.",
  plumber: "Real plumbing work must follow local codes and applicable licensing/supervision rules.",
  "hvac-technician": "Refrigerant handling and certain HVAC activities require certification and qualified supervision.",
};

function buildRoadmap(details: readonly [string, string, string, string], safetyNote?: string): SkillRoadmap {
  return {
    steps: details.map((detail, index) => ({ phase: phases[index], detail })),
    ...(safetyNote ? { safetyNote } : {}),
  };
}

function gradeFromSlug(slug: string): string | null {
  if (slug === "college") return "College";
  const match = /^grade-(6|7|8|9|10|11|12)$/.exec(slug);
  return match ? `Grade ${match[1]}` : null;
}

/** Shared roadmap for topic overviews, career pages and real lesson prompts. */
export function getPracticalSkillRoadmap(
  worldSlug: string,
  sectionSlug: string | null | undefined,
  topicSlug: string | null | undefined
): SkillRoadmap | null {
  const section = sectionSlug || "";
  const topic = topicSlug || "";
  if (worldSlug === "career-skills") {
    const key = careerSkillSteps[topic] ? topic : section;
    const details = careerSkillSteps[key];
    return details ? buildRoadmap(details, regulatedCareers[key]) : null;
  }

  if (worldSlug === "school-help") {
    if (section === "homework-upload") {
      return buildRoadmap([
        "Read the assignment instructions carefully; separate the actual question, facts, unknown terms and missing information.",
        "Break the task into answerable steps, try the next step independently and explain corrections instead of copying a solution.",
        "Ask a teacher or classmate a precise question and explain the reasoning behind your attempt.",
        "Present a worked example, revised reasoning and a self-check showing what you can now do without help.",
      ]);
    }
    const grade = gradeFromSlug(topic);
    const unit = grade && schoolSkillUnits[section]?.[grade];
    if (!unit) return null;
    const [focus, appliedTask] = unit;
    return buildRoadmap([
      `Understand ${focus} using clear definitions, examples and reasoning appropriate to this level.`,
      `Work through guided and independent questions about ${focus}, showing steps and correcting specific mistakes.`,
      "Explain the method to a teacher or classmate, compare approaches and revise an answer after constructive feedback.",
      `Complete a realistic application: ${appliedTask}. Show the reasoning, source evidence or calculations and verify the result.`,
    ]);
  }

  const details = otherWorldSkillSteps[worldSlug]?.[section];
  return details ? buildRoadmap(details) : null;
}

export function practicalLessonPoints(roadmap: SkillRoadmap | null): string[] {
  return roadmap?.steps.map(({ phase, detail }) => `${phase}: ${detail}`) || [];
}
