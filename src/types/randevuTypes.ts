export type RandevuTipi = 'ilk-gorusme' | 'kesif' | 'sunum' | 'montaj'

export type RandevuDurumu = 'planlandi' | 'tamamlandi' | 'iptal'

export type Randevu = {
  id: string
  musteriId: string
  projeId?: string
  mimarId: string
  tip: RandevuTipi
  // ISO tarih-saat: '2026-08-12T14:30'
  tarih: string
  notlar?: string
  durum: RandevuDurumu
}
