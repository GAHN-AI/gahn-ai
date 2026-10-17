import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/serverAuth";
import { getCurrentSubscription } from "@/lib/currentSubscription";

export async function GET() {
  try {
    const { user, error } = await getAuthenticatedUser();

    if (error || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const subscription = await getCurrentSubscription(user.id);

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("Failed to load subscription:", error);

    return NextResponse.json(
      { error: "Failed to load subscription." },
      { status: 500 }
    );
  }
}