"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { isAccountPath } from "@/lib/auth/policy";

const AUTH_READY_CHANNEL = "gahn-auth-state";

/** Announce a verified dashboard session to other tabs sharing this origin. */
export default function SessionSync() {
  useEffect(() => {
    let stopped = false;
    const channel = typeof BroadcastChannel !== "undefined"
      ? new BroadcastChannel(AUTH_READY_CHANNEL)
      : null;

    const announceSignedIn = () => {
      // The protected dashboard is only served to verified, registered users.
      if (window.location.pathname !== "/dashboard") return;
      channel?.postMessage({ type: "dashboard-ready" });
      try {
        window.localStorage.setItem("gahn-auth-ready", String(Date.now()));
      } catch {
        // Private browsing may disallow storage. BroadcastChannel still works.
      }
    };

    announceSignedIn();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Avoid Supabase calls inside this callback (auth lock).
        if (event === "SIGNED_OUT" && isAccountPath(window.location.pathname))
          window.location.replace("/login");
        if (event === "SIGNED_IN" && session) {
          if (window.location.pathname === "/login")
            window.location.replace("/auth/complete");
          else announceSignedIn();
        }
      },
    );

    async function checkOnFocus() {
      if (!isAccountPath(window.location.pathname)) return;
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (!stopped && (!user || error))
          window.location.replace("/login?error=session_expired");
      } catch {
        // Network interruption should not erase a valid session.
      }
    }

    const onVisibility = () => {
      if (!document.hidden) void checkOnFocus();
    };
    window.addEventListener("focus", checkOnFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stopped = true;
      subscription.unsubscribe();
      channel?.close();
      window.removeEventListener("focus", checkOnFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return null;
}
