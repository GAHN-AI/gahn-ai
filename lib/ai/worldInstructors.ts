export type LearningWorldInstructor = {
  worldSlug: string;
  name: string;
  role: string;
  provider: "heygen" | "tavus" | "none";
  enabled: boolean;
};

const instructors: Record<string, LearningWorldInstructor> = {
  "career-skills": {
    worldSlug: "career-skills",
    name: "Maya",
    role: "Career Skills AI Instructor",
    provider: "heygen",
    enabled: true,
  },
  "school-help": {
    worldSlug: "school-help",
    name: "School Help Instructor",
    role: "School Help AI Instructor",
    provider: "none",
    enabled: false,
  },
  "brain-development": {
    worldSlug: "brain-development",
    name: "Brain Development Instructor",
    role: "Brain Development AI Instructor",
    provider: "none",
    enabled: false,
  },
  "general-knowledge": {
    worldSlug: "general-knowledge",
    name: "General Knowledge Instructor",
    role: "General Knowledge AI Instructor",
    provider: "none",
    enabled: false,
  },
  "book-intelligence": {
    worldSlug: "book-intelligence",
    name: "Book Intelligence Instructor",
    role: "Book Intelligence AI Instructor",
    provider: "none",
    enabled: false,
  },
};

export function getLearningWorldInstructor(worldSlug: string) {
  return instructors[worldSlug] ?? null;
}
