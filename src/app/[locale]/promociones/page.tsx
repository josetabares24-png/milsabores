'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Beer, Wine, Users, Camera, Calendar, Gift, Star, ArrowRight, Sparkles, Clock } from 'lucide-react'
import Logo from '@/components/Logo'

export default function PromotionsPage() {
  const t = useTranslations('promotions')

  const mainOffers = [
    {
      key: 'beer_promo',
      icon: Beer,
      color: 'from-amber-400 to-yellow-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      showPrice: true,
    },
    {
      key: 'cocktails',
      icon: Wine,
      color: 'from-rose-400 to-pink-500',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      showPrice: true,
    },
    {
      key: 'brunch_duo',
      icon: Users,
      color: 'from-pastel to-amber-500',
      bgColor: 'bg-pastel/10',
      borderColor: 'border-pastel/30',
      featured: true,
      showPrice: true,
    },
    {
      key: 'instagram',
      icon: Camera,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ]

  const weeklyOffers = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'weekend']

  return (
    <main className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-cream via-white to-peach/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center gap-4 mb-6">
            <Logo size="lg" colorFilter="pastel" />
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pastel/20 to-amber-500/20 rounded-full">
              <Sparkles className="w-5 h-5 text-pastel" />
              <span className="text-pastel font-bold text-sm uppercase tracking-wider">
                {t('eyebrow')}
              </span>
              <Sparkles className="w-5 h-5 text-pastel" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-slate/70 max-w-2xl mx-auto mb-6">
            {t('subtitle')}
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full shadow-xl">
            <Clock className="w-6 h-6" />
            <span className="text-lg font-bold">{t('time_badge')}</span>
            <span className="text-white/80">|</span>
            <span className="text-sm">{t('time_note')}</span>
          </div>
        </motion.div>

        {/* Main Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {mainOffers.map((offer, index) => {
            const Icon = offer.icon

            return (
              <motion.div
                key={offer.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative group rounded-3xl ${offer.bgColor} border-2 ${offer.borderColor} p-6 hover:shadow-2xl transition-all duration-300 ${offer.featured ? 'md:col-span-2 lg:col-span-1 ring-4 ring-pastel/30' : ''}`}
              >
                {/* Badge */}
                <div className={`absolute -top-3 left-6 px-4 py-1.5 bg-gradient-to-r ${offer.color} text-white text-sm font-bold rounded-full shadow-lg`}>
                  {t(`offers.${offer.key}.badge`)}
                </div>

                {/* Featured badge */}
                {offer.featured && (
                  <div className="absolute -top-3 right-6 px-3 py-1.5 bg-slate text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" fill="currentColor" />
                    {t('popular')}
                  </div>
                )}

                <div className="pt-4">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${offer.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate mb-1">
                        {t(`offers.${offer.key}.title`)}
                      </h3>
                      <p className="text-slate/60 text-sm">
                        {t(`offers.${offer.key}.description`)}
                      </p>
                    </div>
                  </div>

                  {/* Discount/Price */}
                  <div className="mb-4">
                    {offer.showPrice ? (
                      <span className="text-4xl font-bold text-pastel">
                        {t(`offers.${offer.key}.price`)}
                      </span>
                    ) : (
                      <span className={`text-4xl font-bold bg-gradient-to-r ${offer.color} bg-clip-text text-transparent`}>
                        {t(`offers.${offer.key}.discount`)}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <p className="text-slate/70 text-sm leading-relaxed mb-4">
                    {t(`offers.${offer.key}.details`)}
                  </p>

                  {/* Terms */}
                  <p className="text-slate/50 text-xs italic">
                    * {t(`offers.${offer.key}.terms`)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Weekly Specials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate/10 rounded-full mb-4">
              <Calendar className="w-5 h-5 text-slate" />
              <span className="text-slate font-bold text-sm uppercase tracking-wider">
                {t('weekly.title')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {weeklyOffers.map((day, index) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="bg-white rounded-2xl p-5 border-2 border-slate/10 hover:border-pastel hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="text-xs font-bold text-pastel uppercase tracking-wider mb-2">
                  {t(`weekly.${day}.day`)}
                </div>
                <h4 className="font-bold text-slate mb-1 group-hover:text-pastel transition-colors">
                  {t(`weekly.${day}.offer`)}
                </h4>
                <p className="text-slate/60 text-xs">
                  {t(`weekly.${day}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pastel via-amber-500 to-orange-500 p-10 md:p-16 text-center"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10">
            <Gift className="w-16 h-16 text-white/90 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('newsletter.title')}
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              {t('newsletter.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link
                href="/reservas"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-pastel font-bold rounded-full hover:bg-slate hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                {t('cta_reserve')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 text-white font-bold rounded-full hover:bg-white/30 transition-all duration-300 border-2 border-white/30"
              >
                {t('cta_menu')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
