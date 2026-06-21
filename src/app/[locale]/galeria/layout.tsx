import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ogLocales, type Locale } from '@/i18n/config'
import { localizedUrl, buildAlternates } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.gallery' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: localizedUrl(locale, 'galeria'),
      siteName: 'Mil Sabores Lisboa',
      images: [
        {
          url: 'https://milsaboresbrunch.com/images/Mil Sabores/Brunch Americano.webp',
          width: 1200,
          height: 630,
          alt: 'Galería Mil Sabores Lisboa',
        },
      ],
      locale: ogLocales[locale as Locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['https://milsaboresbrunch.com/images/Mil Sabores/Brunch Americano.webp'],
    },
    alternates: buildAlternates(locale, 'galeria'),
  }
}

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
