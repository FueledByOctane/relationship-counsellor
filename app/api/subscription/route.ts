import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { createCheckoutSession, createPortalSession, getOrCreateStripeCustomer, getActiveSubscription } from '@/lib/stripe';

// GET - Get current subscription status (syncs from Stripe)
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();

  let { data: profile, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('clerk_id', userId)
    .single();

  // Auto-create profile if it doesn't exist
  if (error || !profile) {
    const { data: newProfile, error: createError } = await supabaseAdmin
      .from('profiles')
      .insert({ clerk_id: userId })
      .select()
      .single();

    if (createError || !newProfile) {
      console.error('Failed to create profile:', createError);
      return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
    }
    profile = newProfile;
  }

  // Sync subscription status from Stripe if customer exists
  if (profile.stripe_customer_id) {
    try {
      const activeSubscription = await getActiveSubscription(profile.stripe_customer_id);
      const shouldBePaid = !!activeSubscription;
      const currentlyPaid = profile.subscription_tier === 'paid';

      // Update database if out of sync
      if (shouldBePaid !== currentlyPaid) {
        const newTier = shouldBePaid ? 'paid' : 'free';
        const newStatus = shouldBePaid ? 'active' : 'free';

        await supabaseAdmin
          .from('profiles')
          .update({
            subscription_tier: newTier,
            subscription_status: newStatus,
          })
          .eq('id', profile.id);

        profile.subscription_tier = newTier;
        profile.subscription_status = newStatus;
      }
    } catch (stripeError) {
      console.error('Error syncing from Stripe:', stripeError);
      // Continue with cached data if Stripe sync fails
    }
  }

  return NextResponse.json({
    subscriptionStatus: profile.subscription_status,
    subscriptionTier: profile.subscription_tier,
    weeklyUsageCount: profile.weekly_usage_count,
    weeklyUsageResetAt: profile.weekly_usage_reset_at,
  });
}

// POST - Create checkout session or portal session
export async function POST(req: Request) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { action } = body;

  const supabaseAdmin = getSupabaseAdmin();

  // Get or create profile
  let { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('clerk_id', userId)
    .single();

  if (!profile) {
    // Create profile if it doesn't exist
    const email = user.emailAddresses[0]?.emailAddress;
    const stripeCustomer = await getOrCreateStripeCustomer(email || '', userId);

    const { data: newProfile, error } = await supabaseAdmin
      .from('profiles')
      .insert({
        clerk_id: userId,
        email,
        stripe_customer_id: stripeCustomer.id,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
    }

    profile = newProfile;
  }

  // Ensure Stripe customer exists
  if (!profile.stripe_customer_id) {
    const email = user.emailAddresses[0]?.emailAddress;
    const stripeCustomer = await getOrCreateStripeCustomer(email || '', userId);

    await supabaseAdmin
      .from('profiles')
      .update({ stripe_customer_id: stripeCustomer.id })
      .eq('id', profile.id);

    profile.stripe_customer_id = stripeCustomer.id;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  if (action === 'checkout') {
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!priceId) {
      return NextResponse.json({ error: 'Stripe price not configured' }, { status: 500 });
    }

    try {
      const session = await createCheckoutSession(
        profile.stripe_customer_id,
        priceId,
        `${baseUrl}/account?success=true`,
        `${baseUrl}/account?canceled=true`
      );

      return NextResponse.json({ url: session.url });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
    }
  }

  if (action === 'portal') {
    try {
      const session = await createPortalSession(
        profile.stripe_customer_id,
        `${baseUrl}/account`
      );

      return NextResponse.json({ url: session.url });
    } catch (error) {
      console.error('Error creating portal session:', error);
      return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
