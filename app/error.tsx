'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Une erreur s'est produite
        </h2>
        <p className="text-gray-600 mb-6">
          Désolé, quelque chose s'est mal passé. Veuillez réessayer.
        </p>
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
} 