"use client"

import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  error?: boolean
  className?: string
}

export function Select({ 
  value, 
  onChange, 
  options, 
  placeholder = "Sélectionner...",
  error,
  className 
}: SelectProps) {
  const selectedOption = options.find(option => option.value === value)

  return (
    <div className={cn("relative", className)}>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className={cn(
            "relative w-full cursor-pointer rounded-xl bg-white/5 py-3 pl-4 pr-10 text-left",
            "backdrop-blur-sm border transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:bg-white/10",
            error ? "border-red-400/50" : "border-white/20 hover:border-white/30"
          )}>
            <span className={cn(
              "block truncate",
              selectedOption ? "text-white" : "text-white/40"
            )}>
              {selectedOption?.label || placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-white/40"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-gray-900/95 backdrop-blur-xl border border-white/10 py-1 shadow-2xl">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    cn(
                      "relative cursor-pointer select-none py-2 pl-10 pr-4 transition-colors",
                      active ? "bg-white/10 text-white" : "text-white/70"
                    )
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span className={cn(
                        "block truncate",
                        selected ? "font-medium" : "font-normal"
                      )}>
                        {option.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon className="h-5 w-5 text-violet-400" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}