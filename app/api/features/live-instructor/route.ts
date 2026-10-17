import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/serverAuth";
import { requireEntitlement } from "@/lib/requireEntitlement";

export async function GET() {
  try {
    const { user, error } = await getAuthenticatedUser();

    if (error || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const access = await requireEntitlement(
      user.id,
      "liveInstructor"
    );

    if (!access.allowed) {
      return NextResponse.json(
        {
          error: "Live AI Instructor is not included in your plan.",
          planId: access.planId,
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      allowed: true,
      planId: access.planId,
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