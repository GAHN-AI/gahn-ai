"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

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
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, []);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setMessage("");

    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      setError("Please enter your full name.");
      return;
    }

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error: signupError } =
        await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              full_name: cleanName,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

      if (signupError) {
        setError("Account creation failed. Please try again.");
        return;
      }

      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setMessage(
        "Check your email and click the verification link to finish creating your account. If the email is already registered, you may not receive another verification email."
      );
    } catch (signupRequestError) {
      console.error("Signup failed:", signupRequestError);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
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
          <div className="relative z-10">
            <h2 className="text-4xl font-black">
              Start Your Journey
            </h2>

            <div className="mt-6 h-1 w-20 bg-blue-400" />

            <p className="mt-10 text-2xl leading-10">
              Build skills, master subjects, and grow with{" "}
              <span className="text-blue-300">
                GAHN AI
              </span>
            </p>

            <div className="mt-12 space-y-8">
              {[
                [
                  "🧠",
                  "Personalized Learning",
                  "AI instructors adapt lessons and explanations to your needs.",
                ],
                [
                  "📚",
                  "Structured Learning Paths",
                  "Follow guided learning journeys designed for real progress.",
                ],
                [
                  "🏆",
                  "Track Achievement",
                  "Build skills, unlock milestones, and showcase growth.",
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
            Create Account
          </h2>

          <p className="mt-3 text-center text-slate-500">
            Join GAHN AI and start learning today.
          </p>

          <button
            type="button"
            onClick={handleGoogleSignup}
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

          <form onSubmit={handleSignup} autoComplete="off">
            <input
              name="fullName"
              placeholder="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-lg outline-none focus:border-blue-400"
            />

            <input
              name="signupEmail"
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="mt-5 w-full rounded-2xl border border-slate-200 px-5 py-4 text-lg outline-none focus:border-blue-400"
            />

            <input
              name="newPassword"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="mt-5 w-full rounded-2xl border border-slate-200 px-5 py-4 text-lg outline-none focus:border-blue-400"
            />

            <input
              name="confirmNewPassword"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              autoComplete="new-password"
              className="mt-5 w-full rounded-2xl border border-slate-200 px-5 py-4 text-lg outline-none focus:border-blue-400"
            />

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
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-blue-600"
            >
              Login
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