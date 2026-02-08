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
    weekday: '7:00 - 19:00',
    weekend: '7:00 - 19:00',
    label: 'Lun-Dom · 7:00 - 19:00',
    openTime: '07:00',
    closeTime: '19:00',
  },

  // Social Media
  social: {
    instagram: {
      handle: '@milsaboreslx',
      url: 'https://instagram.com/milsaboreslx',
    },
    tripadvisor: {
      url: 'https://www.tripadvisor.es/Restaurant_Review-g189158-d21297136-Reviews-Mil_Sabores-Lisbon_Lisbon_District_Central_Portugal.html',
      rating: 4.5,
    },
    google: {
      url: 'https://maps.app.goo.gl/5QmYkV2uUZrYCLT9A',
      rating: 4.7,
      reviewCount: 1200,
    },
  },

  // Ratings
  ratings: {
    google: 4.7,
    tripadvisor: 4.5,
    reviewCount: 1200,
  },

  // Price range
  priceRange: '€€',
  currency: 'EUR',

  // Cuisine types
  cuisineTypes: ['Brunch', 'Cafe', 'Gelato', 'Portuguese', 'International'],

  // Special diets
  dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free'],

  // Payment methods
  paymentMethods: ['Cash', 'Credit Card', 'Debit Card', 'MB Way'],

  // Amenities
  amenities: ['WiFi', 'Outdoor Seating', 'Wheelchair Accessible'],
} as const

// Type for the restaurant config
export type RestaurantConfig = typeof RESTAURANT
