import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import SchemaMarkup from '@/components/SchemaMarkup'
import { INTENT_KEYS, INTENT_PAGES } from '@/lib/intent-pages'

const productPhotos = [
  '/images/Mil Sabores/Panqueca Queso Crema y Compota.webp',
  '/images/Mil Sabores/Bagel Salmon 2.webp',
  '/images/Mil Sabores/milshakes.webp',
  '/images/Mil Sabores/Copos Helado.webp',
]

export default async function BrunchLisboaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('brunchLanding')
  const tIntent = await getTranslations('intentPages')
  const paragraphs = [1, 2, 3, 4, 5, 6] as const
  const productItems = [1, 2, 3, 4] as const
  const faqItems = [1, 2, 3, 4, 5] as const

  return (
    <main className="min-h-screen bg-white pt-28">
      <SchemaMarkup locale={locale} page="brunch" path="brunch-lisboa" />

      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-pastel-ink transition-colors">
                  {t('breadcrumb.home')}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-slate">
                {t('breadcrumb.current')}
              </li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight mb-6 break-words">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-slate leading-relaxed mb-8 max-w-2xl">
                {t('hero.subtitle')}
              </p>
              <div data-primary-cta className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/menu"
                  className="inline-flex w-full sm:w-auto justify-center px-6 sm:px-8 py-4 bg-pastel text-gray-900 font-bold rounded-full hover:bg-pastel-dark transition-colors"
                >
                  {t('ctas.menu')}
                </Link>
                <a
                  href="https://maps.app.goo.gl/5QmYkV2uUZrYCLT9A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto justify-center px-6 sm:px-8 py-4 bg-white text-gray-900 font-bold rounded-full border border-slate/25 hover:border-pastel-dark transition-colors"
                >
                  {t('ctas.maps')}
                </a>
              </div>
            </div>

            <div className="relative min-h-[420px] rounded-2xl overflow-hidden">
              <Image
                src="/images/Mil Sabores/Brunch Americano.webp"
                alt={t('hero.imageAlt')}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20 bg-pastel-light">
        <div className="max-w-6xl mx-auto"><div className="max-w-3xl mx-auto space-y-5 text-center text-lg md:text-xl text-gray-800 leading-relaxed">
          {paragraphs.map((item) => (
            <p key={item}>{t(`story.p${item}`)}</p>
          ))}
        </div></div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              {t('products.title')}
            </h2>
            <p className="text-lg text-slate">{t('products.subtitle')}</p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productItems.map((item) => (
              <li key={item} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                  <Image
                    src={productPhotos[item - 1]}
                    alt={t(`products.items.${item}.title`)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">{t(`products.items.${item}.title`)}</h3>
                <p className="mt-1 text-slate leading-relaxed">{t(`products.items.${item}.text`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-20 bg-cream">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          <div className="border-t-2 border-gray-900 pt-5">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">{t('visit.title')}</h2>
            <p className="text-slate leading-relaxed mb-6">{t('visit.text')}</p>
            <div className="space-y-3 text-slate">
              <p>
                <strong className="text-gray-900">{t('visit.addressLabel')}</strong>
                <br />
                Rua da Prata 152, 1100-619 Lisboa, Portugal
              </p>
              <p>
                <strong className="text-gray-900">{t('visit.hoursLabel')}</strong>
                <br />
                {t('visit.hours')}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-5">{t('menu.title')}</h2>
            <p className="text-lg text-slate leading-relaxed mb-8">{t('menu.text')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/menu"
                className="inline-flex w-full sm:w-auto justify-center px-6 sm:px-8 py-4 bg-pastel text-gray-900 font-bold rounded-full hover:bg-pastel-dark transition-colors"
              >
                {t('ctas.menu')}
              </Link>
              <Link
                href="/reservas"
                className="inline-flex w-full sm:w-auto justify-center px-6 sm:px-8 py-4 bg-white text-gray-900 font-bold rounded-full border border-slate/25 hover:border-pastel-dark transition-colors"
              >
                {t('ctas.reserve')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pt-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{tIntent('seeAlso')}</h2>
          <ul className="flex flex-wrap gap-3">
            {INTENT_KEYS.map((key) => (
              <li key={key}>
                <Link
                  href={`/${INTENT_PAGES[key].path}`}
                  className="inline-flex px-5 py-2.5 rounded-full border border-slate/25 font-semibold text-gray-900 hover:border-pastel-dark transition-colors"
                >
                  {tIntent(`${key}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            {t('faq.title')}
          </h2>
          <dl className="divide-y divide-slate/15 border-y border-slate/15">
            {faqItems.map((item) => (
              <div key={item} className="py-4">
                <dt className="font-bold text-gray-900">{t(`faq.items.${item}.q`)}</dt>
                <dd className="mt-1 text-slate leading-relaxed">{t(`faq.items.${item}.a`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  )
}
