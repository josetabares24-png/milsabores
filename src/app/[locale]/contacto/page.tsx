'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Mail, MapPin, Clock, Phone, Instagram, CheckCircle2, AlertCircle, Star } from 'lucide-react'
import { isValidEmail } from '@/lib/validation'
import Logo from '@/components/Logo'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const t = useTranslations('contact')
  const tCommon = useTranslations('common')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isValidEmail(formData.email)) {
      setError(t('form.invalid_email'))
      return
    }

    setIsSubmitting(true)
    try {
      // Get current locale from URL
      const locale = window.location.pathname.split('/')[1] || 'pt'

      // Call API to send contact message
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setIsSubmitted(true)
    } catch (err) {
      console.error('Error submitting contact form:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try emailing us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-24 h-24 bg-sage rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-sage/40">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate mb-6">
            {t('success.title')}
          </h1>
          <p className="text-slate/60 text-xl mb-12">
            {t('success.message')}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="inline-block px-10 py-4 bg-pastel text-white font-bold rounded-full hover:bg-amber-500 transition-all shadow-lg shadow-pastel/30 hover:scale-105"
          >
            {t('success.back')}
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
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
              <Mail className="text-pastel" size={20} />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-slate font-bold mb-2">
                    {t('form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t('form.name_placeholder')}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate/20 focus:border-pastel outline-none transition-colors text-slate placeholder:text-slate/40"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-slate font-bold mb-2">
                    {t('form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('form.email_placeholder')}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate/20 focus:border-pastel outline-none transition-colors text-slate placeholder:text-slate/40"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-slate font-bold mb-2">
                    {t('form.subject')} *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate/20 focus:border-pastel outline-none transition-colors text-slate bg-white"
                  >
                    <option value="" disabled>{t('form.subject_placeholder')}</option>
                    <option value="general">{t('form.subject_options.general')}</option>
                    <option value="proposal">{t('form.subject_options.proposal')}</option>
                    <option value="distributor">{t('form.subject_options.distributor')}</option>
                    <option value="cv">{t('form.subject_options.cv')}</option>
                    <option value="reservation">{t('form.subject_options.reservation')}</option>
                    <option value="complaint">{t('form.subject_options.complaint')}</option>
                    <option value="other">{t('form.subject_options.other')}</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-slate font-bold mb-2">
                    {t('form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder={t('form.message_placeholder')}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate/20 focus:border-pastel outline-none transition-colors text-slate placeholder:text-slate/40 resize-none"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                    <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-10 py-5 bg-gradient-to-r from-pastel to-amber-500 text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-pastel/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Map */}
            <div className="relative h-[400px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-pastel/10 to-transparent z-10 pointer-events-none" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.9894239267636!2d-9.139228123485994!3d38.71130547171585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19347eb7bcb3cb%3A0x9b5a5e5c5d5e5f5!2sRua%20da%20Prata%20152%2C%201100-420%20Lisboa%2C%20Portugal!5e0!3m2!1sen!2spt!4v1706000000000!5m2!1sen!2spt"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mil Sabores Lisboa - Rua da Prata 152"
              />
              {/* View on Google Maps overlay button */}
              <a
                href="https://maps.app.goo.gl/5QmYkV2uUZrYCLT9A"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-20 px-6 py-3 bg-white/95 backdrop-blur-md text-slate font-bold rounded-full shadow-xl hover:bg-white hover:scale-105 transition-all border-2 border-white/50"
              >
                <MapPin size={18} className="inline mr-2" />
                Ver en Google Maps
              </a>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {/* Address */}
              <div className="bg-white border-2 border-sage/30 rounded-2xl p-6 hover:border-sage hover:shadow-lg transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-sage/30 transition-colors">
                    <MapPin size={24} className="text-sage" />
                  </div>
                  <div>
                    <h3 className="text-slate font-bold text-lg mb-2">
                      {t('info.address.title')}
                    </h3>
                    <p className="text-slate/60 leading-relaxed">
                      {t('info.address.line1')}<br />
                      {t('info.address.line2')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white border-2 border-pastel/30 rounded-2xl p-6 hover:border-pastel hover:shadow-lg transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pastel/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-pastel/30 transition-colors">
                    <Clock size={24} className="text-pastel" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate font-bold text-lg mb-2">
                      {t('info.hours.title')}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-slate/60">{t('info.hours.weekday')}</p>
                      <p className="text-slate/60">{t('info.hours.weekend')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white border-2 border-steel/30 rounded-2xl p-6 hover:border-steel hover:shadow-lg transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-steel/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-steel/30 transition-colors">
                    <Phone size={24} className="text-steel" />
                  </div>
                  <div>
                    <h3 className="text-slate font-bold text-lg mb-2">
                      {t('info.contact_info.title')}
                    </h3>
                    <div className="space-y-1">
                      <a
                        href={`tel:${t('info.contact_info.phone')}`}
                        className="block text-slate/60 hover:text-steel transition-colors font-medium"
                      >
                        {t('info.contact_info.phone')}
                      </a>
                      <a
                        href={`mailto:${t('info.contact_info.email')}`}
                        className="block text-slate/60 hover:text-steel transition-colors font-medium"
                      >
                        {t('info.contact_info.email')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20 rounded-2xl p-6">
                <h3 className="text-slate font-bold text-lg mb-4">
                  {t('info.social.title')}
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/milsaboreslx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
                  >
                    <Instagram size={20} />
                    {t('info.social.instagram')}
                  </a>
                  <a
                    href="https://www.tripadvisor.es/Restaurant_Review-g189158-d21297136-Reviews-Mil_Sabores-Lisbon_Lisbon_District_Central_Portugal.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-white text-slate font-bold rounded-full border-2 border-slate/20 hover:border-slate hover:scale-105 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Star size={20} />
                    {t('info.social.tripadvisor')}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
