export type OdemeTuru = 'kapora' | 'ara-odeme' | 'son-odeme'

export type Odeme = {
  id: string
  projeId: string
  tur: OdemeTuru
  tutar: number
  // ISO tarih: '2026-09-01'
  vadeTarihi: string
  // Doluysa tahsil edilmiştir. Gecikme durumu SAKLANMAZ, vadeTarihi'nden türetilir —
  // saklanan bir "gecikti" bayrağı zaman ilerledikçe yalan söyler.
  odemeTarihi?: string
}
