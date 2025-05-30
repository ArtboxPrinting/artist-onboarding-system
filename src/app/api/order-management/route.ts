import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const supabase = await createClient()
    
    // Map form data to exact database columns for order_management table
    const orderData = {
      artist_id: formData.artist_id,
      order_notification_email: formData.order_notification_email,
      customer_support_email: formData.customer_support_email,
      return_process: formData.return_process,
      business_registration_name: formData.business_registration_name,
      tax_number: formData.tax_number,
      include_retail_pricing_on_slips: formData.include_retail_pricing_on_slips ?? false
    }
    
    // Insert order management data
    const { data: orderResult, error: orderError } = await supabase
      .from('order_management')
      .insert(orderData)
      .select()
      .single()
      
    if (orderError) {
      return NextResponse.json({ 
        success: false, 
        error: `Order management database error: ${orderError.message}` 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Order management data saved successfully!',
      data: orderResult 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save order management data.' 
    }, { status: 500 })
  }
}