// Next Imports
import type { Metadata } from 'next'

// Component Imports
import TahsilatListesi from '@views/tahsilat/TahsilatListesi'

export const metadata: Metadata = {
  title: 'Tahsilat',
  robots: { index: false, follow: false }
}

const Page = () => <TahsilatListesi />

export default Page
