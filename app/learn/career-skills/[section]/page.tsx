"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
} from "lucide-react";

import { getCareerSection } from "@/lib/careerCatalog";
import { getPracticalSkillRoadmap } from "@/lib/practicalSkillRoadmaps";

export default function CareerSectionPage() {
  const params = useParams<{ section: string }>();
  const careerSection = getCareerSection(params.section);
  const skillRoadmap = getPracticalSkillRoadmap("career-skills", params.section, params.section);


  if (!careerSection) {
    return (
      <main className="min-h-screen bg-[#F7F8FA] px-5 py-10 font-sans text-[#1D1E24] sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/learn/career-skills"
            className="inline-flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Career Skills
          </Link>
          <div className="mt-8 rounded-[14px] border border-[#E1E3E8] bg-white p-10 text-center">
            <h1 className="text-3xl font-semibold">Career path not found</h1>
          </div>
        </div>
      </main>
    );
  }

  const lessonHref = `/lesson/custom?world=career-skills&section=${encodeURIComponent(
    careerSection.slug
  )}&topic=${encodeURIComponent(careerSection.title)}&topicSlug=${encodeURIComponent(
    careerSection.slug
  )}`;

  return (
    <main className="min-h-screen bg-[#F7F8FA] font-sans text-[#1D1E24]">
      <header className="border-b border-[#E7E7EA] bg-white">
        <div className="mx-auto flex min-h-[68px] max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href={`/learn/career-skills`}
            className="inline-flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Career Skills
          </Link>

          <div className="flex items-center gap-3">

            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-[#0B1739]">
              <img src="/logo/favicon.png" alt="" className="h-7 w-7 rounded-full object-cover" />
              GAHN AI
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-5 py-9 sm:px-8 lg:py-12">
        <section className="grid gap-7 overflow-hidden rounded-[16px] border border-[#E1E3E8] bg-white p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF2FF] text-[#0B5CFF]">
                <BriefcaseBusiness className="h-5 w-5" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
                {careerSection.category}
              </p>
            </div>

            <h1 className="mt-5 text-[34px] font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[40px]">
              {careerSection.title}
            </h1>
            <p className="mt-4 max-w-[690px] text-[15px] leading-7 text-[#34363D]">
              {careerSection.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#EAF2FF] px-3 py-1.5 text-xs font-semibold text-[#0B5CFF]">{careerSection.level}</span>
              <span className="rounded-full bg-[#F0F4F8] px-3 py-1.5 text-xs font-semibold text-[#40536D]">{careerSection.payCategory}</span>
            </div>
            <p className="mt-4 max-w-[690px] text-[13px] leading-6 text-[#53657D]">
              {careerSection.onlineScope}
            </p>

            <Link
              href={lessonHref}
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0B5CFF] px-5 text-sm font-semibold text-white transition hover:bg-[#094FD9]"
            >
              Start private lesson
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <img
            src={careerSection.imageUrl}
            alt=""
            className="h-[250px] w-full rounded-[12px] object-cover"
          />
        </section>

        <section aria-labelledby="career-skills-heading" className="mt-8 rounded-[16px] border border-[#E1E3E8] bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">Applied learning roadmap</p>
          <h2 id="career-skills-heading" className="mt-2 text-[27px] font-semibold tracking-[-0.03em]">
            Skills you&apos;ll learn
          </h2>
          <p className="mt-3 max-w-[780px] text-[14px] leading-6 text-[#3C3E45]">
            Each stage includes specific knowledge, digital practice, collaboration and a project or simulation you can demonstrate.
          </p>
          <p className="mt-2 max-w-[780px] text-xs leading-5 text-[#64748B]">
            Earnings categories are broad planning guidance, not salary quotes. Remote jobs and employment are not guaranteed.
            Check current local wages, education requirements and job openings before choosing a career.
            {" "}<a href="https://www.bls.gov/ooh/" target="_blank" rel="noreferrer" className="font-semibold text-[#0B5CFF] underline">Compare official U.S. career data</a>.
          </p>
          {skillRoadmap && (
            <ol className="mt-6 grid gap-4">
              {skillRoadmap.steps.map((step, index) => (
                <li key={step.phase} className="flex gap-4 rounded-[14px] border border-[#E1E3E8] bg-[#FAFAFB] p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EAF2FF] text-sm font-bold text-[#0B5CFF]">{index + 1}</span>
                  <div>
                    <h3 className="text-sm font-bold text-[#0B1739]">{step.phase.slice(5)}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-[#3C3E45]">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
          {skillRoadmap?.safetyNote && (
            <p className="mt-5 rounded-xl border border-[#DBE5F2] bg-[#F8FBFF] px-4 py-3 text-sm leading-6 text-[#4F647D]">
              {skillRoadmap.safetyNote}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
