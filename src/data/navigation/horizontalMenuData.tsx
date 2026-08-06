// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'

const horizontalMenuData = (): HorizontalMenuDataType[] => [
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

export default horizontalMenuData
