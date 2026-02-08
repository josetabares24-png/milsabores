'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { MapPin, Clock, Phone, Mail } from 'lucide-react'
import { Link } from '@/i18n/routing'

export default function VisitSection() {
  const t = useTranslations('visit')

  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-pastel text-sm font-bold tracking-widest uppercase">
            {t('eyebrow')}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-slate mt-4 mb-6">
            {t('title')}
          </h2>
          <p className="text-slate/60 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pastel/10 to-transparent z-10 pointer-events-none" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.9867347!2d-9.1368835!3d38.7117777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19347f4e7b6ebd%3A0x9c7e5f3e5e5e5e5e!2sR.%20da%20Prata%20152%2C%201100-419%20Lisboa%2C%20Portugal!5e0!3m2!1sen!2spt!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Address */}
            <div className="bg-cream border-2 border-sage/30 rounded-2xl p-6 hover:border-sage hover:shadow-lg transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sage/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-sage/30 transition-colors">
                  <MapPin size={24} className="text-sage" />
                </div>
                <div>
                  <h3 className="text-slate font-bold text-lg mb-2">{t('address_title')}</h3>
                  <p className="text-slate/60 leading-relaxed">
                    {t('address')}
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-cream border-2 border-pastel/30 rounded-2xl p-6 hover:border-pastel hover:shadow-lg transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pastel/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-pastel/30 transition-colors">
                  <Clock size={24} className="text-pastel" />
                </div>
                <div className="flex-1">
                  <h3 className="text-slate font-bold text-lg mb-2">{t('hours_title')}</h3>
                  <div className="space-y-1">
                    <p className="text-slate/60">{t('hours_weekday')}</p>
                    <p className="text-slate/60">{t('hours_weekend')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-cream border-2 border-steel/30 rounded-2xl p-6 hover:border-steel hover:shadow-lg transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-steel/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-steel/30 transition-colors">
                  <Phone size={24} className="text-steel" />
                </div>
                <div>
                  <h3 className="text-slate font-bold text-lg mb-2">{t('phone_title')}</h3>
                  <a href="tel:+351213470214" className="text-slate/60 hover:text-steel transition-colors font-medium">
                    {t('phone')}
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-cream border-2 border-peach/30 rounded-2xl p-6 hover:border-peach hover:shadow-lg transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-peach/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-peach/40 transition-colors">
                  <Mail size={24} className="text-rose-600" />
                </div>
                <div>
                  <h3 className="text-slate font-bold text-lg mb-2">{t('email_title')}</h3>
                  <a href="mailto:milsaboreslx@gmail.com" className="text-slate/60 hover:text-rose-600 transition-colors font-medium">
                    {t('email')}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reservation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center bg-gradient-to-br from-pastel/10 to-peach/10 rounded-3xl p-12 border-2 border-pastel/20"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-slate mb-4">
            {t('reserve_title')}
          </h3>
          <p className="text-slate/60 text-lg mb-8 max-w-2xl mx-auto">
            {t('reserve_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+351213470214"
              className="px-10 py-4 bg-pastel text-white font-bold rounded-full hover:bg-amber-500 transition-all shadow-lg shadow-pastel/30 hover:scale-105"
            >
              {t('cta_call')}
            </a>
            <Link
              href="/reservas"
              className="px-10 py-4 bg-white text-slate font-bold rounded-full border-2 border-pastel/30 hover:bg-pastel hover:text-white hover:border-pastel transition-all shadow-md"
            >
              {t('cta_reserve')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
