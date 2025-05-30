import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    console.log('Artist application submission received:', formData)

    // Initialize Supabase server client
    const supabase = await createClient()

    // Generate unique artist ID
    const artistId = `artist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Extract artist basic information from form data
    const artistData = {
      id: artistId,
      full_name: formData.fullName || 'Unknown Artist',
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      business_number: formData.businessNumber,
      bio: formData.artistBio || formData.bio,
      
      // Brand information
      brand_colors: formData.brandColors || formData.colorPalette,
      tagline: formData.tagline,
      artistic_style: formData.artisticStyle,
      font_preferences: formData.fontPreferences,
      
      // Social media
      instagram: formData.instagram,
      facebook: formData.facebook,
      website: formData.domainName,
      
      // Design preferences
      design_style: formData.designStyle,
      design_elements: formData.designElements,
      website_references: formData.websiteReferences,
      
      // Completion status - TEMPORARILY REMOVED ONBOARDING_COMPLETED FIELD
      // onboarding_completed: true,  // Will add back once Supabase schema cache refreshes
      submitted_at: new Date().toISOString(),
      status: 'submitted'
    }

    // Insert into artists table
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
        details: artistError
      }, { status: 500 })
    }

    // Also save to artist_branding table if it exists
    const brandingData = {
      artist_id: artistId,
      brand_name: formData.fullName || 'Artist Brand',
      brand_colors: [formData.brandColors, formData.colorPalette].filter(Boolean),
      brand_fonts: [formData.fontPreferences].filter(Boolean),
      brand_style: formData.artisticStyle || formData.designStyle,
      brand_description: formData.artistBio,
      tagline: formData.tagline,
      website_references: formData.websiteReferences
    }

    const { error: brandingError } = await supabase
      .from('artist_branding')
      .insert(brandingData)

    // Don't fail if branding table has issues
    if (brandingError) {
      console.warn('Branding table warning:', brandingError.message)
    }

    console.log('Artist application saved successfully:', artist)

    return NextResponse.json({ 
      success: true, 
      message: 'Artist application submitted successfully!',
      artistId: artistId,
      artist: artist,
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