import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

// Cabeçalhos de segurança de baixo risco (sem CSP: exigiria testes com Maps/fonts/analytics)
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  images: {
    // Imágenes propias desde public/images (no se usan dominios externos)
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    const secondaryLocales = ['en', 'es', 'fr', 'de', 'it']
    const redirects = [
      { source: '/contacto', destination: '/reservas#contacto', permanent: true },
      { source: '/promociones', destination: '/menu#promocoes', permanent: true },
      { source: '/gelados', destination: '/menu#gelados', permanent: true },
    ]

    for (const locale of secondaryLocales) {
      redirects.push(
        { source: `/${locale}/contacto`, destination: `/${locale}/reservas#contacto`, permanent: true },
        { source: `/${locale}/promociones`, destination: `/${locale}/menu#promocoes`, permanent: true },
        { source: `/${locale}/gelados`, destination: `/${locale}/menu#gelados`, permanent: true },
      )
    }

    return redirects
  },
}

export default withNextIntl(nextConfig)
