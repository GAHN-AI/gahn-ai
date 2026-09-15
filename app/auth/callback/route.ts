import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { resend } from "@/lib/resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://gahnai.com";

function safeNext(next: string | null) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/dashboard";
  }
  return next;
}

function redirect(path: string) {
  return NextResponse.redirect(new URL(path, SITE_URL));
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
    return redirect("/login?error=authentication_failed");
  }

  if (authError) {
    console.error("Authentication verification failed:", authError);
    return redirect("/login?error=authentication_failed");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Authenticated user could not be loaded:", userError);
    return redirect("/login?error=authentication_failed");
  }

  if (next === "/update-password") {
    return redirect("/update-password");
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
    return redirect("/login?error=profile_setup_failed");
  }

  let profile = existingProfile;

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
      return redirect("/login?error=profile_setup_failed");
    }

    profile = createdProfile;
  }

  if (email && !profile.welcome_email_sent_at) {
    const safeName = escapeHtml(fullName);
    const { error: welcomeError } = await resend.emails.send({
      from: "GAHN AI <hello@updates.gahnai.com>",
      to: email,
      subject: "Welcome to GAHN AI",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;color:#0B1739">
          <h1>Welcome to GAHN AI</h1>
          <p>Hi ${safeName},</p>
          <p>Your account is ready. You can now start learning and track your progress.</p>
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
  }

  return redirect(next);
}
