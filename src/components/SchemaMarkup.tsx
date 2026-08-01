import { RESTAURANT } from '@/config/restaurant'
import { type Locale } from '@/i18n/config'
import { localizedUrl } from '@/lib/seo'

type SchemaPage = 'home' | 'brunch' | 'menu' | 'reservations' | 'gallery' | 'contact' | 'gelados' | 'promotions'

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
    pt: 'Reservas Mil Sabores',
    en: 'Mil Sabores Reservations',
    es: 'Reservas Mil Sabores',
    fr: 'Réservations Mil Sabores',
    de: 'Mil Sabores Reservierungen',
    it: 'Prenotazioni Mil Sabores',
  },
  gallery: {
    pt: 'Galeria Mil Sabores',
    en: 'Mil Sabores Gallery',
    es: 'Galería Mil Sabores',
    fr: 'Galerie Mil Sabores',
    de: 'Mil Sabores Galerie',
    it: 'Galleria Mil Sabores',
  },
  contact: {
    pt: 'Contacto Mil Sabores',
    en: 'Mil Sabores Contact',
    es: 'Contacto Mil Sabores',
    fr: 'Contact Mil Sabores',
    de: 'Mil Sabores Kontakt',
    it: 'Contatti Mil Sabores',
  },
  gelados: {
    pt: 'Gelados artesanais Mil Sabores',
    en: 'Mil Sabores artisanal gelato',
    es: 'Gelados artesanales Mil Sabores',
    fr: 'Gelato artisanal Mil Sabores',
    de: 'Handgemachtes Gelato Mil Sabores',
    it: 'Gelato artigianale Mil Sabores',
  },
  promotions: {
    pt: 'Promoções Mil Sabores',
    en: 'Mil Sabores offers',
    es: 'Promociones Mil Sabores',
    fr: 'Offres Mil Sabores',
    de: 'Mil Sabores Angebote',
    it: 'Promozioni Mil Sabores',
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

const menuSections = ['Bagels', 'Tostas', 'Brunch', 'Saladas', 'Bowls', 'Panquecas', 'Crepes', 'Waffles', 'Café', 'Gelados artesanais']

function safeJson(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export default function SchemaMarkup({ locale, page, path = '' }: SchemaMarkupProps) {
  const l = locale as Locale
  const inLanguage = inLanguageMap[l] ?? inLanguageMap.pt
  const pageUrl = localizedUrl(locale, path)
  const homeUrl = localizedUrl(locale)
  const menuUrl = localizedUrl(locale, 'menu')
  const restaurantId = 'https://milsaboresbrunch.com/#restaurant'
  const websiteId = 'https://milsaboresbrunch.com/#website'
  const webpageId = `${pageUrl}#webpage`

  const restaurant = {
    '@type': ['Restaurant', 'CafeOrCoffeeShop'],
    '@id': restaurantId,
    name: 'Mil Sabores Lisboa',
    alternateName: 'Mil Sabores',
    description: descriptions[l] ?? descriptions.pt,
    url: homeUrl,
    image: [
      localizedUrl('pt', '/images/Mil Sabores/Brunch Americano.webp'),
      localizedUrl('pt', '/images/Mil Sabores/Crepe Limon.webp'),
      localizedUrl('pt', '/images/Mil Sabores/Copos Helado.webp'),
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
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '07:00',
        closes: '19:00',
      },
    ],
    servesCuisine: ['Brunch', 'Coffee', 'Gelato', 'International'],
    hasMenu: {
      '@id': `${menuUrl}#menu`,
    },
    acceptsReservations: true,
    sameAs: [
      RESTAURANT.social.instagram.url,
      RESTAURANT.social.tripadvisor.url,
      RESTAURANT.social.google.url,
    ],
  }

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: 'https://milsaboresbrunch.com',
    name: 'Mil Sabores Lisboa',
    inLanguage,
    publisher: {
      '@id': restaurantId,
    },
  }

  const webpage: Record<string, unknown> = {
    '@type': page === 'contact' ? 'ContactPage' : page === 'gallery' ? 'CollectionPage' : 'WebPage',
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
      url: page === 'gelados'
        ? localizedUrl('pt', '/images/Mil Sabores/Copos Helado.webp')
        : localizedUrl('pt', '/images/Mil Sabores/Brunch Americano.webp'),
    },
  }

  if (page === 'home') {
    webpage.mainEntity = { '@id': restaurantId }
  }

  const graph: unknown[] = [restaurant, website, webpage]

  if (page === 'menu') {
    graph.push({
      '@type': 'Menu',
      '@id': `${menuUrl}#menu`,
      name: pageNames.menu[l] ?? pageNames.menu.pt,
      url: menuUrl,
      inLanguage,
      hasMenuSection: menuSections.map((name) => ({
        '@type': 'MenuSection',
        name,
      })),
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
