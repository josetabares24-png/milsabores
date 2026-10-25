import { useTranslations } from 'next-intl'
import { Instagram } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import SectionHeading from './brand/SectionHeading'

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
    <section id="gallery" className="bg-cream px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} intro={`${t('subtitle')} ${t('handle')}`} />

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/galeria" className="btn-primary">
            {t('view_gallery')}
          </Link>
          <a href="https://instagram.com/milsaboreslx" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Instagram size={20} aria-hidden="true" />
            <span>{t('handle')}</span>
          </a>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {instagramImages.map((image) => (
            <li key={image.id}>
              <a
                href="https://instagram.com/milsaboreslx"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden bg-white"
                aria-label={`Ver ${image.alt} en Instagram`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                  loading="lazy"
                />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-slate">{t('cta')}</p>
      </div>
    </section>
  )
}
