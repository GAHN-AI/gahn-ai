import type { SubscriptionPlanId } from "@/lib/subscriptionEntitlements";

export const STRIPE_PRICES = {
  learner_plus: process.env.STRIPE_LEARNER_PLUS_PRICE_ID,
  mastery: process.env.STRIPE_MASTERY_PRICE_ID,
  career_pro: process.env.STRIPE_CAREER_PRO_PRICE_ID,
  classroom_ai: process.env.STRIPE_CLASSROOM_AI_PRICE_ID,
  school_os: process.env.STRIPE_SCHOOL_OS_PRICE_ID,
} as const;

export type StripePaidPlanId = keyof typeof STRIPE_PRICES;

export function getStripePriceId(
  planId: StripePaidPlanId
): string | null {
  return STRIPE_PRICES[planId] || null;
}

export function getPlanIdFromStripePriceId(
  priceId: string
): SubscriptionPlanId | null {
  for (const [planId, configuredPriceId] of Object.entries(
    STRIPE_PRICES
  )) {
    if (configuredPriceId && configuredPriceId === priceId) {
      return planId as SubscriptionPlanId;
    }
  }

  return null;
}

export function isPaidStripePlan(
  planId: string
): planId is StripePaidPlanId {
  return planId in STRIPE_PRICES;
}