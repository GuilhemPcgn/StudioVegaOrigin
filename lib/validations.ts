import { z } from 'zod'

export const briefSchema = z.object({
  // Section 1
  companyName: z.string().min(1, 'Nom de l\'entreprise requis'),
  businessSector: z.string().min(1, 'Secteur d\'activité requis'),
  businessDescription: z.string().min(10, 'Description trop courte (min. 10 caractères)'),
  mainObjective: z.enum(['presentation', 'leads', 'appointments', 'branding', 'other']),
  otherObjective: z.string().optional(),
  inspiringWebsites: z.string(),
  launchDate: z.date().nullable(),
  
  // Section 2
  hasLogo: z.enum(['yes', 'no']),
  logoFile: z.instanceof(File).optional().refine((file) => {
    if (!file) return true
    return file.size <= 5 * 1024 * 1024 // 5MB max
  }, 'Le fichier logo ne doit pas dépasser 5MB').refine((file) => {
    if (!file) return true
    return file.type.startsWith('image/')
  }, 'Le fichier logo doit être une image'),
  colorPalette: z.string(),
  preferredTypography: z.string(),
  graphicStyle: z.array(z.string()),
  otherGraphicStyle: z.string().optional(),
  visualReferences: z.string(),
  
  // Section 3
  numberOfPages: z.number().min(1, 'Au moins 1 page requise'),
  siteArchitecture: z.string(),
  textsReady: z.enum(['yes', 'we_write', 'you_write']),
  photosAvailable: z.enum(['yes', 'stock_images']),
  videosAnimations: z.boolean(),
  
  // Section 4
  contactForm: z.boolean(),
  multilingual: z.boolean(),
  languages: z.string().optional(),
  socialNetworks: z.boolean(),
  interactiveMap: z.boolean(),
  blog: z.boolean(),
  otherFeatures: z.string().optional(),
  
  // Section 5
  targetAudience: z.string().min(1, 'Public cible requis'),
  seoImportance: z.enum(['low', 'medium', 'high']),
  mainKeywords: z.string(),
  analyticsTracking: z.boolean(),
  
  // Section 6
  existingDomain: z.enum(['yes', 'no']),
  domainName: z.string().optional(),
  hosting: z.enum(['yes', 'no', 'to_plan']),
  maintenance: z.enum(['none', 'monthly', 'punctual']),
  
  // Section 7
  legalNotices: z.enum(['available', 'to_create', 'no']),
  privacyPolicy: z.enum(['available', 'to_create', 'no']),
  cookiePolicy: z.enum(['available', 'to_create', 'no']),
}).refine((data) => {
  if (data.mainObjective === 'other' && !data.otherObjective) {
    return false
  }
  return true
}, {
  message: 'Veuillez préciser l\'autre objectif',
  path: ['otherObjective']
}).refine((data) => {
  if (data.existingDomain === 'yes' && !data.domainName) {
    return false
  }
  return true
}, {
  message: 'Veuillez préciser le nom de domaine',
  path: ['domainName']
}).refine((data) => {
  if (data.multilingual && !data.languages) {
    return false
  }
  return true
}, {
  message: 'Veuillez préciser les langues',
  path: ['languages']
})

// Schéma pour la transformation des données FormData
export const formDataSchema = z.object({
  // Section 1
  companyName: z.string().min(1, 'Nom de l\'entreprise requis'),
  businessSector: z.string().min(1, 'Secteur d\'activité requis'),
  businessDescription: z.string().min(10, 'Description trop courte (min. 10 caractères)'),
  mainObjective: z.enum(['presentation', 'leads', 'appointments', 'branding', 'other']),
  otherObjective: z.string().optional(),
  inspiringWebsites: z.string(),
  launchDate: z.any().transform((val) => {
    if (!val || val === '' || val === 'null' || val === 'undefined') {
      return null
    }
    if (val instanceof Date) {
      return val
    }
    if (typeof val === 'string') {
      const date = new Date(val)
      if (isNaN(date.getTime())) {
        return null
      }
      return date
    }
    return null
  }).nullable(),
  
  // Section 2
  hasLogo: z.enum(['yes', 'no']),
  logoFile: z.instanceof(File).optional().refine((file) => {
    if (!file) return true
    return file.size <= 5 * 1024 * 1024 // 5MB max
  }, 'Le fichier logo ne doit pas dépasser 5MB').refine((file) => {
    if (!file) return true
    return file.type.startsWith('image/')
  }, 'Le fichier logo doit être une image'),
  colorPalette: z.string(),
  preferredTypography: z.string(),
  graphicStyle: z.any().transform((val) => {
    if (Array.isArray(val)) return val
    if (typeof val === 'string') return [val]
    return []
  }),
  otherGraphicStyle: z.string().optional(),
  visualReferences: z.string(),
  
  // Section 3
  numberOfPages: z.union([
    z.number().min(1, 'Au moins 1 page requise'),
    z.string().transform((str) => {
      const num = parseInt(str, 10)
      if (isNaN(num) || num < 1) {
        throw new Error('Au moins 1 page requise')
      }
      return num
    })
  ]),
  siteArchitecture: z.string(),
  textsReady: z.enum(['yes', 'we_write', 'you_write']),
  photosAvailable: z.enum(['yes', 'stock_images']),
  videosAnimations: z.union([
    z.boolean(),
    z.string().transform((str) => str === 'true' || str === 'on')
  ]),
  
  // Section 4
  contactForm: z.union([
    z.boolean(),
    z.string().transform((str) => str === 'true' || str === 'on')
  ]),
  multilingual: z.union([
    z.boolean(),
    z.string().transform((str) => str === 'true' || str === 'on')
  ]),
  languages: z.string().optional(),
  socialNetworks: z.union([
    z.boolean(),
    z.string().transform((str) => str === 'true' || str === 'on')
  ]),
  interactiveMap: z.union([
    z.boolean(),
    z.string().transform((str) => str === 'true' || str === 'on')
  ]),
  blog: z.union([
    z.boolean(),
    z.string().transform((str) => str === 'true' || str === 'on')
  ]),
  otherFeatures: z.string().optional(),
  
  // Section 5
  targetAudience: z.string().min(1, 'Public cible requis'),
  seoImportance: z.enum(['low', 'medium', 'high']),
  mainKeywords: z.string(),
  analyticsTracking: z.union([
    z.boolean(),
    z.string().transform((str) => str === 'true' || str === 'on')
  ]),
  
  // Section 6
  existingDomain: z.enum(['yes', 'no']),
  domainName: z.string().optional(),
  hosting: z.enum(['yes', 'no', 'to_plan']),
  maintenance: z.enum(['none', 'monthly', 'punctual']),
  
  // Section 7
  legalNotices: z.enum(['available', 'to_create', 'no']),
  privacyPolicy: z.enum(['available', 'to_create', 'no']),
  cookiePolicy: z.enum(['available', 'to_create', 'no']),
}).refine((data) => {
  if (data.mainObjective === 'other' && !data.otherObjective) {
    return false
  }
  return true
}, {
  message: 'Veuillez préciser l\'autre objectif',
  path: ['otherObjective']
}).refine((data) => {
  if (data.existingDomain === 'yes' && !data.domainName) {
    return false
  }
  return true
}, {
  message: 'Veuillez préciser le nom de domaine',
  path: ['domainName']
}).refine((data) => {
  if (data.multilingual && !data.languages) {
    return false
  }
  return true
}, {
  message: 'Veuillez préciser les langues',
  path: ['languages']
})