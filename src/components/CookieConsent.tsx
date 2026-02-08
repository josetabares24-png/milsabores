'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { Link } from '@/i18n/routing'

const COOKIE_CONSENT_KEY = 'mil-sabores-cookie-consent'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-slate/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 bg-pastel/20 rounded-xl flex items-center justify-center">
                <Cookie className="text-pastel" size={24} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate mb-1">
                  Utilizamos cookies
                </h3>
                <p className="text-slate/70 text-sm leading-relaxed">
                  Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra{' '}
                  <Link href="/cookies" className="text-pastel font-semibold hover:underline">
                    Política de Cookies
                  </Link>{' '}
                  y{' '}
                  <Link href="/privacidad" className="text-pastel font-semibold hover:underline">
                    Política de Privacidad
                  </Link>.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={declineCookies}
                  className="flex-1 md:flex-none px-5 py-2.5 text-slate/70 font-medium hover:text-slate transition-colors text-sm"
                  aria-label="Rechazar cookies"
                >
                  Rechazar
                </button>
                <button
                  onClick={acceptCookies}
                  className="flex-1 md:flex-none px-6 py-2.5 bg-pastel text-white font-bold rounded-full hover:bg-pastel-dark transition-all shadow-lg shadow-pastel/30 text-sm"
                  aria-label="Aceptar cookies"
                >
                  Aceptar
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={declineCookies}
                className="absolute top-3 right-3 md:hidden p-2 text-slate/40 hover:text-slate transition-colors"
                aria-label="Cerrar banner de cookies"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
