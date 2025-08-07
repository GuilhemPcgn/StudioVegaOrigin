"use client"

import { Control, FieldErrors } from 'react-hook-form'
import { BriefFormData } from '@/types/brief'
import { FormSection } from '@/components/form/form-section'
import { FormField } from '@/components/form/form-field'
import { Input } from '@/components/form/input'
import { RadioGroup } from '@/components/form/radio-group'
import { Controller } from 'react-hook-form'

interface HostingMaintenanceSectionProps {
  control: Control<BriefFormData>
  errors: FieldErrors<BriefFormData>
  watchedValues: BriefFormData
}

const domainOptions = [
  { value: 'yes', label: 'Oui, j\'ai déjà un nom de domaine' },
  { value: 'no', label: 'Non, il faut en réserver un' },
]

const hostingOptions = [
  { value: 'yes', label: 'Oui, j\'ai déjà un hébergement' },
  { value: 'no', label: 'Non, j\'ai besoin d\'une solution' },
  { value: 'to_plan', label: 'À prévoir et conseiller' },
]

const maintenanceOptions = [
  { value: 'none', label: 'Non, juste la livraison' },
  { value: 'monthly', label: 'Forfait mensuel de maintenance' },
  { value: 'punctual', label: 'Mises à jour ponctuelles sur demande' },
]

export function HostingMaintenanceSection({ control, errors, watchedValues }: HostingMaintenanceSectionProps) {
  return (
    <FormSection
      title="Hébergement & maintenance"
      description="Parlons des aspects techniques et de la maintenance de votre site."
    >
      <FormField 
        label="Nom de domaine existant ?" 
        required
        error={errors.existingDomain?.message}
      >
        <Controller
          name="existingDomain"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={field.onChange}
              options={domainOptions}
            />
          )}
        />
      </FormField>

      {watchedValues.existingDomain === 'yes' && (
        <FormField 
          label="Nom de domaine" 
          required
          error={errors.domainName?.message}
        >
          <Controller
            name="domainName"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder="Ex: mon-entreprise.fr"
                error={!!errors.domainName}
              />
            )}
          />
        </FormField>
      )}

      <FormField 
        label="Hébergement ?" 
        required
        error={errors.hosting?.message}
      >
        <Controller
          name="hosting"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={field.onChange}
              options={hostingOptions}
            />
          )}
        />
      </FormField>

      <FormField 
        label="Maintenance après livraison ?" 
        required
        error={errors.maintenance?.message}
      >
        <Controller
          name="maintenance"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={field.onChange}
              options={maintenanceOptions}
            />
          )}
        />
      </FormField>
    </FormSection>
  )
}