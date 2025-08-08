"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import { Input } from '@/components/form/input'
import { GlassCard } from '@/components/ui/glass-card'
import { GradientButton } from '@/components/ui/gradient-button'

type OgData = {
  url: string
  title: string | null
  description: string | null
  image: string | null
  screenshot?: string | null
}

interface UrlPreviewListProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
}

function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null
  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
    if (!['http:', 'https:'].includes(url.protocol)) return null
    return url.toString()
  } catch {
    return null
  }
}

export function UrlPreviewList({ value, onChange, label, placeholder }: UrlPreviewListProps) {
  const [input, setInput] = useState('')
  const [items, setItems] = useState<string[]>([])
  const [loadingUrl, setLoadingUrl] = useState<string | null>(null)
  const [previews, setPreviews] = useState<Record<string, OgData | null>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const abortControllers = useRef<Record<string, AbortController>>({})

  useEffect(() => {
    const parsed = (value || '')
      .split('\n')
      .map((u) => u.trim())
      .filter((u) => u.length > 0)
    setItems(parsed)
  }, [value])

  useEffect(() => {
    const next = items.join('\n')
    if (next !== value) onChange(next)
  }, [items])

  const addUrl = (raw: string) => {
    const normalized = normalizeUrl(raw)
    if (!normalized) {
      setErrors((e) => ({ ...e, [raw]: 'URL invalide' }))
      return
    }
    if (items.includes(normalized)) return
    setItems((prev) => [...prev, normalized])
    setInput('')
    fetchPreview(normalized)
  }

  const removeUrl = (url: string) => {
    setItems((prev) => prev.filter((u) => u !== url))
    setPreviews((p) => {
      const { [url]: _, ...rest } = p
      return rest
    })
    setErrors((e) => {
      const { [url]: _, ...rest } = e
      return rest
    })
    const ac = abortControllers.current[url]
    if (ac) ac.abort()
  }

  const fetchPreview = async (url: string) => {
    try {
      setLoadingUrl(url)
      setErrors((e) => {
        const { [url]: _, ...rest } = e
        return rest
      })
      const controller = new AbortController()
      abortControllers.current[url] = controller
      const res = await fetch('/api/og-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Erreur de prévisualisation')
      }
      const data: OgData = json.data
      setPreviews((p) => ({ ...p, [url]: data }))
    } catch (err: any) {
      setPreviews((p) => ({ ...p, [url]: null }))
      setErrors((e) => ({ ...e, [url]: err?.message || 'Erreur' }))
    } finally {
      setLoadingUrl((u) => (u === url ? null : u))
      delete abortControllers.current[url]
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addUrl(input)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Collez une URL et appuyez sur Entrée"}
        />
        <GradientButton type="button" onClick={() => addUrl(input)}>Ajouter</GradientButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((url) => {
          const prev = previews[url]
          const err = errors[url]
          const isLoading = loadingUrl === url
          return (
            <GlassCard key={url} className="p-4">
              <div className="flex justify-end mb-2 gap-2">
                <button
                  type="button"
                  onClick={() => fetchPreview(url)}
                  className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20"
                  disabled={isLoading}
                >
                  Rafraîchir
                </button>
                <button
                  type="button"
                  onClick={() => removeUrl(url)}
                  className="text-xs px-2 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-200"
                >
                  Retirer
                </button>
              </div>

              <div className="flex gap-3">
                <div className="w-24 h-16 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : prev?.screenshot ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={prev.screenshot} alt="aperçu" className="w-full h-full object-cover" />
                  ) : prev?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={prev.image} alt="aperçu" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded bg-white/10" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white truncate" title={prev?.title || url}>
                    {prev?.title || url}
                  </div>
                  <div className="text-white/60 text-sm line-clamp-2">
                    {prev?.description || (isLoading ? 'Chargement...' : err ? 'Aucune donnée disponible' : '—')}
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-violet-300 hover:text-violet-200"
                  >
                    {url}
                  </a>
                </div>
              </div>
              {err && (
                <div className="mt-2 text-xs text-red-300">{err}</div>
              )}
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}


