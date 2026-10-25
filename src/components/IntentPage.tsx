import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Link } from '@/i18n/routing'
import SchemaMarkup from '@/components/SchemaMarkup'
import { RESTAURANT } from '@/config/restaurant'
import { GELATO_SIZES } from '@/lib/menu'
import { INTENT_KEYS, INTENT_PAGES, type IntentKey } from '@/lib/intent-pages'

type RawItem = { name?: string; desc?: string; price?: string }

export default async function IntentPage({ locale, page }: { locale: string; page: IntentKey }) {
  const config = INTENT_PAGES[page]
  const t = await getTranslations({ locale, namespace: 'intentPages' })
  const tMenu = await getTranslations({ locale, namespace: 'fullMenu' })
  const tBrunch = await getTranslations({ locale, namespace: 'brunchLanding' })
  const tHero = await getTranslations({ locale, namespace: 'hero' })
  const tFooter = await getTranslations({ locale, namespace: 'footer' })
  const tVisit = await getTranslations({ locale, namespace: 'visit' })
  const tPromo = await getTranslations({ locale, namespace: 'promotions' })
  const tGelados = await getTranslations({ locale, namespace: 'gelados' })

  const groups = config.groups.map(({ category, keys }) => {
    const raw = (tMenu.raw(category) ?? {}) as Record<string, RawItem | string>
    const entries = (keys ?? Object.keys(raw))
      .map((key) => raw[key])
      .filter((item): item is RawItem => typeof item === 'object' && item !== null && Boolean(item.name))
    return { category, title: tMenu(`categories.${category}`), items: entries }
  })

  const flavorKeys = Object.keys((tGelados.raw('flavors.items') ?? {}) as Record<string, unknown>)
  const others = INTENT_KEYS.filter((key) => key !== page)

  return (
    <main className="min-h-screen bg-white pt-28">
      <SchemaMarkup locale={locale} page={page} path={config.path} />

      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-pastel-ink transition-colors">
                  {tBrunch('breadcrumb.home')}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-slate">
                {t(`${page}.breadcrumb`)}
              </li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 items-center">
            <div>
              <span className="text-pastel-ink text-sm font-bold tracking-widest uppercase">{t(`${page}.eyebrow`)}</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate leading-tight mt-4 mb-6 break-words">
                {t(`${page}.title`)}
              </h1>
              {page === 'gelato' && <p className="text-xl text-slate leading-relaxed mb-4 max-w-2xl">{tGelados('subtitle')}</p>}
              <p className="text-xl text-slate leading-relaxed mb-8 max-w-2xl">{t(`${page}.intro`)}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/menu"
                  className="inline-flex w-full sm:w-auto justify-center px-6 sm:px-8 py-4 bg-pastel text-gray-800 font-bold rounded-full hover:bg-pastel-dark transition-colors shadow-lg shadow-pastel/30"
                >
                  {tHero('cta_menu')}
                </Link>
                <Link
                  href="/reservas"
                  className="inline-flex w-full sm:w-auto justify-center px-6 sm:px-8 py-4 bg-white text-slate font-bold rounded-full border-2 border-slate/10 hover:border-pastel transition-colors"
                >
                  {tBrunch('ctas.reserve')}
                </Link>
              </div>
            </div>

            <div className="relative min-h-[360px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
              <Image
                src={config.image}
                alt={t(`${page}.imageAlt`)}
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
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate mb-10">{t(`${page}.menuTitle`)}</h2>

          {config.showGelato && (
            <div className="mb-10 grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-2xl p-6 border-2 border-slate/10">
                <h3 className="text-xl font-bold text-slate mb-4">{tGelados('sizes.title')}</h3>
                <ul className="divide-y divide-slate/10">
                  {GELATO_SIZES.map((size) => (
                    <li key={size} className="flex items-baseline justify-between gap-4 py-3">
                      <span className="text-slate">
                        <span className="font-semibold">{tGelados(`sizes.${size}.name`)}</span> · {tGelados(`sizes.${size}.description`)}
                      </span>
                      <span className="font-bold text-pastel-ink whitespace-nowrap">{tGelados(`sizes.${size}.price`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 border-2 border-slate/10">
                <h3 className="text-xl font-bold text-slate mb-4">{tGelados('flavors.title')}</h3>
                <ul className="flex flex-wrap gap-2">
                  {flavorKeys.map((key) => (
                    <li key={key} className="rounded-full bg-cream px-3 py-1.5 text-sm font-medium text-slate">
                      {tGelados(`flavors.items.${key}.name`)}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm italic text-slate">{tGelados('flavors.note')}</p>
                <p className="mt-2 text-sm text-slate">{tMenu('dulces.note')}</p>
              </div>
            </div>
          )}

          {config.showBurgerPromo && (
            <div className="mb-10 bg-white rounded-2xl p-6 border-2 border-pastel/30">
              <p className="text-pastel-ink text-sm font-bold uppercase tracking-wider">{tPromo('title')}</p>
              <p className="mt-2 flex flex-wrap items-baseline justify-between gap-3 text-xl font-bold text-slate">
                <span>{tPromo('offers.burger_combo.title')}</span>
                <span className="whitespace-nowrap">{tPromo('offers.burger_combo.price')}</span>
              </p>
              <p className="mt-1 text-slate">
                <span className="font-bold text-gray-800">{tPromo('offers.burger_combo.price_with_drink')}</span>{' '}
                {tPromo('offers.burger_combo.with_drink')} · {tPromo('every_day')}
              </p>
            </div>
          )}

          <div className="space-y-10">
            {groups.map((group) => (
              <div key={group.category}>
                <h3 className="text-xl font-bold text-slate mb-4">{group.title}</h3>
                <ul className="bg-white rounded-2xl border-2 border-slate/10 divide-y divide-slate/10">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-start justify-between gap-4 px-5 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        {item.desc && <p className="mt-1 text-sm text-slate leading-relaxed">{item.desc}</p>}
                      </div>
                      {item.price && <span className="font-bold text-pastel-ink whitespace-nowrap">€{item.price}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white">
        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
          <div className="bg-cream rounded-2xl p-8 border-2 border-slate/10">
            <MapPin className="text-sage mb-4" size={28} aria-hidden="true" />
            <h2 className="text-2xl font-bold text-slate mb-4">{tVisit('address_title')}</h2>
            <p className="text-slate mb-4">{RESTAURANT.address.full}</p>
            <h3 className="font-bold text-slate">{tFooter('hours_title')}</h3>
            <p className="text-slate">{tFooter('hours_weekday')}</p>
            <p className="text-slate mb-6">{tFooter('hours_weekend')}</p>
            <a
              href={RESTAURANT.social.google.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-pastel-ink hover:underline"
            >
              {tBrunch('ctas.maps')}
            </a>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate mb-4">{t('seeAlso')}</h2>
            <ul className="space-y-3">
              <li>
                <Link href="/brunch-lisboa" className="font-semibold text-pastel-ink hover:underline">
                  {tBrunch('hero.title')}
                </Link>
              </li>
              {others.map((key) => (
                <li key={key}>
                  <Link href={`/${INTENT_PAGES[key].path}`} className="font-semibold text-pastel-ink hover:underline">
                    {t(`${key}.title`)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/menu" className="font-semibold text-pastel-ink hover:underline">
                  {tHero('cta_menu')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
