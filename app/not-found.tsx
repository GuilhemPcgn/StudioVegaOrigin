import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Page non trouvée
        </h2>
        <p className="text-gray-600 mb-6">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
} 