"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, MessageSquareText, Send } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function EarlyAccessVoices() {
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [statusError, setStatusError] = useState(false);
  const [needsSignIn, setNeedsSignIn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function checkStatus() {
      try {
        const response = await fetch("/api/public-feedback", { cache: "no-store" });
        if (!response.ok) throw new Error("Could not check message status.");
        const result = await response.json();
        if (!cancelled) setSubmitted(Boolean(result.submitted));
      } catch {
        if (!cancelled) {
          setStatusError(true);
          setError("We cannot check submissions right now. Please refresh and try again.");
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    }
    void checkStatus();
    return () => { cancelled = true; };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || submitted || checking || statusError) return;
    setSubmitting(true);
    setNotice("");
    setError("");
    setNeedsSignIn(false);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setNeedsSignIn(true);
        setError("Please log in or create a free account before sending your comment.");
        return;
      }

      const response = await fetch("/api/public-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, message }),
      });
      const result = await response.json();

      if (response.status === 401) {
        setNeedsSignIn(true);
        setError("Please log in or create a free account to send your comment.");
        return;
      }
      if (response.status === 409) {
        setSubmitted(true);
        setNotice("Your account has already sent a message. Thank you for your feedback.");
        return;
      }
      if (!response.ok) {
        setError(result.error || "Your comment could not be sent.");
        return;
      }

      setSubmitted(true);
      setMessage("");
      setNotice(
        result.message || "Thank you. Your private comment has been received."
      );
    } catch {
      setError("Your comment could not be sent right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="learner-voices" className="scroll-mt-24 border-y border-[#D8E6FA] bg-[#F3F8FF] py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gahn-blue">
            Share your thoughts
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-gahn-navy sm:text-4xl lg:text-[2.75rem]">
            Would you try GAHN AI?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-black sm:text-lg sm:leading-8">
            Tell us whether you would use GAHN to learn something and what matters most to you in a private AI instructor.
          </p>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#D8E6FA] bg-white p-5">
            <MessageSquareText className="mt-1 h-5 w-5 shrink-0 text-gahn-blue" />
            <p className="text-sm leading-6 text-gahn-navy">
              Your message goes privately to the GAHN team. It is not posted on this website.
              One submission is allowed per account.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-gahn-line bg-white p-6 sm:p-8">
          {checking ? (
            <p className="py-8 text-sm text-gahn-navy">Checking your submission status...</p>
          ) : submitted ? (
            <div role="status" className="py-6">
              <CheckCircle2 className="h-10 w-10 text-gahn-blue" />
              <h3 className="mt-4 text-xl font-semibold text-gahn-navy">Thank you for sharing your thoughts</h3>
              <p className="mt-3 text-sm leading-6 text-black">
                {notice || "Your account has already submitted a private comment. We appreciate your feedback."}
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-gahn-navy">
                Tell us what you think
              </h3>
              <p className="mt-2 text-sm leading-6 text-black">
                Send us a private comment. Nothing you write here will be displayed publicly.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <label className="block text-sm font-semibold text-gahn-navy" htmlFor="voice-name">
                  Name
                </label>
                <input
                  id="voice-name"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  maxLength={60}
                  required
                  placeholder="First name or initials"
                  className="w-full rounded-xl border border-gahn-line px-4 py-3 text-sm text-gahn-navy outline-none focus:border-gahn-blue"
                />

                <label className="block text-sm font-semibold text-gahn-navy" htmlFor="voice-message">
                  Your comment
                </label>
                <textarea
                  id="voice-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  minLength={10}
                  maxLength={280}
                  required
                  rows={5}
                  placeholder="Would you use GAHN AI? What would you want to learn?"
                  className="w-full resize-none rounded-xl border border-gahn-line px-4 py-3 text-sm leading-6 text-gahn-navy outline-none focus:border-gahn-blue"
                />
                <p className="text-right text-xs text-black">{message.length}/280</p>

                {error && (
                  <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                    {error}
                    {needsSignIn && (
                      <span>
                        {" "}<Link href="/login" className="font-semibold underline">Log in</Link>
                        {" "}or{" "}
                        <Link href="/signup" className="font-semibold underline">sign up</Link>.
                      </span>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || checking || statusError}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gahn-blue px-6 py-3 text-sm font-semibold text-white hover:bg-gahn-blue-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Sending..." : "Send private comment"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
