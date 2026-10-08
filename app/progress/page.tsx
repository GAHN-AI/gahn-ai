"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  RotateCcw,
  Target,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

type ProgressRow = {
  id: string;
  world_slug: string;
  topic: string;
  lesson_id: string;
  lesson_title: string | null;
  status: string;
  mastery_state: string | null;
  attempts_count: number;
  correct_count: number;
  retry_count: number;
  evidence: Record<string, unknown> | null;
  last_activity_at: string;
};

const labels: Record<string, string> = {
  not_started: "Not started",
  learning: "Learning",
  practicing: "Practicing",
  proficient: "Proficient",
  mastered: "Mastered",
  needs_review: "Needs review",
};

export default function ProgressPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ProgressRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("learning_progress")
        .select(
          "id, world_slug, topic, lesson_id, lesson_title, status, mastery_state, attempts_count, correct_count, retry_count, evidence, last_activity_at"
        )
        .eq("user_id", user.id)
        .order("last_activity_at", { ascending: false });

      if (error) {
        setLoadError("Your learning progress could not be loaded. Refresh the page and try again.");
      } else {
        setRows((data || []) as ProgressRow[]);
        setLoadError("");
      }
      setLoading(false);
    }

    void load();
  }, [router]);

  const visibleRows = useMemo(
    () =>
      rows.filter((row) => {
        const evidence = row.evidence || {};
        const meaningfulStart =
          evidence.meaningfulStart === true ||
          evidence.lastActivitySource === "live_instructor" ||
          evidence.lastActivitySource === "adaptive_instructor";

        return (
          meaningfulStart ||
          row.status === "completed" ||
      (row.attempts_count || 0) > 0 ||
          ["practicing", "proficient", "mastered", "needs_review"].includes(
            row.mastery_state || ""
          )
        );
      }),
    [rows]
  );

  const stats = useMemo(
    () => ({
      active: visibleRows.filter((row) => row.status === "in_progress").length,
      mastered: visibleRows.filter((row) => row.mastery_state === "mastered").length,
      review: visibleRows.filter((row) => row.mastery_state === "needs_review").length,
    }),
    [visibleRows]
  );

  return (
    <main className="min-h-screen bg-[#F8FBFF] px-5 py-8 font-sans text-[#0B1739] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-bold text-black hover:text-[#1677FF]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <section className="mt-6 rounded-[1.75rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_16px_45px_rgba(11,23,57,0.06)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1677FF]">
            Learning Evidence
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.035em]">
            Your Progress
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-black">
            GAHN only shows learning after a real instructor session or checked learning evidence. Opening a lesson page by itself does not count as progress.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { Icon: BookOpenCheck, label: "Active lessons", value: stats.active },
              { Icon: CheckCircle2, label: "Mastered lessons", value: stats.mastered },
              { Icon: RotateCcw, label: "Needs review", value: stats.review },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-[#D7E3F2] bg-[#F8FBFF] p-4">
                <Icon className="h-5 w-5 text-[#1677FF]" />
                <p className="mt-3 text-2xl font-extrabold">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-black">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            {loading ? (
              <p className="py-14 text-center text-sm font-semibold text-black">
                Loading progress...
              </p>
            ) : loadError ? (
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">{loadError}</p>
            ) : visibleRows.length === 0 ? (
              <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-[#CFE0F5] bg-[#F8FBFF] px-6 text-center">
                <div className="max-w-md">
                  <Target className="mx-auto h-8 w-8 text-[#1677FF]" />
                  <h2 className="mt-3 text-lg font-extrabold">No lesson evidence yet</h2>
                  <p className="mt-2 text-sm leading-6 text-black">
                    When you complete learning activities, your checked answers and mastery progress will appear here. Return to your dashboard to choose a learning world.
                  </p>

                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-[#D7E3F2]">
                {visibleRows.map((row) => (
                  <div
                    key={row.id}
                    className="grid gap-4 border-b border-[#E7EDF5] bg-white p-5 last:border-b-0 lg:grid-cols-[minmax(0,1fr)_auto]"
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1677FF]">
                        {row.topic}
                      </p>
                      <h2 className="mt-1 font-extrabold">
                        {row.lesson_title || row.lesson_id}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-black">
                        {row.correct_count} correct · {row.attempts_count} checked responses · {row.retry_count} retries
                      </p>
                      <p className="mt-1 text-xs text-black">
                        Last activity {new Date(row.last_activity_at).toLocaleString()}
                      </p>
                    </div>
                    <span className="h-fit w-fit rounded-full border border-[#CFE0F5] bg-[#F1F7FF] px-3 py-1.5 text-xs font-bold text-[#1677FF]">
                      {labels[row.mastery_state || "learning"] || "Learning"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
