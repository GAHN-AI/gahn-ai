import { requireEntitlement } from "@/lib/requireEntitlement";
import type { SubscriptionEntitlements } from "@/lib/subscriptionEntitlements";

export async function checkFeatureAccess(
  userId: string,
  feature: keyof SubscriptionEntitlements
) {
  const result = await requireEntitlement(userId, feature);

  return {
    allowed: result.allowed,
    planId: result.planId,
    status: result.status,
  };
}