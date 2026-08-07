// Rol kuralları tek yerde. Ekranlar `if (rol === 'mimar')` yazmaz, buradaki
// fonksiyonları sorar — kural değişince tek dosya değişir.
//
// Faz 3'te bu fonksiyonlar sunucu tarafında da çağrılacak; şu an yalnız arayüzü
// kısıtlıyorlar, gerçek koruma değiller.

// Type Imports
import type { Musteri, Proje } from '@/types/musteriTypes'
import type { Kullanici } from '@/types/rolTypes'

// Util Imports
import { uretimdeMi } from '@/utils/surec'

// Mimar tüm müşterileri görür; atölye yöneticisi yalnızca atölyeye düşmüş işi olanları.
// Atölye müşteriyi görmeli: teslim adresi, iletişim ve montaj planı buna bağlı.
export const gorunurMusteriler = (kullanici: Kullanici, musteriler: Musteri[], projeler: Proje[]) => {
  if (kullanici.rol === 'atolye-yoneticisi') {
    const uretimdekiMusteriIdleri = new Set(
      projeler.filter(proje => uretimdeMi(proje.durum)).map(proje => proje.musteriId)
    )

    return musteriler.filter(musteri => uretimdekiMusteriIdleri.has(musteri.id))
  }

  return musteriler
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

// WhatsApp şirket hattı satış tarafına aittir: yönetici ve mimarlar görür.
// Atölye yöneticisi görmez — müşteriyle fiyat/teklif yazışması buradan geçer.
export const whatsappGorebilir = (kullanici: Kullanici) =>
  kullanici.rol === 'yonetici' || kullanici.rol === 'mimar'

// Prim kişisel özlük bilgisidir; mimar yalnızca kendi primini görür.
export const primGorebilir = (kullanici: Kullanici, mimarId: string) => {
  if (kullanici.rol === 'yonetici') return true

  return kullanici.rol === 'mimar' && kullanici.id === mimarId
}

export const uretimDurumuDegistirebilir = (kullanici: Kullanici) =>
  kullanici.rol === 'yonetici' || kullanici.rol === 'atolye-yoneticisi'
