import { Metadata } from 'next'
import SchemaMarkup from '@/components/SchemaMarkup'
import { buildPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata(locale, 'menu')
}

export default async function MenuLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return (
    <>
      <SchemaMarkup locale={locale} page="menu" path="menu" />
      {children}
    </>
  )
}
