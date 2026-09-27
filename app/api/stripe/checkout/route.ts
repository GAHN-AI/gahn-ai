import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import {
  getStripePriceId,
  isPaidStripePlan,
} from "@/lib/stripePrices";

import {
  getSubscriptionEntitlements,
} from "@/lib/subscriptionEntitlements";

export async function POST(req: Request) {
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
              // Safe to ignore when cookies cannot be updated here.
            }
          },
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "You must be signed in to subscribe." },
        { status: 401 }
      );
    }
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

      client_reference_id: user.id,
      customer_email: user.email || undefined,

      // Save both the GAHN user and plan inside Stripe.
      metadata: {
        userId: user.id,
        planId: plan,
      },

      // Also save them directly on the subscription so future
      // upgrades, downgrades, and cancellation events stay tied
      // to the correct GAHN account.
      subscription_data: {
        metadata: {
          userId: user.id,
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