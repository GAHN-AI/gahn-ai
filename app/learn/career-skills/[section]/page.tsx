import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { careerSections, getCareerSection } from "@/lib/careerCatalog";
import { careerCourses } from "@/lib/courses";
import { courseOverviewHighlights } from "@/lib/courseOverviewHighlights";
import {
  careerWorkspaceHref,
  getCareerCurriculum,
} from "@/lib/careerCurricula";
import { CareerWorldIcon } from "@/components/brand/WorldIcons";

type Props = { params: Promise<{ section: string }> };

export function generateStaticParams() {
  return careerSections.map(({ slug }) => ({ section: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const career = getCareerSection((await params).section);
  return {
    title: career
      ? `${career.title} curriculum | GAHN AI`
      : "Career not found | GAHN AI",
    description: career?.description,
  };
}

export default async function CareerSectionPage({ params }: Props) {
  const career = getCareerSection((await params).section);
  const curriculum = career && getCareerCurriculum(career.slug);
  if (!career || !curriculum) notFound();
  const workspaceHref = careerWorkspaceHref(career.slug);
  const highlights = courseOverviewHighlights(careerCourses[career.slug]);

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
      <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 lg:py-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-[#64748B]"
        >
          <Link href="/learn/career-skills" className="hover:underline">
            Career Skills
          </Link>
          <span aria-hidden="true">/</span>
          <span>{career.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#142B47]">{career.title}</span>
        </nav>
        <section className="overflow-hidden rounded-[22px] border border-[#DCE3EC] bg-white">
          <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <div className="p-6 sm:p-9 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <CareerWorldIcon className="h-9 w-9" />
                <p className="gahn-eyebrow">{career.category}</p>
              </div>
              <h1 className="mt-6 text-3xl font-semibold leading-[1.12] tracking-[-0.035em] sm:text-[42px]">
                {career.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#4B5E74]">
                {career.description}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
                {curriculum.entry}
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="rounded-md bg-[#EDF2F8] px-3 py-2 text-[#365B89]">
                  {career.level}
                </span>
                <span className="rounded-md bg-[#F3F0E9] px-3 py-2 text-[#7D6340]">
                  {career.payCategory}
                </span>
              </div>
              <div className="mt-7">
                <Link
                  href={workspaceHref}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#1677FF] px-6 py-3 text-sm font-semibold text-white hover:bg-[#075FCF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677FF]"
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
              <Image
                unoptimized
                src={career.imageUrl}
                alt=""
                width={960}
                height={600}
                sizes="(min-width: 1024px) 480px, 100vw"
                priority
                className="h-72 w-full flex-1 object-cover lg:min-h-[420px]"
              />

            </div>
          </div>
        </section>
        <div className="mt-9 max-w-[1120px]">
            <section
              aria-labelledby="outcomes-heading"
              className="rounded-2xl border border-[#DCE3EC] bg-white p-6 sm:p-8"
            >
              <p className="gahn-eyebrow">
                Skills covered
              </p>
              <h2
                id="outcomes-heading"
                className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                What you&apos;ll learn
              </h2>

              <ul className="mt-6 grid gap-x-7 gap-y-4 sm:grid-cols-2">
                {highlights.map((outcome, index) => (
                  <li
                    key={outcome}
                    className="flex gap-3 text-sm leading-6 text-[#3E536B]"
                  >
                    <span className="mt-0.5 w-5 shrink-0 text-xs font-medium tabular-nums text-[#8B9AB0]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>
        </div>
      </div>
    </main>
  );
}
