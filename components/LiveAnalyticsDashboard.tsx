"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const PRESENCE_CHANNEL = "gahn-site-presence";

type PresenceMeta = {
  visitor_id?: string;
  authenticated?: boolean;
  path?: string;
  online_at?: string;
  presence_ref?: string;
};

type Snapshot = {
  total: number;
  signedIn: number;
  anonymous: number;
  pages: Array<{ path: string; count: number }>;
};

type CumulativeTotals = {
  totalVisitors: number;
  totalAccounts: number;
};

const emptySnapshot: Snapshot = {
  total: 0,
  signedIn: 0,
  anonymous: 0,
  pages: [],
};

const emptyTotals: CumulativeTotals = {
  totalVisitors: 0,
  totalAccounts: 0,
};

function isPresenceMeta(value: unknown): value is PresenceMeta {
  return typeof value === "object" && value !== null;
}

function summarizePresence(state: unknown): Snapshot {
  if (!state || typeof state !== "object") return emptySnapshot;

  const visitors = new Map<string, PresenceMeta>();

  for (const value of Object.values(state as Record<string, unknown>)) {
    if (!Array.isArray(value)) continue;

    for (const item of value) {
      if (!isPresenceMeta(item)) continue;

      const path = typeof item.path === "string" ? item.path : "/";
      if (path.startsWith("/admin")) continue;

      const id =
        typeof item.visitor_id === "string"
          ? item.visitor_id
          : typeof item.presence_ref === "string"
            ? item.presence_ref
            : null;

      if (!id) continue;

      const current = visitors.get(id);
      const itemTime = typeof item.online_at === "string" ? item.online_at : "";
      const currentTime =
        current && typeof current.online_at === "string" ? current.online_at : "";

      if (!current || itemTime >= currentTime) {
        visitors.set(id, {
          ...item,
          path,
          authenticated: item.authenticated === true,
        });
      }
    }
  }

  const rows = [...visitors.values()];
  const signedIn = rows.filter((visitor) => visitor.authenticated === true).length;
  const pageCounts = new Map<string, number>();

  for (const visitor of rows) {
    const path = typeof visitor.path === "string" ? visitor.path : "/";
    pageCounts.set(path, (pageCounts.get(path) ?? 0) + 1);
  }

  const pages = [...pageCounts.entries()]
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count || a.path.localeCompare(b.path));

  return {
    total: rows.length,
    signedIn,
    anonymous: rows.length - signedIn,
    pages,
  };
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}

export default function LiveAnalyticsDashboard() {
  const [snapshot, setSnapshot] = useState<Snapshot>(emptySnapshot);
  const [totals, setTotals] = useState<CumulativeTotals>(emptyTotals);
  const [connected, setConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    let active = true;

    const loadTotals = async () => {
      try {
        const response = await fetch("/api/admin/analytics-totals", {
          cache: "no-store",
        });

        if (!response.ok) return;

        const data = (await response.json()) as Partial<CumulativeTotals>;

        if (!active) return;

        setTotals({
          totalVisitors:
            typeof data.totalVisitors === "number" ? data.totalVisitors : 0,
          totalAccounts:
            typeof data.totalAccounts === "number" ? data.totalAccounts : 0,
        });
      } catch (error) {
        console.error("Cumulative analytics totals failed:", error);
      }
    };

    void loadTotals();
    const interval = window.setInterval(() => void loadTotals(), 5000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let active = true;

    try {
      const channel = supabase.channel(PRESENCE_CHANNEL);

      const sync = () => {
        if (!active) return;

        try {
          setSnapshot(summarizePresence(channel.presenceState()));
        } catch (error) {
          console.error("Live analytics presence sync failed:", error);
          setConnectionError(true);
        }
      };

      channel
        .on("presence", { event: "sync" }, sync)
        .on("presence", { event: "join" }, sync)
        .on("presence", { event: "leave" }, sync)
        .subscribe((status) => {
          if (!active) return;

          if (status === "SUBSCRIBED") {
            setConnected(true);
            setConnectionError(false);
            sync();
            return;
          }

          if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
            setConnected(false);
            setConnectionError(true);
          }

          if (status === "CLOSED") {
            setConnected(false);
          }
        });

      return () => {
        active = false;
        void supabase.removeChannel(channel);
      };
    } catch (error) {
      console.error("Live analytics setup failed:", error);
      setConnected(false);
      setConnectionError(true);
      return undefined;
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              GAHN AI Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Live website activity
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              A privacy-safe, near-live view of browsers currently connected to
              GAHN AI. Admin pages are excluded from the count.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                connected
                  ? "bg-emerald-500"
                  : connectionError
                    ? "bg-red-500"
                    : "bg-amber-500"
              }`}
            />
            <span className="font-medium text-slate-700">
              {connected
                ? "Live connection"
                : connectionError
                  ? "Connection unavailable"
                  : "Connecting..."}
            </span>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Online now" value={snapshot.total} />
          <StatCard label="Signed in" value={snapshot.signedIn} />
          <StatCard label="Anonymous" value={snapshot.anonymous} />
          <StatCard label="Active pages" value={snapshot.pages.length} />
          <StatCard label="Total visitors" value={totals.totalVisitors} />
          <StatCard label="Total accounts" value={totals.totalAccounts} />
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="text-lg font-semibold">Where visitors are now</h2>
            <p className="mt-1 text-sm text-slate-500">
              Counts update automatically as visitors move around or disconnect.
            </p>
          </div>

          {snapshot.pages.length === 0 ? (
            <div className="px-5 py-12 text-center sm:px-6">
              <p className="font-medium text-slate-700">No visitors online yet.</p>
              <p className="mt-1 text-sm text-slate-500">
                Open GAHN AI in another browser or device to test the live count.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {snapshot.pages.map(({ path, count }) => (
                <div
                  key={path}
                  className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
                >
                  <code className="min-w-0 truncate text-sm font-medium text-slate-700">
                    {path}
                  </code>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Disconnects normally disappear within a few seconds. A visitor is
          deduplicated by its browser visitor ID.
        </p>
      </div>
    </main>
  );
}
