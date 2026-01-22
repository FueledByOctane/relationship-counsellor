import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';
import { getSupabaseAdmin, getOrCreateProfile } from '@/lib/supabase';

function generateRoomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, fieldName } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Generate unique room code
    let roomId = generateRoomCode();
    const participantId = uuidv4();

    // Try to get authenticated user
    let profile = null;
    try {
      const { userId } = await auth();
      if (userId) {
        profile = await getOrCreateProfile(userId);

        // Ensure unique room code
        const supabaseAdmin = getSupabaseAdmin();
        let attempts = 0;
        while (attempts < 10) {
          const { data: existing } = await supabaseAdmin
            .from('fields')
            .select('id')
            .eq('code', roomId)
            .single();

          if (!existing) break;
          roomId = generateRoomCode();
          attempts++;
        }

        // Create field in database
        const { error: fieldError } = await supabaseAdmin
          .from('fields')
          .insert({
            code: roomId,
            name: fieldName || `${name}'s Field`,
            creator_id: profile.id,
            partner_a_id: profile.id,
            partner_a_name: name,
          });

        if (fieldError) {
          console.error('Error creating field:', fieldError);
        }
      }
    } catch (authError) {
      // Continue without auth - field won't be persisted
      console.log('Creating field without persistence (no auth)');
    }

    const actualFieldName = fieldName || `${name}'s Field`;

    return NextResponse.json({
      roomId,
      fieldName: actualFieldName,
      participant: {
        id: participantId,
        name,
        role: 'partner-a',
        isOnline: true,
      },
    });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    );
  }
}
