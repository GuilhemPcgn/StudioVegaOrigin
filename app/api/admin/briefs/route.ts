import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Utiliser le client admin si la clé de service est disponible, sinon le client normal
    const client = process.env.SUPABASE_SERVICE_ROLE_KEY ? supabaseAdmin : supabase
    
    const { data, error } = await client
      .from('briefs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des briefs' },
        { status: 500 }
      )
    }

    return NextResponse.json({ briefs: data || [] })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
} 