import { permanentRedirect } from 'next/navigation'

function localizedTarget(locale: string) {
  return locale === 'pt' ? '/menu#gelados' : `/${locale}/menu#gelados`
}

export default async function GeladosRedirectPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  permanentRedirect(localizedTarget(locale))
}
