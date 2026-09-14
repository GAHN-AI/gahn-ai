"use client";

import Link from "next/link";
import { Source_Sans_3 } from "next/font/google";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  GraduationCap,
  LockKeyhole,
  Rocket,
} from "lucide-react";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
});

const features = [
  {
    Icon: Bot,
    title: "Adaptive AI Instructors",
    text: "Learn with structured guidance that responds to your progress.",
  },
  {
    Icon: GraduationCap,
    title: "Built for Real Learning",
    text: "Practice, correction, recall, and guided retries—not random answers.",
  },
  {
    Icon: Rocket,
    title: "Real-World Progress",
    text: "Build skills, save your work, and continue where you left off.",
  },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    setLoading(false);

    if (loginError) {
      setError("Invalid email or password.");
      return;
    }

    window.location.href = "/dashboard";
  }

  async function handleGoogleLogin() {
    setError("");
    setMessage("");
    setGoogleLoading(true);

    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?intent=login`,
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    setGoogleLoading(false);

    if (googleError) {
      setError(googleError.message);
    }
  }

  async function handleForgotPassword() {
    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Enter your email address first, then click Forgot Password.");
      return;
    }

    setResetLoading(true);

    const { error: resetError } =
      await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
      });

    setResetLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setMessage("Password reset email sent. Check your inbox.");
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
              Welcome Back
            </p>

            <h1 className="mt-5 max-w-xl text-5xl font-extrabold leading-[1.04] tracking-[-0.04em]">
              Continue learning with your{" "}
              <span className="text-[#1677FF]">AI instructors.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#53657D]">
              Return to your dashboard, continue saved lessons, review progress,
              and pick up exactly where you left off.
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
              <LockKeyhole className="h-4 w-4 text-[#1677FF]" />
              Secure account access with Supabase authentication.
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl rounded-[1.75rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_24px_70px_rgba(11,23,57,0.10)] sm:p-8 lg:p-10">
            <div className="lg:hidden">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#1677FF]">
                Welcome Back
              </p>
            </div>

            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl lg:mt-0">
              Log in to GAHN AI
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#53657D] sm:text-base">
              Access your learning dashboard and continue your progress.
            </p>

            <button
              type="button"
              onClick={handleGoogleLogin}
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

            <form onSubmit={handleLogin}>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-[#0B1739]"
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

              <label
                htmlFor="password"
                className="mb-2 mt-5 block text-sm font-bold text-[#0B1739]"
              >
                Password
              </label>
              <input
                id="password"
                placeholder="Enter your password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#D7E3F2] bg-white px-4 py-3.5 text-sm text-[#0B1739] outline-none placeholder:text-[#7A8AA0] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
              />

              <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-[#53657D]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#1677FF]"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={resetLoading}
                  className="font-semibold text-[#1677FF] hover:text-[#0F65E8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resetLoading ? "Sending..." : "Forgot Password?"}
                </button>
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
                {loading ? "Logging In..." : "Log In"}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[#53657D]">
              <CheckCircle2 className="h-4 w-4 text-[#1677FF]" />
              <span>Your learning progress stays tied to your account.</span>
            </div>

            <p className="mt-6 text-center text-sm text-[#53657D]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#1677FF] hover:text-[#0F65E8]"
              >
                Create one
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
