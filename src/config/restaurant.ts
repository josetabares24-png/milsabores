/**
 * Centralized restaurant configuration
 * All business info in one place for easy maintenance
 */

export const RESTAURANT = {
  name: 'Mil Sabores',
  tagline: 'Brunch y Helados',
  city: 'Lisboa',

  // Contact
  phone: '+351 21 347 0214',
  phoneClean: '+351213470214', // For tel: links
  email: 'milsaboreslx@gmail.com',
  whatsapp: '+351913470214',

  // Location
  address: {
    street: 'Rua da Prata 152',
    postalCode: '1100-619',
    city: 'Lisboa',
    country: 'Portugal',
    full: 'Rua da Prata 152, 1100-619 Lisboa, Portugal',
    short: 'Rua da Prata 152, Lisboa',
  },

  // Coordinates
  coordinates: {
    lat: 38.711305,
    lng: -9.1370277,
  },

  // Hours
  hours: {
    weekday: '7:00 - 18:30',
    weekend: '7:00 - 19:00',
    label: 'Seg-Sex · 7:00 - 18:30 / Sáb-Dom · 7:00 - 19:00',
    openTime: '07:00',
    weekdayCloseTime: '18:30',
    weekendCloseTime: '19:00',
  },

  // Social Media
  social: {
    instagram: {
      handle: '@milsaboreslx',
      url: 'https://instagram.com/milsaboreslx',
    },
    tripadvisor: {
      url: 'https://www.tripadvisor.es/Restaurant_Review-g189158-d21297136-Reviews-Mil_Sabores-Lisbon_Lisbon_District_Central_Portugal.html',
    },
    google: {
      url: 'https://maps.app.goo.gl/5QmYkV2uUZrYCLT9A',
    },
  },

  // Cuisine types
  cuisineTypes: ['Brunch', 'Cafe', 'Gelato', 'Portuguese', 'International'],
} as const

// Type for the restaurant config
export type RestaurantConfig = typeof RESTAURANT
