import { NextResponse } from "next/server";

import { getCurrentSubscription } from "@/lib/currentSubscription";
import { getLiveInstructorUsage } from "@/lib/liveInstructorUsage";
import { getAuthenticatedUser } from "@/lib/serverAuth";

export async function GET() {
  try {
    const { user, error: authError } = await getAuthenticatedUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const subscription = await getCurrentSubscription(user.id);
    const usage = await getLiveInstructorUsage(user.id, subscription);

    const included =
      subscription.entitlements.liveInstructor &&
      usage.limitSeconds > 0;

    if (!included) {
      return NextResponse.json(
        {
          allowed: false,
          error: "Live AI Instructor is not included in your plan.",
          upgradeRequired: true,
          planId: subscription.planId,
          ...usage,
        },
        { status: 403 }
      );
    }

    if (usage.remainingSeconds <= 0) {
      return NextResponse.json(
        {
          allowed: false,
          error:
            "You have used all of your Maya time for this billing period.",
          exhausted: true,
          planId: subscription.planId,
          ...usage,
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      allowed: true,
      planId: subscription.planId,
      ...usage,
      message: "Live AI Instructor access granted.",
    });
  } catch (error) {
    console.error("Live instructor entitlement check failed:", error);

    return NextResponse.json(
      { error: "Unable to check feature access." },
      { status: 500 }
    );
  }
}
