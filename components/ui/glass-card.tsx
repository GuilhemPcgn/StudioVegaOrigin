"use client"

import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn(
      "backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl",
      "shadow-2xl shadow-black/20",
      className
    )}>
      {children}
    </div>
  )
}