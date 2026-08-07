// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'
import type { Kullanici } from '@/types/rolTypes'

// Util Imports
import { fiyatGorebilir, whatsappGorebilir } from '@/utils/yetki'

// Menü role göre süzülür: e-posta ve tahsilat satış tarafına özeldir, atölye görmez.
const verticalMenuData = (kullanici: Kullanici): VerticalMenuDataType[] => {
  const menu: VerticalMenuDataType[] = [
    { label: 'Panel', href: '/home', icon: 'tabler-smart-home' },
    {
      label: 'Müşteriler',
      icon: 'tabler-users',
      children: [
        { label: 'Müşteri Listesi', href: '/musteriler', icon: 'tabler-list' },
        { label: 'Yeni Müşteri', href: '/musteriler/yeni', icon: 'tabler-user-plus' }
      ]
    },
    { label: 'Projeler', href: '/projeler', icon: 'tabler-briefcase' },
    { label: 'Randevular', href: '/randevular', icon: 'tabler-calendar-event' },
    { label: 'Ajanda', href: '/ajanda', icon: 'tabler-calendar' }
  ]

  if (fiyatGorebilir(kullanici)) {
    menu.push(
      { label: 'E-posta', href: '/mail', icon: 'tabler-mail' },
      { label: 'Tahsilat', href: '/tahsilat', icon: 'tabler-cash' }
    )
  }

  if (whatsappGorebilir(kullanici)) {
    menu.push({ label: 'WhatsApp', href: '/whatsapp', icon: 'tabler-brand-whatsapp' })
  }

  return menu
}

export default verticalMenuData
