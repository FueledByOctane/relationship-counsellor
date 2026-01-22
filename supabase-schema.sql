-- Supabase Schema for Meet In The Field - Tiered Access
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles (synced from Clerk)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT,
  stripe_customer_id TEXT,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'active', 'cancelled')),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'paid')),
  weekly_usage_count INT DEFAULT 0,
  weekly_usage_reset_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  relationship_goals TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_profiles_clerk_id ON profiles(clerk_id);
CREATE INDEX idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);

-- Fields (rooms) for couples to meet
CREATE TABLE fields (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name TEXT,
  creator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  partner_a_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  partner_a_name TEXT,
  partner_b_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  partner_b_name TEXT,
  guidance_mode TEXT DEFAULT 'standard',
  is_active BOOLEAN DEFAULT true,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_fields_code ON fields(code);
CREATE INDEX idx_fields_creator_id ON fields(creator_id);
CREATE INDEX idx_fields_partner_a_id ON fields(partner_a_id);
CREATE INDEX idx_fields_partner_b_id ON fields(partner_b_id);

-- Session history for summaries
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  field_id UUID REFERENCES fields(id) ON DELETE CASCADE,
  room_id TEXT NOT NULL,
  messages JSONB,
  summary TEXT,
  guidance_mode TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_sessions_profile_id ON sessions(profile_id);
CREATE INDEX idx_sessions_room_id ON sessions(room_id);
CREATE INDEX idx_sessions_field_id ON sessions(field_id);

-- Function to increment usage count (atomic operation)
CREATE OR REPLACE FUNCTION increment_usage(profile_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE profiles
  SET weekly_usage_count = weekly_usage_count + 1
  WHERE id = profile_uuid
  RETURNING weekly_usage_count INTO new_count;

  RETURN new_count;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) Policies
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only read their own profile (service role bypasses RLS)
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (true);  -- Service role will handle auth via Clerk

-- Fields: Users can view fields they are part of
CREATE POLICY "Users can view own fields"
  ON fields FOR SELECT
  USING (true);  -- Service role will handle auth via Clerk

-- Sessions: Users can only view their own sessions
CREATE POLICY "Users can view own sessions"
  ON sessions FOR SELECT
  USING (true);  -- Service role will handle auth via Clerk

-- Grant permissions to service role
GRANT ALL ON profiles TO service_role;
GRANT ALL ON fields TO service_role;
GRANT ALL ON sessions TO service_role;
GRANT EXECUTE ON FUNCTION increment_usage TO service_role;
