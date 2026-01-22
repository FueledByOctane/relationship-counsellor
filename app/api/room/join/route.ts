import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';
import { getSupabaseAdmin, getOrCreateProfile } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roomId, name } = body;

    if (!roomId || typeof roomId !== 'string') {
      return NextResponse.json(
        { error: 'Field code is required' },
        { status: 400 }
      );
    }

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const code = roomId.toUpperCase();
    const participantId = uuidv4();

    // Try to get authenticated user and update field
    try {
      const { userId } = await auth();
      if (userId) {
        const profile = await getOrCreateProfile(userId);
        const supabaseAdmin = getSupabaseAdmin();

        // Check if field exists
        const { data: field } = await supabaseAdmin
          .from('fields')
          .select('*')
          .eq('code', code)
          .single();

        if (field) {
          // Determine role based on who's already in the field
          let role: 'partner-a' | 'partner-b' = 'partner-b';

          // If this user is partner A (creator rejoining), keep them as partner A
          if (field.partner_a_id === profile.id) {
            role = 'partner-a';
          } else if (!field.partner_b_id || field.partner_b_id === profile.id) {
            // If partner B slot is empty or this user is partner B, join as partner B
            await supabaseAdmin
              .from('fields')
              .update({
                partner_b_id: profile.id,
                partner_b_name: name,
                last_activity_at: new Date().toISOString(),
              })
              .eq('id', field.id);
            role = 'partner-b';
          }

          // Update last activity
          await supabaseAdmin
            .from('fields')
            .update({ last_activity_at: new Date().toISOString() })
            .eq('id', field.id);

          return NextResponse.json({
            roomId: code,
            participant: {
              id: participantId,
              name,
              role,
              isOnline: true,
            },
            field: {
              id: field.id,
              name: field.name,
              partnerAName: field.partner_a_name,
              partnerBName: role === 'partner-b' ? name : field.partner_b_name,
            },
          });
        }
      }
    } catch (authError) {
      // Continue without auth
      console.log('Joining field without persistence (no auth)');
    }

    // If no field found in DB or no auth, still allow joining (for backward compatibility)
    return NextResponse.json({
      roomId: code,
      participant: {
        id: participantId,
        name,
        role: 'partner-b',
        isOnline: true,
      },
    });
  } catch (error) {
    console.error('Error joining room:', error);
    return NextResponse.json(
      { error: 'Failed to join field' },
      { status: 500 }
    );
  }
}
