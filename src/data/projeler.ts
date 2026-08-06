// Faz 1 mock veri kaynağı. Faz 3'te içi veritabanı sorgularıyla değiştirilecek.

// Type Imports
import type { Proje } from '@/types/musteriTypes'

export const projeler: Proje[] = [
  {
    id: 'prj-1',
    musteriId: 'mus-1',
    isTurleri: ['mutfak', 'dolap'],
    mekanTipi: 'daire',
    yapiDurumu: 'tadilat',
    tahminiButce: 480000,
    istenenTeslim: '2026-10-15',
    durum: 'kesin-teklif',
    olusturmaTarihi: '2026-07-14'
  },
  {
    id: 'prj-2',
    musteriId: 'mus-1',
    isTurleri: ['banyo'],
    mekanTipi: 'daire',
    yapiDurumu: 'tadilat',
    tahminiButce: 160000,
    durum: 'yeni-talep',
    olusturmaTarihi: '2026-08-01'
  },
  {
    id: 'prj-3',
    musteriId: 'mus-2',
    isTurleri: ['komple-ic-mimari'],
    mekanTipi: 'ofis',
    yapiDurumu: 'yeni-yapi',
    tahminiButce: 2250000,
    istenenTeslim: '2026-12-01',
    durum: 'uretime-devredildi',
    olusturmaTarihi: '2026-07-28'
  },
  {
    id: 'prj-4',
    musteriId: 'mus-3',
    isTurleri: ['mutfak'],
    mekanTipi: 'villa',
    yapiDurumu: 'yeni-yapi',
    tahminiButce: 720000,
    durum: 'uc-boyut-cizim',
    olusturmaTarihi: '2026-08-03'
  }
]

export const musterininProjeleri = (musteriId: string) =>
  projeler.filter(proje => proje.musteriId === musteriId)

// Bkz. musteriEkle — Faz 1'de bellekte, Faz 3'te veritabanında.
export const projeEkle = (yeni: Omit<Proje, 'id' | 'olusturmaTarihi'>) => {
  const proje: Proje = {
    ...yeni,
    id: `prj-${projeler.length + 1}`,
    olusturmaTarihi: new Date().toISOString().slice(0, 10)
  }

  projeler.push(proje)

  return proje
}
