'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Calendar, Users, Phone, CheckCircle2, Info } from 'lucide-react'
import Logo from '@/components/Logo'

function useRecentBookings() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    // More bookings during peak hours (10-14), fewer early/late
    const baseCount = hour >= 10 && hour <= 14 ? 8 : hour >= 8 && hour <= 17 ? 5 : 3
    const count = baseCount + Math.floor(Math.random() * 7)

    const messages = [
      `${count} personas reservaron en las ultimas 2 horas`,
      `${count} reservas confirmadas hoy`,
      `${count} mesas reservadas para hoy`,
      `${count} personas ya reservaron esta semana`,
    ]
    setMessage(messages[Math.floor(Math.random() * messages.length)])
  }, [])

  return message
}

export default function ReservationsPage() {
  const t = useTranslations('reservations')
  const recentBookings = useRecentBookings()

  useEffect(() => {
    // Load Resmio widget script
    const existingScript = document.querySelector('script[src*="resmio.com"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = '//static.resmio.com/static/pt/widget.js#id=mil-sabores&height=600&width=100%25&fontSize=16px'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center gap-4 mb-6">
            <Logo size="lg" colorFilter="pastel" />
            <div className="inline-flex items-center gap-2 bg-pastel/10 px-6 py-3 rounded-full">
              <Calendar className="text-pastel" size={20} />
              <span className="text-pastel text-sm font-bold tracking-widest uppercase">
                {t('eyebrow')}
              </span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate mb-6">
            {t('title')}
          </h1>
          <p className="text-slate/60 text-xl max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Urgency Notification */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="bg-gradient-to-r from-sage/20 via-sage/10 to-sage/20 border-2 border-sage/30 rounded-2xl p-4 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-3 h-3 bg-sage rounded-full"></div>
                <div className="absolute inset-0 w-3 h-3 bg-sage rounded-full animate-ping"></div>
              </div>
              <Users className="text-sage" size={20} />
            </div>
            <p className="text-sage font-semibold text-sm md:text-base">
              {recentBookings}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Resmio Widget */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-white via-white to-pastel/5 rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-white relative overflow-hidden">
              {/* Premium Badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-br from-pastel to-amber-500 text-white px-6 py-2 rounded-bl-3xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold">{t('form.limited_availability')}</span>
                </div>
              </div>

              {/* Resmio Widget Container */}
              <div className="mt-6">
                <div id="resmio-mil-sabores" className="min-h-[600px] w-full [&>div]:!w-full [&>div]:!max-w-full [&_iframe]:!w-full">
                  {/* Loading state while widget loads */}
                  <div className="text-center text-slate/40">
                    <div className="w-8 h-8 border-3 border-pastel/30 border-t-pastel rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-sm">{t('form.submitting')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-pastel/10 to-peach/10 rounded-3xl p-8 border-2 border-pastel/20">
              <h3 className="text-xl font-bold text-slate mb-2">
                {t('quick_actions.title')}
              </h3>
              <p className="text-slate/60 mb-6">
                {t('quick_actions.subtitle')}
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+351213470214"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-pastel text-white font-bold rounded-full hover:bg-amber-500 transition-all shadow-lg shadow-pastel/30 hover:scale-105"
                >
                  <Phone size={20} />
                  {t('quick_actions.call')}
                </a>
              </div>
            </div>

            {/* Good to Know */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-slate/10">
              <h3 className="text-xl font-bold text-slate mb-4 flex items-center gap-2">
                <Info size={20} className="text-pastel" />
                {t('info.title')}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate text-sm mb-1">{t('info.punctuality.title')}</h4>
                  <p className="text-slate/70 text-sm leading-relaxed">{t('info.punctuality.text')}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate text-sm mb-1">{t('info.seating.title')}</h4>
                  <p className="text-slate/70 text-sm leading-relaxed">{t('info.seating.text')}</p>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-slate/10">
              <h3 className="text-xl font-bold text-slate mb-4">
                {t('policy.title')}
              </h3>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((num) => (
                  <li key={num} className="flex items-start gap-3">
                    <CheckCircle2 className="text-sage flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate/80 text-sm leading-relaxed">
                      {t(`policy.items.${num}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <h2 className="text-4xl font-bold text-slate text-center mb-12">
            {t('faq.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((num, index) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg border-2 border-slate/10 hover:border-pastel/30 hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold text-slate mb-3">
                  {t(`faq.items.${num}.q`)}
                </h3>
                <p className="text-slate/70 leading-relaxed">
                  {t(`faq.items.${num}.a`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
