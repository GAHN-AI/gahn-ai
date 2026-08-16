"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Bot, GraduationCap, Rocket } from "lucide-react";

const features = [
  {
    Icon: Bot,
    title: "AI-Powered Instructors",
    text: "Learn from intelligent AI instructors that adapt to you.",
  },
  {
    Icon: GraduationCap,
    title: "Proven Learning Methods",
    text: "Methods built to help you understand, retain, and apply.",
  },
  {
    Icon: Rocket,
    title: "Real World Outcomes",
    text: "Build real skills, complete projects, and achieve your goals.",
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
    <main className="min-h-screen bg-white px-6 py-10 font-sans text-[#111827]">
      {/* Logo */}
      <div className="mx-auto mb-8 text-center">
        <img
          src="/logo/favicon.png"
          alt="GAHN AI"
          className="mx-auto mb-4 h-16 w-16 object-contain"
        />

        <h1 className="text-4xl font-extrabold tracking-[-0.02em] text-[#111827]">
          GAHN AI
        </h1>

        <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[#4b5563]">
          Global AI Human Helper Network
        </p>
      </div>

      {/* Main Login Card */}
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-[#dbe3ee] bg-white shadow-sm lg:grid-cols-2">
        {/* Left Side */}
        <section className="relative bg-white p-10 text-[#111827] lg:p-12">
          <h2 className="text-3xl font-extrabold tracking-[-0.02em]">
            Welcome Back
          </h2>

          <div className="mt-5 h-1 w-16 rounded-full bg-[#22c55e]" />

          <p className="mt-8 text-lg leading-8 text-[#4b5563]">
            Continue your learning journey with{" "}
            <span className="font-semibold text-[#22c55e]">GAHN AI</span>
          </p>

          <div className="mt-10 space-y-7">
            {features.map(({ Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#dcfce7]">
                  <Icon
                    className="h-5 w-5 text-[#22c55e]"
                    strokeWidth={1.75}
                  />
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#111827]">
                    {title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-[#4b5563]">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Side */}
        <section className="bg-white p-10 lg:p-12">
          <h2 className="text-center text-3xl font-extrabold tracking-[-0.02em] text-[#111827]">
            Login
          </h2>

          <p className="mt-2 text-center text-sm text-[#4b5563]">
            Welcome back! Please login to continue.
          </p>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="mt-8 flex w-full items-center justify-center gap-4 rounded-lg border border-[#dbe3ee] bg-white px-5 py-3.5 text-sm font-semibold text-[#111827] shadow-sm transition hover:border-[#22c55e] hover:bg-[#f0fdf4] disabled:cursor-not-allowed disabled:opacity-60"
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

          {/* Divider */}
          <div className="my-6 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.1em] text-[#4b5563]">
            <div className="h-px flex-1 bg-[#dbe3ee]" />
            Or
            <div className="h-px flex-1 bg-[#dbe3ee]" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <input
              placeholder="Email Address"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[#dbe3ee] bg-white px-4 py-3.5 text-sm text-[#111827] outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/15"
            />

            <input
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-4 w-full rounded-lg border border-[#dbe3ee] bg-white px-4 py-3.5 text-sm text-[#111827] outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/15"
            />

            <div className="mt-4 flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-[#4b5563]">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[#22c55e]"
                />
                Remember me
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={resetLoading}
                className="cursor-pointer font-semibold text-[#22c55e] transition hover:text-[#16a34a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {resetLoading ? "Sending..." : "Forgot Password?"}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            {/* Success */}
            {message && (
              <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3.5 text-sm font-medium text-emerald-700">
                {message}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: loading ? "#86efac" : "#22c55e",
                color: "#ffffff",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = "#16a34a";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = "#22c55e";
                }
              }}
              className="mt-6 flex w-full items-center justify-center rounded-lg px-5 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e] focus-visible:ring-offset-2 disabled:cursor-not-allowed"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-[#4b5563]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#22c55e] transition hover:text-[#16a34a]"
            >
              Signup
            </Link>
          </p>
        </section>
      </div>

      <p className="mt-8 text-center text-xs font-semibold text-[#4b5563]">
        Secure. Private. Built for your future.
      </p>
    </main>
  );
}