import Image from "next/image";
import { BookWorldIcon, BrainWorldIcon, CareerWorldIcon, KnowledgeWorldIcon, SchoolWorldIcon } from "@/components/brand/WorldIcons";


import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";

import { getCareerSection } from "@/lib/careerCatalog";
import {
  getLearningOption,
} from "@/lib/learningCatalog";
import { isLearningWorldAvailable } from "@/lib/learningWorldAvailability";
import { getPracticalSkillRoadmap } from "@/lib/practicalSkillRoadmaps";
import { getTopicStudyPlan } from "@/lib/topicStudyPlans";

const worldMeta = {
  "career-skills": { title: "Career Skills", Icon: CareerWorldIcon },
  "school-help": { title: "School Help", Icon: SchoolWorldIcon },
  "brain-development": { title: "Brain Development", Icon: BrainWorldIcon },
  "general-knowledge": { title: "General Knowledge", Icon: KnowledgeWorldIcon },
  "book-intelligence": { title: "Book Intelligence", Icon: BookWorldIcon },
} as const;

export default async function TopicOverviewPage({ params: routeParams }: { params: Promise<{ world: string; section: string; topic: string }> }) {
  const params = await routeParams;


  const resolved = (() => {
    if (params.world === "career-skills") {
      const section = getCareerSection(params.section);
      if (!section) return null;
      redirect(`/learn/career-skills/${section.slug}`);

    }

    const found = getLearningOption(params.world, params.section, params.topic);
    if (!found) return null;

    return {
      sectionTitle: found.section.title,
      title: found.option.title,
      description: found.option.description,
      option: found.option,
    };
  })();

  const available = isLearningWorldAvailable(params.world);
  const skillRoadmap = getPracticalSkillRoadmap(params.world, params.section, params.topic);
  const studyPlan = getTopicStudyPlan(params.world, params.section, params.topic);
  const meta = worldMeta[params.world as keyof typeof worldMeta];

  if (!available || !resolved || !meta) notFound();

  const Icon = meta.Icon;
  const isSchool = params.world === "school-help";
  const isCareer = params.world === "career-skills";

  const backHref = isCareer
    ? `/learn/career-skills/${params.section}`
    : isSchool
      ? `/learn/school-help/${params.section}`
      : `/learn/${params.world}`;

  const startHref = `/lesson/custom?world=${encodeURIComponent(
    params.world
  )}&section=${encodeURIComponent(params.section)}&topic=${encodeURIComponent(
    resolved.title
  )}&topicSlug=${encodeURIComponent(params.topic)}`;

  return (
    <main id="main-content" className="min-h-screen bg-[#F7F8FA] font-sans text-[#1D1E24]">
      <header className="border-b border-[#E7E7EA] bg-white">
        <div className="mx-auto flex min-h-[68px] max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1E24]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="flex items-center gap-3">

            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-[#0B1739]">
              <Image unoptimized width={64} height={64} src="/logo/favicon.png" alt="" className="h-7 w-7 rounded-full object-cover" />
              GAHN AI
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-5 py-9 sm:px-8 lg:py-12">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="rounded-[16px] border border-[#E1E3E8] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF2FF] text-[#0B5CFF]">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
                {meta.title} · {resolved.sectionTitle}
              </p>
            </div>

            <h1 className="mt-5 text-[34px] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[40px]">
              {resolved.title}
            </h1>
            <p className="mt-4 max-w-[720px] text-[15px] leading-7 text-[#34363D]">
              {resolved.description}
            </p>

            {skillRoadmap && (
              <section aria-labelledby="topic-skills-heading" className="mt-8 border-t border-[#EEEEF1] pt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
                  Detailed learning roadmap
                </p>
                <h2 id="topic-skills-heading" className="mt-2 text-[25px] font-semibold tracking-[-0.03em]">
                  Skills you&apos;ll learn
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#53657D]">
                  These are the skills GAHN plans to teach through guided exercises and realistic practice once interactive lessons launch.
                </p>
                <ol className="mt-5 space-y-3">
                  {skillRoadmap.steps.map((step, index) => (
                    <li key={step.phase} className="flex gap-3 rounded-xl border border-[#E1E3E8] bg-[#F8FAFD] p-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#EAF2FF] text-sm font-bold text-[#0B5CFF]">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-[#0B1739]">{step.phase.slice(5)}</h3>
                        <p className="mt-1 text-sm leading-6 text-[#3C3E45]">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                {skillRoadmap.safetyNote && (
                  <p className="mt-4 text-sm leading-6 text-[#53657D]">{skillRoadmap.safetyNote}</p>
                )}
              </section>
            )}

            {studyPlan && <section aria-labelledby="study-outline-heading" className="mt-8 border-t border-[#EEEEF1] pt-7">
              <p className="gahn-eyebrow">Curriculum preview</p>
              <h2 id="study-outline-heading" className="mt-2 text-2xl font-semibold tracking-tight">Planned study outline</h2>
              <p className="mt-3 text-sm leading-6 text-[#64748B]">{studyPlan.note}</p>
              <div className="mt-5 overflow-hidden rounded-xl border border-[#DCE3EC]">{studyPlan.sections.map((section, index) => <details key={section.title} open={index === 0} className="group border-b border-[#E7ECF2] last:border-b-0"><summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 bg-[#F7F9FC] px-4 py-4 text-sm font-semibold"><span>{index + 1}. {section.title}</span><span className="text-[#64748B]" aria-hidden="true">+</span></summary><ol className="list-decimal space-y-3 py-5 pl-10 pr-5 text-sm leading-6 text-[#53657D]">{section.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ol></details>)}</div>
            </section>}

            <div className="mt-8 border-t border-[#EEEEF1] pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
                Planned lesson experience
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  "The instructor will explain concepts with worked examples.",
                  "Learners will answer questions and receive feedback.",
                  "Lessons will revisit mistakes and build skills through practice.",
                ].map((label) => (
                  <div
                    key={label}
                    className="flex gap-3 rounded-[12px] border border-[#E1E3E8] bg-[#FAFAFB] p-4"
                  >
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0B5CFF]" />
                    <p className="text-[13px] leading-5 text-[#303239]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-[16px] border border-[#E1E3E8] bg-white p-6 lg:sticky lg:top-6">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF2FF] text-[#0B5CFF]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
              Learning workspace preview
            </p>
            <h2 className="mt-2 text-xl font-semibold">
              Interactive lessons coming later
            </h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="rounded-xl bg-[#F7F8FA] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6C6D75]">
                  Workspace
                </p>
                <p className="mt-1 font-semibold text-[#1D1E24]">
                  AI instructor and learning canvas
                </p>
              </div>
            </div>

            <Link
              href={startHref}
              className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0B5CFF] px-5 text-sm font-semibold text-white transition hover:bg-[#094FD9]"
            >
              Preview workspace
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}
