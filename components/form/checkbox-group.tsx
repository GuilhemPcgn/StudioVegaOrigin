"use client"

import { cn } from '@/lib/utils'

interface CheckboxOption {
  value: string
  label: string
}

interface CheckboxGroupProps {
  value: string[]
  onChange: (value: string[]) => void
  options: CheckboxOption[]
  className?: string
}

export function CheckboxGroup({ value, onChange, options, className }: CheckboxGroupProps) {
  const handleChange = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue]
    onChange(newValue)
  }

  return (
    <div className={cn("space-y-3", className)}>
      {options.map((option) => {
        const isChecked = value.includes(option.value)
        return (
          <label
            key={option.value}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleChange(option.value)}
                className="sr-only"
              />
              <div className={cn(
                "w-5 h-5 rounded border-2 transition-all duration-200",
                "flex items-center justify-center",
                isChecked 
                  ? "bg-gradient-to-r from-violet-500 to-blue-500 border-violet-500" 
                  : "bg-white/5 border-white/30 group-hover:border-white/50"
              )}>
                {isChecked && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
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