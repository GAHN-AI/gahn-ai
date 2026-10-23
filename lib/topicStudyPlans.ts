import { getCourse } from "./courses";
export function getTopicStudyPlan(
  world: string,
  section: string,
  topic: string,
) {
  const course = getCourse(world, section, topic);
  if (!course) return null;
  return {
    note: course.note,
    sections: course.sections.map((section) => ({
      title: section.title,
      lessons: section.lessons.map((lesson) => lesson.title),
    })),
  };
}
