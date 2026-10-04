export const AVAILABLE_LEARNING_WORLDS = [
  "career-skills",
  "school-help",
  "brain-development",
  "general-knowledge",
  "book-intelligence",
] as const;

export type AvailableLearningWorld =
  (typeof AVAILABLE_LEARNING_WORLDS)[number];

export function isLearningWorldAvailable(world?: string | null) {
  return AVAILABLE_LEARNING_WORLDS.includes(
    String(world || "") as AvailableLearningWorld
  );
}

export const LEARNING_WORLD_AVAILABILITY: Record<
  string,
  { available: boolean; label: string }
> = {
  "career-skills": { available: true, label: "Available" },
  "school-help": { available: true, label: "Available" },
  "brain-development": { available: true, label: "Available" },
  "general-knowledge": { available: true, label: "Available" },
  "book-intelligence": { available: true, label: "Available" },
};
