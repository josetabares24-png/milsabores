import React from 'react'
import { localizedUrl } from '@/lib/seo'
import type { Locale } from '@/i18n/config'

interface SchemaMarkupProps {
  locale: string
}

const restaurantDescriptions: Record<Locale, string> = {
  pt: 'Brunch e gelados artesanais no coração de Lisboa. Especialidades em panquecas, crepes, waffles, bowls saudáveis e autêntico gelato italiano na Baixa.',
  es: 'Brunch y helados artesanales en el corazón de Lisboa. Especialidades en panquecas, crepes, waffles, bowls saludables y auténtico gelato italiano en Baixa.',
  en: 'Artisanal brunch and gelato in the heart of Lisbon. Specializing in pancakes, crepes, waffles, healthy bowls and authentic Italian gelato in Baixa.',
  fr: 'Brunch et gelato artisanal au cœur de Lisbonne. Spécialités de pancakes, crêpes, gaufres, bowls healthy et authentique gelato italien à Baixa.',
  de: 'Handwerklicher Brunch und Gelato im Herzen von Lissabon. Spezialisiert auf Pancakes, Crêpes, Waffeln, gesunde Bowls und authentisches italienisches Gelato in Baixa.',
  it: 'Brunch e gelato artigianale nel cuore di Lisbona. Specialità di pancake, crêpe, waffle, bowl salutari e autentico gelato italiano a Baixa.',
}

const localBusinessDescriptions: Record<Locale, string> = {
  pt: 'Brunch e gelados artesanais no coração de Lisboa. Especialidades em panquecas, crepes, waffles, bowls saudáveis e autêntico gelato italiano na Baixa. WiFi gratuito disponível.',
  es: 'Brunch y helados artesanales en el corazón de Lisboa. Especialidades en panquecas, crepes, waffles, bowls saludables y auténtico gelato italiano en Baixa. WiFi gratis disponible.',
  en: 'Artisanal brunch and gelato in the heart of Lisbon. Specializing in pancakes, crepes, waffles, healthy bowls and authentic Italian gelato in Baixa. Free WiFi available.',
  fr: 'Brunch et gelato artisanal au cœur de Lisbonne. Spécialités de pancakes, crêpes, gaufres, bowls healthy et authentique gelato italien à Baixa. WiFi gratuit disponible.',
  de: 'Handwerklicher Brunch und Gelato im Herzen von Lissabon. Spezialisiert auf Pancakes, Crêpes, Waffeln, gesunde Bowls und authentisches italienisches Gelato in Baixa. Kostenloses WiFi verfügbar.',
  it: 'Brunch e gelato artigianale nel cuore di Lisbona. Specialità di pancake, crêpe, waffle, bowl salutari e autentico gelato italiano a Baixa. WiFi gratuito disponibile.',
}

const organizationDescriptions: Record<Locale, string> = {
  pt: 'Restaurante especializado em brunch e gelados artesanais em Lisboa',
  es: 'Restaurante especializado en brunch y helados artesanales en Lisboa',
  en: 'Restaurant specializing in artisanal brunch and gelato in Lisbon',
  fr: 'Restaurant spécialisé dans le brunch et le gelato artisanal à Lisbonne',
  de: 'Restaurant spezialisiert auf handwerklichen Brunch und Gelato in Lissabon',
  it: 'Ristorante specializzato in brunch e gelato artigianale a Lisbona',
}

const websiteDescriptions: Record<Locale, string> = {
  pt: 'Website oficial do Mil Sabores Lisboa - Brunch e Gelados Artesanais',
  es: 'Sitio web oficial de Mil Sabores Lisboa - Brunch y Helados Artesanales',
  en: 'Official website of Mil Sabores Lisboa - Artisanal Brunch and Gelato',
  fr: 'Site officiel de Mil Sabores Lisboa - Brunch et Gelato Artisanal',
  de: 'Offizielle Website von Mil Sabores Lisboa - Handwerklicher Brunch und Gelato',
  it: 'Sito ufficiale di Mil Sabores Lisboa - Brunch e Gelato Artigianale',
}

const inLanguageMap: Record<Locale, string> = {
  pt: 'pt-PT',
  es: 'es-ES',
  en: 'en-US',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
}

