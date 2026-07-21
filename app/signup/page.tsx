"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Brain, Layers, Trophy } from "lucide-react";

const features = [
  { Icon: Brain, title: "Personalized Learning", text: "AI instructors adapt lessons and explanations to your needs." },
  { Icon: Layers, title: "Structured Learning Paths", text: "Follow guided learning journeys designed for real progress." },
  { Icon: Trophy, title: "Track Achievement", text: "Build skills, unlock milestones, and showcase growth." },
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
      setError("This Google account is already registered. Please login instead.");
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
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

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

      setMessage("Account created. Please check your email to verify your account.");
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
    <main className="min-h-screen bg-[#f5f7fb] px-6 py-10 font-sans text-[#111827]">
      <div className="mx-auto mb-8 text-center">
        <img src="/logo/favicon.png" alt="GAHN AI" className="mx-auto mb-4 h-16 w-16 object-contain" />
        <h1 className="text-4xl font-extrabold tracking-[-0.02em] text-[#111827]">GAHN AI</h1>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[#4b5563]">
          Global AI Human Helper Network
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-[#dbe3ee] bg-white shadow-sm lg:grid-cols-2">
        <section className="relative bg-[#eef5ff] p-10 text-[#111827] lg:p-12">
          <h2 className="text-3xl font-extrabold tracking-[-0.02em]">Start Your Journey</h2>
          <div className="mt-5 h-1 w-16 bg-[#0056d2]" />
          <p className="mt-8 text-lg leading-8 text-[#4b5563]">
            Build skills, master subjects, and grow with{" "}
            <span className="font-semibold text-[#0056d2]">GAHN AI</span>
          </p>

          <div className="mt-10 space-y-7">
            {features.map(({ Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#dbeafe]">
                  <Icon className="h-5 w-5 text-[#0056d2]" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#111827]">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-[#4b5563]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-10 lg:p-12">
          <h2 className="text-center text-3xl font-extrabold tracking-[-0.02em] text-[#111827]">Create Account</h2>
          <p className="mt-2 text-center text-sm text-[#4b5563]">
            Join GAHN AI and start learning today.
          </p>

          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={googleLoading}
            className="mt-8 flex w-full items-center justify-center gap-4 rounded-lg border border-[#dbe3ee] bg-white px-5 py-3.5 text-sm font-semibold shadow-sm transition hover:border-[#0056d2]/40 hover:bg-[#eef5ff] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <img src="/google-logo/google.svg" alt="Google" className="h-5 w-5 object-contain" />
            <span>{googleLoading ? "Connecting..." : "Continue with Google"}</span>
          </button>

          <div className="my-6 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.1em] text-[#4b5563]">
            <div className="h-px flex-1 bg-[#dbe3ee]" />
            Or
            <div className="h-px flex-1 bg-[#dbe3ee]" />
          </div>

          <form onSubmit={handleSignup}>
            <input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-lg border border-[#dbe3ee] px-4 py-3.5 text-sm outline-none focus:border-[#0056d2] focus:ring-2 focus:ring-[#0056d2]/15" />
            <input placeholder="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-4 w-full rounded-lg border border-[#dbe3ee] px-4 py-3.5 text-sm outline-none focus:border-[#0056d2] focus:ring-2 focus:ring-[#0056d2]/15" />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-4 w-full rounded-lg border border-[#dbe3ee] px-4 py-3.5 text-sm outline-none focus:border-[#0056d2] focus:ring-2 focus:ring-[#0056d2]/15" />
            <input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-4 w-full rounded-lg border border-[#dbe3ee] px-4 py-3.5 text-sm outline-none focus:border-[#0056d2] focus:ring-2 focus:ring-[#0056d2]/15" />

            {error && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm text-red-600">{error}</p>}
            {message && <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3.5 text-sm text-emerald-700">{message}</p>}

            <button type="submit" disabled={loading} className="mt-6 flex w-full justify-center rounded-lg bg-[#0056d2] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#00419e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0056d2] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#4b5563]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#0056d2]">
              Login
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