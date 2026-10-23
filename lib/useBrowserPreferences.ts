"use client";

import { useCallback, useSyncExternalStore } from "react";

function subscribeToLocation(update: () => void) {
  window.addEventListener("popstate", update);
  return () => window.removeEventListener("popstate", update);
}

export function useBrowserSearch() {
  return useSyncExternalStore(
    subscribeToLocation,
    () => window.location.search,
    () => "",
  );
}

function subscribeToPreferences(update: () => void) {
  window.addEventListener("storage", update);
  window.addEventListener("gahn-preference-change", update);
  return () => {
    window.removeEventListener("storage", update);
    window.removeEventListener("gahn-preference-change", update);
  };
}

export function useStoredBoolean(key: string, initial: boolean) {
  const read = useCallback(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value === null ? initial : value === "on";
    } catch {
      return initial;
    }
  }, [key, initial]);
  const value = useSyncExternalStore(
    subscribeToPreferences,
    read,
    () => initial,
  );
  const setValue = useCallback(
    (next: boolean | ((current: boolean) => boolean)) => {
      const nextValue = typeof next === "function" ? next(read()) : next;
      try {
        window.localStorage.setItem(key, nextValue ? "on" : "off");
        window.dispatchEvent(new Event("gahn-preference-change"));
      } catch {
        /* Storage may be unavailable in a restricted browser. */
      }
    },
    [key, read],
  );
  return [value, setValue] as const;
}
