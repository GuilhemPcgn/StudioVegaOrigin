"use client"

import { Control, FieldErrors } from 'react-hook-form'
import { BriefFormData } from '@/types/brief'
import { FormSection } from '@/components/form/form-section'
import { FormField } from '@/components/form/form-field'
import { RadioGroup } from '@/components/form/radio-group'
import { Controller } from 'react-hook-form'

interface LegalElementsSectionProps {
  control: Control<BriefFormData>
  errors: FieldErrors<BriefFormData>
  watchedValues: BriefFormData
}

const legalOptions = [
  { value: 'available', label: 'Disponible et à jour' },
  { value: 'to_create', label: 'À créer' },
  { value: 'no', label: 'Non nécessaire' },
]

export function LegalElementsSection({ control, errors, watchedValues }: LegalElementsSectionProps) {
  return (
    <FormSection
      title="Éléments légaux"
      description="Finalisons avec les aspects légaux et réglementaires de votre site."
    >
      <FormField 
        label="Mentions légales disponibles ?" 
        required
        error={errors.legalNotices?.message}
      >
        <Controller
          name="legalNotices"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={field.onChange}
              options={legalOptions}
            />
          )}
        />
      </FormField>

      <FormField 
        label="Politique de confidentialité disponible ?" 
        required
        error={errors.privacyPolicy?.message}
      >
        <Controller
          name="privacyPolicy"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={field.onChange}
              options={legalOptions}
            />
          )}
        />
      </FormField>

      <FormField 
        label="Politique cookies RGPD prévue ?" 
        required
        error={errors.cookiePolicy?.message}
      >
        <Controller
          name="cookiePolicy"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={field.onChange}
              options={legalOptions}
            />
          )}
        />
      </FormField>
    </FormSection>
  )
}