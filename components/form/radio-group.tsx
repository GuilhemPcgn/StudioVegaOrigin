"use client"

import { cn } from '@/lib/utils'

interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
  value: string
  onChange: (value: string) => void
  options: RadioOption[]
  className?: string
}

export function RadioGroup({ value, onChange, options, className }: RadioGroupProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {options.map((option) => {
        const isSelected = value === option.value
        return (
          <label
            key={option.value}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative">
              <input
                type="radio"
                name="radio-group"
                value={option.value}
                checked={isSelected}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
              />
              <div className={cn(
                "w-5 h-5 rounded-full border-2 transition-all duration-200",
                "flex items-center justify-center",
                isSelected 
                  ? "border-violet-500" 
                  : "border-white/30 group-hover:border-white/50"
              )}>
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                )}
              </div>
            </div>
            <span className="text-white group-hover:text-white/90 transition-colors">
              {option.label}
            </span>
          </label>
        )
      })}
    </div>
  )
}