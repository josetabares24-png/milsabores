'use client'

import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import SectionHeading from '@/components/brand/SectionHeading'
import { RESTAURANT } from '@/config/restaurant'

const linkClass = 'text-pastel-ink font-bold hover:underline'
const browsers = [
  ['chrome', 'Chrome'],
  ['firefox', 'Firefox'],
  ['safari', 'Safari'],
  ['edge', 'Edge'],
] as const

export default function CookiesPage() {
  const t = useTranslations('legal')
  const rich = {
    email: (chunks: ReactNode) => (
      <a href={`mailto:${RESTAURANT.email}`} className={linkClass}>{chunks}</a>
    ),
    link: (chunks: ReactNode) => (
      <Link href="/privacidad" className={linkClass}>{chunks}</Link>
    ),
  }

  return (
    <div className="min-h-screen bg-cream pt-28 pb-24 px-6 md:pt-36">
      <div className="max-w-4xl mx-auto">
        <SectionHeading as="h1" eyebrow={t('label')} title={t('cookies.title')} className="mb-10" />

        <div className="bg-white p-6 md:p-12 border-2 border-dashed border-slate/25 space-y-8 text-slate leading-relaxed">
          <p className="text-sm text-slate">{t('updated')}</p>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('cookies.s1_title')}</h2>
            <p>{t('cookies.s1_text')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('cookies.s2_title')}</h2>
            <div className="space-y-4 mt-4">
              {(['essential', 'performance', 'third'] as const).map((k) => (
                <div key={k} className="p-4 bg-slate/5 rounded-2xl">
                  <h3 className="font-bold text-slate mb-2">{t(`cookies.${k}_title`)}</h3>
                  <p className="text-sm">{t(`cookies.${k}_text`)}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('cookies.s3_title')}</h2>
            <p>{t('cookies.s3_text')}</p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-sm">
              {browsers.map(([k, name]) => (
                <li key={k}><strong>{name}:</strong> {t(`cookies.browsers.${k}`)}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('cookies.s4_title')}</h2>
            <p>{t('cookies.s4_text')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('cookies.s5_title')}</h2>
            <p>{t.rich('cookies.s5_text', rich)}</p>
            <p className="mt-3">{t.rich('cookies.s5_contact', rich)}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
