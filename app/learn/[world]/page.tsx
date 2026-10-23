import Image from "next/image";

import { BookWorldIcon, BrainWorldIcon, CareerWorldIcon, KnowledgeWorldIcon, SchoolWorldIcon } from "@/components/brand/WorldIcons";


import Link from "next/link";
import { notFound } from "next/navigation";
import type { GahnIcon } from "@/components/brand/WorldIcons";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";

import { careerIndustries } from "@/lib/careerCatalog";
import { getLearningSections } from "@/lib/learningCatalog";
import { isLearningWorldAvailable } from "@/lib/learningWorldAvailability";

type LearningWorld = {
  title: string;
  eyebrow: string;
  description: string;
  Icon: GahnIcon;
};

const learningWorlds: Record<string, LearningWorld> = {
  "career-skills": {
    title: "Career Skills",
    eyebrow: "Career learning world",
    description:
      "Choose a digital career field, from accessible online support roles to advanced software, AI and finance careers. Practice the skills online, while checking employers' separate hiring requirements.",
    Icon: CareerWorldIcon,
  },
  "school-help": {
    title: "School Help",
    eyebrow: "School learning world",
    description:
      "Explore subject and grade-level plans, worked-example topics, and future homework support. Uploads and interactive lessons are paused.",
    Icon: SchoolWorldIcon,
  },
  "brain-development": {
    title: "Brain Development",
    eyebrow: "Brain learning world",
    description:
      "Explore practical plans for recall, concentration, reasoning, study routines, and time management.",
    Icon: BrainWorldIcon,
  },
  "general-knowledge": {
    title: "General Knowledge",
    eyebrow: "Knowledge learning world",
    description:
      "Learn history, technology, science, economics, geography, culture, communication, and practical life knowledge.",
    Icon: KnowledgeWorldIcon,
  },
  "book-intelligence": {
    title: "Book Intelligence",
    eyebrow: "Book learning world",
    description:
      "Explore plans for summarizing, discussing, annotating, and evaluating books using evidence from the text.",
    Icon: BookWorldIcon,
  },
};

