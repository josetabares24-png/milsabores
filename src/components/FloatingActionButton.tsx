'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Phone, Calendar, X } from 'lucide-react'
import { Link } from '@/i18n/routing'

export default function FloatingActionButton() {
  const t = useTranslations('fab')
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: Calendar,
      label: t('reserve'),
      href: '/reservas',
      color: 'bg-pastel-ink text-white',
      delay: 0.1,
    },
    {
      icon: Phone,
      label: t('call'),
      href: 'tel:+351213470214',
      color: 'bg-cream text-gray-800 border-2 border-gray-800',
      delay: 0.15,
      external: true,
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3 items-end"
          >
            {actions.map((action) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: action.delay }}
              >
                {action.external ? (
                  <a
                    href={action.href}
                    className={`flex items-center gap-3 px-4 py-3 ${action.color} rounded-full shadow-md`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-sm font-bold whitespace-nowrap">
                      {action.label}
                    </span>
                    <action.icon size={20} />
                  </a>
                ) : (
                  <Link
                    href={action.href}
                    className={`flex items-center gap-3 px-4 py-3 ${action.color} rounded-full shadow-md`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-sm font-bold whitespace-nowrap">
                      {action.label}
                    </span>
                    <action.icon size={20} />
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-pastel-ink text-white shadow-md"
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? t('close_actions') : t('open_actions')}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={26} /> : <Calendar size={26} />}
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
