import { NextResponse } from "next/server";
import Stripe from "stripe";

import {
  getStripePriceId,
  isPaidStripePlan,
} from "@/lib/stripePrices";

import {
  getSubscriptionEntitlements,
} from "@/lib/subscriptionEntitlements";

export async function POST(req: Request) {
  try {
    // Global safety switch.
    // Paid checkout stays OFF until we finish testing the full subscription system.
    if (process.env.STRIPE_CHECKOUT_ENABLED !== "true") {
      return NextResponse.json(
        {
          error:
            "Paid GAHN AI subscriptions are not available for purchase yet.",
        },
        { status: 503 }
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      console.error("Missing STRIPE_SECRET_KEY.");

      return NextResponse.json(
        {
          error: "Stripe is not configured.",
        },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);

    const body = await req.json();
    const plan = body?.plan;

    if (typeof plan !== "string") {
      return NextResponse.json(
        {
          error: "A subscription plan is required.",
        },
        { status: 400 }
      );
    }

    // Only the five paid Stripe plans are allowed through this route.
    if (!isPaidStripePlan(plan)) {
      return NextResponse.json(
        {
          error: "Invalid paid subscription plan.",
        },
        { status: 400 }
      );
    }

    const entitlements = getSubscriptionEntitlements(plan);

    // Second safety layer.
    // Even if STRIPE_CHECKOUT_ENABLED is accidentally turned on,
    // an individual plan must also be marked purchaseEnabled.
    if (!entitlements.purchaseEnabled) {
      return NextResponse.json(
        {
          error: `${entitlements.name} is not available for purchase yet.`,
        },
        { status: 403 }
      );
    }

    const priceId = getStripePriceId(plan);

    if (!priceId) {
      console.error(`Missing Stripe Price ID for plan: ${plan}`);

      return NextResponse.json(
        {
          error: "This subscription is not configured in Stripe.",
        },
        { status: 500 }
      );
    }

    const origin = new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      payment_method_types: ["card"],

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      // Save the GAHN plan ID inside Stripe.
      metadata: {
        planId: plan,
      },

      // Also save it directly on the subscription.
      subscription_data: {
        metadata: {
          planId: plan,
        },
      },

      success_url: `${origin}/dashboard?checkout=success`,
      cancel_url: `${origin}/pricing?checkout=canceled`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      {
        error: "Failed to create checkout session.",
      },
      { status: 500 }
    );
  }
}