import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type TrackAction = "page_view" | "heartbeat" | "leave";

function cleanText(value: unknown, max = 500) {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  return cleaned ? cleaned.slice(0, max) : null;
}

function decodeHeader(value: string | null) {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function parseUserAgent(userAgent: string) {
  const ua = userAgent.toLowerCase();

  const device = /ipad|tablet/.test(ua)
    ? "Tablet"
    : /mobi|iphone|android/.test(ua)
      ? "Mobile"
      : "Desktop";

  const browser = /edg\//.test(ua)
    ? "Edge"
    : /opr\//.test(ua)
      ? "Opera"
      : /firefox\//.test(ua)
        ? "Firefox"
        : /chrome\//.test(ua)
          ? "Chrome"
          : /safari\//.test(ua)
            ? "Safari"
            : "Other";

  const os = /windows nt/.test(ua)
    ? "Windows"
    : /iphone|ipad|ios/.test(ua)
      ? "iOS"
      : /android/.test(ua)
        ? "Android"
        : /mac os x|macintosh/.test(ua)
          ? "macOS"
          : /linux/.test(ua)
            ? "Linux"
            : "Other";

  return { device, browser, os };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action: TrackAction =
      body?.action === "heartbeat" || body?.action === "leave"
        ? body.action
        : "page_view";

    const visitorId = cleanText(body?.visitor_id, 128) ?? "";
    const sessionId = cleanText(body?.session_id, 128) ?? "";
    const path = cleanText(body?.path, 500) ?? "/";

    if (
      visitorId.length < 8 ||
      sessionId.length < 8 ||
      path.startsWith("/admin")
    ) {
      return new NextResponse(null, { status: 204 });
    }

    const now = new Date().toISOString();
    const userAgent = request.headers.get("user-agent") ?? "";
    const { device, browser, os } = parseUserAgent(userAgent);

    const country = cleanText(request.headers.get("x-vercel-ip-country"), 80);
    const region = cleanText(request.headers.get("x-vercel-ip-country-region"), 120);
    const city = cleanText(decodeHeader(request.headers.get("x-vercel-ip-city")), 120);

    const authenticated = body?.authenticated === true;
    const referrer = cleanText(body?.referrer, 500);
    const source = cleanText(body?.source, 160) ?? "Direct";
    const medium = cleanText(body?.medium, 160);
    const campaign = cleanText(body?.campaign, 200);
    const language = cleanText(body?.language, 80);
    const timezone = cleanText(body?.timezone, 120);
    const title = cleanText(body?.title, 300);
    const screenWidth = Number.isFinite(Number(body?.screen_width))
      ? Math.max(0, Math.min(10000, Math.round(Number(body.screen_width))))
      : null;
    const screenHeight = Number.isFinite(Number(body?.screen_height))
      ? Math.max(0, Math.min(10000, Math.round(Number(body.screen_height))))
      : null;

    const { data: existingSession, error: sessionLookupError } = await supabaseAdmin
      .from("analytics_sessions")
      .select("session_id, pageviews")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (sessionLookupError) {
      console.error("Analytics session lookup failed:", sessionLookupError);
      return NextResponse.json({ error: "Unable to track analytics" }, { status: 500 });
    }

    if (!existingSession) {
      const { error: sessionInsertError } = await supabaseAdmin
        .from("analytics_sessions")
        .insert({
          session_id: sessionId,
          visitor_id: visitorId,
          authenticated,
          started_at: now,
          last_seen_at: now,
          active: action !== "leave",
          entry_path: path,
          current_path: path,
          referrer,
          source,
          medium,
          campaign,
          country,
          region,
          city,
          language,
          timezone,
          device_type: device,
          browser,
          os,
          screen_width: screenWidth,
          screen_height: screenHeight,
          pageviews: action === "page_view" ? 1 : 0,
        });

      if (sessionInsertError) {
        console.error("Analytics session creation failed:", sessionInsertError);
        return NextResponse.json({ error: "Unable to track analytics" }, { status: 500 });
      }
    } else {
      const updatePayload: Record<string, unknown> = {
        last_seen_at: now,
        current_path: path,
        authenticated,
        active: action !== "leave",
        country,
        region,
        city,
        language,
        timezone,
        device_type: device,
        browser,
        os,
        screen_width: screenWidth,
        screen_height: screenHeight,
      };

      if (action === "page_view") {
        updatePayload.pageviews = Number(existingSession.pageviews || 0) + 1;
      }

      const { error: sessionUpdateError } = await supabaseAdmin
        .from("analytics_sessions")
        .update(updatePayload)
        .eq("session_id", sessionId);

      if (sessionUpdateError) {
        console.error("Analytics session update failed:", sessionUpdateError);
        return NextResponse.json({ error: "Unable to track analytics" }, { status: 500 });
      }
    }

    const { error: visitorError } = await supabaseAdmin
      .from("site_visitors")
      .upsert(
        {
          visitor_id: visitorId,
          last_seen_at: now,
          last_path: path,
        },
        { onConflict: "visitor_id" }
      );

    if (visitorError) {
      console.error("Analytics visitor update failed:", visitorError);
    }

    if (action === "page_view") {
      const { error: eventError } = await supabaseAdmin.from("analytics_events").insert({
        session_id: sessionId,
        visitor_id: visitorId,
        event_name: "page_view",
        path,
        title,
        created_at: now,
      });

      if (eventError) {
        console.error("Analytics page-view event failed:", eventError);
        return NextResponse.json({ error: "Unable to track analytics" }, { status: 500 });
      }
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Analytics tracking route failed:", error);
    return NextResponse.json({ error: "Unable to track analytics" }, { status: 500 });
  }
}
