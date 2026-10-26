import { getTranslations } from 'next-intl/server'
import { RESTAURANT } from '@/config/restaurant'
import { type Locale } from '@/i18n/config'
import { localizedUrl } from '@/lib/seo'
import { GELATO_SIZES, MENU_CATEGORIES } from '@/lib/menu'

type SchemaPage = 'home' | 'brunch' | 'menu' | 'reservations' | 'gallery' | 'breakfast' | 'burgers' | 'gelato'

interface SchemaMarkupProps {
  locale: string
  page: SchemaPage
  path?: string
}

const inLanguageMap: Record<Locale, string> = {
  pt: 'pt-PT',
  en: 'en',
  es: 'es',
  fr: 'fr',
  de: 'de',
  it: 'it',
}

const pageNames: Record<SchemaPage, Record<Locale, string>> = {
  home: {
    pt: 'Mil Sabores Lisboa',
    en: 'Mil Sabores Lisbon',
    es: 'Mil Sabores Lisboa',
    fr: 'Mil Sabores Lisbonne',
    de: 'Mil Sabores Lissabon',
    it: 'Mil Sabores Lisbona',
  },
  brunch: {
    pt: 'Brunch em Lisboa na Baixa',
    en: 'Brunch in Lisbon Baixa',
    es: 'Brunch en Lisboa en la Baixa',
    fr: 'Brunch à Lisbonne dans la Baixa',
    de: 'Brunch in Lissabons Baixa',
    it: 'Brunch a Lisbona nella Baixa',
  },
  menu: {
    pt: 'Menu Mil Sabores',
    en: 'Mil Sabores Menu',
    es: 'Menú Mil Sabores',
    fr: 'Carte Mil Sabores',
    de: 'Mil Sabores Speisekarte',
    it: 'Menu Mil Sabores',
  },
  reservations: {
    pt: 'Reservas e contacto Mil Sabores',
    en: 'Mil Sabores Reservations and Contact',
    es: 'Reservas y contacto Mil Sabores',
    fr: 'Réservations et contact Mil Sabores',
    de: 'Mil Sabores Reservierung und Kontakt',
    it: 'Prenotazioni e contatti Mil Sabores',
  },
  gallery: {
    pt: 'Galeria Mil Sabores',
    en: 'Mil Sabores Gallery',
    es: 'Galería Mil Sabores',
    fr: 'Galerie Mil Sabores',
    de: 'Mil Sabores Galerie',
    it: 'Galleria Mil Sabores',
  },
  breakfast: {
    pt: 'Pequeno-almoço na Baixa de Lisboa',
    en: 'Breakfast in Lisbon’s Baixa',
    es: 'Desayunar en la Baixa de Lisboa',
    fr: 'Petit-déjeuner dans la Baixa de Lisbonne',
    de: 'Frühstück in der Baixa von Lissabon',
    it: 'Colazione nella Baixa di Lisbona',
  },
  burgers: {
    pt: 'Hambúrgueres na Baixa de Lisboa',
    en: 'Burgers in Lisbon’s Baixa',
    es: 'Hamburguesas en la Baixa de Lisboa',
    fr: 'Burgers dans la Baixa de Lisbonne',
    de: 'Burger in der Baixa von Lissabon',
    it: 'Hamburger nella Baixa di Lisbona',
  },
  gelato: {
    pt: 'Gelados artesanais na Baixa de Lisboa',
    en: 'Artisanal gelato in Lisbon’s Baixa',
    es: 'Helado artesanal en la Baixa de Lisboa',
    fr: 'Glaces artisanales dans la Baixa de Lisbonne',
    de: 'Hausgemachtes Eis in der Baixa von Lissabon',
    it: 'Gelato artigianale nella Baixa di Lisbona',
  },
}

