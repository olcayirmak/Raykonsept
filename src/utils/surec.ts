// Süreç aşamalarının TEK tanımı. Hem yetki.ts hem ozet.ts buradan okur.
//
// Daha önce "üretimde olmak" iki dosyada ayrı tanımlıydı ve biri eksikti:
// yetki.ts yalnız 'uretime-devredildi' sayıyordu, bu yüzden atölye yöneticisi
// fiilen üzerinde çalıştığı işin müşterisini göremiyordu.

// Type Imports
import type { ProjeDurumu, SatisDurumu, UretimDurumu } from '@/types/musteriTypes'

export const satisDurumlari: SatisDurumu[] = [
  'yeni-talep',
  'on-gorusme',
  'uc-boyut-cizim',
  'revizyon',
  'kesin-teklif',
  'sozlesme-kapora',
  'uretime-devredildi'
]

export const uretimDurumlari: UretimDurumu[] = [
  'uretime-alindi',
  'hazirlaniyor',
  'montaj-planlandi',
  'tamamlandi'
]

const uretimSeti = new Set<ProjeDurumu>([...uretimDurumlari, 'uretime-devredildi'])

/** Üretime devredilmiş ya da atölyede işlenen projeler. */
export const uretimdeMi = (durum: ProjeDurumu) => uretimSeti.has(durum)
