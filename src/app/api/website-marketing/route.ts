import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const supabase = await createClient()
    
    // Map form data to exact database columns for website_marketing table
    const marketingData = {
      artist_id: formData.artist_id,
      include_home: formData.include_home ?? true,
      include_gallery_shop: formData.include_gallery_shop ?? true,
      include_about: formData.include_about ?? true,
      include_contact: formData.include_contact ?? true,
      include_faq_returns: formData.include_faq_returns ?? false,
      include_blog_journal: formData.include_blog_journal ?? false,
      include_commission_info: formData.include_commission_info ?? false,
      email_marketing: formData.email_marketing ?? false,
      blog_updates: formData.blog_updates ?? false,
      google_analytics_id: formData.google_analytics_id,
      facebook_pixel_id: formData.facebook_pixel_id,
      promotion_strategy: formData.promotion_strategy,
      social_media_accounts: formData.social_media_accounts || {},
      preferred_promotion_platform: formData.preferred_promotion_platform,
      has_existing_email_list: formData.has_existing_email_list ?? false,
      email_subscribers_count: formData.email_subscribers_count,
      current_email_platform: formData.current_email_platform,
      communication_frequency: formData.communication_frequency,
      press_media_features: formData.press_media_features || [],
      exhibition_history: formData.exhibition_history || {},
      available_in_stores: formData.available_in_stores ?? false,
      retail_partners: formData.retail_partners || [],
      licensing_collaborations: formData.licensing_collaborations || [],
      interested_in_triads: formData.interested_in_triads ?? false,
      artwork_use_permission: formData.artwork_use_permission
    }
    
    // Insert website & marketing data
    const { data: marketingResult, error: marketingError } = await supabase
      .from('website_marketing')
      .insert(marketingData)
      .select()
      .single()
      
    if (marketingError) {
      return NextResponse.json({ 
        success: false, 
        error: `Website marketing database error: ${marketingError.message}` 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Website marketing data saved successfully!',
      data: marketingResult 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save website marketing data.' 
    }, { status: 500 })
  }
}