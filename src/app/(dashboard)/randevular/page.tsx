// Next Imports
import type { Metadata } from 'next'

// Component Imports
import RandevuListesi from '@views/randevular/RandevuListesi'

export const metadata: Metadata = {
  title: 'Randevular',
  robots: { index: false, follow: false }
}

const Page = () => <RandevuListesi />

export default Page
