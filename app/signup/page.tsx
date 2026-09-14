"use client";

import Link from "next/link";
import { Source_Sans_3 } from "next/font/google";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Trophy,
} from "lucide-react";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
});

const features = [
  {
    Icon: Brain,
    title: "Personalized Learning",
    text: "AI instructors adapt explanations, practice, and pacing to your needs.",
  },
  {
    Icon: Layers,
    title: "Structured Learning Paths",
    text: "Follow guided learning journeys designed around real understanding.",
  },
  {
    Icon: Trophy,
    title: "Track Your Growth",
    text: "Save progress, build skills, and unlock future achievements.",
  },
];

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("error") === "google_account_exists") {
      setError(
        "This Google account is already registered. Please login instead."
      );
    }
  }, []);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();

    if (!cleanName) return setError("Please enter your full name.");
    if (!cleanEmail) return setError("Please enter your email address.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword)
      return setError("Passwords do not match.");

    setLoading(true);

    try {
      const checkResponse = await fetch("/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const checkData = await checkResponse.json();

      if (checkData.exists) {
        setError("This account already exists. Please login.");
        setLoading(false);
        return;
      }

      const { error: signupError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: { full_name: cleanName },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      setLoading(false);

      if (signupError) return setError(signupError.message);

      setMessage(
        "Account created. Please check your email to verify your account."
      );
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  }

  async function handleGoogleSignup() {
    setError("");
    setMessage("");
    setGoogleLoading(true);

    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?intent=signup`,
        queryParams: { prompt: "select_account" },
      },
    });

    setGoogleLoading(false);

    if (googleError) setError(googleError.message);
  }

  return (
    <main
      className={`${sourceSans.className} relative min-h-screen overflow-hidden bg-white px-5 py-8 text-[#0B1739] sm:px-8 sm:py-10`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#FFFFFF_0%,#FFFFFF_50%,#F5F8FC_50%,#EAF3FF_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 -top-52 h-[650px] w-[650px] rounded-full bg-[#EAF3FF]/80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-240px] left-[8%] h-[420px] w-[760px] rotate-[-8deg] rounded-[999px] bg-white/90"
      />

      <div className="relative mx-auto w-full max-w-6xl">
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

        <section className="grid min-h-[calc(100vh-140px)] items-center py-10 sm:py-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div className="hidden pr-6 lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1677FF]">
              Start Learning
            </p>

            <h1 className="mt-5 max-w-xl text-5xl font-extrabold leading-[1.04] tracking-[-0.04em]">
              Build your own path with{" "}
              <span className="text-[#1677FF]">GAHN AI.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#53657D]">
              Create one account for structured AI lessons across school,
              careers, brain development, general knowledge, and books.
            </p>

            <div className="mt-10 space-y-6">
              {features.map(({ Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <div className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  <div>
                    <h2 className="text-base font-bold">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-[#53657D]">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-2 text-sm font-semibold text-[#53657D]">
              <ShieldCheck className="h-4 w-4 text-[#1677FF]" />
              Secure signup with email verification and Google authentication.
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl rounded-[1.75rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_24px_70px_rgba(11,23,57,0.10)] sm:p-8 lg:p-10">
            <div className="lg:hidden">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1677FF]">
                Start Learning
              </p>
            </div>

            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl lg:mt-0">
              Create your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#53657D] sm:text-base">
              Join the GAHN AI MVP and begin with full early access.
            </p>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-[#D7E3F2] bg-white px-5 py-3.5 text-sm font-semibold text-[#0B1739] shadow-sm hover:border-[#1677FF]/40 hover:bg-[#F8FBFF] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <img
                src="/google-logo/google.svg"
                alt="Google"
                className="h-5 w-5 object-contain"
              />
              <span>
                {googleLoading ? "Connecting..." : "Continue with Google"}
              </span>
            </button>

            <div className="my-6 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.12em] text-[#7A8AA0]">
              <div className="h-px flex-1 bg-[#D7E3F2]" />
              Or
              <div className="h-px flex-1 bg-[#D7E3F2]" />
            </div>

            <form onSubmit={handleSignup}>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-bold text-[#0B1739]"
              >
                Full name
              </label>
              <input
                id="fullName"
                placeholder="Your full name"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-[#D7E3F2] bg-white px-4 py-3.5 text-sm text-[#0B1739] outline-none placeholder:text-[#7A8AA0] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
              />

              <label
                htmlFor="email"
                className="mb-2 mt-5 block text-sm font-bold text-[#0B1739]"
              >
                Email address
              </label>
              <input
                id="email"
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#D7E3F2] bg-white px-4 py-3.5 text-sm text-[#0B1739] outline-none placeholder:text-[#7A8AA0] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold text-[#0B1739]"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    placeholder="6+ characters"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#D7E3F2] bg-white px-4 py-3.5 text-sm text-[#0B1739] outline-none placeholder:text-[#7A8AA0] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-bold text-[#0B1739]"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    placeholder="Repeat password"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#D7E3F2] bg-white px-4 py-3.5 text-sm text-[#0B1739] outline-none placeholder:text-[#7A8AA0] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

              {message && (
                <p className="mt-5 rounded-xl border border-blue-200 bg-[#F1F7FF] px-4 py-3 text-sm font-medium text-[#0F65E8]">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#1677FF] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#0F65E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#53657D]">
              <CheckCircle2 className="h-4 w-4 text-[#1677FF]" />
              <span>No credit card required for the MVP.</span>
            </div>

            <p className="mt-6 text-center text-sm text-[#53657D]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#1677FF] hover:text-[#0F65E8]"
              >
                Log in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
