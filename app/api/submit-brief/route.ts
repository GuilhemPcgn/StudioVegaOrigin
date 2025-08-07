import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { formDataSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  console.log('API submit-brief called')
  
  try {
    const formData = await request.formData()
    console.log('FormData received, entries:', Array.from(formData.entries()).map(([key, value]) => [key, typeof value, value instanceof File ? 'File' : value]))
    
    // Extract form data
    const formDataObj: any = {}
    const entries = Array.from(formData.entries())
    
    for (const [key, value] of entries) {
      console.log(`Processing field: ${key}, type: ${typeof value}, value:`, value)
      
      if (key === 'logoFile') {
        // Handle FileList - take the first file
        if (value instanceof File) {
          formDataObj[key] = value
          console.log('Logo file found:', value.name, value.size)
        }
      } else if (key === 'graphicStyle') {
        // Handle array of graphic styles
        if (!formDataObj[key]) formDataObj[key] = []
        formDataObj[key].push(value)
        console.log('Added to graphicStyle array:', value)
      } else if (key === 'launchDate') {
        // Handle launch date - can be empty string, valid date string, or null
        console.log('Processing launchDate - raw value:', value, 'type:', typeof value)
        
        if (value === '' || value === 'null' || value === 'undefined' || value === null) {
          formDataObj[key] = null
          console.log('Launch date set to null (empty/invalid)')
        } else {
          try {
            const date = new Date(value as string)
            console.log('Date parsing result:', date, 'isValid:', !isNaN(date.getTime()))
            
            if (isNaN(date.getTime())) {
              formDataObj[key] = null
              console.log('Invalid date format, set to null:', value)
            } else {
              formDataObj[key] = date
              console.log('Valid date created:', date)
            }
          } catch (e) {
            console.log('Date parsing error, set to null:', e)
            formDataObj[key] = null
          }
        }
      } else if (key === 'numberOfPages') {
        // Convert string to number
        const num = parseInt(value as string, 10)
        formDataObj[key] = isNaN(num) ? 1 : num
        console.log('NumberOfPages converted:', formDataObj[key])
      } else if (['videosAnimations', 'contactForm', 'multilingual', 'socialNetworks', 'interactiveMap', 'blog', 'analyticsTracking'].includes(key)) {
        // Convert string to boolean
        formDataObj[key] = value === 'true' || value === 'on'
        console.log(`Boolean field ${key}:`, formDataObj[key])
      } else {
        formDataObj[key] = value
        console.log(`Regular field ${key}:`, value)
      }
    }
    
    console.log('Final form data object:', JSON.stringify(formDataObj, null, 2))
    console.log('Graphic style type:', typeof formDataObj.graphicStyle, 'value:', formDataObj.graphicStyle)
    console.log('Launch date type:', typeof formDataObj.launchDate, 'value:', formDataObj.launchDate, 'constructor:', formDataObj.launchDate?.constructor?.name)
    
    // Validate the form data using the formDataSchema
    console.log('Validating form data...')
    const validatedData = formDataSchema.parse(formDataObj)
    console.log('Form data validated successfully')
    
    // Transform data for database
    const briefData = {
      company_name: validatedData.companyName,
      business_sector: validatedData.businessSector,
      business_description: validatedData.businessDescription,
      main_objective: validatedData.mainObjective,
      other_objective: validatedData.otherObjective || null,
      inspiring_websites: validatedData.inspiringWebsites,
      launch_date: validatedData.launchDate?.toISOString() || null,
      has_logo: validatedData.hasLogo,
      color_palette: validatedData.colorPalette,
      preferred_typography: validatedData.preferredTypography,
      graphic_style: validatedData.graphicStyle,
      other_graphic_style: validatedData.otherGraphicStyle || null,
      visual_references: validatedData.visualReferences,
      number_of_pages: validatedData.numberOfPages,
      site_architecture: validatedData.siteArchitecture,
      texts_ready: validatedData.textsReady,
      photos_available: validatedData.photosAvailable,
      videos_animations: validatedData.videosAnimations,
      contact_form: validatedData.contactForm,
      multilingual: validatedData.multilingual,
      languages: validatedData.languages || null,
      social_networks: validatedData.socialNetworks,
      interactive_map: validatedData.interactiveMap,
      blog: validatedData.blog,
      other_features: validatedData.otherFeatures || null,
      target_audience: validatedData.targetAudience,
      seo_importance: validatedData.seoImportance,
      main_keywords: validatedData.mainKeywords,
      analytics_tracking: validatedData.analyticsTracking,
      existing_domain: validatedData.existingDomain,
      domain_name: validatedData.domainName || null,
      hosting: validatedData.hosting,
      maintenance: validatedData.maintenance,
      legal_notices: validatedData.legalNotices,
      privacy_policy: validatedData.privacyPolicy,
      cookie_policy: validatedData.cookiePolicy,
    }

    console.log('Inserting brief into database...')
    const { data: brief, error } = await supabase
      .from('briefs')
      .insert([briefData])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement du brief', details: error.message },
        { status: 500 }
      )
    }

    console.log('Brief inserted successfully:', brief.id)

    // Handle file upload if logo file is provided
    if (validatedData.logoFile && validatedData.hasLogo === 'yes') {
      try {
        console.log('Processing logo file upload...')
        const file = validatedData.logoFile as File
        const fileName = `${brief.id}_${Date.now()}_${file.name}`
        
        // Upload file to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('logos')
          .upload(fileName, file)

        if (uploadError) {
          console.error('File upload error:', uploadError)
          // Continue without file upload - don't fail the entire request
        } else {
          console.log('File uploaded successfully')
          // Get public URL
          const { data: urlData } = supabase.storage
            .from('logos')
            .getPublicUrl(fileName)

          // Save file record to database
          await supabase
            .from('files')
            .insert([{
              brief_id: brief.id,
              file_name: fileName,
              original_name: file.name,
              file_url: urlData.publicUrl,
              file_type: 'logo',
              file_size: file.size
            }])
          console.log('File record saved to database')
        }
      } catch (fileError) {
        console.error('File processing error:', fileError)
        // Continue without file upload
      }
    }

    console.log('API call completed successfully')
    return NextResponse.json({ success: true, brief })
  } catch (error) {
    console.error('API error:', error)
    
    // Return more detailed error information
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Erreur de validation ou serveur', details: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Erreur de validation ou serveur' },
      { status: 400 }
    )
  }
}