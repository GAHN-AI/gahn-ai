import {
  getCurrentSubscription,
} from "@/lib/currentSubscription";

import type {
  SubscriptionEntitlements,
} from "@/lib/subscriptionEntitlements";

export async function requireEntitlement(
  userId: string,
  entitlement: keyof SubscriptionEntitlements
) {
  const subscription = await getCurrentSubscription(userId);

  const allowed = subscription.entitlements[entitlement];

  return {
    allowed: Boolean(allowed),
    planId: subscription.planId,
    status: subscription.status,
    entitlements: subscription.entitlements,
  };
}