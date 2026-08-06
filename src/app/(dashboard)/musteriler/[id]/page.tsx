// Next Imports
import type { Metadata } from 'next'

// Component Imports
import MusteriDetay from '@views/musteriler/MusteriDetay'

export const metadata: Metadata = {
  title: 'Müşteri Detayı',
  robots: { index: false, follow: false }
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <MusteriDetay musteriId={id} />
}

export default Page
