"use client"

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  description: string
  children: ReactNode
  className?: string
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      <GlassCard className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">{title}</h2>
          <p className="text-white/70 leading-relaxed">{description}</p>
        </div>
        <div className="space-y-6">
          {children}
        </div>
      </GlassCard>
    </motion.div>
  )
}