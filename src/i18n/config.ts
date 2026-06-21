export const locales = ['pt', 'en', 'es', 'fr', 'de', 'it'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'pt'

export const localeNames: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
}

export const localeFlags: Record<Locale, string> = {
  pt: '🇵🇹',
  en: '🇬🇧',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  it: '🇮🇹',
}

// og:locale requiere el formato xx_XX
export const ogLocales: Record<Locale, string> = {
  pt: 'pt_PT',
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  it: 'it_IT',
}
