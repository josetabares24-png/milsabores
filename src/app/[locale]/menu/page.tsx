'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import {
  ChefHat,
  ChevronDown,
  Clock,
  IceCream,
  Leaf,
  MapPin,
  Phone,
  Wheat,
} from 'lucide-react'
import { Link } from '@/i18n/routing'
import Logo from '@/components/Logo'
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

    return (
      <div className="flex flex-wrap gap-2">
        {tags.includes('vegetarian') && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-sage/20 text-sage-ink text-xs font-bold rounded-lg border border-sage/30" title={t('filters.vegetarian')}>
            <Leaf size={12} /> V
          </span>
        )}
        {tags.includes('vegan') && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg border border-green-200" title={t('filters.vegan')}>
            VG
          </span>
        )}
        {tags.includes('glutenFree') && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg border border-amber-200" title={t('filters.glutenFree')}>
            <Wheat size={12} /> GF
          </span>
        )}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex flex-col items-center gap-4 mb-4">
            <Logo size="xl" colorFilter="pastel" />
            <div className="inline-flex items-center gap-2 bg-pastel/10 px-4 py-2 rounded-full">
              <ChefHat className="text-pastel" size={18} />
              <span className="text-pastel-ink text-xs font-bold tracking-widest uppercase">Menu</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate mb-4">{t('title')}</h1>
          <p className="text-slate text-lg max-w-2xl mx-auto mb-4 italic">{t('subtitle')}</p>
          <p className="text-slate text-base max-w-3xl mx-auto leading-relaxed">{t('intro')}</p>
        </motion.header>

        <section aria-label="Informação prática" className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
          <div className="flex items-center gap-2 text-slate">
            <Clock size={16} className="text-pastel" />
            <span>{t('info_hours')}</span>
          </div>
          <div className="flex items-center gap-2 text-slate">
            <MapPin size={16} className="text-sage" />
            <span>Rua da Prata 152, Baixa</span>
          </div>
          <div className="flex items-center gap-2 text-slate">
            <Phone size={16} className="text-steel" />
            <span>+351 21 347 0214</span>
          </div>
        </section>

        <nav aria-label={t('jump_title')} className="sticky top-20 z-30 mb-8 rounded-2xl border-2 border-slate/10 bg-white/95 p-3 shadow-lg backdrop-blur">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => openAndScrollToCategory(category)}
                className="whitespace-nowrap rounded-full border-2 border-slate/10 px-4 py-2 text-sm font-bold text-slate transition-colors hover:border-pastel hover:bg-pastel/5"
              >
                {t(`categories.${category}`)}
              </button>
            ))}
            <a href="#gelados" className="whitespace-nowrap rounded-full border-2 border-slate/10 px-4 py-2 text-sm font-bold text-slate transition-colors hover:border-pastel hover:bg-pastel/5">
              {tGelados('title')}
            </a>
            <a href="#promocoes" className="whitespace-nowrap rounded-full border-2 border-slate/10 px-4 py-2 text-sm font-bold text-slate transition-colors hover:border-pastel hover:bg-pastel/5">
              {tPromotions('title')}
            </a>
          </div>
        </nav>

        <section aria-labelledby="dietary-filters" className="mb-10">
          <h2 id="dietary-filters" className="text-sm font-bold text-slate uppercase tracking-wider mb-3 text-center">
            {t('dietary_title')}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {(['all', 'vegetarian', 'vegan', 'glutenFree'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === filter ? 'bg-pastel text-gray-800 shadow-md' : 'bg-slate/5 text-slate hover:bg-pastel/10'
                }`}
              >
                {filter === 'all' ? t('filters.all') : t(`filters.${filter}`)}
              </button>
            ))}
          </div>
        </section>

        <div id="menu" className="space-y-4">
          {categories.map((category, catIndex) => {
            const rawCategory = t.raw(category) || {}
            const filteredItems = Object.keys(rawCategory).filter((itemKey) => {
              const item = t.raw(`${category}.${itemKey}`)
              return typeof item === 'object' && filterItems(category, itemKey)
            })

            if (filteredItems.length === 0) return null
            const isExpanded = expandedCategories.has(category)

            return (
              <motion.section
                key={category}
                id={`category-${category}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: catIndex * 0.03 }}
                className="scroll-mt-32 overflow-hidden rounded-2xl border-2 border-slate/10 bg-white shadow-sm transition-shadow hover:shadow-md"
                aria-labelledby={`heading-${category}`}
              >
                <button
                  type="button"
                  onClick={() => toggleCategory(category)}
                  aria-expanded={isExpanded}
                  aria-controls={`panel-${category}`}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-slate/5 focus:outline-none focus-visible:ring-4 focus-visible:ring-pastel/20"
                >
                  <span className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                    <h2 id={`heading-${category}`} className="text-2xl font-bold text-slate md:text-3xl">
                      {t(`categories.${category}`)}
                    </h2>
                    <span className="text-sm font-medium text-slate">
                      {filteredItems.length} {t('items_count')}
                    </span>
                  </span>
                  <ChevronDown
                    size={28}
                    className={`shrink-0 text-pastel transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
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
                      <div className="border-t border-slate/10 px-5 pb-5 pt-4">
                        {category === 'brunch' && (
                          <p className="mb-4 rounded-xl border border-pastel/20 bg-pastel/10 p-4 text-sm font-medium text-slate">
                            {t('brunch.customization_note')}
                          </p>
                        )}
                        {category === 'dulces' && (
                          <p className="mb-4 rounded-xl border border-pastel/20 bg-pastel/10 p-4 text-sm font-medium text-slate">
                            {t('dulces.note')}
                          </p>
                        )}
                        {category === 'burgers' && (
                          <p className="mb-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-700">
                            <Clock size={16} />
                            {t('burgers_note')}
                          </p>
                        )}

                        <div className="space-y-3">
                          {filteredItems.map((itemKey, itemIndex) => {
                            const item = t.raw(`${category}.${itemKey}`)
                            const isFirstSaladas = category === 'dulces' && itemKey.startsWith('saladas_') && !filteredItems.slice(0, itemIndex).some((key) => key.startsWith('saladas_'))
                            const isFirstMini = category === 'dulces' && itemKey.startsWith('mini_') && !filteredItems.slice(0, itemIndex).some((key) => key.startsWith('mini_'))

                            return (
                              <div key={itemKey}>
                                {isFirstSaladas && (
                                  <h3 className="mb-3 mt-4 border-t-2 border-pastel/10 pt-4 text-lg font-bold text-slate">
                                    {t('dulces.saladas_title')}
                                  </h3>
                                )}
                                {isFirstMini && (
                                  <h3 className="mb-3 mt-4 border-t-2 border-pastel/10 pt-4 text-lg font-bold text-slate">
                                    {t('dulces.mini_title')}
                                  </h3>
                                )}
                                <article className="flex items-start justify-between gap-4 rounded-xl bg-slate/5 p-4 transition-colors hover:bg-pastel/5">
                                  <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-start">
                                      <h3 className="text-base font-bold leading-tight text-slate">
                                        {t(`${category}.${itemKey}.name`)}
                                      </h3>
                                      {getDietaryBadges(category, itemKey)}
                                    </div>
                                    {item.desc && (
                                      <p className="text-sm leading-relaxed text-slate">
                                        {t(`${category}.${itemKey}.desc`)}
                                      </p>
                                    )}
                                  </div>
                                  {item.price && (
                                    <span className="shrink-0 whitespace-nowrap text-lg font-bold text-pastel-ink">
                                      €{item.price}
                                    </span>
                                  )}
                                </article>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            )
          })}
        </div>

        <section id="gelados" className="scroll-mt-32 mt-10 rounded-3xl border-2 border-pastel/20 bg-cream p-5 md:p-8" aria-labelledby="gelados-heading">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pastel/10 px-4 py-2 text-sm font-bold uppercase tracking-wider text-pastel-ink">
                <IceCream size={18} />
                {tGelados('eyebrow')}
              </div>
              <h2 id="gelados-heading" className="mb-4 text-3xl font-bold text-slate md:text-4xl">
                {tGelados('title')}
              </h2>
              <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                <Image
                  src="/images/Mil Sabores/Copos Helado.webp"
                  alt="Gelato Artesanal Mil Sabores"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-bottom"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {(['single', 'double', 'triple'] as const).map((size) => (
                  <article key={size} className="rounded-2xl bg-white p-4 text-center shadow-sm">
                    <h3 className="font-bold text-slate">{tGelados(`sizes.${size}.name`)}</h3>
                    <p className="text-xs text-slate">{tGelados(`sizes.${size}.description`)}</p>
                    <p className="mt-2 text-2xl font-bold text-pastel-ink">{tGelados(`sizes.${size}.price`)}</p>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-bold text-slate">{tGelados('flavors.title')}</h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {gelatoFlavors.map((flavor) => (
                  <article key={flavor} className="rounded-2xl border-2 border-white bg-white p-4 text-center shadow-sm">
                    <h4 className="font-bold text-slate">{tGelados(`flavors.items.${flavor}.name`)}</h4>
                    <p className="mt-1 text-xs text-slate">{tGelados(`flavors.items.${flavor}.description`)}</p>
                    {veganGelatoFlavors.includes(flavor) && (
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        <Leaf size={10} />
                        {tGelados('vegan_label')}
                      </span>
                    )}
                  </article>
                ))}
              </div>
              <p className="mt-5 text-center text-sm italic text-slate">{tGelados('flavors.note')}</p>
            </div>
          </div>
        </section>

        <section
          id="promocoes"
          className="scroll-mt-32 mt-10 rounded-3xl border-2 border-pastel/20 bg-cream px-5 py-8 md:px-12 md:py-12"
          aria-labelledby="promocoes-heading"
        >
          <div className="mx-auto max-w-2xl">
            <header className="mb-8 text-center md:mb-10">
              <p className="text-sm font-bold uppercase tracking-wider text-slate">{tPromotions('eyebrow')}</p>
              <h2 id="promocoes-heading" className="mt-1 text-3xl font-bold text-gray-800 md:text-4xl">
                {tPromotions('title')}
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

        <section className="mt-12 rounded-2xl border-2 border-slate/10 bg-slate/5 p-6">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate">{t('legend_title')}</h2>
          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-lg border border-sage/30 bg-sage/20 px-2.5 py-1 text-xs font-bold text-sage-ink"><Leaf size={12} /> V</span>
              <span className="font-medium text-slate">{t('filters.vegetarian')}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-lg border border-green-200 bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">VG</span>
              <span className="font-medium text-slate">{t('filters.vegan')}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700"><Wheat size={12} /> GF</span>
              <span className="font-medium text-slate">{t('filters.glutenFree')}</span>
            </div>
          </div>
        </section>

        <section className="mt-12 text-center">
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/brunch-lisboa" className="rounded-full border-2 border-pastel/30 bg-white px-8 py-3 font-bold text-slate transition-all hover:bg-pastel hover:text-white">
              {t('brunch_landing_cta')}
            </Link>
            <Link href="/reservas" className="rounded-full bg-pastel px-8 py-3 font-bold text-gray-800 transition-all hover:bg-pastel-dark">
              {t('reserve_cta')}
            </Link>
            <a href="tel:+351213470214" className="rounded-full border-2 border-slate/10 bg-white px-8 py-3 font-bold text-slate transition-all hover:border-pastel hover:bg-slate/5">
              {t('call_cta')}
            </a>
          </div>
          <p className="mt-4 text-xs italic text-slate">{t('allergy_note')}</p>
        </section>
      </div>
    </main>
  )
}
