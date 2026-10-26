import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TutorWorkspace from "@/components/courses/TutorWorkspace";
import { getCourse, courseOverviewHref } from "@/lib/courses";
import { legacyCareerCurricula } from "@/lib/careerCurricula";
import {
  getLearningSections,
  slugifyLearningTitle,
} from "@/lib/learningCatalog";

export default async function LessonPage({
  params,
  searchParams,
}: {
  params: Promise<{ lessonId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [route, query] = await Promise.all([params, searchParams]);
  const value = (key: string) =>
    typeof query[key] === "string" ? (query[key] as string) : undefined;
  const world = value("world") || "career-skills";
  const section = value("section") || "";
  // Old topic links used a display title. Resolve only a known catalog option.
  const options = getLearningSections(world).find(
    (item) => item.slug === section,
  )?.options;
  const topicSlug =
    value("topicSlug") ||
    (options?.length === 1
      ? slugifyLearningTitle(options[0].title)
      : value("topic")
        ? slugifyLearningTitle(value("topic")!)
        : undefined);
  const course = getCourse(world, section, topicSlug);
  if (!course) {
    if (world !== "career-skills") notFound();
    return (
      <main
        id="main-content"
        className="min-h-screen bg-[#F6F8FB] px-5 py-12 text-[#142B47]"
      >
        <div className="mx-auto max-w-2xl rounded-xl border border-[#D9E2ED] bg-white p-8">
          <h1 className="text-2xl font-semibold">
            This career lesson is no longer offered
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#60748C]">
            Choose a current digital career to explore its full course sequence.
          </p>
          <Link
            href="/learn/career-skills"
            className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-[#16375E] px-5 text-sm font-semibold text-white"
          >
            Browse current digital careers
          </Link>
        </div>
      </main>
    );
  }
  const requested =
    value("lesson") ||
    (route.lessonId !== "custom" ? route.lessonId : undefined);
  const lessons = course.sections.flatMap((s) => s.lessons);
  const legacy =
    world === "career-skills" && requested
      ? legacyCareerCurricula[section]?.sections.some((s) =>
          s.lessons.some((l) => l.id === requested),
        )
      : false;
  if (
    requested &&
    !legacy &&
    !lessons.some((lesson) => lesson.id === requested)
  )
    notFound();
  // Preview is always the first lesson. A query string cannot unlock a lesson or set progress.
  const locked = !!requested && !legacy && requested !== lessons[0].id;
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F4F7FB] px-4 py-6 text-[#142B47] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link
            href={`${courseOverviewHref(course)}#curriculum`}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#536B86]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to course
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Image
              src="/logo/favicon.png"
              alt=""
              width={28}
              height={28}
              className="rounded-full"
            />
            GAHN AI
          </Link>
        </header>
        <TutorWorkspace
          course={course}
          requestedLocked={locked}
          legacyLink={!!legacy}
        />
      </div>
    </main>
  );
}
