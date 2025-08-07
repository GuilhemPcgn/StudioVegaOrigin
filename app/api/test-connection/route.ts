import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('briefs')
      .select('count')
      .limit(1)

    if (error) {
      console.error('Supabase connection error:', error)
      return NextResponse.json({
        success: false,
        error: error.message,
        details: 'Erreur de connexion à Supabase'
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Connexion Supabase réussie',
      data: data
    })
  } catch (error) {
    console.error('Test connection error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      details: 'Erreur lors du test de connexion'
    }, { status: 500 })
  }
}
