// Panelin bütün sayıları burada hesaplanır. Widget'lar hesap yapmaz, buradan okur.
// Hepsi saf fonksiyon: aynı girdi → aynı çıktı, yan etkisiz.
//
// Rol kuralı: mimar yalnız kendi işini görür; fiyat yetkisi olmayan roller için
// para döndüren fonksiyonlar boş/sıfır döner (bkz. src/utils/yetki.ts).

// Type Imports
import type { Musteri, Proje, ProjeDurumu, SatisDurumu, UretimDurumu } from '@/types/musteriTypes'
import type { Odeme } from '@/types/odemeTypes'
import type { Randevu } from '@/types/randevuTypes'
import type { Kullanici } from '@/types/rolTypes'

// Data Imports
import { musteriler } from '@/data/musteriler'
import { odemeler } from '@/data/odemeler'
import { projeler } from '@/data/projeler'
import { randevular } from '@/data/randevular'

// Util Imports
import { fiyatGorebilir } from '@/utils/yetki'

// Aşama listeleri surec.ts'te tek yerde; ekranlar bunları ozet üzerinden de okuyabilsin.
import { satisDurumlari, uretimDurumlari, uretimdeMi } from '@/utils/surec'

export { satisDurumlari, uretimDurumlari, uretimdeMi }

export const bugun = () => new Date().toISOString().slice(0, 10)

// Mimar yalnız kendi satışını görür; atölye yöneticisi atölyeye düşmüş işleri.
const gorunurProjeler = (kullanici: Kullanici): Proje[] => {
  if (kullanici.rol === 'mimar') return projeler.filter(proje => proje.mimarId === kullanici.id)

  if (kullanici.rol === 'atolye-yoneticisi') return projeler.filter(proje => uretimdeMi(proje.durum))

  return projeler
}

export const kullanicininProjeleri = gorunurProjeler

const ayAnahtari = (isoTarih: string) => isoTarih.slice(0, 7)

/** Son 12 ayın sözleşme tutarı toplamı. Grafik serisi için ay ay döner. */
export const aylikSatis = (kullanici: Kullanici) => {
  const bosSeri: { ay: string; etiket: string; tutar: number }[] = []
  const simdi = new Date()

  for (let geri = 11; geri >= 0; geri--) {
    const tarih = new Date(simdi.getFullYear(), simdi.getMonth() - geri, 1)
    const ay = `${tarih.getFullYear()}-${String(tarih.getMonth() + 1).padStart(2, '0')}`

    bosSeri.push({
      ay,
      etiket: tarih.toLocaleDateString('tr-TR', { month: 'short' }),
      tutar: 0
    })
  }

  if (!fiyatGorebilir(kullanici)) return bosSeri

  gorunurProjeler(kullanici).forEach(proje => {
    if (!proje.sozlesmeTutari) return

    const kayit = bosSeri.find(satir => satir.ay === ayAnahtari(proje.olusturmaTarihi))

    if (kayit) kayit.tutar += proje.sozlesmeTutari
  })

  return bosSeri
}

export const buAyinSatisi = (kullanici: Kullanici) => {
  const seri = aylikSatis(kullanici)

  return seri[seri.length - 1]?.tutar ?? 0
}

export const gecenAyinSatisi = (kullanici: Kullanici) => {
  const seri = aylikSatis(kullanici)

  return seri[seri.length - 2]?.tutar ?? 0
}

/** Mimar başına satış toplamı, azalan sırada. */
export const mimarSatisSiralamasi = (kullanici: Kullanici) => {
  if (!fiyatGorebilir(kullanici)) return []

  const toplamlar = new Map<string, { tutar: number; adet: number }>()

  projeler.forEach(proje => {
    if (!proje.sozlesmeTutari) return

    const mevcut = toplamlar.get(proje.mimarId) ?? { tutar: 0, adet: 0 }

    toplamlar.set(proje.mimarId, { tutar: mevcut.tutar + proje.sozlesmeTutari, adet: mevcut.adet + 1 })
  })

  return [...toplamlar.entries()]
    .map(([mimarId, deger]) => ({ mimarId, ...deger }))
    .sort((a, b) => b.tutar - a.tutar)
}

/** Proje sayısı ve toplam ciroya göre en çok iş yapan müşteriler. */
export const enCokIsYapanMusteriler = (kullanici: Kullanici, adet = 5) => {
  const toplamlar = new Map<string, { projeSayisi: number; tutar: number }>()

  gorunurProjeler(kullanici).forEach(proje => {
    const mevcut = toplamlar.get(proje.musteriId) ?? { projeSayisi: 0, tutar: 0 }

    toplamlar.set(proje.musteriId, {
      projeSayisi: mevcut.projeSayisi + 1,
      tutar: mevcut.tutar + (proje.sozlesmeTutari ?? 0)
    })
  })

  return [...toplamlar.entries()]
    .map(([musteriId, deger]) => ({
      musteri: musteriler.find(kayit => kayit.id === musteriId),
      ...deger
    }))
    .filter((satir): satir is { musteri: Musteri; projeSayisi: number; tutar: number } => Boolean(satir.musteri))
    .sort((a, b) => b.tutar - a.tutar || b.projeSayisi - a.projeSayisi)
    .slice(0, adet)
}

