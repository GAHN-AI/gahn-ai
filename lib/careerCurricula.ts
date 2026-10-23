import { careerCourses } from "./courses";
import { softwareCourses } from "./curricula/software";
import { dataCourses } from "./curricula/data";
import { designCourses } from "./curricula/design";
import { marketingCourses } from "./curricula/marketing";
import { financeCourses } from "./curricula/finance";
import { operationsCourses } from "./curricula/operations";
import { administrationCourses } from "./curricula/administration";
import type { CareerCourseDraft } from "./curricula/types";

export type CurriculumLesson = { id: string; title: string };
export type CurriculumSection = {
  id: string;
  title: string;
  lessons: CurriculumLesson[];
  practice: string;
  outcome: string;
};
export type CareerCurriculumPreview = {
  careerSlug: string;
  entry: string;
  requirements: readonly string[];
  sections: CurriculumSection[];
  outcomes: string[];
  lessonCount: number;
};

const drafts: Record<string, CareerCourseDraft> = {
  ...softwareCourses,
  ...dataCourses,
  ...designCourses,
  ...marketingCourses,
  ...financeCourses,
  ...operationsCourses,
  ...administrationCourses,
};

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const legacyCareerCurricula: Record<string, CareerCurriculumPreview> =
  Object.fromEntries(
    Object.entries(drafts).map(([careerSlug, draft]) => {
      const sections = draft.modules.map(
        ([title, lessons, practice, outcome], index) => ({
          id: `${index + 1}-${slug(title)}`,
          title,
          practice,
          outcome,
          lessons: lessons.map((lesson, lessonIndex) => ({
            id: `${index + 1}-${lessonIndex + 1}-${slug(lesson)}`,
            title: lesson,
          })),
        }),
      );
      return [
        careerSlug,
        {
          careerSlug,
          entry: draft.entry,
          requirements: draft.requirements,
          sections,
          outcomes: sections.map((section) => section.outcome),
          lessonCount: sections.reduce(
            (total, section) => total + section.lessons.length,
            0,
          ),
        },
      ];
    }),
  );

export const careerCurricula: Record<string, CareerCurriculumPreview> =
  Object.fromEntries(
    Object.entries(careerCourses).map(([careerSlug, course]) => [
      careerSlug,
      {
        careerSlug,
        entry: course.description,
        requirements: course.requirements,
        sections: course.sections,
        outcomes: course.sections
          .filter(
            (_, i) =>
              i === 0 || i % Math.ceil(course.sections.length / 6) === 0,
          )
          .map((s) => s.practice),
        lessonCount: course.lessonCount,
      },
    ]),
  );

export function getCareerCurriculum(careerSlug: string) {
  return Object.prototype.hasOwnProperty.call(careerCurricula, careerSlug)
    ? careerCurricula[careerSlug]
    : undefined;
}

export function careerWorkspaceHref(careerSlug: string, lessonId?: string) {
  const query = new URLSearchParams({
    world: "career-skills",
    section: careerSlug,
  });
  if (lessonId) query.set("lesson", lessonId);
  return `/lesson/custom?${query.toString()}`;
}

export function getCareerLesson(careerSlug: string, lessonId: string) {
  const curriculum = getCareerCurriculum(careerSlug);
  const section = curriculum?.sections.find((item) =>
    item.lessons.some((lesson) => lesson.id === lessonId),
  );
  const lesson = section?.lessons.find((item) => item.id === lessonId);
  return section && lesson ? { section, lesson } : null;
}
