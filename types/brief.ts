export interface BriefFormData {
  // Section 1 - General Information
  companyName: string
  businessSector: string
  businessDescription: string
  mainObjective: 'presentation' | 'leads' | 'appointments' | 'branding' | 'other'
  otherObjective?: string
  inspiringWebsites: string
  launchDate: Date | null
  
  // Section 2 - Visual Identity
  hasLogo: 'yes' | 'no'
  logoFile?: FileList
  colorPalette: string
  preferredTypography: string
  graphicStyle: string[]
  otherGraphicStyle?: string
  visualReferences: string
  
  // Section 3 - Structure & Content
  numberOfPages: number
  siteArchitecture: string
  textsReady: 'yes' | 'we_write' | 'you_write'
  photosAvailable: 'yes' | 'stock_images'
  videosAnimations: boolean
  
  // Section 4 - Features
  contactForm: boolean
  multilingual: boolean
  languages?: string
  socialNetworks: boolean
  interactiveMap: boolean
  blog: boolean
  otherFeatures?: string
  
  // Section 5 - SEO & Performance
  targetAudience: string
  seoImportance: 'low' | 'medium' | 'high'
  mainKeywords: string
  analyticsTracking: boolean
  
  // Section 6 - Hosting & Maintenance
  existingDomain: 'yes' | 'no'
  domainName?: string
  hosting: 'yes' | 'no' | 'to_plan'
  maintenance: 'none' | 'monthly' | 'punctual'
  
  // Section 7 - Legal Elements
  legalNotices: 'available' | 'to_create' | 'no'
  privacyPolicy: 'available' | 'to_create' | 'no'
  cookiePolicy: 'available' | 'to_create' | 'no'
}

export interface BriefSubmission extends BriefFormData {
  id?: string
  createdAt?: string
  updatedAt?: string
}