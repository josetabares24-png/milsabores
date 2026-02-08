'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ChefHat, Leaf, Wheat, Clock, MapPin, Phone, ChevronDown } from 'lucide-react'
import { Link } from '@/i18n/routing'
import Logo from '@/components/Logo'

type Category = 'bagels' | 'toasts' | 'brunch' | 'salads' | 'burgers' | 'wraps' | 'bowls' | 'dulces' | 'eggs' | 'coffee' | 'drinks' | 'cocktails' | 'extras'

export default function MenuPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'vegetarian' | 'vegan' | 'glutenFree'>('all')
  const [expandedCategories, setExpandedCategories] = useState<Set<Category>>(new Set(['brunch']))
  const t = useTranslations('fullMenu')

  const toggleCategory = (category: Category) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(category)) {
        newSet.delete(category)
      } else {
        newSet.add(category)
      }
      return newSet
    })
  }

  const categories: Category[] = [
    'bagels',
    'toasts',
    'brunch',
    'salads',
    'burgers',
    'wraps',
    'bowls',
    'dulces',
    'eggs',
    'coffee',
    'drinks',
    'cocktails',
    'extras',
  ]

  // Dietary information for menu items
  const dietaryTags: Record<string, ('vegetarian' | 'vegan' | 'glutenFree')[]> = {
    // Brunch - MIL SABORES, AMERICANO, LISBOA tienen bacon = NO vegetariano
    'brunch_mil_sabores': [],
    'brunch_americano': [],
    'brunch_lisboa': [],
    'brunch_vegano': ['vegan', 'vegetarian'],
    'brunch_salmon': [],
    'brunch_halloumi': ['vegetarian'],
    'brunch_para_dos': ['vegetarian'],
    // Dulces (sweets selector)
    'dulces_clasico': ['vegetarian'],
    'dulces_nutella': ['vegetarian'],
    'dulces_oreo': ['vegetarian'],
    'dulces_limon': ['vegetarian'],
    'dulces_fresa_queso': ['vegetarian'],
    'dulces_chocolate_blanco': ['vegetarian'],
    'dulces_banana_mel': ['vegetarian'],
    'dulces_saladas_panqueca': [],
    'dulces_saladas_crepe': ['vegetarian'],
    'dulces_saladas_waffle': [],
    'dulces_mini_simple': ['vegetarian'],
    'dulces_mini_pistacho': ['vegetarian'],
    // Bagels
    'bagels_brekkie': [],
    'bagels_mozzarella': ['vegetarian'],
    'bagels_salmon': [],
    // Eggs
    'eggs_revueltos': ['vegetarian', 'glutenFree'],
    'eggs_benedictinos': ['vegetarian'],
    'eggs_florentinos': ['vegetarian'],
    'eggs_royale': [],
    'eggs_tortilla_francesa': ['vegetarian', 'glutenFree'],
    'eggs_tortilla_espanola': ['vegetarian', 'glutenFree'],
    // Bowls
    'bowls_acai': ['vegan', 'vegetarian', 'glutenFree'],
    'bowls_pitaya': ['vegan', 'vegetarian', 'glutenFree'],
    'bowls_poke_salmon': ['glutenFree'],
    'bowls_poke_pollo': ['glutenFree'],
    'bowls_buddha': ['vegan', 'vegetarian', 'glutenFree'],
    // Toasts
    'toasts_salmon_ahumado': [],
    'toasts_aguacate': ['vegan', 'vegetarian'],
    'toasts_capresa': ['vegetarian'],
    'toasts_mozzarella': ['vegetarian'],
    'toasts_queso_champinones': ['vegetarian'],
    'toasts_jamon_iberico': [],
    'toasts_bacalao': [],
    'toasts_portobello': ['vegetarian'],
    'toasts_vegan': ['vegan', 'vegetarian'],
    'toasts_caco_aguacate': ['vegetarian'],
    'toasts_caco_salmon': [],
    'toasts_tostada_mediana': [],
    'toasts_tostada_grande': [],
    'toasts_bocadillo_atun_mediana': [],
    'toasts_bocadillo_atun_grande': [],
    // Burgers
    'burgers_clasica': [],
    'burgers_pollo': [],
    'burgers_vegetariana': ['vegan', 'vegetarian'],
    'burgers_halloumi': ['vegetarian'],
    // Coffee
    'coffee_espresso': ['vegan', 'vegetarian', 'glutenFree'],
    'coffee_americano': ['vegan', 'vegetarian', 'glutenFree'],
    'coffee_cappuccino': ['vegetarian', 'glutenFree'],
    'coffee_latte': ['vegetarian', 'glutenFree'],
    'coffee_flat_white': ['vegetarian', 'glutenFree'],
    'coffee_mocha': ['vegetarian', 'glutenFree'],
    'coffee_cortado': ['vegetarian', 'glutenFree'],
    'coffee_macchiato': ['vegetarian', 'glutenFree'],
    // Drinks
    'drinks_zumo_naranja': ['vegan', 'vegetarian', 'glutenFree'],
    'drinks_zumo_mix': ['vegan', 'vegetarian', 'glutenFree'],
    'drinks_smoothie_fresa': ['vegetarian', 'glutenFree'],
    'drinks_smoothie_tropical': ['vegetarian', 'glutenFree'],
    'drinks_limonada': ['vegan', 'vegetarian', 'glutenFree'],
    'drinks_te': ['vegan', 'vegetarian', 'glutenFree'],
    'drinks_agua': ['vegan', 'vegetarian', 'glutenFree'],
    'drinks_refrescos': ['vegan', 'vegetarian', 'glutenFree'],
    // Cocktails
    'cocktails_mimosa': ['vegan', 'vegetarian', 'glutenFree'],
    'cocktails_bellini': ['vegan', 'vegetarian', 'glutenFree'],
    'cocktails_aperol': ['vegan', 'vegetarian', 'glutenFree'],
    'cocktails_sangria': ['vegan', 'vegetarian', 'glutenFree'],
    'cocktails_mojito': ['vegan', 'vegetarian', 'glutenFree'],
    // Extras
    'extras_fruit': ['vegan', 'vegetarian', 'glutenFree'],
    'extras_granola': ['vegan', 'vegetarian'],
    'extras_aguacate': ['vegan', 'vegetarian', 'glutenFree'],
    'extras_bacon': [],
    'extras_queso': ['vegetarian', 'glutenFree'],
  }

  const filterItems = (category: Category, itemKey: string) => {
    if (activeFilter === 'all') return true
    const key = `${category}_${itemKey}`
    const tags = dietaryTags[key] || []
    return tags.includes(activeFilter)
  }

  const getDietaryBadges = (category: string, itemKey: string) => {
    const key = `${category}_${itemKey}`
    const tags = dietaryTags[key] || []

    return (
      <div className="flex gap-2">
        {tags.includes('vegetarian') && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-sage/20 text-sage text-xs font-bold rounded-lg border border-sage/30 shadow-sm" title="Vegetariano">
            <Leaf size={12} /> V
          </span>
        )}
        {tags.includes('vegan') && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg border border-green-200 shadow-sm" title="Vegano">
            🌿 VG
          </span>
        )}
        {tags.includes('glutenFree') && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg border border-amber-200 shadow-sm" title="Sin Gluten">
            <Wheat size={12} /> GF
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex flex-col items-center gap-4 mb-4">
            <Logo size="xl" colorFilter="pastel" />
            <div className="inline-flex items-center gap-2 bg-pastel/10 px-4 py-2 rounded-full">
              <ChefHat className="text-pastel" size={18} />
              <span className="text-pastel text-xs font-bold tracking-widest uppercase">
                Menu
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate mb-4">
            {t('title')}
          </h1>
          <p className="text-slate/70 text-lg max-w-2xl mx-auto mb-4 italic">
            {t('subtitle')}
          </p>
          <p className="text-slate/60 text-base max-w-3xl mx-auto leading-relaxed">
            {t('intro')}
          </p>
        </motion.div>

        {/* Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8 text-sm"
        >
          <div className="flex items-center gap-2 text-slate/70">
            <Clock size={16} className="text-pastel" />
            <span>Seg-Dom · 7:00 - 19:00</span>
          </div>
          <div className="flex items-center gap-2 text-slate/70">
            <MapPin size={16} className="text-sage" />
            <span>Rua da Prata 152, Baixa</span>
          </div>
          <div className="flex items-center gap-2 text-slate/70">
            <Phone size={16} className="text-steel" />
            <span>+351 21 347 0214</span>
          </div>
        </motion.div>

        {/* Dietary Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-sm font-bold text-slate/60 uppercase tracking-wider mb-3 text-center">
            Filtrar por dieta
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-pastel text-white shadow-md'
                  : 'bg-slate/5 text-slate hover:bg-pastel/10'
              }`}
            >
              {t('filters.all')}
            </button>
            <button
              onClick={() => setActiveFilter('vegetarian')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === 'vegetarian'
                  ? 'bg-sage text-white shadow-md'
                  : 'bg-slate/5 text-slate hover:bg-sage/10'
              }`}
            >
              <Leaf size={14} />
              {t('filters.vegetarian')}
            </button>
            <button
              onClick={() => setActiveFilter('vegan')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === 'vegan'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-slate/5 text-slate hover:bg-green-50'
              }`}
            >
              🌿 {t('filters.vegan')}
            </button>
            <button
              onClick={() => setActiveFilter('glutenFree')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === 'glutenFree'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-slate/5 text-slate hover:bg-amber-50'
              }`}
            >
              <Wheat size={14} />
              {t('filters.glutenFree')}
            </button>
          </div>
        </motion.div>

        {/* Quick Jump Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 pb-6 border-b-2 border-pastel/10"
        >
          <h3 className="text-sm font-bold text-slate/60 uppercase tracking-wider mb-3 text-center">
            Ir a categoría
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setExpandedCategories(prev => new Set([...prev, category]))
                  document.getElementById(`category-${category}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all bg-white text-slate border-2 border-slate/10 hover:border-pastel hover:bg-pastel/5"
              >
                {t(`categories.${category}`)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Menu Categories - Accordion Style */}
        <div className="space-y-4">
          {categories.map((category, catIndex) => {
              const filteredItems = Object.keys(t.raw(category) || {}).filter((itemKey) => {
                const item = t.raw(`${category}.${itemKey}`)
                if (typeof item !== 'object') return false
                return filterItems(category, itemKey)
              })

              if (filteredItems.length === 0) return null
              const isExpanded = expandedCategories.has(category)

              return (
              <motion.div
                key={category}
                id={`category-${category}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.05 }}
                className="bg-white rounded-2xl border-2 border-slate/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Category Header - Clickable */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate text-left">
                      {t(`categories.${category}`)}
                    </h2>
                    <span className="text-sm text-slate/50 font-medium">
                      {filteredItems.length} items
                    </span>
                  </div>
                  <ChevronDown
                    size={28}
                    className={`text-pastel transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Category Content - Collapsible */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 border-t border-slate/10">
                        {/* Category notes */}
                        {category === 'brunch' && (
                          <div className="mb-4 p-4 bg-pastel/10 rounded-xl border border-pastel/20">
                            <p className="text-slate/80 text-sm font-medium">
                              {t('brunch.customization_note')}
                            </p>
                          </div>
                        )}
                        {category === 'dulces' && (
                          <div className="mb-4 p-4 bg-pastel/10 rounded-xl border border-pastel/20">
                            <p className="text-slate/80 text-sm font-medium">
                              {t('dulces.note')}
                            </p>
                          </div>
                        )}
                        {category === 'burgers' && (
                          <div className="mb-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                            <p className="text-amber-700 text-sm font-medium flex items-center gap-2">
                              <Clock size={16} />
                              {t('burgers_note')}
                            </p>
                          </div>
                        )}

                        {/* Category Items */}
                        <div className="space-y-3">
                          {filteredItems.map((itemKey, itemIndex) => {
                            const item = t.raw(`${category}.${itemKey}`)

                            // Check if this is the first item of a subsection
                            const isFirstSaladas = category === 'dulces' && itemKey.startsWith('saladas_') &&
                              !filteredItems.slice(0, itemIndex).some(k => k.startsWith('saladas_'))
                            const isFirstMini = category === 'dulces' && itemKey.startsWith('mini_') &&
                              !filteredItems.slice(0, itemIndex).some(k => k.startsWith('mini_'))

                            return (
                              <div key={itemKey}>
                                {isFirstSaladas && (
                                  <div className="mt-4 mb-3 pt-4 border-t-2 border-pastel/10">
                                    <h3 className="text-lg font-bold text-slate">
                                      {t('dulces.saladas_title')}
                                    </h3>
                                  </div>
                                )}
                                {isFirstMini && (
                                  <div className="mt-4 mb-3 pt-4 border-t-2 border-pastel/10">
                                    <h3 className="text-lg font-bold text-slate">
                                      {t('dulces.mini_title')}
                                    </h3>
                                  </div>
                                )}
                                <div
                                  className="group flex items-start justify-between gap-4 p-4 rounded-xl bg-slate/5 hover:bg-pastel/5 transition-all duration-200"
                                >
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-2 mb-1">
                                      <h3 className="font-bold text-slate text-base leading-tight">
                                        {t(`${category}.${itemKey}.name`)}
                                      </h3>
                                      {getDietaryBadges(category, itemKey)}
                                    </div>
                                    {item.desc && (
                                      <p className="text-slate/60 text-sm leading-relaxed">
                                        {t(`${category}.${itemKey}.desc`)}
                                      </p>
                                    )}
                                  </div>
                                  {item.price && (
                                    <div className="flex-shrink-0">
                                      <span className="text-pastel font-bold text-lg whitespace-nowrap">
                                        €{item.price}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              )
            })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 p-8 bg-gradient-to-br from-slate/5 to-slate/10 rounded-2xl border-2 border-slate/10 shadow-lg"
        >
          <h3 className="text-sm font-bold text-slate/60 uppercase tracking-wider mb-5">
            Leyenda Dietética
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-sage/20 text-sage text-xs font-bold rounded-lg border border-sage/30 shadow-sm">
                <Leaf size={12} /> V
              </span>
              <span className="text-slate/70 font-medium">Vegetariano</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg border border-green-200 shadow-sm">
                🌿 VG
              </span>
              <span className="text-slate/70 font-medium">Vegano</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg border border-amber-200 shadow-sm">
                <Wheat size={12} /> GF
              </span>
              <span className="text-slate/70 font-medium">Sin Gluten</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/reservas"
              className="px-8 py-3 bg-pastel text-white font-bold rounded-full hover:bg-pastel-dark hover:shadow-lg hover:scale-105 transition-all"
            >
              Reservar Mesa
            </Link>
            <a
              href="tel:+351213470214"
              className="px-8 py-3 bg-white text-slate font-bold rounded-full border-2 border-slate/10 hover:border-pastel hover:bg-slate/5 transition-all"
            >
              Llamar Ahora
            </a>
          </div>
          <p className="text-slate/50 text-xs mt-4 italic">
            Si tienes alergias o restricciones dietéticas, por favor informa a nuestro personal
          </p>
        </motion.div>
      </div>
    </div>
  )
}
