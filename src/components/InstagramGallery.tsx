import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import Reveal from '@/components/Reveal'

// Mosaico de fotos reais (alt das traduções da /galeria). A primeira ocupa 2x2.
const photos = [
  { url: '/images/Mil Sabores/Crepe Limon.webp', alt: 2 },
  { url: '/images/Mil Sabores/Brunch Salmon.webp', alt: 14 },
  { url: '/images/Mil Sabores/Cliente 2.webp', alt: 23 },
  { url: '/images/Mil Sabores/Poke Vegan.webp', alt: 4 },
  { url: '/images/Mil Sabores/milshakes.webp', alt: 20 },
  { url: '/images/Mil Sabores/Bagel Salmon 2.webp', alt: 9 },
  { url: '/images/Mil Sabores/Mini Hamburguer.webp', alt: 10 },
  { url: '/images/Mil Sabores/Panqueca Salgada.webp', alt: 3 },
  { url: '/images/Mil Sabores/Ensalada Italiana.webp', alt: 12 },
]

export default function InstagramGallery() {
  const t = useTranslations('instagram')
  const tGallery = useTranslations('gallery')

  return (
    <section id="gallery" className="bg-sage/20 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">{t('title')}</h2>
          <p className="mt-3 text-lg text-gray-800">
            {t('subtitle')}{' '}
            <a href="https://instagram.com/milsaboreslx" target="_blank" rel="noopener noreferrer" className="font-bold text-sage-ink underline underline-offset-2">
              {t('handle')}
            </a>
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {photos.map((photo, i) => (
            <div
              key={photo.url}
              className={`relative overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}
            >
              <Image
                src={photo.url}
                alt={tGallery(`alts.${photo.alt}`)}
                fill
                sizes={i === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <Link href="/galeria" className="inline-flex rounded-full bg-white px-7 py-3 font-bold text-gray-900 transition-colors hover:bg-pastel">
            {t('view_gallery')}
          </Link>
          <p className="text-sm text-gray-700">{t('cta')}</p>
        </div>
      </div>
    </section>
  )
}
