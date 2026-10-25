import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import SchemaMarkup from '@/components/SchemaMarkup'
import SectionHeading from '@/components/brand/SectionHeading'
import Scribble from '@/components/brand/Scribble'
import PhotoPrint from '@/components/brand/PhotoPrint'

// Fotos reais para cada grupo de produtos (em vez de ícones)
const productPhotos = [
  '/images/Mil Sabores/Panqueca Queso Crema y Compota.webp',
  '/images/Mil Sabores/Bagel Salmon 2.webp',
  '/images/Mil Sabores/milshakes.webp',
  '/images/Mil Sabores/Copos Helado 2.webp',
]

export default async function BrunchLisboaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('brunchLanding')
  const paragraphs = [1, 2, 3, 4, 5, 6] as const
  const productItems = [1, 2, 3, 4] as const
  const faqItems = [1, 2, 3, 4, 5] as const

  return (
    <main className="min-h-screen bg-cream pt-28">
      <SchemaMarkup locale={locale} page="brunch" path="brunch-lisboa" />

      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
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
              <p className="eyebrow">{t('hero.eyebrow')}</p>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-800 sm:text-5xl md:text-6xl break-words">
                {t('hero.title')}
              </h1>
              <Scribble className="mt-3 mb-6 h-4 w-40 text-mango" />
              <p className="text-xl text-slate leading-relaxed mb-8 max-w-2xl">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/menu"
                  className="btn-primary"
                >
                  {t('ctas.menu')}
                </Link>
                <a
                  href="https://maps.app.goo.gl/5QmYkV2uUZrYCLT9A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  {t('ctas.maps')}
                </a>
              </div>
            </div>

            <PhotoPrint
              src="/images/Mil Sabores/Brunch Americano.webp"
              alt={t('hero.imageAlt')}
              ratio="portrait"
              shapes="a"
              priority
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="mx-auto w-full max-w-sm rotate-[1.5deg] lg:max-w-none"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-cream">
        <div className="rule-dashed max-w-3xl mx-auto space-y-6 pt-10 text-lg text-slate leading-relaxed">
          {paragraphs.map((item) => (
            <p key={item}>{t(`story.p${item}`)}</p>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading align="left" eyebrow={t('products.eyebrow')} title={t('products.title')} intro={t('products.subtitle')} />
          <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {productItems.map((item, index) => (
              <li key={item}>
                <div className="relative aspect-[4/5] overflow-hidden bg-white p-2 ring-1 ring-black/5">
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={productPhotos[index]}
                      alt={t(`products.items.${item}.title`)}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-800">{t(`products.items.${item}.title`)}</h3>
                <p className="mt-2 leading-relaxed text-slate">{t(`products.items.${item}.text`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-20 bg-cream">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          <div className="border-2 border-dashed border-slate/25 bg-white p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('visit.title')}</h2>
            <p className="text-slate leading-relaxed mb-6">{t('visit.text')}</p>
            <div className="space-y-3 text-slate">
              <p>
                <strong className="eyebrow">{t('visit.addressLabel')}</strong>
                <br />
                Rua da Prata 152, 1100-619 Lisboa, Portugal
              </p>
              <p>
                <strong className="eyebrow">{t('visit.hoursLabel')}</strong>
                <br />
                {t('visit.hours')}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{t('menu.title')}</h2>
            <Scribble className="mt-2 mb-5 h-3 w-28 text-mango" />
            <p className="text-lg text-slate leading-relaxed mb-8">{t('menu.text')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/menu"
                className="btn-primary"
              >
                {t('ctas.menu')}
              </Link>
              <Link
                href="/reservas"
                className="btn-secondary"
              >
                {t('ctas.reserve')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title={t('faq.title')} />
          <dl className="mt-10 grid gap-x-14 md:grid-cols-2">
            {faqItems.map((item) => (
              <div key={item} className="border-t border-dashed border-slate/30 py-6">
                <dt className="text-lg font-bold text-gray-800">{t(`faq.items.${item}.q`)}</dt>
                <dd className="mt-2 leading-relaxed text-slate">{t(`faq.items.${item}.a`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  )
}
