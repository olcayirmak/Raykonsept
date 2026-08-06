// Türkçe biçimlendirme tek yerden yapılır; string birleştirerek para/tarih yazılmaz.

const paraBicimi = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  maximumFractionDigits: 0
})

export const paraYaz = (tutar: number) => paraBicimi.format(tutar)

// Büyük tutarlar için kısaltma: ₺1,4 mn / ₺450 b. Kart başlıklarında kullanılır.
export const paraKisaYaz = (tutar: number) => {
  if (Math.abs(tutar) >= 1_000_000) {
    return `₺${(tutar / 1_000_000).toLocaleString('tr-TR', { maximumFractionDigits: 1 })} mn`
  }

  if (Math.abs(tutar) >= 1_000) {
    return `₺${(tutar / 1_000).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} b`
  }

  return paraYaz(tutar)
}

const tarihBicimi = new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })
const kisaTarihBicimi = new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short' })

export const tarihYaz = (isoTarih: string) => tarihBicimi.format(new Date(isoTarih))

export const kisaTarihYaz = (isoTarih: string) => kisaTarihBicimi.format(new Date(isoTarih))

// '2026-08-12T14:30' → '12 Ağu 14:30'
export const tarihSaatYaz = (isoTarihSaat: string) => {
  const [gun, saat] = isoTarihSaat.split('T')

  return saat ? `${kisaTarihYaz(gun)} ${saat}` : kisaTarihYaz(gun)
}

// Telefonu 0(5xx) xxx xx xx düzenine sokar. Sadece rakamları dikkate alır.
export const telefonBicimle = (girdi: string) => {
  const rakamlar = girdi.replace(/\D/g, '').slice(0, 11)

  if (!rakamlar) return ''

  const govde = rakamlar.startsWith('0') ? rakamlar.slice(1) : rakamlar
  const parcalar = [govde.slice(0, 3), govde.slice(3, 6), govde.slice(6, 8), govde.slice(8, 10)]

  let sonuc = `0(${parcalar[0]}`

  if (govde.length > 3) sonuc += `) ${parcalar[1]}`
  if (govde.length > 6) sonuc += ` ${parcalar[2]}`
  if (govde.length > 8) sonuc += ` ${parcalar[3]}`

  return sonuc
}

export const telefonRakamlari = (girdi: string) => girdi.replace(/\D/g, '')
