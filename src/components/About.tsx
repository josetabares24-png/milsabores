'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

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
          <span className="text-pastel-ink text-sm font-bold tracking-widest uppercase">
            {t('eyebrow')}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-slate mt-4 mb-6">
            {t('title')}
          </h2>
          <p className="text-slate text-lg max-w-2xl mx-auto">
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
            <p className="text-slate text-lg leading-relaxed">
              {t('para1')}{' '}
              <span className="font-semibold text-slate">{t('para1_bold1')}</span> {t('para1_mid')}{' '}
              <span className="font-semibold text-slate">{t('para1_bold2')}</span>.
            </p>
            <p className="text-slate text-lg leading-relaxed">
              {t('para2')}{' '}
              <span className="font-semibold text-slate">{t('para2_bold')}</span>, {t('para2_mid')}
            </p>
            <p className="text-slate text-lg leading-relaxed">
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
            <Image
              src="/images/Mil Sabores/IMG_3818.webp"
              alt={t('image_alt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Features */}
        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-x-10 border-t-2 border-slate/30"
        >
          {([1, 2, 3] as const).map((n) => (
            <li key={n} className="py-6 border-b border-dashed border-slate/30">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t(`feature${n}_title`)}</h3>
              <p className="text-gray-600 leading-relaxed">{t(`feature${n}_desc`)}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
