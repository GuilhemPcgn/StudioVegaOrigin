"use client"

import { Control, FieldErrors } from 'react-hook-form'
import { BriefFormData } from '@/types/brief'
import { FormSection } from '@/components/form/form-section'
import { FormField } from '@/components/form/form-field'
import { Input } from '@/components/form/input'
import { Textarea } from '@/components/form/textarea'
import { RadioGroup } from '@/components/form/radio-group'
import { YesNoToggle } from '@/components/form/yes-no-toggle'
import { Controller } from 'react-hook-form'

interface SeoPerformanceSectionProps {
  control: Control<BriefFormData>
  errors: FieldErrors<BriefFormData>
  watchedValues: BriefFormData
}

const seoImportanceOptions = [
  { value: 'low', label: 'Faible - le site n\'a pas besoin d\'être trouvé sur Google' },
  { value: 'medium', label: 'Moyenne - optimisation de base souhaitée' },
  { value: 'high', label: 'Forte - SEO est une priorité absolue' },
]

export function SeoPerformanceSection({ control, errors, watchedValues }: SeoPerformanceSectionProps) {
  return (
    <FormSection
      title="SEO & performance"
      description="Optimisons la visibilité et les performances de votre site web."
    >
      <FormField 
        label="Public cible (pays, langue, profil)" 
        required
        error={errors.targetAudience?.message}
      >
        <Controller
          name="targetAudience"
          control={control}
          render={({ field }) => (
            <Input 
              {...field} 
              placeholder="Ex: Entreprises françaises, clients particuliers en région parisienne..."
              error={!!errors.targetAudience}
            />
          )}
        />
      </FormField>

      <FormField 
        label="Importance SEO" 
        required
        error={errors.seoImportance?.message}
      >
        <Controller
          name="seoImportance"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={field.onChange}
              options={seoImportanceOptions}
            />
          )}
        />
      </FormField>

      <FormField 
        label="Mots clés principaux" 
        required
        error={errors.mainKeywords?.message}
      >
        <Controller
          name="mainKeywords"
          control={control}
          render={({ field }) => (
            <Textarea 
              {...field} 
              placeholder="Listez les mots-clés sur lesquels vous souhaitez être positionné..."
              error={!!errors.mainKeywords}
            />
          )}
        />
      </FormField>

      <FormField 
        label="Suivi Analytics / Tracking ?" 
        error={errors.analyticsTracking?.message}
      >
        <Controller
          name="analyticsTracking"
          control={control}
          render={({ field }) => (
            <YesNoToggle
              value={field.value}
              onChange={field.onChange}
              yesLabel="Oui, intégrer Google Analytics"
              noLabel="Non nécessaire"
            />
          )}
        />
      </FormField>
    </FormSection>
  )
}