"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");

    const params = new URLSearchParams(window.location.search);
    const errorType = params.get("error");

    if (errorType === "authentication_failed") {
      setError("Authentication failed. Please try again.");
    }

    if (errorType === "profile_setup_failed") {
      setError(
        "Your account was authenticated, but your profile could not be prepared. Please try again."
      );
    }
  }, []);

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

    try {
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (loginError) {
        setError(
          "Invalid email or password. If you use Google, click Continue with Google. Otherwise, reset your password or create an account."
        );
        return;
      }

      window.location.replace("/dashboard");
    } catch (loginRequestError) {
      console.error("Login failed:", loginRequestError);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setMessage("");
    setGoogleLoading(true);

    try {
      const { error: googleError } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            queryParams: {
              prompt: "select_account",
            },
          },
        });

      if (googleError) {
        setError("Google authentication failed. Please try again.");
      }
    } catch (googleRequestError) {
      console.error("Google authentication failed:", googleRequestError);
      setError("Google authentication failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError(
        "Enter your email address first, then click Forgot Password."
      );
      return;
    }

    setResetLoading(true);

    try {
      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
        });

      if (resetError) {
        setError("The password reset request failed. Please try again.");
        return;
      }

      setMessage(
        "If an account is connected to that email, a password reset email will be sent."
      );
    } catch (resetRequestError) {
      console.error("Password reset failed:", resetRequestError);
      setError("Something went wrong. Please try again.");
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f9ff] px-6 py-10 text-[#061633] lg:[zoom:0.55]">
      <div className="mx-auto mb-8 text-center">
        <img
          src="/logo/favicon.png"
          alt="GAHN AI"
          className="mx-auto mb-4 h-20 w-20 object-contain"
        />

        <h1 className="text-5xl font-black text-[#061633]">
          GAHN AI
        </h1>

        <p className="mt-1 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
          Global AI Human Helper Network
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl lg:grid-cols-2">
        <section className="relative overflow-hidden bg-[#02122b] p-12 text-white">
          <div className="absolute inset-0 bg-[#02122b]" />

          <div className="relative z-10">
            <h2 className="text-4xl font-black">
              Welcome Back
            </h2>

            <div className="mt-6 h-1 w-20 bg-blue-400" />

            <p className="mt-10 text-2xl leading-10">
              Continue your learning journey with{" "}
              <span className="text-blue-300">
                GAHN AI
              </span>
            </p>

            <div className="mt-12 space-y-8">
              {[
                [
                  "👨‍🏫",
                  "AI-Powered Instructors",
                  "Learn from intelligent AI instructors that adapt to you.",
                ],
                [
                  "🎓",
                  "Proven Learning Methods",
                  "Methods built to help you understand, retain, and apply.",
                ],
                [
                  "🚀",
                  "Real World Outcomes",
                  "Build real skills, complete projects, and achieve your goals.",
                ],
              ].map(([icon, title, text]) => (
                <div key={title} className="flex gap-5">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-blue-500/20 text-2xl">
                    {icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-black">
                      {title}
                    </h3>

                    <p className="mt-2 text-blue-100/75">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="p-12">
          <h2 className="text-center text-4xl font-black">
            Login
          </h2>

          <p className="mt-3 text-center text-slate-500">
            Welcome back. Log in to continue.
          </p>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="mt-10 flex w-full items-center justify-center gap-5 rounded-xl border border-slate-200 bg-white px-5 py-4 text-xl shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <img
              src="/google-logo/google.svg"
              alt="Google"
              className="h-8 w-8 object-contain"
            />

            <span>
              {googleLoading
                ? "Connecting..."
                : "Continue with Google"}
            </span>
          </button>

          <p className="mt-3 text-center text-sm text-slate-500">
            New Google users will create an account. Existing Google users
            will be logged in.
          </p>

          <div className="my-8 flex items-center gap-4 text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            OR
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleLogin} autoComplete="on">
            <input
              name="email"
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-lg outline-none focus:border-blue-400"
            />

            <input
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-5 w-full rounded-2xl border border-slate-200 px-5 py-4 text-lg outline-none focus:border-blue-400"
            />

            <div className="mt-5 flex justify-end text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={resetLoading}
                className="cursor-pointer text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {resetLoading
                  ? "Sending..."
                  : "Forgot Password?"}
              </button>
            </div>

            {error && (
              <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-600">
                {error}
              </p>
            )}

            {message && (
              <p className="mt-5 rounded-xl bg-green-50 p-4 text-green-700">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 flex w-full justify-center rounded-2xl bg-[#071f4d] px-5 py-4 text-lg font-black text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-blue-600"
            >
              Signup
            </Link>
          </p>
        </section>
      </div>

      <p className="mt-10 text-center text-slate-500">
        🔒 Secure. Private. Built for your future.
      </p>
    </main>
  );
}