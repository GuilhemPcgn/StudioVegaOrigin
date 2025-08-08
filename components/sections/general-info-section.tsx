"use client"

import { Control, FieldErrors } from 'react-hook-form'
import { BriefFormData } from '@/types/brief'
import { FormSection } from '@/components/form/form-section'
import { FormField } from '@/components/form/form-field'
import { Input } from '@/components/form/input'
import { Textarea } from '@/components/form/textarea'
import { UrlPreviewList } from '@/components/form/url-preview-list'
import { RadioGroup } from '@/components/form/radio-group'
import { DatePicker } from '@/components/form/date-picker'
import { Controller } from 'react-hook-form'

interface GeneralInfoSectionProps {
  control: Control<BriefFormData>
  errors: FieldErrors<BriefFormData>
  watchedValues: BriefFormData
}

const objectiveOptions = [
  { value: 'presentation', label: 'Présentation de l\'entreprise' },
  { value: 'leads', label: 'Génération de leads' },
  { value: 'appointments', label: 'Prise de rendez-vous' },
  { value: 'branding', label: 'Image de marque' },
  { value: 'other', label: 'Autre' },
]

export function GeneralInfoSection({ control, errors, watchedValues }: GeneralInfoSectionProps) {
  return (
    <FormSection
      title="Informations générales"
      description="Commençons par les informations de base sur votre projet et vos objectifs."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField 
          label="Nom de l'entreprise / projet" 
          required
          error={errors.companyName?.message}
        >
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder="Ex: Studio Vega"
                error={!!errors.companyName}
              />
            )}
          />
        </FormField>

        <FormField 
          label="Secteur d'activité" 
          required
          error={errors.businessSector?.message}
        >
          <Controller
            name="businessSector"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder="Ex: Développement web"
                error={!!errors.businessSector}
              />
            )}
          />
        </FormField>
      </div>

      <FormField 
        label="Description brève de votre activité" 
        required
        error={errors.businessDescription?.message}
      >
        <Controller
          name="businessDescription"
          control={control}
          render={({ field }) => (
            <Textarea 
              {...field} 
              placeholder="Décrivez en quelques phrases votre activité principale, vos services et votre positionnement..."
              error={!!errors.businessDescription}
            />
          )}
        />
      </FormField>

      <FormField 
        label="Objectif principal du site" 
        required
        error={errors.mainObjective?.message}
      >
        <Controller
          name="mainObjective"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={field.onChange}
              options={objectiveOptions}
            />
          )}
        />
      </FormField>

      {watchedValues.mainObjective === 'other' && (
        <FormField 
          label="Précisez votre objectif" 
          required
          error={errors.otherObjective?.message}
        >
          <Controller
            name="otherObjective"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder="Décrivez votre objectif spécifique..."
                error={!!errors.otherObjective}
              />
            )}
          />
        </FormField>
      )}

      <FormField 
        label="Sites inspirants ou concurrents" 
        error={errors.inspiringWebsites?.message}
      >
        <Controller
          name="inspiringWebsites"
          control={control}
          render={({ field }) => (
            <UrlPreviewList
              value={field.value || ''}
              onChange={field.onChange}
              placeholder="Collez une URL, appuyez sur Entrée. Plusieurs liens sont possibles."
            />
          )}
        />
      </FormField>

      <FormField 
        label="Date de mise en ligne souhaitée" 
        error={errors.launchDate?.message}
      >
        <Controller
          name="launchDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              placeholder="Sélectionner une date"
              error={!!errors.launchDate}
            />
          )}
        />
      </FormField>
    </FormSection>
  )
}