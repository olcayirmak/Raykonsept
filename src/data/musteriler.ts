// Faz 1 mock veri kaynağı. Faz 3'te bu dosyanın içi veritabanı sorgularıyla
// değiştirilecek; ekran kodu değişmeyecek.

// Type Imports
import type { Musteri } from '@/types/musteriTypes'

export const musteriler: Musteri[] = [
  {
    id: 'mus-1',
    tip: 'bireysel',
    ad: 'Ayşe Demirtaş',
    telefon: '05455142035',
    ePosta: 'ayse.demirtas@example.com',
    il: 'Bursa',
    ilce: 'Nilüfer',
    kaynak: 'tavsiye',
    tavsiyeEden: 'Pınar Toprak',
    sorumluMimarId: 'm-3',
    olusturmaTarihi: '2025-12-03'
  },
  {
    id: 'mus-2',
    tip: 'bireysel',
    ad: 'Kerem Ünal',
    telefon: '05415381445',
    ePosta: 'kerem.unal@example.com',
    il: 'İzmir',
    ilce: 'Bornova',
    kaynak: 'web-sitesi',
    sorumluMimarId: 'm-3',
    olusturmaTarihi: '2026-05-03'
  },
  {
    id: 'mus-3',
    tip: 'bireysel',
    ad: 'Zeynep Aydın',
    telefon: '05324575339',
    il: 'İzmir',
    ilce: 'Karşıyaka',
    kaynak: 'web-sitesi',
    sorumluMimarId: 'm-2',
    olusturmaTarihi: '2026-07-22'
  },
  {
    id: 'mus-4',
    tip: 'bireysel',
    ad: 'Mert Korkmaz',
    telefon: '05337169445',
    ePosta: 'mert.korkmaz@example.com',
    il: 'Ankara',
    ilce: 'Çankaya',
    kaynak: 'web-sitesi',
    sorumluMimarId: 'm-3',
    olusturmaTarihi: '2026-01-12'
  },
  {
    id: 'mus-5',
    tip: 'bireysel',
    ad: 'Elif Sancak',
    telefon: '05336918709',
    ePosta: 'elif.sancak@example.com',
    il: 'Kocaeli',
    ilce: 'İzmit',
    kaynak: 'web-sitesi',
    sorumluMimarId: 'm-2',
    olusturmaTarihi: '2026-05-22'
  },
  {
    id: 'mus-6',
    tip: 'bireysel',
    ad: 'Onur Baturay',
    telefon: '05443927623',
    ePosta: 'onur.baturay@example.com',
    il: 'Kocaeli',
    ilce: 'İzmit',
    kaynak: 'google',
    sorumluMimarId: 'm-1',
    olusturmaTarihi: '2026-01-20'
  },
  {
    id: 'mus-7',
    tip: 'bireysel',
    ad: 'Sibel Erdoğan',
    telefon: '05592983936',
    ePosta: 'sibel.erdogan@example.com',
    il: 'Ankara',
    ilce: 'Çankaya',
    kaynak: 'showroom',
    sorumluMimarId: 'm-1',
    olusturmaTarihi: '2026-06-15'
  },
  {
    id: 'mus-8',
    tip: 'bireysel',
    ad: 'Caner Yalçın',
    telefon: '05349505372',
    il: 'Bursa',
    ilce: 'Nilüfer',
    kaynak: 'google',
    sorumluMimarId: 'm-3',
    olusturmaTarihi: '2025-11-19'
  },
  {
    id: 'mus-9',
    tip: 'bireysel',
    ad: 'Pınar Toprak',
    telefon: '05548337780',
    il: 'Ankara',
    ilce: 'Yenimahalle',
    kaynak: 'showroom',
    sorumluMimarId: 'm-1',
    olusturmaTarihi: '2025-11-02'
  },
  {
    id: 'mus-10',
    tip: 'bireysel',
    ad: 'Emre Doğan',
    telefon: '05512535663',
    ePosta: 'emre.dogan@example.com',
    il: 'Kocaeli',
    ilce: 'Gebze',
    kaynak: 'tavsiye',
    tavsiyeEden: 'Sibel Erdoğan',
    sorumluMimarId: 'm-1',
    olusturmaTarihi: '2025-11-02'
  },
  {
    id: 'mus-11',
    tip: 'bireysel',
    ad: 'Gizem Arslan',
    telefon: '05466601326',
    ePosta: 'gizem.arslan@example.com',
    il: 'Kocaeli',
    ilce: 'Gebze',
    kaynak: 'tavsiye',
    tavsiyeEden: 'Emre Doğan',
    sorumluMimarId: 'm-3',
    olusturmaTarihi: '2026-05-28'
  },
  {
    id: 'mus-12',
    tip: 'bireysel',
    ad: 'Tolga Menteş',
    telefon: '05548719015',
    ePosta: 'tolga.mentes@example.com',
    il: 'Ankara',
    ilce: 'Yenimahalle',
    kaynak: 'instagram',
    sorumluMimarId: 'm-3',
    olusturmaTarihi: '2025-12-30'
  },
  {
    id: 'mus-13',
    tip: 'bireysel',
    ad: 'Nazlı Çetinkaya',
    telefon: '05538403368',
    il: 'İzmir',
    ilce: 'Bornova',
    kaynak: 'showroom',
    sorumluMimarId: 'm-2',
    olusturmaTarihi: '2026-04-11'
  },
  {
    id: 'mus-14',
    tip: 'bireysel',
    ad: 'Barış Ekinci',
    telefon: '05517668119',
    ePosta: 'baris.ekinci@example.com',
    il: 'İstanbul',
    ilce: 'Ataşehir',
    kaynak: 'instagram',
    sorumluMimarId: 'm-3',
    olusturmaTarihi: '2026-03-22'
  },
  {
    id: 'mus-15',
    tip: 'bireysel',
    ad: 'Derya Solmaz',
    telefon: '05520722263',
    ePosta: 'derya.solmaz@example.com',
    il: 'Kocaeli',
    ilce: 'İzmit',
    kaynak: 'telefon',
    sorumluMimarId: 'm-3',
    olusturmaTarihi: '2026-06-09'
  },
  {
    id: 'mus-16',
    tip: 'bireysel',
    ad: 'Uğur Bozkurt',
    telefon: '05331744574',
    ePosta: 'ugur.bozkurt@example.com',
    il: 'Ankara',
    ilce: 'Çankaya',
    kaynak: 'telefon',
    sorumluMimarId: 'm-3',
    olusturmaTarihi: '2025-12-08'
  },
  {
    id: 'mus-17',
    tip: 'bireysel',
    ad: 'Selin Kavak',
    telefon: '05396935740',
    ePosta: 'selin.kavak@example.com',
    il: 'Bursa',
    ilce: 'Nilüfer',
    kaynak: 'tavsiye',
    tavsiyeEden: 'Emre Doğan',
    sorumluMimarId: 'm-2',
    olusturmaTarihi: '2026-05-16'
  },
  {
    id: 'mus-18',
    tip: 'bireysel',
    ad: 'Hakan Türkmen',
    telefon: '05310244604',
    ePosta: 'hakan.turkmen@example.com',
    il: 'İstanbul',
    ilce: 'Üsküdar',
    kaynak: 'google',
    sorumluMimarId: 'm-2',
    olusturmaTarihi: '2026-03-19'
  },
  {
    id: 'mus-19',
    tip: 'kurumsal',
    ad: 'Akbay İnşaat Ltd. Şti.',
    yetkiliKisi: 'Murat Akbay',
    telefon: '05391464661',
    ePosta: 'info@akbay.example',
    il: 'İzmir',
    ilce: 'Bornova',
    kaynak: 'showroom',
    sorumluMimarId: 'm-2',
    olusturmaTarihi: '2026-05-04'
  },
  {
    id: 'mus-20',
    tip: 'kurumsal',
    ad: 'Yapı Grup A.Ş.',
    yetkiliKisi: 'Cem Yalın',
    telefon: '05569788806',
    ePosta: 'info@yapı.example',
    il: 'İstanbul',
    ilce: 'Üsküdar',
    kaynak: 'telefon',
    sorumluMimarId: 'm-2',
    olusturmaTarihi: '2026-02-07'
  },
  {
    id: 'mus-21',
    tip: 'kurumsal',
    ad: 'Tur Otelcilik Ltd.',
    yetkiliKisi: 'Ayça Tur',
    telefon: '05354750489',
    ePosta: 'info@tur.example',
    il: 'Kocaeli',
    ilce: 'Gebze',
    kaynak: 'showroom',
    sorumluMimarId: 'm-1',
    olusturmaTarihi: '2026-04-07'
  },
  {
    id: 'mus-22',
    tip: 'kurumsal',
    ad: 'Meridyen Gayrimenkul',
    yetkiliKisi: 'Kaan Meriç',
    telefon: '05419550725',
    ePosta: 'info@meridyen.example',
    il: 'Kocaeli',
    ilce: 'Gebze',
    kaynak: 'showroom',
    sorumluMimarId: 'm-2',
    olusturmaTarihi: '2025-12-31'
  },
  {
    id: 'mus-23',
    tip: 'kurumsal',
    ad: 'Beyaz Mimarlık',
    yetkiliKisi: 'Leyla Beyaz',
    telefon: '05362927530',
    ePosta: 'info@beyaz.example',
    il: 'Kocaeli',
    ilce: 'İzmit',
    kaynak: 'google',
    sorumluMimarId: 'm-2',
    olusturmaTarihi: '2026-04-18'
  },
  {
    id: 'mus-24',
    tip: 'kurumsal',
    ad: 'Kuzey Yapı Koop.',
    yetkiliKisi: 'Serdar Kuzey',
    telefon: '05558710749',
    ePosta: 'info@kuzey.example',
    il: 'Ankara',
    ilce: 'Çankaya',
    kaynak: 'google',
    sorumluMimarId: 'm-3',
    olusturmaTarihi: '2026-04-17'
  }
]

export const telefonlaMusteriBul = (telefonRakamlari: string) =>
  musteriler.find(musteri => musteri.telefon.replace(/\D/g, '') === telefonRakamlari)

export const musteriBul = (id: string) => musteriler.find(musteri => musteri.id === id)

// Faz 1'de kayıt bellekte tutulur; sayfa tam yenilenince başlangıç verisine döner.
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
