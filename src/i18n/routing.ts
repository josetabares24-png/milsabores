import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['es'],
  defaultLocale: 'es',
  localePrefix: 'never', // No mostrar /es en la URL
  localeDetection: false // Solo español
})

export const { Link, redirect, usePathname, useRouter, permanentRedirect } =
  createNavigation(routing)
