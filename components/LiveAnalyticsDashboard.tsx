"use client";

import { useEffect, useState } from "react";
import { Activity, Eye, LogIn, UsersRound } from "lucide-react";
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

const emptySnapshot: Snapshot = {
  total: 0,
  signedIn: 0,
  anonymous: 0,
  pages: [],
};

function summarizePresence(state: Record<string, PresenceMeta[]>): Snapshot {
  const visitors = new Map<string, PresenceMeta>();

  for (const metas of Object.values(state)) {
    for (const meta of metas) {
      const path = meta.path || "/";
      if (path.startsWith("/admin")) continue;

      const id = meta.visitor_id || meta.presence_ref;
      if (!id) continue;

      const current = visitors.get(id);
      if (!current || (meta.online_at ?? "") >= (current.online_at ?? "")) {
        visitors.set(id, meta);
      }
    }
  }

  const rows = [...visitors.values()];
  const signedIn = rows.filter((visitor) => visitor.authenticated).length;
  const pageCounts = new Map<string, number>();

  for (const visitor of rows) {
    const path = visitor.path || "/";
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

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className="rounded-xl bg-slate-100 p-2 text-slate-700">{icon}</div>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}

export default function LiveAnalyticsDashboard() {
  const [snapshot, setSnapshot] = useState<Snapshot>(emptySnapshot);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const channel = supabase.channel(PRESENCE_CHANNEL);

    const sync = () => {
      setSnapshot(
        summarizePresence(
          channel.presenceState() as unknown as Record<string, PresenceMeta[]>
        )
      );
    };

    channel
      .on("presence", { event: "sync" }, sync)
      .on("presence", { event: "join" }, sync)
      .on("presence", { event: "leave" }, sync)
      .subscribe((status) => {
        setConnected(status === "SUBSCRIBED");
        if (status === "SUBSCRIBED") sync();
      });

    return () => {
      void supabase.removeChannel(channel);
    };
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
                connected ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span className="font-medium text-slate-700">
              {connected ? "Live connection" : "Connecting..."}
            </span>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Online now"
            value={snapshot.total}
            icon={<Activity className="h-5 w-5" />}
          />
          <StatCard
            label="Signed in"
            value={snapshot.signedIn}
            icon={<LogIn className="h-5 w-5" />}
          />
          <StatCard
            label="Anonymous"
            value={snapshot.anonymous}
            icon={<UsersRound className="h-5 w-5" />}
          />
          <StatCard
            label="Active pages"
            value={snapshot.pages.length}
            icon={<Eye className="h-5 w-5" />}
          />
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
          Disconnects normally disappear within a few seconds. One browser is
          counted once even if it has multiple GAHN AI tabs open.
        </p>
      </div>
    </main>
  );
}
