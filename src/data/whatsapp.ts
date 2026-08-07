// Faz 1 mock veri kaynağı. Faz 3'te bu dosyanın içi veritabanı sorgularıyla
// değiştirilecek; ekran kodu değişmeyecek.
//
// WhatsApp şirket hattı: TEK numara, bütün mimarlar aynı yazışmaları görür.
// Giden mesajlarda gonderenKullaniciId ZORUNLU — performans ölçümü buna dayanır.

// Type Imports
import type { WhatsappMesaj, WhatsappSohbet } from '@/types/whatsappTypes'

export const whatsappSohbetler: WhatsappSohbet[] = [
  // ── Kayıtlı müşteriler (9 adet) ──
  {
    id: 'sohbet-1',
    musteriId: 'mus-1',
    ad: 'Ayşe Demirtaş',
    telefon: '05455142035',
    etiket: 'teklif',
    atananMimarId: 'm-3',
    sonMesajTarihi: '2026-08-07T17:00',
    okunmamisAdet: 0
  },
  {
    id: 'sohbet-2',
    musteriId: 'mus-3',
    ad: 'Zeynep Aydın',
    telefon: '05324575339',
    etiket: 'goruculuk',
    atananMimarId: 'm-2',
    sonMesajTarihi: '2026-08-07T08:00',
    okunmamisAdet: 3
  },
  {
    id: 'sohbet-3',
    musteriId: 'mus-5',
    ad: 'Elif Sancak',
    telefon: '05336918709',
    etiket: 'uretim',
    atananMimarId: 'm-1',
    sonMesajTarihi: '2026-08-07T17:30',
    okunmamisAdet: 0
  },
  {
    id: 'sohbet-4',
    musteriId: 'mus-7',
    ad: 'Sibel Erdoğan',
    telefon: '05592983936',
    etiket: 'teklif',
    atananMimarId: 'm-1',
    sonMesajTarihi: '2026-08-08T09:15',
    okunmamisAdet: 2
  },
  {
    id: 'sohbet-5',
    musteriId: 'mus-9',
    ad: 'Pınar Toprak',
    telefon: '05548337780',
    etiket: 'kapandi',
    atananMimarId: 'm-1',
    sonMesajTarihi: '2026-08-05T16:30',
    okunmamisAdet: 0
  },
  {
    id: 'sohbet-6',
    musteriId: 'mus-11',
    ad: 'Gizem Arslan',
    telefon: '05466601326',
    etiket: 'goruculuk',
    atananMimarId: 'm-3',
    sonMesajTarihi: '2026-08-06T16:10',
    okunmamisAdet: 0
  },
  {
    id: 'sohbet-7',
    musteriId: 'mus-13',
    ad: 'Nazlı Çetinkaya',
    telefon: '05538403368',
    etiket: 'teklif',
    atananMimarId: 'm-2',
    sonMesajTarihi: '2026-08-07T11:30',
    okunmamisAdet: 2
  },
  {
    id: 'sohbet-8',
    musteriId: 'mus-15',
    ad: 'Derya Solmaz',
    telefon: '05520722263',
    etiket: 'uretim',
    atananMimarId: 'm-2',
    sonMesajTarihi: '2026-08-06T17:00',
    okunmamisAdet: 0
  },
  {
    id: 'sohbet-9',
    musteriId: 'mus-18',
    ad: 'Hakan Türkmen',
    telefon: '05310244604',
    etiket: 'goruculuk',
    atananMimarId: 'm-1',
    sonMesajTarihi: '2026-08-08T08:30',
    okunmamisAdet: 3
  },

  // ── Yeni gelen numaralar (5 adet, musteriId boş) ──
  {
    id: 'sohbet-10',
    ad: 'Cem Aksoy',
    telefon: '05321112233',
    etiket: 'yeni-talep',
    atananMimarId: 'm-1',
    sonMesajTarihi: '2026-08-07T14:00',
    okunmamisAdet: 1
  },
  {
    id: 'sohbet-11',
    ad: 'Deniz Koç',
    telefon: '05334445566',
    etiket: 'yeni-talep',
    atananMimarId: 'm-1',
    sonMesajTarihi: '2026-08-06T12:40',
    okunmamisAdet: 0
  },
  {
    id: 'sohbet-12',
    ad: 'Funda Özkan',
    telefon: '05357778899',
    etiket: 'yeni-talep',
    atananMimarId: 'm-2',
    sonMesajTarihi: '2026-08-05T11:20',
    okunmamisAdet: 0
  },
  {
    id: 'sohbet-13',
    ad: 'Mert Çelik',
    telefon: '05361234567',
    etiket: 'yeni-talep',
    atananMimarId: 'm-1',
    sonMesajTarihi: '2026-08-04T16:00',
    okunmamisAdet: 1
  },
  {
    id: 'sohbet-14',
    ad: 'Aslı Duru',
    telefon: '05389876543',
    etiket: 'yeni-talep',
    atananMimarId: 'm-3',
    sonMesajTarihi: '2026-08-03T14:05',
    okunmamisAdet: 0
  }
]

