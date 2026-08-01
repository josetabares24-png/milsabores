'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import {
  Beer,
  Camera,
  ChefHat,
  Clock,
  Gift,
  IceCream,
  Leaf,
  MapPin,
  Phone,
  Users,
  Wheat,
  Wine,
} from 'lucide-react'
import { Link } from '@/i18n/routing'
import Logo from '@/components/Logo'

type Category =
  | 'brunch'
  | 'dulces'
  | 'bowls'
  | 'coffee'
  | 'drinks'
  | 'bagels'
  | 'toasts'
  | 'eggs'
  | 'salads'
  | 'burgers'
  | 'wraps'
  | 'cocktails'
  | 'extras'

const categories: Category[] = [
  'brunch',
  'dulces',
  'bowls',
  'coffee',
  'drinks',
  'bagels',
  'toasts',
  'eggs',
  'salads',
  'burgers',
  'wraps',
  'cocktails',
  'extras',
]

const anchorLinks = [
  { href: '#category-brunch', label: 'brunch' },
  { href: '#category-dulces', label: 'dulces' },
  { href: '#category-bowls', label: 'bowls' },
  { href: '#category-drinks', label: 'drinks' },
] as const

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

const promotions = [
  { key: 'beer_promo', icon: Beer, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', showPrice: true },
  { key: 'cocktails', icon: Wine, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', showPrice: true },
  { key: 'brunch_duo', icon: Users, color: 'text-pastel', bg: 'bg-pastel/10', border: 'border-pastel/30', showPrice: true },
  { key: 'instagram', icon: Camera, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', showPrice: false },
]

export default function MenuPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'vegetarian' | 'vegan' | 'glutenFree'>('all')
  const t = useTranslations('fullMenu')
  const tGelados = useTranslations('gelados')
  const tPromotions = useTranslations('promotions')

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
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-sage/20 text-sage text-xs font-bold rounded-lg border border-sage/30" title={t('filters.vegetarian')}>
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
              <span className="text-pastel text-xs font-bold tracking-widest uppercase">Menu</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate mb-4">{t('title')}</h1>
          <p className="text-slate/70 text-lg max-w-2xl mx-auto mb-4 italic">{t('subtitle')}</p>
          <p className="text-slate/60 text-base max-w-3xl mx-auto leading-relaxed">{t('intro')}</p>
        </motion.header>

        <section aria-label="Informação prática" className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
          <div className="flex items-center gap-2 text-slate/70">
            <Clock size={16} className="text-pastel" />
            <span>{t('info_hours')}</span>
          </div>
          <div className="flex items-center gap-2 text-slate/70">
            <MapPin size={16} className="text-sage" />
            <span>Rua da Prata 152, Baixa</span>
          </div>
          <div className="flex items-center gap-2 text-slate/70">
            <Phone size={16} className="text-steel" />
            <span>+351 21 347 0214</span>
          </div>
        </section>

        <nav aria-label={t('jump_title')} className="sticky top-20 z-30 mb-8 rounded-2xl border-2 border-slate/10 bg-white/95 p-3 shadow-lg backdrop-blur">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {anchorLinks.map((item) => (
              <a key={item.href} href={item.href} className="whitespace-nowrap rounded-full border-2 border-slate/10 px-4 py-2 text-sm font-bold text-slate transition-colors hover:border-pastel hover:bg-pastel/5">
                {t(`categories.${item.label}`)}
              </a>
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
          <h2 id="dietary-filters" className="text-sm font-bold text-slate/60 uppercase tracking-wider mb-3 text-center">
            {t('dietary_title')}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {(['all', 'vegetarian', 'vegan', 'glutenFree'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === filter ? 'bg-pastel text-white shadow-md' : 'bg-slate/5 text-slate hover:bg-pastel/10'
                }`}
              >
                {filter === 'all' ? t('filters.all') : t(`filters.${filter}`)}
              </button>
            ))}
          </div>
        </section>

        <div id="menu" className="space-y-8">
          {categories.map((category, catIndex) => {
            const rawCategory = t.raw(category) || {}
            const filteredItems = Object.keys(rawCategory).filter((itemKey) => {
              const item = t.raw(`${category}.${itemKey}`)
              return typeof item === 'object' && filterItems(category, itemKey)
            })

            if (filteredItems.length === 0) return null

            return (
              <motion.section
                key={category}
                id={`category-${category}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: catIndex * 0.03 }}
                className="scroll-mt-32 rounded-2xl border-2 border-slate/10 bg-white p-5 shadow-sm"
                aria-labelledby={`heading-${category}`}
              >
                <div className="mb-5 flex flex-col gap-2 border-b border-slate/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <h2 id={`heading-${category}`} className="text-2xl md:text-3xl font-bold text-slate">
                    {t(`categories.${category}`)}
                  </h2>
                  <span className="text-sm font-medium text-slate/50">
                    {filteredItems.length} {t('items_count')}
                  </span>
                </div>

                {category === 'brunch' && (
                  <p className="mb-4 rounded-xl border border-pastel/20 bg-pastel/10 p-4 text-sm font-medium text-slate/80">
                    {t('brunch.customization_note')}
                  </p>
                )}
                {category === 'dulces' && (
                  <p className="mb-4 rounded-xl border border-pastel/20 bg-pastel/10 p-4 text-sm font-medium text-slate/80">
                    {t('dulces.note')}
                  </p>
                )}
                {category === 'burgers' && (
                  <p className="mb-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-700">
                    <Clock size={16} />
                    {t('burgers_note')}
                  </p>
                )}

                <div className="grid gap-3 md:grid-cols-2">
                  {filteredItems.map((itemKey, itemIndex) => {
                    const item = t.raw(`${category}.${itemKey}`)
                    const isFirstSaladas = category === 'dulces' && itemKey.startsWith('saladas_') && !filteredItems.slice(0, itemIndex).some((key) => key.startsWith('saladas_'))
                    const isFirstMini = category === 'dulces' && itemKey.startsWith('mini_') && !filteredItems.slice(0, itemIndex).some((key) => key.startsWith('mini_'))

                    return (
                      <div key={itemKey} className={isFirstSaladas || isFirstMini ? 'md:col-span-2' : undefined}>
                        {isFirstSaladas && (
                          <h3 className="mb-3 mt-2 border-t-2 border-pastel/10 pt-4 text-lg font-bold text-slate">
                            {t('dulces.saladas_title')}
                          </h3>
                        )}
                        {isFirstMini && (
                          <h3 className="mb-3 mt-2 border-t-2 border-pastel/10 pt-4 text-lg font-bold text-slate">
                            {t('dulces.mini_title')}
                          </h3>
                        )}
                        <article className="flex h-full items-start justify-between gap-4 rounded-xl bg-slate/5 p-4 transition-colors hover:bg-pastel/5">
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-start">
                              <h3 className="text-base font-bold leading-tight text-slate">
                                {t(`${category}.${itemKey}.name`)}
                              </h3>
                              {getDietaryBadges(category, itemKey)}
                            </div>
                            {item.desc && (
                              <p className="text-sm leading-relaxed text-slate/60">
                                {t(`${category}.${itemKey}.desc`)}
                              </p>
                            )}
                          </div>
                          {item.price && (
                            <span className="shrink-0 whitespace-nowrap text-lg font-bold text-pastel">
                              €{item.price}
                            </span>
                          )}
                        </article>
                      </div>
                    )
                  })}
                </div>
              </motion.section>
            )
          })}
        </div>

        <section id="gelados" className="scroll-mt-32 mt-10 rounded-3xl border-2 border-pastel/20 bg-cream p-5 md:p-8" aria-labelledby="gelados-heading">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pastel/10 px-4 py-2 text-sm font-bold uppercase tracking-wider text-pastel">
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
                    <p className="text-xs text-slate/60">{tGelados(`sizes.${size}.description`)}</p>
                    <p className="mt-2 text-2xl font-bold text-pastel">{tGelados(`sizes.${size}.price`)}</p>
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
                    <p className="mt-1 text-xs text-slate/60">{tGelados(`flavors.items.${flavor}.description`)}</p>
                    {veganGelatoFlavors.includes(flavor) && (
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        <Leaf size={10} />
                        {tGelados('vegan_label')}
                      </span>
                    )}
                  </article>
                ))}
              </div>
              <p className="mt-5 text-center text-sm italic text-slate/50">{tGelados('flavors.note')}</p>
            </div>
          </div>
        </section>

        <section id="promocoes" className="scroll-mt-32 mt-10 rounded-3xl border-2 border-slate/10 bg-white p-5 md:p-8" aria-labelledby="promocoes-heading">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-pastel/10 px-4 py-2 text-sm font-bold uppercase tracking-wider text-pastel">
                <Gift size={18} />
                {tPromotions('eyebrow')}
              </div>
              <h2 id="promocoes-heading" className="text-3xl font-bold text-slate md:text-4xl">
                {tPromotions('title')}
              </h2>
            </div>
            <p className="text-sm font-medium text-slate/60">{tPromotions('time_note')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {promotions.map((promotion) => {
              const Icon = promotion.icon
              return (
                <article key={promotion.key} className={`rounded-2xl border-2 ${promotion.border} ${promotion.bg} p-5`}>
                  <Icon className={promotion.color} size={28} />
                  <h3 className="mt-4 text-lg font-bold text-slate">{tPromotions(`offers.${promotion.key}.title`)}</h3>
                  <p className="mt-1 text-sm text-slate/60">{tPromotions(`offers.${promotion.key}.description`)}</p>
                  <p className="mt-3 text-2xl font-bold text-pastel">
                    {promotion.showPrice ? tPromotions(`offers.${promotion.key}.price`) : tPromotions(`offers.${promotion.key}.discount`)}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-slate/60">{tPromotions(`offers.${promotion.key}.terms`)}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border-2 border-slate/10 bg-slate/5 p-6">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate/60">{t('legend_title')}</h2>
          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-lg border border-sage/30 bg-sage/20 px-2.5 py-1 text-xs font-bold text-sage"><Leaf size={12} /> V</span>
              <span className="font-medium text-slate/70">{t('filters.vegetarian')}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-lg border border-green-200 bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">VG</span>
              <span className="font-medium text-slate/70">{t('filters.vegan')}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700"><Wheat size={12} /> GF</span>
              <span className="font-medium text-slate/70">{t('filters.glutenFree')}</span>
            </div>
          </div>
        </section>

        <section className="mt-12 text-center">
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/brunch-lisboa" className="rounded-full border-2 border-pastel/30 bg-white px-8 py-3 font-bold text-slate transition-all hover:bg-pastel hover:text-white">
              {t('brunch_landing_cta')}
            </Link>
            <Link href="/reservas" className="rounded-full bg-pastel px-8 py-3 font-bold text-white transition-all hover:bg-pastel-dark">
              {t('reserve_cta')}
            </Link>
            <a href="tel:+351213470214" className="rounded-full border-2 border-slate/10 bg-white px-8 py-3 font-bold text-slate transition-all hover:border-pastel hover:bg-slate/5">
              {t('call_cta')}
            </a>
          </div>
          <p className="mt-4 text-xs italic text-slate/50">{t('allergy_note')}</p>
        </section>
      </div>
    </main>
  )
}
