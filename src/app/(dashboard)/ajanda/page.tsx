// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Ajanda from '@views/ajanda/Ajanda'

export const metadata: Metadata = {
  title: 'Ajanda',
  robots: { index: false, follow: false }
}

const Page = () => <Ajanda />

export default Page
