'use client'

import { useEffect } from 'react'
import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_KEY } from '@/lib/analytics-consent'

/**
 * GA4 for Be-Wide: basic Google Consent Mode v2.
 * Google's scripts are never requested until the visitor opts in.
 * This is intentionally separate from cookieless Vercel Analytics.
 *
 * Do not also install GA4 through Google Tag Manager: that would duplicate hits.
 */
const GA4_ID = 'G-5T267L0374'
const SCRIPT_ID = 'mil-sabores-ga4'

declare global {
  interface Window {
    dataLayer: IArguments[]
    gtag?: (...args: unknown[]) => void
  }
}

export default function GoogleAnalyticsConsent() {
  useEffect(() => {
    const loadIfAllowed = () => {
      if (window.localStorage.getItem(COOKIE_CONSENT_KEY) !== 'accepted') return
      if (document.getElementById(SCRIPT_ID)) return

      window.dataLayer = window.dataLayer || []
      window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments)
      }

      // Default denial and explicit approval precede GA4 configuration.
      window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
      window.gtag('js', new Date())
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
      window.gtag('config', GA4_ID)

      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
      document.head.appendChild(script)
    }

    loadIfAllowed()
    window.addEventListener(COOKIE_CONSENT_EVENT, loadIfAllowed)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, loadIfAllowed)
  }, [])

  return null
}
