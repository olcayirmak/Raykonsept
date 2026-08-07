// WhatsApp, e-postadan farklı çalışır: tek bir ŞİRKET HATTI vardır.
// Kimsenin kişisel kutusu yoktur — bütün mimarlar aynı yazışmaları görür ve
// herkes cevap yazabilir. Bu yüzden sohbetin bir "sahibi" değil, olsa olsa
// üstlenen bir mimarı olur; mesajın ise onu yazan mimarı vardır.
//
// Mimar performansı (ay içinde kaç müşteriye cevap yazıldı, kaç talep cevapsız
// kaldı) bu iki alandan türetilir: WhatsappMesaj.gonderenKullaniciId ve tarih.
// Bu yüzden giden her mesajda gönderen kullanıcı BOŞ BIRAKILMAZ.

export type SohbetEtiketi = 'yeni-talep' | 'goruculuk' | 'teklif' | 'uretim' | 'kapandi'

export type MesajYonu = 'gelen' | 'giden'

// Yalnızca giden mesajlar için: WhatsApp'ın çift tik durumu.
export type IletiDurumu = 'gonderildi' | 'iletildi' | 'okundu'

export type WhatsappSohbet = {
  id: string

  // Sisteme kayıtlı müşteriye bağlıysa dolu. Yeni gelen numaralarda boş kalır;
  // ekran bu durumda WhatsApp profil adını gösterir.
  musteriId?: string

  // Kayıtlı müşteri yoksa görünen ad buradan gelir.
  ad: string
  telefon: string

  etiket: SohbetEtiketi

  // Sohbeti üstlenen mimar. Atama zorunlu değil: hattı ilk gören cevaplar.
  atananMimarId?: string

  // Listeyi sıralamak için; son mesajın tarihiyle aynı tutulur.
  sonMesajTarihi: string

  // Ekipçe okunmamış gelen mesaj sayısı (kişiye özel değil, hat ortak).
  okunmamisAdet: number
}

export type WhatsappMesaj = {
  id: string
  sohbetId: string
  yon: MesajYonu
  govde: string

  // ISO tarih-saat: '2026-08-04T10:15'
  tarih: string

  // Giden mesajı hangi mimar yazdı. Performans ölçümü buna dayanır.
  // Gelen mesajlarda boştur.
  gonderenKullaniciId?: string

  // Yalnızca giden mesajlarda anlamlı.
  durum?: IletiDurumu
}
