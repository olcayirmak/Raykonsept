// Next Imports
import type { Metadata } from 'next'

// Component Imports
import MailEkrani from '@views/mail/MailEkrani'

export const metadata: Metadata = {
  title: 'E-posta',
  robots: { index: false, follow: false }
}

const Page = () => <MailEkrani />

export default Page
