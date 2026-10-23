"use client";

import Image from "next/image";

import { CanvasIcon, EvidenceIcon, PathIcon, SchoolWorldIcon } from "@/components/brand/WorldIcons";


import Link from "next/link";
import { Source_Sans_3 } from "next/font/google";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PasswordInput from "@/components/auth/PasswordInput";
import { useBrowserSearch } from "@/lib/useBrowserPreferences";
import { ArrowLeft, LockKeyhole } from "lucide-react";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
});

const features = [
  {
    Icon: CanvasIcon,
    title: "Planned instructor experience",
    text: "Explore how the future instructor and learning workspace will fit together.",
  },
  {
    Icon: SchoolWorldIcon,
    title: "Specific learning paths",
    text: "Browse subjects, practical tasks, and planned learning outcomes.",
  },
  {
    Icon: PathIcon,
    title: "Your early-access account",
    text: "Return to your account and keep existing notes and records in one place.",
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

  const browserSearch = useBrowserSearch();
  const [queryNoticeDismissed, setQueryNoticeDismissed] = useState(false);
  const reason = new URLSearchParams(browserSearch).get("error");
  const queryError = reason === "authentication_failed"
    ? "That sign-in link expired or could not be verified. Please try again."
    : reason === "profile_setup_failed"
      ? "We couldn't finish setting up your profile. Please try signing in again."
      : "";
  const visibleError = error || (!queryNoticeDismissed ? queryError : "");
  const visibleMessage = message || (!queryNoticeDismissed && reason === "session_expired" ? "Your session ended. Please sign in again to continue." : "");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setQueryNoticeDismissed(true);

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

    let loginError: { code?: string; status?: number } | null = null;
    try {
      const result = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });
      loginError = result.error;
    } catch {
      setError("Unable to reach the sign-in service. Please try again.");
      return;
    } finally {
      setLoading(false);
    }

    if (loginError) {
      if (loginError.code === "email_not_confirmed") {
        setError("Please verify your email address before logging in. Check your inbox, or choose Continue with Google if you signed up with Google.");
      } else if (loginError.code === "too_many_requests" || loginError.status === 429) {
        setError("Too many sign-in attempts. Please wait and try again.");
      } else {
        setError("We couldn't sign you in. Check your email and password, or choose Continue with Google if you originally used Google.");
      }
      return;
    }

    window.location.href = "/dashboard";
  }

  async function handleGoogleLogin() {
    setQueryNoticeDismissed(true);
    setError("");
    setMessage("");
    setGoogleLoading(true);

    try {
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?intent=login`,
          queryParams: { prompt: "select_account" },
        },
      });
      if (googleError) setError("Google sign-in could not start. Please try again.");
    } catch {
      setError("Unable to connect to Google sign-in. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleForgotPassword() {
    setQueryNoticeDismissed(true);
    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Enter your email address first, then click Forgot Password.");
      return;
    }

    setResetLoading(true);

    try {
      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
        });

      if (resetError) {
        setError(
          resetError.status === 429
            ? "Too many reset requests. Please wait before trying again."
            : "We couldn't process the reset request right now. Please try again later."
        );
        return;
      }
    } catch {
      setError("Unable to request a reset right now. Please try again.");
      return;
    } finally {
      setResetLoading(false);
    }

    setMessage("If this email can receive a password setup or reset link, check your inbox and spam folder. Google users can keep signing in with Google or create a password for the same email.");
  }

  return (
    <main id="main-content"
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
            <Image unoptimized width={64} height={64}
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-11 w-11 flex-none rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-xl font-extrabold tracking-[-0.025em]">
                GAHN AI
              </p>
              <p className="hidden text-[8px] font-bold uppercase tracking-[0.18em] text-black sm:block">
                Global AI Human Helper Network
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-[#1677FF]"
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

            <p className="mt-6 max-w-xl text-lg leading-8 text-black">
              Return to your dashboard, browse the upcoming Learning Worlds and
              review any previously saved learning notes or progress.
            </p>

            <div className="mt-10 space-y-6">
              {features.map(({ Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <div className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  <div>
                    <h2 className="text-base font-bold">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-black">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-2 text-sm font-semibold text-black">
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

            <p className="mt-3 text-sm leading-6 text-black sm:text-base">
              Access your early-access dashboard, Learning Worlds and account settings.
            </p>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-[#D7E3F2] bg-white px-5 py-3.5 text-sm font-semibold text-[#0B1739] shadow-sm hover:border-[#1677FF]/40 hover:bg-[#F8FBFF] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Image unoptimized width={1200} height={800}
                src="/google-logo/google.svg"
                alt="Google"
                className="h-5 w-5 object-contain"
              />
              <span>
                {googleLoading ? "Connecting..." : "Continue with Google"}
              </span>
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-slate-600">
              Use your existing Google account to sign in. You can also set a password for the same email using Forgot Password below.
            </p>

            <div className="my-6 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.12em] text-black">
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
                className="w-full rounded-xl border border-[#D7E3F2] bg-white px-4 py-3.5 text-sm text-[#0B1739] outline-none placeholder:text-black focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
              />

              <label
                htmlFor="password"
                className="mb-2 mt-5 block text-sm font-bold text-[#0B1739]"
              >
                Password
              </label>
              <PasswordInput
                id="password"
                label="Password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={setPassword}
                className="w-full rounded-xl border border-[#D7E3F2] bg-white px-4 py-3.5 text-sm text-[#0B1739] outline-none placeholder:text-black focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
              />

              <div className="mt-4 flex justify-end text-sm">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={resetLoading}
                  className="font-semibold text-[#1677FF] hover:text-[#0F65E8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resetLoading ? "Sending..." : "Forgot password / create one"}
                </button>
              </div>

              {visibleError && (
                <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {visibleError}
                </p>
              )}

              {visibleMessage && (
                <p className="mt-5 rounded-xl border border-blue-200 bg-[#F1F7FF] px-4 py-3 text-sm font-medium text-[#0F65E8]">
                  {visibleMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#1677FF] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#0F65E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-black">
              <EvidenceIcon className="h-4 w-4 text-[#1677FF]" />
              <span>Your learning progress stays tied to your account.</span>
            </div>

            <p className="mt-6 text-center text-sm text-black">
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
