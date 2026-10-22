// The video instructor's display identity will be supplied by the selected
// provider once a real, authorized Tavus session is connected.
// No preassigned avatar or instructor name is presented in learning worlds.
export type LearningWorldInstructor = {
  worldSlug: string;
  name?: string;
  role: string;
  provider: "tavus" | "none";
  enabled: boolean;
};

const availableWorlds = new Set([
  "career-skills",
  "school-help",
  "brain-development",
  "general-knowledge",
  "book-intelligence",
]);

export function getLearningWorldInstructor(worldSlug: string): LearningWorldInstructor | null {
  if (!availableWorlds.has(worldSlug)) return null;
  return { worldSlug, role: "AI Instructor", provider: "none", enabled: false };
}
