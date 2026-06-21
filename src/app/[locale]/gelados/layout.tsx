import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ogLocales, type Locale } from '@/i18n/config'
import { localizedUrl, buildAlternates } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.gelados' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: localizedUrl(locale, 'gelados'),
      siteName: 'Mil Sabores Lisboa',
      images: [
        {
          url: 'https://milsaboresbrunch.com/images/Mil Sabores/Copos Helado.webp',
          width: 1200,
          height: 630,
          alt: 'Gelato Artesanal Mil Sabores Lisboa',
        },
      ],
      locale: ogLocales[locale as Locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['https://milsaboresbrunch.com/images/Mil Sabores/Copos Helado.webp'],
    },
    alternates: buildAlternates(locale, 'gelados'),
  }
}

export default function GeladosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
