'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { Link } from '@/i18n/routing'
import SectionHeading from '@/components/brand/SectionHeading'
import Scribble from '@/components/brand/Scribble'
import MenuLine from '@/components/brand/MenuLine'
import PhotoPrint from '@/components/brand/PhotoPrint'
import { MENU_CATEGORIES, type MenuCategory } from '@/lib/menu'

type Category = MenuCategory

const categories: readonly Category[] = MENU_CATEGORIES

const dietaryTags: Record<string, ('vegetarian' | 'vegan' | 'glutenFree')[]> = {
  brunch_mil_sabores: [],
  brunch_americano: [],
  brunch_lisboa: [],
  brunch_vegano: ['vegan', 'vegetarian'],
  brunch_salmon: [],
  brunch_halloumi: ['vegetarian'],
  brunch_para_dos: ['vegetarian'],
  dulces_clasico: ['vegetarian'],
  dulces_nutella: ['vegetarian'],
  dulces_oreo: ['vegetarian'],
  dulces_limon: ['vegetarian'],
  dulces_fresa_queso: ['vegetarian'],
  dulces_chocolate_blanco: ['vegetarian'],
  dulces_banana_mel: ['vegetarian'],
  dulces_saladas_panqueca: [],
  dulces_saladas_crepe: ['vegetarian'],
  dulces_saladas_waffle: [],
  dulces_mini_simple: ['vegetarian'],
  dulces_mini_pistacho: ['vegetarian'],
  bagels_brekkie: [],
  bagels_mozzarella: ['vegetarian'],
  bagels_salmon: [],
  eggs_revueltos: ['vegetarian', 'glutenFree'],
  eggs_benedictinos: ['vegetarian'],
  eggs_florentinos: ['vegetarian'],
  eggs_royale: [],
  eggs_tortilla_francesa: ['vegetarian', 'glutenFree'],
  eggs_tortilla_espanola: ['vegetarian', 'glutenFree'],
  bowls_acai: ['vegan', 'vegetarian', 'glutenFree'],
  bowls_pitaya: ['vegan', 'vegetarian', 'glutenFree'],
  bowls_poke_salmon: ['glutenFree'],
  bowls_poke_pollo: ['glutenFree'],
  bowls_buddha: ['vegan', 'vegetarian', 'glutenFree'],
  toasts_salmon_ahumado: [],
  toasts_aguacate: ['vegan', 'vegetarian'],
  toasts_capresa: ['vegetarian'],
  toasts_mozzarella: ['vegetarian'],
  toasts_queso_champinones: ['vegetarian'],
  toasts_jamon_iberico: [],
  toasts_bacalao: [],
  toasts_portobello: ['vegetarian'],
  toasts_vegan: ['vegan', 'vegetarian'],
  toasts_caco_aguacate: ['vegetarian'],
  toasts_caco_salmon: [],
  toasts_tostada_mediana: [],
  toasts_tostada_grande: [],
  toasts_bocadillo_atun_mediana: [],
  toasts_bocadillo_atun_grande: [],
  burgers_clasica: [],
  burgers_pollo: [],
  burgers_vegetariana: ['vegan', 'vegetarian'],
  burgers_halloumi: ['vegetarian'],
  coffee_espresso: ['vegan', 'vegetarian', 'glutenFree'],
  coffee_americano: ['vegan', 'vegetarian', 'glutenFree'],
  coffee_cappuccino: ['vegetarian', 'glutenFree'],
  coffee_latte: ['vegetarian', 'glutenFree'],
  coffee_flat_white: ['vegetarian', 'glutenFree'],
  coffee_mocha: ['vegetarian', 'glutenFree'],
  coffee_cortado: ['vegetarian', 'glutenFree'],
  coffee_macchiato: ['vegetarian', 'glutenFree'],
  drinks_zumo_naranja: ['vegan', 'vegetarian', 'glutenFree'],
  drinks_zumo_mix: ['vegan', 'vegetarian', 'glutenFree'],
  drinks_smoothie_fresa: ['vegetarian', 'glutenFree'],
  drinks_smoothie_tropical: ['vegetarian', 'glutenFree'],
  drinks_limonada: ['vegan', 'vegetarian', 'glutenFree'],
  drinks_te: ['vegan', 'vegetarian', 'glutenFree'],
  drinks_agua: ['vegan', 'vegetarian', 'glutenFree'],
  drinks_refrescos: ['vegan', 'vegetarian', 'glutenFree'],
  cocktails_mimosa: ['vegan', 'vegetarian', 'glutenFree'],
  cocktails_bellini: ['vegan', 'vegetarian', 'glutenFree'],
  cocktails_aperol: ['vegan', 'vegetarian', 'glutenFree'],
  cocktails_sangria: ['vegan', 'vegetarian', 'glutenFree'],
  cocktails_mojito: ['vegan', 'vegetarian', 'glutenFree'],
  extras_fruit: ['vegan', 'vegetarian', 'glutenFree'],
  extras_granola: ['vegan', 'vegetarian'],
  extras_aguacate: ['vegan', 'vegetarian', 'glutenFree'],
  extras_bacon: [],
  extras_queso: ['vegetarian', 'glutenFree'],
}

