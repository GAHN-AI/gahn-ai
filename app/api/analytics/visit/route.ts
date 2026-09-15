import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const visitorId =
      typeof body?.visitor_id === "string" ? body.visitor_id.trim() : "";

    if (visitorId.length < 8 || visitorId.length > 128) {
      return NextResponse.json({ error: "Invalid visitor ID" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("site_visitors").upsert(
      { visitor_id: visitorId },
      {
        onConflict: "visitor_id",
        ignoreDuplicates: true,
      }
    );

    if (error) {
      console.error("Failed to record site visitor:", error);
      return NextResponse.json({ error: "Unable to record visit" }, { status: 500 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Visitor analytics route failed:", error);
    return NextResponse.json({ error: "Unable to record visit" }, { status: 500 });
  }
}
