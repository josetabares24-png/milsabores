'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

const COOKIE_CONSENT_KEY = 'mil-sabores-cookie-consent'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const t = useTranslations('cookieConsent')

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
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="region"
          aria-label={t('title')}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-slate/15 bg-white/95 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
            <p className="flex-1 text-xs leading-snug text-slate sm:text-sm">
              <span className="sr-only">{t('title')}. </span>
              {t('text')}{' '}
              <Link href="/cookies" className="font-semibold text-sky-800 underline underline-offset-2">
                {t('cookies')}
              </Link>{' '}
              {t('and')}{' '}
              <Link href="/privacidad" className="font-semibold text-sky-800 underline underline-offset-2">
                {t('privacy')}
              </Link>.
            </p>
            <div className="flex shrink-0 items-center justify-end gap-2">
              <button
                type="button"
                onClick={declineCookies}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate hover:text-gray-900"
              >
                {t('decline')}
              </button>
              <button
                type="button"
                onClick={acceptCookies}
                className="rounded-full bg-sky-800 px-4 py-2 text-sm font-bold text-white hover:bg-sky-900"
              >
                {t('accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
