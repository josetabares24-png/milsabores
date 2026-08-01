'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import Logo from './Logo'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/Mil Sabores/Brunch Americano.webp"
          alt={t('image_alt')}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-cream/90 to-white/85 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Main Heading - SEO Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {/* SEO-friendly H1 with visual styling */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate leading-tight tracking-tight">
              <span className="block">{t('title')}</span>
              <span className="block text-xl md:text-2xl lg:text-3xl text-pastel font-bold tracking-wide drop-shadow-sm mt-2">
                {t('tagline')}
              </span>
              <span className="block text-sm md:text-base text-slate/50 font-medium tracking-[0.3em] uppercase mt-4">
                {t('city')}
              </span>
            </h1>
            {/* Logo below title and location */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center mt-6"
            >
              <Logo size="xl" showText={false} colorFilter="pastel" />
            </motion.div>
            {/* Subtitle */}
            <p className="text-slate/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* CTAs - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 justify-center pt-8"
          >
            <Link
              href="/menu"
              className="group relative px-10 py-5 bg-pastel text-white font-bold rounded-full shadow-xl shadow-pastel/40 hover:bg-pastel-dark hover:shadow-2xl hover:shadow-pastel/50 transition-all duration-300 flex items-center justify-center gap-3 text-lg overflow-hidden"
            >
              <span className="relative z-10">{t('cta_menu')}</span>
              <ArrowRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </Link>
            <Link
              href="/reservas"
              className="px-10 py-5 bg-white/90 backdrop-blur-xl text-slate font-bold rounded-full border-2 border-slate/10 hover:border-pastel hover:bg-pastel hover:text-white hover:scale-105 transition-all duration-300 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-pastel/30 flex items-center justify-center text-lg"
            >
              {t('cta_reserve')}
            </Link>
          </motion.div>

          {/* Info Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-6 pt-12 text-slate/70 text-base font-medium"
          >
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-lg px-6 py-3 rounded-full border border-slate/10 shadow-lg hover:shadow-xl hover:scale-105 hover:border-pastel/30 transition-all duration-300">
              <Clock className="text-pastel" size={20} />
              <span>{t('hours_label')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-lg px-6 py-3 rounded-full border border-slate/10 shadow-lg hover:shadow-xl hover:scale-105 hover:border-pastel/30 transition-all duration-300">
              <MapPin className="text-sage" size={20} />
              <span>{t('location_label')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-lg px-6 py-3 rounded-full border border-slate/10 shadow-lg hover:shadow-xl hover:scale-105 hover:border-pastel/30 transition-all duration-300">
              <Phone className="text-steel" size={20} />
              <span>{t('phone_label')}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-slate/40 text-xs uppercase tracking-wider font-semibold">{t('scroll')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-pastel/40 rounded-full flex items-start justify-center p-2 bg-white/50 backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 bg-pastel rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
