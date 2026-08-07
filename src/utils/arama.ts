// Hızlı arama (smart search) motoru. Arayüzden bağımsız, saf fonksiyonlar.
//
// İki karar burada kilitli, ekranda tekrar edilmez:
//
// 1) TÜRKÇE KATLAMA. Kullanıcı "ayse" yazınca "Ayşe Demirtaş" çıkmalı. Düz
//    toLowerCase Türkçede yanlış çalışır (I/ı, İ/i) ve şapkalı harfleri
//    eşleştirmez. Bu yüzden hem locale'li küçültme hem aksan katlama yapılır.
//
// 2) YETKİ. Sonuç listesi, yetkisiz veriye açılan en kolay kapıdır: ekranda
//    gizlenen bir müşteri aramada çıkarsa kural delinmiş olur. Bu yüzden
//    arama, ekranların kullandığı `gorunurMusteriler` süzgecinin AYNISINDAN
//    geçer ve fiyat alanları `fiyatGorebilir` false ise sonuç metnine hiç
//    KONMAZ (gizlenmez — üretilmez).

// Type Imports
import type { Musteri, Proje } from '@/types/musteriTypes'
import type { Kullanici } from '@/types/rolTypes'

// Data Imports
import { isTurleri, projeDurumEtiketi } from '@/data/secenekler'

// Util Imports
import { gorunurMusteriler, fiyatGorebilir } from '@/utils/yetki'
import { paraKisaYaz, telefonRakamlari } from '@/utils/bicim'

export type AramaTuru = 'musteri' | 'proje'

export type AramaSonucu = {
  tur: AramaTuru
  id: string
  baslik: string
  altBaslik: string
  href: string
}

/**
 * Karşılaştırma için metni sadeleştirir: Türkçe kurallarına göre küçültür,
 * ardından aksanları katlar (ş→s, ı→i, ğ→g, ç→c, ö→o, ü→u, â→a).
 * Böylece "cetinkaya" → "Çetinkaya", "ayse" → "Ayşe" eşleşir.
 */
export const sadelestir = (metin: string) =>
  metin
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    // Birleşik aksan işaretlerini at.
    .replace(/[̀-ͯ]/g, '')
    // NFD'nin ayıramadığı Türkçe harfler.
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')

/** Aranan terimin tüm kelimeleri, hedef metinlerin herhangi birinde geçiyor mu. */
const eslesiyorMu = (terim: string, alanlar: (string | undefined)[]) => {
  const hedef = alanlar.filter(Boolean).map(alan => sadelestir(alan as string)).join(' ')
  const kelimeler = sadelestir(terim).split(/\s+/).filter(Boolean)

  return kelimeler.length > 0 && kelimeler.every(kelime => hedef.includes(kelime))
}

/** Telefon aramasında boşluk/parantez fark etmesin: yalnız rakamlar karşılaştırılır. */
const telefonEslesiyorMu = (terim: string, telefon: string) => {
  const rakamlar = telefonRakamlari(terim)

  return rakamlar.length >= 3 && telefonRakamlari(telefon).includes(rakamlar)
}

const isTuruEtiketi = (deger: string) => isTurleri.find(secenek => secenek.deger === deger)?.etiket ?? deger

export type AramaKaynagi = {
  musteriler: Musteri[]
  projeler: Proje[]
}

/**
 * Terime uyan müşteri ve projeleri döner. Sonuçlar tür bazında sınırlandırılır
 * ki liste uzayıp kullanılamaz hale gelmesin.
 */
export const ara = (
  terim: string,
  kullanici: Kullanici,
  kaynak: AramaKaynagi,
  limit = 5
): AramaSonucu[] => {
  if (terim.trim().length < 2) return []

  // Ekranlarla aynı süzgeç: aramada görünen, listede de görünür.
  const izinliMusteriler = gorunurMusteriler(kullanici, kaynak.musteriler, kaynak.projeler)
  const izinliIdler = new Set(izinliMusteriler.map(musteri => musteri.id))
  const tutarGosterilir = fiyatGorebilir(kullanici)

  const musteriSonuclari: AramaSonucu[] = izinliMusteriler
    .filter(
      musteri =>
        eslesiyorMu(terim, [musteri.ad, musteri.yetkiliKisi, musteri.il, musteri.ilce, musteri.ePosta]) ||
        telefonEslesiyorMu(terim, musteri.telefon)
    )
    .slice(0, limit)
    .map(musteri => ({
      tur: 'musteri',
      id: musteri.id,
      baslik: musteri.ad,
      altBaslik: [musteri.ilce, musteri.il].filter(Boolean).join(' / ') || 'Konum belirtilmemiş',
      href: `/musteriler/${musteri.id}`
    }))

  const projeSonuclari: AramaSonucu[] = kaynak.projeler
    .filter(proje => izinliIdler.has(proje.musteriId))
    .filter(proje => {
      const musteri = kaynak.musteriler.find(kayit => kayit.id === proje.musteriId)
      const isTuruEtiketleri = proje.isTurleri.map(isTuruEtiketi)

      return eslesiyorMu(terim, [musteri?.ad, ...isTuruEtiketleri, projeDurumEtiketi(proje.durum), proje.mekanTipi])
    })
    .slice(0, limit)
    .map(proje => {
      const musteri = kaynak.musteriler.find(kayit => kayit.id === proje.musteriId)
      const isler = proje.isTurleri.map(isTuruEtiketi).join(', ')

      // Tutar yetkisizde GİZLENMEZ, hiç üretilmez.
      const tutar = tutarGosterilir && proje.sozlesmeTutari ? ` · ${paraKisaYaz(proje.sozlesmeTutari)}` : ''

      return {
        tur: 'proje' as const,
        id: proje.id,
        baslik: `${musteri?.ad ?? 'Bilinmeyen müşteri'} — ${isler}`,
        altBaslik: `${projeDurumEtiketi(proje.durum)}${tutar}`,
        href: `/projeler/${proje.id}`
      }
    })

  return [...musteriSonuclari, ...projeSonuclari]
}
