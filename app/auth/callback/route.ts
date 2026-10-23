import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { resend } from "@/lib/resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://gahnai.com";

function safeNext(next: string | null) {
  // Only the password recovery flow may redirect somewhere other than
  // the dashboard. An arbitrary path can become an off-site URL when
  // backslashes or encoded URL separators are normalized by WHATWG URL.
  return next === "/update-password" ? "/update-password" : "/dashboard";
}

/**
 * Keep the authenticated redirect on the same trusted host where PKCE
 * began. Switching from www.gahnai.com to gahnai.com (or vice versa) can
 * hide the newly written auth cookie and strand password recovery.
 *
 * Do not trust arbitrary request hosts: prevent an open redirect.
 */
function redirect(path: string, requestUrl: URL) {
  const productionHosts = new Set(["gahnai.com", "www.gahnai.com"]);
  const previewHost = (process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || "")
    .replace(/^https?:\/\//, "")
    .split("/")[0]
    .split(":")[0]
    .toLowerCase();
  const host = requestUrl.hostname.toLowerCase();
  const isLocal = process.env.NODE_ENV !== "production" &&
    (host === "localhost" || host === "127.0.0.1");
  const isTrusted = productionHosts.has(host) || isLocal || Boolean(previewHost && host === previewHost);
  const origin = isTrusted ? requestUrl.origin : new URL(SITE_URL).origin;
  return NextResponse.redirect(new URL(path, origin), { status: 303 });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const next = safeNext(url.searchParams.get("next"));
  const isRecovery = next === "/update-password" || type === "recovery";

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  let authError = null;

  if (code) {
    const result = await supabase.auth.exchangeCodeForSession(code);
    authError = result.error;
  } else if (tokenHash && type) {
    const result = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });
    authError = result.error;
  } else {
    return redirect("/login?error=authentication_failed", url);
  }

  if (authError) {
    console.error("Authentication verification failed:", authError);
    return redirect("/login?error=authentication_failed", url);
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Authenticated user could not be loaded:", userError);
    return redirect("/login?error=authentication_failed", url);
  }

  if (isRecovery) {
    return redirect("/update-password", url);
  }

  const email = user.email?.trim().toLowerCase();
  const rawName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    email?.split("@")[0] ||
    "Learner";
  const fullName =
    typeof rawName === "string" && rawName.trim()
      ? rawName.trim()
      : "Learner";

  const { data: existingProfile, error: profileLookupError } =
    await supabaseAdmin
      .from("profiles")
      .select("id, welcome_email_sent_at")
      .eq("id", user.id)
      .maybeSingle();

  if (profileLookupError) {
    console.error("Profile lookup failed:", profileLookupError);
    return redirect("/login?error=profile_setup_failed", url);
  }

  let profile = existingProfile;
  const isNewProfile = !existingProfile;

  if (!profile) {
    const { data: createdProfile, error: profileCreateError } =
      await supabaseAdmin
        .from("profiles")
        .insert({
          id: user.id,
          full_name: fullName,
          email: email ?? null,
          avatar_url:
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            "",
          welcome_email_sent_at: null,
        })
        .select("id, welcome_email_sent_at")
        .single();

    if (profileCreateError) {
      console.error("Profile creation failed:", profileCreateError);
      return redirect("/login?error=profile_setup_failed", url);
    }

    profile = createdProfile;
  }

  if (email && !profile.welcome_email_sent_at) {
    const safeName = escapeHtml(fullName);
    try {
      const { error: welcomeError } = await resend.emails.send({
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
    });

    if (welcomeError) {
      console.error("Welcome email failed:", welcomeError);
    } else {
      const { error: statusError } = await supabaseAdmin
        .from("profiles")
        .update({ welcome_email_sent_at: new Date().toISOString() })
        .eq("id", user.id);

      if (statusError) {
        console.error("Welcome email status update failed:", statusError);
      }
    }
    } catch (welcomeError) {
      // A temporary email delivery outage must not block a successful login.
      console.error("Welcome email delivery failed:", welcomeError);
    }
  }

  // When Google or email signup creates the first profile, make it clear
  // that this is a new Free Plan account, not the restored old account.
  return redirect(
    isNewProfile && next === "/dashboard" ? "/dashboard?welcome=1" : next,
    url
  );
}
