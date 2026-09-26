import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { requireEntitlement } from "@/lib/requireEntitlement";

export async function GET() {
  try {
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
              // Safe to ignore here.
            }
          },
        },
      }
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

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