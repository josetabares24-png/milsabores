import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
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
