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

interface StructureContentSectionProps {
  control: Control<BriefFormData>
  errors: FieldErrors<BriefFormData>
  watchedValues: BriefFormData
}

const textsOptions = [
  { value: 'yes', label: 'Oui, tous les textes sont prêts' },
  { value: 'we_write', label: 'Non, nous les rédigeons' },
  { value: 'you_write', label: 'Non, vous pouvez les rédiger' },
]

const photosOptions = [
  { value: 'yes', label: 'Oui, nous avons nos photos' },
  { value: 'stock_images', label: 'Non, utiliser des banques d\'images' },
]

export function StructureContentSection({ control, errors, watchedValues }: StructureContentSectionProps) {
  return (
    <FormSection
      title="Structure & contenu"
      description="Définissons l'architecture de votre site et la nature du contenu à intégrer."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField 
          label="Nombre de pages prévues" 
          required
          error={errors.numberOfPages?.message}
        >
          <Controller
            name="numberOfPages"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                type="number"
                min="1"
                placeholder="Ex: 5"
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!errors.numberOfPages}
              />
            )}
          />
        </FormField>
      </div>

      <FormField 
        label="Arborescence souhaitée" 
        required
        error={errors.siteArchitecture?.message}
      >
        <Controller
          name="siteArchitecture"
          control={control}
          render={({ field }) => (
            <Textarea 
              {...field} 
              placeholder="Décrivez les pages et leur organisation : Accueil, À propos, Services, Contact..."
              error={!!errors.siteArchitecture}
            />
          )}
        />
      </FormField>

      <FormField 
        label="Textes prêts ?" 
        required
        error={errors.textsReady?.message}
      >
        <Controller
          name="textsReady"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={field.onChange}
              options={textsOptions}
            />
          )}
        />
      </FormField>

      <FormField 
        label="Photos disponibles ?" 
        required
        error={errors.photosAvailable?.message}
      >
        <Controller
          name="photosAvailable"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={field.onChange}
              options={photosOptions}
            />
          )}
        />
      </FormField>

      <FormField 
        label="Vidéos ou animations prévues ?" 
        error={errors.videosAnimations?.message}
      >
        <Controller
          name="videosAnimations"
          control={control}
          render={({ field }) => (
            <YesNoToggle
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormField>
    </FormSection>
  )
}