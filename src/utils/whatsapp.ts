// WhatsApp yazışmalarıyla ilgili türetmeler tek yerde. Ekran bu soruları
// kendi içinde `if` yazarak cevaplamaz; buradaki saf fonksiyonları çağırır.
//
// "Cevapsız" bir bayrak olarak SAKLANMAZ, türetilir: son mesaj müşteriden
// geldiyse o talep cevapsızdır. Saklanan bayrak, biri cevap yazdığı anda
// yalan söylemeye başlar.

// Type Imports
import type { WhatsappMesaj, WhatsappSohbet } from '@/types/whatsappTypes'

/** Bir sohbetin mesajları, eskiden yeniye. */
export const sohbetMesajlari = (sohbetId: string, mesajlar: WhatsappMesaj[]) =>
  mesajlar
    .filter(mesaj => mesaj.sohbetId === sohbetId)
    .sort((a, b) => a.tarih.localeCompare(b.tarih))

/** Sohbetteki en son mesaj; hiç mesaj yoksa undefined. */
export const sonMesaj = (sohbetId: string, mesajlar: WhatsappMesaj[]) => {
  const liste = sohbetMesajlari(sohbetId, mesajlar)

  return liste[liste.length - 1]
}

/** Son söz müşterideyse talep cevapsızdır. */
export const cevapsizMi = (sohbetId: string, mesajlar: WhatsappMesaj[]) =>
  sonMesaj(sohbetId, mesajlar)?.yon === 'gelen'

/** Cevapsız sohbetler; listede öne alınacak olanlar. */
export const cevapsizSohbetler = (sohbetler: WhatsappSohbet[], mesajlar: WhatsappMesaj[]) =>
  sohbetler.filter(sohbet => cevapsizMi(sohbet.id, mesajlar))

/**
 * Mesajları gün başlıklarına böler. Ekran, araya "5 Ağustos" ayracı koyarken
 * bunu kullanır; gruplama mantığı bileşenin içine yazılmaz.
 */
export const gunlereBol = (mesajlar: WhatsappMesaj[]) => {
  const gruplar: { gun: string; mesajlar: WhatsappMesaj[] }[] = []

  mesajlar.forEach(mesaj => {
    const gun = mesaj.tarih.slice(0, 10)
    const sonGrup = gruplar[gruplar.length - 1]

    if (sonGrup && sonGrup.gun === gun) {
      sonGrup.mesajlar.push(mesaj)
    } else {
      gruplar.push({ gun, mesajlar: [mesaj] })
    }
  })

  return gruplar
}
