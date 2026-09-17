"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const VISITOR_ID_KEY = "gahn_presence_visitor_id";
const SESSION_ID_KEY = "gahn_analytics_session_id";
const ATTRIBUTION_KEY = "gahn_analytics_attribution";
const HEARTBEAT_MS = 10_000;

type Attribution = {
  referrer: string;
  source: string;
  medium: string;
  campaign: string;
};

function createId(prefix: string) {
  const value =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}_${Math.random().toString(36).slice(2)}`;
  return `${prefix}_${value}`;
}

function getVisitorId() {
  try {
    const existing = window.localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;
    const created = createId("visitor");
    window.localStorage.setItem(VISITOR_ID_KEY, created);
    return created;
  } catch {
    return createId("visitor");
  }
}

function getSessionId() {
  try {
    const existing = window.sessionStorage.getItem(SESSION_ID_KEY);
    if (existing) return existing;
    const created = createId("session");
    window.sessionStorage.setItem(SESSION_ID_KEY, created);
    return created;
  } catch {
    return createId("session");
  }
}

function getAttribution(): Attribution {
  try {
    const existing = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (existing) return JSON.parse(existing) as Attribution;
  } catch {
    // Fall through and rebuild attribution.
  }

  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";
  let source = params.get("utm_source") || "";

  if (!source && referrer) {
    try {
      const referrerHost = new URL(referrer).hostname.replace(/^www\./, "");
      const currentHost = window.location.hostname.replace(/^www\./, "");
      if (referrerHost && referrerHost !== currentHost) source = referrerHost;
    } catch {
      // Ignore malformed referrers.
    }
  }

  const attribution: Attribution = {
    referrer,
    source: source || "Direct",
    medium: params.get("utm_medium") || "",
    campaign: params.get("utm_campaign") || "",
  };

  try {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // Analytics should never interfere with the website.
  }

  return attribution;
}

export default function SitePresence() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;
  const visitorIdRef = useRef("");
  const sessionIdRef = useRef("");
  const currentPathRef = useRef(pathname || "/");
  const authenticatedRef = useRef(false);
  const initializedRef = useRef(false);
  const lastTrackedPathRef = useRef("");
  const attributionRef = useRef<Attribution>({
    referrer: "",
    source: "Direct",
    medium: "",
    campaign: "",
  });

  const buildPayload = useCallback(
    (action: "page_view" | "heartbeat" | "leave", pathOverride?: string) => ({
      action,
      visitor_id: visitorIdRef.current,
      session_id: sessionIdRef.current,
      path: pathOverride || currentPathRef.current || "/",
      title: typeof document !== "undefined" ? document.title : "",
      authenticated: authenticatedRef.current,
      referrer: attributionRef.current.referrer,
      source: attributionRef.current.source,
      medium: attributionRef.current.medium,
      campaign: attributionRef.current.campaign,
      language: typeof navigator !== "undefined" ? navigator.language : "",
      timezone:
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone || ""
          : "",
      screen_width: typeof window !== "undefined" ? window.innerWidth : null,
      screen_height: typeof window !== "undefined" ? window.innerHeight : null,
    }),
    []
  );

  const send = useCallback(
    async (action: "page_view" | "heartbeat" | "leave", pathOverride?: string) => {
      if (!visitorIdRef.current || !sessionIdRef.current || isAdminRoute) return;

      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildPayload(action, pathOverride)),
          keepalive: true,
          cache: "no-store",
        });
      } catch {
        // Analytics failures must never interrupt the user experience.
      }
    },
    [buildPayload, isAdminRoute]
  );

  const sendLeaveBeacon = useCallback(() => {
    if (!visitorIdRef.current || !sessionIdRef.current || isAdminRoute) return;

    try {
      const payload = JSON.stringify(buildPayload("leave"));
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/analytics/track", blob);
    } catch {
      // Best-effort disconnect signal.
    }
  }, [buildPayload, isAdminRoute]);

  useEffect(() => {
    currentPathRef.current = pathname || "/";

    if (
      initializedRef.current &&
      !isAdminRoute &&
      lastTrackedPathRef.current !== currentPathRef.current
    ) {
      lastTrackedPathRef.current = currentPathRef.current;
      void send("page_view", currentPathRef.current);
    }
  }, [pathname, isAdminRoute, send]);

  useEffect(() => {
    if (isAdminRoute) return;

    let active = true;
    visitorIdRef.current = getVisitorId();
    sessionIdRef.current = getSessionId();
    attributionRef.current = getAttribution();

    const initialize = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!active) return;
      authenticatedRef.current = Boolean(session?.user);
      initializedRef.current = true;
      lastTrackedPathRef.current = currentPathRef.current;
      await send("page_view", currentPathRef.current);
    };

    void initialize();

    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      authenticatedRef.current = Boolean(session?.user);
      if (initializedRef.current) void send("heartbeat");
    });

    const heartbeat = window.setInterval(() => {
      if (document.visibilityState === "visible") void send("heartbeat");
    }, HEARTBEAT_MS);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        void send("heartbeat");
      } else {
        sendLeaveBeacon();
      }
    };

    const handlePageHide = () => sendLeaveBeacon();

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      active = false;
      initializedRef.current = false;
      window.clearInterval(heartbeat);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", handlePageHide);
      authSubscription.unsubscribe();
      sendLeaveBeacon();
    };
  }, [isAdminRoute, send, sendLeaveBeacon]);

  return null;
}
