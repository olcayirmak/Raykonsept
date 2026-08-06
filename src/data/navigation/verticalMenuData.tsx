// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Panel',
    href: '/home',
    icon: 'tabler-smart-home'
  },
  {
    label: 'Müşteriler',
    icon: 'tabler-users',
    children: [
      {
        label: 'Müşteri Listesi',
        href: '/musteriler',
        icon: 'tabler-list'
      },
      {
        label: 'Yeni Müşteri',
        href: '/musteriler/yeni',
        icon: 'tabler-user-plus'
      }
    ]
  }
]

export default verticalMenuData
