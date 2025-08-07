import { NextResponse } from 'next/server'

export async function GET() {
  const envCheck = {
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  }

  return NextResponse.json({
    success: true,
    environment: envCheck,
    message: 'Variables d\'environnement vérifiées'
  })
}
