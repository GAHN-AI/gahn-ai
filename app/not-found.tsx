import Link from "next/link";
import { PathIcon } from "@/components/brand/WorldIcons";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="grid min-h-screen place-items-center bg-[#F6F8FB] px-5 py-16 text-[#142B47]"
    >
      <div className="max-w-lg rounded-2xl border border-[#DCE3EC] bg-white p-8 sm:p-12">
        <PathIcon className="h-12 w-12" />
        <p className="gahn-eyebrow mt-6">Page not found</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Let&apos;s find the right path.
        </h1>
        <p className="mt-5 text-sm leading-7 text-[#53657D]">
          This page may have moved, or the pathway may no longer be offered.
          Browse the current Learning Worlds to continue exploring.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/learn/career-skills"
            className="rounded-lg bg-[#16375E] px-5 py-3 text-sm font-semibold text-white"
          >
            Browse careers
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-[#DCE3EC] px-5 py-3 text-sm font-medium"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
