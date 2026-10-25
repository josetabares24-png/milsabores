'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { X, ChevronLeft, ChevronRight, Instagram } from 'lucide-react'
import SectionHeading from '@/components/brand/SectionHeading'
import { PHOTO_DIMS } from '@/lib/photo-dims'
import Image from 'next/image'

type Category = 'all' | 'food' | 'drinks' | 'interior' | 'events'

interface GalleryImage {
  id: number
  url: string
  category: Category
  alt: string
}

const galleryImages: GalleryImage[] = [
  // Food
  { id: 1, url: '/images/Mil Sabores/Brunch Americano.webp', category: 'food', alt: 'Brunch americano completo' },
  { id: 2, url: '/images/Mil Sabores/Crepe Limon.webp', category: 'food', alt: 'Crepe con limón' },
  { id: 3, url: '/images/Mil Sabores/Panqueca Salgada.webp', category: 'food', alt: 'Panqueca salada con huevo y aguacate' },
  { id: 4, url: '/images/Mil Sabores/Poke Vegan.webp', category: 'food', alt: 'Bowl de Poke vegano' },
  { id: 5, url: '/images/Mil Sabores/Ensalada Portuguesa.webp', category: 'food', alt: 'Ensalada portuguesa' },
  { id: 6, url: '/images/Mil Sabores/Hamburguesa Portobello.webp', category: 'food', alt: 'Hamburguesa de portobello' },
  { id: 7, url: '/images/Mil Sabores/Bagel mozarella.webp', category: 'food', alt: 'Bagel con mozzarella' },
  { id: 8, url: '/images/Mil Sabores/Bagel Mozarella 2.webp', category: 'food', alt: 'Bagel con mozzarella y aguacate' },
  { id: 9, url: '/images/Mil Sabores/Bagel Salmon 2.webp', category: 'food', alt: 'Bagel de salmón' },
  { id: 10, url: '/images/Mil Sabores/Mini Hamburguer.webp', category: 'food', alt: 'Mini hamburguesas' },
  { id: 11, url: '/images/Mil Sabores/Mini Hamburguer 2.webp', category: 'food', alt: 'Mini hamburguesas artesanales' },
  { id: 12, url: '/images/Mil Sabores/Ensalada Italiana.webp', category: 'food', alt: 'Ensalada italiana' },
  { id: 13, url: '/images/Mil Sabores/Mini Panqueca.webp', category: 'food', alt: 'Mini panquecas' },
  { id: 14, url: '/images/Mil Sabores/Brunch Salmon.webp', category: 'food', alt: 'Brunch de salmón' },
  { id: 15, url: '/images/Mil Sabores/Tosta de Agucate.webp', category: 'food', alt: 'Tostada de aguacate' },
  { id: 16, url: '/images/Mil Sabores/Tosta de Salmon.webp', category: 'food', alt: 'Tostada de salmón' },
  { id: 17, url: '/images/Mil Sabores/Bolo do Caco Salmon.webp', category: 'food', alt: 'Bolo do caco con salmón' },
  { id: 18, url: '/images/Mil Sabores/Tapioca huevo.webp', category: 'food', alt: 'Tapioca con huevo' },
  { id: 19, url: '/images/Mil Sabores/Browni.webp', category: 'food', alt: 'Brownie de chocolate' },

  // Drinks
  { id: 20, url: '/images/Mil Sabores/milshakes.webp', category: 'drinks', alt: 'Milkshakes y smoothies' },
  { id: 21, url: '/images/Mil Sabores/Crepe Limon 2.webp', category: 'drinks', alt: 'Crepe con limón y bebida' },

  // Events - Customer experience
  { id: 22, url: '/images/Mil Sabores/Cliente 1.webp', category: 'events', alt: 'Cliente disfrutando brunch' },
  { id: 23, url: '/images/Mil Sabores/Cliente 2.webp', category: 'events', alt: 'Clientes disfrutando del brunch' },
  { id: 24, url: '/images/Mil Sabores/Cliente 5.webp', category: 'events', alt: 'Cliente disfrutando su comida' },
  { id: 25, url: '/images/Mil Sabores/Cliente 3.webp', category: 'events', alt: 'Experiencia gastronómica' },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const t = useTranslations('gallery')

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory)

  const handlePrevious = () => {
    if (selectedImage === null) return
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
    setSelectedImage(filteredImages[prevIndex].id)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
    const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
    setSelectedImage(filteredImages[nextIndex].id)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage === null) return
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
    if (e.key === 'Escape') setSelectedImage(null)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const selectedImageData = filteredImages.find(img => img.id === selectedImage)

  return (
    <div className="min-h-screen bg-cream pt-28 pb-24 px-6 md:pt-36">
      <div className="max-w-6xl mx-auto">
        <SectionHeading as="h1" eyebrow={t('eyebrow')} title={t('title')} intro={t('subtitle')} className="mb-10" />

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {(['all', 'food', 'drinks', 'interior', 'events'] as Category[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                activeCategory === category
                  ? 'bg-gray-800 text-white'
                  : 'border border-gray-800/25 text-gray-800 hover:border-gray-800'
              }`}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </motion.div>

        {/* Gallery: folha de contactos com as proporções reais de cada foto */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="columns-2 gap-3 lg:columns-3"
        >
          {filteredImages.map((image) => {
            const [w, h] = PHOTO_DIMS[image.url] || [1200, 1200]
            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedImage(image.id)}
                className="group mb-3 block w-full break-inside-avoid bg-white p-1.5 ring-1 ring-black/5 focus:outline-none focus-visible:ring-4 focus-visible:ring-pastel/50"
                aria-label={image.alt}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={w}
                  height={h}
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full transition-opacity duration-300 group-hover:opacity-90"
                />
              </button>
            )
          })}
        </motion.div>

        {/* Instagram CTA */}
        <section className="mx-auto mt-16 max-w-2xl border-2 border-dashed border-slate/25 bg-white px-6 py-10 text-center">
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">{t('follow_us')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate">{t('share_cta')}</p>
          <a href="https://instagram.com/milsaboreslx" target="_blank" rel="noopener noreferrer" className="btn-secondary mt-6">
            <Instagram size={20} aria-hidden="true" />
            {t('view_on_instagram')}
          </a>
        </section>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && selectedImageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
              aria-label={t('close')}
              className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              className="absolute left-4 md:left-8 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft size={32} className="text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 md:right-8 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight size={32} className="text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImageData.url}
                alt={selectedImageData.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 rounded-full">
              <span className="text-white font-semibold">
                {filteredImages.findIndex(img => img.id === selectedImage) + 1} / {filteredImages.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
