// Next Imports
import type { Metadata } from 'next'

// Component Imports
import YeniMusteriForm from '@views/musteriler/YeniMusteriForm'

export const metadata: Metadata = {
  title: 'Yeni Müşteri',
  robots: { index: false, follow: false }
}

const Page = () => <YeniMusteriForm />

export default Page
