// Form seçenekleri ve etiketleri. Ekran bileşenleri bu dosyadan okur; içlerine
// sabit dizi yazılmaz. Faz 3'te bu tablolar veritabanından gelecek.

// Type Imports
import type { IsTuru, Kaynak, MekanTipi, MusteriTipi, Mimar, ProjeDurumu, YapiDurumu } from '@/types/musteriTypes'
import type { OdemeTuru } from '@/types/odemeTypes'
import type { RandevuDurumu, RandevuTipi } from '@/types/randevuTypes'

export type Secenek<T> = { deger: T; etiket: string }

export const musteriTipleri: Secenek<MusteriTipi>[] = [
  { deger: 'bireysel', etiket: 'Bireysel' },
  { deger: 'kurumsal', etiket: 'Kurumsal' }
]

export const isTurleri: Secenek<IsTuru>[] = [
  { deger: 'mutfak', etiket: 'Mutfak' },
  { deger: 'banyo', etiket: 'Banyo' },
  { deger: 'dolap', etiket: 'Dolap / Giyinme Odası' },
  { deger: 'tv-unitesi', etiket: 'TV Ünitesi' },
  { deger: 'komple-ic-mimari', etiket: 'Komple İç Mimari' },
  { deger: 'diger', etiket: 'Diğer' }
]

export const mekanTipleri: Secenek<MekanTipi>[] = [
  { deger: 'daire', etiket: 'Daire' },
  { deger: 'villa', etiket: 'Villa' },
  { deger: 'ofis', etiket: 'Ofis' },
  { deger: 'magaza', etiket: 'Mağaza' },
  { deger: 'diger', etiket: 'Diğer' }
]

export const yapiDurumlari: Secenek<YapiDurumu>[] = [
  { deger: 'yeni-yapi', etiket: 'Yeni Yapı' },
  { deger: 'tadilat', etiket: 'Tadilat' }
]

export const kaynaklar: Secenek<Kaynak>[] = [
  { deger: 'instagram', etiket: 'Instagram' },
  { deger: 'google', etiket: 'Google' },
  { deger: 'tavsiye', etiket: 'Tavsiye' },
  { deger: 'showroom', etiket: 'Showroom' },
  { deger: 'fuar', etiket: 'Fuar' },
  { deger: 'web-sitesi', etiket: 'Web Sitesi' },
  { deger: 'telefon', etiket: 'Telefon' }
]

export const projeDurumlari: Secenek<ProjeDurumu>[] = [
  { deger: 'yeni-talep', etiket: 'Yeni Talep' },
  { deger: 'on-gorusme', etiket: 'Ön Görüşme / Fiyat' },
  { deger: 'uc-boyut-cizim', etiket: '3D Çizim' },
  { deger: 'revizyon', etiket: 'Revizyon' },
  { deger: 'kesin-teklif', etiket: 'Kesin Teklif' },
  { deger: 'sozlesme-kapora', etiket: 'Sözleşme / Kapora' },
  { deger: 'uretime-devredildi', etiket: 'Üretime Devredildi' },
  { deger: 'uretime-alindi', etiket: 'Üretime Alındı' },
  { deger: 'hazirlaniyor', etiket: 'Hazırlanıyor' },
  { deger: 'montaj-planlandi', etiket: 'Montaj Planlandı' },
  { deger: 'tamamlandi', etiket: 'Tamamlandı' }
]

export const randevuTipleri: Secenek<RandevuTipi>[] = [
  { deger: 'ilk-gorusme', etiket: 'İlk Görüşme' },
  { deger: 'kesif', etiket: 'Keşif' },
  { deger: 'sunum', etiket: 'Sunum' },
  { deger: 'montaj', etiket: 'Montaj' }
]

export const randevuDurumlari: Secenek<RandevuDurumu>[] = [
  { deger: 'planlandi', etiket: 'Planlandı' },
  { deger: 'tamamlandi', etiket: 'Tamamlandı' },
  { deger: 'iptal', etiket: 'İptal' }
]

