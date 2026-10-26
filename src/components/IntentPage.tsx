import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
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

      <section className="px-6 py-16 bg-cream" aria-labelledby="carta-heading">
        <div className="max-w-2xl mx-auto">
          <header className="mb-10 text-center">
            <h2 id="carta-heading" className="text-3xl md:text-4xl font-bold text-gray-800">
              {t(`${page}.menuTitle`)}
            </h2>
            <svg
              className="mx-auto mt-2 h-3 w-28 text-mango"
              viewBox="0 0 120 12"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M2 8.5c14-4.5 26-5 39-2.5s23 3.5 37 0.5S104 2.5 118 5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </header>

          {config.showGelato && (
            <div className="mb-12">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate border-b border-slate/30 pb-2 mb-2">
                {tGelados('sizes.title')}
              </h3>
              <ul className="divide-y divide-dashed divide-slate/20">
                {GELATO_SIZES.map((size) => (
                  <li key={size} className="py-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-lg font-bold text-gray-800">{tGelados(`sizes.${size}.name`)}</p>
                      <span className="mb-1 hidden min-w-[1.5rem] flex-1 self-end border-b-2 border-dotted border-slate/30 sm:block" aria-hidden="true" />
                      <span className="text-lg font-bold text-gray-800 whitespace-nowrap">{tGelados(`sizes.${size}.price`)}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{tGelados(`sizes.${size}.description`)}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm italic text-gray-700">{tMenu('dulces.note')}</p>
            </div>
          )}

          {config.showBurgerPromo && (
            <div className="mb-12 border-y-2 border-double border-slate/30 py-5">
              <p className="text-sm font-bold uppercase tracking-wider text-slate">{tPromo('title')}</p>
              <div className="mt-2 flex items-baseline justify-between gap-3">
                <p className="text-lg md:text-xl font-bold text-gray-800">{tPromo('offers.burger_combo.title')}</p>
                <span className="mb-1 hidden min-w-[1.5rem] flex-1 self-end border-b-2 border-dotted border-slate/30 sm:block" aria-hidden="true" />
                <span className="text-lg md:text-xl font-bold text-gray-800 whitespace-nowrap">{tPromo('offers.burger_combo.price')}</span>
              </div>
              <p className="mt-1 text-sm text-gray-700">
                <span className="font-bold text-gray-800">{tPromo('offers.burger_combo.price_with_drink')}</span>{' '}
                {tPromo('offers.burger_combo.with_drink')}
              </p>
              <p className="mt-2 text-sm italic text-sky-800">{tPromo('every_day')}</p>
            </div>
          )}

          <div className="space-y-12">
            {groups.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate border-b border-slate/30 pb-2 mb-2">
                  {group.title}
                </h3>
                <ul className="divide-y divide-dashed divide-slate/20">
                  {group.items.map((item) => (
                    <li key={item.name} className="py-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-bold text-gray-800">{item.name}</p>
                        {item.price && (
                          <>
                            <span className="mb-1 hidden min-w-[1.5rem] flex-1 self-end border-b-2 border-dotted border-slate/30 sm:block" aria-hidden="true" />
                            <span className="font-bold text-gray-800 whitespace-nowrap">€{item.price}</span>
                          </>
                        )}
                      </div>
                      {item.desc && <p className="mt-1 text-sm text-gray-600 leading-relaxed">{item.desc}</p>}
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
          <div className="border-t-2 border-slate/30 pt-6">
            <h2 className="text-2xl font-bold text-slate mb-4">{tVisit('address_title')}</h2>
            <p className="text-slate mb-4">{RESTAURANT.address.full}</p>
            <h3 className="font-bold text-slate">{tFooter('hours_title')}</h3>
            <p className="text-slate mb-6">{tFooter('hours_weekday')}</p>
            <a
              href={RESTAURANT.social.google.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-pastel-ink hover:underline"
            >
              {tBrunch('ctas.maps')}
            </a>
          </div>
          <div className="border-t-2 border-slate/30 pt-6">
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
