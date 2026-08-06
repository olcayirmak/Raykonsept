// Next Imports
import type { Metadata } from 'next'

// Component Imports
import ProjeListesi from '@views/projeler/ProjeListesi'

export const metadata: Metadata = {
  title: 'Projeler',
  robots: { index: false, follow: false }
}

const Page = () => <ProjeListesi />

export default Page
