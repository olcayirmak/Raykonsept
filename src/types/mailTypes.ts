export type MailKlasoru = 'gelen' | 'giden' | 'taslak' | 'cop'

export type Mail = {
  id: string
  musteriId?: string
  projeId?: string
  klasor: MailKlasoru
  gonderenAd: string
  gonderenEposta: string
  aliciAd: string
  aliciEposta: string
  konu: string
  govde: string
  tarih: string // ISO tarih-saat: '2026-08-04T10:15'
  okundu: boolean
  yildizli: boolean
}
