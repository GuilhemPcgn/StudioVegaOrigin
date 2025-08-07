"use client"

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

import { BriefFormData } from '@/types/brief'
import { briefSchema } from '@/lib/validations'
import { useToast } from '@/hooks/useToast'

import { GlassCard } from '@/components/ui/glass-card'
import { GradientButton } from '@/components/ui/gradient-button'
import { ProgressBar } from '@/components/form/progress-bar'
import { ToastContainer } from '@/components/toast/toast-container'

// Import all form sections
import { GeneralInfoSection } from '@/components/sections/general-info-section'
import { VisualIdentitySection } from '@/components/sections/visual-identity-section'
import { StructureContentSection } from '@/components/sections/structure-content-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { SeoPerformanceSection } from '@/components/sections/seo-performance-section'
import { HostingMaintenanceSection } from '@/components/sections/hosting-maintenance-section'
import { LegalElementsSection } from '@/components/sections/legal-elements-section'

const TOTAL_STEPS = 7

const sectionTitles = [
  'Informations générales',
  'Identité visuelle',
  'Structure & contenu',
  'Fonctionnalités',
  'SEO & performance',
  'Hébergement & maintenance',
  'Éléments légaux'
]

export default function BriefPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toasts, addToast, removeToast, success, error } = useToast()

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<BriefFormData>({
    resolver: zodResolver(briefSchema),
    defaultValues: {
      companyName: '',
      businessSector: '',
      businessDescription: '',
      mainObjective: 'presentation',
      inspiringWebsites: '',
      launchDate: null,
      hasLogo: 'no',
      colorPalette: '',
      preferredTypography: '',
      graphicStyle: [],
      visualReferences: '',
      numberOfPages: 1,
      siteArchitecture: '',
      textsReady: 'yes',
      photosAvailable: 'yes',
      videosAnimations: false,
      contactForm: false,
      multilingual: false,
      socialNetworks: false,
      interactiveMap: false,
      blog: false,
      targetAudience: '',
      seoImportance: 'medium',
      mainKeywords: '',
      analyticsTracking: false,
      existingDomain: 'no',
      hosting: 'no',
      maintenance: 'none',
      legalNotices: 'to_create',
      privacyPolicy: 'to_create',
      cookiePolicy: 'to_create',
    }
  })

  const watchedValues = watch()

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep)
    const isValid = await trigger(fieldsToValidate)
    
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit: SubmitHandler<BriefFormData> = async (data) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      
      // Add all form data to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach(item => formData.append(key, item))
          } else if (value instanceof Date) {
            formData.append(key, value.toISOString())
          } else if (value instanceof File) {
            formData.append(key, value)
          } else {
            formData.append(key, String(value))
          }
        }
      })

      const response = await fetch('/api/submit-brief', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        success('Brief soumis avec succès !')
        setTimeout(() => {
          router.push('/brief/done')
        }, 1500)
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error('Submission error:', errorData)
        error(`Erreur lors de la soumission du brief: ${errorData.details || errorData.error || 'Erreur inconnue'}`)
      }
    } catch (err) {
      console.error('Network error:', err)
      error('Erreur de connexion au serveur')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderCurrentSection = () => {
    switch (currentStep) {
      case 1:
        return <GeneralInfoSection control={control} errors={errors} watchedValues={watchedValues} />
      case 2:
        return <VisualIdentitySection control={control} errors={errors} watchedValues={watchedValues} />
      case 3:
        return <StructureContentSection control={control} errors={errors} watchedValues={watchedValues} />
      case 4:
        return <FeaturesSection control={control} errors={errors} watchedValues={watchedValues} />
      case 5:
        return <SeoPerformanceSection control={control} errors={errors} watchedValues={watchedValues} />
      case 6:
        return <HostingMaintenanceSection control={control} errors={errors} watchedValues={watchedValues} />
      case 7:
        return <LegalElementsSection control={control} errors={errors} watchedValues={watchedValues} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-blue-900/20" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <GlassCard className="p-6 mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Studio Vega - Brief Client
            </h1>
            <p className="text-white/70">
              {sectionTitles[currentStep - 1]}
            </p>
          </div>
          
          <div className="mt-6">
            <ProgressBar 
              currentStep={currentStep} 
              totalSteps={TOTAL_STEPS} 
            />
          </div>
        </GlassCard>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {renderCurrentSection()}
            </AnimatePresence>

            {/* Navigation */}
            <GlassCard className="p-6 mt-8">
              <div className="flex justify-between items-center">
                <div>
                  {currentStep > 1 && (
                    <GradientButton
                      type="button"
                      variant="secondary"
                      onClick={prevStep}
                    >
                      ← Précédent
                    </GradientButton>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  {currentStep < TOTAL_STEPS ? (
                    <GradientButton
                      type="button"
                      onClick={nextStep}
                    >
                      Suivant →
                    </GradientButton>
                  ) : (
                    <GradientButton
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le brief'}
                    </GradientButton>
                  )}
                </div>
              </div>
            </GlassCard>
          </div>
        </form>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}

function getFieldsForStep(step: number): (keyof BriefFormData)[] {
  switch (step) {
    case 1:
      return ['companyName', 'businessSector', 'businessDescription', 'mainObjective', 'inspiringWebsites']
    case 2:
      return ['hasLogo', 'colorPalette', 'preferredTypography', 'graphicStyle', 'visualReferences']
    case 3:
      return ['numberOfPages', 'siteArchitecture', 'textsReady', 'photosAvailable']
    case 4:
      return []
    case 5:
      return ['targetAudience', 'seoImportance', 'mainKeywords']
    case 6:
      return ['existingDomain', 'hosting', 'maintenance']
    case 7:
      return ['legalNotices', 'privacyPolicy', 'cookiePolicy']
    default:
      return []
  }
}