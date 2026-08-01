import { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/i18n/config'
import { hreflangLocales, localizedUrl } from '@/lib/seo'

const pages = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: 'brunch-lisboa', changeFrequency: 'weekly', priority: 0.9 },
  { path: 'menu', changeFrequency: 'weekly', priority: 0.9 },
  { path: 'reservas', changeFrequency: 'monthly', priority: 0.8 },
  { path: 'galeria', changeFrequency: 'monthly', priority: 0.7 },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = []

  for (const page of pages) {
    const languages: Record<string, string> = {}
    for (const locale of locales) {
      languages[hreflangLocales[locale]] = localizedUrl(locale, page.path)
    }
    languages['x-default'] = localizedUrl(defaultLocale, page.path)

    for (const locale of locales) {
      sitemapEntries.push({
        url: localizedUrl(locale, page.path),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      })
    }
  }

  return sitemapEntries
}
