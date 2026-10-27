"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { isAccountPath } from "@/lib/auth/policy";

export default function SessionSync() {
  useEffect(() => {
    let stopped = false;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Do not call another Supabase method inside this callback (auth lock).
      if (event === "SIGNED_OUT" && isAccountPath(window.location.pathname))
        window.location.replace("/login");
      if (
        event === "SIGNED_IN" &&
        session &&
        window.location.pathname === "/login"
      ) {
        window.location.replace("/auth/complete");
      }
    });
    async function checkOnFocus() {
      if (!isAccountPath(window.location.pathname)) return;
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (!stopped && (!user || error))
          window.location.replace("/login?error=session_expired");
      } catch {
        /* A transient outage must not destroy a valid session. */
      }
    }
    window.addEventListener("focus", checkOnFocus);
    return () => {
      stopped = true;
      subscription.unsubscribe();
      window.removeEventListener("focus", checkOnFocus);
    };
  }, []);
  return null;
}
