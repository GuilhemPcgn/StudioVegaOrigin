import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { briefSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form data
    const formDataObj: any = {}
    const entries = Array.from(formData.entries())
    for (const [key, value] of entries) {
      if (key === 'logoFile') {
        formDataObj[key] = value
      } else if (key === 'graphicStyle') {
        if (!formDataObj[key]) formDataObj[key] = []
        formDataObj[key].push(value)
      } else if (key === 'launchDate' && value) {
        formDataObj[key] = new Date(value as string)
      } else if (key === 'numberOfPages') {
        formDataObj[key] = parseInt(value as string, 10)
      } else if (['videosAnimations', 'contactForm', 'multilingual', 'socialNetworks', 'interactiveMap', 'blog', 'analyticsTracking'].includes(key)) {
        formDataObj[key] = value === 'true' || value === 'on'
      } else {
        formDataObj[key] = value
      }
    }
    
    // Validate the form data
    const validatedData = briefSchema.parse(formDataObj)
    
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

    const { data: brief, error } = await supabase
      .from('briefs')
      .insert([briefData])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement du brief' },
        { status: 500 }
      )
    }

    // Handle file upload if logo file is provided
    if (validatedData.logoFile && validatedData.hasLogo === 'yes') {
      const file = validatedData.logoFile as File
      const fileName = `${brief.id}_${Date.now()}_${file.name}`
      
      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('logos')
        .upload(fileName, file)

      if (uploadError) {
        console.error('File upload error:', uploadError)
        // Continue without file upload
      } else {
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
      }
    }

    return NextResponse.json({ success: true, brief })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Erreur de validation ou serveur' },
      { status: 400 }
    )
  }
}