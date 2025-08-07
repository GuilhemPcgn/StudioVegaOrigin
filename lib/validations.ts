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
  logoFile: z.instanceof(File).optional(),
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
  launchDate: z.union([z.date(), z.string().transform((str) => new Date(str)), z.null()]).nullable(),
  
  // Section 2
  hasLogo: z.enum(['yes', 'no']),
  logoFile: z.instanceof(File).optional(),
  colorPalette: z.string(),
  preferredTypography: z.string(),
  graphicStyle: z.union([
    z.array(z.string()),
    z.string().transform((str) => [str]),
    z.array(z.string()).transform((arr) => arr)
  ]),
  otherGraphicStyle: z.string().optional(),
  visualReferences: z.string(),
  
  // Section 3
  numberOfPages: z.union([
    z.number(),
    z.string().transform((str) => parseInt(str, 10))
  ]).min(1, 'Au moins 1 page requise'),
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