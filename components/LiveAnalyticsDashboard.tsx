"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Clock3,
  Eye,
  Globe2,
  Laptop,
  MousePointerClick,
  RefreshCw,
  Route,
  Smartphone,
  Users,
} from "lucide-react";

type RangeKey = "24h" | "7d" | "30d" | "90d";

type RankedItem = { name: string; count: number };
type PageItem = { path: string; pageViews: number; visitors: number };
type LivePage = { path: string; count: number };
type TrafficPoint = { bucket: string; pageViews: number; visitors: number };
type LiveVisitor = {
  visitorId: string;
  path: string;
  authenticated: boolean;
  country: string;
  city: string;
  device: string;
  browser: string;
  lastSeenAt: string;
};
type RecentActivity = {
  path: string;
  createdAt: string;
  country: string;
  device: string;
  browser: string;
  source: string;
};

type AnalyticsData = {
  generatedAt: string;
  range: RangeKey;
  since: string;
  onlineNow: number;
  signedInNow: number;
  anonymousNow: number;
  activePages: number;
  totalVisitors: number;
  totalAccounts: number;
  uniqueVisitors: number;
  sessions: number;
  pageViews: number;
  bounceRate: number;
  avgSessionSeconds: number;
  pagesPerSession: number;
  newVisitors: number;
  returningVisitors: number;
  livePages: LivePage[];
  liveVisitors: LiveVisitor[];
  traffic: TrafficPoint[];
  topPages: PageItem[];
  entryPages: RankedItem[];
  sources: RankedItem[];
  referrers: RankedItem[];
  campaigns: RankedItem[];
  countries: RankedItem[];
  cities: RankedItem[];
  devices: RankedItem[];
  browsers: RankedItem[];
  operatingSystems: RankedItem[];
  languages: RankedItem[];
  timezones: RankedItem[];
  recentActivity: RecentActivity[];
};

const emptyData: AnalyticsData = {
  generatedAt: "",
  range: "24h",
  since: "",
  onlineNow: 0,
  signedInNow: 0,
  anonymousNow: 0,
  activePages: 0,
  totalVisitors: 0,
  totalAccounts: 0,
  uniqueVisitors: 0,
  sessions: 0,
  pageViews: 0,
  bounceRate: 0,
  avgSessionSeconds: 0,
  pagesPerSession: 0,
  newVisitors: 0,
  returningVisitors: 0,
  livePages: [],
  liveVisitors: [],
  traffic: [],
  topPages: [],
  entryPages: [],
  sources: [],
  referrers: [],
  campaigns: [],
  countries: [],
  cities: [],
  devices: [],
  browsers: [],
  operatingSystems: [],
  languages: [],
  timezones: [],
  recentActivity: [],
};

