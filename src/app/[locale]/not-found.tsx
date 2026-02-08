'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'

export default function NotFound() {
  const t = useTranslations()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-white to-peach/20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-[150px] md:text-[200px] font-bold text-pastel/20 leading-none">
            404
          </h1>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <span className="material-symbols-outlined text-8xl text-pastel">
            restaurant
          </span>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {t('common.404.title', { default: 'Oops! Página Não Encontrada' })}
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
            {t('common.404.message', {
              default: 'Parece que esta página saiu para um brunch. Vamos levá-lo de volta ao menu principal!'
            })}
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-pastel text-white rounded-full font-semibold hover:bg-pastel/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="material-symbols-outlined">home</span>
            {t('common.404.home', { default: 'Voltar ao Início' })}
          </Link>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pastel border-2 border-pastel rounded-full font-semibold hover:bg-pastel/5 transition-all duration-300 hover:scale-105"
          >
            <span className="material-symbols-outlined">restaurant_menu</span>
            {t('common.404.menu', { default: 'Ver Menu' })}
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex justify-center gap-8 text-4xl opacity-20"
        >
          <span className="material-symbols-outlined animate-bounce" style={{ animationDelay: '0s' }}>
            cake
          </span>
          <span className="material-symbols-outlined animate-bounce" style={{ animationDelay: '0.2s' }}>
            icecream
          </span>
          <span className="material-symbols-outlined animate-bounce" style={{ animationDelay: '0.4s' }}>
            coffee
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
