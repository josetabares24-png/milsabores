import React from 'react'

interface SchemaMarkupProps {
  locale: string
}

export default function SchemaMarkup({ locale }: SchemaMarkupProps) {
  const restaurantSchema = {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'FoodEstablishment', 'CafeOrCoffeeShop'],
    '@id': 'https://milsaboresbrunch.com/#restaurant',
    name: 'Mil Sabores Lisboa',
    alternateName: 'Mil Sabores',
    description: locale === 'pt'
      ? 'Brunch e gelados artesanais no coração de Lisboa. Especialidades em panquecas, crepes, waffles, bowls saudáveis e autêntico gelato italiano na Baixa.'
      : locale === 'es'
      ? 'Brunch y helados artesanales en el corazón de Lisboa. Especialidades en panquecas, crepes, waffles, bowls saludables y auténtico gelato italiano en Baixa.'
      : 'Artisanal brunch and gelato in the heart of Lisbon. Specializing in pancakes, crepes, waffles, healthy bowls and authentic Italian gelato in Baixa.',
    image: [
      'https://milsaboresbrunch.com/images/Mil Sabores/Brunch Americano.webp',
      'https://milsaboresbrunch.com/images/Mil Sabores/Crepe Limon.webp',
      'https://milsaboresbrunch.com/images/Mil Sabores/Poke Vegan.webp',
      'https://milsaboresbrunch.com/images/Mil Sabores/Mini Hamburguer.webp'
    ],
    url: `https://milsaboresbrunch.com/${locale}`,
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
    hasMenu: `https://milsaboresbrunch.com/${locale}/menu`,
    acceptsReservations: 'True',
    menu: `https://milsaboresbrunch.com/${locale}/menu`,
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
    description: locale === 'pt'
      ? 'Brunch e gelados artesanais no coração de Lisboa. Especialidades em panquecas, crepes, waffles, bowls saudáveis e autêntico gelato italiano na Baixa. WiFi gratuito disponível.'
      : locale === 'es'
      ? 'Brunch y helados artesanales en el corazón de Lisboa. Especialidades en panquecas, crepes, waffles, bowls saludables y auténtico gelato italiano en Baixa. WiFi gratis disponible.'
      : 'Artisanal brunch and gelato in the heart of Lisbon. Specializing in pancakes, crepes, waffles, healthy bowls and authentic Italian gelato in Baixa. Free WiFi available.',
    image: 'https://milsaboresbrunch.com/images/Mil Sabores/Brunch Americano.webp',
    '@id': 'https://milsaboresbrunch.com/#business',
    url: `https://milsaboresbrunch.com/${locale}`,
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
        item: `https://milsaboresbrunch.com/${locale}`
      }
    ]
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://milsaboresbrunch.com/#organization',
    name: 'Mil Sabores Lisboa',
    url: 'https://milsaboresbrunch.com',
    logo: 'https://milsaboresbrunch.com/logo.svg',
    image: 'https://milsaboresbrunch.com/images/Mil Sabores/Brunch Americano.webp',
    description: locale === 'pt'
      ? 'Restaurante especializado em brunch e gelados artesanais em Lisboa'
      : locale === 'es'
      ? 'Restaurante especializado en brunch y helados artesanales en Lisboa'
      : 'Restaurant specializing in artisanal brunch and gelato in Lisbon',
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
      availableLanguage: ['Portuguese', 'English', 'Spanish']
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
    description: locale === 'pt'
      ? 'Website oficial do Mil Sabores Lisboa - Brunch e Gelados Artesanais'
      : locale === 'es'
      ? 'Sitio web oficial de Mil Sabores Lisboa - Brunch y Helados Artesanales'
      : 'Official website of Mil Sabores Lisboa - Artisanal Brunch and Gelato',
    publisher: {
      '@id': 'https://milsaboresbrunch.com/#organization'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://milsaboresbrunch.com/${locale}/menu?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    inLanguage: locale === 'pt' ? 'pt-PT' : locale === 'es' ? 'es' : 'en'
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
