import { permanentRedirect } from 'next/navigation'

function localizedTarget(locale: string) {
  return locale === 'pt' ? '/reservas#contacto' : `/${locale}/reservas#contacto`
}

export default async function ContactRedirectPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  permanentRedirect(localizedTarget(locale))
}