export const odemeTurleri: Secenek<OdemeTuru>[] = [
  { deger: 'kapora', etiket: 'Kapora' },
  { deger: 'ara-odeme', etiket: 'Ara Ödeme' },
  { deger: 'son-odeme', etiket: 'Son Ödeme' }
]

export const randevuTipEtiketi = (tip: RandevuTipi) =>
  randevuTipleri.find(secenek => secenek.deger === tip)?.etiket ?? tip

export const odemeTuruEtiketi = (tur: OdemeTuru) =>
  odemeTurleri.find(secenek => secenek.deger === tur)?.etiket ?? tur

// Durum rozetlerinin rengi. Akışta ilerledikçe koyulaşır; üretime devir yeşil.
export const projeDurumRenkleri: Record<ProjeDurumu, 'default' | 'info' | 'primary' | 'warning' | 'success'> = {
  'yeni-talep': 'default',
  'on-gorusme': 'info',
  'uc-boyut-cizim': 'info',
  revizyon: 'warning',
  'kesin-teklif': 'primary',
  'sozlesme-kapora': 'primary',
  'uretime-devredildi': 'success',
  'uretime-alindi': 'success',
  hazirlaniyor: 'success',
  'montaj-planlandi': 'success',
  tamamlandi: 'default'
}

export const projeDurumEtiketi = (durum: ProjeDurumu) =>
  projeDurumlari.find(secenek => secenek.deger === durum)?.etiket ?? durum

export const isTuruEtiketi = (isTuru: IsTuru) => isTurleri.find(secenek => secenek.deger === isTuru)?.etiket ?? isTuru

export const kaynakEtiketi = (kaynak: Kaynak) => kaynaklar.find(secenek => secenek.deger === kaynak)?.etiket ?? kaynak

export const mimarlar: Mimar[] = [
  { id: 'm-1', ad: 'Beste Yardımcı' },
  { id: 'm-2', ad: 'Berna Uz' },
  { id: 'm-3', ad: 'Kaan Güneş' }
]

export const iller: string[] = [
  'Adana',
  'Adıyaman',
  'Afyonkarahisar',
  'Ağrı',
  'Aksaray',
  'Amasya',
  'Ankara',
  'Antalya',
  'Ardahan',
  'Artvin',
  'Aydın',
  'Balıkesir',
  'Bartın',
  'Batman',
  'Bayburt',
  'Bilecik',
  'Bingöl',
  'Bitlis',
  'Bolu',
  'Burdur',
  'Bursa',
  'Çanakkale',
  'Çankırı',
  'Çorum',
  'Denizli',
  'Diyarbakır',
  'Düzce',
  'Edirne',
  'Elazığ',
  'Erzincan',
  'Erzurum',
  'Eskişehir',
  'Gaziantep',
  'Giresun',
  'Gümüşhane',
  'Hakkâri',
  'Hatay',
  'Iğdır',
  'Isparta',
  'İstanbul',
  'İzmir',
  'Kahramanmaraş',
  'Karabük',
  'Karaman',
  'Kars',
  'Kastamonu',
  'Kayseri',
  'Kırıkkale',
  'Kırklareli',
  'Kırşehir',
  'Kilis',
  'Kocaeli',
  'Konya',
  'Kütahya',
  'Malatya',
  'Manisa',
  'Mardin',
  'Mersin',
  'Muğla',
  'Muş',
  'Nevşehir',
  'Niğde',
  'Ordu',
  'Osmaniye',
  'Rize',
  'Sakarya',
  'Samsun',
  'Siirt',
  'Sinop',
  'Sivas',
  'Şanlıurfa',
  'Şırnak',
  'Tekirdağ',
  'Tokat',
  'Trabzon',
  'Tunceli',
  'Uşak',
  'Van',
  'Yalova',
  'Yozgat',
  'Zonguldak'
]
