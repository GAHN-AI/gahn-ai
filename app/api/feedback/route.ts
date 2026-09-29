import { NextResponse } from "next/server";

import { resend } from "@/lib/resend";
import { getAuthenticatedUser } from "@/lib/serverAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type FeedbackRequest = {
  category?: string;
  rating?: number | null;
  message?: string;
  contextPath?: string;
};

const allowedCategories = new Set([
  "feedback",
  "confusing",
  "bug",
  "idea",
  "love",
]);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "You must be signed in to send feedback." },
        { status: 401 }
      );
    }

    const body = (await req.json()) as FeedbackRequest;
    const category = String(body.category || "feedback").trim();
    const message = String(body.message || "").trim();
    const contextPath = String(body.contextPath || "/feedback").slice(0, 1000);
    const rating =
      typeof body.rating === "number" &&
      Number.isInteger(body.rating) &&
      body.rating >= 1 &&
      body.rating <= 5
        ? body.rating
        : null;

    if (!allowedCategories.has(category)) {
      return NextResponse.json(
        { error: "Choose a valid feedback category." },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: "Tell us what happened before sending feedback." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Feedback must be 5,000 characters or fewer." },
        { status: 400 }
      );
    }

    const { data: saved, error: insertError } = await supabaseAdmin
      .from("learner_feedback")
      .insert({
        user_id: user.id,
        category,
        rating,
        message,
        context_path: contextPath,
      })
      .select("id, created_at")
      .single();

    if (insertError) {
      throw insertError;
    }

    const notificationEmail =
      process.env.FEEDBACK_NOTIFICATION_EMAIL?.trim() ||
      "support@gahnai.com";

    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
    const safeEmail = escapeHtml(user.email || "Signed-in GAHN learner");
    const safeContext = escapeHtml(contextPath);
    const safeCategory = escapeHtml(category);
    const safeRating = rating ? `${rating}/5` : "Not rated";

    const { error: emailError } = await resend.emails.send({
      from: "GAHN AI Feedback <feedback@updates.gahnai.com>",
      to: [notificationEmail],
      replyTo: user.email || undefined,
      subject: `GAHN feedback: ${category}${rating ? ` · ${rating}/5` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #07162F;">
          <h1 style="font-size: 24px; margin: 0 0 20px;">New GAHN learner feedback</h1>
          <div style="border: 1px solid #D8E0EA; border-radius: 14px; padding: 22px; background: #F8FAFD;">
            <p><strong>Category:</strong> ${safeCategory}</p>
            <p><strong>Rating:</strong> ${safeRating}</p>
            <p><strong>Learner:</strong> ${safeEmail}</p>
            <p><strong>Context:</strong> ${safeContext}</p>
            <div style="margin-top: 18px; border-top: 1px solid #D8E0EA; padding-top: 18px;">
              <strong>Message</strong>
              <p style="line-height: 1.7;">${safeMessage}</p>
            </div>
          </div>
        </div>
      `,
    });

    if (emailError) {
      console.error("Feedback notification email failed:", emailError);

      return NextResponse.json({
        saved: true,
        notificationSent: false,
        feedbackId: saved.id,
        message:
          "Your feedback was saved, but the email notification could not be delivered.",
      });
    }

    return NextResponse.json({
      saved: true,
      notificationSent: true,
      feedbackId: saved.id,
      message: "Feedback sent successfully.",
    });
  } catch (error) {
    console.error("Feedback submission failed:", error);

    return NextResponse.json(
      { error: "Feedback could not be sent. Please try again." },
      { status: 500 }
    );
  }
}
