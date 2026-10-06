"use client";

import { useCallback, useEffect, useState } from "react";
import { Mail, RefreshCw, UserRoundPlus, Users } from "lucide-react";

type SignupEmail = {
  email: string;
  createdAt: string;
};

type AnalyticsData = {
  generatedAt: string;
  signupCount: number;
  signupEmails: SignupEmail[];
  anonymousVisitors: number;
  trackedVisitors: number;
};

const emptyData: AnalyticsData = {
  generatedAt: "",
  signupCount: 0,
  signupEmails: [],
  anonymousVisitors: 0,
  trackedVisitors: 0,
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatDate(value: string) {
  if (!value) return "Unknown";
  return new Date(value).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LiveAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/analytics", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Analytics request failed: ${response.status}`);
      }

      const payload = (await response.json()) as Partial<AnalyticsData>;

      setData({
        generatedAt: String(payload.generatedAt ?? ""),
        signupCount: Number(payload.signupCount ?? 0),
        signupEmails: Array.isArray(payload.signupEmails)
          ? payload.signupEmails
          : [],
        anonymousVisitors: Number(payload.anonymousVisitors ?? 0),
        trackedVisitors: Number(payload.trackedVisitors ?? 0),
      });

      setError("");
    } catch (loadError) {
      console.error("Admin audience summary failed:", loadError);
      setError("Could not refresh the admin data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();

    const interval = window.setInterval(() => {
      void load();
    }, 30_000);

    return () => window.clearInterval(interval);
  }, [load]);

  return (
    <main className="min-h-screen bg-[#F4F7FB] px-4 py-6 font-sans text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1050px]">
        <header className="rounded-[1.6rem] bg-[#07162F] px-6 py-7 text-white shadow-[0_18px_42px_rgba(7,22,47,0.14)] sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8DB8FF]">
                GAHN AI Admin
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                Users & Signups
              </h1>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white/70">
                A simple count of unique signup emails and visitors who used the
                website without ever signing in.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void load()}
              disabled={loading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 text-xs font-black text-white transition hover:bg-white/15 disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </header>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-[1.4rem] bg-[#07162F] p-6 text-white shadow-[0_14px_34px_rgba(7,22,47,0.12)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#8DB8FF]">
                  Unique signups
                </p>
                <p className="mt-3 text-4xl font-black tracking-[-0.04em]">
                  {formatNumber(data.signupCount)}
                </p>
                <p className="mt-2 text-sm font-medium text-white/70">
                  Different registered email addresses
                </p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10">
                <UserRoundPlus className="h-5 w-5" />
              </div>
            </div>
          </article>

          <article className="rounded-[1.4rem] border border-[#D8E0EA] bg-white p-6 shadow-[0_10px_26px_rgba(11,23,57,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#65758A]">
                  Anonymous visitors
                </p>
                <p className="mt-3 text-4xl font-black tracking-[-0.04em] text-[#0B1739]">
                  {formatNumber(data.anonymousVisitors)}
                </p>
                <p className="mt-2 text-sm font-medium text-[#52647C]">
                  Browser IDs that never signed in
                </p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF3FF] text-[#1677FF]">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </article>
        </section>

        <section className="mt-6 overflow-hidden rounded-[1.4rem] border border-[#D8E0EA] bg-white shadow-[0_10px_28px_rgba(11,23,57,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#E6ECF3] px-5 py-4 sm:px-6">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#EAF3FF] text-[#1677FF]">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-black text-[#0B1739]">Registered emails</h2>
              <p className="mt-0.5 text-xs font-medium text-[#65758A]">
                Each email is counted once, even if the account signs in many times.
              </p>
            </div>
          </div>

          {data.signupEmails.length ? (
            <div className="divide-y divide-[#EEF2F7]">
              {data.signupEmails.map((signup) => (
                <div
                  key={signup.email}
                  className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <span className="break-all text-sm font-bold text-[#0B1739]">
                    {signup.email}
                  </span>
                  <span className="text-xs font-medium text-[#7C8A9D]">
                    {formatDate(signup.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-5 py-6 text-sm font-medium text-[#65758A] sm:px-6">
              No registered emails yet.
            </div>
          )}
        </section>

        <div className="mt-4 rounded-xl border border-[#D8E0EA] bg-white px-5 py-4 text-xs font-medium leading-5 text-[#65758A]">
          Anonymous visitors cannot have emails shown because they never gave GAHN
          an email address. The anonymous count uses a browser ID stored on the
          device. The same person can still count again if they use another browser
          or device, private browsing, or clear browser storage.
          {data.trackedVisitors > 0 && (
            <span className="ml-1">
              GAHN currently has {formatNumber(data.trackedVisitors)} tracked browser
              IDs in total.
            </span>
          )}
        </div>

        <p className="mt-3 text-center text-[11px] font-medium text-[#8A97A8]">
          {data.generatedAt
            ? `Last refreshed ${new Date(data.generatedAt).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}`
            : "Waiting for data"}
        </p>
      </div>
    </main>
  );
}
