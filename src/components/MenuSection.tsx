'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Tilt from 'react-parallax-tilt'

interface MenuItem {
  id: number
  key: string
  price: string
  image: string
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    key: 'tosta_salmon',
    price: '€11.95',
    image: '/images/Mil Sabores/Tosta de Salmon.webp',
  },
  {
    id: 2,
    key: 'pancakes',
    price: '€8.50',
    image: '/images/Mil Sabores/Panqueca Queso Crema y Compota.webp',
  },
  {
    id: 3,
    key: 'poke',
    price: '€11.95',
    image: '/images/Mil Sabores/Poke Vegan.webp',
  },
  {
    id: 4,
    key: 'tostada',
    price: '€8.50',
    image: '/images/Mil Sabores/Tosta de Agucate.webp',
  },
]

export default function MenuSection() {
  const t = useTranslations('menu')

  return (
    <section id="menu" className="py-24 px-6 bg-cream">
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

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {menuItems.map((item, index) => (
            <Tilt
              key={item.id}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              scale={1.02}
              transitionSpeed={2000}
              glareEnable={true}
              glareMaxOpacity={0.2}
              glareColor="#F2B705"
              glarePosition="all"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/80 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-white/50 hover:border-pastel/30"
              >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Price Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 bg-white/95 backdrop-blur-md rounded-full shadow-xl">
                  <span className="text-pastel font-bold text-lg">{item.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate mb-2">
                  {t(`items.${item.key}.name`)}
                </h3>
                <p className="text-slate/60 text-sm leading-relaxed">
                  {t(`items.${item.key}.desc`)}
                </p>
              </div>
              </motion.div>
            </Tilt>
          ))}
        </div>

        {/* View Full Menu Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-10 py-5 bg-pastel text-white font-bold rounded-full hover:bg-amber-500 transition-all shadow-xl shadow-pastel/40 hover:scale-105"
          >
            {t('view_full')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
