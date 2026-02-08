'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowRight, Star } from 'lucide-react'
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
          alt="Mil Sabores Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-cream/90 to-white/85 backdrop-blur-[2px]" />

        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-pastel/20 to-amber-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-20 -left-20 w-[700px] h-[700px] bg-gradient-to-tr from-peach/20 to-rose-300/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2"
          >
            {/* Google Rating Badge */}
            <a
              href="https://maps.app.goo.gl/5QmYkV2uUZrYCLT9A"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-xl rounded-full border-2 border-slate/10 hover:border-blue-500/40 shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
                <div className="flex items-center gap-1.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="font-bold text-slate text-sm">Google</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-slate text-sm">4.7</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < 5 ? "text-amber-400 fill-amber-400" : "text-slate/30 fill-slate/30"}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </a>

            {/* TripAdvisor Badge */}
            <a
              href="https://www.tripadvisor.es/Restaurant_Review-g189158-d21297136-Reviews-Mil_Sabores-Lisbon_Lisbon_District_Central_Portugal.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-xl rounded-full border-2 border-slate/10 hover:border-green-600/40 shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
                <div className="flex items-center gap-1.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00AA6C">
                    <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H1.114l1.868 1.867c-1.38 1.67-2.21 3.818-2.21 6.175 0 5.355 4.35 9.705 9.705 9.705s9.705-4.35 9.705-9.705-4.35-9.705-9.176-9.705zm0 1.433c4.595 0 8.272 3.677 8.272 8.272s-3.677 8.272-8.272 8.272-8.272-3.677-8.272-8.272c0-1.867.623-3.59 1.67-4.98L4.13 7.746h3.094c1.894-1.245 4.13-1.97 6.782-1.97z"/>
                  </svg>
                  <span className="font-bold text-slate text-sm">TripAdvisor</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-slate text-sm">4.5</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < 5 ? "text-green-600 fill-green-600" : "text-slate/30 fill-slate/30"}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

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
              <span className="block text-xl md:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pastel via-amber-500 to-orange-500 font-bold tracking-wide drop-shadow-sm mt-2">
                {t('location')}
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
            {/* Hidden SEO text */}
            <h2 className="sr-only">
              {t('seo_h2')}
            </h2>
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
              className="group relative px-10 py-5 bg-gradient-to-r from-pastel to-amber-500 text-white font-bold rounded-full shadow-xl shadow-pastel/40 hover:shadow-2xl hover:shadow-pastel/50 transition-all duration-300 flex items-center justify-center gap-3 text-lg overflow-hidden"
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
              <span className="material-symbols-outlined text-pastel text-xl">schedule</span>
              <span>{t('hours_label')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-lg px-6 py-3 rounded-full border border-slate/10 shadow-lg hover:shadow-xl hover:scale-105 hover:border-pastel/30 transition-all duration-300">
              <span className="material-symbols-outlined text-sage text-xl">location_on</span>
              <span>{t('location_label')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-lg px-6 py-3 rounded-full border border-slate/10 shadow-lg hover:shadow-xl hover:scale-105 hover:border-pastel/30 transition-all duration-300">
              <span className="material-symbols-outlined text-steel text-xl">call</span>
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