export const whatsappMesajlar: WhatsappMesaj[] = [
  // ═══ sohbet-1: Ayşe Demirtaş · teklif · Kaan (m-3) · 8 mesaj ═══
  { id: 'msg-1', sohbetId: 'sohbet-1', yon: 'gelen', govde: 'Kaan Bey merhaba, verdiğiniz teklifi eşimle inceledik. MDF yerine lake dolap yaptırsak fiyat ne kadar değişir?', tarih: '2026-07-28T09:15' },
  { id: 'msg-2', sohbetId: 'sohbet-1', yon: 'giden', govde: 'Ayşe Hanım merhaba, lake dolap MDF\'ye göre m²\'de yaklaşık 1.200 TL fark ediyor. Sizin mutfakta 8 m² dolap var, toplamda 9.600 TL gibi bir artış olur. İsterseniz yeni bir teklif hazırlayayım.', tarih: '2026-07-28T10:30', gonderenKullaniciId: 'm-3', durum: 'okundu' },
  { id: 'msg-3', sohbetId: 'sohbet-1', yon: 'gelen', govde: 'Evet lütfen güncel teklif alabilir miyiz? Bu arada tezgahı da granit düşünüyoruz, onu da ekleyin.', tarih: '2026-07-30T14:20' },
  { id: 'msg-4', sohbetId: 'sohbet-1', yon: 'giden', govde: 'Tabii, granit tezgahı da ekleyip size iletelim. Yarın akşama hazır olur.', tarih: '2026-07-30T15:45', gonderenKullaniciId: 'm-3', durum: 'okundu' },
  { id: 'msg-5', sohbetId: 'sohbet-1', yon: 'gelen', govde: 'Kaan Bey teklifi aldık, çok teşekkürler. Eşimle konuşup size dönüş yapacağız. Bu arada kurulum ne kadar sürer?', tarih: '2026-08-04T11:00' },
  { id: 'msg-6', sohbetId: 'sohbet-1', yon: 'giden', govde: 'Rica ederim. Mutfak kurulumu 3-4 gün sürüyor, tezgah montajıyla birlikte 1 haftayı bulur. Karar verdiğinizde tarih planlaması yaparız.', tarih: '2026-08-04T13:30', gonderenKullaniciId: 'm-3', durum: 'okundu' },
  { id: 'msg-7', sohbetId: 'sohbet-1', yon: 'gelen', govde: 'Anladım. Peki kapora ne kadar olacak?', tarih: '2026-08-07T16:15' },
  { id: 'msg-8', sohbetId: 'sohbet-1', yon: 'giden', govde: 'Toplam bedelin %30\'u kapora alıyoruz. Sizin teklif üzerinden yaklaşık 48.000 TL. Dilerseniz haftaya sözleşme için showroom\'a bekleriz.', tarih: '2026-08-07T17:00', gonderenKullaniciId: 'm-3', durum: 'iletildi' },

  // ═══ sohbet-2: Zeynep Aydın · goruculuk · Berna (m-2) · 7 mesaj · CEVAPSIZ ═══
  { id: 'msg-9', sohbetId: 'sohbet-2', yon: 'gelen', govde: 'Merhaba, internet sitesinden yazıyorum. Banyo dolabı ve tezgah için fiyat alabilir miyim?', tarih: '2026-08-04T10:00' },
  { id: 'msg-10', sohbetId: 'sohbet-2', yon: 'giden', govde: 'Merhaba Zeynep Hanım, tabii. Öncelikle ölçü için bir randevu oluşturalım. Hangi gün müsait olursunuz?', tarih: '2026-08-04T11:30', gonderenKullaniciId: 'm-2', durum: 'okundu' },
  { id: 'msg-11', sohbetId: 'sohbet-2', yon: 'gelen', govde: 'Perşembe ya da cuma öğleden sonra uygun. Banyomuz yaklaşık 6 m², iki lavabolu bir çözüm istiyoruz.', tarih: '2026-08-05T14:00' },
  { id: 'msg-12', sohbetId: 'sohbet-2', yon: 'giden', govde: 'Perşembe 14:00\'te gelebiliriz. Adresinizi paylaşır mısınız? Bir de banyoda şu an mevcut dolap var mı, söküm gerekecek mi?', tarih: '2026-08-05T16:00', gonderenKullaniciId: 'm-2', durum: 'okundu' },
  { id: 'msg-13', sohbetId: 'sohbet-2', yon: 'gelen', govde: 'Karşıyaka\'da oturuyoruz, tam adresi harita konumundan atayım şimdi. Mevcut dolap var ama sökümü biz hallederiz.', tarih: '2026-08-06T09:30' },
  { id: 'msg-14', sohbetId: 'sohbet-2', yon: 'giden', govde: 'Konumu aldım, teşekkürler. Perşembe 14:00 için randevunuzu oluşturdum. Ekibimiz gelmeden 15 dk önce haber verir.', tarih: '2026-08-06T11:00', gonderenKullaniciId: 'm-2', durum: 'okundu' },
  { id: 'msg-15', sohbetId: 'sohbet-2', yon: 'gelen', govde: 'Harika, görüşmek üzere. Bir de aklıma gelmişken, aynalı dolap da yapıyor musunuz?', tarih: '2026-08-07T08:00' },

  // ═══ sohbet-3: Elif Sancak · uretim · Beste (m-1) · 8 mesaj ═══
  { id: 'msg-16', sohbetId: 'sohbet-3', yon: 'gelen', govde: 'Beste Hanım merhaba, dolapların son durumu nedir? Montaj için tarih belli oldu mu?', tarih: '2026-07-25T09:00' },
  { id: 'msg-17', sohbetId: 'sohbet-3', yon: 'giden', govde: 'Elif Hanım merhaba, dolaplarınız imalatta, bu hafta sonuna kadar hazır olur. Montaj için önümüzdeki hafta çarşamba ya da perşembe planlayabiliriz.', tarih: '2026-07-25T10:15', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-18', sohbetId: 'sohbet-3', yon: 'gelen', govde: 'Çarşamba daha iyi olur. Sabah kaçta gelirsiniz?', tarih: '2026-07-28T11:30' },
  { id: 'msg-19', sohbetId: 'sohbet-3', yon: 'giden', govde: 'Sabah 9\'da ekibi yönlendirelim. Montaj 2 gün sürecek, çarşamba-perşembe bitmiş olur.', tarih: '2026-07-28T13:00', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-20', sohbetId: 'sohbet-3', yon: 'gelen', govde: 'Tamamdır. Tezgahı siz mi monte ediyorsunuz yoksa ayrı bir ekip mi gelecek?', tarih: '2026-08-01T08:45' },
  { id: 'msg-21', sohbetId: 'sohbet-3', yon: 'giden', govde: 'Tezgah ekibi ayrı, dolaplar bittikten sonraki gün onlar gelip ölçü alıp kesimi yapıyor. Cuma günü tezgah montajı olur.', tarih: '2026-08-01T09:30', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-22', sohbetId: 'sohbet-3', yon: 'gelen', govde: 'Anladım, peki kulplar geldi mi? Geçen ay seçtiğimiz mat siyah model.', tarih: '2026-08-07T16:00' },
  { id: 'msg-23', sohbetId: 'sohbet-3', yon: 'giden', govde: 'Geldi, dün teslim aldık. Dolaplarla birlikte montaja hazır. Çarşamba görüşmek üzere!', tarih: '2026-08-07T17:30', gonderenKullaniciId: 'm-1', durum: 'iletildi' },

  // ═══ sohbet-4: Sibel Erdoğan · teklif · Beste (m-1) · 9 mesaj · CEVAPSIZ ═══
  { id: 'msg-24', sohbetId: 'sohbet-4', yon: 'gelen', govde: 'Beste Hanım iyi günler, geçen haftaki görüşmeden sonra bizim mutfak için 3D çizim ne zaman hazır olur?', tarih: '2026-07-29T10:00' },
  { id: 'msg-25', sohbetId: 'sohbet-4', yon: 'giden', govde: 'Sibel Hanım merhaba, çiziminiz bu cuma hazır. Size buradan görselleri atarım, beğenirseniz revizyonları konuşuruz.', tarih: '2026-07-29T11:15', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-26', sohbetId: 'sohbet-4', yon: 'gelen', govde: 'Süper, bekliyorum. Bu arada adayı L şeklinde değil de düz istemiştik değil mi?', tarih: '2026-07-29T14:00' },
  { id: 'msg-27', sohbetId: 'sohbet-4', yon: 'giden', govde: 'Evet düz ada olarak çiziyorum. 180x90 cm ölçülerinde, altında depolama olacak şekilde.', tarih: '2026-07-29T15:30', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-28', sohbetId: 'sohbet-4', yon: 'gelen', govde: 'Tamamdır. Bir de ocak davlumbaz ikisi de Siemens olsun, onu not almış mıydınız?', tarih: '2026-07-30T09:45' },
  { id: 'msg-29', sohbetId: 'sohbet-4', yon: 'giden', govde: 'Not aldım. Ankastre set olarak Siemens iQ500 serisi öneririm, fiyat-performans olarak iyi. Teklife ekleyeyim.', tarih: '2026-07-30T11:00', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-30', sohbetId: 'sohbet-4', yon: 'gelen', govde: 'Olur. Peki toplam bütçe ne civarda olur şimdiden söyleyebilir misiniz?', tarih: '2026-07-31T16:00' },
  { id: 'msg-31', sohbetId: 'sohbet-4', yon: 'giden', govde: 'Kaba bir hesapla lake mutfak + ada + ankastre set 320-350 bin TL arası olur. Cuma günü kesin teklifi iletirim.', tarih: '2026-07-31T17:15', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-32', sohbetId: 'sohbet-4', yon: 'gelen', govde: 'Beste Hanım cuma günü çizimi gönderdiniz ama teklifi eklememişsiniz. Fiyatı da iletebilir misiniz? Ve ada ölçüsünü 200x100 yapabilir miyiz?', tarih: '2026-08-08T09:15' },

  // ═══ sohbet-5: Pınar Toprak · kapandi · Beste (m-1) · 8 mesaj ═══
  { id: 'msg-33', sohbetId: 'sohbet-5', yon: 'gelen', govde: 'Beste Hanım, geçen ay yaptırdığımız gömme dolap için çok teşekkürler. Çok memnun kaldık.', tarih: '2026-07-30T15:00' },
  { id: 'msg-34', sohbetId: 'sohbet-5', yon: 'giden', govde: 'Pınar Hanım beğenmenize çok sevindim! Herhangi bir sorun yaşadınız mı peki?', tarih: '2026-07-30T16:30', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-35', sohbetId: 'sohbet-5', yon: 'gelen', govde: 'Hayır hiç sorun yok, işçilik harika. Komşum da bayıldı, bu hafta onu da size yönlendireceğim.', tarih: '2026-07-31T11:00' },
  { id: 'msg-36', sohbetId: 'sohbet-5', yon: 'giden', govde: 'Çok teşekkür ederim, yönlendirmeniz için de ayrıca sağ olun. Bu arada vestiyer ihtiyacınız olduğundan bahsetmiştiniz, düşünüyor musunuz?', tarih: '2026-07-31T14:15', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-37', sohbetId: 'sohbet-5', yon: 'gelen', govde: 'Evet evet, eylül gibi antreye vestiyer yaptıracağız. O zaman sizi ararım.', tarih: '2026-08-01T10:30' },
  { id: 'msg-38', sohbetId: 'sohbet-5', yon: 'giden', govde: 'Harika, beklerim. Eylül öncesi bir ön görüşme yapalım isterseniz, ölçüyü alıp alternatif çizelim.', tarih: '2026-08-01T12:00', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-39', sohbetId: 'sohbet-5', yon: 'gelen', govde: 'Olur, ağustos sonu müsaitim. O zaman haberleşiriz.', tarih: '2026-08-04T09:45' },
  { id: 'msg-40', sohbetId: 'sohbet-5', yon: 'giden', govde: 'Anlaştık, notumu aldım. Ağustos sonu görüşmek üzere Pınar Hanım.', tarih: '2026-08-05T16:30', gonderenKullaniciId: 'm-1', durum: 'okundu' },

  // ═══ sohbet-6: Gizem Arslan · goruculuk · Kaan (m-3) · 5 mesaj ═══
  { id: 'msg-41', sohbetId: 'sohbet-6', yon: 'gelen', govde: 'Merhaba, Emre Bey\'in tavsiyesiyle yazıyorum. Gebze\'deyiz, mutfak yenileme düşünüyoruz.', tarih: '2026-08-05T13:00' },
  { id: 'msg-42', sohbetId: 'sohbet-6', yon: 'giden', govde: 'Gizem Hanım merhaba, Emre Bey\'e selamlar. Mutfak için ölçü alıp ücretsiz keşif yapalım, size en yakın zamanda bir randevu verelim.', tarih: '2026-08-05T14:30', gonderenKullaniciId: 'm-3', durum: 'okundu' },
  { id: 'msg-43', sohbetId: 'sohbet-6', yon: 'gelen', govde: 'Bu hafta sonu müsait misiniz? Cumartesi öğlen gelebilir misiniz?', tarih: '2026-08-06T10:00' },
  { id: 'msg-44', sohbetId: 'sohbet-6', yon: 'giden', govde: 'Cumartesi 11:00\'de müsaitiz. Adresinizi ve telefonunuzu yazın lütfen, ekibimiz yola çıkmadan arasın.', tarih: '2026-08-06T14:00', gonderenKullaniciId: 'm-3', durum: 'okundu' },
  { id: 'msg-45', sohbetId: 'sohbet-6', yon: 'gelen', govde: 'Adres: İnönü Mah. Lale Sk. No:12 Gebze. Telefonum 0546 660 13 26. Cumartesi görüşmek üzere.', tarih: '2026-08-06T15:45' },
  { id: 'msg-90', sohbetId: 'sohbet-6', yon: 'giden', govde: 'Adresi aldım Gizem Hanım, teşekkürler. Cumartesi 11:00 için randevunuzu oluşturdum, ekibimiz yola çıkmadan sizi arayacak.', tarih: '2026-08-06T16:10', gonderenKullaniciId: 'm-3', durum: 'okundu' },

  // ═══ sohbet-7: Nazlı Çetinkaya · teklif · Berna (m-2) · 6 mesaj · CEVAPSIZ ═══
  { id: 'msg-46', sohbetId: 'sohbet-7', yon: 'gelen', govde: 'Berna Hanım iyi günler, Bornova\'daki daire için teklif hazırdır umarım?', tarih: '2026-08-03T10:30' },
  { id: 'msg-47', sohbetId: 'sohbet-7', yon: 'giden', govde: 'Nazlı Hanım merhaba, teklifiniz hazır. Mutfak + banyo toplam 185.000 TL. Kalem kalem dökümünü PDF olarak ileteyim mi?', tarih: '2026-08-03T13:00', gonderenKullaniciId: 'm-2', durum: 'okundu' },
  { id: 'msg-48', sohbetId: 'sohbet-7', yon: 'gelen', govde: 'Evet PDF atın lütfen. Bir de banyodaki dolabın rengini beyaz yerine krem yapabilir miyiz?', tarih: '2026-08-04T15:00' },
  { id: 'msg-49', sohbetId: 'sohbet-7', yon: 'giden', govde: 'PDF\'i gönderdim. Krem renk olur, herhangi bir fiyat farkı yok. Renk kartelasından RAL 1013 seçelim mi?', tarih: '2026-08-04T17:15', gonderenKullaniciId: 'm-2', durum: 'okundu' },
  { id: 'msg-50', sohbetId: 'sohbet-7', yon: 'gelen', govde: 'RAL 1013 güzel duruyor, onaylıyorum. Peki montaj ne zamana yetişir? Kiracı ağustos sonunda çıkıyor.', tarih: '2026-08-05T11:00' },
  { id: 'msg-51', sohbetId: 'sohbet-7', yon: 'gelen', govde: 'Bu arada mutfak tezgahı için de siyah granit fiyatı alabilir miyim?', tarih: '2026-08-07T11:30' },

  // ═══ sohbet-8: Derya Solmaz · uretim · Berna (m-2) · 8 mesaj ═══
  { id: 'msg-52', sohbetId: 'sohbet-8', yon: 'gelen', govde: 'Berna Hanım, merdiven altı dolabın çizimini gönderdim. Ölçülere uygun olur mu?', tarih: '2026-07-27T10:00' },
  { id: 'msg-53', sohbetId: 'sohbet-8', yon: 'giden', govde: 'Derya Hanım çizimi inceledim, ölçüler uygun. Merdiven eğimine göre kapakların açılma yönünü ayarlayacağız.', tarih: '2026-07-27T11:30', gonderenKullaniciId: 'm-2', durum: 'okundu' },
  { id: 'msg-54', sohbetId: 'sohbet-8', yon: 'gelen', govde: 'Süper. Malzeme olarak ne kullanacaktık?', tarih: '2026-07-29T09:15' },
  { id: 'msg-55', sohbetId: 'sohbet-8', yon: 'giden', govde: '18 mm lake MDF, renk mat beyaz. İç raflar 16 mm beyaz suntalam olacak.', tarih: '2026-07-29T10:00', gonderenKullaniciId: 'm-2', durum: 'okundu' },
  { id: 'msg-56', sohbetId: 'sohbet-8', yon: 'gelen', govde: 'Tamamdır. Teslimat için İzmit\'e geliyor musunuz?', tarih: '2026-08-01T14:00' },
  { id: 'msg-57', sohbetId: 'sohbet-8', yon: 'giden', govde: 'Evet İzmit\'e montaj ekibimiz geliyor. Çarşamba günü montaj için uygun musunuz?', tarih: '2026-08-01T15:30', gonderenKullaniciId: 'm-2', durum: 'okundu' },
  { id: 'msg-58', sohbetId: 'sohbet-8', yon: 'gelen', govde: 'Çarşamba uygun. Saat 10\'da evde olurum.', tarih: '2026-08-05T09:00' },
  { id: 'msg-59', sohbetId: 'sohbet-8', yon: 'giden', govde: 'Harika, çarşamba 10:00 için montaj ekibini yönlendiriyorum. Görüşmek üzere!', tarih: '2026-08-06T17:00', gonderenKullaniciId: 'm-2', durum: 'iletildi' },

  // ═══ sohbet-9: Hakan Türkmen · goruculuk · Beste (m-1) · 5 mesaj · CEVAPSIZ ═══
  { id: 'msg-60', sohbetId: 'sohbet-9', yon: 'gelen', govde: 'Merhaba, Üsküdar\'daki ofisimiz için ankastre mutfak yaptırmak istiyoruz. Ticari bir ofis, küçük bir mutfak.', tarih: '2026-08-06T14:00' },
  { id: 'msg-61', sohbetId: 'sohbet-9', yon: 'giden', govde: 'Hakan Bey merhaba, ofis mutfakları için de çalışıyoruz. Ölçü için ne zaman müsait olursunuz?', tarih: '2026-08-06T16:00', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-62', sohbetId: 'sohbet-9', yon: 'gelen', govde: 'Haftaya salı ya da çarşamba sabah saatlerinde uygunuz. Ofis Altunizade\'de.', tarih: '2026-08-07T10:00' },
  { id: 'msg-63', sohbetId: 'sohbet-9', yon: 'giden', govde: 'Salı 10:00\'da gelebiliriz. Ofis bütçesi hakkında bir fikriniz var mı, ona göre malzeme alternatifi sunalım.', tarih: '2026-08-07T14:30', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-64', sohbetId: 'sohbet-9', yon: 'gelen', govde: 'Bütçe olarak 80-100 bin düşünüyoruz ama net değil. Bir de ofis olduğu için hijyenik ve kolay temizlenir malzeme önerir misiniz?', tarih: '2026-08-08T08:30' },

  // ═══ sohbet-10: Cem Aksoy · yeni-talep · Beste (m-1) · 6 mesaj ═══
  { id: 'msg-65', sohbetId: 'sohbet-10', yon: 'gelen', govde: 'Merhaba, Instagram\'dan gördüm. Mutfak dolabı yaptırmak istiyorum, fiyat bilgisi alabilir miyim?', tarih: '2026-08-04T16:00' },
  { id: 'msg-66', sohbetId: 'sohbet-10', yon: 'giden', govde: 'Merhaba Cem Bey, öncelikle ölçü ve malzeme seçimine göre fiyat değişiyor. Size ücretsiz keşif randevusu verelim, mimar arkadaşımız gelip ölçü alsın.', tarih: '2026-08-05T09:15', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-67', sohbetId: 'sohbet-10', yon: 'gelen', govde: 'Keşif ücretli mi? Bir de ortalama metrekaresi ne kadar oluyor?', tarih: '2026-08-05T11:30' },
  { id: 'msg-68', sohbetId: 'sohbet-10', yon: 'giden', govde: 'Keşif ücretsiz. M² fiyatı malzemeye göre 18.000-28.000 TL arası değişiyor. MDF, lake, akrilik seçeneklerimiz var.', tarih: '2026-08-06T10:00', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-69', sohbetId: 'sohbet-10', yon: 'gelen', govde: 'Anladım. Peki bu hafta cuma müsait misiniz? Akşam 6\'dan sonra evdeyim.', tarih: '2026-08-06T16:30' },
  { id: 'msg-70', sohbetId: 'sohbet-10', yon: 'giden', govde: 'Cuma akşam 18:30\'da uygunuz. Adresinizi paylaşın, ekibimiz gelsin.', tarih: '2026-08-07T14:00', gonderenKullaniciId: 'm-1', durum: 'iletildi' },

  // ═══ sohbet-11: Deniz Koç · yeni-talep · Beste (m-1) · 7 mesaj ═══
  { id: 'msg-71', sohbetId: 'sohbet-11', yon: 'gelen', govde: 'İyi günler, showroom\'unuzu gezdik dün. Çok beğendik. Mutfak için görüşmek isteriz.', tarih: '2026-08-03T11:00' },
  { id: 'msg-72', sohbetId: 'sohbet-11', yon: 'giden', govde: 'Merhaba, showroom\'u beğenmenize sevindik! Mutfağınız için ölçü alalım, ardından 3D çizimle alternatif sunalım. Ne zaman uygun olursunuz?', tarih: '2026-08-03T13:30', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-73', sohbetId: 'sohbet-11', yon: 'gelen', govde: 'Haftaya pazartesi öğleden sonra? Bir de bizim mutfak biraz küçük, L tipi düşünüyoruz.', tarih: '2026-08-04T10:00' },
  { id: 'msg-74', sohbetId: 'sohbet-11', yon: 'giden', govde: 'Pazartesi 14:00 uygun. Küçük mutfaklarda L tipi en verimli çözüm, size özel çizeriz.', tarih: '2026-08-04T11:45', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-75', sohbetId: 'sohbet-11', yon: 'gelen', govde: 'Tamamdır. Beyaz eşyaları biz mi alıyoruz?', tarih: '2026-08-05T15:00' },
  { id: 'msg-76', sohbetId: 'sohbet-11', yon: 'giden', govde: 'İsterseniz siz alırsınız, isterseniz biz tedarik ederiz. Biz alırsak bayi indirimiyle daha uyguna geliyor genelde.', tarih: '2026-08-05T16:30', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-77', sohbetId: 'sohbet-11', yon: 'gelen', govde: 'O zaman sizden alalım, pazartesi detaylı konuşuruz.', tarih: '2026-08-06T12:15' },
  { id: 'msg-91', sohbetId: 'sohbet-11', yon: 'giden', govde: 'Harika, pazartesi 14:00\'te showroom\'da bekliyoruz. Ölçüleri de yanınızda getirirseniz aynı gün ön fiyat çıkarabiliriz.', tarih: '2026-08-06T12:40', gonderenKullaniciId: 'm-2', durum: 'iletildi' },

  // ═══ sohbet-12: Funda Özkan · yeni-talep · Berna (m-2) · 5 mesaj ═══
  { id: 'msg-78', sohbetId: 'sohbet-12', yon: 'gelen', govde: 'Merhaba, arkadaşım Pınar Toprak sizi tavsiye etti. Banyo yenileme için fiyat alabilir miyim?', tarih: '2026-08-03T09:30' },
  { id: 'msg-79', sohbetId: 'sohbet-12', yon: 'giden', govde: 'Merhaba Funda Hanım, Pınar Hanım\'a selamlar. Banyo için keşif yapalım, size özel tasarım ve teklif hazırlayalım.', tarih: '2026-08-03T11:00', gonderenKullaniciId: 'm-2', durum: 'okundu' },
  { id: 'msg-80', sohbetId: 'sohbet-12', yon: 'gelen', govde: 'Keşif için bu hafta perşembe uygun musunuz?', tarih: '2026-08-04T14:30' },
  { id: 'msg-81', sohbetId: 'sohbet-12', yon: 'giden', govde: 'Perşembe 11:00\'de gelebiliriz. Adres ve telefon paylaşır mısınız?', tarih: '2026-08-04T16:00', gonderenKullaniciId: 'm-2', durum: 'okundu' },
  { id: 'msg-82', sohbetId: 'sohbet-12', yon: 'gelen', govde: 'Adres ve telefonu özelden gönderdim. Perşembe görüşmek üzere. Bu arada Pınar\'ın evindeki gibi lake dolap düşünüyoruz.', tarih: '2026-08-05T10:45' },
  { id: 'msg-92', sohbetId: 'sohbet-12', yon: 'giden', govde: 'Bilgileri aldım Funda Hanım. Perşembe 11:00 için randevunuz hazır. Lake dolap örneklerini de yanımızda getiririz.', tarih: '2026-08-05T11:20', gonderenKullaniciId: 'm-1', durum: 'okundu' },

  // ═══ sohbet-13: Mert Çelik · yeni-talep · Beste (m-1) · 4 mesaj ═══
  { id: 'msg-83', sohbetId: 'sohbet-13', yon: 'gelen', govde: 'Selamlar, Google\'dan buldum. Ankara Çankaya\'dayım, gömme dolap yaptırmak istiyorum.', tarih: '2026-08-03T15:00' },
  { id: 'msg-84', sohbetId: 'sohbet-13', yon: 'giden', govde: 'Mert Bey merhaba, Çankaya\'ya ekibimiz geliyor. Kaç metre dolap düşünüyorsunuz? Yatak odası mı, antre mi?', tarih: '2026-08-04T10:30', gonderenKullaniciId: 'm-1', durum: 'okundu' },
  { id: 'msg-85', sohbetId: 'sohbet-13', yon: 'gelen', govde: 'Yatak odası, yaklaşık 3 metre. Sürgülü kapak istiyorum, aynalı olabilir mi?', tarih: '2026-08-04T14:00' },
  { id: 'msg-86', sohbetId: 'sohbet-13', yon: 'giden', govde: 'Aynalı sürgülü kapak yapabiliyoruz. 3 metre için ortalama 65-80 bin TL arası olur, malzemeye göre. İsterseniz keşif için randevu verelim.', tarih: '2026-08-04T16:00', gonderenKullaniciId: 'm-1', durum: 'iletildi' },

  // ═══ sohbet-14: Aslı Duru · yeni-talep · Kaan (m-3) · 3 mesaj ═══
  { id: 'msg-87', sohbetId: 'sohbet-14', yon: 'gelen', govde: 'Merhaba, mutfak tezgahı için granit fiyatı alabilir miyim? 3.5 metre civarı.', tarih: '2026-08-03T10:00' },
  { id: 'msg-88', sohbetId: 'sohbet-14', yon: 'giden', govde: 'Merhaba Aslı Hanım, granit tezgah m² fiyatımız 8.500 TL. 3.5 metre için yaklaşık 30 bin TL olur. Hangi renk düşünüyorsunuz?', tarih: '2026-08-03T12:00', gonderenKullaniciId: 'm-3', durum: 'okundu' },
  { id: 'msg-89', sohbetId: 'sohbet-14', yon: 'gelen', govde: 'Teşekkürler, siyah granit düşünüyoruz. Bir de mevcut tezgahı söküyor musunuz?', tarih: '2026-08-03T13:30' },
  { id: 'msg-93', sohbetId: 'sohbet-14', yon: 'giden', govde: 'Siyah granit stoklarımızda mevcut. Mevcut tezgahın sökümünü de biz yapıyoruz, montaj bedeline dahil. Keşif için uygun olduğunuz bir günü yazabilir misiniz?', tarih: '2026-08-03T14:05', gonderenKullaniciId: 'm-3', durum: 'iletildi' }
]
