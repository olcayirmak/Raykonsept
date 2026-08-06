export type MusteriTipi = 'bireysel' | 'kurumsal'

export type IsTuru = 'mutfak' | 'banyo' | 'dolap' | 'tv-unitesi' | 'komple-ic-mimari' | 'diger'

export type MekanTipi = 'daire' | 'villa' | 'ofis' | 'magaza' | 'diger'

export type YapiDurumu = 'yeni-yapi' | 'tadilat'

export type Kaynak = 'instagram' | 'google' | 'tavsiye' | 'showroom' | 'fuar' | 'web-sitesi' | 'telefon'

// Satış tarafı akışı. Üretime devredilen iş ÜretimDurumu ile devam eder.
export type ProjeDurumu =
  | 'yeni-talep'
  | 'on-gorusme'
  | 'uc-boyut-cizim'
  | 'revizyon'
  | 'kesin-teklif'
  | 'sozlesme-kapora'
  | 'uretime-devredildi'

export type Musteri = {
  id: string
  tip: MusteriTipi
  // Bireyselde ad soyad, kurumsalda firma ünvanı.
  ad: string
  yetkiliKisi?: string
  telefon: string
  ePosta?: string
  il?: string
  ilce?: string
  acikAdres?: string
  kaynak?: Kaynak
  tavsiyeEden?: string
  sorumluMimarId?: string
  notlar?: string
  olusturmaTarihi: string
}

export type Proje = {
  id: string
  musteriId: string
  isTurleri: IsTuru[]
  mekanTipi?: MekanTipi
  yapiDurumu?: YapiDurumu
  tahminiButce?: number
  istenenTeslim?: string
  durum: ProjeDurumu
  olusturmaTarihi: string
}

export type Mimar = {
  id: string
  ad: string
}

// Yeni müşteri formu tek kayıtta hem müşteriyi hem ilk projeyi açar.
export type YeniMusteriFormDegerleri = Omit<Musteri, 'id' | 'olusturmaTarihi'> &
  Pick<Proje, 'isTurleri' | 'mekanTipi' | 'yapiDurumu' | 'tahminiButce' | 'istenenTeslim'>
