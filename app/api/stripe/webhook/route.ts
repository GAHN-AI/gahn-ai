import { NextResponse } from "next/server";
import Stripe from "stripe";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

import {
  getPlanIdFromStripePriceId,
  isPaidStripePlan,
} from "@/lib/stripePrices";

export const runtime = "nodejs";

function getStripeId(
  value:
    | string
    | { id: string }
    | null
    | undefined
): string | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  return value.id;
}

function getPaidPlanFromSubscription(
  subscription: Stripe.Subscription
) {
  const metadataPlan =
    subscription.metadata?.planId;

  if (
    metadataPlan &&
    isPaidStripePlan(metadataPlan)
  ) {
    return metadataPlan;
  }

  const priceId =
    subscription.items.data[0]?.price.id;

  if (!priceId) {
    return null;
  }

  return getPlanIdFromStripePriceId(priceId);
}

async function saveSubscription(
  subscription: Stripe.Subscription,
  userId?: string | null
) {
  const planId =
    getPaidPlanFromSubscription(subscription);

  if (!planId) {
    console.error(
      "Could not determine GAHN plan for Stripe subscription:",
      subscription.id
    );

    return;
  }

  const customerId =
    getStripeId(subscription.customer);

  const priceId =
    subscription.items.data[0]?.price.id ??
    null;

  const subscriptionData = {
    plan_id: planId,
    status: subscription.status,
    stripe_customer_id: customerId,
    stripe_subscription_id:
      subscription.id,
    stripe_price_id: priceId,
    cancel_at_period_end:
      subscription.cancel_at_period_end,
    updated_at: new Date().toISOString(),
  };

  if (userId) {
    const { error } = await supabaseAdmin
      .from("subscriptions")
      .upsert(
        {
          user_id: userId,
          ...subscriptionData,
        },
        {
          onConflict: "user_id",
        }
      );

    if (error) {
      throw error;
    }

    return;
  }

  const { error } = await supabaseAdmin
    .from("subscriptions")
    .update(subscriptionData)
    .eq(
      "stripe_subscription_id",
      subscription.id
    );

  if (error) {
    throw error;
  }
}

async function cancelSubscription(
  subscription: Stripe.Subscription
) {
  const userId =
    subscription.metadata?.userId;

  const data = {
    plan_id: "explore",
    status: "canceled",
    cancel_at_period_end: false,
    updated_at: new Date().toISOString(),
  };

  if (userId) {
    const { error } = await supabaseAdmin
      .from("subscriptions")
      .update(data)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return;
  }

  const { error } = await supabaseAdmin
    .from("subscriptions")
    .update(data)
    .eq(
      "stripe_subscription_id",
      subscription.id
    );

  if (error) {
    throw error;
  }
}

export async function POST(req: Request) {
  const stripeSecretKey =
    process.env.STRIPE_SECRET_KEY;

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey) {
    return NextResponse.json(
      {
        error: "Missing STRIPE_SECRET_KEY.",
      },
      { status: 500 }
    );
  }

  if (!webhookSecret) {
    return NextResponse.json(
      {
        error:
          "Missing STRIPE_WEBHOOK_SECRET.",
      },
      { status: 500 }
    );
  }

  const signature =
    req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      {
        error:
          "Missing Stripe signature.",
      },
      { status: 400 }
    );
  }

  const stripe =
    new Stripe(stripeSecretKey);

  const rawBody = await req.text();

  let event: Stripe.Event;

  try {
    event =
      stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret
      );
  } catch (error) {
    console.error(
      "Stripe webhook signature failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Invalid Stripe webhook signature.",
      },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session =
          event.data.object as Stripe.Checkout.Session;

        if (
          session.mode !== "subscription"
        ) {
          break;
        }

        const userId =
          session.metadata?.userId ||
          session.client_reference_id;

        const subscriptionId =
          getStripeId(session.subscription);

        if (
          !userId ||
          !subscriptionId
        ) {
          console.error(
            "Checkout completed without GAHN user or subscription ID."
          );

          break;
        }

        const subscription =
          await stripe.subscriptions.retrieve(
            subscriptionId
          );

        await saveSubscription(
          subscription,
          userId
        );

        break;
      }

      case "customer.subscription.updated": {
        const subscription =
          event.data.object as Stripe.Subscription;

        await saveSubscription(
          subscription,
          subscription.metadata?.userId
        );

        break;
      }

      case "customer.subscription.deleted": {
        const subscription =
          event.data.object as Stripe.Subscription;

        await cancelSubscription(
          subscription
        );

        break;
      }

      default:
        break;
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "Stripe webhook processing failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Stripe webhook processing failed.",
      },
      { status: 500 }
    );
  }
}