import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ogLocales, type Locale } from '@/i18n/config'
import { buildAlternates, localizedUrl } from '@/lib/seo'

const defaultImage = '/images/Mil Sabores/Brunch Americano.webp'
const gelatoImage = '/images/Mil Sabores/Copos Helado.webp'

export const pagePaths = {
  home: '',
  brunch: 'brunch-lisboa',
  menu: 'menu',
  reservations: 'reservas',
  gallery: 'galeria',
  contact: 'contacto',
  gelados: 'gelados',
  promotions: 'promociones',
} as const

export type MetaPage = keyof typeof pagePaths

const pageImages: Record<MetaPage, string> = {
  home: defaultImage,
  brunch: defaultImage,
  menu: defaultImage,
  reservations: defaultImage,
  gallery: defaultImage,
  contact: defaultImage,
  gelados: gelatoImage,
  promotions: defaultImage,
}

export async function buildPageMetadata(locale: string, page: MetaPage): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `meta.${page}` })
  const path = pagePaths[page]
  const image = pageImages[page]
  const imageUrl = localizedUrl('pt', image)
  const title = t('title')
  const description = t('description')
  const imageAlt = t('imageAlt')

  return {
    title,
    description,
    keywords: t.has('keywords') ? t('keywords') : undefined,
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, path),
      siteName: 'Mil Sabores Lisboa',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      locale: ogLocales[locale as Locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: buildAlternates(locale, path),
  }
}
