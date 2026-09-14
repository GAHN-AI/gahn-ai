"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  MessageSquare,
  Send,
  ShieldCheck,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMessage("Please complete every field.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Your message could not be sent.");
        return;
      }

      setSuccessMessage("Your message was sent successfully.");

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Contact submission failed:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-5 py-8 font-sans text-[#0B1739] sm:px-8 sm:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#FFFFFF_0%,#FFFFFF_54%,#F5F8FC_54%,#EAF3FF_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-56 -top-56 h-[700px] w-[700px] rounded-full bg-[#EAF3FF]/80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-260px] left-[4%] h-[430px] w-[800px] rotate-[-8deg] rounded-[999px] bg-white/90"
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-11 w-11 flex-none rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-xl font-extrabold tracking-[-0.025em]">
                GAHN AI
              </p>

              <p className="hidden text-[8px] font-bold uppercase tracking-[0.18em] text-[#53657D] sm:block">
                Global AI Human Helper Network
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#53657D] hover:text-[#1677FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>
        </header>

        <section className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-14 lg:py-20">
          <div className="pt-3 lg:pt-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1677FF]">
              Contact GAHN AI
            </p>

            <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              How can we{" "}
              <span className="text-[#1677FF]">help?</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#53657D] sm:text-lg">
              Send us a message about support, partnerships, schools, product
              feedback, or general questions. We&apos;ll review your message and
              respond through the email address you provide.
            </p>

            <div className="mt-10 space-y-5">
              {[
                {
                  Icon: MessageSquare,
                  title: "General support",
                  text: "Questions about accounts, access, learning worlds, or using the platform.",
                },
                {
                  Icon: Building2,
                  title: "Schools and partnerships",
                  text: "Talk with us about classrooms, organizations, or future institutional use.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Product feedback",
                  text: "Share suggestions, bugs, or ideas that can improve the GAHN AI MVP.",
                },
              ].map(({ Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <div className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-[#0B1739]">
                      {title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-[#53657D]">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-[#D7E3F2] bg-white/85 p-5 shadow-[0_12px_35px_rgba(11,23,57,0.05)]">
              <p className="flex items-center gap-2 text-sm font-semibold text-[#0B1739]">
                <CheckCircle2 className="h-4 w-4 text-[#1677FF]" />
                Messages are handled through the GAHN AI support form.
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_24px_70px_rgba(11,23,57,0.10)] sm:p-8 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
              Send a Message
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              Tell us what you need.
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#53657D]">
              Complete the form below. Every field is required.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold text-[#0B1739]"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-[#D7E3F2] bg-white px-4 py-3.5 text-sm text-[#0B1739] outline-none placeholder:text-[#7A8AA0] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-[#0B1739]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#D7E3F2] bg-white px-4 py-3.5 text-sm text-[#0B1739] outline-none placeholder:text-[#7A8AA0] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-bold text-[#0B1739]"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  maxLength={150}
                  required
                  placeholder="What is your message about?"
                  className="w-full rounded-xl border border-[#D7E3F2] bg-white px-4 py-3.5 text-sm text-[#0B1739] outline-none placeholder:text-[#7A8AA0] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold text-[#0B1739]"
                  >
                    Message
                  </label>

                  <span className="text-xs text-[#7A8AA0]">
                    {message.length}/5000
                  </span>
                </div>

                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={5000}
                  required
                  rows={7}
                  placeholder="Write your message here..."
                  className="w-full resize-y rounded-xl border border-[#D7E3F2] bg-white px-4 py-3.5 text-sm leading-7 text-[#0B1739] outline-none placeholder:text-[#7A8AA0] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
                />
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                >
                  {errorMessage}
                </p>
              )}

              {successMessage && (
                <p
                  role="status"
                  className="rounded-xl border border-blue-200 bg-[#F1F7FF] px-4 py-3 text-sm font-semibold text-[#0F65E8]"
                >
                  {successMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1677FF] px-6 py-4 text-sm font-semibold text-white hover:bg-[#0F65E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {loading ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-4 border-t border-[#D7E3F2] py-8 text-xs text-[#53657D] sm:flex-row">
          <p>© 2026 GAHN AI. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link href="/about" className="hover:text-[#1677FF]">
              About
            </Link>
            <Link href="/privacy" className="hover:text-[#1677FF]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#1677FF]">
              Terms of Service
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
