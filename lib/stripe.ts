import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export function getStripe() {
  if (!stripeSecretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(stripeSecretKey);
}

// Create a Stripe checkout session for subscription
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
}

// Create or get Stripe customer
export async function getOrCreateStripeCustomer(email: string, clerkId: string) {
  const stripe = getStripe();

  // Search for existing customer by metadata
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0];
  }

  // Create new customer
  const customer = await stripe.customers.create({
    email,
    metadata: {
      clerk_id: clerkId,
    },
  });

  return customer;
}

// Get customer's active subscription
export async function getActiveSubscription(customerId: string) {
  const stripe = getStripe();

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
    limit: 1,
  });

  return subscriptions.data[0] || null;
}

// Cancel subscription
export async function cancelSubscription(subscriptionId: string) {
  const stripe = getStripe();

  const subscription = await stripe.subscriptions.cancel(subscriptionId);

  return subscription;
}

// Create customer portal session for managing subscription
export async function createPortalSession(customerId: string, returnUrl: string) {
  const stripe = getStripe();

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}
