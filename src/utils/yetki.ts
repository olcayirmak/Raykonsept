// Rol kuralları tek yerde. Ekranlar `if (rol === 'mimar')` yazmaz, buradaki
// fonksiyonları sorar — kural değişince tek dosya değişir.
//
// Faz 3'te bu fonksiyonlar sunucu tarafında da çağrılacak; şu an yalnız arayüzü
// kısıtlıyorlar, gerçek koruma değiller.

// Type Imports
import type { Musteri, Proje } from '@/types/musteriTypes'
import type { Kullanici } from '@/types/rolTypes'

// Üretime devredilmiş sayılan proje durumları.
const uretimDurumlari: Proje['durum'][] = ['uretime-devredildi']

export const musteriListesiGorebilir = (kullanici: Kullanici) => kullanici.rol !== 'usta'

// Mimar tüm müşterileri görür; atölye yöneticisi yalnızca üretime devredilmiş işi olanları.
export const gorunurMusteriler = (kullanici: Kullanici, musteriler: Musteri[], projeler: Proje[]) => {
  if (kullanici.rol === 'yonetici' || kullanici.rol === 'mimar') return musteriler

  if (kullanici.rol === 'atolye-yoneticisi') {
    const uretimdekiMusteriIdleri = new Set(
      projeler.filter(proje => uretimDurumlari.includes(proje.durum)).map(proje => proje.musteriId)
    )

    return musteriler.filter(musteri => uretimdekiMusteriIdleri.has(musteri.id))
  }

  return []
}

// Mimar yalnızca kendi müşterisini düzenler; başkasınınkini görür ama değiştiremez.
export const musteriDuzenleyebilir = (kullanici: Kullanici, musteri: Musteri) => {
  if (kullanici.rol === 'yonetici') return true

  if (kullanici.rol === 'mimar') return musteri.sorumluMimarId === kullanici.id

  return false
}

export const musteriEkleyebilir = (kullanici: Kullanici) =>
  kullanici.rol === 'yonetici' || kullanici.rol === 'mimar'

// Fiyat, teklif ve sözleşme tutarları üretim tarafına kapalı.
export const fiyatGorebilir = (kullanici: Kullanici) =>
  kullanici.rol === 'yonetici' || kullanici.rol === 'mimar'

// Prim kişisel özlük bilgisidir; mimar yalnızca kendi primini görür.
export const primGorebilir = (kullanici: Kullanici, mimarId: string) => {
  if (kullanici.rol === 'yonetici') return true

  return kullanici.rol === 'mimar' && kullanici.id === mimarId
}

export const uretimDurumuDegistirebilir = (kullanici: Kullanici) =>
  kullanici.rol === 'yonetici' || kullanici.rol === 'atolye-yoneticisi'
