import IntentPage from '@/components/IntentPage'

export default async function BurgersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <IntentPage locale={locale} page="burgers" />
}
