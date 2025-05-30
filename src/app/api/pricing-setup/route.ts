import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const supabase = await createClient()
    
    // Handle bulk pricing updates for product variants
    if (formData.pricing_updates && Array.isArray(formData.pricing_updates)) {
      for (const pricingUpdate of formData.pricing_updates) {
        const pricingData = {
          base_cost: pricingUpdate.base_cost,
          markup_percentage: pricingUpdate.markup_percentage,
          final_price: pricingUpdate.final_price,
          wholesale_price: pricingUpdate.wholesale_price,
          is_limited_edition: pricingUpdate.is_limited_edition ?? false,
          edition_size: pricingUpdate.edition_size,
          is_signed: pricingUpdate.is_signed ?? false
        }
        
        const { error: updateError } = await supabase
          .from('product_variants')
          .update(pricingData)
          .eq('id', pricingUpdate.variant_id)
          .eq('artist_id', formData.artist_id)
          
        if (updateError) {
          return NextResponse.json({ 
            success: false, 
            error: `Pricing update error: ${updateError.message}` 
          }, { status: 500 })
        }
      }
    }
    
    // Handle new product variants with pricing
    if (formData.new_variants && Array.isArray(formData.new_variants)) {
      const variants = formData.new_variants.map((variant: any) => ({
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
          error: `New variants database error: ${variantError.message}` 
        }, { status: 500 })
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Pricing setup data saved successfully!'
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save pricing setup data.' 
    }, { status: 500 })
  }
}