function number(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatDuration(seconds: number) {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.round(seconds % 60);
  if (minutes < 60) return `${minutes}m ${remaining}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

function formatUpdated(value: string) {
  if (!value) return "Waiting for data";
  const date = new Date(value);
  return `Updated ${date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  })}`;
}

function StatCard({
  label,
  value,
  detail,
  Icon,
}: {
  label: string;
  value: string;
  detail?: string;
  Icon: typeof Activity;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
          {detail && <p className="mt-2 text-xs text-slate-500">{detail}</p>}
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function RankingList({ items }: { items: RankedItem[] }) {
  const max = Math.max(...items.map((item) => item.count), 1);

  if (!items.length) {
    return <div className="p-6 text-sm text-slate-500">No data yet.</div>;
  }

  return (
    <div className="divide-y divide-slate-100">
      {items.slice(0, 10).map((item) => (
        <div key={item.name} className="px-5 py-3.5 sm:px-6">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="min-w-0 truncate font-medium text-slate-700">
              {item.name || "Unknown"}
            </span>
            <span className="shrink-0 font-semibold text-slate-950">
              {formatNumber(item.count)}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{ width: `${Math.max(4, (item.count / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TrafficChart({ points }: { points: TrafficPoint[] }) {
  const max = Math.max(...points.map((point) => point.pageViews), 1);

  if (!points.length) {
    return (
      <div className="grid min-h-64 place-items-center p-6 text-sm text-slate-500">
        Traffic will appear after page views are recorded.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto px-5 py-6 sm:px-6">
      <div className="flex min-w-[620px] items-end gap-2" style={{ height: 260 }}>
        {points.map((point) => {
          const height = Math.max(8, (point.pageViews / max) * 210);
          const date = new Date(point.bucket);
          const label =
            points.length <= 30
              ? date.toLocaleTimeString([], { hour: "numeric" })
              : date.toLocaleDateString([], { month: "short", day: "numeric" });

          return (
            <div key={point.bucket} className="flex min-w-0 flex-1 flex-col items-center justify-end">
              <div className="mb-2 text-center text-[10px] font-semibold text-slate-500">
                {point.pageViews}
              </div>
              <div
                className="w-full min-w-[8px] rounded-t-md bg-blue-500"
                style={{ height }}
                title={`${point.pageViews} page views · ${point.visitors} visitors`}
              />
              <span className="mt-2 max-w-14 truncate text-[10px] text-slate-400">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function LiveAnalyticsDashboard() {
  const [range, setRange] = useState<RangeKey>("24h");
  const [data, setData] = useState<AnalyticsData>(emptyData);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    let running = false;

    const load = async () => {
      if (running) return;
      running = true;

      try {
        const response = await fetch(`/api/admin/analytics?range=${range}`, {
          cache: "no-store",
        });

        if (!response.ok) throw new Error(`Analytics request failed: ${response.status}`);

        const payload = (await response.json()) as Partial<AnalyticsData>;
        if (!active) return;

        setData({
          ...emptyData,
          ...payload,
          range,
          onlineNow: number(payload.onlineNow),
          signedInNow: number(payload.signedInNow),
          anonymousNow: number(payload.anonymousNow),
          activePages: number(payload.activePages),
          totalVisitors: number(payload.totalVisitors),
          totalAccounts: number(payload.totalAccounts),
          uniqueVisitors: number(payload.uniqueVisitors),
          sessions: number(payload.sessions),
          pageViews: number(payload.pageViews),
          bounceRate: number(payload.bounceRate),
          avgSessionSeconds: number(payload.avgSessionSeconds),
          pagesPerSession: number(payload.pagesPerSession),
          newVisitors: number(payload.newVisitors),
          returningVisitors: number(payload.returningVisitors),
        });
        setConnected(true);
        setError("");
      } catch (loadError) {
        console.error("Analytics dashboard refresh failed:", loadError);
        if (active) {
          setConnected(false);
          setError("Analytics could not refresh. Retrying automatically.");
        }
      } finally {
        running = false;
        if (active) setLoading(false);
      }
    };

    setLoading(true);
    void load();
    const interval = window.setInterval(() => void load(), 2000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [range]);

  const returningShare = useMemo(() => {
    const total = data.newVisitors + data.returningVisitors;
    return total ? Math.round((data.returningVisitors / total) * 100) : 0;
  }, [data.newVisitors, data.returningVisitors]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 lg:px-10 xl:px-12">
      <div className="mx-auto max-w-[1600px]">
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              GAHN AI Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Web Analytics
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              Real-time traffic, page performance, acquisition, engagement, devices,
              locations, and audience trends. Admin activity is excluded.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
              {(["24h", "7d", "30d", "90d"] as RangeKey[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRange(item)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold sm:px-4 ${
                    range === item
                      ? "bg-slate-950 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  connected ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
              <span className="font-medium text-slate-700">
                {connected ? "Live · 2s refresh" : "Reconnecting"}
              </span>
              <RefreshCw className={`h-4 w-4 text-slate-400 ${loading ? "animate-spin" : ""}`} />
            </div>
          </div>
        </header>

        <div className="mt-3 min-h-5 text-xs text-slate-500">
          {error || formatUpdated(data.generatedAt)}
        </div>

        <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          <StatCard label="Online now" value={formatNumber(data.onlineNow)} detail={`${data.signedInNow} signed in`} Icon={Activity} />
          <StatCard label="Unique visitors" value={formatNumber(data.uniqueVisitors)} detail={`Selected ${range}`} Icon={Users} />
          <StatCard label="Page views" value={formatNumber(data.pageViews)} detail={`${data.pagesPerSession.toFixed(2)} per session`} Icon={Eye} />
          <StatCard label="Sessions" value={formatNumber(data.sessions)} detail={`${data.activePages} active pages now`} Icon={MousePointerClick} />
          <StatCard label="Bounce rate" value={`${data.bounceRate.toFixed(1)}%`} detail="Single-page sessions" Icon={Route} />
          <StatCard label="Avg. session" value={formatDuration(data.avgSessionSeconds)} detail={`${returningShare}% returning`} Icon={Clock3} />
          <StatCard label="All-time visitors" value={formatNumber(data.totalVisitors)} detail={`${data.newVisitors} new in range`} Icon={Globe2} />
          <StatCard label="Accounts" value={formatNumber(data.totalAccounts)} detail="Registered profiles" Icon={Users} />
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">
          <Panel title="Traffic trend" subtitle="Page views and unique visitors over the selected period.">
            <TrafficChart points={data.traffic} />
          </Panel>

          <Panel title="Live right now" subtitle="Visitors active within the last 45 seconds.">
            <div className="grid grid-cols-3 border-b border-slate-100">
              <div className="p-4 text-center">
                <p className="text-2xl font-semibold">{data.onlineNow}</p>
                <p className="mt-1 text-xs text-slate-500">Online</p>
              </div>
              <div className="border-x border-slate-100 p-4 text-center">
                <p className="text-2xl font-semibold">{data.signedInNow}</p>
                <p className="mt-1 text-xs text-slate-500">Signed in</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-2xl font-semibold">{data.anonymousNow}</p>
                <p className="mt-1 text-xs text-slate-500">Anonymous</p>
              </div>
            </div>

            {data.livePages.length ? (
              <div className="divide-y divide-slate-100">
                {data.livePages.slice(0, 8).map((page) => (
                  <div key={page.path} className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
                    <code className="min-w-0 truncate text-xs font-medium text-slate-700">
                      {page.path}
                    </code>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {page.count}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-sm text-slate-500">No visitors online right now.</div>
            )}
          </Panel>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <Panel title="Top pages" subtitle="Most-viewed pages and unique audience.">
            {data.topPages.length ? (
              <div className="divide-y divide-slate-100">
                {data.topPages.map((page) => (
                  <div key={page.path} className="grid grid-cols-[minmax(0,1fr)_80px_80px] items-center gap-3 px-5 py-3.5 text-sm sm:px-6">
                    <code className="truncate font-medium text-slate-700">{page.path}</code>
                    <span className="text-right font-semibold text-slate-950">{page.pageViews}</span>
                    <span className="text-right text-slate-500">{page.visitors} users</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-sm text-slate-500">No page views yet.</div>
            )}
          </Panel>

          <Panel title="Recent activity" subtitle="Newest page views across the website.">
            {data.recentActivity.length ? (
              <div className="max-h-[520px] divide-y divide-slate-100 overflow-y-auto">
                {data.recentActivity.map((item, index) => (
                  <div key={`${item.createdAt}-${index}`} className="px-5 py-3.5 sm:px-6">
                    <div className="flex items-center justify-between gap-3">
                      <code className="min-w-0 truncate text-xs font-semibold text-slate-700">{item.path}</code>
                      <span className="shrink-0 text-[11px] text-slate-400">
                        {new Date(item.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.country} · {item.device} · {item.browser} · {item.source}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-sm text-slate-500">No recent activity yet.</div>
            )}
          </Panel>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Panel title="Traffic sources" subtitle="Where sessions came from."><RankingList items={data.sources} /></Panel>
          <Panel title="Referrers" subtitle="External sites sending traffic."><RankingList items={data.referrers} /></Panel>
          <Panel title="Entry pages" subtitle="First page opened in a session."><RankingList items={data.entryPages} /></Panel>
          <Panel title="Campaigns" subtitle="UTM campaign attribution."><RankingList items={data.campaigns} /></Panel>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Panel title="Countries" subtitle="Audience geography from hosting headers."><RankingList items={data.countries} /></Panel>
          <Panel title="Cities" subtitle="Available city-level audience data."><RankingList items={data.cities} /></Panel>
          <Panel title="Languages" subtitle="Browser language preferences."><RankingList items={data.languages} /></Panel>
          <Panel title="Time zones" subtitle="Visitor browser time zones."><RankingList items={data.timezones} /></Panel>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Panel title="Devices" subtitle="Desktop, mobile, and tablet usage.">
            <div className="flex items-center gap-3 px-5 pt-5 text-sm text-slate-500 sm:px-6">
              <Laptop className="h-4 w-4" /> Desktop
              <Smartphone className="ml-3 h-4 w-4" /> Mobile
            </div>
            <RankingList items={data.devices} />
          </Panel>
          <Panel title="Browsers" subtitle="Browser usage across sessions."><RankingList items={data.browsers} /></Panel>
          <Panel title="Operating systems" subtitle="OS distribution across sessions."><RankingList items={data.operatingSystems} /></Panel>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <Panel title="Audience loyalty" subtitle="New versus returning visitors in this period.">
            <div className="grid grid-cols-2 gap-4 p-5 sm:p-6">
              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-3xl font-semibold">{data.newVisitors}</p>
                <p className="mt-2 text-sm text-slate-500">New visitors</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-3xl font-semibold">{data.returningVisitors}</p>
                <p className="mt-2 text-sm text-slate-500">Returning</p>
              </div>
            </div>
          </Panel>

          <Panel title="Live visitor details" subtitle="Anonymous operational view; no IP addresses are stored.">
            {data.liveVisitors.length ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-5 py-3 sm:px-6">Page</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Device</th>
                      <th className="px-4 py-3">Browser</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.liveVisitors.map((visitor, index) => (
                      <tr key={`${visitor.visitorId}-${index}`}>
                        <td className="max-w-[300px] truncate px-5 py-3 font-mono text-xs text-slate-700 sm:px-6">{visitor.path}</td>
                        <td className="px-4 py-3">{visitor.authenticated ? "Signed in" : "Anonymous"}</td>
                        <td className="px-4 py-3 text-slate-600">{visitor.city ? `${visitor.city}, ` : ""}{visitor.country}</td>
                        <td className="px-4 py-3 text-slate-600">{visitor.device}</td>
                        <td className="px-4 py-3 text-slate-600">{visitor.browser}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 text-sm text-slate-500">No active visitor sessions.</div>
            )}
          </Panel>
        </div>

        <p className="mt-6 pb-4 text-xs leading-5 text-slate-500">
          Live counts use a 10-second visitor heartbeat and refresh here every 2 seconds.
          A visitor disappears from “Online now” after 45 seconds without activity.
          Location uses hosting-provided country/region/city headers; IP addresses are not stored.
        </p>
      </div>
    </main>
  );
}
