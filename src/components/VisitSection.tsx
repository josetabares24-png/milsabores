import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { RESTAURANT } from '@/config/restaurant'
import SectionHeading from './brand/SectionHeading'

/** Visita como um cartão impresso: dados em linhas tracejadas ao lado do mapa emoldurado. */
export default function VisitSection() {
  const t = useTranslations('visit')

  return (
    <section id="contact" className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} intro={t('subtitle')} />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <dl className="text-slate">
              <div className="border-t border-dashed border-slate/30 py-5">
                <dt className="eyebrow">{t('address_title')}</dt>
                <dd className="mt-2 text-lg text-gray-800">{t('address')}</dd>
              </div>
              <div className="border-t border-dashed border-slate/30 py-5">
                <dt className="eyebrow">{t('hours_title')}</dt>
                <dd className="mt-2 text-lg text-gray-800">
                  <span className="block">{t('hours_weekday')}</span>
                  <span className="block">{t('hours_weekend')}</span>
                </dd>
              </div>
              <div className="border-t border-dashed border-slate/30 py-5">
                <dt className="eyebrow">{t('phone_title')}</dt>
                <dd className="mt-2 text-lg">
                  <a href={`tel:${RESTAURANT.phoneClean}`} className="link-ink">
                    {t('phone')}
                  </a>
                </dd>
              </div>
              <div className="border-y border-dashed border-slate/30 py-5">
                <dt className="eyebrow">{t('email_title')}</dt>
                <dd className="mt-2 text-lg">
                  <a href={`mailto:${RESTAURANT.email}`} className="link-ink break-all">
                    {t('email')}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-800">{t('reserve_title')}</h3>
              <p className="mt-2 leading-relaxed text-slate">{t('reserve_desc')}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/reservas" className="btn-primary">
                  {t('cta_reserve')}
                </Link>
                <a href={`tel:${RESTAURANT.phoneClean}`} className="btn-secondary">
                  {t('cta_call')}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-2 ring-1 ring-black/10 md:p-3">
            <div className="relative h-[360px] overflow-hidden rounded-[2px] md:h-full md:min-h-[460px]">
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
        </div>
      </div>
    </section>
  )
}
