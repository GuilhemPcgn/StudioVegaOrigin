"use client"

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function GradientButton({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  disabled,
  ...props 
}: GradientButtonProps) {
  return (
    <button
      className={cn(
        "relative overflow-hidden font-medium rounded-xl transition-all duration-300 transform",
        "focus:outline-none focus:ring-2 focus:ring-violet-500/50",
        {
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
        },
        variant === 'primary' && [
          "bg-gradient-to-r from-violet-500 to-blue-500",
          "hover:from-violet-600 hover:to-blue-600",
          "active:scale-95",
          "text-white shadow-lg shadow-violet-500/25",
          disabled && "opacity-50 cursor-not-allowed hover:from-violet-500 hover:to-blue-500"
        ],
        variant === 'secondary' && [
          "bg-white/10 border border-white/20 backdrop-blur-sm",
          "hover:bg-white/15 text-white",
          "active:scale-95",
        ],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}