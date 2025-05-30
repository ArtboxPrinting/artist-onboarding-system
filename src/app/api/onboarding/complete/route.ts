import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { artistId, sectionData, completedSections } = body

    if (!artistId || !sectionData) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: artistId, sectionData' 
      }, { status: 400 })
    }

    // Initialize Supabase server client (auto-configured)
    const supabase = await createClient()

    // Prepare artist data from onboarding sections
    const section1 = sectionData[1] || {}
    const section2 = sectionData[2] || {}
    const section3 = sectionData[3] || {}
    const section4 = sectionData[4] || {}

    // Create the completed artist record
    const artistData = {
      id: artistId,
      first_name: section1.firstName || 'Unknown',
      last_name: section1.lastName || 'Artist',
      email: section1.email,
      phone: section1.phone,
      location: section1.location,
      bio: section1.bio,
      artist_statement: section1.artistStatement,
      website: section1.website,
      instagram: section1.instagram,
      facebook: section1.facebook,
      brand_colors: section1.brandColors,
      art_styles: section1.artStyle || [],
      experience: section1.experience,
      
      // Section 2 - Artwork catalog
      artwork_count: section2.artworkCount,
      categories: section2.categories || [],
      file_format: section2.fileFormat,
      resolution: section2.resolution,
      catalog_method: section2.catalogMethod,
      artwork_info: section2.artworkInfo,
      
      // Section 3 - Product config
      print_sizes: section3.printSizes || [],
      media_types: section3.mediaTypes || [],
      framing_options: section3.framingOptions || [],
      custom_sizes: section3.customSizes,
      product_preferences: section3.productPreferences,
      quality_level: section3.qualityLevel,
      
      // Section 4 - Pricing
      pricing_strategy: section4.pricingStrategy,
      base_price: parseFloat(section4.basePrice) || 0,
      markup_percentage: parseFloat(section4.markupPercentage) || 0,
      premium_markup: parseFloat(section4.premiumMarkup) || 0,
      volume_discounts: section4.volumeDiscounts || false,
      custom_pricing: section4.customPricing,
      shipping_strategy: section4.shippingStrategy,
      international_shipping: section4.internationalShipping || false,
      tax_handling: section4.taxHandling,
      special_offers: section4.specialOffers,
      price_range_min: parseFloat(section4.priceRangeMin) || 0,
      price_range_max: parseFloat(section4.priceRangeMax) || 0,
      
      // Completion metadata
      onboarding_completed: true,
      completed_sections: completedSections || [],
      completed_at: new Date().toISOString(),
      status: 'in_review'
    }

    // Save to artists table
    const { data, error } = await supabase
      .from('artists')
      .upsert(artistData)
      .select()

    if (error) {
      console.error('Database save error:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 })
    }

    // Also save the complete application to onboarding_applications table
    const { error: appError } = await supabase
      .from('onboarding_applications')
      .upsert({
        artist_id: artistId,
        application_data: sectionData,
        completed_sections: completedSections,
        submitted_at: new Date().toISOString(),
        status: 'submitted'
      })

    // Don't fail if applications table doesn't exist yet
    if (appError && !appError.message.includes('relation "onboarding_applications" does not exist')) {
      console.warn('Applications table error:', appError)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Onboarding application completed successfully!',
      artist: data?.[0],
      next_steps: [
        'Your application is now under review',
        'We will contact you within 2-3 business days',
        'Check your email for further instructions'
      ]
    })
  } catch (error) {
    console.error('Onboarding completion error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to complete onboarding application'
    }, { status: 500 })
  }
}
