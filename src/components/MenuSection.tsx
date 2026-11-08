import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import Reveal from '@/components/Reveal'

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
    <section id="menu" className="bg-cream py-16 md:py-24">
      <Reveal className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">{t('title')}</h2>
        <p className="mt-3 text-lg text-slate">{t('subtitle')}</p>
      </Reveal>

      {/* Móvel: carrossel horizontal com snap; desktop: grelha de 4 */}
      <ul className="mx-auto mt-10 flex max-w-6xl snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0">
        {menuItems.map((item) => (
          <li key={item.id} className="group w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
            <Link href="/menu" className="block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white">
                <Image
                  src={item.image}
                  alt={t(`items.${item.key}.name`)}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-gray-900">{item.price}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-pastel-ink">{t(`items.${item.key}.name`)}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate">{t(`items.${item.key}.desc`)}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <Link href="/menu" className="inline-flex rounded-full bg-pastel px-8 py-3.5 font-bold text-gray-900 transition-colors hover:bg-pastel-dark">
          {t('view_full')}
        </Link>
      </div>
    </section>
  )
}
