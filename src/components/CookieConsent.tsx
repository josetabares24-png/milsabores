'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

const COOKIE_CONSENT_KEY = 'mil-sabores-cookie-consent'

// Faixa compacta (1-2 linhas). Enquanto está visível marca <html data-cookie-banner="open">,
// para esconder a barra de reserva móvel e o "voltar ao topo" (ver globals.css).
export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const t = useTranslations('cookieConsent')

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
      const timer = setTimeout(() => setShowBanner(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (showBanner) root.dataset.cookieBanner = 'open'
    else delete root.dataset.cookieBanner
  }, [showBanner])

  const choose = (value: 'accepted' | 'declined') => {
    localStorage.setItem(COOKIE_CONSENT_KEY, value)
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div
      role="region"
      aria-label={t('title')}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate/15 bg-white pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5">
        <p className="flex-1 text-[13px] leading-snug text-gray-800">
          {t('short')}{' '}
          <Link href="/cookies" className="font-semibold text-pastel-ink underline underline-offset-2">
            {t('more')}
          </Link>
        </p>
        <button
          type="button"
          onClick={() => choose('declined')}
          className="px-2 py-1.5 text-[13px] font-medium text-slate hover:text-gray-900"
        >
          {t('decline')}
        </button>
        <button
          type="button"
          onClick={() => choose('accepted')}
          className="rounded-full bg-pastel px-4 py-1.5 text-[13px] font-bold text-gray-900 hover:bg-pastel-dark"
        >
          {t('accept')}
        </button>
      </div>
    </div>
  )
}
