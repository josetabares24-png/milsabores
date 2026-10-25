import IntentPage from '@/components/IntentPage'

export default async function GelatoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <IntentPage locale={locale} page="gelato" />
}
