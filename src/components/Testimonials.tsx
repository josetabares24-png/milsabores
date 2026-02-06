'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const TOTAL_TESTIMONIALS = 5

// Get initials from full name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Color palette for initials circles
const avatarColors = [
  'bg-gradient-to-br from-blue-400 to-blue-600',
  'bg-gradient-to-br from-green-400 to-green-600',
  'bg-gradient-to-br from-purple-400 to-purple-600',
  'bg-gradient-to-br from-orange-400 to-orange-600',
  'bg-gradient-to-br from-pink-400 to-pink-600',
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const t = useTranslations('testimonials')

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TOTAL_TESTIMONIALS)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TOTAL_TESTIMONIALS) % TOTAL_TESTIMONIALS)
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-mango/5 via-cream to-peach/5">
      <div className="max-w-5xl mx-auto">
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
          {/* Social Proof */}
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-sage/20 shadow-lg mb-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white shadow-sm"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white shadow-sm"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white shadow-sm"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white shadow-sm"></div>
            </div>
            <span className="text-slate font-bold">+1,200 clientes</span>
            <span className="text-slate/60">ya han vivido la experiencia Mil Sabores</span>
          </div>
          <p className="text-slate/60 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-white"
            >
              {/* Stars */}
              <div className="flex gap-1 justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} className="text-mango fill-mango" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate/80 text-xl leading-relaxed text-center mb-8 italic">
                "{t(`items.${currentIndex + 1}.text`)}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className={`w-16 h-16 rounded-full ${avatarColors[currentIndex]} shadow-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">
                    {getInitials(t(`items.${currentIndex + 1}.author`))}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-slate text-lg">
                    {t(`items.${currentIndex + 1}.author`)}
                  </div>
                  <div className="text-slate/60 text-sm">
                    {t(`items.${currentIndex + 1}.role`)}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white hover:bg-mango text-slate hover:text-white rounded-full shadow-xl hover:scale-110 transition-all flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white hover:bg-mango text-slate hover:text-white rounded-full shadow-xl hover:scale-110 transition-all flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: TOTAL_TESTIMONIALS }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? 'bg-mango w-8'
                    : 'bg-slate/20 hover:bg-slate/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
