export type LessonKind = "lesson" | "practice" | "project" | "checkpoint";
export type CourseLesson = {
  id: string;
  title: string;
  kind: LessonKind;
  objective: string;
};
export type CourseSection = {
  id: string;
  title: string;
  lessons: CourseLesson[];
  practice: string;
  outcome: string;
};
export type Course = {
  id: string;
  version: number;
  world: string;
  slug: string;
  topicSlug?: string;
  title: string;
  description: string;
  requirements: readonly string[];
  sections: CourseSection[];
  lessonCount: number;
  note?: string;
};
export type Unit = {
  key: string;
  title: string;
  topics: string[];
  project: string;
};
export function readUnits(source: string): Record<string, Unit> {
  return Object.fromEntries(
    source
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [key, title, topics, project] = line.split("|");
        if (!key || !title || !topics || !project)
          throw new Error(`Incomplete curriculum unit: ${key}`);
        return [
          key,
          {
            key,
            title,
            topics: topics.split(";").map((v) => v.trim()),
            project,
          },
        ];
      }),
  );
}
export function makeSections(units: Unit[]): CourseSection[] {
  return units.map((unit) => ({
    id: unit.key,
    title: unit.title,
    practice: unit.project,
    outcome: `${unit.project}. Explain your choices, check the result, and correct any mistakes identified in the understanding check.`,
    lessons: [
      ...unit.topics.map((title, index) => ({
        id: `${unit.key}.topic-${index + 1}`,
        title,
        kind: "lesson" as const,
        objective: title,
      })),
      {
        id: `${unit.key}.practice`,
        title: unit.project,
        kind: "practice" as const,
        objective: unit.project,
      },
      {
        id: `${unit.key}.check`,
        title: `Understanding check: ${unit.title}`,
        kind: "checkpoint" as const,
        objective: `Apply the skills in ${unit.title.toLowerCase()} to an unfamiliar example and explain the reasoning without step-by-step help.`,
      },
    ],
  }));
}
