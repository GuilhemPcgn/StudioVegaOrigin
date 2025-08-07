"use client"

import { motion } from 'framer-motion'
import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/outline'
import { GlassCard } from '@/components/ui/glass-card'
import { GradientButton } from '@/components/ui/gradient-button'
import Link from 'next/link'

export default function HomePage() {
  const features = [
    {
      title: "Formulaire intuitif",
      description: "Interface moderne inspirée de Typeform avec navigation fluide"
    },
    {
      title: "Questions adaptées",
      description: "Brief complet couvrant tous les aspects de votre projet web"
    },
    {
      title: "Réponse rapide",
      description: "Notre équipe vous contactera sous 24h avec un devis personnalisé"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-blue-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-violet-900/20" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6">
              <StarIcon className="w-4 h-4 text-violet-400" />
              <span className="text-white/70 text-sm">Studio Vega</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Donnez vie à votre
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                {' '}projet web
              </span>
            </h1>
            
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              Partagez votre vision avec nous grâce à notre brief interactif.
              <br />
              En quelques minutes, obtenez un devis personnalisé pour votre site web.
            </p>

            <Link href="/brief">
              <GradientButton size="lg" className="group">
                Commencer mon brief
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </GradientButton>
            </Link>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <GlassCard className="p-6 h-full">
                  <h3 className="text-white font-semibold mb-3">{feature.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                Comment ça marche ?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: "1", title: "Brief", desc: "Remplissez le formulaire en 5-10 minutes" },
                  { step: "2", title: "Analyse", desc: "Notre équipe étudie votre projet" },
                  { step: "3", title: "Devis", desc: "Vous recevez un devis personnalisé" },
                  { step: "4", title: "Création", desc: "Nous donnons vie à votre vision" }
                ].map((item, index) => (
                  <div key={index} className="text-center relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                      {item.step}
                    </div>
                    <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                    
                    {index < 3 && (
                      <ArrowRightIcon className="w-6 h-6 text-white/30 absolute top-6 -right-3 hidden md:block" />
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}