// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Login from '@views/Login'

export const metadata: Metadata = {
  title: 'Giriş',
  description: 'Ray Konsept mimar paneline giriş yapın.'
}

const LoginPage = () => {
  return <Login />
}

export default LoginPage
