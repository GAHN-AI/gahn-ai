"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import PasswordInput from "@/components/auth/PasswordInput";
import { supabase } from "@/lib/supabaseClient";

type RecoveryStatus = "checking" | "ready" | "invalid";

export default function UpdatePasswordPage() {
  const [status, setStatus] = useState<RecoveryStatus>("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function validateSession() {
      try {
        // A password reset link is exchanged for a Supabase session by /auth/callback.
        const { data, error: authError } = await supabase.auth.getUser();
        if (mounted) setStatus(!authError && data.user ? "ready" : "invalid");
      } catch {
        if (mounted) setStatus("invalid");
      }
    }

    void validateSession();
    return () => { mounted = false; };
  }, []);

  async function handleUpdatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading || status !== "ready" || complete) return;

    setMessage("");
    setError("");

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
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError("Could not update your password. Try a stronger password or request a new reset link.");
        return;
      }

      setComplete(true);
      setPassword("");
      setConfirmPassword("");
      const { error: signOutError } = await supabase.auth.signOut({ scope: "local" });
      if (signOutError) console.error("Logout after password reset failed:", signOutError);
      setMessage("Password saved. You can sign in using your email address and new password. If you joined through Google, that sign-in method remains available.");
      if (!signOutError) window.setTimeout(() => window.location.replace("/login"), 1500);
    } catch {
      setError("Unable to connect to the authentication service. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F6F9FF] px-5 py-12 text-[#0B1739] sm:py-16">
      <div className="mx-auto max-w-xl">
        <header className="mb-8 text-center">
          <Link href="/" aria-label="GAHN AI home" className="inline-flex flex-col items-center">
            <img src="/logo/favicon.png" alt="" className="mb-3 h-16 w-16 object-contain" />
            <span className="text-3xl font-black">GAHN AI</span>
          </Link>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em]">Global AI Human Helper Network</p>
        </header>

        <section className="rounded-3xl border border-[#D7E3F2] bg-white p-6 shadow-xl sm:p-10">
          <h1 className="text-3xl font-black tracking-tight">Create or reset your password</h1>
          {status === "checking" ? (
            <p role="status" className="mt-5 text-sm text-[#53647D]">Checking your reset link...</p>
          ) : status === "invalid" ? (
            <div className="mt-6 space-y-5">
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                Your password setup or reset link may have expired, may not be authorized for this site, or could not be verified. Request another link from the login page.
              </p>
              <Link href="/login" className="inline-flex rounded-xl bg-[#1677FF] px-5 py-3 text-sm font-semibold text-white">
                Return to login
              </Link>
            </div>
          ) : (
            <>
              <p className="mt-3 text-sm leading-6 text-[#53647D]">
                Choose and confirm a new password of at least 8 characters. Your email address will be your login ID. You can still sign in with Google if you previously used it.
              </p>
              <form onSubmit={handleUpdatePassword} className="mt-7 space-y-5">
                <div>
                  <label htmlFor="newPassword" className="mb-2 block text-sm font-semibold">New password</label>
                  <PasswordInput
                    id="newPassword"
                    label="New password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Enter a new password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-[#D7E3F2] px-4 py-3.5 outline-none focus:border-[#1677FF]"
                  />
                </div>
                <div>
                  <label htmlFor="confirmNewPassword" className="mb-2 block text-sm font-semibold">Confirm new password</label>
                  <PasswordInput
                    id="confirmNewPassword"
                    label="Confirm new password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="Repeat your new password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-[#D7E3F2] px-4 py-3.5 outline-none focus:border-[#1677FF]"
                  />
                </div>
                {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
                {message && <p role="status" className="rounded-xl bg-blue-50 p-4 text-sm text-[#0B5CFF]">{message}</p>}
                <button
                  type="submit"
                  disabled={loading || complete}
                  className="w-full rounded-xl bg-[#1677FF] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0F65E8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Updating password..." : complete ? "Password updated" : "Update password"}
                </button>
              </form>
              <Link href="/login" className="mt-5 inline-block text-sm font-semibold text-[#1677FF] hover:underline">
                Back to login
              </Link>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
