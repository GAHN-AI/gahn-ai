import { NextResponse } from "next/server";

export async function POST() {
  try {
    const apiKey = process.env.LIVEAVATAR_API_KEY;
    const avatarId = process.env.LIVEAVATAR_AVATAR_ID;
    const contextId = process.env.LIVEAVATAR_CONTEXT_ID;
    const voiceId = process.env.LIVEAVATAR_VOICE_ID;

    if (!apiKey) {
      return NextResponse.json(
        { error: "LIVEAVATAR_API_KEY is missing." },
        { status: 500 }
      );
    }

    if (!avatarId) {
      return NextResponse.json(
        { error: "LIVEAVATAR_AVATAR_ID is missing." },
        { status: 500 }
      );
    }

    if (!contextId) {
      return NextResponse.json(
        { error: "LIVEAVATAR_CONTEXT_ID is missing." },
        { status: 500 }
      );
    }

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

            ...(voiceId
              ? {
                  voice_id: voiceId,
                }
              : {}),
          },

          is_sandbox:
            process.env.LIVEAVATAR_SANDBOX === "true",
        }),
      }
    );

    const raw = await response.text();

    console.log("HEYGEN STATUS:", response.status);
    console.log("HEYGEN RESPONSE:", raw);

    let data: any = {};

    try {
      data = JSON.parse(raw);
    } catch {
      data = {
        message: raw,
      };
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.data?.[0]?.message ||
            data?.message ||
            data?.error ||
            "Could not start LiveAvatar.",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
      sessionToken: data?.data?.session_token,
      sessionId: data?.data?.session_id,
    });
  } catch (error) {
    console.error("LIVEAVATAR ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not start LiveAvatar.",
      },
      {
        status: 500,
      }
    );
  }
}