const descriptions: Record<Locale, string> = {
  pt: 'Brunch, panquecas, crepes, waffles, bowls, café e gelados artesanais na Rua da Prata, na Baixa de Lisboa.',
  en: 'Brunch, pancakes, crepes, waffles, bowls, coffee and artisanal gelato on Rua da Prata in Lisbon Baixa.',
  es: 'Brunch, panquecas, crepes, waffles, bowls, café y gelados artesanales en Rua da Prata, en la Baixa de Lisboa.',
  fr: 'Brunch, pancakes, crêpes, gaufres, bowls, café et gelato artisanal sur la Rua da Prata, dans la Baixa de Lisbonne.',
  de: 'Brunch, Pancakes, Crêpes, Waffeln, Bowls, Kaffee und handgemachtes Gelato in der Rua da Prata in Lissabons Baixa.',
  it: 'Brunch, pancake, crêpe, waffle, bowl, caffè e gelato artigianale in Rua da Prata, nella Baixa di Lisbona.',
}

type RawMenuItem = { name?: string; desc?: string; price?: string }

/** URL absoluta de um ficheiro em /public, com espaços e acentos codificados (URL válida). */
function assetUrl(path: string) {
  return localizedUrl('pt', encodeURI(path))
}

function toPrice(value: string | undefined) {
  if (!value) return null
  const n = Number(String(value).replace('€', '').replace(',', '.').trim())
  return Number.isFinite(n) && n > 0 ? n.toFixed(2) : null
}

/** Secções e pratos do JSON-LD Menu, gerados a partir das mesmas mensagens que a página /menu mostra. */
async function buildMenuSections(locale: string) {
  const t = await getTranslations({ locale, namespace: 'fullMenu' })
  const tGelados = await getTranslations({ locale, namespace: 'gelados' })
  const prices: number[] = []

  const sections = MENU_CATEGORIES.map((category) => {
    const raw = (t.raw(category) ?? {}) as Record<string, RawMenuItem | string>
    const items = Object.values(raw)
      .filter((item): item is RawMenuItem => typeof item === 'object' && item !== null && Boolean(item.name))
      .map((item) => {
        const price = toPrice(item.price)
        if (price && category !== 'extras') prices.push(Number(price))
        return {
          '@type': 'MenuItem',
          name: item.name,
          ...(item.desc ? { description: item.desc } : {}),
          ...(price
            ? { offers: { '@type': 'Offer', price, priceCurrency: 'EUR' } }
            : {}),
        }
      })
    return {
      '@type': 'MenuSection',
      name: t(`categories.${category}`),
      hasMenuItem: items,
    }
  }).filter((section) => section.hasMenuItem.length > 0)

  sections.push({
    '@type': 'MenuSection',
    name: tGelados('title'),
    hasMenuItem: GELATO_SIZES.map((size) => {
      const price = toPrice(tGelados(`sizes.${size}.price`))
      return {
        '@type': 'MenuItem',
        name: `${tGelados('title')} – ${tGelados(`sizes.${size}.name`)}`,
        description: tGelados(`sizes.${size}.description`),
        ...(price ? { offers: { '@type': 'Offer', price, priceCurrency: 'EUR' } } : {}),
      }
    }),
  })

  return { sections, prices }
}

/** Intervalo de preços real da carta (sem a secção Extras), ex.: "€0.50–€29.95". */
function priceRangeFrom(prices: number[]) {
  if (prices.length === 0) return undefined
  return `€${Math.min(...prices).toFixed(2)}–€${Math.max(...prices).toFixed(2)}`
}

