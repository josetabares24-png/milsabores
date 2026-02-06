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
      color: 'from-mango to-amber-500',
      delay: 0.1,
    },
    {
      icon: Phone,
      label: t('call'),
      href: 'tel:+351213470214',
      color: 'from-steel to-blue-500',
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
            {actions.map((action, index) => (
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-4 py-3 bg-gradient-to-r ${action.color} text-white rounded-full shadow-2xl hover:scale-105 transition-transform`}
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
                    className={`flex items-center gap-3 px-4 py-3 bg-gradient-to-r ${action.color} text-white rounded-full shadow-2xl hover:scale-105 transition-transform`}
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
        className={`w-16 h-16 rounded-full bg-gradient-to-r from-mango to-amber-500 text-white shadow-2xl hover:shadow-mango/50 flex items-center justify-center transition-all ${
          isOpen ? 'rotate-45' : ''
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? <X size={28} /> : <Calendar size={28} />}
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
