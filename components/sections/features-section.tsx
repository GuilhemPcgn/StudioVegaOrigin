"use client"

import { Control, FieldErrors } from 'react-hook-form'
import { BriefFormData } from '@/types/brief'
import { FormSection } from '@/components/form/form-section'
import { FormField } from '@/components/form/form-field'
import { Input } from '@/components/form/input'
import { Textarea } from '@/components/form/textarea'
import { YesNoToggle } from '@/components/form/yes-no-toggle'
import { Controller } from 'react-hook-form'

interface FeaturesSectionProps {
  control: Control<BriefFormData>
  errors: FieldErrors<BriefFormData>
  watchedValues: BriefFormData
}

export function FeaturesSection({ control, errors, watchedValues }: FeaturesSectionProps) {
  return (
    <FormSection
      title="Fonctionnalités"
      description="Sélectionnez les fonctionnalités que vous souhaitez intégrer à votre site."
    >
      <div className="space-y-6">
        <FormField label="Formulaire de contact">
          <Controller
            name="contactForm"
            control={control}
            render={({ field }) => (
              <YesNoToggle
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </FormField>

        <FormField label="Site multilingue">
          <Controller
            name="multilingual"
            control={control}
            render={({ field }) => (
              <YesNoToggle
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </FormField>

        {watchedValues.multilingual && (
          <FormField 
            label="Langues souhaitées" 
            required
            error={errors.languages?.message}
          >
            <Controller
              name="languages"
              control={control}
              render={({ field }) => (
                <Input 
                  {...field} 
                  placeholder="Ex: Français, Anglais, Espagnol..."
                  error={!!errors.languages}
                />
              )}
            />
          </FormField>
        )}

        <FormField label="Intégration réseaux sociaux">
          <Controller
            name="socialNetworks"
            control={control}
            render={({ field }) => (
              <YesNoToggle
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </FormField>

        <FormField label="Carte interactive">
          <Controller
            name="interactiveMap"
            control={control}
            render={({ field }) => (
              <YesNoToggle
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </FormField>

        <FormField label="Blog">
          <Controller
            name="blog"
            control={control}
            render={({ field }) => (
              <YesNoToggle
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </FormField>

        <FormField 
          label="Autres fonctionnalités" 
          error={errors.otherFeatures?.message}
        >
          <Controller
            name="otherFeatures"
            control={control}
            render={({ field }) => (
              <Textarea 
                {...field} 
                placeholder="Décrivez toute autre fonctionnalité spécifique que vous souhaitez..."
                error={!!errors.otherFeatures}
              />
            )}
          />
        </FormField>
      </div>
    </FormSection>
  )
}