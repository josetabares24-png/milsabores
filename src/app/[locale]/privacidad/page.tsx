'use client'

import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/routing'
import { RESTAURANT } from '@/config/restaurant'

const linkClass = 'text-pastel-ink font-bold hover:underline'
const s2Items = ['reservations', 'contact', 'browsing'] as const
const s3Items = ['a', 'b', 'c', 'd'] as const
const s7Items = ['access', 'rectification', 'erasure', 'objection', 'portability'] as const

export default function PrivacyPage() {
  const t = useTranslations('legal')
  const rich = {
    email: (chunks: ReactNode) => (
      <a href={`mailto:${RESTAURANT.email}`} className={linkClass}>{chunks}</a>
    ),
    phone: (chunks: ReactNode) => (
      <a href={`tel:${RESTAURANT.phoneClean}`} className={linkClass}>{chunks}</a>
    ),
    link: (chunks: ReactNode) => (
      <Link href="/cookies" className={linkClass}>{chunks}</Link>
    ),
  }

  return (
    <div className="min-h-screen bg-cream pt-28 md:pt-32 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8">{t('privacy.title')}</h1>

        <div className="bg-white rounded-2xl p-6 md:p-10 border border-slate/15 space-y-8 text-slate leading-relaxed">
          <p className="text-sm text-slate">{t('updated')}</p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s1_title')}</h2>
            <p>
              <strong>Mil Sabores Lisboa</strong><br />
              {RESTAURANT.address.full}<br />
              Email: {RESTAURANT.email}<br />
              {t('privacy.phone_label')}: {RESTAURANT.phone}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s2_title')}</h2>
            <p>{t('privacy.s2_intro')}</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              {s2Items.map((k) => (
                <li key={k}><strong>{t(`privacy.s2_items.${k}.label`)}</strong> {t(`privacy.s2_items.${k}.text`)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s3_title')}</h2>
            <p>{t('privacy.s3_intro')}</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              {s3Items.map((k) => (
                <li key={k}>{t(`privacy.s3_items.${k}`)}</li>
              ))}
            </ul>
          </section>

          {(['s4', 's5', 's6'] as const).map((s) => (
            <section key={s}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t(`privacy.${s}_title`)}</h2>
              <p>{t(`privacy.${s}_text`)}</p>
            </section>
          ))}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s7_title')}</h2>
            <p>{t('privacy.s7_intro')}</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              {s7Items.map((k) => (
                <li key={k}><strong>{t(`privacy.s7_items.${k}.label`)}</strong> {t(`privacy.s7_items.${k}.text`)}</li>
              ))}
            </ul>
            <p className="mt-3">{t.rich('privacy.s7_contact', rich)}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s8_title')}</h2>
            <p>{t('privacy.s8_text')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s9_title')}</h2>
            <p>{t.rich('privacy.s9_text', rich)}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.s10_title')}</h2>
            <p>{t.rich('privacy.s10_text', rich)}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
