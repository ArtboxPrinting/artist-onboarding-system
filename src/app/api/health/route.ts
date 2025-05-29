import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ 
        success: false, 
        database: false,
        error: 'Supabase configuration missing'
      })
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    )

    // Test database connection by querying a simple table
    const { data, error } = await supabase
      .from('artists')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Database connection error:', error)
      return NextResponse.json({ 
        success: false, 
        database: false,
        error: error.message 
      })
    }

    return NextResponse.json({ 
      success: true, 
      database: true,
      timestamp: new Date().toISOString(),
      message: 'System is healthy'
    })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json({ 
      success: false, 
      database: false,
      error: 'Health check failed'
    }, { status: 500 })
  }
}