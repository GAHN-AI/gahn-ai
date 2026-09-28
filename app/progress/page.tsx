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

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("learning_progress")
        .select(
          "id, world_slug, topic, lesson_id, lesson_title, status, mastery_state, attempts_count, correct_count, retry_count, last_activity_at"
        )
        .eq("user_id", user.id)
        .order("last_activity_at", { ascending: false });

      setRows((data || []) as ProgressRow[]);
      setLoading(false);
    }

    void load();
  }, [router]);

  const stats = useMemo(
    () => ({
      active: rows.filter((row) => row.status === "in_progress").length,
      mastered: rows.filter((row) => row.mastery_state === "mastered").length,
      review: rows.filter((row) => row.mastery_state === "needs_review").length,
    }),
    [rows]
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
            GAHN tracks what you actually attempted, answered correctly, retried, practiced, and mastered. It does not invent a progress percentage.
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
            ) : rows.length === 0 ? (
              <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-[#CFE0F5] bg-[#F8FBFF] px-6 text-center">
                <div className="max-w-md">
                  <Target className="mx-auto h-8 w-8 text-[#1677FF]" />
                  <h2 className="mt-3 text-lg font-extrabold">No lesson evidence yet</h2>
                  <p className="mt-2 text-sm leading-6 text-black">
                    Start an interactive lesson. Your answers and mastery evidence will be recorded here.
                  </p>
                  <Link
                    href="/learn/career-skills"
                    className="mt-5 inline-flex rounded-lg bg-[#1677FF] px-4 py-2.5 text-sm font-bold text-white"
                  >
                    Start learning
                  </Link>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-[#D7E3F2]">
                {rows.map((row) => (
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
