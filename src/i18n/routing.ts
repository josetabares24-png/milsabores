import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['pt', 'en', 'es', 'fr', 'de', 'it'],
  defaultLocale: 'pt',
  localePrefix: 'as-needed', // pt (principal) sin prefijo, el resto con /en, /es, /fr, /de, /it
  localeDetection: false // siempre pt por defecto en "/", ignora el idioma del navegador
})

export const { Link, redirect, usePathname, useRouter, permanentRedirect } =
  createNavigation(routing)
