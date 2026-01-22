import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getSupabaseAdmin, getOrCreateProfile } from '@/lib/supabase';

// GET - List user's fields
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profile = await getOrCreateProfile(userId);
    const supabaseAdmin = getSupabaseAdmin();

    // Get fields where user is partner A or partner B
    const { data: fields, error } = await supabaseAdmin
      .from('fields')
      .select('*')
      .or(`partner_a_id.eq.${profile.id},partner_b_id.eq.${profile.id}`)
      .eq('is_active', true)
      .order('last_activity_at', { ascending: false });

    if (error) {
      console.error('Error fetching fields:', error);
      return NextResponse.json({ error: 'Failed to fetch fields' }, { status: 500 });
    }

    // Transform fields for client
    const transformedFields = (fields || []).map(field => ({
      id: field.id,
      code: field.code,
      name: field.name,
      role: field.partner_a_id === profile.id ? 'partner-a' : 'partner-b',
      partnerName: field.partner_a_id === profile.id ? field.partner_b_name : field.partner_a_name,
      yourName: field.partner_a_id === profile.id ? field.partner_a_name : field.partner_b_name,
      guidanceMode: field.guidance_mode,
      lastActivityAt: field.last_activity_at,
      createdAt: field.created_at,
      isCreator: field.creator_id === profile.id,
    }));

    return NextResponse.json({ fields: transformedFields });
  } catch (error) {
    console.error('Error in fields GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete/archive a field
export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const fieldId = searchParams.get('id');

    if (!fieldId) {
      return NextResponse.json({ error: 'Field ID is required' }, { status: 400 });
    }

    const profile = await getOrCreateProfile(userId);
    const supabaseAdmin = getSupabaseAdmin();

    // Verify user owns this field (is partner A or B)
    const { data: field } = await supabaseAdmin
      .from('fields')
      .select('*')
      .eq('id', fieldId)
      .single();

    if (!field) {
      return NextResponse.json({ error: 'Field not found' }, { status: 404 });
    }

    if (field.partner_a_id !== profile.id && field.partner_b_id !== profile.id) {
      return NextResponse.json({ error: 'Not authorized to delete this field' }, { status: 403 });
    }

    // Soft delete - mark as inactive
    const { error: deleteError } = await supabaseAdmin
      .from('fields')
      .update({ is_active: false })
      .eq('id', fieldId);

    if (deleteError) {
      console.error('Error deleting field:', deleteError);
      return NextResponse.json({ error: 'Failed to delete field' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in fields DELETE:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
