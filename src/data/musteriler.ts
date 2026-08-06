// Faz 1 mock veri kaynağı. Faz 3'te bu dosyanın içi veritabanı sorgularıyla
// değiştirilecek; ekran kodu değişmeyecek.

// Type Imports
import type { Musteri } from '@/types/musteriTypes'

export const musteriler: Musteri[] = [
  {
    id: 'mus-1',
    tip: 'bireysel',
    ad: 'Ayşe Demirtaş',
    telefon: '05321114455',
    ePosta: 'ayse.demirtas@example.com',
    il: 'İstanbul',
    ilce: 'Kadıköy',
    kaynak: 'instagram',
    sorumluMimarId: 'm-1',
    olusturmaTarihi: '2026-07-14'
  },
  {
    id: 'mus-2',
    tip: 'kurumsal',
    ad: 'Akbay İnşaat Ltd. Şti.',
    yetkiliKisi: 'Murat Akbay',
    telefon: '05442223366',
    ePosta: 'info@akbayinsaat.example',
    il: 'Kocaeli',
    ilce: 'İzmit',
    kaynak: 'tavsiye',
    tavsiyeEden: 'Ayşe Demirtaş',
    sorumluMimarId: 'm-2',
    olusturmaTarihi: '2026-07-28'
  },
  {
    id: 'mus-3',
    tip: 'bireysel',
    ad: 'Kerem Ünal',
    telefon: '05059998877',
    il: 'İstanbul',
    ilce: 'Beylikdüzü',
    kaynak: 'google',
    sorumluMimarId: 'm-1',
    olusturmaTarihi: '2026-08-03'
  }
]

export const telefonlaMusteriBul = (telefonRakamlari: string) =>
  musteriler.find(musteri => musteri.telefon.replace(/\D/g, '') === telefonRakamlari)

export const musteriBul = (id: string) => musteriler.find(musteri => musteri.id === id)

// Faz 1'de kayıt bellekte tutulur; sayfa tam yenilenince başlangıç verisine döner.
// Faz 3'te bu fonksiyonun içi veritabanı yazımıyla değişecek, çağıran ekranlar aynı kalacak.
export const musteriEkle = (yeni: Omit<Musteri, 'id' | 'olusturmaTarihi'>) => {
  const musteri: Musteri = {
    ...yeni,
    id: `mus-${musteriler.length + 1}`,
    olusturmaTarihi: new Date().toISOString().slice(0, 10)
  }

  musteriler.push(musteri)

  return musteri
}

export const musteriGuncelle = (id: string, degisiklikler: Partial<Musteri>) => {
  const sira = musteriler.findIndex(musteri => musteri.id === id)

  if (sira === -1) return undefined

  musteriler[sira] = { ...musteriler[sira], ...degisiklikler }

  return musteriler[sira]
}
