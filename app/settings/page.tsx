"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, ExternalLink, LogOut, Settings2, ShieldCheck, UserRound } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paidPlan, setPaidPlan] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) {
        router.replace("/login");
        return;
      }
      try {
        const response = await fetch("/api/subscription/current", { cache: "no-store" });
        if (response.ok) {
          const details = await response.json();
          if (active) setPaidPlan(details.planId !== "explore");
        }
      } catch {
        // Account links remain available if billing cannot be loaded.
      }
      if (active) setLoading(false);
    }
    void load();
    return () => { active = false; };
  }, [router]);

  async function manageBilling() {
    if (billingLoading) return;
    setBillingLoading(true);
    setError("");
    try {
      const response = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error(data.error || "Could not open billing management.");
      window.location.assign(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open billing management.");
      setBillingLoading(false);
    }
  }

  async function logOut() {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      setError(signOutError.message);
      return;
    }
    router.replace("/login");
    router.refresh();
  }

  if (loading) {
    return <main className="min-h-screen bg-[#F7F8FA] p-8 text-[#0B1739]"><p role="status">Loading settings...</p></main>;
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] px-5 py-8 font-sans text-[#0B1739] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B5CFF]">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <div className="mt-8 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EAF2FF] text-[#0B5CFF]">
            <Settings2 className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
            <p className="mt-1 text-sm text-[#53657D]">Manage your account and privacy.</p>
          </div>
        </div>

        <section className="mt-8 overflow-hidden rounded-2xl border border-[#D7E3F2] bg-white">
          <Link href="/profile" className="flex items-center gap-4 border-b border-[#E5ECF5] p-5 transition hover:bg-[#F8FBFF]">
            <UserRound className="h-5 w-5 shrink-0 text-[#1677FF]" />
            <div className="flex-1">
              <h2 className="font-bold">Edit profile</h2>
              <p className="mt-1 text-sm text-[#53657D]">Update your name and profile image.</p>
            </div>
            <ExternalLink className="h-4 w-4 text-[#64748B]" />
          </Link>
          <Link href="/privacy" className="flex items-center gap-4 border-b border-[#E5ECF5] p-5 transition hover:bg-[#F8FBFF]">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#1677FF]" />
            <div className="flex-1">
              <h2 className="font-bold">Privacy policy</h2>
              <p className="mt-1 text-sm text-[#53657D]">How GAHN handles your information.</p>
            </div>
            <ExternalLink className="h-4 w-4 text-[#64748B]" />
          </Link>
          {paidPlan && (
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <CreditCard className="mt-1 h-5 w-5 shrink-0 text-[#1677FF]" />
                <div>
                  <h2 className="font-bold">Billing management</h2>
                  <p className="mt-1 text-sm text-[#53657D]">Manage an existing paid subscription securely.</p>
                </div>
              </div>
              <button type="button" onClick={() => void manageBilling()} disabled={billingLoading}
                className="rounded-xl bg-[#0B1739] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">
                {billingLoading ? "Opening..." : "Manage billing"}
              </button>
            </div>
          )}
          <div className="border-t border-[#E5ECF5] p-5">
            <button type="button" onClick={() => void logOut()} className="inline-flex items-center gap-2 text-sm font-semibold text-[#52647C] hover:text-[#0B5CFF]">
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </section>
        {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        <p className="mt-5 text-sm text-[#53657D]">
          Your current plan is already shown on the Dashboard. <Link href="/pricing" className="font-semibold text-[#0B5CFF] underline">Compare available plans</Link>.
        </p>
      </div>
    </main>
  );
}
