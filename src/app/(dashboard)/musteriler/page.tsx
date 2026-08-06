// Next Imports
import type { Metadata } from 'next'

// Component Imports
import MusteriListesi from '@views/musteriler/MusteriListesi'

export const metadata: Metadata = {
  title: 'Müşteriler',
  robots: { index: false, follow: false }
}

const Page = () => <MusteriListesi />

export default Page
