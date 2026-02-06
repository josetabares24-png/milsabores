'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { IceCream, Sparkles, Leaf } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'

export default function GeladosPage() {
  const t = useTranslations('gelados')

  const flavors = [
    'acai', 'mango', 'pistacho', 'fresa', 'oreo', 'vainilla', 'chocolate', 'pastel_de_nata'
  ]

  const veganFlavors = ['acai', 'mango', 'fresa']

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-mango/10 px-6 py-3 rounded-full mb-6">
            <IceCream className="text-mango" size={20} />
            <span className="text-mango text-sm font-bold tracking-widest uppercase">
              {t('eyebrow')}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate mb-6">
            {t('title')}
          </h1>
          <p className="text-slate/60 text-xl max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/images/Mil Sabores/Copos Helado.webp"
              alt="Gelato Artesanal Mil Sabores"
              width={1200}
              height={800}
              className="w-full h-[500px] md:h-[600px] object-cover object-bottom"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-full text-slate text-sm font-medium">
                100% Natural
              </div>
              <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-full text-slate text-sm font-medium">
                Hecho Fresco Diariamente
              </div>
              <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-full text-slate text-sm font-medium">
                8 Sabores Únicos
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sizes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate mb-2">
              {t('sizes.title')}
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-mango to-amber-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 1 Bola */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-transparent hover:border-mango/30 transition-all text-center">
              <IceCream className="text-mango mx-auto mb-4" size={36} />
              <h3 className="text-xl font-bold text-slate mb-2">{t('sizes.single.name')}</h3>
              <p className="text-slate/60 text-sm mb-4">{t('sizes.single.description')}</p>
              <div className="text-3xl font-bold text-mango">{t('sizes.single.price')}</div>
            </div>

            {/* 2 Bolas - Popular */}
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border-2 border-mango/30 text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-mango text-white text-xs font-bold rounded-full">
                  <Sparkles size={12} />
                  {t('sizes.popular')}
                </div>
              </div>
              <IceCream className="text-mango mx-auto mb-4 mt-2" size={44} />
              <h3 className="text-xl font-bold text-slate mb-2">{t('sizes.double.name')}</h3>
              <p className="text-slate/60 text-sm mb-4">{t('sizes.double.description')}</p>
              <div className="text-3xl font-bold text-mango">{t('sizes.double.price')}</div>
            </div>

            {/* 3 Bolas */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-transparent hover:border-mango/30 transition-all text-center">
              <IceCream className="text-mango mx-auto mb-4" size={36} />
              <h3 className="text-xl font-bold text-slate mb-2">{t('sizes.triple.name')}</h3>
              <p className="text-slate/60 text-sm mb-4">{t('sizes.triple.description')}</p>
              <div className="text-3xl font-bold text-mango">{t('sizes.triple.price')}</div>
            </div>
          </div>
        </motion.div>

        {/* Flavors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate mb-2">
              {t('flavors.title')}
            </h2>
            <p className="text-slate/60 text-lg">
              {t('flavors.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {flavors.map((flavor, index) => (
              <motion.div
                key={flavor}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all text-center border-2 border-transparent hover:border-mango/20"
              >
                <h3 className="font-bold text-slate text-lg mb-1">
                  {t(`flavors.items.${flavor}.name`)}
                </h3>
                <p className="text-xs text-slate/60 mb-2">
                  {t(`flavors.items.${flavor}.description`)}
                </p>
                {veganFlavors.includes(flavor) && (
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    <Leaf size={10} />
                    Vegan
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <p className="text-slate/50 text-sm italic text-center mt-8">
            {t('flavors.note')}
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-white rounded-3xl p-12 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate mb-4">
            ¿Listo para probar?
          </h2>
          <p className="text-slate/60 text-lg mb-8 max-w-xl mx-auto">
            Visítanos en Rua da Prata 152 y descubre por qué nuestro gelato es el favorito de Lisboa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-mango to-amber-500 text-white font-bold rounded-full hover:shadow-xl hover:shadow-mango/40 transition-all hover:scale-105"
            >
              Ver Menú Completo
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate/10 text-slate font-bold rounded-full hover:bg-slate/20 transition-all"
            >
              Cómo Llegar
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
