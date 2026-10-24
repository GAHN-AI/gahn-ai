import "server-only";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Browser-presence estimate, not a verified count of different people.
// Existing visitor heartbeats arrive every 10 seconds.
const ACTIVE_WINDOW_MS = 2 * 60 * 1000;
const MIN_ACTIVE_DURATION_MS = 5 * 1000;

export async function getActiveNow() {
  const since = new Date(Date.now() - ACTIVE_WINDOW_MS).toISOString();
  const activeBrowserIds = new Set<string>();
  const activeSignedInIds = new Set<string>();
  const perPage = 1000;

  for (let from = 0; ; from += perPage) {
    const { data, error } = await supabaseAdmin
      .from("analytics_sessions")
      .select("session_id, visitor_id, authenticated, started_at, last_seen_at")
      .eq("active", true)
      .gte("last_seen_at", since)
      .order("session_id", { ascending: true })
      .range(from, from + perPage - 1);

    if (error) throw error;

    for (const row of data ?? []) {
      const id = String(row.visitor_id ?? "");
      const start = Date.parse(String(row.started_at ?? ""));
      const last = Date.parse(String(row.last_seen_at ?? ""));

      if (!id || !Number.isFinite(start) || !Number.isFinite(last)) continue;
      if (last - start < MIN_ACTIVE_DURATION_MS) continue;

      activeBrowserIds.add(id);
      if (row.authenticated === true) activeSignedInIds.add(id);
    }

    if (!data || data.length < perPage) break;
  }

  return {
    activeNow: activeBrowserIds.size,
    activeSignedInNow: activeSignedInIds.size,
    activeWindowSeconds: ACTIVE_WINDOW_MS / 1000,
  };
}
