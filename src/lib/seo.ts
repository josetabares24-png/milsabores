import { locales, defaultLocale, type Locale } from '@/i18n/config'

const baseUrl = 'https://milsaboresbrunch.com'

export function localizedUrl(locale: string, path: string = ''): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  const cleanPath = path ? `/${path.replace(/^\//, '')}` : ''
  return `${baseUrl}${prefix}${cleanPath}`
}

export function buildAlternates(locale: string, path: string = '') {
  const languages: Record<string, string> = {}
  for (const l of locales) {
    languages[l] = localizedUrl(l, path)
  }
  languages['x-default'] = localizedUrl(defaultLocale, path)

  return {
    canonical: localizedUrl(locale, path),
    languages,
  }
}

export type { Locale }
