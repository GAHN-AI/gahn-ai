import type { User } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.gahnai.com";
function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendWelcome(user: User) {
  const email = user.email?.trim().toLowerCase();
  const rawName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    email?.split("@")[0] ||
    "Learner";
  const fullName =
    typeof rawName === "string" && rawName.trim() ? rawName.trim() : "Learner";

  const { data: existingProfile, error: profileLookupError } =
    await supabaseAdmin
      .from("profiles")
      .select("id, welcome_email_sent_at")
      .eq("id", user.id)
      .maybeSingle();

  if (profileLookupError) {
    console.error("Welcome profile lookup unavailable");
    return;
  }

  const profile = existingProfile;
  if (!profile || profileLookupError) return;

  if (email && !profile.welcome_email_sent_at) {
    const safeName = escapeHtml(fullName);
    try {
      const { resend } = await import("@/lib/resend");
      const { error: welcomeError } = await resend.emails.send(
        {
          from: "GAHN AI <hello@updates.gahnai.com>",
          to: email,
          subject: "Welcome to GAHN AI",
          html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;color:#0B1739">
          <h1>Welcome to GAHN AI</h1>
          <p>Hi ${safeName},</p>
          <p>Your free early-access account is ready. Explore GAHN's Learning Worlds and planned features now. Interactive AI lessons are still in development, and we will email you when the learning experience launches.</p>
          <p><a href="${SITE_URL}/dashboard" style="display:inline-block;background:#1677FF;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px">Open Your Dashboard</a></p>
        </div>
      `,
        },
        { idempotencyKey: `welcome/${user.id}` },
      );

      if (welcomeError) {
        console.error("Welcome email unavailable");
      } else {
        const { error: statusError } = await supabaseAdmin
          .from("profiles")
          .update({ welcome_email_sent_at: new Date().toISOString() })
          .eq("id", user.id);

        if (statusError) {
          console.error("Welcome status update unavailable");
        }
      }
    } catch {
      // A temporary email delivery outage must not block a successful login.
      console.error("Welcome email delivery unavailable");
    }
  }
}
