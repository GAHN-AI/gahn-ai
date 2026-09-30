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
type ViewMode = "snapshot" | "full";

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
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
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
  if (!value) return "Waiting for analytics data";
  const date = new Date(value);
  return `Updated ${date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  })}`;
}

function rangeLabel(range: RangeKey) {
  if (range === "24h") return "Last 24 hours";
  if (range === "7d") return "Last 7 days";
  if (range === "30d") return "Last 30 days";
  return "Last 90 days";
}

function MetricCard({
  label,
  value,
  detail,
  Icon,
  featured = false,
}: {
  label: string;
  value: string;
  detail: string;
  Icon: typeof Activity;
  featured?: boolean;
}) {
  return (
    <article
      className={
        featured
          ? "rounded-[1.4rem] bg-[#07162F] p-5 text-white shadow-[0_14px_34px_rgba(7,22,47,0.12)]"
          : "rounded-[1.4rem] border border-[#D8E0EA] bg-white p-5 shadow-[0_10px_26px_rgba(11,23,57,0.04)]"
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-[11px] font-black uppercase tracking-[0.14em] ${
              featured ? "text-[#8DB8FF]" : "text-[#65758A]"
            }`}
          >
            {label}
          </p>
          <p
            className={`mt-3 text-3xl font-black tracking-[-0.04em] ${
              featured ? "text-white" : "text-[#0B1739]"
            }`}
          >
            {value}
          </p>
          <p
            className={`mt-2 text-xs font-medium leading-5 ${
              featured ? "text-white/70" : "text-[#52647C]"
            }`}
          >
            {detail}
          </p>
        </div>
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
            featured
              ? "bg-white/10 text-white"
              : "bg-[#EAF3FF] text-[#1677FF]"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </article>
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
    <section className="overflow-hidden rounded-[1.4rem] border border-[#D8E0EA] bg-white shadow-[0_10px_28px_rgba(11,23,57,0.04)]">
      <div className="border-b border-[#E6ECF3] px-5 py-4 sm:px-6">
        <h2 className="text-base font-black tracking-[-0.02em] text-[#0B1739]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs font-medium leading-5 text-[#65758A]">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function RankingList({ items }: { items: RankedItem[] }) {
  const max = Math.max(...items.map((item) => item.count), 1);

  if (!items.length) {
    return <div className="p-6 text-sm text-[#65758A]">No data yet.</div>;
  }

  return (
    <div className="divide-y divide-[#EEF2F7]">
      {items.slice(0, 10).map((item) => (
        <div key={item.name || "Unknown"} className="px-5 py-3.5 sm:px-6">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="min-w-0 truncate font-bold text-[#33455F]">
              {item.name || "Unknown"}
            </span>
            <span className="shrink-0 font-black text-[#0B1739]">
              {formatNumber(item.count)}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EEF2F7]">
            <div
              className="h-full rounded-full bg-[#1677FF]"
              style={{ width: `${Math.max(4, (item.count / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TrafficChart({ points }: { points: TrafficPoint[] }) {
  const max = Math.max(
    ...points.flatMap((point) => [point.pageViews, point.visitors]),
    1
  );

  if (!points.length) {
    return (
      <div className="grid min-h-72 place-items-center p-6 text-sm text-[#65758A]">
        Traffic will appear after website visits are recorded.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto px-5 py-6 sm:px-6">
      <div className="mb-5 flex items-center gap-5 text-xs font-bold text-[#65758A]">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#1677FF]" />
          Page views
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#93BFFF]" />
          Visitors
        </span>
      </div>

      <div className="flex min-w-[660px] items-end gap-2" style={{ height: 250 }}>
        {points.map((point) => {
          const pageHeight = Math.max(7, (point.pageViews / max) * 190);
          const visitorHeight = Math.max(5, (point.visitors / max) * 190);
          const date = new Date(point.bucket);
          const label =
            points.length <= 30
              ? date.toLocaleTimeString([], { hour: "numeric" })
              : date.toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                });

          return (
            <div
              key={point.bucket}
              className="flex min-w-0 flex-1 flex-col items-center justify-end"
            >
              <div className="mb-2 text-[10px] font-black text-[#52647C]">
                {formatNumber(point.pageViews)}
              </div>
              <div className="flex w-full items-end justify-center gap-1">
                <div
                  className="w-[42%] min-w-[4px] rounded-t-md bg-[#1677FF]"
                  style={{ height: pageHeight }}
                  title={`${point.pageViews} page views`}
                />
                <div
                  className="w-[42%] min-w-[4px] rounded-t-md bg-[#93BFFF]"
                  style={{ height: visitorHeight }}
                  title={`${point.visitors} visitors`}
                />
              </div>
              <span className="mt-2 max-w-16 truncate text-[10px] font-medium text-[#7C8A9D]">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return <div className="p-6 text-sm text-[#65758A]">{children}</div>;
}

export default function LiveAnalyticsDashboard() {
  const [range, setRange] = useState<RangeKey>("30d");
  const [viewMode, setViewMode] = useState<ViewMode>("snapshot");
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

        if (!response.ok) {
          throw new Error(`Analytics request failed: ${response.status}`);
        }

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
    const interval = window.setInterval(() => void load(), 5000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [range]);

  const returningShare = useMemo(() => {
    const total = data.newVisitors + data.returningVisitors;
    return total ? (data.returningVisitors / total) * 100 : 0;
  }, [data.newVisitors, data.returningVisitors]);

  const signupConversion = useMemo(() => {
    return data.totalVisitors
      ? Math.min(100, (data.totalAccounts / data.totalVisitors) * 100)
      : 0;
  }, [data.totalAccounts, data.totalVisitors]);

  const topSource = data.sources[0]?.name || "No source data yet";
  const topCountry = data.countries[0]?.name || "No country data yet";
  const topPage = data.topPages[0]?.path || "No page data yet";

  return (
    <main className="min-h-screen bg-[#F4F7FB] px-4 py-6 font-sans text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <header className="overflow-hidden rounded-[1.75rem] bg-[#07162F] text-white shadow-[0_18px_42px_rgba(7,22,47,0.14)]">
          <div className="grid gap-8 px-6 py-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:px-8">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8DB8FF]">
                  GAHN AI Admin
                </p>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/80">
                  Real website data
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">
                Growth & Web Analytics
              </h1>
              <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-white/75 sm:text-base">
                A clean view of GAHN&apos;s audience, acquisition, engagement,
                geography, devices, pages, and live website activity. Admin
                traffic is excluded.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="inline-flex rounded-xl border border-white/15 bg-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("snapshot")}
                  className={`rounded-lg px-4 py-2 text-xs font-black ${
                    viewMode === "snapshot"
                      ? "bg-white text-[#07162F]"
                      : "text-white/75"
                  }`}
                >
                  Investor snapshot
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("full")}
                  className={`rounded-lg px-4 py-2 text-xs font-black ${
                    viewMode === "full"
                      ? "bg-white text-[#07162F]"
                      : "text-white/75"
                  }`}
                >
                  Full analytics
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 text-xs font-bold text-white/70">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    connected ? "bg-emerald-400" : "bg-red-400"
                  }`}
                />
                {connected ? "Live · refreshes every 5s" : "Reconnecting"}
                <RefreshCw className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          <div className="grid border-t border-white/10 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "All-time visitors",
                value: formatNumber(data.totalVisitors),
                detail: "Unique browser visitors recorded",
              },
              {
                label: "Registered users",
                value: formatNumber(data.totalAccounts),
                detail: "Accounts created on GAHN",
              },
              {
                label: "Visitor → signup",
                value: formatPercent(signupConversion),
                detail: "Registered users ÷ all-time visitors",
              },
              {
                label: "Online now",
                value: formatNumber(data.onlineNow),
                detail: `${data.signedInNow} signed in · ${data.anonymousNow} anonymous`,
              },
            ].map((item, index) => (
              <div
                key={item.label}
                className={`px-6 py-5 lg:px-8 ${
                  index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""
                } ${index === 2 ? "sm:border-l-0 sm:border-t xl:border-l xl:border-t-0" : ""}`}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#8DB8FF]">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-black tracking-[-0.035em] text-white">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-medium text-white/60">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </header>

        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-[#D8E0EA] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black text-[#0B1739]">
              {error || formatUpdated(data.generatedAt)}
            </p>
            <p className="mt-1 text-[11px] font-medium text-[#7C8A9D]">
              Visitors are counted with a browser-level anonymous ID. Clearing
              browser storage or changing browsers can create a new visitor.
            </p>
          </div>

          <div className="inline-flex self-start rounded-xl bg-[#EEF2F7] p-1 sm:self-auto">
            {(["24h", "7d", "30d", "90d"] as RangeKey[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRange(item)}
                className={`rounded-lg px-3 py-2 text-xs font-black ${
                  range === item
                    ? "bg-[#07162F] text-white"
                    : "text-[#52647C]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1677FF]">
                {rangeLabel(range)}
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.035em] text-[#0B1739]">
                Audience performance
              </h2>
            </div>
            <p className="text-xs font-bold text-[#65758A]">
              {data.activePages} page{data.activePages === 1 ? "" : "s"} active right now
            </p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <MetricCard
              label="Unique visitors"
              value={formatNumber(data.uniqueVisitors)}
              detail="Different visitors in this period"
              Icon={Users}
              featured
            />
            <MetricCard
              label="Page views"
              value={formatNumber(data.pageViews)}
              detail={`${data.pagesPerSession.toFixed(2)} pages per session`}
              Icon={Eye}
            />
            <MetricCard
              label="Sessions"
              value={formatNumber(data.sessions)}
              detail="Visits during this period"
              Icon={MousePointerClick}
            />
            <MetricCard
              label="Avg. session"
              value={formatDuration(data.avgSessionSeconds)}
              detail="Average time per website session"
              Icon={Clock3}
            />
            <MetricCard
              label="Bounce rate"
              value={formatPercent(data.bounceRate)}
              detail="Single-page sessions"
              Icon={Route}
            />
            <MetricCard
              label="Returning"
              value={formatPercent(returningShare)}
              detail={`${formatNumber(data.returningVisitors)} returning visitors`}
              Icon={Activity}
            />
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.7fr]">
          <Panel
            title="Traffic trend"
            subtitle="Website page views and unique visitors across the selected period."
          >
            <TrafficChart points={data.traffic} />
          </Panel>

          <Panel
            title="Investor quick read"
            subtitle="A few audience signals you can explain without digging through the full dashboard."
          >
            <div className="grid divide-y divide-[#EEF2F7]">
              {[
                ["Top traffic source", topSource],
                ["Most-viewed page", topPage],
                ["Top country", topCountry],
                ["New visitors", formatNumber(data.newVisitors)],
                ["Returning visitors", formatNumber(data.returningVisitors)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
                >
                  <span className="text-xs font-bold text-[#65758A]">{label}</span>
                  <span className="min-w-0 max-w-[58%] truncate text-right text-sm font-black text-[#0B1739]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <Panel title="Top pages" subtitle="The pages getting the most attention.">
            {data.topPages.length ? (
              <div>
                <div className="grid grid-cols-[minmax(0,1fr)_88px_88px] gap-3 border-b border-[#EEF2F7] bg-[#F8FAFD] px-5 py-3 text-[10px] font-black uppercase tracking-[0.1em] text-[#7C8A9D] sm:px-6">
                  <span>Page</span>
                  <span className="text-right">Views</span>
                  <span className="text-right">Visitors</span>
                </div>
                <div className="divide-y divide-[#EEF2F7]">
                  {data.topPages.slice(0, 10).map((page) => (
                    <div
                      key={page.path}
                      className="grid grid-cols-[minmax(0,1fr)_88px_88px] items-center gap-3 px-5 py-3.5 text-sm sm:px-6"
                    >
                      <code className="truncate text-xs font-bold text-[#33455F]">
                        {page.path}
                      </code>
                      <span className="text-right font-black text-[#0B1739]">
                        {formatNumber(page.pageViews)}
                      </span>
                      <span className="text-right font-bold text-[#65758A]">
                        {formatNumber(page.visitors)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState>No page views yet.</EmptyState>
            )}
          </Panel>

          <Panel
            title="Live right now"
            subtitle="Visitors with activity in roughly the last 45 seconds."
          >
            <div className="grid grid-cols-3 border-b border-[#EEF2F7]">
              {[
                ["Online", data.onlineNow],
                ["Signed in", data.signedInNow],
                ["Anonymous", data.anonymousNow],
              ].map(([label, value], index) => (
                <div
                  key={String(label)}
                  className={`p-4 text-center ${
                    index > 0 ? "border-l border-[#EEF2F7]" : ""
                  }`}
                >
                  <p className="text-2xl font-black text-[#0B1739]">{value}</p>
                  <p className="mt-1 text-[11px] font-bold text-[#65758A]">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {data.livePages.length ? (
              <div className="divide-y divide-[#EEF2F7]">
                {data.livePages.slice(0, 8).map((page) => (
                  <div
                    key={page.path}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-6"
                  >
                    <code className="min-w-0 truncate text-xs font-bold text-[#33455F]">
                      {page.path}
                    </code>
                    <span className="rounded-full bg-[#EAF3FF] px-2.5 py-1 text-xs font-black text-[#1677FF]">
                      {page.count}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState>No visitors online right now.</EmptyState>
            )}
          </Panel>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Panel title="Traffic sources" subtitle="Where sessions originated.">
            <RankingList items={data.sources} />
          </Panel>
          <Panel title="Entry pages" subtitle="First page opened in each session.">
            <RankingList items={data.entryPages} />
          </Panel>
          <Panel title="Countries" subtitle="Country-level audience distribution.">
            <RankingList items={data.countries} />
          </Panel>
          <Panel title="Devices" subtitle="Desktop, mobile, and tablet usage.">
            <div className="flex items-center gap-3 px-5 pt-5 text-xs font-bold text-[#65758A] sm:px-6">
              <Laptop className="h-4 w-4 text-[#1677FF]" />
              Desktop
              <Smartphone className="ml-2 h-4 w-4 text-[#1677FF]" />
              Mobile
            </div>
            <RankingList items={data.devices} />
          </Panel>
        </div>

        {viewMode === "full" && (
          <>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <Panel title="Referrers" subtitle="External sites sending traffic.">
                <RankingList items={data.referrers} />
              </Panel>
              <Panel title="Campaigns" subtitle="UTM campaign attribution.">
                <RankingList items={data.campaigns} />
              </Panel>
              <Panel title="Cities" subtitle="Available city-level audience data.">
                <RankingList items={data.cities} />
              </Panel>
              <Panel title="Languages" subtitle="Browser language preferences.">
                <RankingList items={data.languages} />
              </Panel>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <Panel title="Browsers" subtitle="Browser usage across sessions.">
                <RankingList items={data.browsers} />
              </Panel>
              <Panel title="Operating systems" subtitle="OS distribution across sessions.">
                <RankingList items={data.operatingSystems} />
              </Panel>
              <Panel title="Time zones" subtitle="Visitor browser time zones.">
                <RankingList items={data.timezones} />
              </Panel>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
              <Panel title="Audience loyalty" subtitle="New versus returning visitors in this period.">
                <div className="grid grid-cols-2 gap-4 p-5 sm:p-6">
                  <div className="rounded-xl bg-[#F4F7FB] p-5">
                    <p className="text-3xl font-black text-[#0B1739]">
                      {formatNumber(data.newVisitors)}
                    </p>
                    <p className="mt-2 text-xs font-bold text-[#65758A]">
                      New visitors
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F4F7FB] p-5">
                    <p className="text-3xl font-black text-[#0B1739]">
                      {formatNumber(data.returningVisitors)}
                    </p>
                    <p className="mt-2 text-xs font-bold text-[#65758A]">
                      Returning visitors
                    </p>
                  </div>
                </div>
              </Panel>

              <Panel
                title="Live visitor details"
                subtitle="Anonymous operational view. GAHN does not store IP addresses here."
              >
                {data.liveVisitors.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-sm">
                      <thead className="bg-[#F8FAFD] text-[10px] font-black uppercase tracking-[0.1em] text-[#7C8A9D]">
                        <tr>
                          <th className="px-5 py-3 sm:px-6">Page</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Location</th>
                          <th className="px-4 py-3">Device</th>
                          <th className="px-4 py-3">Browser</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EEF2F7]">
                        {data.liveVisitors.map((visitor, index) => (
                          <tr key={`${visitor.visitorId}-${index}`}>
                            <td className="max-w-[300px] truncate px-5 py-3 font-mono text-xs font-bold text-[#33455F] sm:px-6">
                              {visitor.path}
                            </td>
                            <td className="px-4 py-3 font-bold text-[#33455F]">
                              {visitor.authenticated ? "Signed in" : "Anonymous"}
                            </td>
                            <td className="px-4 py-3 text-[#65758A]">
                              {visitor.city ? `${visitor.city}, ` : ""}
                              {visitor.country || "Unknown"}
                            </td>
                            <td className="px-4 py-3 text-[#65758A]">
                              {visitor.device}
                            </td>
                            <td className="px-4 py-3 text-[#65758A]">
                              {visitor.browser}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <EmptyState>No active visitor sessions.</EmptyState>
                )}
              </Panel>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <Panel title="Recent activity" subtitle="Newest page views across GAHN.">
                {data.recentActivity.length ? (
                  <div className="max-h-[520px] divide-y divide-[#EEF2F7] overflow-y-auto">
                    {data.recentActivity.map((item, index) => (
                      <div
                        key={`${item.createdAt}-${index}`}
                        className="px-5 py-3.5 sm:px-6"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <code className="min-w-0 truncate text-xs font-black text-[#33455F]">
                            {item.path}
                          </code>
                          <span className="shrink-0 text-[11px] font-medium text-[#7C8A9D]">
                            {new Date(item.createdAt).toLocaleTimeString([], {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="mt-1 text-xs font-medium text-[#65758A]">
                          {item.country || "Unknown"} · {item.device} · {item.browser} · {item.source}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState>No recent activity yet.</EmptyState>
                )}
              </Panel>

              <Panel
                title="What these numbers mean"
                subtitle="Use this section when explaining the dashboard to investors."
              >
                <div className="grid divide-y divide-[#EEF2F7] text-sm">
                  {[
                    ["All-time visitors", "Unique browser IDs recorded since GAHN analytics started."],
                    ["Registered users", "Profiles created by people who signed up."],
                    ["Visitor → signup", "Registered users divided by all-time unique visitors."],
                    ["Bounce rate", "Sessions that viewed only one page."],
                    ["Returning", "Visitors in the selected period who were seen before."],
                    ["Online now", "Sessions active within roughly the last 45 seconds."],
                  ].map(([label, explanation]) => (
                    <div key={label} className="px-5 py-4 sm:px-6">
                      <p className="font-black text-[#0B1739]">{label}</p>
                      <p className="mt-1 text-xs font-medium leading-5 text-[#65758A]">
                        {explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </>
        )}

        <footer className="mt-6 rounded-2xl border border-[#D8E0EA] bg-white px-5 py-4 text-xs font-medium leading-5 text-[#65758A]">
          GAHN tracks page views, anonymous visitors, sessions, traffic sources,
          UTM campaigns, entry pages, geography, devices, browsers, operating
          systems, languages, time zones, live presence, and registered accounts.
          Location comes from hosting-provided headers; this analytics system does
          not store visitor IP addresses.
        </footer>
      </div>
    </main>
  );
}
