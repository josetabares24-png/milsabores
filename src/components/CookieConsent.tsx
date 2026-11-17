'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import { COOKIE_CONSENT_KEY, saveCookieConsent } from '@/lib/analytics-consent'

const consentCopy: Record<string, string> = {
  pt: 'Usamos Google Analytics para medir visitas apenas se aceitar cookies de análise. Consulte a nossa',
  es: 'Usamos Google Analytics para medir visitas solo si aceptas las cookies de análisis. Consulta nuestra',
  en: 'We use Google Analytics to measure visits only if you accept analytics cookies. See our',
  fr: 'Nous utilisons Google Analytics pour mesurer les visites uniquement si vous acceptez les cookies de mesure. Consultez notre',
  de: 'Wir verwenden Google Analytics zur Besuchsmessung nur, wenn Sie Analyse-Cookies zustimmen. Lesen Sie unsere',
  it: 'Usiamo Google Analytics per misurare le visite solo se accetti i cookie analitici. Consulta la nostra',
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const t = useTranslations('cookieConsent')
  const locale = useLocale()

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
    saveCookieConsent('accepted')
    setShowBanner(false)
  }

  const declineCookies = () => {
    saveCookieConsent('declined')
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
          role="region"
          aria-label={t('title')}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-4"
        >
          {/* Mesmo cartão de antes (branco, arredondado, ícone, botões), só mais compacto */}
          <div className="relative max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-slate/10 px-4 py-3 md:px-5 md:py-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
              <div className="flex items-start gap-3 flex-1 pr-8 md:pr-0">
                {/* Icon */}
                <div className="flex-shrink-0 w-9 h-9 bg-pastel/20 rounded-lg flex items-center justify-center">
                  <Cookie className="text-pastel" size={18} aria-hidden="true" />
                </div>

                {/* Content */}
                <p className="text-slate text-xs md:text-sm leading-snug">
                  <span className="block font-bold text-sm md:text-base text-gray-800 mb-0.5">{t('title')}</span>
                  {consentCopy[locale] || consentCopy.pt}{' '}
                  <Link href="/cookies" className="text-pastel-ink font-semibold hover:underline">
                    {t('cookies')}
                  </Link>{' '}
                  {t('and')}{' '}
                  <Link href="/privacidad" className="text-pastel-ink font-semibold hover:underline">
                    {t('privacy')}
                  </Link>.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2 md:w-auto">
                <button
                  type="button"
                  onClick={declineCookies}
                  className="px-4 py-2 text-slate font-medium hover:text-gray-800 transition-colors text-sm"
                >
                  {t('decline')}
                </button>
                <button
                  type="button"
                  onClick={acceptCookies}
                  className="px-5 py-2 bg-pastel text-gray-800 font-bold rounded-full hover:bg-pastel-dark transition-all shadow-md shadow-pastel/30 text-sm"
                >
                  {t('accept')}
                </button>
              </div>
            </div>

            {/* Close button (mobile) */}
            <button
              type="button"
              onClick={declineCookies}
              className="absolute top-2 right-2 md:hidden p-2 text-slate hover:text-gray-800 transition-colors"
              aria-label={t('close')}
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
