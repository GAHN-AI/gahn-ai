"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CreditCard,
  ExternalLink,
  Headphones,
  KeyRound,
  LogOut,
  MessageSquareText,
  Settings2,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { signOutAccount } from "@/lib/auth/browser";
import { supabase } from "@/lib/supabaseClient";
import { INTERACTIVE_LESSONS_AVAILABLE } from "@/lib/lessonLaunch";

const SOUND_KEY = "gahn-lesson-sound-enabled";
const AUTOREAD_KEY = "gahn-lesson-auto-read";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [paidPlan, setPaidPlan] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [confirmEverywhere, setConfirmEverywhere] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoRead, setAutoRead] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      setSoundEnabled(window.localStorage.getItem(SOUND_KEY) !== "off");
      setAutoRead(window.localStorage.getItem(AUTOREAD_KEY) === "on");

      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (!active) return;
        if (authError || !user) {
          router.replace("/login");
          return;
        }
        setEmail(user.email || "");
        const response = await fetch("/api/subscription/current", { cache: "no-store" });
        if (response.ok) {
          const details = await response.json();
          if (active) setPaidPlan(details.planId !== "explore");
        }
      } catch {
        if (active) setError("Some account details could not be loaded. You can still use the settings below.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, [router]);

  function changeSound(enabled: boolean) {
    setSoundEnabled(enabled);
    window.localStorage.setItem(SOUND_KEY, enabled ? "on" : "off");
    if (!enabled) window.speechSynthesis?.cancel();
    setMessage("Lesson audio preference saved on this device.");
  }

  function changeAutoRead(enabled: boolean) {
    setAutoRead(enabled);
    window.localStorage.setItem(AUTOREAD_KEY, enabled ? "on" : "off");
    setMessage("Automatic read-aloud preference saved on this device.");
  }

  async function sendPasswordReset() {
    if (!email || passwordLoading) return;
    setError("");
    setMessage("");
    setPasswordLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });
      if (resetError) throw resetError;
      setMessage("If a password setup or reset link can be sent to your email, check your inbox and spam folder. The link should open a page to enter a new password.");
    } catch {
      setError("Could not request a password reset right now. Please try again later.");
    } finally {
      setPasswordLoading(false);
    }
  }

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

  async function logOut(everywhere = false) {
    if (signOutLoading) return;
    setSignOutLoading(true);
    setError("");
    try { await signOutAccount(everywhere); }
    catch { setError("Unable to sign out. Please retry."); setSignOutLoading(false); }
  }

  if (loading) {
    return <main id="main-content" className="min-h-screen bg-[#F7F8FA] p-8 text-[#0B1739]"><p role="status">Loading settings...</p></main>;
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#F7F8FA] px-5 py-8 font-sans text-[#0B1739] sm:px-8">
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
            <p className="mt-1 text-sm text-[#53657D]">Account and security controls. Interactive lesson settings will appear when lessons launch.</p>
          </div>
        </div>

        {error && <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {message && <p role="status" className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">{message}</p>}

        <section aria-labelledby="settings-account" className="mt-8 overflow-hidden rounded-2xl border border-[#D7E3F2] bg-white">
          <h2 id="settings-account" className="border-b border-[#E5ECF5] px-5 py-4 text-base font-bold">Account</h2>
          <Link href="/profile" className="flex items-center gap-4 border-b border-[#E5ECF5] p-5 transition hover:bg-[#F8FBFF]">
            <UserRound className="h-5 w-5 shrink-0 text-[#1677FF]" />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold">Edit profile</h3>
              <p className="mt-1 text-sm text-[#53657D]">Change your name and profile image.</p>
            </div>
            <ExternalLink className="h-4 w-4 text-[#64748B]" />
          </Link>
          <div className="flex items-start gap-4 p-5">
            <KeyRound className="mt-0.5 h-5 w-5 shrink-0 text-[#1677FF]" />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold">Email and password sign-in</h3>
              <p className="mt-1 break-words text-sm text-[#53657D]">{email ? `Signed in as ${email}` : "Email address unavailable"}</p>
              <p className="mt-1 text-xs leading-5 text-[#64748B]">Get a secure email link to create or reset your password. If you joined with Google, you can use the same email for both Google sign-in and email/password sign-in.</p>
              <button type="button" onClick={() => void sendPasswordReset()} disabled={!email || passwordLoading}
                className="mt-3 rounded-lg border border-[#CCD9E9] px-4 py-2.5 text-sm font-semibold text-[#0B1739] hover:bg-[#F6F9FD] disabled:opacity-50">
                {passwordLoading ? "Sending..." : "Email password setup / reset link"}
              </button>
            </div>
          </div>
        </section>

        {INTERACTIVE_LESSONS_AVAILABLE && (
        <section aria-labelledby="settings-learning" className="mt-6 overflow-hidden rounded-2xl border border-[#D7E3F2] bg-white">
          <div className="flex items-center gap-3 border-b border-[#E5ECF5] px-5 py-4">
            <Headphones className="h-5 w-5 text-[#1677FF]" />
            <h2 id="settings-learning" className="text-base font-bold">Lesson audio</h2>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-[#E5ECF5] p-5">
            <div>
              <h3 className="text-sm font-semibold">Enable spoken lesson audio</h3>
              <p className="mt-1 text-xs leading-5 text-[#53657D]">Allow browser-generated read-aloud in text lessons. Does not enable Tavus audio.</p>
            </div>
            <button type="button" role="switch" aria-label="Enable spoken lesson audio" aria-checked={soundEnabled}
              onClick={() => changeSound(!soundEnabled)}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${soundEnabled ? "bg-[#1677FF]" : "bg-[#CBD5E1]"}`}>
              <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${soundEnabled ? "left-6" : "left-1"}`} />
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 p-5">
            <div>
              <h3 className="text-sm font-semibold">Read instructor replies aloud automatically</h3>
              <p className="mt-1 text-xs leading-5 text-[#53657D]">Uses browser speech where supported. Some browsers block automatic playback until you interact.</p>
            </div>
            <button type="button" role="switch" aria-label="Read instructor replies aloud automatically"
              aria-checked={autoRead} disabled={!soundEnabled} onClick={() => changeAutoRead(!autoRead)}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors disabled:opacity-50 ${autoRead ? "bg-[#1677FF]" : "bg-[#CBD5E1]"}`}>
              <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${autoRead ? "left-6" : "left-1"}`} />
            </button>
          </div>
          <p className="px-5 pb-4 text-xs text-[#64748B]">Audio preferences are saved in this browser, not across devices. Microphone access always starts muted.</p>
        </section>
        )}

        {paidPlan && (
          <section aria-labelledby="settings-billing" className="mt-6 rounded-2xl border border-[#D7E3F2] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <CreditCard className="mt-1 h-5 w-5 shrink-0 text-[#1677FF]" />
                <div>
                  <h2 id="settings-billing" className="font-bold">Billing management</h2>
                  <p className="mt-1 text-sm text-[#53657D]">Manage an existing paid subscription.</p>
                </div>
              </div>
              <button type="button" onClick={() => void manageBilling()} disabled={billingLoading}
                className="rounded-xl bg-[#0B1739] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">
                {billingLoading ? "Opening..." : "Manage billing"}
              </button>
            </div>
          </section>
        )}

        <section aria-labelledby="settings-help" className="mt-6 rounded-2xl border border-[#D7E3F2] bg-white p-5">
          <div className="flex items-center gap-3">
            <MessageSquareText className="h-5 w-5 text-[#1677FF]" />
            <h2 id="settings-help" className="font-bold">Help and feedback</h2>
          </div>
          <p className="mt-2 text-sm text-[#53657D]">Tell GAHN about a problem or send a question.</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <Link href="/feedback" className="font-semibold text-[#0B5CFF] underline">Send feedback</Link>
            <Link href="/contact" className="font-semibold text-[#0B5CFF] underline">Contact support</Link>
          </div>
        </section>

        <section aria-labelledby="settings-sessions" className="mt-6 rounded-2xl border border-[#D7E3F2] bg-white p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-[#1677FF]" />
            <h2 id="settings-sessions" className="font-bold">Active sessions</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#53657D]">Log out here, or revoke other signed-in sessions if you are worried someone else has access.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => void logOut()} disabled={signOutLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-[#CCD9E9] px-4 py-2.5 text-sm font-semibold text-[#0B1739] disabled:opacity-50">
              <LogOut className="h-4 w-4" /> Log out here
            </button>
            {!confirmEverywhere ? (
              <button type="button" onClick={() => setConfirmEverywhere(true)} disabled={signOutLoading}
                className="rounded-xl border border-[#FFD2D2] px-4 py-2.5 text-sm font-semibold text-[#B42318] disabled:opacity-50">
                Log out all devices
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-2 rounded-xl bg-[#FFF5F5] p-2">
                <span className="px-2 text-xs font-medium text-[#922320]">End all signed-in sessions?</span>
                <button type="button" disabled={signOutLoading} onClick={() => void logOut(true)}
                  className="rounded-lg bg-[#B42318] px-3 py-2 text-xs font-bold text-white disabled:opacity-50">
                  Confirm
                </button>
                <button type="button" onClick={() => setConfirmEverywhere(false)} disabled={signOutLoading}
                  className="rounded-lg border border-[#EACACA] px-3 py-2 text-xs font-bold text-[#922320]">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
