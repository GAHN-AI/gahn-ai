import { supabase } from "@/lib/supabaseClient";
export async function startGoogle(intent: "login" | "signup") {
  const response = await fetch("/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ intent }),
  });
  const data = await response.json();
  if (!response.ok || !data.url)
    throw new Error("Google authentication could not start. Please try again.");
  window.location.assign(data.url);
}
export async function signOutAccount(everywhere = false) {
  const { error } = await supabase.auth.signOut({
    scope: everywhere ? "global" : "local",
  });
  if (error) throw error;
  // Discard prefetched authenticated pages and client component state.
  window.location.replace("/login");
}
