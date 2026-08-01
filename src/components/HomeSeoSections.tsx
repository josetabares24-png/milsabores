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
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl leading-relaxed text-slate/70">
            {t('intro')}
          </p>
        </div>
      </section>
    )
  }

  if (variant === 'brunch') {
    return (
      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-pastel text-sm font-bold tracking-widest uppercase">
              {t('brunch.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate mt-4 mb-6">
              {t('brunch.title')}
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
            <div className="space-y-5 text-slate/70 text-lg leading-relaxed">
              <p>{t('brunch.p1')}</p>
              <p>{t('brunch.p2')}</p>
              <p>{t('brunch.p3')}</p>
            </div>
            <div className="bg-cream border-2 border-pastel/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-slate mb-4">{t('location.title')}</h3>
              <p className="text-slate/70 leading-relaxed mb-5">{t('location.text')}</p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/menu"
                  className="inline-flex justify-center px-6 py-3 bg-pastel text-white font-bold rounded-full hover:bg-pastel-dark transition-colors"
                >
                  {t('ctas.menu')}
                </Link>
                <a
                  href="https://maps.app.goo.gl/5QmYkV2uUZrYCLT9A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center px-6 py-3 bg-white text-slate font-bold rounded-full border-2 border-slate/10 hover:border-pastel transition-colors"
                >
                  {t('ctas.maps')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const faqItems = [1, 2, 3, 4, 5] as const

  return (
    <section className="px-6 py-20 bg-cream">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-pastel text-sm font-bold tracking-widest uppercase">
            {t('faq.eyebrow')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate mt-4">
            {t('faq.title')}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {faqItems.map((item) => (
            <article key={item} className="bg-white rounded-2xl p-6 border-2 border-slate/10">
              <h3 className="text-lg font-bold text-slate mb-2">{t(`faq.items.${item}.q`)}</h3>
              <p className="text-slate/70 leading-relaxed">{t(`faq.items.${item}.a`)}</p>
            </article>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/reservas#contacto"
            className="inline-flex px-8 py-4 bg-white text-slate font-bold rounded-full border-2 border-pastel/30 hover:bg-pastel hover:text-white transition-colors"
          >
            {t('ctas.contact')}
          </Link>
        </div>
      </div>
    </section>
  )
}
