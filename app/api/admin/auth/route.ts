import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    const secretPassword = process.env.SECRET_PASSWORD
    
    if (!secretPassword) {
      return NextResponse.json(
        { error: 'Mot de passe non configuré' },
        { status: 500 }
      )
    }
    
    if (password === secretPassword) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Erreur d\'authentification' },
      { status: 400 }
    )
  }
} 