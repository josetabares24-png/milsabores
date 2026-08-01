import { permanentRedirect } from 'next/navigation'

function localizedTarget(locale: string) {
  return locale === 'pt' ? '/menu#promocoes' : `/${locale}/menu#promocoes`
}

export default async function PromotionsRedirectPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  permanentRedirect(localizedTarget(locale))
}
