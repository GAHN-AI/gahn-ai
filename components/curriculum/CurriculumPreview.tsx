import CourseSequence from "@/components/courses/CourseSequence";
import { careerCourses } from "@/lib/courses";
import type { CareerCurriculumPreview } from "@/lib/careerCurricula";
export default function CurriculumPreview({
  curriculum,
}: {
  curriculum: CareerCurriculumPreview;
}) {
  const course = careerCourses[curriculum.careerSlug];
  return (
    <CourseSequence
      sections={course.sections}
      lessonCount={course.lessonCount}
    />
  );
}
