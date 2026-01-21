import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getSupabaseAdmin, shouldResetWeeklyUsage, resetWeeklyUsage } from '@/lib/supabase';
import { getActiveSubscription } from '@/lib/stripe';

const FREE_TIER_WEEKLY_LIMIT = 5;

// GET - Check current usage
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

      if (shouldBePaid !== currentlyPaid) {
        const newTier = shouldBePaid ? 'paid' : 'free';
        await supabaseAdmin
          .from('profiles')
          .update({ subscription_tier: newTier, subscription_status: shouldBePaid ? 'active' : 'free' })
          .eq('id', profile.id);
        profile.subscription_tier = newTier;
      }
    } catch (stripeError) {
      console.error('Error syncing from Stripe:', stripeError);
    }
  }

  // Check if weekly reset is needed
  if (shouldResetWeeklyUsage(profile.weekly_usage_reset_at)) {
    await resetWeeklyUsage(profile.id);
    profile.weekly_usage_count = 0;
  }

  const isPaid = profile.subscription_tier === 'paid';
  const remainingInteractions = isPaid
    ? Infinity
    : Math.max(0, FREE_TIER_WEEKLY_LIMIT - profile.weekly_usage_count);

  return NextResponse.json({
    tier: profile.subscription_tier,
    weeklyUsageCount: profile.weekly_usage_count,
    weeklyLimit: isPaid ? null : FREE_TIER_WEEKLY_LIMIT,
    remainingInteractions: isPaid ? null : remainingInteractions,
    canInteract: isPaid || remainingInteractions > 0,
    resetAt: profile.weekly_usage_reset_at,
  });
}

// POST - Increment usage (called before each counsellor interaction)
export async function POST() {
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

  // Check if weekly reset is needed
  if (shouldResetWeeklyUsage(profile.weekly_usage_reset_at)) {
    await resetWeeklyUsage(profile.id);
    profile.weekly_usage_count = 0;
  }

  // Paid users have unlimited interactions
  if (profile.subscription_tier === 'paid') {
    // Still increment for tracking purposes
    await supabaseAdmin
      .from('profiles')
      .update({ weekly_usage_count: profile.weekly_usage_count + 1 })
      .eq('id', profile.id);

    return NextResponse.json({
      allowed: true,
      tier: 'paid',
      weeklyUsageCount: profile.weekly_usage_count + 1,
    });
  }

  // Free tier: check limit
  if (profile.weekly_usage_count >= FREE_TIER_WEEKLY_LIMIT) {
    return NextResponse.json({
      allowed: false,
      tier: 'free',
      weeklyUsageCount: profile.weekly_usage_count,
      weeklyLimit: FREE_TIER_WEEKLY_LIMIT,
      message: 'Weekly limit reached. Upgrade to continue.',
    });
  }

  // Increment usage
  const { error: updateError } = await supabaseAdmin
    .from('profiles')
    .update({ weekly_usage_count: profile.weekly_usage_count + 1 })
    .eq('id', profile.id);

  if (updateError) {
    return NextResponse.json({ error: 'Failed to update usage' }, { status: 500 });
  }

  const newCount = profile.weekly_usage_count + 1;
  const remaining = FREE_TIER_WEEKLY_LIMIT - newCount;

  return NextResponse.json({
    allowed: true,
    tier: 'free',
    weeklyUsageCount: newCount,
    weeklyLimit: FREE_TIER_WEEKLY_LIMIT,
    remainingInteractions: remaining,
  });
}
