import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

// PROPUESTA (quitar antes de fusionar): bloqueo total de robots fuera del dominio de producción
// (preview *.vercel.app). En www.milsaboresbrunch.com se sirven las reglas originales del repo.
// Ver docs/propuesta-captador/POSIBLE-MEJORA.md
const PRODUCTION_HOST = /^(www\.)?milsaboresbrunch\.com$/i

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get('host')?.split(':')[0] ?? ''
  if (!PRODUCTION_HOST.test(host)) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://www.milsaboresbrunch.com/sitemap.xml',
  }
}
