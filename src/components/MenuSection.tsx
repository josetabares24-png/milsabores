import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import SectionHeading from './brand/SectionHeading'
import MenuLine from './brand/MenuLine'

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
  const tilt = ['rotate-[-1deg]', 'rotate-[0.8deg]', 'rotate-[-0.6deg]', 'rotate-[1deg]']

  return (
    <section id="menu" className="bg-cream px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} intro={t('subtitle')} />

        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {menuItems.map((item, index) => (
            <li key={item.id}>
              <div className={`bg-white p-2 ring-1 ring-black/5 ${tilt[index % tilt.length]}`}>
                <div className="relative aspect-square overflow-hidden rounded-[2px]">
                  <Image
                    src={item.image}
                    alt={t(`items.${item.key}.name`)}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <MenuLine className="mt-5 text-lg" name={t(`items.${item.key}.name`)} price={item.price} />
              <p className="mt-1 text-sm leading-relaxed text-slate">{t(`items.${item.key}.desc`)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 text-center">
          <Link href="/menu" className="btn-primary">
            {t('view_full')}
          </Link>
        </div>
      </div>
    </section>
  )
}
