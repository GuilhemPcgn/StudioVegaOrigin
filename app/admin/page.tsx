'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Calendar, Building2, Target, Palette, FileText, Settings, Shield, Globe } from 'lucide-react'

interface Brief {
  id: string
  company_name: string
  business_sector: string
  business_description: string
  main_objective: string
  other_objective: string | null
  inspiring_websites: string
  launch_date: string | null
  has_logo: string
  color_palette: string
  preferred_typography: string
  graphic_style: string[]
  other_graphic_style: string | null
  visual_references: string
  number_of_pages: number
  site_architecture: string
  texts_ready: string
  photos_available: string
  videos_animations: boolean
  contact_form: boolean
  multilingual: boolean
  languages: string | null
  social_networks: boolean
  interactive_map: boolean
  blog: boolean
  other_features: string | null
  target_audience: string
  seo_importance: string
  main_keywords: string
  analytics_tracking: boolean
  existing_domain: string
  domain_name: string | null
  hosting: string
  maintenance: string
  legal_notices: string
  privacy_policy: string
  cookie_policy: string
  created_at: string
  updated_at: string
}

interface File {
  id: string
  brief_id: string
  file_name: string
  original_name: string
  file_url: string
  file_type: string
  file_size: number
  created_at: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [briefs, setBriefs] = useState<Brief[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const handleAuth = async () => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        fetchBriefs()
      } else {
        setError(data.error || 'Erreur d\'authentification')
      }
    } catch (error) {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const fetchBriefs = async () => {
    try {
      console.log('Fetching briefs from client...')
      const response = await fetch('/api/admin/briefs')
      const data = await response.json()
      
      console.log('Client response:', { response: response.status, data })
      
      if (response.ok) {
        console.log(`Setting ${data.briefs?.length || 0} briefs`)
        setBriefs(data.briefs || [])
        fetchFiles()
      } else {
        console.error('API error:', data.error)
        setError(data.error || 'Erreur lors de la récupération des données')
      }
    } catch (error) {
      console.error('Client fetch error:', error)
      setError('Erreur de connexion')
    }
  }

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/admin/files')
      const data = await response.json()
      
      if (response.ok) {
        setFiles(data.files)
      } else {
        console.error('Erreur lors de la récupération des fichiers:', data.error)
      }
    } catch (error) {
      console.error('Erreur de connexion pour les fichiers')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getObjectiveLabel = (objective: string) => {
    const objectives = {
      presentation: 'Présentation',
      leads: 'Génération de leads',
      appointments: 'Prise de rendez-vous',
      branding: 'Branding',
      other: 'Autre'
    }
    return objectives[objective as keyof typeof objectives] || objective
  }

  const getImportanceLabel = (importance: string) => {
    const importances = {
      low: 'Faible',
      medium: 'Moyenne',
      high: 'Élevée'
    }
    return importances[importance as keyof typeof importances] || importance
  }

  const getFilesForBrief = (briefId: string) => {
    return files.filter(file => file.brief_id === briefId)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-slate-800">
              Administration
            </CardTitle>
            <p className="text-slate-600">Accès sécurisé aux données</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Button 
              onClick={handleAuth} 
              disabled={loading || !password}
              className="w-full"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Administration - Briefs
          </h1>
          <p className="text-slate-600">
            {briefs.length} formulaire{briefs.length > 1 ? 's' : ''} reçu{briefs.length > 1 ? 's' : ''}
          </p>
        </div>

        {briefs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-slate-600">Aucun brief reçu pour le moment.</p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue={briefs[0]?.id} className="space-y-4">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {briefs.map((brief, index) => (
                <TabsTrigger key={brief.id} value={brief.id} className="text-left">
                  <div className="flex flex-col items-start">
                    <span className="font-medium truncate">{brief.company_name}</span>
                    <span className="text-xs text-slate-500">
                      {formatDate(brief.created_at)}
                    </span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {briefs.map((brief) => (
              <TabsContent key={brief.id} value={brief.id} className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <Building2 className="h-6 w-6" />
                          {brief.company_name}
                        </CardTitle>
                        <p className="text-slate-600 mt-1">
                          Soumis le {formatDate(brief.created_at)}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {brief.business_sector}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Informations générales */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Informations générales
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-slate-600">Secteur d'activité</label>
                          <p className="text-slate-800">{brief.business_sector}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">Objectif principal</label>
                          <p className="text-slate-800">{getObjectiveLabel(brief.main_objective)}</p>
                        </div>
                        {brief.other_objective && (
                          <div className="md:col-span-2">
                            <label className="text-sm font-medium text-slate-600">Autre objectif</label>
                            <p className="text-slate-800">{brief.other_objective}</p>
                          </div>
                        )}
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium text-slate-600">Description de l'activité</label>
                          <p className="text-slate-800">{brief.business_description}</p>
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium text-slate-600">Sites inspirants</label>
                          <p className="text-slate-800">{brief.inspiring_websites}</p>
                        </div>
                        {brief.launch_date && (
                          <div>
                            <label className="text-sm font-medium text-slate-600">Date de lancement souhaitée</label>
                            <p className="text-slate-800">{formatDate(brief.launch_date)}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Identité visuelle */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Identité visuelle
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-slate-600">Logo disponible</label>
                          <p className="text-slate-800">{brief.has_logo === 'yes' ? 'Oui' : 'Non'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">Palette de couleurs</label>
                          <p className="text-slate-800">{brief.color_palette}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">Typographie préférée</label>
                          <p className="text-slate-800">{brief.preferred_typography}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">Style graphique</label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {brief.graphic_style.map((style, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {style}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {brief.other_graphic_style && (
                          <div className="md:col-span-2">
                            <label className="text-sm font-medium text-slate-600">Autre style graphique</label>
                            <p className="text-slate-800">{brief.other_graphic_style}</p>
                          </div>
                        )}
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium text-slate-600">Références visuelles</label>
                          <p className="text-slate-800">{brief.visual_references}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Structure et contenu */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Structure et contenu
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-slate-600">Nombre de pages</label>
                          <p className="text-slate-800">{brief.number_of_pages}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">Architecture du site</label>
                          <p className="text-slate-800">{brief.site_architecture}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">Textes prêts</label>
                          <p className="text-slate-800">{brief.texts_ready}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">Photos disponibles</label>
                          <p className="text-slate-800">{brief.photos_available}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">Vidéos/Animations</label>
                          <p className="text-slate-800">{brief.videos_animations ? 'Oui' : 'Non'}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Fonctionnalités */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Fonctionnalités
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Badge variant={brief.contact_form ? "default" : "secondary"}>
                            {brief.contact_form ? 'Oui' : 'Non'}
                          </Badge>
                          <span className="text-sm">Formulaire de contact</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={brief.multilingual ? "default" : "secondary"}>
                            {brief.multilingual ? 'Oui' : 'Non'}
                          </Badge>
                          <span className="text-sm">Multilingue</span>
                        </div>
                        {brief.languages && (
                          <div className="md:col-span-2">
                            <label className="text-sm font-medium text-slate-600">Langues</label>
                            <p className="text-slate-800">{brief.languages}</p>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Badge variant={brief.social_networks ? "default" : "secondary"}>
                            {brief.social_networks ? 'Oui' : 'Non'}
                          </Badge>
                          <span className="text-sm">Réseaux sociaux</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={brief.interactive_map ? "default" : "secondary"}>
                            {brief.interactive_map ? 'Oui' : 'Non'}
                          </Badge>
                          <span className="text-sm">Carte interactive</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={brief.blog ? "default" : "secondary"}>
                            {brief.blog ? 'Oui' : 'Non'}
                          </Badge>
                          <span className="text-sm">Blog</span>
                        </div>
                        {brief.other_features && (
                          <div className="md:col-span-2">
                            <label className="text-sm font-medium text-slate-600">Autres fonctionnalités</label>
                            <p className="text-slate-800">{brief.other_features}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* SEO et Performance */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        SEO et Performance
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-slate-600">Audience cible</label>
                          <p className="text-slate-800">{brief.target_audience}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">Importance SEO</label>
                          <p className="text-slate-800">{getImportanceLabel(brief.seo_importance)}</p>
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium text-slate-600">Mots-clés principaux</label>
                          <p className="text-slate-800">{brief.main_keywords}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={brief.analytics_tracking ? "default" : "secondary"}>
                            {brief.analytics_tracking ? 'Oui' : 'Non'}
                          </Badge>
                          <span className="text-sm">Suivi analytics</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Hébergement et Maintenance */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Hébergement et Maintenance
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-slate-600">Domaine existant</label>
                          <p className="text-slate-800">{brief.existing_domain === 'yes' ? 'Oui' : 'Non'}</p>
                        </div>
                        {brief.domain_name && (
                          <div>
                            <label className="text-sm font-medium text-slate-600">Nom de domaine</label>
                            <p className="text-slate-800">{brief.domain_name}</p>
                          </div>
                        )}
                        <div>
                          <label className="text-sm font-medium text-slate-600">Hébergement</label>
                          <p className="text-slate-800">{brief.hosting}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-600">Maintenance</label>
                          <p className="text-slate-800">{brief.maintenance}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                                         {/* Éléments légaux */}
                     <div className="space-y-4">
                       <h3 className="text-lg font-semibold flex items-center gap-2">
                         <Shield className="h-5 w-5" />
                         Éléments légaux
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                           <label className="text-sm font-medium text-slate-600">Mentions légales</label>
                           <p className="text-slate-800">{brief.legal_notices}</p>
                         </div>
                         <div>
                           <label className="text-sm font-medium text-slate-600">Politique de confidentialité</label>
                           <p className="text-slate-800">{brief.privacy_policy}</p>
                         </div>
                         <div>
                           <label className="text-sm font-medium text-slate-600">Politique des cookies</label>
                           <p className="text-slate-800">{brief.cookie_policy}</p>
                         </div>
                       </div>
                     </div>

                     <Separator />

                     {/* Fichiers uploadés */}
                     <div className="space-y-4">
                       <h3 className="text-lg font-semibold flex items-center gap-2">
                         <FileText className="h-5 w-5" />
                         Fichiers uploadés
                       </h3>
                       {(() => {
                         const briefFiles = getFilesForBrief(brief.id)
                         return briefFiles.length > 0 ? (
                           <div className="space-y-3">
                             {briefFiles.map((file) => (
                               <div key={file.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
                                 <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                     <FileText className="h-5 w-5 text-blue-600" />
                                   </div>
                                   <div>
                                     <p className="font-medium text-slate-800">{file.original_name}</p>
                                     <p className="text-sm text-slate-500">
                                       {formatFileSize(file.file_size)} • {file.file_type}
                                     </p>
                                   </div>
                                 </div>
                                 <a
                                   href={file.file_url}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                 >
                                   Voir
                                 </a>
                               </div>
                             ))}
                           </div>
                         ) : (
                           <p className="text-slate-500 italic">Aucun fichier uploadé pour ce brief.</p>
                         )
                       })()}
                     </div>
                   </CardContent>
                 </Card>
               </TabsContent>
             ))}
           </Tabs>
         )}
       </div>
     </div>
   )
 } 