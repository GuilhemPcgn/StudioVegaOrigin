import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const briefId = searchParams.get('briefId')

    // Utiliser le client admin si la clé de service est disponible, sinon le client normal
    const client = process.env.SUPABASE_SERVICE_ROLE_KEY ? supabaseAdmin : supabase

    if (briefId) {
      // Récupérer les fichiers pour un brief spécifique
      const { data, error } = await client
        .from('files')
        .select('*')
        .eq('brief_id', briefId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json(
          { error: 'Erreur lors de la récupération des fichiers' },
          { status: 500 }
        )
      }

      return NextResponse.json({ files: data })
    } else {
      // Récupérer tous les fichiers
      const { data, error } = await client
        .from('files')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json(
          { error: 'Erreur lors de la récupération des fichiers' },
          { status: 500 }
        )
      }

      return NextResponse.json({ files: data })
    }
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
} 