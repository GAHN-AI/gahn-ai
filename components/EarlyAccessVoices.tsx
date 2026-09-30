"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { MessageSquareQuote, Send } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type PublicVoice = {
  id: string;
  displayName: string;
  message: string;
  createdAt: string;
};

export default function EarlyAccessVoices() {
  const [voices, setVoices] = useState<PublicVoice[]>([]);
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [needsSignIn, setNeedsSignIn] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadVoices() {
      try {
        const response = await fetch("/api/public-feedback", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load feedback.");
        }

        const data = (await response.json()) as { voices?: PublicVoice[] };

        if (!cancelled) {
          setVoices(Array.isArray(data.voices) ? data.voices : []);
        }
      } catch {
        if (!cancelled) {
          setVoices([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadVoices();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setNotice("");
    setNeedsSignIn(false);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setNeedsSignIn(true);
        setNotice("You must sign up or log in before making a review.");
        return;
      }

      const response = await fetch("/api/public-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName,
          message,
          consentPublic: true,
        }),
      });

      const data = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (response.status === 401) {
        setNeedsSignIn(true);
        setNotice("You must sign up or log in before making a review.");
        return;
      }

      if (!response.ok) {
        setNotice(data.error || "Your feedback could not be submitted.");
        return;
      }

      setMessage("");
      setNotice(
        data.message ||
          "Thanks. Your comment was submitted for review before it appears publicly."
      );
    } catch {
      setNotice("Your feedback could not be submitted. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="border-y border-gahn-line bg-gahn-paper py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gahn-blue">
            Early Access Voices
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-gahn-navy sm:text-4xl lg:text-[2.75rem]">
            What early learners think about GAHN AI.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gahn-slate sm:text-lg sm:leading-8">
            These comments come from real signed-in users and are reviewed before
            they are shown publicly.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {loading ? (
              <div className="rounded-2xl border border-gahn-line bg-white p-5 text-sm text-gahn-slate sm:col-span-2">
                Loading early-access feedback...
              </div>
            ) : voices.length > 0 ? (
              voices.map((voice) => (
                <article
                  key={voice.id}
                  className="rounded-2xl border border-gahn-line bg-white p-5"
                >
                  <MessageSquareQuote className="h-5 w-5 text-gahn-blue" />
                  <p className="mt-4 text-[15px] leading-7 text-gahn-navy">
                    “{voice.message}”
                  </p>
                  <p className="mt-4 text-sm font-semibold text-gahn-slate">
                    {voice.displayName}
                  </p>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-gahn-line bg-white p-6 sm:col-span-2">
                <p className="text-sm font-semibold text-gahn-navy">
                  No approved public comments yet.
                </p>
                <p className="mt-2 text-sm leading-6 text-gahn-slate">
                  GAHN does not display fake testimonials. Approved early-access
                  feedback will appear here as people submit it.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="h-fit rounded-3xl border border-gahn-line bg-white p-6 sm:p-8">
          <h3 className="text-xl font-semibold tracking-[-0.02em] text-gahn-navy">
            Would you try GAHN AI?
          </h3>
          <p className="mt-2 text-sm leading-6 text-gahn-slate">
            Share a short comment about the idea. If approved, it may appear on
            this page using the display name you provide.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="voice-name"
                className="text-sm font-semibold text-gahn-navy"
              >
                Display name
              </label>
              <input
                id="voice-name"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                maxLength={60}
                required
                placeholder="First name or initials"
                className="mt-2 w-full rounded-xl border border-gahn-line px-4 py-3 text-sm text-gahn-navy outline-none transition focus:border-gahn-blue"
              />
            </div>

            <div>
              <label
                htmlFor="voice-message"
                className="text-sm font-semibold text-gahn-navy"
              >
                Your comment
              </label>
              <textarea
                id="voice-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                minLength={10}
                maxLength={280}
                required
                rows={4}
                placeholder="Example: I would use this to learn business skills outside of school."
                className="mt-2 w-full resize-none rounded-xl border border-gahn-line px-4 py-3 text-sm leading-6 text-gahn-navy outline-none transition focus:border-gahn-blue"
              />
              <p className="mt-2 text-right text-xs text-gahn-slate">
                {message.length}/280
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gahn-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gahn-blue-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Submitting..." : "Submit for review"}
            </button>
          </form>

          {notice && (
            <div className="mt-4 rounded-xl bg-gahn-paper px-4 py-3 text-sm leading-6 text-gahn-slate">
              {notice}
              {needsSignIn && (
                <span>
                  {" "}
                  <Link href="/login" className="font-semibold text-gahn-blue hover:underline">
                    Log in
                  </Link>{" "}
                  or{" "}
                  <Link href="/signup" className="font-semibold text-gahn-blue hover:underline">
                    sign up
                  </Link>
                  .
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
