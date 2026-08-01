import { Metadata } from 'next'
import Hero from '@/components/Hero'
import FeaturedDish from '@/components/FeaturedDish'
import About from '@/components/About'
import MenuSection from '@/components/MenuSection'
import InstagramGallery from '@/components/InstagramGallery'
import VisitSection from '@/components/VisitSection'
import HomeSeoSections from '@/components/HomeSeoSections'
import SchemaMarkup from '@/components/SchemaMarkup'
import { buildPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata(locale, 'home')
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <main>
      <SchemaMarkup locale={locale} page="home" />
      <Hero />
      <HomeSeoSections variant="intro" />
      <FeaturedDish />
      <About />
      <MenuSection />
      <HomeSeoSections variant="brunch" />
      <InstagramGallery />
      <VisitSection />
      <HomeSeoSections variant="faq" />
    </main>
  )
}
