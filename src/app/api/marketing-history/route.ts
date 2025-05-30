import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const supabase = await createClient()
    
    // Map form data to marketing history fields in website_marketing table
    const historyData = {
      exhibition_history: formData.exhibition_history || {},
      press_media_features: formData.press_media_features || [],
      licensing_collaborations: formData.licensing_collaborations || [],
      available_in_stores: formData.available_in_stores ?? false,
      retail_partners: formData.retail_partners || [],
      interested_in_triads: formData.interested_in_triads ?? false
    }
    
    // Update existing website_marketing record with history data
    const { data: historyResult, error: historyError } = await supabase
      .from('website_marketing')
      .update(historyData)
      .eq('artist_id', formData.artist_id)
      .select()
      .single()
      
    if (historyError) {
      return NextResponse.json({ 
        success: false, 
        error: `Marketing history database error: ${historyError.message}` 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Marketing history data saved successfully!',
      data: historyResult 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save marketing history data.' 
    }, { status: 500 })
  }
}