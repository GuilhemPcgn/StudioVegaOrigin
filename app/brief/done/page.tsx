"use client"

import { motion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { GlassCard } from '@/components/ui/glass-card'
import { GradientButton } from '@/components/ui/gradient-button'
import Link from 'next/link'

export default function BriefDonePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-blue-900/20" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <GlassCard className="p-12">
              <div className="mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6"
                >
                  <CheckCircleIcon className="w-10 h-10 text-white" />
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-4xl font-bold text-white mb-4"
                >
                  Brief envoyé avec succès !
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-white/70 text-lg leading-relaxed"
                >
                  Merci pour ces informations détaillées ! L'équipe Studio Vega va analyser votre projet et vous contactera sous 24h pour discuter de votre site web.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-4"
              >
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-white font-semibold mb-2">Prochaines étapes :</h3>
                  <ul className="text-white/70 space-y-2">
                    <li>✓ Analyse de votre brief par notre équipe</li>
                    <li>✓ Préparation d'un devis personnalisé</li>
                    <li>✓ Prise de contact sous 24h pour un échange</li>
                    <li>✓ Planification du projet ensemble</li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Link href="/">
                    <GradientButton size="lg">
                      Retour à l'accueil
                    </GradientButton>
                  </Link>
                </div>
              </motion.div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-white/50 text-sm">
              Une question ? Contactez-nous à{' '}
              <a 
                href="mailto:contact@studiovega.fr" 
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                contact@studiovega.fr
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}