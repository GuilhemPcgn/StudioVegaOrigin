"use client"

import { useState } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  value: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
  error?: boolean
  className?: string
}

export function DatePicker({ 
  value, 
  onChange, 
  placeholder = "Sélectionner une date",
  error,
  className 
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value
    if (dateValue) {
      onChange(new Date(dateValue))
    } else {
      onChange(null)
    }
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <input
          type="date"
          value={value ? format(value, 'yyyy-MM-dd') : ''}
          onChange={handleDateChange}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-white/5 border backdrop-blur-sm",
            "text-white placeholder:text-white/40",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:bg-white/10",
            error ? "border-red-400/50" : "border-white/20 hover:border-white/30",
            "pr-10"
          )}
        />
        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40 pointer-events-none" />
      </div>
    </div>
  )
}