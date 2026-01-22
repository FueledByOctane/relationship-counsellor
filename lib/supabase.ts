import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Client-side Supabase client (uses anon key)
// Lazy initialization to avoid build errors when env vars are not set
let _supabase: SupabaseClient | null = null;

export function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and anon key are required');
  }
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

// For backwards compatibility (deprecated, use getSupabase() instead)
export const supabase = {
  get client() {
    return getSupabase();
  }
};

// Server-side Supabase client (uses service key for admin operations)
let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin() {
  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not configured');
  }
  if (!supabaseServiceKey) {
    throw new Error('SUPABASE_SERVICE_KEY is not configured');
  }
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  }
  return _supabaseAdmin;
}

// Types for database tables
export interface Profile {
  id: string;
  clerk_id: string;
  email: string | null;
  stripe_customer_id: string | null;
  subscription_status: 'free' | 'active' | 'cancelled';
  subscription_tier: 'free' | 'paid';
  weekly_usage_count: number;
  weekly_usage_reset_at: string;
  relationship_goals: string[] | null;
  created_at: string;
}

export interface Session {
  id: string;
  profile_id: string;
  field_id: string | null;
  room_id: string;
  messages: object | null;
  summary: string | null;
  guidance_mode: string | null;
  created_at: string;
}

export interface Field {
  id: string;
  code: string;
  name: string | null;
  creator_id: string | null;
  partner_a_id: string | null;
  partner_a_name: string | null;
  partner_b_id: string | null;
  partner_b_name: string | null;
  guidance_mode: string;
  is_active: boolean;
  last_activity_at: string;
  created_at: string;
}

// Helper to get or create user profile
export async function getOrCreateProfile(clerkId: string, email?: string) {
  const supabaseAdmin = getSupabaseAdmin();

  // Try to get existing profile
  const { data: existingProfile, error: fetchError } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('clerk_id', clerkId)
    .single();

  if (existingProfile) {
    return existingProfile as Profile;
  }

  // Create new profile if it doesn't exist
  const { data: newProfile, error: createError } = await supabaseAdmin
    .from('profiles')
    .insert({
      clerk_id: clerkId,
      email: email || null,
    })
    .select()
    .single();

  if (createError) {
    throw new Error(`Failed to create profile: ${createError.message}`);
  }

  return newProfile as Profile;
}

// Check if weekly usage should be reset
export function shouldResetWeeklyUsage(resetAt: string): boolean {
  const resetDate = new Date(resetAt);
  const now = new Date();
  const daysSinceReset = (now.getTime() - resetDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceReset >= 7;
}

// Reset weekly usage counter
export async function resetWeeklyUsage(profileId: string) {
  const supabaseAdmin = getSupabaseAdmin();

  const { error } = await supabaseAdmin
    .from('profiles')
    .update({
      weekly_usage_count: 0,
      weekly_usage_reset_at: new Date().toISOString(),
    })
    .eq('id', profileId);

  if (error) {
    throw new Error(`Failed to reset weekly usage: ${error.message}`);
  }
}

// Increment usage counter
export async function incrementUsage(profileId: string) {
  const supabaseAdmin = getSupabaseAdmin();

  const { data, error } = await supabaseAdmin.rpc('increment_usage', {
    profile_uuid: profileId,
  });

  if (error) {
    // Fallback if RPC doesn't exist
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('weekly_usage_count')
      .eq('id', profileId)
      .single();

    if (profile) {
      await supabaseAdmin
        .from('profiles')
        .update({ weekly_usage_count: profile.weekly_usage_count + 1 })
        .eq('id', profileId);
    }
  }

  return data;
}
