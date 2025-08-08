import { NextRequest, NextResponse } from 'next/server'
import mql from '@microlink/mql'

function isValidHttpUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function extractMetaTag(content: string, selector: RegExp): string | null {
  const match = content.match(selector)
  if (!match) return null
  // Prefer content attribute; fallback to innerText for <title>
  return (match.groups?.content || match.groups?.inner || '').trim() || null
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (typeof url !== 'string' || !isValidHttpUrl(url)) {
      return NextResponse.json({ ok: false, error: 'URL invalide' }, { status: 400 })
    }

    // Use Microlink for robust metadata & screenshot
    const { data: microlinkData } = await mql(url, {
      audio: false,
      video: false,
      meta: true,
      palette: false,
      screenshot: true,
      waitUntil: 'load',
    })

    const title = microlinkData.title || microlinkData.og?.title || null
    const description =
      microlinkData.description || microlinkData.og?.description || null
    const image = (microlinkData.image?.url as string | undefined) || null
    const screenshot = (microlinkData.screenshot?.url as string | undefined) || null

    const data = { url, title, description, image, screenshot }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: 'Erreur lors de la récupération des métadonnées' },
      { status: 500 }
    )
  }
}


