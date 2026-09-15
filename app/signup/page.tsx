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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://gahnai.com";

const sourceSans = Source_Sans_3({ subsets: ["latin"] });

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
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [awaitingVerification, setAwaitingVerification] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!awaitingVerification) return;

    let cancelled = false;

    async function checkSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!cancelled && user) {
        window.location.replace("/dashboard");
      }
    }

    void checkSession();
    const interval = window.setInterval(() => void checkSession(), 1500);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [awaitingVerification]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = window.setTimeout(
      () => setResendCooldown((value) => Math.max(0, value - 1)),
      1000
    );
    return () => window.clearTimeout(timer);
  }, [resendCooldown]);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");

    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) return setError("Please enter your full name.");
    if (!cleanEmail) return setError("Please enter your email address.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword)
      return setError("Passwords do not match.");

    setLoading(true);

    const { error: signupError } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: { full_name: cleanName },
        emailRedirectTo: `${SITE_URL}/auth/callback`,
      },
    });

    setLoading(false);

    if (signupError) {
      setError(signupError.message);
      return;
    }

    setAwaitingVerification(true);
    setResendCooldown(60);
    setMessage(
      "Account created. Check your email and click Verify Email. Keep this tab open and it will move to your dashboard after verification."
    );
  }

  async function handleResendVerification() {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || resendCooldown > 0) return;

    setError("");
    setResendLoading(true);

    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email: cleanEmail,
      options: {
        emailRedirectTo: `${SITE_URL}/auth/callback`,
      },
    });

    setResendLoading(false);

    if (resendError) {
      setError(resendError.message);
      return;
    }

    setResendCooldown(60);
    setMessage("Verification email sent again. Check your inbox and spam folder.");
  }

  async function handleGoogleSignup() {
    setError("");
    setMessage("");
    setGoogleLoading(true);

    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${SITE_URL}/auth/callback?intent=signup`,
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

      <div className="relative mx-auto w-full max-w-6xl">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/favicon.png"
              alt="GAHN AI"
              className="h-11 w-11 rounded-full object-cover"
            />
            <div>
              <p className="text-xl font-extrabold tracking-[-0.025em]">GAHN AI</p>
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
                    <h2 className="font-bold">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-[#53657D]">{text}</p>
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
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              Create your account
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#53657D] sm:text-base">
              Join the GAHN AI MVP and begin with full early access.
            </p>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={googleLoading}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-[#D7E3F2] bg-white px-5 py-3.5 text-sm font-semibold shadow-sm hover:bg-[#F8FBFF] disabled:opacity-60"
            >
              <img src="/google-logo/google.svg" alt="Google" className="h-5 w-5" />
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </button>

            <div className="my-6 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.12em] text-[#7A8AA0]">
              <div className="h-px flex-1 bg-[#D7E3F2]" />
              Or
              <div className="h-px flex-1 bg-[#D7E3F2]" />
            </div>

            <form onSubmit={handleSignup}>
              <label htmlFor="fullName" className="mb-2 block text-sm font-bold">
                Full name
              </label>
              <input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                placeholder="Your full name"
                className="w-full rounded-xl border border-[#D7E3F2] px-4 py-3.5 outline-none focus:border-[#1677FF]"
              />

              <label htmlFor="email" className="mb-2 mt-5 block text-sm font-bold">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#D7E3F2] px-4 py-3.5 outline-none focus:border-[#1677FF]"
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-bold">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="8+ characters"
                    className="w-full rounded-xl border border-[#D7E3F2] px-4 py-3.5 outline-none focus:border-[#1677FF]"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-bold">
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Repeat password"
                    className="w-full rounded-xl border border-[#D7E3F2] px-4 py-3.5 outline-none focus:border-[#1677FF]"
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

              {awaitingVerification && (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={resendLoading || resendCooldown > 0}
                  className="mt-4 w-full rounded-xl border border-[#D7E3F2] px-5 py-3 text-sm font-semibold text-[#1677FF] disabled:opacity-60"
                >
                  {resendLoading
                    ? "Sending..."
                    : resendCooldown > 0
                      ? `Resend available in ${resendCooldown}s`
                      : "Resend verification email"}
                </button>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-[#1677FF] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#0F65E8] disabled:opacity-60"
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
              <Link href="/login" className="font-semibold text-[#1677FF]">
                Log in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
