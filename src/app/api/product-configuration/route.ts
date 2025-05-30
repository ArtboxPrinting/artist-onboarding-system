import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const supabase = await createClient()
    
    // Map form data to exact database columns for product_configurations table
    const configData = {
      artist_id: formData.artist_id,
      offers_unframed_prints: formData.offers_unframed_prints ?? false,
      offers_framed_prints: formData.offers_framed_prints ?? false,
      offers_canvas_wraps: formData.offers_canvas_wraps ?? false,
      offers_block_mounts: formData.offers_block_mounts ?? false,
      offers_greeting_cards: formData.offers_greeting_cards ?? false,
      offers_merchandise: formData.offers_merchandise ?? false,
      offers_originals: formData.offers_originals ?? false,
      unit_system: formData.unit_system || 'metric',
      available_sizes: formData.available_sizes || {},
      custom_sizes_allowed: formData.custom_sizes_allowed ?? false,
      aspect_ratios_allowed: formData.aspect_ratios_allowed || [],
      print_media_options: formData.print_media_options || [],
      frame_colors: formData.frame_colors || [],
      frame_materials: formData.frame_materials || [],
      matting_options: formData.matting_options || [],
      glazing_options: formData.glazing_options || [],
      mounting_styles: formData.mounting_styles || [],
      frame_depths: formData.frame_depths || []
    }
    
    // Insert product configuration data
    const { data: configResult, error: configError } = await supabase
      .from('product_configurations')
      .insert(configData)
      .select()
      .single()
      
    if (configError) {
      return NextResponse.json({ 
        success: false, 
        error: `Product configuration database error: ${configError.message}` 
      }, { status: 500 })
    }
    
    // If product variants provided, insert them
    if (formData.product_variants && Array.isArray(formData.product_variants)) {
      const variants = formData.product_variants.map((variant: any) => ({
        artist_id: formData.artist_id,
        artwork_id: variant.artwork_id,
        sku: variant.sku,
        product_type: variant.product_type,
        size: variant.size,
        media: variant.media,
        frame_color: variant.frame_color,
        base_cost: variant.base_cost,
        markup_percentage: variant.markup_percentage,
        final_price: variant.final_price,
        wholesale_price: variant.wholesale_price,
        is_limited_edition: variant.is_limited_edition ?? false,
        edition_size: variant.edition_size,
        is_signed: variant.is_signed ?? false,
        is_active: variant.is_active ?? true
      }))
      
      const { error: variantError } = await supabase
        .from('product_variants')
        .insert(variants)
        
      if (variantError) {
        return NextResponse.json({ 
          success: false, 
          error: `Product variants database error: ${variantError.message}` 
        }, { status: 500 })
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Product configuration data saved successfully!',
      data: configResult 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save product configuration data.' 
    }, { status: 500 })
  }
}