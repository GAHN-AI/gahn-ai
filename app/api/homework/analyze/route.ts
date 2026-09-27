import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireEntitlement } from "@/lib/requireEntitlement";
import { extractOpenAIText } from "@/lib/ai/lessonEngine";
import {
  checkAiUsageLimit,
  recordAiUsage,
} from "@/lib/ai/usageLimits";

export const runtime = "nodejs";

async function getUser() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Safe to ignore when cookie writes are unavailable.
          }
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return error ? null : user;
}

export async function POST(req: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be signed in to analyze learning files." },
        { status: 401 }
      );
    }

    const [fileAccess, homeworkAccess] = await Promise.all([
      requireEntitlement(user.id, "fileUploads"),
      requireEntitlement(user.id, "homeworkHelp"),
    ]);

    if (!fileAccess.allowed || !homeworkAccess.allowed) {
      return NextResponse.json(
        { error: "File learning help is not included in your current plan." },
        { status: 403 }
      );
    }

    const body = (await req.json()) as {
      fileId?: string;
      learnerQuestion?: string;
    };

    if (!body.fileId) {
      return NextResponse.json(
        { error: "A learning file is required." },
        { status: 400 }
      );
    }

    const { data: learningFile, error: fileError } = await supabaseAdmin
      .from("learning_files")
      .select(
        "id, user_id, world_slug, topic, lesson_id, lesson_title, file_name, mime_type, storage_path"
      )
      .eq("id", body.fileId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (fileError) throw fileError;

    if (!learningFile) {
      return NextResponse.json(
        { error: "Learning file not found." },
        { status: 404 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      await supabaseAdmin
        .from("learning_files")
        .update({
          analysis_status: "uploaded",
          updated_at: new Date().toISOString(),
        })
        .eq("id", learningFile.id)
        .eq("user_id", user.id);

      return NextResponse.json(
        {
          error:
            "The file was uploaded successfully, but adaptive file analysis is not connected yet.",
          uploaded: true,
        },
        { status: 503 }
      );
    }

    const usage = await checkAiUsageLimit({
      userId: user.id,
      planId: fileAccess.planId,
      kind: "file_analysis",
    });

    if (!usage.allowed) {
      return NextResponse.json(
        {
          error:
            "You reached today’s adaptive file-analysis limit. The file is still saved to your learning account.",
          uploaded: true,
          limitReached: true,
        },
        { status: 429 }
      );
    }

    await supabaseAdmin
      .from("learning_files")
      .update({
        analysis_status: "analyzing",
        updated_at: new Date().toISOString(),
      })
      .eq("id", learningFile.id)
      .eq("user_id", user.id);

    const { data: signed, error: signedError } =
      await supabaseAdmin.storage
        .from("learning-files")
        .createSignedUrl(learningFile.storage_path, 600);

    if (signedError || !signed?.signedUrl) {
      throw signedError || new Error("Could not create a private file link.");
    }

    const isImage = String(learningFile.mime_type || "").startsWith("image/");
    const fileInput = isImage
      ? {
          type: "input_image",
          image_url: signed.signedUrl,
          detail: "high",
        }
      : {
          type: "input_file",
          file_url: signed.signedUrl,
          filename: learningFile.file_name,
        };

    const teachingQuestion =
      body.learnerQuestion?.trim() ||
      "Help me understand this material. Identify what I am being asked to learn or solve, teach the needed idea, and give me a first step without doing all of the thinking for me.";

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_TEACHING_MODEL || "gpt-5.6-luna",
        instructions:
          "You are GAHN AI's homework and document learning assistant. Teach rather than simply hand over answers. Explain what the learner needs to understand, identify relevant evidence or steps from the uploaded material, point out uncertainty, and ask a useful follow-up question. For graded schoolwork, guide the learner through the reasoning instead of impersonating the learner. Use clear language and concise sections.",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: JSON.stringify({
                  world: learningFile.world_slug,
                  topic: learningFile.topic,
                  lesson: learningFile.lesson_title,
                  learnerQuestion: teachingQuestion,
                }),
              },
              fileInput,
            ],
          },
        ],
        max_output_tokens: 1200,
        store: false,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Learning file analysis failed:", response.status, details);

      await supabaseAdmin
        .from("learning_files")
        .update({
          analysis_status: "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", learningFile.id)
        .eq("user_id", user.id);

      return NextResponse.json(
        { error: "The file could not be analyzed right now." },
        { status: 502 }
      );
    }

    const payload = await response.json();
    const analysis = extractOpenAIText(payload).trim();

    await supabaseAdmin
      .from("learning_files")
      .update({
        analysis_status: "ready",
        analysis,
        updated_at: new Date().toISOString(),
      })
      .eq("id", learningFile.id)
      .eq("user_id", user.id);

    await recordAiUsage({
      userId: user.id,
      planId: fileAccess.planId,
      kind: "file_analysis",
      model: process.env.OPENAI_TEACHING_MODEL || "gpt-5.6-luna",
      metadata: {
        fileId: learningFile.id,
        fileName: learningFile.file_name,
        worldSlug: learningFile.world_slug,
        topic: learningFile.topic,
      },
    });

    return NextResponse.json({
      fileId: learningFile.id,
      fileName: learningFile.file_name,
      analysis,
    });
  } catch (error) {
    console.error("Homework analysis route failed:", error);

    return NextResponse.json(
      { error: "The learning file could not be analyzed." },
      { status: 500 }
    );
  }
}
