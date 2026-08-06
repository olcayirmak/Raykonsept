// Faz 1'de oturum yok; ekranlar "hangi kullanıcı olarak bakıyoruz" bilgisini buradan alır.
// Faz 3'te bu liste gerçek kullanıcı tablosuna, seçici de gerçek oturuma dönüşecek.

// Type Imports
import type { Kullanici, Rol } from '@/types/rolTypes'

// Mimar kullanıcılarının id'leri secenekler.ts içindeki mimarlar listesiyle aynıdır;
// Musteri.sorumluMimarId bu id'lere işaret eder.
export const kullanicilar: Kullanici[] = [
  { id: 'y-1', ad: 'Olcay Irmak', rol: 'yonetici' },
  { id: 'y-2', ad: 'Buğra Erelel', rol: 'yonetici' },
  { id: 'm-1', ad: 'Beste Yardımcı', rol: 'mimar' },
  { id: 'm-2', ad: 'Berna Uz', rol: 'mimar' },
  { id: 'm-3', ad: 'Kaan Güneş', rol: 'mimar' },
  { id: 'a-1', ad: 'Yasin Yıldırım', rol: 'atolye-yoneticisi' },
  // Usta adı henüz verilmedi; yer tutucu.
  { id: 'u-1', ad: 'Usta 1', rol: 'usta' }
]

export const rolEtiketleri: Record<Rol, string> = {
  yonetici: 'Yönetici',
  mimar: 'Mimar',
  'atolye-yoneticisi': 'Atölye Yöneticisi',
  usta: 'Usta'
}

export const kullaniciBul = (id: string) => kullanicilar.find(kullanici => kullanici.id === id)
