'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { X, ChevronLeft, ChevronRight, Instagram, Image as ImageIcon } from 'lucide-react'

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

  useState(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown as any)
      return () => window.removeEventListener('keydown', handleKeyDown as any)
    }
  })

  const selectedImageData = filteredImages.find(img => img.id === selectedImage)

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-mango/10 px-6 py-3 rounded-full mb-6">
            <ImageIcon className="text-mango" size={20} />
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

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {(['all', 'food', 'drinks', 'interior', 'events'] as Category[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-4 rounded-full font-bold transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-mango to-amber-500 text-white shadow-xl shadow-mango/40 scale-105'
                  : 'bg-white text-slate hover:bg-white/80 hover:scale-105'
              }`}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedImage(image.id)}
              className="group relative aspect-square overflow-hidden rounded-3xl cursor-pointer border-4 border-white hover:border-mango/30 shadow-lg hover:shadow-2xl transition-all"
              style={{
                gridRow: index % 7 === 0 ? 'span 2' : 'span 1',
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${image.url}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mango/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl">
                  <ImageIcon size={32} className="text-mango" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-12 border-2 border-purple-500/20"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl shadow-purple-500/40">
              <Instagram size={40} className="text-white" />
            </div>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-slate mb-4">
            {t('follow_us')}
          </h3>
          <p className="text-slate/60 text-lg mb-8 max-w-2xl mx-auto">
            Comparte tus momentos y aparece en nuestra galería
          </p>
          <a
            href="https://instagram.com/milsaboreslx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-xl shadow-purple-500/40"
          >
            <Instagram size={24} />
            {t('view_on_instagram')}
          </a>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && selectedImageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
              className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              className="absolute left-4 md:left-8 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft size={32} className="text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 md:right-8 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight size={32} className="text-white" />
            </button>

            {/* Image */}
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={selectedImageData.url}
              alt={selectedImageData.alt}
              className="max-w-full max-h-[85vh] rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full">
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
