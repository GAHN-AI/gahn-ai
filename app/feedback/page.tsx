"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bug,
  Heart,
  Lightbulb,
  MessageSquareText,
  Send,
  TriangleAlert,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

const categories = [
  { value: "feedback", label: "General feedback", Icon: MessageSquareText },
  { value: "confusing", label: "Something was confusing", Icon: TriangleAlert },
  { value: "bug", label: "I found a bug", Icon: Bug },
  { value: "idea", label: "I have an idea", Icon: Lightbulb },
  { value: "love", label: "Something worked well", Icon: Heart },
];

export default function FeedbackPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [category, setCategory] = useState("feedback");
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [notificationSent, setNotificationSent] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUserId(user.id);
    }

    void loadUser();
  }, [router]);

  async function submitFeedback(event: FormEvent) {
    event.preventDefault();

    const clean = message.trim();
    if (!clean || !userId) return;

    setSending(true);
    setError("");
    setSent(false);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          rating,
          message: clean,
          contextPath:
            typeof window !== "undefined"
              ? document.referrer || "/feedback"
              : "/feedback",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Feedback could not be sent.");
        return;
      }

      setMessage("");
      setRating(null);
      setCategory("feedback");
      setNotificationSent(data.notificationSent !== false);
      setSent(true);
    } catch {
      setError("Feedback could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FBFF] px-5 py-8 font-sans text-[#0B1739] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-bold text-black hover:text-[#1677FF]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#D7E3F2] bg-white shadow-[0_16px_45px_rgba(11,23,57,0.06)]">
          <div className="border-b border-[#D7E3F2] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_65%,#EAF3FF_100%)] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1677FF]">
              Free Plan
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.035em]">
              Tell us what happened
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-black">
              Feedback from Free Plan learners helps us understand what people use, where they get stuck, and what to improve next.
            </p>
          </div>

          <form onSubmit={submitFeedback} className="p-5 sm:p-7">
            <p className="text-sm font-bold">What kind of feedback is this?</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {categories.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCategory(value)}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold ${
                    category === value
                      ? "border-[#1677FF] bg-[#EAF3FF] text-[#0B1739]"
                      : "border-[#D7E3F2] bg-white text-black"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0 text-[#1677FF]" />
                  {label}
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm font-bold">How useful was your experience?</p>
            <div className="mt-3 flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`grid h-10 w-10 place-items-center rounded-lg border text-sm font-bold ${
                    rating === value
                      ? "border-[#1677FF] bg-[#1677FF] text-white"
                      : "border-[#D7E3F2] bg-white text-black"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>

            <label className="mt-6 grid gap-2">
              <span className="text-sm font-bold">
                What should we know?
              </span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={7}
                placeholder="Tell us what confused you, what broke, what felt useful, or what you wanted to do but could not."
                className="w-full resize-none rounded-xl border border-[#D7E3F2] px-4 py-3 text-sm leading-6 outline-none focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
              />
            </label>

            {error && (
              <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {sent && (
              <p className="mt-4 rounded-xl border border-[#BFD8F8] bg-[#F1F7FF] px-4 py-3 text-sm font-semibold text-black">
                {notificationSent
                  ? "Feedback saved and sent to the GAHN support inbox."
                  : "Feedback was saved, but the email notification could not be delivered."}
              </p>
            )}

            <button
              type="submit"
              disabled={sending || !message.trim()}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1677FF] px-5 py-3 text-sm font-bold text-white disabled:bg-[#B8C7DA]"
            >
              <Send className="h-4 w-4" />
              {sending ? "Sending..." : "Send feedback"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
