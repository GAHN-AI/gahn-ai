import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CanvasIcon } from "@/components/brand/WorldIcons";

export default function WorkspacePreviewCard({ href }: { href: string }) {
  return (
    <aside className="overflow-hidden rounded-2xl border border-[#DCE3EC] bg-white lg:sticky lg:top-6">
      <div
        className="grid grid-cols-[0.8fr_1.2fr] gap-2 bg-[#ECF1F7] p-5"
        aria-hidden="true"
      >
        <div className="flex aspect-[3/4] items-center justify-center rounded-lg bg-[#13263F]">
          <div className="h-9 w-9 rounded-full border border-white/25" />
        </div>
        <div className="rounded-lg bg-white p-3">
          <div className="mb-4 flex gap-1.5">
            <span className="h-1 w-5 rounded bg-[#4276C6]" />
            <span className="h-1 w-4 rounded bg-[#E2E8F0]" />
            <span className="h-1 w-4 rounded bg-[#E2E8F0]" />
          </div>
          <div className="h-2 w-3/4 rounded bg-[#D6DFEB]" />
          <div className="mt-2 h-1.5 w-full rounded bg-[#E8EDF3]" />
          <div className="mt-1.5 h-1.5 w-4/5 rounded bg-[#E8EDF3]" />
          <div className="mt-4 h-10 rounded border border-dashed border-[#CAD5E4]" />
        </div>
      </div>
      <div className="p-6">
        <CanvasIcon className="h-8 w-8" />
        <h2 className="mt-4 text-lg font-semibold">
          See the learning workspace
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#53657D]">
          Explore the planned instructor and Magic Canvas layout. Video,
          teaching, and lesson controls are not active yet.
        </p>
        <Link
          href={href}
          className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#16375E] px-4 py-3 text-sm font-semibold text-white hover:bg-[#234B79]"
        >
          Preview workspace
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
