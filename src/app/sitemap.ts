import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://milsaboresbrunch.com'
  const pages = ['', 'menu', 'reservas', 'galeria', 'contacto', 'gelados', 'promociones']

  const sitemapEntries: MetadataRoute.Sitemap = pages.map((page) => {
    const url = page === '' ? baseUrl : `${baseUrl}/${page}`

    return {
      url,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1.0 : 0.8,
    }
  })

  return sitemapEntries
}
