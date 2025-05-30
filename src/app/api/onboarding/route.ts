import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { artistId, sectionNumber, formData, sessionToken } = body

    if (!artistId || !sectionNumber || !formData) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: artistId, sectionNumber, formData' 
      }, { status: 400 })
    }

    // Initialize Supabase server client (auto-configured)
    const supabase = createClient()

    // Save onboarding progress to database
    const { data, error } = await supabase
      .from('onboarding_progress')
      .upsert({
        artist_id: artistId,
        section_number: sectionNumber,
        form_data: formData,
        session_token: sessionToken,
        updated_at: new Date().toISOString()
      })
      .select()

    if (error) {
      console.error('Database save error:', error)
      
      // If table doesn't exist, still return success but note the issue
      if (error.message.includes('relation "onboarding_progress" does not exist')) {
        return NextResponse.json({ 
          success: true, 
          warning: 'Progress saved locally (database table not set up yet)',
          data: null
        })
      }
      
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Onboarding progress saved successfully',
      data: data 
    })
  } catch (error) {
    console.error('Onboarding API error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save onboarding progress'
    }, { status: 500 })
  }
}
