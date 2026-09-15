"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

const PRESENCE_CHANNEL = "gahn-site-presence";
const VISITOR_ID_KEY = "gahn_presence_visitor_id";

function getVisitorId() {
  try {
    const existing = window.localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;

    const created =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `visitor_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    window.localStorage.setItem(VISITOR_ID_KEY, created);
    return created;
  } catch {
    return `visitor_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }
}

export default function SitePresence() {
  const pathname = usePathname();
  const channelRef = useRef<RealtimeChannel | null>(null);
  const visitorIdRef = useRef<string | null>(null);
  const pathRef = useRef(pathname || "/");
  const authenticatedRef = useRef(false);
  const subscribedRef = useRef(false);

  const trackCurrent = useCallback(async () => {
    const channel = channelRef.current;
    const visitorId = visitorIdRef.current;

    if (!channel || !visitorId || !subscribedRef.current) return;

    const path = pathRef.current || "/";

    // Do not count the owner/admin dashboard as a website visitor.
    if (path.startsWith("/admin")) {
      await channel.untrack();
      return;
    }

    await channel.track({
      visitor_id: visitorId,
      authenticated: authenticatedRef.current,
      path,
      online_at: new Date().toISOString(),
    });
  }, []);

  useEffect(() => {
    pathRef.current = pathname || "/";
    void trackCurrent();
  }, [pathname, trackCurrent]);

  useEffect(() => {
    visitorIdRef.current = getVisitorId();

    const channel = supabase.channel(PRESENCE_CHANNEL, {
      config: {
        presence: {
          key: visitorIdRef.current,
        },
      },
    });

    channelRef.current = channel;

    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      authenticatedRef.current = Boolean(session?.user);
      void trackCurrent();
    });

    channel.subscribe(async (status) => {
      if (status !== "SUBSCRIBED") return;

      subscribedRef.current = true;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      authenticatedRef.current = Boolean(session?.user);
      await trackCurrent();
    });

    const handlePageHide = () => {
      if (subscribedRef.current) {
        void channel.untrack();
      }
    };

    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      subscribedRef.current = false;
      authSubscription.unsubscribe();
      void channel.untrack();
      void supabase.removeChannel(channel);
      channelRef.current = null;
    };
  }, [trackCurrent]);

  return null;
}
