'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Instagram } from 'lucide-react'
import Image from 'next/image'

const instagramImages = [
  {
    id: 1,
    url: '/images/Mil Sabores/Mini Hamburguer.webp',
    alt: 'Mini hamburguesas artesanales',
  },
  {
    id: 2,
    url: '/images/Mil Sabores/Crepe Limon.webp',
    alt: 'Crepe con limón',
  },
  {
    id: 3,
    url: '/images/Mil Sabores/Poke Vegan.webp',
    alt: 'Poke bowl vegano',
  },
  {
    id: 4,
    url: '/images/Mil Sabores/Brunch Americano.webp',
    alt: 'Brunch americano completo',
  },
  {
    id: 5,
    url: '/images/Mil Sabores/Tosta de Agucate.webp',
    alt: 'Tostada de aguacate',
  },
  {
    id: 6,
    url: '/images/Mil Sabores/Ensalada Italiana.webp',
    alt: 'Ensalada italiana fresca',
  },
]

export default function InstagramGallery() {
  const t = useTranslations('instagram')

  return (
    <section id="gallery" className="py-24 px-6 bg-cream">
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
          <p className="text-slate/60 text-lg max-w-2xl mx-auto mb-8">
            {t('subtitle')} {t('handle')}
          </p>

          {/* Instagram Button */}
          <a
            href="https://instagram.com/milsaboreslx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-xl shadow-purple-500/40"
          >
            <Instagram size={22} />
            <span>{t('handle')}</span>
          </a>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {instagramImages.map((image, index) => (
            <motion.a
              key={image.id}
              href="https://instagram.com/milsaboreslx"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-3xl cursor-pointer border-4 border-white shadow-lg hover:shadow-2xl"
              aria-label={`Ver ${image.alt} en Instagram`}
            >
              {/* Image */}
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-pastel/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Instagram Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl">
                  <Instagram size={32} className="text-pastel" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate/60 text-sm font-medium">
            {t('cta')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
