'use client'

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import {
  COOKIE_CONSENT_KEY,
  saveCookieConsent,
  type CookieConsentChoice,
} from '@/lib/analytics-consent'

const copy: Record<string, { info: string; current: string; yes: string; no: string; unset: string }> = {
  pt: {
    info: 'O Google Analytics 4 só mede as visitas se aceitar cookies de análise. Pode alterar a sua escolha aqui a qualquer momento.',
    current: 'Preferência atual:',
    yes: 'Aceites',
    no: 'Recusadas',
    unset: 'Por decidir',
  },
  es: {
    info: 'Google Analytics 4 solo mide las visitas si aceptas las cookies de análisis. Puedes cambiar tu decisión aquí en cualquier momento.',
    current: 'Preferencia actual:',
    yes: 'Aceptadas',
    no: 'Rechazadas',
    unset: 'Sin decidir',
  },
  en: {
    info: 'Google Analytics 4 measures visits only if you accept analytics cookies. You can change your choice here at any time.',
    current: 'Current choice:',
    yes: 'Accepted',
    no: 'Declined',
    unset: 'Not chosen',
  },
  fr: {
    info: 'Google Analytics 4 ne mesure les visites que si vous acceptez les cookies analytiques. Vous pouvez modifier votre choix ici à tout moment.',
    current: 'Choix actuel :',
    yes: 'Acceptés',
    no: 'Refusés',
    unset: 'Non choisi',
  },
  de: {
    info: 'Google Analytics 4 misst Besuche nur, wenn Sie Analyse-Cookies zustimmen. Sie können Ihre Entscheidung hier jederzeit ändern.',
    current: 'Aktuelle Auswahl:',
    yes: 'Akzeptiert',
    no: 'Abgelehnt',
    unset: 'Nicht gewählt',
  },
  it: {
    info: 'Google Analytics 4 misura le visite solo se accetti i cookie analitici. Puoi modificare la tua scelta qui in qualsiasi momento.',
    current: 'Scelta attuale:',
    yes: 'Accettati',
    no: 'Rifiutati',
    unset: 'Non scelta',
  },
}

export default function CookiePreferenceControls() {
  const locale = useLocale()
  const t = useTranslations('cookieConsent')
  const labels = copy[locale] || copy.pt
  const [choice, setChoice] = useState<CookieConsentChoice | null>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    if (stored === 'accepted' || stored === 'declined') setChoice(stored)
  }, [])

  const choose = (value: CookieConsentChoice) => {
    setChoice(value)
    saveCookieConsent(value)
  }

  return (
    <div className="rounded-2xl border border-pastel/30 bg-pastel/5 p-5">
      <p className="mb-3 text-sm">{labels.info}</p>
      <p className="mb-4 text-sm font-semibold" aria-live="polite">
        {labels.current} {choice === 'accepted' ? labels.yes : choice === 'declined' ? labels.no : labels.unset}
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => choose('declined')}
          className="rounded-full border border-slate/30 px-5 py-2 text-sm font-semibold hover:bg-slate/10"
        >
          {t('decline')}
        </button>
        <button
          type="button"
          onClick={() => choose('accepted')}
          className="rounded-full bg-pastel px-5 py-2 text-sm font-bold text-gray-800 hover:bg-pastel-dark"
        >
          {t('accept')}
        </button>
      </div>
    </div>
  )
}
