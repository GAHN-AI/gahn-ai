import { NextResponse } from "next/server";

import { getCurrentSubscription } from "@/lib/currentSubscription";
import { getLiveInstructorUsage } from "@/lib/liveInstructorUsage";
import { getAuthenticatedUser } from "@/lib/serverAuth";

export async function GET() {
  try {
    const { user, error: authError } = await getAuthenticatedUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "You must be signed in to use Maya." },
        { status: 401 }
      );
    }

    const subscription = await getCurrentSubscription(user.id);
    const usage = await getLiveInstructorUsage(user.id, subscription);

    const liveInstructorIncluded =
      subscription.entitlements.liveInstructor &&
      usage.limitSeconds > 0;

    const allowed =
      liveInstructorIncluded && usage.remainingSeconds > 0;

    return NextResponse.json({
      allowed,
      exhausted:
        liveInstructorIncluded && usage.remainingSeconds <= 0,
      upgradeRequired: !liveInstructorIncluded,
      planId: subscription.planId,
      planName: subscription.entitlements.name,
      limitSeconds: usage.limitSeconds,
      usedSeconds: usage.usedSeconds,
      remainingSeconds: usage.remainingSeconds,
      resetAt: usage.resetAt,
    });
  } catch (error) {
    console.error("LiveAvatar usage check failed:", error);

    return NextResponse.json(
      { error: "Could not load Maya usage." },
      { status: 500 }
    );
  }
}
