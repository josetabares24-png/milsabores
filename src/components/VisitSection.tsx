import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { RESTAURANT } from '@/config/restaurant'

export default function VisitSection() {
  const t = useTranslations('visit')

  const rows = [
    { label: t('address_title'), value: t('address') },
    { label: t('hours_title'), value: t('hours_weekday') },
    { label: t('phone_title'), value: t('phone'), href: 'tel:+351213470214' },
    { label: t('email_title'), value: t('email'), href: 'mailto:milsaboreslx@gmail.com' },
  ]

  return (
    <section id="contact" className="px-6 py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">{t('title')}</h2>
          <p className="mt-3 text-lg text-slate">{t('subtitle')}</p>

          <dl className="mt-8 divide-y divide-slate/15 border-y border-slate/15">
            {rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-4 py-3">
                <dt className="text-sm font-bold text-gray-900">{row.label}</dt>
                <dd className="text-slate">
                  {row.href ? (
                    <a href={row.href} className="hover:text-pastel-ink underline-offset-2 hover:underline">{row.value}</a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/reservas" className="rounded-full bg-pastel px-7 py-3 font-bold text-gray-900 hover:bg-pastel-dark transition-colors">
              {t('cta_reserve')}
            </Link>
            <a href="tel:+351213470214" className="rounded-full border border-slate/25 bg-white px-7 py-3 font-bold text-gray-900 hover:border-pastel-dark transition-colors">
              {t('cta_call')}
            </a>
          </div>
        </div>

        <div className="relative h-[320px] lg:h-auto lg:min-h-[420px] overflow-hidden rounded-2xl border border-slate/15">
          <iframe
            // Embed por pesquisa de morada (não precisa de API key); a morada vem de config/restaurant.ts
            src={`https://www.google.com/maps?q=${encodeURIComponent(RESTAURANT.address.full)}&z=17&output=embed`}
            title={t('map_title')}
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
