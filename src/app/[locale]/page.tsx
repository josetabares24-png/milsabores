import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/Hero'
import FeaturedDish from '@/components/FeaturedDish'
import About from '@/components/About'
import MenuSection from '@/components/MenuSection'
import Testimonials from '@/components/Testimonials'
import InstagramGallery from '@/components/InstagramGallery'
import VisitSection from '@/components/VisitSection'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.home' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://milsaboresbrunch.com/${locale}`,
      siteName: 'Mil Sabores Lisboa',
      images: [
        {
          url: 'https://milsaboresbrunch.com/images/Mil Sabores/Brunch Americano.webp',
          width: 1200,
          height: 630,
          alt: 'Mil Sabores Lisboa Brunch',
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
      canonical: 'https://milsaboresbrunch.com',
    },
  }
}

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedDish />
      <About />
      <MenuSection />
      <Testimonials />
      <InstagramGallery />
      <VisitSection />
    </main>
  )
}
