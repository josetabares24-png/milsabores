'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Star, ArrowRight, Leaf, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function FeaturedDish() {
  const t = useTranslations('featuredDish')

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate via-slate/95 to-slate/90">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pastel/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-pastel" />
              <span className="text-pastel font-bold text-sm uppercase tracking-wider">
                {t('badge')}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('title')}
            </h2>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              {t('description')}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Leaf className="w-4 h-4 text-green-400" />
                <span className="text-white/90 text-sm font-medium">{t('feature1')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Star className="w-4 h-4 text-pastel" fill="currentColor" />
                <span className="text-white/90 text-sm font-medium">{t('feature2')}</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <span className="text-white/60 text-sm">{t('from')}</span>
                <div className="text-4xl font-bold text-pastel">{t('price')}</div>
              </div>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-8 py-4 bg-pastel text-white font-bold rounded-full hover:bg-pastel-dark hover:shadow-xl hover:shadow-pastel/40 transition-all duration-300 hover:scale-105 group"
              >
                {t('cta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-pastel/30 rounded-[3rem] blur-3xl transform -rotate-6" />

            {/* Main image container */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/20">
              <Image
                src="/images/Mil Sabores/Brunch Americano.webp"
                alt={t('image_alt')}
                width={600}
                height={500}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
