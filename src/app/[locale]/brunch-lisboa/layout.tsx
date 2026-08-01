import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata(locale, 'brunch')
}

export default function BrunchLisboaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
