import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  careerIndustries,
  getCareerIndustry,
  getCareersByIndustry,
} from "@/lib/careerCatalog";
import { getCareerCurriculum } from "@/lib/careerCurricula";
import { CareerWorldIcon } from "@/components/brand/WorldIcons";

type Props = { params: Promise<{ industry: string }> };
export function generateStaticParams() {
  return careerIndustries.map(({ slug }) => ({ industry: slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = getCareerIndustry((await params).industry);
  return {
    title: `${industry?.displayTitle || "Career field"} | GAHN AI`,
    description: industry?.description,
  };
}

export default async function CareerIndustryPage({ params }: Props) {
  const industry = getCareerIndustry((await params).industry);
  if (!industry) notFound();
  const careers = getCareersByIndustry(industry.title);
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F6F8FB] text-[#142B47]"
    >
      <header className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto flex min-h-[72px] max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href="/learn/career-skills"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#53657D]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Career Skills
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold"
          >
            <Image
              src="/logo/favicon.png"
              width={28}
              height={28}
              alt=""
              className="rounded-full"
            />
            GAHN AI
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 lg:py-14">
        <section className="max-w-3xl">
          <CareerWorldIcon className="h-11 w-11" />
          <p className="gahn-eyebrow mt-5">
            Career Skills / Curriculum previews
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
            {industry.displayTitle}
          </h1>
          <p className="mt-5 text-base leading-8 text-[#53657D]">
            {industry.description}
          </p>
          <p className="mt-4 text-sm text-[#64748B]">
            {careers.length} pathways · Specific lessons and projects ·
            Self-paced plans
          </p>
        </section>
        <div className="mt-9 rounded-xl border border-[#DCE3EC] bg-white px-5 py-4 text-sm leading-6 text-[#53657D]">
          Browse each role&apos;s planned lessons, practical tasks, and entry
          expectations. Interactive teaching is still in development. Job
          eligibility, pay, and remote openings depend on the employer and
          location.
        </div>
        <section
          aria-label={`${industry.displayTitle} career pathways`}
          className="mt-8 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {careers.map((career) => {
            const curriculum = getCareerCurriculum(career.slug)!;
            return (
              <Link
                key={career.slug}
                href={`/learn/career-skills/${career.slug}`}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#DCE3EC] bg-white transition duration-200 hover:-translate-y-1 hover:border-[#AFBED2] hover:shadow-lg"
              >
                <div className="aspect-[8/5] overflow-hidden bg-[#EDF2F8]">
                  <Image
                    unoptimized
                    src={career.imageUrl}
                    width={960}
                    height={600}
                    alt=""
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#718096]">
                    Curriculum preview
                  </p>
                  <h2 className="mt-2 text-xl font-semibold leading-7 tracking-tight">
                    {career.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#53657D]">
                    {career.description}
                  </p>
                  <p className="mt-5 text-xs text-[#718096]">
                    {curriculum.sections.length} sections ·{" "}
                    {curriculum.lessonCount} planned lessons
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                    <span className="rounded-md bg-[#EDF2F8] px-2.5 py-1.5 text-[#426188]">
                      {career.level}
                    </span>
                    <span className="rounded-md bg-[#F5F0E6] px-2.5 py-1.5 text-[#79613F]">
                      {career.payCategory}
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-[#E7ECF2] pt-4 text-sm font-semibold text-[#1677FF]">
                    <span>Explore pathway</span>
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
