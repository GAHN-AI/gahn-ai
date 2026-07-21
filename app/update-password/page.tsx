"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function UpdatePasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setLoading(false);
      setError(
        "This reset link is invalid or expired. Please request a new password reset email."
      );
      return;
    }

    const { error: logoutError } = await supabase.auth.signOut({
  scope: "local",
});

if (logoutError) {
  console.error("Logout after password update failed:", logoutError);
}

setLoading(false);
setMessage("Password updated successfully. Redirecting to login...");

setTimeout(() => {
  window.location.replace("/login");
}, 1500);
  }

  return (
    <main className="min-h-screen bg-[#f6f9ff] px-6 py-10 text-[#061633] lg:[zoom:0.55]">
      <div className="mx-auto mb-8 text-center">
        <img
          src="/logo/favicon.png"
          alt="GAHN AI"
          className="mx-auto mb-4 h-20 w-20 object-contain"
        />

        <h1 className="text-5xl font-black text-[#061633]">GAHN AI</h1>

        <p className="mt-1 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
          Global AI Human Helper Network
        </p>
      </div>

      <div className="mx-auto max-w-xl overflow-hidden rounded-[2rem] bg-white p-12 shadow-2xl">
        <h2 className="text-center text-4xl font-black">Create New Password</h2>

        <p className="mt-3 text-center text-slate-500">
          Enter and confirm your new password.
        </p>

        <form onSubmit={handleUpdatePassword} className="mt-10">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-lg outline-none focus:border-blue-400"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </form>
      </div>
    </main>
  );
}