export default function SchemaMarkup({ locale }: SchemaMarkupProps) {
  const l = locale as Locale
  const homeUrl = localizedUrl(locale)
  const menuUrl = localizedUrl(locale, 'menu')

  const restaurantSchema = {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'FoodEstablishment', 'CafeOrCoffeeShop'],
    '@id': 'https://milsaboresbrunch.com/#restaurant',
    name: 'Mil Sabores Lisboa',
    alternateName: 'Mil Sabores',
    description: restaurantDescriptions[l] ?? restaurantDescriptions.en,
    image: [
      'https://milsaboresbrunch.com/images/Mil Sabores/Brunch Americano.webp',
      'https://milsaboresbrunch.com/images/Mil Sabores/Crepe Limon.webp',
      'https://milsaboresbrunch.com/images/Mil Sabores/Poke Vegan.webp',
      'https://milsaboresbrunch.com/images/Mil Sabores/Mini Hamburguer.webp'
    ],
    url: homeUrl,
    telephone: '+351213470214',
    email: 'milsaboreslx@gmail.com',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua da Prata 152',
      addressLocality: 'Lisboa',
      addressRegion: 'Lisboa',
      postalCode: '1100-619',
      addressCountry: 'PT'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.711305,
      longitude: -9.1370277
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '07:00',
        closes: '19:00'
      }
    ],
    servesCuisine: ['Brunch', 'Dessert', 'Ice Cream', 'Gelato', 'Coffee', 'Italian', 'International', 'Healthy Food'],
    hasMenu: menuUrl,
    acceptsReservations: 'True',
    menu: menuUrl,
    sameAs: [
      'https://www.instagram.com/milsaboreslx/',
      'https://www.facebook.com/MilSaboreslx',
      'https://www.tripadvisor.es/Restaurant_Review-g189158-d21297136-Reviews-Mil_Sabores-Lisbon_Lisbon_District_Central_Portugal.html',
      'https://maps.app.goo.gl/5QmYkV2uUZrYCLT9A'
    ],
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    currenciesAccepted: 'EUR',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '200',
      bestRating: '5',
      worstRating: '1'
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free WiFi',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Wheelchair Accessible',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Outdoor Seating',
        value: false
      }
    ],
    smokingAllowed: false,
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Brunch',
        description: 'Pancakes, Crepes, Waffles, Bagels, Eggs, Toasts',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Banana Nutella Pancakes',
            description: 'Fluffy pancakes with fresh banana and Nutella',
            offers: {
              '@type': 'Offer',
              price: '8.50',
              priceCurrency: 'EUR'
            }
          }
        ]
      },
      {
        '@type': 'MenuSection',
        name: 'Gelato Artesanal',
        description: 'Authentic Italian gelato made fresh daily',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Gelato - 1 Bola',
            offers: {
              '@type': 'Offer',
              price: '3.50',
              priceCurrency: 'EUR'
            }
          }
        ]
      },
      {
        '@type': 'MenuSection',
        name: 'Bowls Saudáveis',
        description: 'Healthy bowls with fresh ingredients',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Açaí Bowl',
            description: 'Açaí topped with fresh fruits and granola',
            offers: {
              '@type': 'Offer',
              price: '9.50',
              priceCurrency: 'EUR'
            },
            suitableForDiet: ['https://schema.org/VegetarianDiet', 'https://schema.org/VeganDiet']
          }
        ]
      }
    ],
    knowsAbout: ['Brunch', 'Gelato', 'Italian Cuisine', 'Healthy Food', 'Coffee']
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Mil Sabores Lisboa',
    description: localBusinessDescriptions[l] ?? localBusinessDescriptions.en,
    image: 'https://milsaboresbrunch.com/images/Mil Sabores/Brunch Americano.webp',
    '@id': 'https://milsaboresbrunch.com/#business',
    url: homeUrl,
    telephone: '+351213470214',
    email: 'milsaboreslx@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua da Prata 152',
      addressLocality: 'Lisboa',
      addressRegion: 'Lisboa',
      postalCode: '1100-619',
      addressCountry: 'PT'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.711305,
      longitude: -9.1370277
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '07:00',
        closes: '19:00'
      }
    ],
    priceRange: '€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '200',
      bestRating: '5',
      worstRating: '1'
    }
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: homeUrl
      }
    ]
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://milsaboresbrunch.com/#organization',
    name: 'Mil Sabores Lisboa',
    url: 'https://milsaboresbrunch.com',
    logo: 'https://milsaboresbrunch.com/icon-512.png',
    image: 'https://milsaboresbrunch.com/images/Mil Sabores/Brunch Americano.webp',
    description: organizationDescriptions[l] ?? organizationDescriptions.en,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua da Prata 152',
      addressLocality: 'Lisboa',
      postalCode: '1100-619',
      addressCountry: 'PT'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+351213470214',
      contactType: 'Customer Service',
      email: 'milsaboreslx@gmail.com',
      availableLanguage: ['Portuguese', 'English', 'Spanish', 'French', 'German', 'Italian']
    },
    sameAs: [
      'https://www.instagram.com/milsaboreslx/',
      'https://www.tripadvisor.es/Restaurant_Review-g189158-d21297136-Reviews-Mil_Sabores-Lisbon_Lisbon_District_Central_Portugal.html',
      'https://maps.app.goo.gl/5QmYkV2uUZrYCLT9A'
    ]
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://milsaboresbrunch.com/#website',
    url: 'https://milsaboresbrunch.com',
    name: 'Mil Sabores Lisboa',
    description: websiteDescriptions[l] ?? websiteDescriptions.en,
    publisher: {
      '@id': 'https://milsaboresbrunch.com/#organization'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${menuUrl}?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    inLanguage: inLanguageMap[l] ?? inLanguageMap.en
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
