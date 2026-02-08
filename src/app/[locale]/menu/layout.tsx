import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.menu' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://milsaboresbrunch.com/${locale}/menu`,
      siteName: 'Mil Sabores Lisboa',
      images: [
        {
          url: 'https://milsaboresbrunch.com/images/Mil Sabores/Brunch Americano.webp',
          width: 1200,
          height: 630,
          alt: 'Menú Mil Sabores Lisboa',
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['https://milsaboresbrunch.com/images/Mil Sabores/Brunch Americano.webp'],
    },
    alternates: {
      canonical: `https://milsaboresbrunch.com/${locale}/menu`,
    },
  }
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
