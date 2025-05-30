import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Initialize Supabase server client (auto-configured)
    const supabase = await createClient()

    // Save artist intake data
    const { data, error } = await supabase
      .from('artist_intakes')
      .upsert({
        id: body.id || `intake_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        full_name: body.fullName,
        email: body.email,
        intake_data: body,
        status: body.status || 'draft',
        current_section: body.currentSection || 1,
        submitted_at: body.status === 'submitted' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Database save error:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: body.status === 'submitted' 
        ? 'Artist intake submitted successfully!' 
        : 'Progress saved successfully',
      data: data 
    })

  } catch (error) {
    console.error('Artist intake API error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process artist intake'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Initialize Supabase server client (auto-configured)
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('artist_intakes')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) {
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      data: data || [],
      debug: {
        dataSource: "SERVER_CLIENT_FIXED",
        intakesFound: data?.length || 0,
        message: "Fixed to use server client instead of browser client"
      }
    })

  } catch (error) {
    console.error('Get intakes error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch artist intakes'
    }, { status: 500 })
  }
}
