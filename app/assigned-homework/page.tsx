"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpenCheck,
  GraduationCap,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

type HomeworkAssignment = {
  id: string;
  title: string;
  topic: string | null;
  description: string | null;
  status: string;
  due_at: string | null;
  score: number | null;
};

export default function AssignedHomeworkPage() {
  const router = useRouter();
  const [assignments, setAssignments] = useState<HomeworkAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error: loadError } = await supabase
        .from("assignments")
        .select("id, title, topic, description, status, due_at, score")
        .eq("user_id", user.id)
        .eq("world_slug", "school-help")
        .order("created_at", { ascending: false });

      if (loadError) {
        setError("Your homework could not be loaded. Please try again later.");
      } else {
        setAssignments((data || []) as HomeworkAssignment[]);
      }
      setLoading(false);
    }

    void checkUser();
  }, [router]);

  return (
    <main className="min-h-screen bg-[#F7F8FA] font-sans text-[#1D1E24]">
      <header className="border-b border-[#E7E7EA] bg-white">
        <div className="mx-auto flex min-h-[68px] max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1E24]"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>

          <div className="flex items-center gap-2">
            <img
              src="/logo/favicon.png"
              alt=""
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-sm font-semibold text-[#0B1739]">GAHN AI</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="max-w-[720px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D9E5F7] bg-white px-3 py-1.5 text-xs font-medium text-[#0B5CFF]">
            <GraduationCap className="h-3.5 w-3.5" />
            School Help
          </span>
          <h1 className="mt-5 text-[34px] font-semibold leading-[1.12] tracking-[-0.035em] text-[#1D1E24] sm:text-[40px]">
            Assigned homework
          </h1>
          <p className="mt-4 max-w-[650px] text-[15px] leading-7 text-[#34363D]">
            This page is reserved for independent practice assigned by a School Help AI instructor after a lesson. Notes remain available across every learning world.
          </p>
        </div>

        <section className="mt-9 rounded-[16px] border border-[#E1E3E8] bg-white p-7 shadow-[0_10px_30px_rgba(29,30,36,0.04)] sm:p-9">
          {loading ? (
            <p role="status" className="text-sm text-[#4F515A]">Loading your assignments...</p>
          ) : error ? (
            <p role="alert" className="text-sm text-red-700">{error}</p>
          ) : assignments.length === 0 ? (
            <>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#EEF4FF] text-[#0B5CFF]">
                <BookOpenCheck className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-[#1D1E24]">No assigned homework yet</h2>
              <p className="mt-2 max-w-[620px] text-sm leading-6 text-[#4F515A]">
                Assignments saved by your School Help instructor will appear here. Return to your dashboard to choose a learning world.
              </p>
            </>
          ) : (
            <div className="grid gap-4">
              {assignments.map((assignment) => (
                <article key={assignment.id} className="rounded-xl border border-[#D7E3F2] bg-[#F8FBFF] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#0B5CFF]">
                      {assignment.topic || "School Help"}
                    </p>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#071F4D]">
                      {assignment.status.replaceAll("_", " ")}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold">{assignment.title}</h2>
                  {assignment.description && (
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#4F515A]">{assignment.description}</p>
                  )}
                  {assignment.due_at && (
                    <p className="mt-3 text-xs text-[#4F515A]">Due {new Date(assignment.due_at).toLocaleDateString()}</p>
                  )}
                  {assignment.score !== null && (
                    <p className="mt-2 text-xs font-semibold text-[#0B5CFF]">Score: {assignment.score}</p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
