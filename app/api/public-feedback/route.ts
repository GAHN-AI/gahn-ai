import { NextResponse } from "next/server";

import { resend } from "@/lib/resend";
import { getAuthenticatedUser } from "@/lib/serverAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type PrivateComment = {
  displayName?: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Comments are private. No public reviews or customer identities are exposed.
export async function GET() {
  const { user } = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json(
      { submitted: false, authenticated: false },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("public_feedback")
    .select("id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Private feedback status lookup failed:", error);
    return NextResponse.json(
      { error: "Could not check submission status." },
      { status: 503 }
    );
  }

  return NextResponse.json(
    { submitted: Boolean(data), authenticated: true },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Please log in or create a free account before sending your message." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as PrivateComment;
    const displayName = String(body.displayName ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (displayName.length < 1 || displayName.length > 60) {
      return NextResponse.json(
        { error: "Enter a name between 1 and 60 characters." },
        { status: 400 }
      );
    }
    if (message.length < 10 || message.length > 280) {
      return NextResponse.json(
        { error: "Your message should be 10 to 280 characters long." },
        { status: 400 }
      );
    }

    // The unique index on user_id also blocks races and direct API spam.
    const { error: insertError } = await supabaseAdmin
      .from("public_feedback")
      .insert({
        user_id: user.id,
        display_name: displayName,
        message,
        consent_public: false,
        status: "pending",
      });

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json(
          { submitted: true, error: "You have already sent a message. Thank you for sharing your thoughts." },
          { status: 409 }
        );
      }
      throw insertError;
    }

    // Send directly to the verified GAHN Zoho support inbox.
    const to = "support@gahnai.com";
    const { error: notifyError } = await resend.emails.send({
      from: "GAHN AI Feedback <feedback@updates.gahnai.com>",
      to: [to],
      replyTo: user.email || undefined,
      subject: "GAHN AI: New private landing page comment",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#0B1739;padding:24px">
          <h2>New private landing page comment</h2>
          <p><strong>From:</strong> ${escapeHtml(displayName)}</p>
          <p><strong>Account email:</strong> ${escapeHtml(user.email || "Not provided")}</p>
          <p><strong>Question:</strong> Would you try GAHN AI?</p>
          <div style="padding:16px;border:1px solid #D7E3F2;border-radius:12px;white-space:pre-wrap">${escapeHtml(message)}</div>
          <p style="color:#667085;font-size:12px">This message is private and is not published on the website.</p>
        </div>
      `,
    });

    if (notifyError) {
      console.error("Private landing comment notification failed:", notifyError);
      return NextResponse.json({
        submitted: true,
        notificationSent: false,
        message: "Thank you. Your comment was saved, but our email notification could not be delivered.",
      });
    }

    // Best-effort acknowledgment: the public response never relies on
    // successful delivery of this optional email.
    if (user.email) {
      const { error: receiptError } = await resend.emails.send({
        from: "GAHN AI <hello@updates.gahnai.com>",
        to: [user.email],
        subject: "Thank you for sharing your thoughts with GAHN AI",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#0B1739;padding:24px">
            <h2>Thank you for your feedback</h2>
            <p>We received your thoughts about GAHN AI and appreciate you taking the time to share them.</p>
            <p>Your comment is private and will not appear publicly on the website.</p>
            <p>GAHN AI</p>
          </div>
        `,
      });
      if (receiptError) console.error("Comment receipt email failed:", receiptError);
    }

    return NextResponse.json({
      submitted: true,
      notificationSent: true,
      message: "Thank you for sharing your thoughts. Your comment was sent privately to the GAHN team.",
    });
  } catch (error) {
    console.error("Private landing comment failed:", error);
    return NextResponse.json(
      { error: "We couldn't send your comment right now. Please try again." },
      { status: 500 }
    );
  }
}
