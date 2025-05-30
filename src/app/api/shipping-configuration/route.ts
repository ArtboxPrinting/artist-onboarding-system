import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const supabase = await createClient()
    
    // Map form data to exact database columns for shipping_packaging table
    const shippingData = {
      artist_id: formData.artist_id,
      shipping_model: formData.shipping_model,
      locations_served: formData.locations_served || [],
      domestic_only: formData.domestic_only ?? false,
      standard_turnaround: formData.standard_turnaround,
      express_options: formData.express_options || [],
      signature_required: formData.signature_required ?? false,
      eco_friendly_materials: formData.eco_friendly_materials ?? false,
      branded_insert_cards: formData.branded_insert_cards ?? false,
      custom_labels: formData.custom_labels ?? false,
      certificate_of_authenticity: formData.certificate_of_authenticity ?? false,
      gift_packaging_available: formData.gift_packaging_available ?? false
    }
    
    // Insert shipping & packaging data
    const { data: shippingResult, error: shippingError } = await supabase
      .from('shipping_packaging')
      .insert(shippingData)
      .select()
      .single()
      
    if (shippingError) {
      return NextResponse.json({ 
        success: false, 
        error: `Shipping configuration database error: ${shippingError.message}` 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Shipping configuration data saved successfully!',
      data: shippingResult 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save shipping configuration data.' 
    }, { status: 500 })
  }
}