"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  MessageSquareText,
  Sparkles,
  Users,
} from "lucide-react";

type Analytics = {
  period: string;
  totals: {
    registeredLearners: number;
    activeLessonSessions: number;
    evidenceEvents: number;
    masteredLessons: number;
    feedbackSubmissions: number;
  };
  usage: {
    teachingTurns: number;
    fileAnalyses: number;
  };
  topTopics: Array<{
    topic: string;
    sessions: number;
  }>;
  recentFeedback: Array<{
    id: string;
    category: string;
    rating: number | null;
    message: string;
    context_path: string | null;
    created_at: string;
  }>;
  recentSessions: Array<{
    world_slug: string;
    topic: string;
    lesson_title: string;
    status: string;
    last_activity_at: string;
  }>;
};

export default function EarlyAccessAdminPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/admin/early-access");
      const body = await response.json();

      if (!response.ok) {
        setError(body.error || "Could not load analytics.");
        setLoading(false);
        return;
      }

      setData(body);
      setLoading(false);
    }

    void load();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FBFF] px-5 py-8 font-sans text-[#0B1739] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-bold text-black hover:text-[#1677FF]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1677FF]">
            Founder View
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.035em]">
            Early Access Learning Signals
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-black">
            Watch what learners actually use, what they master, what they ask the AI to do, and what they report as confusing.
          </p>
        </div>

        {loading && (
          <div className="mt-8 rounded-2xl border border-[#D7E3F2] bg-white p-12 text-center text-sm font-semibold text-black">
            Loading early access signals...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm leading-6 text-red-700">
            {error}
            <p className="mt-2 text-xs">
              Founder analytics stays locked until your email is listed in the
              server-only GAHN_ADMIN_EMAILS environment variable.
            </p>
          </div>
        )}

        {data && (
          <>
            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {[
                {
                  Icon: Users,
                  label: "Registered learners",
                  value: data.totals.registeredLearners,
                },
                {
                  Icon: BookOpenCheck,
                  label: "Active sessions",
                  value: data.totals.activeLessonSessions,
                },
                {
                  Icon: BarChart3,
                  label: "Evidence events",
                  value: data.totals.evidenceEvents,
                },
                {
                  Icon: Sparkles,
                  label: "Mastered lessons",
                  value: data.totals.masteredLessons,
                },
                {
                  Icon: MessageSquareText,
                  label: "Feedback",
                  value: data.totals.feedbackSubmissions,
                },
              ].map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#D7E3F2] bg-white p-5 shadow-[0_8px_24px_rgba(11,23,57,0.04)]"
                >
                  <Icon className="h-5 w-5 text-[#1677FF]" />
                  <p className="mt-4 text-3xl font-extrabold">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-black">
                    {label}
                  </p>
                </div>
              ))}
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-2">
              <div className="rounded-2xl border border-[#D7E3F2] bg-white p-6">
                <div className="flex items-center gap-3">
                  <BrainCircuit className="h-5 w-5 text-[#1677FF]" />
                  <div>
                    <h2 className="font-extrabold">AI Usage</h2>
                    <p className="text-xs text-black">{data.period}</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#F8FBFF] p-4">
                    <p className="text-2xl font-extrabold">
                      {data.usage.teachingTurns}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-black">
                      Teaching turns
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F8FBFF] p-4">
                    <p className="text-2xl font-extrabold">
                      {data.usage.fileAnalyses}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-black">
                      File analyses
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#D7E3F2] bg-white p-6">
                <h2 className="font-extrabold">Most-used topics</h2>
                <div className="mt-4 grid gap-2">
                  {data.topTopics.length ? (
                    data.topTopics.map((topic) => (
                      <div
                        key={topic.topic}
                        className="flex items-center justify-between gap-3 rounded-xl bg-[#F8FBFF] px-4 py-3"
                      >
                        <span className="text-sm font-semibold">
                          {topic.topic}
                        </span>
                        <span className="rounded-full bg-[#EAF3FF] px-2.5 py-1 text-xs font-bold text-[#1677FF]">
                          {topic.sessions}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-black">
                      No lesson activity yet.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-[#D7E3F2] bg-white p-6">
                <h2 className="font-extrabold">Recent learner feedback</h2>
                <div className="mt-4 grid gap-3">
                  {data.recentFeedback.length ? (
                    data.recentFeedback.map((item) => (
                      <article
                        key={item.id}
                        className="rounded-xl border border-[#E1E8F1] bg-[#F8FBFF] p-4"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#1677FF]">
                            {item.category}
                          </span>
                          {item.rating && (
                            <span className="text-xs font-bold text-black">
                              {item.rating}/5
                            </span>
                          )}
                        </div>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-black">
                          {item.message}
                        </p>
                        <p className="mt-2 text-xs text-black">
                          {new Date(item.created_at).toLocaleString()}
                        </p>
                      </article>
                    ))
                  ) : (
                    <p className="text-sm text-black">
                      No feedback submitted yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-[#D7E3F2] bg-white p-6">
                <h2 className="font-extrabold">Recent learning activity</h2>
                <div className="mt-4 grid gap-3">
                  {data.recentSessions.slice(0, 15).map((session, index) => (
                    <div
                      key={`${session.lesson_title}-${session.last_activity_at}-${index}`}
                      className="rounded-xl bg-[#F8FBFF] px-4 py-3"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#1677FF]">
                        {session.topic}
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        {session.lesson_title}
                      </p>
                      <p className="mt-1 text-xs text-black">
                        {new Date(session.last_activity_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
