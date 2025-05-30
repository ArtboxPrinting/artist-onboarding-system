import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    const supabase = await createClient()
    
    // Map form data to exact database columns for artworks table
    const artworkData = {
      artist_id: formData.artist_id,
      title: formData.title,
      year_created: formData.year_created,
      medium: formData.medium,
      description: formData.description,
      orientation: formData.orientation,
      keywords: formData.keywords || [],
      original_file_url: formData.original_file_url,
      print_ready_file_url: formData.print_ready_file_url,
      thumbnail_url: formData.thumbnail_url,
      file_metadata: formData.file_metadata || {},
      is_active: formData.is_active ?? true,
      sort_order: formData.sort_order ?? 0
    }
    
    // Insert artwork data
    const { data: artworkResult, error: artworkError } = await supabase
      .from('artworks')
      .insert(artworkData)
      .select()
      .single()
      
    if (artworkError) {
      return NextResponse.json({ 
        success: false, 
        error: `Artwork database error: ${artworkError.message}` 
      }, { status: 500 })
    }
    
    // If file upload data provided, insert file uploads
    if (formData.file_uploads && Array.isArray(formData.file_uploads)) {
      const fileUploads = formData.file_uploads.map((upload: any) => ({
        artist_id: formData.artist_id,
        artwork_id: artworkResult.id,
        original_filename: upload.original_filename,
        stored_filename: upload.stored_filename,
        file_path: upload.file_path,
        file_type: upload.file_type,
        file_size: upload.file_size,
        width: upload.width,
        height: upload.height,
        dpi: upload.dpi,
        color_profile: upload.color_profile,
        processing_status: upload.processing_status || 'pending',
        category: upload.category
      }))
      
      const { error: uploadError } = await supabase
        .from('file_uploads')
        .insert(fileUploads)
        
      if (uploadError) {
        return NextResponse.json({ 
          success: false, 
          error: `File uploads database error: ${uploadError.message}` 
        }, { status: 500 })
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Artwork catalog data saved successfully!',
      data: artworkResult 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save artwork catalog data.' 
    }, { status: 500 })
  }
}