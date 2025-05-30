import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    console.log('Schema test submission received:', formData)

    // Initialize Supabase server client
    const supabase = await createClient()

    // Generate unique artist ID
    const artistId = `artist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // MINIMAL artist data - only fields we're certain exist
    const artistData = {
      id: artistId,
      email: formData.email || 'test@example.com',
      status: 'submitted',
      submitted_at: new Date().toISOString()
    }

    console.log('Attempting to insert minimal data:', artistData)

    // Insert into artists table with minimal data
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

    console.log('Minimal artist data saved successfully:', artist)

    return NextResponse.json({ 
      success: true, 
      message: 'Schema test completed successfully!',
      artistId: artistId,
      artist: artist,
      note: 'This endpoint uses minimal fields to test schema connectivity'
    })

  } catch (error) {
    console.error('Schema test error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Schema test failed.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}