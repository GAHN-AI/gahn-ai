"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
export function useSignedIn() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    let active = true;
    let revision = 0;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      revision++;
      if (active) setSignedIn(Boolean(session));
    });
    const observed = revision;
    void supabase.auth
      .getUser()
      .then(({ data, error }) => {
        if (active && observed === revision)
          setSignedIn(Boolean(data.user && !error));
      })
      .catch(() => {});
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);
  return signedIn;
}