const gelatoFlavors = ['acai', 'mango', 'pistacho', 'fresa', 'oreo', 'vainilla', 'chocolate', 'pastel_de_nata']
const veganGelatoFlavors = ['acai', 'mango', 'fresa']

// Ofertas confirmadas pelo José. 'timed' = só das 13:00 às 18:00; 'daily' = todos os dias, sem horário definido.
const promotions = [
  { key: 'beer_promo', schedule: 'timed' },
  { key: 'cocktails', schedule: 'timed' },
  { key: 'brunch_duo', schedule: 'daily' },
  { key: 'burger_combo', schedule: 'daily' },
] as const

export default function MenuPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'vegetarian' | 'vegan' | 'glutenFree'>('all')
  const [expandedCategories, setExpandedCategories] = useState<Set<Category>>(new Set(['brunch']))
  const t = useTranslations('fullMenu')
  const tGelados = useTranslations('gelados')
  const tPromotions = useTranslations('promotions')

  const toggleCategory = (category: Category) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  const openAndScrollToCategory = (category: Category) => {
    setExpandedCategories((prev) => new Set([...prev, category]))
    requestAnimationFrame(() => {
      document.getElementById(`category-${category}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const filterItems = (category: Category, itemKey: string) => {
    if (activeFilter === 'all') return true
    const tags = dietaryTags[`${category}_${itemKey}`] || []
    return tags.includes(activeFilter)
  }

  const getDietaryBadges = (category: string, itemKey: string) => {
    const tags = dietaryTags[`${category}_${itemKey}`] || []
    if (tags.length === 0) return null

    return (
      <span className="ml-2 inline-flex gap-1 align-middle">
        {tags.includes('vegetarian') && <DietTag tone="text-sage-ink" label="V" title={t('filters.vegetarian')} />}
        {tags.includes('vegan') && <DietTag tone="text-green-700" label="VG" title={t('filters.vegan')} />}
        {tags.includes('glutenFree') && <DietTag tone="text-amber-800" label="GF" title={t('filters.glutenFree')} />}
      </span>
    )
  }

  const chip = 'whitespace-nowrap rounded-full border border-gray-800/25 px-4 py-2 text-sm font-bold text-gray-800 transition-colors hover:border-gray-800'

  return (
    <main className="min-h-screen bg-cream pt-28 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading as="h1" eyebrow="Mil Sabores · Menu" title={t('title')} className="mb-6" />
        <p className="mx-auto max-w-2xl text-center text-lg italic text-gray-700">{t('subtitle')}</p>
        <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-slate">{t('intro')}</p>

        <p className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-slate" aria-label="Informação prática">
          <span>{t('info_hours')}</span>
          <span aria-hidden="true">·</span>
          <span>Rua da Prata 152, Baixa</span>
          <span aria-hidden="true">·</span>
          <a href="tel:+351213470214" className="hover:text-pastel-ink">+351 21 347 0214</a>
        </p>

        <nav aria-label={t('jump_title')} className="sticky top-20 z-30 -mx-4 mt-10 border-y border-dashed border-slate/30 bg-cream/95 px-4 py-3 sm:mx-0">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button key={category} type="button" onClick={() => openAndScrollToCategory(category)} className={chip}>
                {t(`categories.${category}`)}
              </button>
            ))}
            <a href="#gelados" className={chip}>
              {tGelados('title')}
            </a>
            <a href="#promocoes" className={chip}>
              {tPromotions('title')}
            </a>
          </div>
        </nav>

        <section aria-labelledby="dietary-filters" className="mt-8 mb-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <h2 id="dietary-filters" className="eyebrow">
            {t('dietary_title')}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {(['all', 'vegetarian', 'vegan', 'glutenFree'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeFilter === filter ? 'bg-gray-800 text-white' : 'border border-gray-800/25 text-gray-800 hover:border-gray-800'
                }`}
              >
                {filter === 'all' ? t('filters.all') : t(`filters.${filter}`)}
              </button>
            ))}
          </div>
        </section>

        <div id="menu">
          {categories.map((category) => {
            const rawCategory = t.raw(category) || {}
            const filteredItems = Object.keys(rawCategory).filter((itemKey) => {
              const item = t.raw(`${category}.${itemKey}`)
              return typeof item === 'object' && filterItems(category, itemKey)
            })

            if (filteredItems.length === 0) return null
            const isExpanded = expandedCategories.has(category)

            return (
              <section
                key={category}
                id={`category-${category}`}
                className="scroll-mt-36 border-t-2 border-gray-800"
                aria-labelledby={`heading-${category}`}
              >
                <button
                  type="button"
                  onClick={() => toggleCategory(category)}
                  aria-expanded={isExpanded}
                  aria-controls={`panel-${category}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-pastel/40"
                >
                  <span className="flex min-w-0 items-baseline gap-3">
                    <h2 id={`heading-${category}`} className="text-2xl font-bold text-gray-800 md:text-3xl">
                      {t(`categories.${category}`)}
                    </h2>
                    <span className="text-sm text-slate">
                      {filteredItems.length} {t('items_count')}
                    </span>
                  </span>
                  <ChevronDown
                    size={26}
                    className={`shrink-0 text-gray-800 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`panel-${category}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8">
                        {category === 'brunch' && <Note>{t('brunch.customization_note')}</Note>}
                        {category === 'dulces' && <Note>{t('dulces.note')}</Note>}
                        {category === 'burgers' && <Note>{t('burgers_note')}</Note>}

                        <ul>
                          {filteredItems.map((itemKey, itemIndex) => {
                            const item = t.raw(`${category}.${itemKey}`)
                            const isFirstSaladas = category === 'dulces' && itemKey.startsWith('saladas_') && !filteredItems.slice(0, itemIndex).some((key) => key.startsWith('saladas_'))
                            const isFirstMini = category === 'dulces' && itemKey.startsWith('mini_') && !filteredItems.slice(0, itemIndex).some((key) => key.startsWith('mini_'))

                            return (
                              <li key={itemKey}>
                                {(isFirstSaladas || isFirstMini) && (
                                  <h3 className="eyebrow mt-6 mb-1">
                                    {isFirstSaladas ? t('dulces.saladas_title') : t('dulces.mini_title')}
                                  </h3>
                                )}
                                <article className="border-b border-dashed border-slate/25 py-4">
                                  <MenuLine
                                    className="text-base md:text-lg"
                                    name={
                                      <>
                                        {t(`${category}.${itemKey}.name`)}
                                        {getDietaryBadges(category, itemKey)}
                                      </>
                                    }
                                    price={item.price ? `€${item.price}` : undefined}
                                  />
                                  {item.desc && (
                                    <p className="mt-1 text-sm leading-relaxed text-slate">{t(`${category}.${itemKey}.desc`)}</p>
                                  )}
                                </article>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            )
          })}
        </div>

        <section id="gelados" className="scroll-mt-32 mt-16 border-t-2 border-gray-800 pt-12" aria-labelledby="gelados-heading">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="eyebrow">{tGelados('eyebrow')}</p>
              <h2 id="gelados-heading" className="mt-2 text-3xl font-bold text-gray-800 md:text-4xl">
                {tGelados('title')}
              </h2>
              <Scribble className="mt-2 h-3 w-28 text-mango" />
              <PhotoPrint
                src="/images/Mil Sabores/Copos Helado.webp"
                alt="Gelato Artesanal Mil Sabores"
                ratio="landscape"
                shapes="c"
                sizes="(max-width: 768px) 90vw, 40vw"
                className="mt-10 rotate-[-1deg]"
                imgClassName="object-cover object-bottom"
              />
            </div>
            <div>
              <ul>
                {(['single', 'double', 'triple'] as const).map((size) => (
                  <li key={size} className="border-b border-dashed border-slate/25 py-4">
                    <MenuLine className="text-lg" name={tGelados(`sizes.${size}.name`)} price={tGelados(`sizes.${size}.price`)} />
                    <p className="mt-1 text-sm text-slate">{tGelados(`sizes.${size}.description`)}</p>
                  </li>
                ))}
              </ul>
              <h3 className="mt-10 text-xl font-bold text-gray-800">{tGelados('flavors.title')}</h3>
              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {gelatoFlavors.map((flavor) => (
                  <li key={flavor}>
                    <h4 className="font-bold text-gray-800">
                      {tGelados(`flavors.items.${flavor}.name`)}
                      {veganGelatoFlavors.includes(flavor) && (
                        <span className="ml-2 align-middle">
                          <DietTag tone="text-green-700" label={tGelados('vegan_label')} title={tGelados('vegan_label')} />
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-slate">{tGelados(`flavors.items.${flavor}.description`)}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm italic text-slate">{tGelados('flavors.note')}</p>
            </div>
          </div>
        </section>

        <section
          id="promocoes"
          className="scroll-mt-32 mt-16 border-2 border-dashed border-slate/25 bg-white px-5 py-8 md:px-12 md:py-12"
          aria-labelledby="promocoes-heading"
        >
          <div className="mx-auto max-w-2xl">
            <header className="mb-8 text-center md:mb-10">
              <p className="eyebrow">{tPromotions('eyebrow')}</p>
              <h2 id="promocoes-heading" className="mt-1 text-3xl font-bold text-gray-800 md:text-4xl">
                {tPromotions('title')}
              </h2>
              <Scribble className="mx-auto mt-2 h-3 w-28 text-mango" />
            </header>

            <ul className="divide-y divide-dashed divide-slate/20">
              {promotions.map((promotion) => {
                const key = promotion.key
                const when =
                  promotion.schedule === 'timed'
                    ? `${tPromotions('time_badge')} · ${tPromotions('every_day')}`
                    : tPromotions('every_day')
                return (
                  <li key={key} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg font-bold leading-snug text-gray-800 md:text-xl">
                        {tPromotions(`offers.${key}.title`)}
                      </h3>
                      <span
                        className="mb-1 hidden min-w-[1.5rem] flex-1 self-end border-b-2 border-dotted border-slate/30 sm:block"
                        aria-hidden="true"
                      />
                      <p className="flex shrink-0 flex-col items-end text-lg font-bold text-gray-800 sm:flex-row sm:items-baseline sm:gap-1 md:text-xl">
                        <span className="whitespace-nowrap">{tPromotions(`offers.${key}.price`)}</span>
                        {key === 'brunch_duo' && (
                          <span className="whitespace-nowrap text-sm font-medium text-slate">{tPromotions('offers.brunch_duo.unit')}</span>
                        )}
                      </p>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {tPromotions(`offers.${key}.description`)}
                    </p>
                    {key === 'burger_combo' && (
                      <p className="mt-1 text-sm text-gray-700">
                        <span className="font-bold text-gray-800">{tPromotions('offers.burger_combo.price_with_drink')}</span>{' '}
                        {tPromotions('offers.burger_combo.with_drink')}
                      </p>
                    )}
                    {key === 'brunch_duo' && (
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">{tPromotions('offers.brunch_duo.details')}</p>
                    )}
                    <p className="mt-2 text-sm italic text-sky-800">{when}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <section className="mt-12 rule-dashed pt-6">
          <h2 className="eyebrow mb-4">{t('legend_title')}</h2>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <li className="flex items-center gap-2"><DietTag tone="text-sage-ink" label="V" /> <span className="text-slate">{t('filters.vegetarian')}</span></li>
            <li className="flex items-center gap-2"><DietTag tone="text-green-700" label="VG" /> <span className="text-slate">{t('filters.vegan')}</span></li>
            <li className="flex items-center gap-2"><DietTag tone="text-amber-800" label="GF" /> <span className="text-slate">{t('filters.glutenFree')}</span></li>
          </ul>
        </section>

        <section className="mt-12 text-center">
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/reservas" className="btn-primary">
              {t('reserve_cta')}
            </Link>
            <a href="tel:+351213470214" className="btn-secondary">
              {t('call_cta')}
            </a>
            <Link href="/brunch-lisboa" className="btn-secondary">
              {t('brunch_landing_cta')}
            </Link>
          </div>
          <p className="mt-4 text-xs italic text-slate">{t('allergy_note')}</p>
        </section>
      </div>
    </main>
  )
}

function DietTag({ tone, label, title }: { tone: string; label: string; title?: string }) {
  return (
    <span title={title} className={`inline-flex items-center rounded-sm border border-current px-1.5 py-px text-[11px] font-bold leading-4 ${tone}`}>
      {label}
    </span>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 border-l-4 border-mango bg-white/60 py-2 pl-4 pr-3 text-sm text-gray-700">{children}</p>
}
