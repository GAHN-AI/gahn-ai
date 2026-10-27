import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getCareerSection } from "@/lib/careerCatalog";
import { getLearningOption } from "@/lib/learningCatalog";
import { getCourse, courseWorkspaceHref } from "@/lib/courses";
import { courseOverviewHighlights } from "@/lib/courseOverviewHighlights";

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
              <div className="mt-7">
                <Link
                  href={href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#1677FF] px-6 py-3 text-sm font-semibold text-white hover:bg-[#075FCF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF]"
                >
                  Start private session
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <p className="mt-3 text-xs text-[#64748B]">
                  Session preview only — live AI teaching is not available yet.
                </p>
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

            </div>
          </div>
        </section>
        <section
          aria-labelledby="outcomes-heading"
          className="mt-9 max-w-[1120px] rounded-2xl border border-[#DCE3EC] bg-white p-6 sm:p-8"
        >
          <p className="gahn-eyebrow">Practical abilities, clearly defined</p>
          <h2 id="outcomes-heading" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            What you&apos;ll learn
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#64748B]">
            Learn the core ideas, apply them to realistic tasks, and explain your reasoning. Private AI teaching and understanding checks will be available when live lessons launch.
          </p>
          <ol className="mt-7 grid gap-x-7 gap-y-5 sm:grid-cols-2">
            {courseOverviewHighlights(course).map((outcome, index) => (
              <li key={outcome} className="flex gap-3 text-sm leading-6 text-[#3E536B]">
                <span className="mt-0.5 w-5 shrink-0 text-xs font-medium tabular-nums text-[#8B9AB0]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{outcome}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
