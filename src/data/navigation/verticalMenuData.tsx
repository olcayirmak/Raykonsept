// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'
import type { Kullanici } from '@/types/rolTypes'

// Util Imports
import { fiyatGorebilir, musteriListesiGorebilir } from '@/utils/yetki'

// Menü role göre süzülür: usta müşteri ekranlarına girmez, üretim rolleri tahsilat görmez.
const verticalMenuData = (kullanici: Kullanici): VerticalMenuDataType[] => {
  const menu: VerticalMenuDataType[] = [
    {
      label: 'Panel',
      href: '/home',
      icon: 'tabler-smart-home'
    }
  ]

  if (musteriListesiGorebilir(kullanici)) {
    menu.push({
      label: 'Müşteriler',
      icon: 'tabler-users',
      children: [
        { label: 'Müşteri Listesi', href: '/musteriler', icon: 'tabler-list' },
        { label: 'Yeni Müşteri', href: '/musteriler/yeni', icon: 'tabler-user-plus' }
      ]
    })
  }

  menu.push(
    { label: 'Projeler', href: '/projeler', icon: 'tabler-briefcase' },
    { label: 'Randevular', href: '/randevular', icon: 'tabler-calendar-event' }
  )

  if (fiyatGorebilir(kullanici)) {
    menu.push({ label: 'Tahsilat', href: '/tahsilat', icon: 'tabler-cash' })
  }

  return menu
}

export default verticalMenuData
