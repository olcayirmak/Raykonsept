// Next Imports
import type { Metadata } from 'next'

// Component Imports
import ProjeDetay from '@views/projeler/ProjeDetay'

export const metadata: Metadata = {
  title: 'Proje Detayı',
  robots: { index: false, follow: false }
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <ProjeDetay projeId={id} />
}

export default Page
