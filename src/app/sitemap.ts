import { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/i18n/config'
import { localizedUrl } from '@/lib/seo'

const pages = ['', 'menu', 'reservas', 'galeria', 'contacto', 'gelados', 'promociones']

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = []

  for (const page of pages) {
    const languages: Record<string, string> = {}
    for (const locale of locales) {
      languages[locale] = localizedUrl(locale, page)
    }
    languages['x-default'] = localizedUrl(defaultLocale, page)

    for (const locale of locales) {
      sitemapEntries.push({
        url: localizedUrl(locale, page),
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: { languages },
      })
    }
  }

  return sitemapEntries
}