function LearningSectionCard({
  href,
  title,
  description,
  imageUrl,
  locked = false,
}: {
  href?: string;
  title: string;
  description: string;
  imageUrl: string;
  locked?: boolean;
}) {
  const body = (
    <>
      <div className="relative h-[180px] overflow-hidden bg-[#EEF2F6]">
        <Image unoptimized width={1200} height={800}
          src={imageUrl}
          alt=""
          className={`h-full w-full object-cover transition duration-300 ${
            locked ? "grayscale-[20%] opacity-75" : "group-hover:scale-[1.025]"
          }`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(8,18,40,0.58)_100%)]" />
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#1D1E24] shadow-sm">
            {locked ? "Unavailable" : "Curriculum preview"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-[#1D1E24]">
          {title}
        </h2>
        <p className="mt-2 min-h-[66px] text-[14px] leading-6 text-[#3C3E45]">
          {description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-[#EEEEF1] pt-4">
          <span className={`text-sm font-semibold ${locked ? "text-[#8A8C94]" : "text-[#0B5CFF]"}`}>
            {locked ? "Not available" : "Open"}
          </span>
          {locked ? (
            <LockKeyhole className="h-4 w-4 text-[#8A8C94]" />
          ) : (
            <ArrowRight className="h-4 w-4 text-[#0B5CFF] transition-transform group-hover:translate-x-1" />
          )}
        </div>
      </div>
    </>
  );

  if (locked || !href) {
    return (
      <div className="overflow-hidden rounded-[14px] border border-[#E1E3E8] bg-white">
        {body}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[14px] border border-[#E1E3E8] bg-white transition hover:-translate-y-0.5 hover:border-[#BDD3F7] hover:shadow-[0_12px_28px_rgba(29,30,36,0.07)]"
    >
      {body}
    </Link>
  );
}

export default async function LearningWorldPage({ params: routeParams }: { params: Promise<{ world: string }> }) {
  const params = await routeParams;
  const world = params.world;
  const learningWorld = learningWorlds[world];


  if (!isLearningWorldAvailable(world) || !learningWorld) notFound();

  const available = isLearningWorldAvailable(world);
  const { title, eyebrow, description, Icon } = learningWorld;
  const worldSections = world === "career-skills" ? [] : getLearningSections(world);

  return (
    <main id="main-content" className="min-h-screen bg-[#F7F8FA] font-sans text-[#1D1E24]">
      <header className="border-b border-[#E7E7EA] bg-white">
        <div className="mx-auto flex min-h-[68px] max-w-[1320px] flex-wrap items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <Link
            href="/#learning-worlds"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1E24]"
          >
            <ArrowLeft className="h-4 w-4" />
            All Learning Worlds
          </Link>

          <div className="flex items-center gap-3">

            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-[#0B1739]">
              <Image unoptimized width={64} height={64} src="/logo/favicon.png" alt="" className="h-7 w-7 rounded-full object-cover" />
              GAHN AI
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1320px] px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
        <section className="grid gap-6 border-b border-[#E7E7EA] pb-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-[760px]">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF2FF] text-[#0B5CFF]">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0B5CFF]">
                {eyebrow}
              </p>
            </div>

            <h1 className="mt-5 text-[36px] font-semibold leading-[1.12] tracking-[-0.04em] text-[#1D1E24] sm:text-[42px]">
              {title}
            </h1>
            <p className="mt-4 max-w-[720px] text-[15px] leading-7 text-[#34363D]">
              {description}
            </p>
          </div>

        </section>

        {available && (
          <div className="mt-7 rounded-xl border border-[#D7E3F2] bg-[#F1F7FF] p-5 text-sm leading-6 text-[#40536D]">
            <p className="font-semibold text-[#0B1739]">Learning World preview</p>
            <p className="mt-1">You can explore subjects and skill roadmaps today. Interactive AI lessons and the video instructor will be available after launch.</p>
          </div>
        )}

        {!available && (
          <div className="mt-7 rounded-xl border border-[#E1E3E8] bg-white p-5 text-sm text-[#4F515A]">
            This learning world is not available yet.
          </div>
        )}

        <section className="pt-8">
          <div className="max-w-[760px]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
              {world === "career-skills"
                ? "Digital career fields"
                : world === "school-help"
                  ? "Subjects and homework"
                  : "Learning paths"}
            </p>
            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.03em] text-[#1D1E24]">
              {world === "career-skills"
                ? "Choose a digital career field"
                : world === "school-help"
                  ? "Choose what you need help with"
                  : `Choose a path inside ${title}`}
            </h2>
          </div>

          {world === "career-skills" && (
            <p className="mt-4 max-w-3xl text-sm leading-6 text-[#53657D]">
              Courses focus on tasks and portfolios that can be practiced digitally. Job eligibility, remote vacancies, compensation and employer training vary.
              The platform does not replace degrees, professional certifications, hiring assessments or real work experience.
            </p>
          )}
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {world === "career-skills"
              ? careerIndustries.map((industry) => (
                  <LearningSectionCard
                    key={industry.slug}
                    href={
                      available
                        ? `/learn/career-skills/industry/${industry.slug}`
                        : undefined
                    }
                    title={industry.displayTitle}
                    description={industry.description}
                    imageUrl={industry.imageUrl}
                    locked={!available}
                  />
                ))
              : worldSections.map((section) => (
                  <LearningSectionCard
                    key={section.slug}
                    href={
                      available
                        ? `/learn/${world}/${section.slug}`
                        : undefined
                    }
                    title={section.title}
                    description={section.description}
                    imageUrl={section.imageUrl}
                    locked={!available}
                  />
                ))}
          </div>
        </section>
      </div>
    </main>
  );
}
