import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getStripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  const stripe = getStripe();

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId = session.customer as string;

      // Update user subscription status
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({
          subscription_status: 'active',
          subscription_tier: 'paid',
        })
        .eq('stripe_customer_id', customerId);

      if (error) {
        console.error('Error updating subscription status:', error);
      }
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const status = subscription.status;

      let subscriptionStatus: 'free' | 'active' | 'cancelled' = 'free';
      let subscriptionTier: 'free' | 'paid' = 'free';

      if (status === 'active' || status === 'trialing') {
        subscriptionStatus = 'active';
        subscriptionTier = 'paid';
      } else if (status === 'canceled' || status === 'unpaid') {
        subscriptionStatus = 'cancelled';
        subscriptionTier = 'free';
      }

      const { error } = await supabaseAdmin
        .from('profiles')
        .update({
          subscription_status: subscriptionStatus,
          subscription_tier: subscriptionTier,
        })
        .eq('stripe_customer_id', customerId);

      if (error) {
        console.error('Error updating subscription:', error);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      // Revert to free tier
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({
          subscription_status: 'cancelled',
          subscription_tier: 'free',
        })
        .eq('stripe_customer_id', customerId);

      if (error) {
        console.error('Error reverting subscription:', error);
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      // Could notify user or update status
      console.log(`Payment failed for customer ${customerId}`);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
