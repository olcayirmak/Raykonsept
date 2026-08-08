// WhatsApp şirket hattının aylık performans hesapları. ozet.ts'in muadili:
// widget hesap yapmaz, buradan okur. Hepsi saf fonksiyon — ay parametre olarak
// geçilir, içeride new Date() çağrılmaz ki test edilebilsin.
//
// Üç karar burada kilitli:
//
// 1) ÖLÇÜ BİRİMİ "KAÇ MÜŞTERİ", "KAÇ MESAJ" DEĞİL. Mesaj sayısı yanlış teşvik
//    üretir: kısa kısa on mesaj yazan, tek seferde derdi çözenden önde görünür.
//    Sıralama farklı müşteri sayısına göre yapılır; mesaj adedi yalnızca
//    ikincil bilgi olarak taşınır.
//
// 2) CEVAPSIZ TALEP KİŞİYE YAZILMAZ. Ortak hatta bir talebin cevapsız kalması
//    ekibin ortak eksiğidir; kimsenin hanesine borç yazılmaz. Bu yüzden
//    cevapsız sayısı takım geneli tek sayıdır.
//
// 3) MOTİVASYON MESAJI YALNIZ KİŞİNİN KENDİSİNE GÖSTERİLİR. Sıralama herkese
//    açık (rekabet istendi), ama "geride kalıyorsun" cümlesi başkasının
//    satırında etiket olarak durmaz.

// Type Imports
import type { Kullanici } from '@/types/rolTypes'
import type { WhatsappMesaj, WhatsappSohbet } from '@/types/whatsappTypes'

// Data Imports
import { kullanicilar } from '@/data/kullanicilar'
import { whatsappMesajlar, whatsappSohbetler } from '@/data/whatsapp'

// Util Imports
import { cevapsizSohbetler } from '@/utils/whatsapp'

export type CevapSatiri = {
  kullaniciId: string
  ad: string
  /** O ay en az bir cevap yazdığı farklı müşteri sayısı. Sıralama ölçüsü budur. */
  musteriAdedi: number
  /** İkincil bilgi; sıralamayı belirlemez. */
  mesajAdedi: number
}

/** '2026-08-08' ya da '2026-08-08T10:15' → '2026-08' */
export const ayAnahtari = (tarih: string) => tarih.slice(0, 7)

/**
 * Verilen ayda her mimarın kaç farklı müşteriye cevap yazdığı, azalan sırada.
 * Hiç cevap yazmamış mimar da 0 ile listede kalır — sıralamadan düşmez, yoksa
 * "geride kalan" hiç görünmez.
 */
export const aylikCevapSiralamasi = (
  ay: string,
  sohbetler: WhatsappSohbet[] = whatsappSohbetler,
  mesajlar: WhatsappMesaj[] = whatsappMesajlar,
  ekip: Kullanici[] = kullanicilar
): CevapSatiri[] => {
  const ayinGidenleri = mesajlar.filter(
    mesaj => mesaj.yon === 'giden' && ayAnahtari(mesaj.tarih) === ay && mesaj.gonderenKullaniciId
  )

  const sohbetSahibi = new Map(sohbetler.map(sohbet => [sohbet.id, sohbet]))

  return ekip
    // Sıralama YALNIZ mimarlara aittir. Yönetici de hatta cevap yazabilir ama
    // bu onun asıl işi değil; listeye 0'la girince hem ekip ortalamasını aşağı
    // çeker hem yapmadığı bir iş için "geride" damgası yer.
    .filter(kisi => kisi.rol === 'mimar')
    .map(kisi => {
      const kendiMesajlari = ayinGidenleri.filter(mesaj => mesaj.gonderenKullaniciId === kisi.id)

      // Aynı müşteriye on mesaj yazmak bir müşteri sayılır.
      const musteriler = new Set(
        kendiMesajlari.map(mesaj => {
          const sohbet = sohbetSahibi.get(mesaj.sohbetId)

          // Sisteme kayıtlı değilse sohbetin kendisi müşteri yerine geçer.
          return sohbet?.musteriId ?? mesaj.sohbetId
        })
      )

      return {
        kullaniciId: kisi.id,
        ad: kisi.ad,
        musteriAdedi: musteriler.size,
        mesajAdedi: kendiMesajlari.length
      }
    })
    .sort((a, b) => b.musteriAdedi - a.musteriAdedi || b.mesajAdedi - a.mesajAdedi)
}

/** Takımın ortak eksiği: son sözü müşteride kalmış talepler. */
export const cevapsizTalepAdedi = (
  sohbetler: WhatsappSohbet[] = whatsappSohbetler,
  mesajlar: WhatsappMesaj[] = whatsappMesajlar
) => cevapsizSohbetler(sohbetler, mesajlar).length

export type MotivasyonTonu = 'zirve' | 'iyi' | 'geride' | 'baslangic'

export type Motivasyon = {
  ton: MotivasyonTonu
  baslik: string
  mesaj: string
}

/**
 * Kişinin kendi durumuna göre motivasyon metni. Sıralamadaki yeri değil,
 * ortalamaya göre konumu esas alınır: üç kişilik listede ikinci olmak
 * "geride" demek değildir.
 *
 * Kullanıcı sıralamada yoksa (ör. atölye yöneticisi) null döner.
 */
export const motivasyonMesaji = (siralama: CevapSatiri[], kullaniciId: string): Motivasyon | null => {
  const satir = siralama.find(kayit => kayit.kullaniciId === kullaniciId)

  if (!satir) return null

  const toplam = siralama.reduce((t, kayit) => t + kayit.musteriAdedi, 0)

  if (toplam === 0) {
    return {
      ton: 'baslangic',
      baslik: 'Ay yeni başladı',
      mesaj: 'Bu ay henüz WhatsApp üzerinden cevap yazılmadı. İlk dönüşü sen yapabilirsin.'
    }
  }

  const ortalama = toplam / siralama.length
  const enIyi = siralama[0]

  if (satir.kullaniciId === enIyi.kullaniciId && satir.musteriAdedi > 0) {
    return {
      ton: 'zirve',
      baslik: 'Süper gidiyorsun! 🎉',
      mesaj: `Bu ay ${satir.musteriAdedi} müşteriye dönüş yaptın ve ekipte ilk sıradasın. Aynı tempoyu koru.`
    }
  }

  if (satir.musteriAdedi >= ortalama) {
    return {
      ton: 'iyi',
      baslik: 'Harika gidiyorsun',
      mesaj: `Bu ay ${satir.musteriAdedi} müşteriye dönüş yaptın, ekip ortalamasının üzerindesin. Birinciliğe ${
        enIyi.musteriAdedi - satir.musteriAdedi
      } müşteri kaldı.`
    }
  }

  return {
    ton: 'geride',
    baslik: 'Biraz daha gayret 💪',
    mesaj: `Bu ay ${satir.musteriAdedi} müşteriye dönüş yaptın; ekip ortalaması ${ortalama.toFixed(
      1
    )}. Cevapsız bekleyen taleplerden birkaçını üstlenmek arayı kapatmanın en hızlı yolu.`
  }
}
