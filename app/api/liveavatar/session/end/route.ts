import { NextResponse } from "next/server";

import { finalizeLiveInstructorSession } from "@/lib/liveInstructorUsage";
import { getAuthenticatedUser } from "@/lib/serverAuth";

export async function POST(req: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "You must be signed in." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const usageEventId = body?.usageEventId;

    if (typeof usageEventId !== "string" || !usageEventId) {
      return NextResponse.json(
        { error: "A usage session ID is required." },
        { status: 400 }
      );
    }

    const usage = await finalizeLiveInstructorSession(
      user.id,
      usageEventId
    );

    return NextResponse.json({
      ended: true,
      ...usage,
    });
  } catch (error) {
    console.error("LiveAvatar session finalization failed:", error);

    return NextResponse.json(
      { error: "Could not finish Maya usage tracking." },
      { status: 500 }
    );
  }
}
