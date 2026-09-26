import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  getSubscriptionEntitlements,
  type SubscriptionPlanId,
} from "@/lib/subscriptionEntitlements";

const ACCESS_STATUSES = new Set(["active", "trialing"]);

export async function getCurrentSubscription(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .select(
      "plan_id, status, current_period_end, cancel_at_period_end"
    )
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  const storedPlanId =
    (data?.plan_id as SubscriptionPlanId | undefined) ?? "explore";

  const hasPaidAccess =
    storedPlanId !== "explore" &&
    ACCESS_STATUSES.has(data?.status ?? "");

  const planId: SubscriptionPlanId = hasPaidAccess
    ? storedPlanId
    : "explore";

  return {
    planId,
    status: data?.status ?? "free",
    currentPeriodEnd: data?.current_period_end ?? null,
    cancelAtPeriodEnd: data?.cancel_at_period_end ?? false,
    entitlements: getSubscriptionEntitlements(planId),
  };
}