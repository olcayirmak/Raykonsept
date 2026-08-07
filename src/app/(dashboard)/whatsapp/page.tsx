// Next Imports
import type { Metadata } from 'next'

// Component Imports
import WhatsappEkrani from '@views/whatsapp/WhatsappEkrani'

export const metadata: Metadata = {
  title: 'WhatsApp',
  robots: { index: false, follow: false }
}

const Page = () => <WhatsappEkrani />

export default Page
