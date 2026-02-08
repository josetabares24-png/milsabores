'use client'

import { usePathname, useRouter } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config'
import { useState, useTransition } from 'react'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale() as Locale

  const handleLocaleChange = (locale: Locale) => {
    startTransition(() => {
      router.replace(pathname, { locale })
    })
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 text-slate hover:text-pastel transition-all font-medium rounded-full md:rounded-lg bg-white/80 md:bg-transparent border-2 border-pastel/30 md:border-transparent hover:bg-pastel/10 hover:border-pastel/50 shadow-md md:shadow-none hover:shadow-lg"
        aria-label="Change language"
      >
        <Globe size={22} className="md:w-5 md:h-5" />
        <span className="hidden md:inline">{localeNames[currentLocale]}</span>
        <span className="text-2xl md:text-xl">{localeFlags[currentLocale]}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border-2 border-pastel/20 overflow-hidden z-50 animate-fade-in">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                disabled={isPending}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  locale === currentLocale
                    ? 'bg-pastel text-white font-bold'
                    : 'text-slate hover:bg-pastel/10'
                } ${isPending ? 'opacity-50 cursor-wait' : ''}`}
              >
                <span className="text-2xl">{localeFlags[locale]}</span>
                <span>{localeNames[locale]}</span>
                {locale === currentLocale && (
                  <span className="ml-auto text-xl">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
