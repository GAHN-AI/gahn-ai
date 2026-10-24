import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/serverAuth";
import { getActiveNow } from "@/lib/activePresence";

// Lightweight, admin-only endpoint. Never poll the full audience/signups
// summary every second: that scans historical visits and Auth users.
export async function GET() {
  const { user, error: sessionError } = await getAuthenticatedUser();

  const adminEmails = (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (
    sessionError ||
    !user?.email ||
    !adminEmails.includes(user.email.toLowerCase())
  ) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const presence = await getActiveNow();
    return NextResponse.json(
      { ...presence, updatedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Admin active presence failed:", error);
    return NextResponse.json(
      { error: "Unable to load active visitors" },
      { status: 500, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
