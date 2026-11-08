'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { X, ChevronLeft, ChevronRight, Instagram, Image as ImageIcon } from 'lucide-react'
import Logo from '@/components/Logo'
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

// Rejilla sem buracos: em ecrã grande são 6 colunas (cada foto ocupa 2). A primeira foto é grande
// (4×2) quando há fotos suficientes e as últimas alargam-se para fechar a última linha.
// Em tablet (2 colunas) a última foto alarga-se se o número for ímpar. Em móvel, 1 coluna.
function tileClass(index: number, total: number) {
  const big = total >= 7
  const slots = big ? total + 3 : total
  const rest = slots % 3
  const smLast = total % 2 === 1 && index === total - 1
  const sm = smLast ? 'sm:col-span-2 sm:aspect-[2/1]' : 'sm:aspect-square'
  if (big && index === 0) return 'aspect-square sm:aspect-square lg:col-span-4 lg:row-span-2 lg:aspect-auto'
  if (total === 1) return `${sm} aspect-square lg:col-span-6 lg:aspect-[3/1]`
  if (rest === 2 && index >= total - 2) return `aspect-square ${sm} lg:col-span-3 lg:aspect-[3/2]`
  if (rest === 1 && index >= total - 4) return `aspect-square ${sm} lg:col-span-3 lg:aspect-[3/2]`
  return `aspect-square ${sm} lg:col-span-2 lg:aspect-square`
}

const categoriesWithPhotos = (['all', 'food', 'drinks', 'interior', 'events'] as Category[]).filter(
  (c) => c === 'all' || galleryImages.some((img) => img.category === c),
)

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
    <div className="min-h-screen bg-cream pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center gap-4 mb-6">
            <Logo size="xl" colorFilter="pastel" />
            <div className="inline-flex items-center gap-2 bg-pastel/10 px-6 py-3 rounded-full">
              <ImageIcon className="text-pastel" size={20} />
              <span className="text-pastel-ink text-sm font-bold tracking-widest uppercase">
                {t('eyebrow')}
              </span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-slate text-xl max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categoriesWithPhotos.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-4 rounded-full font-bold transition-all ${
                activeCategory === category
                  ? 'bg-pastel text-gray-800 shadow-xl shadow-pastel/40 scale-105'
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
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedImage(image.id)}
              className={`group relative ${tileClass(index, filteredImages.length)} overflow-hidden rounded-3xl cursor-pointer border-4 border-white bg-pastel-light hover:border-pastel/30 shadow-lg hover:shadow-2xl transition-all`}
            >
              <Image
                src={image.url}
                alt={t(`alts.${image.id}`)}
                fill
                sizes={index === 0 && filteredImages.length >= 7 ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                priority={index < 6}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pastel/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl">
                  <ImageIcon size={32} className="text-pastel" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center bg-pastel/10 rounded-3xl px-6 py-8 md:p-10 border-2 border-pastel/30"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-pastel rounded-full flex items-center justify-center shadow-xl shadow-pastel/40">
              <Instagram size={32} className="text-gray-900" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {t('follow_us')}
          </h2>
          <p className="text-slate text-lg mb-6 max-w-2xl mx-auto">
            {t('share_cta')}
          </p>
          <a
            href="https://instagram.com/milsaboreslx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-pastel text-gray-900 font-bold rounded-full hover:bg-pastel-dark hover:scale-105 transition-all shadow-xl shadow-pastel/40"
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
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImageData.url}
                alt={t(`alts.${selectedImageData.id}`)}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

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
