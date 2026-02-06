'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Heart, Award, Users } from 'lucide-react'

export default function About() {
  const t = useTranslations('about')

  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-mango text-sm font-bold tracking-widest uppercase">
            {t('eyebrow')}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-slate mt-4 mb-6">
            {t('title')}
          </h2>
          <p className="text-slate/60 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Story Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-slate/70 text-lg leading-relaxed">
              {t('para1')}{' '}
              <span className="font-semibold text-slate">{t('para1_bold1')}</span> {t('para1_mid')}{' '}
              <span className="font-semibold text-slate">{t('para1_bold2')}</span>.
            </p>
            <p className="text-slate/70 text-lg leading-relaxed">
              {t('para2')}{' '}
              <span className="font-semibold text-slate">{t('para2_bold')}</span>, {t('para2_mid')}
            </p>
            <p className="text-slate/70 text-lg leading-relaxed">
              {t('para3')}
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/Mil Sabores/IMG_3818.webp')" }}
            />
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Feature 1 */}
          <div className="text-center p-8 bg-gradient-to-br from-mango/5 to-peach/5 rounded-3xl border-2 border-mango/10 hover:border-mango/30 transition-all">
            <div className="w-16 h-16 bg-mango/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-mango" />
            </div>
            <h3 className="text-xl font-bold text-slate mb-3">{t('feature1_title')}</h3>
            <p className="text-slate/60">
              {t('feature1_desc')}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center p-8 bg-gradient-to-br from-sage/5 to-steel/5 rounded-3xl border-2 border-sage/10 hover:border-sage/30 transition-all">
            <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-sage" />
            </div>
            <h3 className="text-xl font-bold text-slate mb-3">{t('feature2_title')}</h3>
            <p className="text-slate/60">
              {t('feature2_desc')}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center p-8 bg-gradient-to-br from-steel/5 to-peach/5 rounded-3xl border-2 border-steel/10 hover:border-steel/30 transition-all">
            <div className="w-16 h-16 bg-steel/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-steel" />
            </div>
            <h3 className="text-xl font-bold text-slate mb-3">{t('feature3_title')}</h3>
            <p className="text-slate/60">
              {t('feature3_desc')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
