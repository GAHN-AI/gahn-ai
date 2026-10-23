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
  "medical-billing-coding-specialist": "Nonclinical preparation only. Medical coding employers may require credentials, supervised experience, and training on regulated systems.",
  "health-information-specialist": "Healthcare records roles may require formal education, certification, HIPAA training and employer-controlled system access.",
  "patient-scheduling-coordinator": "Administrative training only. Employers determine scheduling-system access, onboarding and privacy requirements.",
  "legal-operations-coordinator": "Legal operations support is not permission to practice law or give legal advice.",
  "contract-administrator": "Contracts may require review by qualified legal professionals; online training does not authorize legal advice.",
  "accountant": "Employer education requirements vary; certified public accountant credentials require separate jurisdiction-specific qualifications.",
  "insurance-underwriter": "Employers typically require training and apply their own underwriting standards. GAHN does not issue insurance credentials.",
  "financial-analyst": "Many analyst jobs expect postsecondary education and applied experience. GAHN cannot guarantee employment or investment results.",
  "investment-analyst": "Investment analysis education does not authorize regulated client advice, trading, or professional registration.",
  "cyber-security-analyst": "Cybersecurity exercises must use authorized systems and safe defensive practice; employer experience requirements vary.",
  "cloud-architect": "Cloud architect is generally an experienced role; GAHN teaches skills but cannot replace production experience.",
  "devops-engineer": "DevOps roles often require significant experience managing live software systems.",
  "project-manager": "Project managers are responsible for real budgets and people; practice projects do not replace professional experience.",
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
    return Array.isArray(details) && details.length === 4 ? buildRoadmap(details as readonly [string, string, string, string], regulatedCareers[key]) : null;
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
  return Array.isArray(details) && details.length === 4 ? buildRoadmap(details as readonly [string, string, string, string]) : null;
}

export function practicalLessonPoints(roadmap: SkillRoadmap | null): string[] {
  return roadmap?.steps.map(({ phase, detail }) => `${phase}: ${detail}`) || [];
}
