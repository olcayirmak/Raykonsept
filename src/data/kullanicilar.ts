// Faz 1'de oturum yok; ekranlar "hangi kullanıcı olarak bakıyoruz" bilgisini buradan alır.
// Faz 3'te bu liste gerçek kullanıcı tablosuna, seçici de gerçek oturuma dönüşecek.

// Type Imports
import type { Kullanici, Rol } from '@/types/rolTypes'

// Mimar kullanıcılarının id'leri secenekler.ts içindeki mimarlar listesiyle aynıdır;
// Musteri.sorumluMimarId bu id'lere işaret eder.
export const kullanicilar: Kullanici[] = [
  { id: 'y-1', ad: 'Serkan Ray', rol: 'yonetici' },
  { id: 'm-1', ad: 'Elif Yıldırım', rol: 'mimar' },
  { id: 'm-2', ad: 'Burak Şahin', rol: 'mimar' },
  { id: 'a-1', ad: 'Hasan Çetin', rol: 'atolye-yoneticisi' },
  { id: 'u-1', ad: 'Mehmet Kaya', rol: 'usta' }
]

export const rolEtiketleri: Record<Rol, string> = {
  yonetici: 'Yönetici',
  mimar: 'Mimar',
  'atolye-yoneticisi': 'Atölye Yöneticisi',
  usta: 'Usta'
}

export const kullaniciBul = (id: string) => kullanicilar.find(kullanici => kullanici.id === id)
