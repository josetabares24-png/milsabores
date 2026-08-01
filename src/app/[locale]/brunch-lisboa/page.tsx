import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { ChefHat, Coffee, IceCream, MapPin, Utensils } from 'lucide-react'
import { Link } from '@/i18n/routing'
import SchemaMarkup from '@/components/SchemaMarkup'

const productIcons = [ChefHat, Utensils, Coffee, IceCream]

export default async function BrunchLisboaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('brunchLanding')
  const paragraphs = [1, 2, 3, 4, 5, 6] as const
  const productItems = [1, 2, 3, 4] as const
  const faqItems = [1, 2, 3, 4, 5] as const

  return (
    <main className="min-h-screen bg-white pt-28">
      <SchemaMarkup locale={locale} page="brunch" path="brunch-lisboa" />

      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-pastel transition-colors">
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
              <span className="text-pastel text-sm font-bold tracking-widest uppercase">
                {t('hero.eyebrow')}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate leading-tight mt-4 mb-6 break-words">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-slate/70 leading-relaxed mb-8 max-w-2xl">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/menu"
                  className="inline-flex w-full sm:w-auto justify-center px-6 sm:px-8 py-4 bg-pastel text-white font-bold rounded-full hover:bg-pastel-dark transition-colors shadow-lg shadow-pastel/30"
                >
                  {t('ctas.menu')}
                </Link>
                <a
                  href="https://maps.app.goo.gl/5QmYkV2uUZrYCLT9A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto justify-center px-6 sm:px-8 py-4 bg-white text-slate font-bold rounded-full border-2 border-slate/10 hover:border-pastel transition-colors"
                >
                  {t('ctas.maps')}
                </a>
              </div>
            </div>

            <div className="relative min-h-[420px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
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

      <section className="px-6 py-16 bg-cream">
        <div className="max-w-4xl mx-auto space-y-6 text-lg text-slate/75 leading-relaxed">
          {paragraphs.map((item) => (
            <p key={item}>{t(`story.p${item}`)}</p>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-pastel text-sm font-bold tracking-widest uppercase">
              {t('products.eyebrow')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate mt-4 mb-4">
              {t('products.title')}
            </h2>
            <p className="text-lg text-slate/70">{t('products.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {productItems.map((item, index) => {
              const Icon = productIcons[index]
              return (
                <article key={item} className="bg-cream rounded-2xl p-6 border-2 border-pastel/10">
                  <div className="w-12 h-12 bg-pastel/20 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="text-pastel" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate mb-3">{t(`products.items.${item}.title`)}</h3>
                  <p className="text-slate/70 leading-relaxed">{t(`products.items.${item}.text`)}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-cream">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          <div className="bg-white rounded-2xl p-8 border-2 border-slate/10">
            <MapPin className="text-sage mb-4" size={32} />
            <h2 className="text-3xl font-bold text-slate mb-4">{t('visit.title')}</h2>
            <p className="text-slate/70 leading-relaxed mb-6">{t('visit.text')}</p>
            <div className="space-y-3 text-slate/70">
              <p>
                <strong className="text-slate">{t('visit.addressLabel')}</strong>
                <br />
                Rua da Prata 152, 1100-619 Lisboa, Portugal
              </p>
              <p>
                <strong className="text-slate">{t('visit.hoursLabel')}</strong>
                <br />
                {t('visit.hours')}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate mb-5">{t('menu.title')}</h2>
            <p className="text-lg text-slate/70 leading-relaxed mb-8">{t('menu.text')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/menu"
                className="inline-flex w-full sm:w-auto justify-center px-6 sm:px-8 py-4 bg-pastel text-white font-bold rounded-full hover:bg-pastel-dark transition-colors"
              >
                {t('ctas.menu')}
              </Link>
              <Link
                href="/reservas"
                className="inline-flex w-full sm:w-auto justify-center px-6 sm:px-8 py-4 bg-white text-slate font-bold rounded-full border-2 border-slate/10 hover:border-pastel transition-colors"
              >
                {t('ctas.reserve')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate text-center mb-12">
            {t('faq.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {faqItems.map((item) => (
              <article key={item} className="rounded-2xl border-2 border-slate/10 p-6">
                <h3 className="text-xl font-bold text-slate mb-3">{t(`faq.items.${item}.q`)}</h3>
                <p className="text-slate/70 leading-relaxed">{t(`faq.items.${item}.a`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
