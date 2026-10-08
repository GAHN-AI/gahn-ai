import { NextResponse } from "next/server";

// Never expose whether an email address is registered. That information can
// be used to enumerate customer accounts. Supabase handles signup directly.
export async function POST() {
  return NextResponse.json(
    { error: "Account availability checks are not supported. Please use the signup or login page." },
    { status: 404 }
  );
}
