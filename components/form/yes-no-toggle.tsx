"use client"

import { cn } from '@/lib/utils'

interface YesNoToggleProps {
  value: boolean
  onChange: (value: boolean) => void
  yesLabel?: string
  noLabel?: string
  className?: string
}

export function YesNoToggle({ 
  value, 
  onChange, 
  yesLabel = "Oui",
  noLabel = "Non",
  className 
}: YesNoToggleProps) {
  return (
    <div className={cn("flex space-x-3", className)}>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={cn(
          "px-6 py-2 rounded-full transition-all duration-200 font-medium",
          value 
            ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg" 
            : "bg-white/10 text-white/60 hover:bg-white/15 border border-white/20"
        )}
      >
        {yesLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={cn(
          "px-6 py-2 rounded-full transition-all duration-200 font-medium",
          !value 
            ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg" 
            : "bg-white/10 text-white/60 hover:bg-white/15 border border-white/20"
        )}
      >
        {noLabel}
      </button>
    </div>
  )
}