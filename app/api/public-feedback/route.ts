import { NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/lib/serverAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type SubmitPublicFeedbackRequest = {
  displayName?: string;
  message?: string;
  consentPublic?: boolean;
};

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("public_feedback")
      .select("id, display_name, message, created_at")
      .eq("status", "approved")
      .order("approved_at", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(8);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      {
        voices: (data || []).map((item) => ({
          id: item.id,
          displayName: item.display_name,
          message: item.message,
          createdAt: item.created_at,
        })),
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Public feedback load failed:", error);
    return NextResponse.json(
      { error: "Unable to load public feedback." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "You must sign up or log in before making a review." },
        { status: 401 }
      );
    }

    const body = (await req.json()) as SubmitPublicFeedbackRequest;
    const displayName = String(body.displayName || "").trim();
    const message = String(body.message || "").trim();

    if (body.consentPublic !== true) {
      return NextResponse.json(
        { error: "Public display consent is required." },
        { status: 400 }
      );
    }

    if (displayName.length < 1 || displayName.length > 60) {
      return NextResponse.json(
        { error: "Display name must be between 1 and 60 characters." },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 280) {
      return NextResponse.json(
        { error: "Comment must be between 10 and 280 characters." },
        { status: 400 }
      );
    }

    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();

    const { data: recent } = await supabaseAdmin
      .from("public_feedback")
      .select("id")
      .eq("user_id", user.id)
      .gte("created_at", sixHoursAgo)
      .limit(1);

    if (recent && recent.length > 0) {
      return NextResponse.json(
        { error: "You already submitted feedback recently. Try again later." },
        { status: 429 }
      );
    }

    const { error: insertError } = await supabaseAdmin
      .from("public_feedback")
      .insert({
        user_id: user.id,
        display_name: displayName,
        message,
        consent_public: true,
        status: "pending",
      });

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({
      saved: true,
      message:
        "Thanks. Your comment was submitted for review before it appears publicly.",
    });
  } catch (error) {
    console.error("Public feedback submission failed:", error);
    return NextResponse.json(
      { error: "Your feedback could not be submitted. Please try again." },
      { status: 500 }
    );
  }
}
