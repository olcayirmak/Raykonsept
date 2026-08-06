export type MusteriTipi = 'bireysel' | 'kurumsal'

export type IsTuru = 'mutfak' | 'banyo' | 'dolap' | 'tv-unitesi' | 'komple-ic-mimari' | 'diger'

export type MekanTipi = 'daire' | 'villa' | 'ofis' | 'magaza' | 'diger'

export type YapiDurumu = 'yeni-yapi' | 'tadilat'

export type Kaynak = 'instagram' | 'google' | 'tavsiye' | 'showroom' | 'fuar' | 'web-sitesi' | 'telefon'

// Satış tarafı akışı.
export type SatisDurumu =
  | 'yeni-talep'
  | 'on-gorusme'
  | 'uc-boyut-cizim'
  | 'revizyon'
  | 'kesin-teklif'
  | 'sozlesme-kapora'
  | 'uretime-devredildi'

// Üretime devredildikten sonrası. Atölye bu aşamaları yönetir.
export type UretimDurumu = 'uretime-alindi' | 'hazirlaniyor' | 'montaj-planlandi' | 'tamamlandi'

export type ProjeDurumu = SatisDurumu | UretimDurumu

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
  // Satışı yapan mimar. Müşterinin sorumlu mimarından ayrı tutulur: müşteri
  // devredilebilir, ama satışın kime yazıldığı değişmemeli.
  mimarId: string
  isTurleri: IsTuru[]
  mekanTipi?: MekanTipi
  yapiDurumu?: YapiDurumu
  // İlk görüşmedeki tahmin.
  tahminiButce?: number
  // Sözleşme imzalanınca kesinleşen tutar. Ciro bu alandan hesaplanır.
  sozlesmeTutari?: number
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
