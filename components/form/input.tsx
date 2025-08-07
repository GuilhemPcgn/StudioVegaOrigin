"use client"

import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm",
          "text-white placeholder:text-white/40",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:bg-white/10",
          error ? "border-red-400/50" : "border-white/20 hover:border-white/30",
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"