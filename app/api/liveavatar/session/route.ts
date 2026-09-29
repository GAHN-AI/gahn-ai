import { NextResponse } from "next/server";

import { getCurrentSubscription } from "@/lib/currentSubscription";
import {
  attachProviderSession,
  cancelLiveInstructorReservation,
  reserveLiveInstructorSession,
} from "@/lib/liveInstructorUsage";
import { getAuthenticatedUser } from "@/lib/serverAuth";

export async function POST() {
  let reservedUsageEventId: string | null = null;
  let reservedUserId: string | null = null;

  try {
    const { user, error: authError } = await getAuthenticatedUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "You must be signed in to use Maya." },
        { status: 401 }
      );
    }

    reservedUserId = user.id;

    const apiKey = process.env.LIVEAVATAR_API_KEY;
    const avatarId = process.env.LIVEAVATAR_AVATAR_ID;
    const contextId = process.env.LIVEAVATAR_CONTEXT_ID;
    const voiceId = process.env.LIVEAVATAR_VOICE_ID;

    if (!apiKey || !avatarId || !contextId) {
      console.error("LiveAvatar production configuration is incomplete.");

      return NextResponse.json(
        { error: "Maya is not configured correctly yet." },
        { status: 500 }
      );
    }

    const subscription = await getCurrentSubscription(user.id);
    const reservation = await reserveLiveInstructorSession(
      user.id,
      subscription
    );

    if (!reservation.ok) {
      if (reservation.reason === "not_in_plan") {
        return NextResponse.json(
          {
            error:
              "Maya Live AI Instructor is included with Learner Plus.",
            code: "UPGRADE_REQUIRED",
            upgradeRequired: true,
            ...reservation.usage,
          },
          { status: 403 }
        );
      }

      if (reservation.reason === "quota_exhausted") {
        return NextResponse.json(
          {
            error:
              "You have used all of your Maya time for this billing period.",
            code: "MAYA_LIMIT_REACHED",
            ...reservation.usage,
          },
          { status: 403 }
        );
      }

      if (reservation.reason === "session_already_active") {
        return NextResponse.json(
          {
            error:
              "A Maya session is already starting. End it before starting another one.",
            code: "MAYA_SESSION_ACTIVE",
            ...reservation.usage,
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          error:
            "Maya usage is not configured for this plan yet.",
          code: "MAYA_QUOTA_NOT_CONFIGURED",
          ...reservation.usage,
        },
        { status: 403 }
      );
    }

    reservedUsageEventId = reservation.usageEventId;

    const response = await fetch(
      "https://api.liveavatar.com/v1/sessions/token",
      {
        method: "POST",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "FULL",
          avatar_id: avatarId,
          avatar_persona: {
            context_id: contextId,
            language: "en",
            ...(voiceId ? { voice_id: voiceId } : {}),
          },
          is_sandbox:
            process.env.LIVEAVATAR_SANDBOX === "true",
        }),
      }
    );

    const raw = await response.text();
    let data: any = {};

    try {
      data = JSON.parse(raw);
    } catch {
      data = { message: raw };
    }

    if (!response.ok) {
      await cancelLiveInstructorReservation(
        user.id,
        reservation.usageEventId
      );
      reservedUsageEventId = null;

      return NextResponse.json(
        {
          error:
            data?.data?.[0]?.message ||
            data?.message ||
            data?.error ||
            "Could not start Maya.",
        },
        { status: response.status }
      );
    }

    const sessionToken = data?.data?.session_token;
    const providerSessionId = data?.data?.session_id ?? null;

    if (!sessionToken) {
      await cancelLiveInstructorReservation(
        user.id,
        reservation.usageEventId
      );
      reservedUsageEventId = null;

      return NextResponse.json(
        { error: "LiveAvatar did not return a session token." },
        { status: 502 }
      );
    }

    await attachProviderSession(
      reservation.usageEventId,
      providerSessionId
    );

    return NextResponse.json({
      sessionToken,
      sessionId: providerSessionId,
      usageEventId: reservation.usageEventId,
      planId: subscription.planId,
      planName: subscription.entitlements.name,
      sessionLimitSeconds: reservation.sessionLimitSeconds,
      limitSeconds: reservation.usage.limitSeconds,
      usedSeconds: reservation.usage.usedSeconds,
      remainingSeconds: reservation.usage.remainingSeconds,
      resetAt: reservation.usage.resetAt,
    });
  } catch (error) {
    if (reservedUsageEventId && reservedUserId) {
      try {
        await cancelLiveInstructorReservation(
          reservedUserId,
          reservedUsageEventId
        );
      } catch (cleanupError) {
        console.error(
          "Could not clean up failed LiveAvatar reservation:",
          cleanupError
        );
      }
    }

    console.error("LIVEAVATAR ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not start Maya.",
      },
      { status: 500 }
    );
  }
}