function safeJson(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export default async function SchemaMarkup({ locale, page, path = '' }: SchemaMarkupProps) {
  const l = locale as Locale
  const inLanguage = inLanguageMap[l] ?? inLanguageMap.pt
  const pageUrl = localizedUrl(locale, path)
  const homeUrl = localizedUrl(locale)
  const menuUrl = localizedUrl(locale, 'menu')
  const logoUrl = localizedUrl('pt', '/icon-512.png')
  const restaurantId = 'https://www.milsaboresbrunch.com/#restaurant'
  const logoId = 'https://www.milsaboresbrunch.com/#logo'
  const websiteId = 'https://www.milsaboresbrunch.com/#website'
  const webpageId = `${pageUrl}#webpage`
  const { sections: menuSections, prices } = await buildMenuSections(locale)
  const priceRange = priceRangeFrom(prices)

  const restaurant = {
    '@type': ['Restaurant', 'CafeOrCoffeeShop', 'IceCreamShop'],
    '@id': restaurantId,
    name: 'Mil Sabores Lisboa',
    alternateName: 'Mil Sabores',
    description: descriptions[l] ?? descriptions.pt,
    url: homeUrl,
    logo: {
      '@type': 'ImageObject',
      '@id': logoId,
      url: logoUrl,
      contentUrl: logoUrl,
      width: 512,
      height: 512,
      caption: 'Mil Sabores Lisboa',
    },
    image: [
      logoUrl,
      assetUrl('/images/Mil Sabores/Brunch Americano.webp'),
      assetUrl('/images/Mil Sabores/Crepe Limon.webp'),
      assetUrl('/images/Mil Sabores/Copos Helado.webp'),
    ],
    telephone: RESTAURANT.phoneClean,
    email: RESTAURANT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: RESTAURANT.address.street,
      postalCode: RESTAURANT.address.postalCode,
      addressLocality: RESTAURANT.address.city,
      addressCountry: 'PT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: RESTAURANT.coordinates.lat,
      longitude: RESTAURANT.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: RESTAURANT.hours.openTime,
        closes: RESTAURANT.hours.closeTime,
      },
    ],
    servesCuisine: ['Brunch', 'Breakfast', 'Coffee', 'Burgers', 'Gelato', 'International'],
    hasMap: RESTAURANT.social.google.url,
    hasMenu: {
      '@id': `${menuUrl}#menu`,
    },
    acceptsReservations: true,
    ...(priceRange ? { priceRange } : {}),
    sameAs: [
      RESTAURANT.social.instagram.url,
      RESTAURANT.social.tripadvisor.url,
      RESTAURANT.social.google.url,
      RESTAURANT.social.facebook.url,
    ],
  }

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: 'https://www.milsaboresbrunch.com',
    name: 'Mil Sabores Lisboa',
    inLanguage,
    publisher: {
      '@id': restaurantId,
    },
  }

  const webpage: Record<string, unknown> = {
    '@type': page === 'reservations' ? 'ContactPage' : page === 'gallery' ? 'CollectionPage' : 'WebPage',
    '@id': webpageId,
    url: pageUrl,
    name: pageNames[page][l] ?? pageNames[page].pt,
    description: descriptions[l] ?? descriptions.pt,
    inLanguage,
    isPartOf: {
      '@id': websiteId,
    },
    about: {
      '@id': restaurantId,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: assetUrl('/images/Mil Sabores/Brunch Americano.webp'),
    },
  }

  if (page === 'home') {
    webpage.mainEntity = { '@id': restaurantId }
  }

  const graph: unknown[] = [restaurant, website, webpage]

  // FAQ visível na própria página (home e /brunch-lisboa): mesmo texto, sem acrescentar nada.
  const faqSource = page === 'home' ? 'homeSeo.faq' : page === 'brunch' ? 'brunchLanding.faq' : null
  if (faqSource) {
    const tFaq = await getTranslations({ locale, namespace: faqSource })
    const items = Object.keys((tFaq.raw('items') ?? {}) as Record<string, unknown>)
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      inLanguage,
      mainEntity: items.map((key) => ({
        '@type': 'Question',
        name: tFaq(`items.${key}.q`),
        acceptedAnswer: { '@type': 'Answer', text: tFaq(`items.${key}.a`) },
      })),
    })
  }

  if (page === 'menu') {
    graph.push({
      '@type': 'Menu',
      '@id': `${menuUrl}#menu`,
      name: pageNames.menu[l] ?? pageNames.menu.pt,
      url: menuUrl,
      inLanguage,
      hasMenuSection: menuSections,
      provider: {
        '@id': restaurantId,
      },
    })
  }

  if (page !== 'home') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: pageNames.home[l] ?? pageNames.home.pt,
          item: homeUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: pageNames[page][l] ?? pageNames[page].pt,
          item: pageUrl,
        },
      ],
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJson({
          '@context': 'https://schema.org',
          '@graph': graph,
        }),
      }}
    />
  )
}
