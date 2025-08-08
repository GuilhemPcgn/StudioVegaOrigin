'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Calendar, Building2, Target, Palette, FileText, Shield, Globe, ChevronLeft, Settings } from 'lucide-react'

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

  const [selectedBrief, setSelectedBrief] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

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
        setError(data.error || "Erreur d'authentification")
      }
    } catch {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const fetchBriefs = async () => {
    try {
      const response = await fetch('/api/admin/briefs')
      const data = await response.json()

      if (response.ok) {
        setBriefs(data.briefs || [])
        fetchFiles()
      } else {
        setError(data.error || 'Erreur lors de la récupération des données')
      }
    } catch {
      setError('Erreur de connexion')
    }
  }

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/admin/files')
      const data = await response.json()

      if (response.ok) {
        setFiles(data.files || [])
      }
    } catch {
      // Erreur silencieuse pour les fichiers
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getObjectiveLabel = (objective: string) => {
    const objectives = {
      presentation: 'Présentation',
      leads: 'Génération de leads',
      appointments: 'Prise de rendez-vous',
      branding: 'Branding',
      other: 'Autre',
    }
    return (objectives as any)[objective] || objective
  }

  const getImportanceLabel = (importance: string) => {
    const importances = {
      low: 'Faible',
      medium: 'Moyenne',
      high: 'Élevée',
    }
    return (importances as any)[importance] || importance
  }

  const getFilesForBrief = (briefId: string) => {
    return files.filter((file) => file.brief_id === briefId)
  }

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }



  useEffect(() => {
    if (briefs.length > 0 && !selectedBrief) {
      setSelectedBrief(briefs[0].id)
    }
  }, [briefs, selectedBrief])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Studio Vega
            </h1>
            <p className="mt-2 text-slate-600">Espace Administration</p>
          </div>

          <Card className="backdrop-blur-sm bg-white/80 shadow-xl border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Connexion</CardTitle>
              <p className="text-sm text-center text-slate-600">
                Accédez à l&apos;interface d&apos;administration
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                  className="bg-white/50"
                />
              </div>

              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleAuth}
                disabled={loading || !password}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Connexion...</span>
                  </div>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`bg-white/80 backdrop-blur-sm border-r border-slate-200 transition-all duration-300 ${
            isSidebarOpen ? 'w-80' : 'w-20'
          } flex flex-col`}
        >
          <div className="p-4 border-b border-slate-200">
            <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
              {isSidebarOpen ? (
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Studio Vega
                </h1>
              ) : (
                <span className="text-xl font-bold text-blue-600">SV</span>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hover:bg-slate-100"
              >
                <ChevronLeft className={`h-4 w-4 transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`} />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <div className={`space-y-2 ${isSidebarOpen ? 'px-4' : 'px-2'}`}>
              {briefs.map((brief) => (
                <button
                  key={brief.id}
                  onClick={() => setSelectedBrief(brief.id)}
                  className={`w-full text-left rounded-lg transition-all ${
                    selectedBrief === brief.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'hover:bg-slate-100 text-slate-700'
                  } ${isSidebarOpen ? 'p-3' : 'p-2'}`}
                >
                  {isSidebarOpen ? (
                    <div className="space-y-1">
                      <div className="font-medium truncate">{brief.company_name}</div>
                      <div className="text-xs opacity-80">{formatDate(brief.created_at)}</div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
                        {brief.company_name.charAt(0)}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>


        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">Administration - Briefs</h1>
                  <p className="text-slate-600">
                    {briefs.length} formulaire{briefs.length > 1 ? 's' : ''} reçu{briefs.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>



              {briefs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh]">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-700 mb-2">Aucun brief</h3>
                  <p className="text-slate-500">Aucun brief n&apos;a été reçu pour le moment.</p>
                </div>
              ) : (
                <Tabs value={selectedBrief || ''} onValueChange={setSelectedBrief}>
                  {briefs.map((brief) => (
                    <TabsContent key={brief.id} value={brief.id}>
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-2xl flex items-center gap-2">
                                <Building2 className="h-6 w-6" />
                                {brief.company_name}
                              </CardTitle>
                              <p className="text-slate-600 mt-1">Soumis le {formatDate(brief.created_at)}</p>
                            </div>
                            <Badge variant="secondary">{brief.business_sector}</Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                          {/* Informations générales */}
                          <div className="rounded-lg bg-white/50 backdrop-blur-sm p-6 border border-slate-200">
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-blue-600" />
                              </div>
                              Informations générales
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">
                                  Secteur d&apos;activité
                                </label>
                                <p className="text-slate-800 font-medium">{brief.business_sector}</p>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">
                                  Objectif principal
                                </label>
                                <p className="text-slate-800 font-medium">{getObjectiveLabel(brief.main_objective)}</p>
                              </div>
                              {brief.other_objective && (
                                <div className="md:col-span-2 bg-white rounded-lg p-4 shadow-sm">
                                  <label className="text-sm font-medium text-slate-600 block mb-1">
                                    Autre objectif
                                  </label>
                                  <p className="text-slate-800">{brief.other_objective}</p>
                                </div>
                              )}
                              <div className="md:col-span-2 bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">
                                  Description de l&apos;activité
                                </label>
                                <p className="text-slate-800 whitespace-pre-wrap">{brief.business_description}</p>
                              </div>
                              <div className="md:col-span-2 bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">Sites inspirants</label>
                                <p className="text-slate-800">{brief.inspiring_websites}</p>
                              </div>
                              {brief.launch_date && (
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                  <label className="text-sm font-medium text-slate-600 block mb-1">
                                    Date de lancement souhaitée
                                  </label>
                                  <p className="text-slate-800 font-medium">{formatDate(brief.launch_date)}</p>
                                </div>
                              )}
                            </div>
                          </div>

                          <Separator />

                          {/* Identité visuelle */}
                          <div className="rounded-lg bg-white/50 backdrop-blur-sm p-6 border border-slate-200">
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <Palette className="h-5 w-5 text-purple-600" />
                              </div>
                              Identité visuelle
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">Logo disponible</label>
                                <Badge
                                  variant="secondary"
                                  className={`mt-1 ${brief.has_logo === 'yes' ? 'bg-green-100 text-green-800' : ''}`}
                                >
                                  {brief.has_logo === 'yes' ? 'Oui' : 'Non'}
                                </Badge>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">
                                  Palette de couleurs
                                </label>
                                <p className="text-slate-800 font-medium">{brief.color_palette}</p>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">
                                  Typographie préférée
                                </label>
                                <p className="text-slate-800 font-medium">{brief.preferred_typography}</p>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">Style graphique</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {(brief.graphic_style || []).map((style, index) => (
                                    <Badge
                                      key={`${style}-${index}`}
                                      variant="outline"
                                      className="bg-purple-50 text-purple-700 border-purple-200"
                                    >
                                      {style}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              {brief.other_graphic_style && (
                                <div className="md:col-span-2 bg-white rounded-lg p-4 shadow-sm">
                                  <label className="text-sm font-medium text-slate-600 block mb-1">
                                    Autre style graphique
                                  </label>
                                  <p className="text-slate-800">{brief.other_graphic_style}</p>
                                </div>
                              )}
                              <div className="md:col-span-2 bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">
                                  Références visuelles
                                </label>
                                <p className="text-slate-800 whitespace-pre-wrap">{brief.visual_references}</p>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Structure et contenu */}
                          <div className="rounded-lg bg-white/50 backdrop-blur-sm p-6 border border-slate-200">
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-green-600" />
                              </div>
                              Structure et contenu
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">Nombre de pages</label>
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl font-bold text-green-600">{brief.number_of_pages}</span>
                                  <span className="text-slate-500">pages</span>
                                </div>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">
                                  Architecture du site
                                </label>
                                <p className="text-slate-800 whitespace-pre-wrap">{brief.site_architecture}</p>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">Textes prêts</label>
                                <Badge
                                  variant="secondary"
                                  className={`mt-1 ${
                                    brief.texts_ready === 'yes'
                                      ? 'bg-green-100 text-green-800'
                                      : brief.texts_ready === 'partial'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : ''
                                  }`}
                                >
                                  {brief.texts_ready === 'yes'
                                    ? 'Oui'
                                    : brief.texts_ready === 'partial'
                                    ? 'Partiellement'
                                    : 'Non'}
                                </Badge>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">
                                  Photos disponibles
                                </label>
                                <Badge
                                  variant="secondary"
                                  className={`mt-1 ${
                                    brief.photos_available === 'yes'
                                      ? 'bg-green-100 text-green-800'
                                      : brief.photos_available === 'partial'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : ''
                                  }`}
                                >
                                  {brief.photos_available === 'yes'
                                    ? 'Oui'
                                    : brief.photos_available === 'partial'
                                    ? 'Partiellement'
                                    : 'Non'}
                                </Badge>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">
                                  Vidéos/Animations
                                </label>
                                <Badge
                                  variant="secondary"
                                  className={`mt-1 ${brief.videos_animations ? 'bg-green-100 text-green-800' : ''}`}
                                >
                                  {brief.videos_animations ? 'Oui' : 'Non'}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Fonctionnalités */}
                          <div className="rounded-lg bg-white/50 backdrop-blur-sm p-6 border border-slate-200">
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
                              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                <Settings className="h-5 w-5 text-orange-600" />
                              </div>
                              Fonctionnalités
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-slate-700">Formulaire de contact</span>
                                  <Badge
                                    variant="secondary"
                                    className={`ml-2 ${brief.contact_form ? 'bg-green-100 text-green-800' : ''}`}
                                  >
                                    {brief.contact_form ? 'Oui' : 'Non'}
                                  </Badge>
                                </div>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-slate-700">Multilingue</span>
                                  <Badge
                                    variant="secondary"
                                    className={`ml-2 ${brief.multilingual ? 'bg-green-100 text-green-800' : ''}`}
                                  >
                                    {brief.multilingual ? 'Oui' : 'Non'}
                                  </Badge>
                                </div>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-slate-700">Réseaux sociaux</span>
                                  <Badge
                                    variant="secondary"
                                    className={`ml-2 ${brief.social_networks ? 'bg-green-100 text-green-800' : ''}`}
                                  >
                                    {brief.social_networks ? 'Oui' : 'Non'}
                                  </Badge>
                                </div>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-slate-700">Carte interactive</span>
                                  <Badge
                                    variant="secondary"
                                    className={`ml-2 ${brief.interactive_map ? 'bg-green-100 text-green-800' : ''}`}
                                  >
                                    {brief.interactive_map ? 'Oui' : 'Non'}
                                  </Badge>
                                </div>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-slate-700">Blog</span>
                                  <Badge
                                    variant="secondary"
                                    className={`ml-2 ${brief.blog ? 'bg-green-100 text-green-800' : ''}`}
                                  >
                                    {brief.blog ? 'Oui' : 'Non'}
                                  </Badge>
                                </div>
                              </div>
                              {brief.languages && (
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                  <label className="text-sm font-medium text-slate-600 block mb-1">Langues</label>
                                  <p className="text-slate-800 font-medium">{brief.languages}</p>
                                </div>
                              )}
                              {brief.other_features && (
                                <div className="md:col-span-3 bg-white rounded-lg p-4 shadow-sm">
                                  <label className="text-sm font-medium text-slate-600 block mb-1">
                                    Autres fonctionnalités
                                  </label>
                                  <p className="text-slate-800">{brief.other_features}</p>
                                </div>
                              )}
                            </div>
                          </div>

                          <Separator />

                          {/* SEO et Performance */}
                          <div className="rounded-lg bg-white/50 backdrop-blur-sm p-6 border border-slate-200">
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
                              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                <Target className="h-5 w-5 text-red-600" />
                              </div>
                              SEO et Performance
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">Audience cible</label>
                                <p className="text-slate-800 whitespace-pre-wrap">{brief.target_audience}</p>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">Importance SEO</label>
                                <Badge
                                  variant="secondary"
                                  className={`mt-1 ${
                                    brief.seo_importance === 'high'
                                      ? 'bg-green-100 text-green-800'
                                      : brief.seo_importance === 'medium'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : ''
                                  }`}
                                >
                                  {getImportanceLabel(brief.seo_importance)}
                                </Badge>
                              </div>
                              <div className="md:col-span-2 bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">
                                  Mots-clés principaux
                                </label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {(brief.main_keywords || '')
                                    .split(',')
                                    .filter((k) => k.trim().length > 0)
                                    .map((keyword, index) => (
                                      <Badge
                                        key={`${keyword}-${index}`}
                                        variant="outline"
                                        className="bg-red-50 text-red-700 border-red-200"
                                      >
                                        {keyword.trim()}
                                      </Badge>
                                    ))}
                                </div>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-slate-700">Suivi analytics</span>
                                  <Badge
                                    variant="secondary"
                                    className={`ml-2 ${brief.analytics_tracking ? 'bg-green-100 text-green-800' : ''}`}
                                  >
                                    {brief.analytics_tracking ? 'Oui' : 'Non'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Hébergement et Maintenance */}
                          <div className="rounded-lg bg-white/50 backdrop-blur-sm p-6 border border-slate-200">
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <Globe className="h-5 w-5 text-blue-600" />
                              </div>
                              Hébergement et Maintenance
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-slate-700">Domaine existant</span>
                                  <Badge
                                    variant="secondary"
                                    className={`ml-2 ${brief.existing_domain === 'yes' ? 'bg-green-100 text-green-800' : ''}`}
                                  >
                                    {brief.existing_domain === 'yes' ? 'Oui' : 'Non'}
                                  </Badge>
                                </div>
                              </div>
                              {brief.domain_name && (
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                  <label className="text-sm font-medium text-slate-600 block mb-1">
                                    Nom de domaine
                                  </label>
                                  <p className="text-slate-800 font-medium">{brief.domain_name}</p>
                                </div>
                              )}
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">Hébergement</label>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mt-1">
                                  {brief.hosting}
                                </Badge>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">Maintenance</label>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mt-1">
                                  {brief.maintenance}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Éléments légaux */}
                          <div className="rounded-lg bg-white/50 backdrop-blur-sm p-6 border border-slate-200">
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <Shield className="h-5 w-5 text-purple-600" />
                              </div>
                              Éléments légaux
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">Mentions légales</label>
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 mt-1">
                                  {brief.legal_notices}
                                </Badge>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">
                                  Politique de confidentialité
                                </label>
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 mt-1">
                                  {brief.privacy_policy}
                                </Badge>
                              </div>
                              <div className="bg-white rounded-lg p-4 shadow-sm">
                                <label className="text-sm font-medium text-slate-600 block mb-1">
                                  Politique des cookies
                                </label>
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 mt-1">
                                  {brief.cookie_policy}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Fichiers uploadés */}
                          <div className="rounded-lg bg-white/50 backdrop-blur-sm p-6 border border-slate-200">
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-green-600" />
                              </div>
                              Fichiers uploadés
                            </h3>
                            {(() => {
                              const briefFiles = getFilesForBrief(brief.id)
                              return briefFiles.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                  {briefFiles.map((file) => (
                                    <div key={file.id} className="bg-white rounded-lg p-4 shadow-sm">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <FileText className="h-6 w-6 text-green-600" />
                                          </div>
                                          <div>
                                            <p className="font-medium text-slate-800">{file.original_name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                              <Badge
                                                variant="outline"
                                                className="bg-green-50 text-green-700 border-green-200"
                                              >
                                                {file.file_type}
                                              </Badge>
                                              <span className="text-sm text-slate-500">{formatFileSize(file.file_size)}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <a
                                          href={file.file_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 flex items-center gap-2"
                                        >
                                          <span>Voir</span>
                                          <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                          </svg>
                                        </a>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center py-8">
                                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <FileText className="h-8 w-8 text-slate-400" />
                                  </div>
                                  <p className="text-slate-500 text-center">Aucun fichier uploadé pour ce brief.</p>
                                </div>
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
        </div>
      </div>
    </div>
  )
}
