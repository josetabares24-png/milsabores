import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'

type Variant = 'intro' | 'brunch' | 'faq'

interface HomeSeoSectionsProps {
  variant: Variant
}

export default async function HomeSeoSections({ variant }: HomeSeoSectionsProps) {
  const t = await getTranslations('homeSeo')

  if (variant === 'intro') {
    return (
      <section className="px-6 py-14 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-2xl leading-relaxed text-gray-700">
            {t('intro')}
          </p>
        </div>
      </section>
    )
  }

  if (variant === 'brunch') {
    return (
      <section className="px-6 py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              {t('brunch.title')}
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
            <div className="space-y-5 text-slate text-lg leading-relaxed">
              <p>{t('brunch.p1')}</p>
              <p>{t('brunch.p2')}</p>
              <p>{t('brunch.p3')}</p>
            </div>
            <div className="border-t-2 border-gray-900 pt-5">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('location.title')}</h3>
              <p className="text-slate leading-relaxed mb-5">{t('location.text')}</p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/menu"
                  className="inline-flex justify-center px-6 py-3 bg-pastel text-gray-800 font-bold rounded-full hover:bg-pastel-dark transition-colors"
                >
                  {t('ctas.menu')}
                </Link>
                <a
                  href="https://maps.app.goo.gl/5QmYkV2uUZrYCLT9A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center px-6 py-3 bg-white text-gray-900 font-bold rounded-full border border-slate/25 hover:border-pastel-dark transition-colors"
                >
                  {t('ctas.maps')}
                </a>
                <Link
                  href="/brunch-lisboa"
                  className="inline-flex justify-center px-6 py-3 text-gray-900 font-bold underline decoration-pastel-dark decoration-2 underline-offset-4 hover:text-pastel-ink"
                >
                  {t('ctas.brunch')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const faqItems = [1, 2, 3, 4, 5] as const

  return (
    <section className="px-6 py-16 md:py-20 bg-cream">
      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1fr_2fr]">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{t('faq.title')}</h2>
        <div>
          <dl className="divide-y divide-slate/15 border-y border-slate/15">
            {faqItems.map((item) => (
              <div key={item} className="py-4">
                <dt className="font-bold text-gray-900">{t(`faq.items.${item}.q`)}</dt>
                <dd className="mt-1 text-slate leading-relaxed">{t(`faq.items.${item}.a`)}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/reservas#contacto"
            className="mt-6 inline-block font-bold text-gray-900 underline decoration-pastel-dark decoration-2 underline-offset-4 hover:text-pastel-ink"
          >
            {t('ctas.contact')}
          </Link>
        </div>
      </div>
    </section>
  )
}
