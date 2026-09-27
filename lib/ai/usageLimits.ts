import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { SubscriptionPlanId } from "@/lib/subscriptionEntitlements";

export type AiUsageKind = "teaching_turn" | "file_analysis";

const defaultDailyLimits: Record<
  SubscriptionPlanId,
  Record<AiUsageKind, number | null>
> = {
  explore: {
    teaching_turn: 40,
    file_analysis: 5,
  },
  learner_plus: {
    teaching_turn: 100,
    file_analysis: 10,
  },
  mastery: {
    teaching_turn: 250,
    file_analysis: 25,
  },
  career_pro: {
    teaching_turn: 500,
    file_analysis: 50,
  },
  classroom_ai: {
    teaching_turn: 1000,
    file_analysis: 100,
  },
  school_os: {
    teaching_turn: 5000,
    file_analysis: 500,
  },
  district_government: {
    teaching_turn: null,
    file_analysis: null,
  },
};

function envNumber(name: string): number | null | undefined {
  const value = process.env[name];
  if (!value) return undefined;
  if (value.toLowerCase() === "unlimited") return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

export function getDailyAiLimit(
  planId: SubscriptionPlanId,
  kind: AiUsageKind
): number | null {
  if (planId === "explore") {
    const override =
      kind === "teaching_turn"
        ? envNumber("EARLY_ACCESS_AI_TURNS_PER_DAY")
        : envNumber("EARLY_ACCESS_FILE_ANALYSES_PER_DAY");

    if (override !== undefined) return override;
  }

  return defaultDailyLimits[planId][kind];
}

function startOfUtcDay() {
  const now = new Date();
  return new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
      0
    )
  ).toISOString();
}

export async function checkAiUsageLimit(args: {
  userId: string;
  planId: SubscriptionPlanId;
  kind: AiUsageKind;
}) {
  const limit = getDailyAiLimit(args.planId, args.kind);

  if (limit === null) {
    return {
      allowed: true,
      used: 0,
      limit: null,
      remaining: null,
    };
  }

  const { count, error } = await supabaseAdmin
    .from("ai_usage_events")
    .select("id", { count: "exact", head: true })
    .eq("user_id", args.userId)
    .eq("usage_kind", args.kind)
    .gte("created_at", startOfUtcDay());

  if (error) throw error;

  const used = count || 0;

  return {
    allowed: used < limit,
    used,
    limit,
    remaining: Math.max(limit - used, 0),
  };
}

export async function recordAiUsage(args: {
  userId: string;
  planId: SubscriptionPlanId;
  kind: AiUsageKind;
  model: string;
  metadata?: Record<string, unknown>;
}) {
  const { error } = await supabaseAdmin.from("ai_usage_events").insert({
    user_id: args.userId,
    usage_kind: args.kind,
    plan_id: args.planId,
    model: args.model,
    metadata: args.metadata || {},
  });

  if (error) throw error;
}
