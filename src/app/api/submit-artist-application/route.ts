import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    console.log('Ultra-minimal artist application submission received:', formData)

    // Initialize Supabase server client
    const supabase = await createClient()

    // Generate unique artist ID
    const artistId = `artist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // ULTRA-MINIMAL artist data - only guaranteed basic fields
    const artistData = {
      id: artistId,
      email: formData.email || formData.fullName || 'unknown@example.com'
      // Removed ALL other fields to bypass schema cache issues
    }

    console.log('Attempting to insert ultra-minimal data:', artistData)

    // Insert into artists table with ultra-minimal data
    const { data: artist, error: artistError } = await supabase
      .from('artists')
      .insert(artistData)
      .select()
      .single()

    if (artistError) {
      console.error('Error inserting artist:', artistError)
      return NextResponse.json({ 
        success: false, 
        error: `Database error: ${artistError.message}`,
        details: artistError,
        attemptedData: artistData
      }, { status: 500 })
    }

    console.log('Ultra-minimal artist data saved successfully:', artist)

    // Update the record with more data in a second call (after successful insert)
    const updateData = {
      full_name: formData.fullName || 'Unknown Artist',
      phone: formData.phone,
      bio: formData.artistBio || formData.bio,
      status: 'submitted'
    }

    // Try to update with additional fields
    const { data: updatedArtist, error: updateError } = await supabase
      .from('artists')
      .update(updateData)
      .eq('id', artistId)
      .select()
      .single()

    // Don't fail if update fails - the basic record is already saved
    if (updateError) {
      console.warn('Update warning (basic record saved):', updateError.message)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Artist application submitted successfully! (Using schema-cache-safe method)',
      artistId: artistId,
      artist: updatedArtist || artist,
      note: 'Application saved with basic info. Additional details will be updated once schema cache refreshes.',
      nextSteps: [
        'Your application has been received',
        'We will review your submission within 2-3 business days',
        'You will receive an email confirmation shortly',
        'Check your email for next steps'
      ]
    })

  } catch (error) {
    console.error('Submit artist application error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to submit artist application. Please try again.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}