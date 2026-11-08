import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import Reveal from '@/components/Reveal'

export default function FeaturedDish() {
  const t = useTranslations('featuredDish')

  return (
    <section className="px-6 py-16 md:py-24 bg-pastel-light">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative h-[340px] md:h-[520px] overflow-hidden rounded-3xl">
          <Image
            src="/images/Mil Sabores/Brunch Americano.webp"
            alt={t('image_alt')}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-wider text-pastel-ink">{t('badge')}</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-gray-900">{t('title')}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">{t('description')}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <p className="text-gray-900">
              <span className="text-sm text-slate">{t('from')} </span>
              <span className="text-4xl font-bold">{t('price')}</span>
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center rounded-full bg-white px-7 py-3.5 font-bold text-gray-900 hover:bg-pastel transition-colors"
            >
              {t('cta')}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
