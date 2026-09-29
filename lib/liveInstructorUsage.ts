import { getCurrentSubscription } from "@/lib/currentSubscription";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const LIVE_INSTRUCTOR_SESSION_CAP_SECONDS = 20 * 60;

type CurrentSubscription = Awaited<
  ReturnType<typeof getCurrentSubscription>
>;

type UsageRow = {
  id: string;
  usage_seconds: number;
  session_limit_seconds: number | null;
  created_at: string;
  ended_at: string | null;
};

function usageWindow(subscription: CurrentSubscription) {
  const storedStart = subscription.currentPeriodStart;
  const storedEnd = subscription.currentPeriodEnd;

  if (storedStart && storedEnd) {
    const start = new Date(storedStart);
    const end = new Date(storedEnd);

    if (
      !Number.isNaN(start.getTime()) &&
      !Number.isNaN(end.getTime()) &&
      start < end
    ) {
      return {
        start: start.toISOString(),
        end: end.toISOString(),
      };
    }
  }

  const now = new Date();
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
  );
  const end = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
  );

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

function accruedSeconds(row: UsageRow, now = Date.now()) {
  if (row.ended_at) {
    return Math.max(0, row.usage_seconds || 0);
  }

  const startedAt = new Date(row.created_at).getTime();

  if (Number.isNaN(startedAt)) {
    return Math.max(0, row.usage_seconds || 0);
  }

  const elapsed = Math.max(0, Math.ceil((now - startedAt) / 1000));
  const cap =
    row.session_limit_seconds ?? LIVE_INSTRUCTOR_SESSION_CAP_SECONDS;

  return Math.min(elapsed, cap);
}

export async function getLiveInstructorUsage(
  userId: string,
  subscription?: CurrentSubscription
) {
  const current =
    subscription ?? (await getCurrentSubscription(userId));

  const limitMinutes =
    current.entitlements.liveInstructorMinutesPerMonth;

  const limitSeconds =
    typeof limitMinutes === "number" && limitMinutes > 0
      ? limitMinutes * 60
      : 0;

  const window = usageWindow(current);

  if (limitSeconds === 0) {
    return {
      planId: current.planId,
      planName: current.entitlements.name,
      limitSeconds,
      usedSeconds: 0,
      remainingSeconds: 0,
      resetAt: window.end,
    };
  }

  const { data, error } = await supabaseAdmin
    .from("ai_usage_events")
    .select(
      "id, usage_seconds, session_limit_seconds, created_at, ended_at"
    )
    .eq("user_id", userId)
    .eq("usage_kind", "live_instructor")
    .gte("created_at", window.start)
    .lt("created_at", window.end);

  if (error) {
    throw error;
  }

  const usedSeconds = (data || []).reduce(
    (total, row) => total + accruedSeconds(row as UsageRow),
    0
  );

  return {
    planId: current.planId,
    planName: current.entitlements.name,
    limitSeconds,
    usedSeconds,
    remainingSeconds: Math.max(0, limitSeconds - usedSeconds),
    resetAt: window.end,
  };
}

export async function finalizeLiveInstructorSession(
  userId: string,
  usageEventId: string
) {
  const { data, error } = await supabaseAdmin
    .from("ai_usage_events")
    .select(
      "id, usage_seconds, session_limit_seconds, created_at, ended_at"
    )
    .eq("id", usageEventId)
    .eq("user_id", userId)
    .eq("usage_kind", "live_instructor")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data || data.ended_at) {
    return getLiveInstructorUsage(userId);
  }

  const seconds = accruedSeconds(data as UsageRow);
  const now = new Date().toISOString();

  const { error: updateError } = await supabaseAdmin
    .from("ai_usage_events")
    .update({
      usage_seconds: seconds,
      ended_at: now,
      updated_at: now,
    })
    .eq("id", usageEventId)
    .eq("user_id", userId)
    .is("ended_at", null);

  if (updateError) {
    throw updateError;
  }

  return getLiveInstructorUsage(userId);
}

export async function finalizePreviousLiveInstructorSession(
  userId: string
) {
  const { data, error } = await supabaseAdmin
    .from("ai_usage_events")
    .select("id")
    .eq("user_id", userId)
    .eq("usage_kind", "live_instructor")
    .is("ended_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data?.id) {
    return;
  }

  await finalizeLiveInstructorSession(userId, data.id);
}

export async function reserveLiveInstructorSession(
  userId: string,
  subscription: CurrentSubscription
) {
  await finalizePreviousLiveInstructorSession(userId);

  const usage = await getLiveInstructorUsage(userId, subscription);

  if (!subscription.entitlements.liveInstructor) {
    return {
      ok: false as const,
      reason: "not_in_plan" as const,
      usage,
    };
  }

  if (usage.limitSeconds <= 0) {
    return {
      ok: false as const,
      reason: "quota_not_configured" as const,
      usage,
    };
  }

  if (usage.remainingSeconds <= 0) {
    return {
      ok: false as const,
      reason: "quota_exhausted" as const,
      usage,
    };
  }

  const sessionLimitSeconds = Math.min(
    usage.remainingSeconds,
    LIVE_INSTRUCTOR_SESSION_CAP_SECONDS
  );

  const { data, error } = await supabaseAdmin
    .from("ai_usage_events")
    .insert({
      user_id: userId,
      usage_kind: "live_instructor",
      plan_id: subscription.planId,
      model: "heygen_liveavatar_full",
      usage_seconds: 0,
      session_limit_seconds: sessionLimitSeconds,
      metadata: {
        instructor: "maya",
        state: "reserved",
      },
    })
    .select("id, created_at")
    .single();

  if (error) {
    if (error.code === "23505") {
      return {
        ok: false as const,
        reason: "session_already_active" as const,
        usage,
      };
    }

    throw error;
  }

  return {
    ok: true as const,
    usage,
    usageEventId: data.id as string,
    sessionLimitSeconds,
  };
}

export async function attachProviderSession(
  usageEventId: string,
  providerSessionId: string | null
) {
  const now = new Date().toISOString();

  const { error } = await supabaseAdmin
    .from("ai_usage_events")
    .update({
      provider_session_id: providerSessionId,
      updated_at: now,
      metadata: {
        instructor: "maya",
        state: "started",
      },
    })
    .eq("id", usageEventId);

  if (error) {
    throw error;
  }
}

export async function cancelLiveInstructorReservation(
  userId: string,
  usageEventId: string
) {
  const now = new Date().toISOString();

  const { error } = await supabaseAdmin
    .from("ai_usage_events")
    .update({
      usage_seconds: 0,
      ended_at: now,
      updated_at: now,
      metadata: {
        instructor: "maya",
        state: "provider_failed",
      },
    })
    .eq("id", usageEventId)
    .eq("user_id", userId)
    .is("ended_at", null);

  if (error) {
    throw error;
  }
}
