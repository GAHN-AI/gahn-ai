import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function WorkspacePreviewCard({ href }: { href: string }) {
  return (
    <aside className="overflow-hidden rounded-2xl border border-[#DCE3EC] bg-white lg:sticky lg:top-6">
      <div className="p-6">
        <h2 className="text-lg font-semibold">
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
