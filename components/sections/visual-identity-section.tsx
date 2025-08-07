"use client"

import { Control, FieldErrors } from 'react-hook-form'
import { BriefFormData } from '@/types/brief'
import { FormSection } from '@/components/form/form-section'
import { FormField } from '@/components/form/form-field'
import { Input } from '@/components/form/input'
import { Textarea } from '@/components/form/textarea'
import { RadioGroup } from '@/components/form/radio-group'
import { CheckboxGroup } from '@/components/form/checkbox-group'
import { Controller } from 'react-hook-form'

interface VisualIdentitySectionProps {
  control: Control<BriefFormData>
  errors: FieldErrors<BriefFormData>
  watchedValues: BriefFormData
}

const logoOptions = [
  { value: 'yes', label: 'Oui, j\'ai déjà un logo' },
  { value: 'no', label: 'Non, il faut le créer' },
]

const styleOptions = [
  { value: 'minimal', label: 'Minimaliste' },
  { value: 'modern', label: 'Moderne' },
  { value: 'luxury', label: 'Luxe' },
  { value: 'colorful', label: 'Coloré' },
  { value: 'professional', label: 'Professionnel' },
  { value: 'other', label: 'Autre' },
]

export function VisualIdentitySection({ control, errors, watchedValues }: VisualIdentitySectionProps) {
  return (
    <FormSection
      title="Identité visuelle"
      description="Définissons l'aspect visuel de votre site web et votre identité graphique."
    >
      <FormField 
        label="Logo disponible ?" 
        required
        error={errors.hasLogo?.message}
      >
        <Controller
          name="hasLogo"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={field.onChange}
              options={logoOptions}
            />
          )}
        />
      </FormField>

      {watchedValues.hasLogo === 'yes' && (
        <FormField 
          label="Upload du logo" 
          error={errors.logoFile?.message}
        >
          <Controller
            name="logoFile"
            control={control}
            render={({ field }) => (
              <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center bg-white/5 backdrop-blur-sm hover:border-white/30 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <div className="text-white/70 mb-2">
                    Cliquez pour uploader votre logo
                  </div>
                  <div className="text-white/40 text-sm">
                    Formats acceptés: PNG, JPG, SVG (max 5MB)
                  </div>
                </label>
              </div>
            )}
          />
        </FormField>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField 
          label="Palette de couleurs souhaitée" 
          error={errors.colorPalette?.message}
        >
          <Controller
            name="colorPalette"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder="Ex: Bleu/Blanc ou #3B82F6, #FFFFFF"
                error={!!errors.colorPalette}
              />
            )}
          />
        </FormField>

        <FormField 
          label="Typographies ou styles préférés" 
          error={errors.preferredTypography?.message}
        >
          <Controller
            name="preferredTypography"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder="Ex: Modern, classique, script..."
                error={!!errors.preferredTypography}
              />
            )}
          />
        </FormField>
      </div>

      <FormField 
        label="Style graphique" 
        error={errors.graphicStyle?.message}
      >
        <Controller
          name="graphicStyle"
          control={control}
          render={({ field }) => (
            <CheckboxGroup
              value={field.value}
              onChange={field.onChange}
              options={styleOptions}
            />
          )}
        />
      </FormField>

      {watchedValues.graphicStyle?.includes('other') && (
        <FormField 
          label="Précisez le style graphique" 
          error={errors.otherGraphicStyle?.message}
        >
          <Controller
            name="otherGraphicStyle"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder="Décrivez le style souhaité..."
                error={!!errors.otherGraphicStyle}
              />
            )}
          />
        </FormField>
      )}

      <FormField 
        label="Références visuelles" 
        error={errors.visualReferences?.message}
      >
        <Controller
          name="visualReferences"
          control={control}
          render={({ field }) => (
            <Textarea 
              {...field} 
              placeholder="Partagez des liens vers des designs qui vous inspirent, des couleurs, des styles..."
              error={!!errors.visualReferences}
            />
          )}
        />
      </FormField>
    </FormSection>
  )
}