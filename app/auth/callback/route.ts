import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { resend } from "@/lib/resend";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function getSafeNextPath(next: string | null) {
  if (!next) {
    return "/dashboard";
  }

  if (!next.startsWith("/") || next.startsWith("//")) {
    return "/dashboard";
  }

  return next;
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
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextPath = getSafeNextPath(requestUrl.searchParams.get("next"));

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=authentication_failed", request.url)
    );
  }

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

  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    console.error("Authentication code exchange failed:", exchangeError);

    return NextResponse.redirect(
      new URL("/login?error=authentication_failed", request.url)
    );
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Authenticated user could not be loaded:", userError);

    return NextResponse.redirect(
      new URL("/login?error=authentication_failed", request.url)
    );
  }

  /*
   * Password-reset links also use this callback.
   * They should go directly to the password-update page without sending
   * another welcome email.
   */
  if (nextPath === "/update-password") {
    return NextResponse.redirect(
      new URL("/update-password", request.url)
    );
  }

  const email = user.email?.trim().toLowerCase();

  const rawFullName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    email?.split("@")[0] ||
    "Learner";

  const fullName =
    typeof rawFullName === "string" && rawFullName.trim()
      ? rawFullName.trim()
      : "Learner";

  /*
   * Your database trigger should already create this profile.
   * We still check for it because the callback may run immediately after
   * account creation.
   */
  const {
    data: existingProfile,
    error: profileLookupError,
  } = await supabaseAdmin
    .from("profiles")
    .select("id, welcome_email_sent_at")
    .eq("id", user.id)
    .maybeSingle();

  if (profileLookupError) {
    console.error("Profile lookup failed:", profileLookupError);

    return NextResponse.redirect(
      new URL("/login?error=profile_setup_failed", request.url)
    );
  }

  let profile = existingProfile;

  /*
   * Backup profile creation.
   * This only runs if the database trigger did not create the profile.
   */
  if (!profile) {
    const {
      data: createdProfile,
      error: profileCreateError,
    } = await supabaseAdmin
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

      return NextResponse.redirect(
        new URL("/login?error=profile_setup_failed", request.url)
      );
    }

    profile = createdProfile;
  }

  /*
   * Send the welcome email once.
   */
  if (email && !profile.welcome_email_sent_at) {
    const safeFullName = escapeHtml(fullName);

    const { error: welcomeEmailError } = await resend.emails.send({
      from: "GAHN AI <hello@updates.gahnai.com>",
      to: email,
      subject: "Welcome to GAHN AI",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Welcome to GAHN AI</title>
          </head>

          <body
            style="
              margin:0;
              background:#f6f9ff;
              padding:40px 20px;
              font-family:Arial,Helvetica,sans-serif;
              color:#061633;
            "
          >
            <div style="max-width:600px;margin:0 auto;">
              <div
                style="
                  background:#ffffff;
                  border-radius:20px;
                  padding:40px;
                  box-shadow:0 10px 30px rgba(6,22,51,0.08);
                "
              >
                <div style="margin-bottom:30px;text-align:center;">
                  <div
                    style="
                      font-size:30px;
                      font-weight:800;
                      color:#061633;
                    "
                  >
                    GAHN AI
                  </div>

                  <div
                    style="
                      margin-top:8px;
                      font-size:12px;
                      font-weight:700;
                      letter-spacing:2px;
                      color:#64748b;
                      text-transform:uppercase;
                    "
                  >
                    Global AI Human Helper Network
                  </div>
                </div>

                <h1
                  style="
                    margin:0;
                    font-size:30px;
                    line-height:1.3;
                    color:#061633;
                  "
                >
                  Welcome to GAHN AI
                </h1>

                <p
                  style="
                    margin:24px 0 0;
                    font-size:16px;
                    line-height:1.7;
                    color:#475569;
                  "
                >
                  Hi ${safeFullName},
                </p>

                <p
                  style="
                    margin:16px 0 0;
                    font-size:16px;
                    line-height:1.7;
                    color:#475569;
                  "
                >
                  Your account is ready. You can now explore learning worlds,
                  begin structured lessons, save notes, and track your progress.
                </p>

                <div style="margin-top:30px;">
                  <a
                    href="${requestUrl.origin}/dashboard"
                    style="
                      display:inline-block;
                      background:#071f4d;
                      color:#ffffff;
                      text-decoration:none;
                      font-size:16px;
                      font-weight:700;
                      padding:15px 24px;
                      border-radius:12px;
                    "
                  >
                    Open Your Dashboard
                  </a>
                </div>

                <p
                  style="
                    margin:32px 0 0;
                    font-size:14px;
                    line-height:1.6;
                    color:#64748b;
                  "
                >
                  Start with one learning goal and build from there.
                </p>

                <div
                  style="
                    margin-top:32px;
                    padding-top:24px;
                    border-top:1px solid #e2e8f0;
                    font-size:13px;
                    line-height:1.6;
                    color:#94a3b8;
                  "
                >
                  This email was sent because a GAHN AI account was created
                  using this email address.
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (welcomeEmailError) {
      console.error("Welcome email failed:", welcomeEmailError);
    } else {
      const { error: welcomeStatusError } = await supabaseAdmin
        .from("profiles")
        .update({
          welcome_email_sent_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (welcomeStatusError) {
        console.error(
          "Welcome email status update failed:",
          welcomeStatusError
        );
      }
    }
  }

  return NextResponse.redirect(
    new URL(nextPath, request.url)
  );
}