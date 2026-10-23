import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUpRight } from "lucide-react";
import { getCareerSection } from "@/lib/careerCatalog";
import { getLearningOption } from "@/lib/learningCatalog";
import { getCourse, courseWorkspaceHref } from "@/lib/courses";
import CourseSequence from "@/components/courses/CourseSequence";
import WorkspacePreviewCard from "@/components/curriculum/WorkspacePreviewCard";

const worldNames: Record<string, string> = {
  "school-help": "School Help",
  "brain-development": "Brain Development",
  "general-knowledge": "General Knowledge",
  "book-intelligence": "Book Intelligence",
};
export default async function TopicOverviewPage({
  params,
}: {
  params: Promise<{ world: string; section: string; topic: string }>;
}) {
  const { world, section, topic } = await params;
  if (world === "career-skills") {
    const career = getCareerSection(section);
    if (!career) notFound();
    redirect(`/learn/career-skills/${career.slug}`);
  }
  const found = getLearningOption(world, section, topic);
  const course = getCourse(world, section, topic);
  if (!found || !course || !worldNames[world]) notFound();
  const href = courseWorkspaceHref(course);
  const back =
    world === "school-help" ? `/learn/${world}/${section}` : `/learn/${world}`;
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F6F8FB] text-[#142B47]"
    >
      <header className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto flex min-h-[72px] max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href={back}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#53657D]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            {worldNames[world]}
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
        </div>
      </header>
      <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 lg:py-12">
        <p className="mb-6 text-xs leading-6 text-[#64748B]">
          {worldNames[world]} <span className="px-2">/</span>
          {found.section.title}
          {world === "school-help" ? ` / ${found.option.title}` : ""}
        </p>
        <section className="overflow-hidden rounded-[22px] border border-[#DCE3EC] bg-white">
          <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <div className="p-6 sm:p-9 lg:p-10">
              <p className="gahn-eyebrow">{worldNames[world]}</p>
              <h1 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-[-0.035em] sm:text-[40px]">
                {course.title}
              </h1>
              <p className="mt-5 text-base leading-7 text-[#4B5E74]">
                {found.section.description}
              </p>
              <p className="mt-4 text-sm leading-7 text-[#64748B]">
                Follow a structured sequence of explanations, worked examples,
                practice and understanding checks. Your tutor will guide each
                step at your pace.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#curriculum"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#16375E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#234B79]"
                >
                  Explore curriculum
                  <ArrowDown aria-hidden="true" className="h-4 w-4" />
                </a>
                <Link
                  href={href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#D6E0EC] px-5 py-3 text-sm font-medium hover:bg-[#F5F8FC]"
                >
                  Preview workspace
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col bg-[#EEF3F8]">
              <div className="relative min-h-64 flex-1">
                <Image
                  unoptimized
                  fill
                  src={found.section.imageUrl}
                  alt=""
                  sizes="(min-width: 1024px) 480px, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-[#DEE6EF] bg-white px-6 py-5 text-xs font-medium text-[#53657D]">
                <span>{course.sections.length} sections</span>
                <span>{course.lessonCount} planned lessons & checks</span>
              </div>
            </div>
          </div>
        </section>
        <div className="mt-9 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_290px]">
          <div className="min-w-0 space-y-9">
            <section className="rounded-2xl border border-[#DCE3EC] bg-white p-6 sm:p-8">
              <p className="gahn-eyebrow">Put the ideas into practice</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                What you&apos;ll work on
              </h2>
              <ul className="mt-6 grid gap-x-7 gap-y-4 sm:grid-cols-2">
                {course.sections
                  .filter(
                    (_, i) => i % Math.ceil(course.sections.length / 6) === 0,
                  )
                  .map((s) => (
                    <li
                      key={s.id}
                      className="flex gap-3 text-sm leading-7 text-[#4B5E74]"
                    >
                      <span aria-hidden="true" className="text-[#47715B]">
                        ✓
                      </span>
                      <span>{s.practice}</span>
                    </li>
                  ))}
              </ul>
            </section>
            <CourseSequence
              sections={course.sections}
              lessonCount={course.lessonCount}
            />
            <section className="rounded-2xl border border-[#DCE3EC] bg-white p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Before you begin</h2>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[#53657D]">
                {course.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {course.note ? (
                <p className="mt-5 border-t border-[#E5EAF1] pt-5 text-xs leading-6 text-[#64748B]">
                  {course.note}
                </p>
              ) : null}
              <p className="mt-5 text-xs leading-6 text-[#64748B]">
                This is a curriculum preview. Live teaching, assessments and
                saved course progress are not available yet.
              </p>
            </section>
          </div>
          <WorkspacePreviewCard href={href} />
        </div>
      </div>
    </main>
  );
}
