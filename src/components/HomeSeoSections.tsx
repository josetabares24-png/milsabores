import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import SectionHeading from './brand/SectionHeading'

type Variant = 'intro' | 'brunch' | 'faq'

interface HomeSeoSectionsProps {
  variant: Variant
}

export default async function HomeSeoSections({ variant }: HomeSeoSectionsProps) {
  const t = await getTranslations('homeSeo')

  if (variant === 'intro') {
    return (
      <section className="bg-cream px-6 pb-16 md:pb-20">
        <div className="rule-dashed mx-auto max-w-3xl pt-10 text-center">
          <p className="text-lg leading-relaxed text-gray-700 md:text-xl">{t('intro')}</p>
        </div>
      </section>
    )
  }

  if (variant === 'brunch') {
    return (
      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1.4fr_0.8fr] lg:gap-20">
          <div>
            <SectionHeading align="left" eyebrow={t('brunch.eyebrow')} title={t('brunch.title')} />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate">
              <p>{t('brunch.p1')}</p>
              <p>{t('brunch.p2')}</p>
              <p>{t('brunch.p3')}</p>
            </div>
          </div>
          <aside className="border-2 border-dashed border-slate/25 bg-cream p-6 md:p-8 lg:mt-24">
            <h3 className="text-xl font-bold text-gray-800">{t('location.title')}</h3>
            <p className="mt-3 leading-relaxed text-slate">{t('location.text')}</p>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/menu" className="btn-primary">
                {t('ctas.menu')}
              </Link>
              <a href="https://maps.app.goo.gl/5QmYkV2uUZrYCLT9A" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                {t('ctas.maps')}
              </a>
            </div>
          </aside>
        </div>
      </section>
    )
  }

  const faqItems = [1, 2, 3, 4, 5] as const

  return (
    <section className="bg-cream px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow={t('faq.eyebrow')} title={t('faq.title')} />
        <dl className="mt-12 grid gap-x-14 md:grid-cols-2">
          {faqItems.map((item) => (
            <div key={item} className="border-t border-dashed border-slate/30 py-6">
              <dt className="text-lg font-bold text-gray-800">{t(`faq.items.${item}.q`)}</dt>
              <dd className="mt-2 leading-relaxed text-slate">{t(`faq.items.${item}.a`)}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 text-center">
          <Link href="/reservas#contacto" className="btn-secondary">
            {t('ctas.contact')}
          </Link>
        </div>
      </div>
    </section>
  )
}
