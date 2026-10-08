"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookMarked,
  CheckCircle2,
  Search,
  Sparkles,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

type GuideBlock = {
  type?: string;
  title?: string;
  body?: string;
  bullets?: string[];
  checks?: string[];
};

type StudyGuide = {
  id: string;
  world_slug: string | null;
  topic: string | null;
  lesson_id: string | null;
  title: string;
  material_type: "study_guide" | "summary";
  content: {
    title?: string;
    subtitle?: string;
    blocks?: GuideBlock[];
  };
  created_at: string;
  updated_at: string;
};

export default function StudyGuidesPage() {
  const router = useRouter();
  const [guides, setGuides] = useState<StudyGuide[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function loadGuides() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("study_guides")
        .select(
          "id, world_slug, topic, lesson_id, title, material_type, content, created_at, updated_at"
        )
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

    if (fetchError) {
      setLoadError("Your saved learning materials could not be loaded right now. Please refresh and try again.");
      setLoading(false);
      return;
    }
      setGuides((data || []) as StudyGuide[]);
      setLoadError("");
      setLoading(false);
    }

    void loadGuides();
  }, [router]);

  // Old sessions may have saved the same type of material more than once.
  // Display the newest version without deleting anyone's historical data.
  const uniqueGuides = useMemo(() => {
    const seen = new Set<string>();
    return guides.filter((guide) => {
      const key = guide.lesson_id
        ? `${guide.lesson_id}:${guide.material_type}`
        : guide.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [guides]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return uniqueGuides;

    return uniqueGuides.filter((guide) =>
      [guide.title, guide.topic || "", guide.content?.subtitle || ""]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [uniqueGuides, search]);

  return (
    <main className="min-h-screen bg-[#F8FBFF] px-5 py-8 font-sans text-[#0B1739] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-bold text-black hover:text-[#1677FF]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#D7E3F2] bg-white shadow-[0_16px_45px_rgba(11,23,57,0.06)]">
          <div className="border-b border-[#D7E3F2] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_65%,#EAF3FF_100%)] p-6 sm:p-8">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
              <BookMarked className="h-5 w-5" />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.035em]">
              Study Guides & Summaries
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-black">
              Lesson summaries and study guides are built from the material you are actually studying and saved for review.
            </p>
          </div>

          <div className="p-5 sm:p-7">
            <div className="relative mb-5">
              <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-black" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search summaries and study guides..."
                className="h-11 w-full rounded-xl border border-[#D7E3F2] pl-10 pr-4 text-sm outline-none focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
              />
            </div>

            {loading ? (
              <p className="py-16 text-center text-sm font-semibold text-black">
                Loading study guides...
              </p>
            ) : loadError ? (
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">{loadError}</p>
            ) : guides.length === 0 ? (
              <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-[#CFE0F5] bg-[#F8FBFF] px-6 text-center">
                <div className="max-w-md">
                  <Sparkles className="mx-auto h-8 w-8 text-[#1677FF]" />
                  <h2 className="mt-3 text-lg font-extrabold">
                    No study guides yet
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-black">
                    Saved summaries and study guides from your lessons will appear here automatically. Choose a learning world from your dashboard.
                  </p>

                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#CFE0F5] bg-[#F8FBFF] px-6 py-12 text-center">
                <Search className="mx-auto h-7 w-7 text-[#1677FF]" />
                <h2 className="mt-3 font-extrabold">No matching guides</h2>
              </div>
            ) : (
              <div className="grid gap-4">
                {filtered.map((guide) => (
                  <article
                    key={guide.id}
                    className="rounded-2xl border border-[#D7E3F2] bg-white p-5 sm:p-6"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1677FF]">
                        {guide.topic || "Learning guide"}
                      </p>
                      <span className="rounded-full border border-[#CFE0F5] bg-[#F1F7FF] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#1677FF]">
                        {guide.material_type === "summary" ? "Summary" : "Study Guide"}
                      </span>
                    </div>
                    <h2 className="mt-1 text-xl font-extrabold">
                      {guide.title}
                    </h2>
                    <p className="mt-1 text-xs text-black">
                      Saved {new Date(guide.updated_at).toLocaleString()}
                    </p>

                    <div className="mt-5 grid gap-3">
                      {(guide.content?.blocks || []).map((block, index) => (
                        <div
                          key={`${block.title || block.type}-${index}`}
                          className="rounded-xl border border-[#E2EAF4] bg-[#F8FBFF] p-4"
                        >
                          <h3 className="font-bold">
                            {block.title || "Review"}
                          </h3>
                          {block.body && (
                            <p className="mt-2 text-sm leading-6 text-black">
                              {block.body}
                            </p>
                          )}
                          {(block.bullets || block.checks || []).length > 0 && (
                            <ul className="mt-3 grid gap-2">
                              {(block.bullets || block.checks || []).map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-sm leading-6 text-black"
                                >
                                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#1677FF]" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
