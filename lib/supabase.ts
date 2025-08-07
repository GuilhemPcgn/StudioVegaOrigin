import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      briefs: {
        Row: {
          id: string
          company_name: string
          business_sector: string
          business_description: string
          main_objective: string
          other_objective: string | null
          inspiring_websites: string
          launch_date: string | null
          has_logo: string
          color_palette: string
          preferred_typography: string
          graphic_style: string[]
          other_graphic_style: string | null
          visual_references: string
          number_of_pages: number
          site_architecture: string
          texts_ready: string
          photos_available: string
          videos_animations: boolean
          contact_form: boolean
          multilingual: boolean
          languages: string | null
          social_networks: boolean
          interactive_map: boolean
          blog: boolean
          other_features: string | null
          target_audience: string
          seo_importance: string
          main_keywords: string
          analytics_tracking: boolean
          existing_domain: string
          domain_name: string | null
          hosting: string
          maintenance: string
          legal_notices: string
          privacy_policy: string
          cookie_policy: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_name: string
          business_sector: string
          business_description: string
          main_objective: string
          other_objective?: string | null
          inspiring_websites: string
          launch_date?: string | null
          has_logo: string
          color_palette: string
          preferred_typography: string
          graphic_style: string[]
          other_graphic_style?: string | null
          visual_references: string
          number_of_pages: number
          site_architecture: string
          texts_ready: string
          photos_available: string
          videos_animations: boolean
          contact_form: boolean
          multilingual: boolean
          languages?: string | null
          social_networks: boolean
          interactive_map: boolean
          blog: boolean
          other_features?: string | null
          target_audience: string
          seo_importance: string
          main_keywords: string
          analytics_tracking: boolean
          existing_domain: string
          domain_name?: string | null
          hosting: string
          maintenance: string
          legal_notices: string
          privacy_policy: string
          cookie_policy: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_name?: string
          business_sector?: string
          business_description?: string
          main_objective?: string
          other_objective?: string | null
          inspiring_websites?: string
          launch_date?: string | null
          has_logo?: string
          color_palette?: string
          preferred_typography?: string
          graphic_style?: string[]
          other_graphic_style?: string | null
          visual_references?: string
          number_of_pages?: number
          site_architecture?: string
          texts_ready?: string
          photos_available?: string
          videos_animations?: boolean
          contact_form?: boolean
          multilingual?: boolean
          languages?: string | null
          social_networks?: boolean
          interactive_map?: boolean
          blog?: boolean
          other_features?: string | null
          target_audience?: string
          seo_importance?: string
          main_keywords?: string
          analytics_tracking?: boolean
          existing_domain?: string
          domain_name?: string | null
          hosting?: string
          maintenance?: string
          legal_notices?: string
          privacy_policy?: string
          cookie_policy?: string
          created_at?: string
          updated_at?: string
        }
      }
      files: {
        Row: {
          id: string
          brief_id: string
          file_name: string
          original_name: string
          file_url: string
          file_type: string
          file_size: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brief_id: string
          file_name: string
          original_name: string
          file_url: string
          file_type: string
          file_size: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brief_id?: string
          file_name?: string
          original_name?: string
          file_url?: string
          file_type?: string
          file_size?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}