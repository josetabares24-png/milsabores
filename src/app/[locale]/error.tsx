'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('common')

  useEffect(() => {
    // Log error to error reporting service
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-white to-peach/20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-red-500">
              error
            </span>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {t('error.title', { default: 'Algo Correu Mal' })}
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
            {t('error.message', {
              default: 'Desculpe, ocorreu um erro inesperado. Por favor, tente novamente.'
            })}
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left max-w-lg mx-auto">
              <p className="text-sm font-mono text-red-800 break-words">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-600 mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-8 py-4 bg-pastel text-white rounded-full font-semibold hover:bg-pastel/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="material-symbols-outlined">refresh</span>
            {t('error.retry', { default: 'Tentar Novamente' })}
          </button>

          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pastel border-2 border-pastel rounded-full font-semibold hover:bg-pastel/5 transition-all duration-300 hover:scale-105"
          >
            <span className="material-symbols-outlined">home</span>
            {t('error.home', { default: 'Voltar ao Início' })}
          </a>
        </motion.div>

        {/* Support Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <p className="text-sm text-slate-500">
            {t('error.support', { default: 'Se o problema persistir, entre em contacto connosco:' })}{' '}
            <a
              href="mailto:milsaboreslx@gmail.com"
              className="text-pastel hover:underline font-semibold"
            >
              milsaboreslx@gmail.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
