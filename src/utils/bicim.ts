// Türkçe biçimlendirme tek yerden yapılır; string birleştirerek para/tarih yazılmaz.

const paraBicimi = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  maximumFractionDigits: 0
})

export const paraYaz = (tutar: number) => paraBicimi.format(tutar)

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
