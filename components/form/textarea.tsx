"use client"

import { cn } from '@/lib/utils'
import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm",
          "text-white placeholder:text-white/40 resize-none",
          "transition-all duration-200 min-h-[120px]",
          "focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:bg-white/10",
          error ? "border-red-400/50" : "border-white/20 hover:border-white/30",
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"