export type BekleyenTahsilat = {
  odeme: Odeme
  proje: Proje
  musteri?: Musteri
  gecikmeGunu: number
}

/** Tahsil edilmemiş ödemeler; vadesi geçenler önce. Gecikme tarihten türetilir. */
export const bekleyenTahsilatlar = (kullanici: Kullanici): BekleyenTahsilat[] => {
  if (!fiyatGorebilir(kullanici)) return []

  const izinliProjeIdleri = new Set(gorunurProjeler(kullanici).map(proje => proje.id))
  const simdi = bugun()

  return odemeler
    .filter(odeme => !odeme.odemeTarihi && izinliProjeIdleri.has(odeme.projeId))
    .map(odeme => {
      const proje = projeler.find(kayit => kayit.id === odeme.projeId)!
      const gecikmeGunu =
        odeme.vadeTarihi < simdi
          ? Math.floor((Date.parse(simdi) - Date.parse(odeme.vadeTarihi)) / 86400000)
          : 0

      return {
        odeme,
        proje,
        musteri: musteriler.find(kayit => kayit.id === proje.musteriId),
        gecikmeGunu
      }
    })
    .sort((a, b) => b.gecikmeGunu - a.gecikmeGunu || a.odeme.vadeTarihi.localeCompare(b.odeme.vadeTarihi))
}

export const bekleyenTahsilatToplami = (kullanici: Kullanici) =>
  bekleyenTahsilatlar(kullanici).reduce((toplam, satir) => toplam + satir.odeme.tutar, 0)

export const gecikenTahsilatToplami = (kullanici: Kullanici) =>
  bekleyenTahsilatlar(kullanici)
    .filter(satir => satir.gecikmeGunu > 0)
    .reduce((toplam, satir) => toplam + satir.odeme.tutar, 0)

/** Kullanıcının görmeye yetkili olduğu randevular. Randevu görünürlük kuralı
 *  YALNIZCA burada tanımlıdır; ekranlar bu kuralı kendi içinde tekrarlamaz. */
export const gorunurRandevular = (kullanici: Kullanici): Randevu[] => {
  if (kullanici.rol === 'mimar') return randevular.filter(randevu => randevu.mimarId === kullanici.id)

  // Atölye yalnız montaj randevularını görür.
  if (kullanici.rol === 'atolye-yoneticisi') {
    return randevular.filter(randevu => randevu.tip === 'montaj')
  }

  return randevular
}

export type YaklasanRandevu = {
  randevu: Randevu
  musteri?: Musteri
}

/** Önümüzdeki N gün içindeki planlanmış randevular, tarihe göre artan. */
export const yaklasanRandevular = (kullanici: Kullanici, gunSayisi = 14): YaklasanRandevu[] => {
  const simdi = bugun()
  const sinir = new Date(Date.parse(simdi) + gunSayisi * 86400000).toISOString().slice(0, 10)

  return gorunurRandevular(kullanici)
    .filter(randevu => {
      if (randevu.durum !== 'planlandi') return false

      const gun = randevu.tarih.slice(0, 10)

      return gun >= simdi && gun <= sinir
    })
    .sort((a, b) => a.tarih.localeCompare(b.tarih))
    .map(randevu => ({ randevu, musteri: musteriler.find(kayit => kayit.id === randevu.musteriId) }))
}

/** Teklifi müşteride bekleyen projeler. */
export const onaydaBekleyenProjeler = (kullanici: Kullanici) =>
  gorunurProjeler(kullanici).filter(proje => proje.durum === 'kesin-teklif' || proje.durum === 'revizyon')

export const pipelineDagilimi = (kullanici: Kullanici) =>
  satisDurumlari.map(durum => ({
    durum,
    adet: gorunurProjeler(kullanici).filter(proje => proje.durum === durum).length
  }))

export const uretimOzeti = (kullanici: Kullanici) =>
  uretimDurumlari.map(durum => ({
    durum,
    adet: gorunurProjeler(kullanici).filter(proje => proje.durum === durum).length
  }))

export const kaynakDagilimi = (kullanici: Kullanici) => {
  const izinliMusteriIdleri = new Set(gorunurProjeler(kullanici).map(proje => proje.musteriId))
  const sayac = new Map<string, number>()

  musteriler
    .filter(musteri => kullanici.rol !== 'mimar' || izinliMusteriIdleri.has(musteri.id))
    .forEach(musteri => {
      if (!musteri.kaynak) return

      sayac.set(musteri.kaynak, (sayac.get(musteri.kaynak) ?? 0) + 1)
    })

  return [...sayac.entries()].map(([kaynak, adet]) => ({ kaynak, adet })).sort((a, b) => b.adet - a.adet)
}

export const aktifProjeSayisi = (kullanici: Kullanici) =>
  gorunurProjeler(kullanici).filter(proje => proje.durum !== 'tamamlandi').length

export const yeniTalepSayisi = (kullanici: Kullanici) =>
  gorunurProjeler(kullanici).filter(proje => proje.durum === 'yeni-talep').length

/** Yüzde değişim; önceki dönem sıfırsa 0 döner (bölme hatası yerine). */
export const yuzdeDegisim = (simdiki: number, onceki: number) =>
  onceki === 0 ? 0 : Math.round(((simdiki - onceki) / onceki) * 100)
