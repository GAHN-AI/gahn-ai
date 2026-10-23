import { careerSections } from "./careerCatalog";
import {
  learningSectionsByWorld,
  slugifyLearningTitle,
} from "./learningCatalog";
import { softwareCourses } from "./curricula/software";
import { dataCourses } from "./curricula/data";
import { designCourses } from "./curricula/design";
import { marketingCourses } from "./curricula/marketing";
import { financeCourses } from "./curricula/finance";
import { operationsCourses } from "./curricula/operations";
import { administrationCourses } from "./curricula/administration";
import { softwareUnits } from "./course-content/software";
import { businessUnits } from "./course-content/business";
import { learningUnits } from "./course-content/learning";
import { specialistUnits } from "./course-content/specialist";
import { schoolUnits, schoolSequences } from "./course-content/school";
import { careerSequences, topicSequences } from "./course-content/sequences";
import { makeSections, type Course, type Unit } from "./course-content/schema";
export type {
  Course,
  CourseLesson,
  CourseSection,
} from "./course-content/schema";

const units = {
  ...softwareUnits,
  ...businessUnits,
  ...learningUnits,
  ...schoolUnits,
  ...specialistUnits,
};
const drafts = {
  ...softwareCourses,
  ...dataCourses,
  ...designCourses,
  ...marketingCourses,
  ...financeCourses,
  ...operationsCourses,
  ...administrationCourses,
};
function sectionsFor(keys: string[], capstone?: Unit) {
  if (!keys?.length) throw new Error("Course sequence is missing");
  const selected = keys.map((key) => {
    if (!units[key]) throw new Error(`Unknown course unit: ${key}`);
    return units[key];
  });
  return makeSections(capstone ? [...selected, capstone] : selected);
}
function finish(course: Omit<Course, "version" | "lessonCount">): Course {
  return {
    ...course,
    version: 2,
    lessonCount: course.sections.reduce(
      (n, section) => n + section.lessons.length,
      0,
    ),
  };
}
export const careerCourses: Record<string, Course> = Object.fromEntries(
  careerSections.map((career) => {
    const draft = drafts[career.slug];
    const final = draft.modules.at(-1)!;
    const capstone: Unit = {
      key: "capstone",
      title: final[0],
      topics: [...final[1]],
      project: final[2],
    };
    return [
      career.slug,
      finish({
        id: `career-skills/${career.slug}`,
        world: "career-skills",
        slug: career.slug,
        title: career.title,
        description: draft.entry,
        requirements: draft.requirements,
        sections: sectionsFor(careerSequences[career.slug], capstone),
      }),
    ];
  }),
);
export const topicCourses: Record<string, Course> = {};
for (const [world, sections] of Object.entries(learningSectionsByWorld)) {
  for (const section of sections) {
    if (section.slug === "homework-upload") continue;
    for (const option of section.options) {
      const topicSlug = slugifyLearningTitle(option.title);
      const key = `${world}/${section.slug}/${topicSlug}`;
      const sequence =
        world === "school-help"
          ? schoolSequences[`${section.slug}/${topicSlug}`]
          : topicSequences[world]?.[section.slug];
      topicCourses[key] = finish({
        id: key,
        world,
        slug: section.slug,
        topicSlug,
        title:
          world === "school-help"
            ? `${section.title} · ${option.title}`
            : option.title,
        description: option.description,
        requirements:
          world === "book-intelligence"
            ? [
                "Bring a text you can lawfully use, with chapter or page references.",
                "The reading path adapts to the supplied text and your current comprehension.",
              ]
            : world === "school-help"
              ? [
                  "Bring your classroom syllabus and examples of recent work.",
                  "These grade sequences are a starting plan; your school may teach subjects in a different order.",
                ]
              : [
                  "Start with the first section and work through its examples and practice.",
                  "Keep a record of explanations, attempts and corrections for review.",
                ],
        note:
          world === "school-help"
            ? "Grade sequences are a planning guide, not a claim of alignment to every school. Grades 9–12 use a common subject progression; the tutor will need your syllabus before live teaching."
            : world === "book-intelligence"
              ? "Activities use the text you provide. Summaries, interpretations and quiz answers must remain grounded in that text."
              : undefined,
        sections: sectionsFor(sequence),
      });
    }
  }
}
export const allCourses = [
  ...Object.values(careerCourses),
  ...Object.values(topicCourses),
];
export function getCourse(
  world: string,
  section: string,
  topicSlug?: string | null,
): Course | undefined {
  const collection = world === "career-skills" ? careerCourses : topicCourses;
  const key =
    world === "career-skills" ? section : `${world}/${section}/${topicSlug}`;
  return Object.prototype.hasOwnProperty.call(collection, key)
    ? collection[key]
    : undefined;
}
export function courseWorkspaceHref(
  course: Pick<Course, "world" | "slug" | "topicSlug">,
  lessonId?: string,
) {
  const query = new URLSearchParams({
    world: course.world,
    section: course.slug,
  });
  if (course.topicSlug) query.set("topicSlug", course.topicSlug);
  if (lessonId) query.set("lesson", lessonId);
  return `/lesson/custom?${query}`;
}
export function courseOverviewHref(
  course: Pick<Course, "world" | "slug" | "topicSlug">,
) {
  return `/learn/${course.world}/${course.slug}${course.topicSlug ? `/${course.topicSlug}` : ""}`;
}
