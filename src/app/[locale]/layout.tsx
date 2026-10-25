import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Metadata, Viewport } from 'next'
import { Quicksand } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { locales, type Locale } from '@/i18n/config'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import FloatingActionButton from '@/components/FloatingActionButton'
import CookieConsent from '@/components/CookieConsent'
import AnalyticsEvents from '@/components/AnalyticsEvents'
import { Analytics } from '@vercel/analytics/next'
import '../globals.css'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
})

export const metadata: Metadata = {
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#FFF9F0',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${quicksand.variable}`}>
      <body className="font-quicksand">
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          {children}
          <Footer />
          <BackToTop />
          <FloatingActionButton />
          <CookieConsent />
          <AnalyticsEvents />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
