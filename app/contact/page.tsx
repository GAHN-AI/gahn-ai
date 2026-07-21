"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";

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
    <main className="min-h-screen bg-[#f5f7fb] px-5 py-8 text-[#111827] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-11 w-11 rounded-full object-cover"
            />

            <div>
              <p className="text-xl font-extrabold tracking-[-0.025em]">
                GAHN AI
              </p>

              <p className="hidden text-[8px] font-bold uppercase tracking-[0.16em] text-[#4b5563] sm:block">
                Global AI Human Helper Network
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0056d2] transition hover:text-[#00419e]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>
        </header>

        <section className="grid gap-10 py-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(500px,1.2fr)] lg:items-start lg:gap-16 lg:py-20">
          <div className="pt-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0056d2]">
              Contact GAHN AI
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              How can we help?
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#4b5563] sm:text-lg">
              Send us a message about support, partnerships, schools, product
              feedback, or general questions. We will review your message and
              respond through the email address you provide.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "General questions and account support",
                "School and organization partnerships",
                "Product feedback and suggestions",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 flex-none text-[#0056d2]"
                    strokeWidth={1.75}
                  />

                  <p className="text-sm leading-7 text-[#4b5563]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#dbe3ee] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <h2 className="text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">
              Send a message
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#4b5563]">
              Complete the form below. Every field is required.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold text-[#111827]"
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
                  className="w-full rounded-lg border border-[#dbe3ee] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#4b5563]/60 focus:border-[#0056d2] focus:ring-2 focus:ring-[#0056d2]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-[#111827]"
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
                  className="w-full rounded-lg border border-[#dbe3ee] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#4b5563]/60 focus:border-[#0056d2] focus:ring-2 focus:ring-[#0056d2]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-bold text-[#111827]"
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
                  className="w-full rounded-lg border border-[#dbe3ee] bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-[#4b5563]/60 focus:border-[#0056d2] focus:ring-2 focus:ring-[#0056d2]/15"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold text-[#111827]"
                  >
                    Message
                  </label>

                  <span className="text-xs text-[#4b5563]">
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
                  className="w-full resize-y rounded-lg border border-[#dbe3ee] bg-white px-4 py-3.5 text-sm leading-7 outline-none transition placeholder:text-[#4b5563]/60 focus:border-[#0056d2] focus:ring-2 focus:ring-[#0056d2]/15"
                />
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                >
                  {errorMessage}
                </p>
              )}

              {successMessage && (
                <p
                  role="status"
                  className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700"
                >
                  {successMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0056d2] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#00419e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056d2] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-4 w-4" />

                {loading ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-4 border-t border-[#dbe3ee] py-8 text-xs text-[#4b5563] sm:flex-row">
          <p>© 2026 GAHN AI. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link href="/about" className="transition hover:text-[#0056d2]">
              About
            </Link>

            <Link href="/privacy" className="transition hover:text-[#0056d2]">
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-[#0056d2]">
              Terms of Service
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}