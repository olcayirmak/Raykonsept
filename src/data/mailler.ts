// Faz 1 mock veri kaynağı. Bkz. musteriler.ts

// Type Imports
import type { Mail } from '@/types/mailTypes'

export const mailler: Mail[] = [
  // ── Zincir 1: Barış Ekinci (mus-14) — 3D görsel revizyon ──
  {
    id: 'mail-1',
    musteriId: 'mus-14',
    projeId: 'prj-1',
    klasor: 'giden',
    gonderenAd: 'Kaan Güneş',
    gonderenEposta: 'kaan.gunes@raykonsept.com',
    aliciAd: 'Barış Ekinci',
    aliciEposta: 'baris.ekinci@example.com',
    konu: 'Villa tadilat — 3D görseller hazır',
    govde:
      'Merhaba Barış Bey,\n\n' +
      'Ataşehir\'deki villanız için hazırladığımız 3D görseller tamamlandı. TV ünitesi ve iç mimari düzenlemeleri aşağıdaki linkten inceleyebilirsiniz:\n\n' +
      'https://paylasim.raykonsept.com/projeler/prj-1\n\n' +
      'Özellikle oturma odasındaki Amerikan panel detayları ve mutfak-oturma geçişindeki çözüm dikkatinizi çekecektir. ' +
      'Görseller üzerinde değişiklik istediğiniz noktaları not almanızı rica ediyorum.\n\n' +
      'Bir sonraki adımda revizyonları toplayıp güncelleyeceğiz.\n\n' +
      'İyi çalışmalar,\nKaan Güneş\nRay Konsept İç Mimarlık',
    tarih: '2026-07-10T14:30',
    okundu: true,
    yildizli: false
  },
  {
    id: 'mail-2',
    musteriId: 'mus-14',
    projeId: 'prj-1',
    klasor: 'gelen',
    gonderenAd: 'Barış Ekinci',
    gonderenEposta: 'baris.ekinci@example.com',
    aliciAd: 'Kaan Güneş',
    aliciEposta: 'kaan.gunes@raykonsept.com',
    konu: 'Re: Villa tadilat — 3D görseller hazır',
    govde:
      'Kaan Bey merhaba,\n\n' +
      'Görselleri inceledim, elinize sağlık. Genel olarak çok beğendik. Yalnız birkaç noktada değişiklik rica edeceğim:\n\n' +
      '1. TV ünitesindeki ahşap kaplamanın rengini bir ton daha koyu düşünebilir miyiz? Mevcut hali biraz açık kalmış.\n' +
      '2. Ada tezgâhın mermer desenini görseldekinden daha sade bir modelle değiştirmek istiyoruz. ' +
      'Eşim Calacatta değil de daha az damarlı bir model tercih ediyor.\n' +
      '3. Oturma odasındaki aydınlatma planını da görebilir miyiz?\n\n' +
      'Bunları güncelleyip tekrar paylaşabilir misiniz?\n\n' +
      'Teşekkürler,\nBarış Ekinci',
    tarih: '2026-07-12T09:15',
    okundu: true,
    yildizli: true
  },
  {
    id: 'mail-3',
    musteriId: 'mus-14',
    projeId: 'prj-1',
    klasor: 'giden',
    gonderenAd: 'Kaan Güneş',
    gonderenEposta: 'kaan.gunes@raykonsept.com',
    aliciAd: 'Barış Ekinci',
    aliciEposta: 'baris.ekinci@example.com',
    konu: 'Re: Villa tadilat — revize 3D görseller',
    govde:
      'Barış Bey merhaba,\n\n' +
      'Talep ettiğiniz üç revizyonu da tamamladık:\n\n' +
      '• TV ünitesi ahşabı: Bir ton koyu (ceviz tonu) olarak güncellendi.\n' +
      '• Ada tezgâh: Az damarlı "Bianco Sardo" modeliyle değiştirildi, görseldeki farkı net göreceksiniz.\n' +
      '• Aydınlatma planı: Oturma odası için spot + sarkıt kombinasyonlu plan eklendi.\n\n' +
      'Güncel link: https://paylasim.raykonsept.com/projeler/prj-1/v2\n\n' +
      'Bu haliyle onay verirseniz kesin teklif aşamasına geçelim.\n\n' +
      'İyi günler,\nKaan Güneş',
    tarih: '2026-07-15T16:45',
    okundu: true,
    yildizli: false
  },

  // ── Zincir 2: Emre Doğan (mus-10) — Banyo teklif süreci ──
  {
    id: 'mail-4',
    musteriId: 'mus-10',
    projeId: 'prj-40',
    klasor: 'gelen',
    gonderenAd: 'Emre Doğan',
    gonderenEposta: 'emre.dogan@example.com',
    aliciAd: 'Ray Konsept',
    aliciEposta: 'info@raykonsept.com',
    konu: 'Banyo yenileme — fiyat bilgisi talebi',
    govde:
      'Merhaba,\n\n' +
      'Gebze\'de yeni yapı dairemiz için banyo dolabı ve tezgâhı yaptırmak istiyoruz. ' +
      'Sibel Erdoğan\'dan sizi duyduk, kendisi çok memnun kaldığını söyledi.\n\n' +
      'Banyo yaklaşık 6 m². Fayanslar hazır, armatürler alınmadı. Dolap, tezgâh ve ayna tasarımı konusunda destek istiyoruz. ' +
      'Ortalama bir fiyat aralığı paylaşabilir misiniz? Ayrıca keşif için ne zaman gelebilirsiniz?\n\n' +
      'Teşekkürler,\nEmre Doğan\n0533 713 56 63',
    tarih: '2026-07-18T11:20',
    okundu: true,
    yildizli: false
  },
  {
    id: 'mail-5',
    musteriId: 'mus-10',
    projeId: 'prj-40',
    klasor: 'giden',
    gonderenAd: 'Beste Yardımcı',
    gonderenEposta: 'beste.yardimci@raykonsept.com',
    aliciAd: 'Emre Doğan',
    aliciEposta: 'emre.dogan@example.com',
    konu: 'Re: Banyo yenileme — keşif ve ön teklif',
    govde:
      'Emre Bey merhaba,\n\n' +
      'Sibel Hanım\'a bizi tavsiye ettiği için teşekkür ederiz.\n\n' +
      'Gebze\'deki daireniz için Salı günü saat 11:00\'de keşfe gelebilirim. Keşifte ölçüleri alıp malzeme seçeneklerini ' +
      'yerinde konuşuruz. Armatür seçimi konusunda da tedarikçilerimizle uygun alternatifler sunabiliriz.\n\n' +
      'Ön bilgi olarak: 6 m² bir banyo için dolap + tezgâh + ayna komple paketimiz montaj hariç 180.000-240.000 TL ' +
      'bandında başlıyor. Net rakamı keşiften sonra malzeme seçimine göre vereceğiz.\n\n' +
      'Sizin için Salı 11:00 uygun mudur?\n\n' +
      'Sevgiler,\nBeste Yardımcı\nRay Konsept İç Mimarlık',
    tarih: '2026-07-19T13:00',
    okundu: true,
    yildizli: false
  },
  {
    id: 'mail-6',
    musteriId: 'mus-10',
    projeId: 'prj-40',
    klasor: 'gelen',
    gonderenAd: 'Emre Doğan',
    gonderenEposta: 'emre.dogan@example.com',
    aliciAd: 'Beste Yardımcı',
    aliciEposta: 'beste.yardimci@raykonsept.com',
    konu: 'Re: Banyo yenileme — teklif onayı ve kapora',
    govde:
      'Beste Hanım merhaba,\n\n' +
      'Salı günkü keşif ve sonrasındaki takibiniz için teşekkürler. Hazırladığınız 198.000 TL\'lik teklifi kabul ediyoruz.\n\n' +
      'Bugün kapora olarak 40.000 TL\'yi hesabınıza havale ettim. Dekont ekte.\n\n' +
      'Üretim sürecine başlayabilirsiniz. Teslimat tarihi olarak Ocak sonunu not aldık, uygun mudur?\n\n' +
      'Teşekkürler,\nEmre Doğan',
    tarih: '2026-07-25T15:10',
    okundu: true,
    yildizli: true
  },

  // ── Zincir 3: Ayşe Demirtaş (mus-1) — Mutfak keşif randevusu ──
  {
    id: 'mail-7',
    musteriId: 'mus-1',
    klasor: 'gelen',
    gonderenAd: 'Ayşe Demirtaş',
    gonderenEposta: 'ayse.demirtas@example.com',
    aliciAd: 'Ray Konsept',
    aliciEposta: 'info@raykonsept.com',
    konu: 'Mutfak dolabı hakkında bilgi',
    govde:
      'Merhaba,\n\n' +
      'Instagram sayfanızı gördüm, mutfak projeleriniz çok hoş. Nilüfer/Bursa\'daki dairem için mutfak dolabı yaptırmak istiyorum. ' +
      'Mutfak yaklaşık 14 m², L tipi düşünüyoruz.\n\n' +
      'Örnek bir fiyat aralığı ve çalışma süreci hakkında bilgi verebilir misiniz? ' +
      'Bursa\'ya gelip keşif yapıyor musunuz?\n\n' +
      'Teşekkürler,\nAyşe Demirtaş\n0545 514 20 35',
    tarih: '2026-07-20T10:45',
    okundu: true,
    yildizli: false
  },
  {
    id: 'mail-8',
    musteriId: 'mus-1',
    klasor: 'giden',
    gonderenAd: 'Kaan Güneş',
    gonderenEposta: 'kaan.gunes@raykonsept.com',
    aliciAd: 'Ayşe Demirtaş',
    aliciEposta: 'ayse.demirtas@example.com',
    konu: 'Re: Mutfak dolabı hakkında bilgi',
    govde:
      'Ayşe Hanım merhaba,\n\n' +
      'İlginiz için teşekkür ederiz. Bursa\'ya (Nilüfer dahil) düzenli olarak keşfe gidiyoruz, hiç sorun değil.\n\n' +
      '14 m² L tipi mutfak için ön bilgi: MDF lake kapak, akrilik tezgâh ile komple mutfak paketimiz 280.000-450.000 TL ' +
      'bandında değişiyor. Net fiyatı keşifte alacağımız ölçüler ve seçeceğiniz malzemeye göre belirleyeceğiz.\n\n' +
      'Çarşamba günü saat 14:00\'te keşfe gelsek sizin için uygun olur mu?\n\n' +
      'İyi günler,\nKaan Güneş\nRay Konsept İç Mimarlık',
    tarih: '2026-07-21T09:30',
    okundu: true,
    yildizli: false
  },
  {
    id: 'mail-9',
    musteriId: 'mus-1',
    klasor: 'gelen',
    gonderenAd: 'Ayşe Demirtaş',
    gonderenEposta: 'ayse.demirtas@example.com',
    aliciAd: 'Kaan Güneş',
    aliciEposta: 'kaan.gunes@raykonsept.com',
    konu: 'Re: Mutfak dolabı — keşif onayı',
    govde:
      'Kaan Bey merhaba,\n\n' +
      'Çarşamba 14:00 bana da uygun. Adresi aşağıda paylaşıyorum:\n\n' +
      'Görükle Mah. Atatürk Cad. No:42 D:8, Nilüfer/Bursa\n\n' +
      'Görüşmek üzere,\nAyşe Demirtaş',
    tarih: '2026-07-23T18:20',
    okundu: true,
    yildizli: false
  },

  // ── Zincir 4: Tur Otelcilik (mus-21) — Kurumsal proje ──
  {
    id: 'mail-10',
    musteriId: 'mus-21',
    projeId: 'prj-9',
    klasor: 'gelen',
    gonderenAd: 'Ayça Tur',
    gonderenEposta: 'info@tur.example',
    aliciAd: 'Ray Konsept',
    aliciEposta: 'info@raykonsept.com',
    konu: 'Otel lobi yenileme — iç mimari teklif talebi',
    govde:
      'Merhaba,\n\n' +
      'Gebze\'deki butik otelimizin lobi katını yenilemek istiyoruz. Yaklaşık 80 m² bir alan. ' +
      'Resepsiyon bankosu, bekleme alanı ve küçük bir kafe köşesi düşünüyoruz.\n\n' +
      'Showroom\'unuzu ziyaret eden ortağımız Murat Bey olumlu bahsetti. ' +
      'Komple iç mimari hizmeti (tasarım + uygulama) almak istiyoruz.\n\n' +
      'Ön teklif ve referans projelerinizi paylaşabilir misiniz?\n\n' +
      'Saygılarımla,\nAyça Tur\nTur Otelcilik Ltd.',
    tarih: '2026-07-28T16:00',
    okundu: true,
    yildizli: true
  },
  {
    id: 'mail-11',
    musteriId: 'mus-21',
    projeId: 'prj-9',
    klasor: 'giden',
    gonderenAd: 'Beste Yardımcı',
    gonderenEposta: 'beste.yardimci@raykonsept.com',
    aliciAd: 'Ayça Tur',
    aliciEposta: 'info@tur.example',
    konu: 'Re: Otel lobi yenileme — ön teklif ve referanslar',
    govde:
      'Ayça Hanım merhaba,\n\n' +
      'İlginiz için teşekkür ederiz. Butik otel projelerinde daha önce de çalıştık; referanslarımızdan bazılarını aşağıda paylaşıyorum:\n\n' +
      '• The Green Hotel / Kartal — Lobi + restoran yenileme (2024)\n' +
      '• Marin Butik Otel / Sapanca — Komple iç mimari (2025)\n\n' +
      '80 m² lobi + resepsiyon + kafe köşesi için ön tahmini bütçe 1.800.000-2.250.000 TL aralığında olur. ' +
      'Tasarım, malzeme ve uygulama pakete dahil.\n\n' +
      'Yerinizde keşif yapıp net ölçüleri aldıktan sonra 10 iş günü içinde konsept paftası ve kesin teklifi sunabiliriz.\n\n' +
      'Uygun bir gün için sizden haber bekliyorum.\n\n' +
      'Sevgiler,\nBeste Yardımcı\nRay Konsept İç Mimarlık',
    tarih: '2026-07-30T11:30',
    okundu: true,
    yildizli: false
  },
  {
    id: 'mail-12',
    musteriId: 'mus-21',
    projeId: 'prj-9',
    klasor: 'gelen',
    gonderenAd: 'Ayça Tur',
    gonderenEposta: 'info@tur.example',
    aliciAd: 'Beste Yardımcı',
    aliciEposta: 'beste.yardimci@raykonsept.com',
    konu: 'Re: Otel lobi yenileme — keşif takvimi',
    govde:
      'Beste Hanım,\n\n' +
      'Referansları inceledik, özellikle Marin Butik Otel çok beğendiğimiz bir tarz. Tebrikler.\n\n' +
      'Keşif için önümüzdeki hafta Perşembe sabah 10:00 uygun. ' +
      'Bu arada teklifte belirttiğiniz aralığın içinde kalabilirsek seviniriz; bütçemiz maksimum 2 milyon.\n\n' +
      'Görüşmek üzere,\nAyça Tur',
    tarih: '2026-08-02T14:15',
    okundu: false,
    yildizli: false
  },

  // ── Bağımsız mailler ──

  {
    id: 'mail-13',
    musteriId: 'mus-11',
    projeId: 'prj-41',
    klasor: 'gelen',
    gonderenAd: 'Gizem Arslan',
    gonderenEposta: 'gizem.arslan@example.com',
    aliciAd: 'Ray Konsept',
    aliciEposta: 'info@raykonsept.com',
    konu: 'Giyinme odası dolabı — fiyat bilgisi',
    govde:
      'Merhaba,\n\n' +
      'Instagram\'dan takip ediyorum, işleriniz çok güzel. Gebze\'deki dairem için giyinme odası yaptırmak istiyorum. ' +
      'Yaklaşık 8 m² bir alan, tavana kadar dolap düşünüyoruz.\n\n' +
      'Fiyat aralığı ve çalışma takvimi hakkında bilgi alabilir miyim?\n\n' +
      'Teşekkürler,\nGizem Arslan',
    tarih: '2026-08-01T19:40',
    okundu: false,
    yildizli: false
  },
  {
    id: 'mail-14',
    musteriId: 'mus-11',
    projeId: 'prj-41',
    klasor: 'giden',
    gonderenAd: 'Kaan Güneş',
    gonderenEposta: 'kaan.gunes@raykonsept.com',
    aliciAd: 'Gizem Arslan',
    aliciEposta: 'gizem.arslan@example.com',
    konu: 'Re: Giyinme odası dolabı — ilk görüşme',
    govde:
      'Gizem Hanım merhaba,\n\n' +
      'Giyinme odası projelerinde bol örnekli çalışıyoruz, zevkinize uygun bir şey çıkar diye düşünüyorum.\n\n' +
      '8 m² tavana kadar dolap için ön tahmin 120.000-180.000 TL arası. ' +
      'Pazartesi 15:30\'da sizi arayıp keşif günü belirleyelim, telefon numaranızı not aldım.\n\n' +
      'Görüşmek üzere,\nKaan Güneş',
    tarih: '2026-08-02T10:00',
    okundu: true,
    yildizli: true
  },
  {
    id: 'mail-15',
    musteriId: 'mus-17',
    projeId: 'prj-10',
    klasor: 'gelen',
    gonderenAd: 'Selin Kavak',
    gonderenEposta: 'selin.kavak@example.com',
    aliciAd: 'Berna Uz',
    aliciEposta: 'berna.uz@raykonsept.com',
    konu: 'Montaj tarihi değişikliği',
    govde:
      'Berna Hanım merhaba,\n\n' +
      '28 Mart için planlanan montaj gününde evde olmayacağımızı yeni öğrendim. ' +
      'Mümkünse 31 Mart veya 1 Nisan tarihlerinden birine alabilir miyiz?\n\n' +
      'Kusura bakmayın, son dakika değişikliği oldu.\n\n' +
      'Teşekkürler,\nSelin Kavak',
    tarih: '2026-08-03T08:30',
    okundu: false,
    yildizli: false
  },
  {
    id: 'mail-16',
    musteriId: 'mus-17',
    projeId: 'prj-10',
    klasor: 'giden',
    gonderenAd: 'Berna Uz',
    gonderenEposta: 'berna.uz@raykonsept.com',
    aliciAd: 'Selin Kavak',
    aliciEposta: 'selin.kavak@example.com',
    konu: 'Re: Montaj tarihi — 31 Mart onayı',
    govde:
      'Selin Hanım merhaba,\n\n' +
      'Rica ederim, hiç sorun değil. 31 Mart sabah 09:30\'a montaj ekibini yönlendiriyorum.\n\n' +
      'Güncellediğim randevu bilgisini CRM\'e işledim, operasyon ekibine de haber verdim.\n\n' +
      'Montaj öncesi evde olması gereken hazırlıkları 1 hafta kala size ayrıca WhatsApp\'tan ileteceğim.\n\n' +
      'İyi günler,\nBerna Uz',
    tarih: '2026-08-04T09:15',
    okundu: true,
    yildizli: true
  },
  {
    id: 'mail-17',
    musteriId: 'mus-4',
    klasor: 'gelen',
    gonderenAd: 'Mert Korkmaz',
    gonderenEposta: 'mert.korkmaz@example.com',
    aliciAd: 'Ray Konsept',
    aliciEposta: 'info@raykonsept.com',
    konu: 'Malzeme örneklerini görmek istiyorum',
    govde:
      'Merhaba,\n\n' +
      'Ankara Çankaya\'daki daire için daha önce görüşmüştük. MDF renk kartelalarını ve akrilik tezgâh örneklerini ' +
      'yerinde görmek istiyorum.\n\n' +
      'Bu hafta içinde showroom\'a uğramam mümkün. Cumartesi açık mısınız?\n\n' +
      'Mert Korkmaz',
    tarih: '2026-08-04T12:50',
    okundu: false,
    yildizli: false
  },
  {
    id: 'mail-18',
    musteriId: 'mus-2',
    projeId: 'prj-35',
    klasor: 'giden',
    gonderenAd: 'Kaan Güneş',
    gonderenEposta: 'kaan.gunes@raykonsept.com',
    aliciAd: 'Kerem Ünal',
    aliciEposta: 'kerem.unal@example.com',
    konu: 'İzmir villa projesi — ön görüşme daveti',
    govde:
      'Kerem Bey merhaba,\n\n' +
      'Daha önce Bornova\'daki ofisiniz için çalışmıştık. İzmir\'deki yeni villa projeniz olduğunu duydum, ' +
      'Bornova bölgesinde referans işlerimiz mevcut.\n\n' +
      'Villanın banyo projesi için bir ön görüşme yapalım mı? Size uygun bir gün belirleyip detayları konuşabiliriz.\n\n' +
      'İyi çalışmalar,\nKaan Güneş\nRay Konsept İç Mimarlık',
    tarih: '2026-07-08T11:00',
    okundu: true,
    yildizli: false
  },
  {
    id: 'mail-19',
    musteriId: 'mus-16',
    klasor: 'gelen',
    gonderenAd: 'Uğur Bozkurt',
    gonderenEposta: 'ugur.bozkurt@example.com',
    aliciAd: 'Ray Konsept',
    aliciEposta: 'info@raykonsept.com',
    konu: 'Son ödeme dekontu ve teşekkür',
    govde:
      'Merhaba,\n\n' +
      'Bugün kalan bakiye olan 54.000 TL\'yi havale ile gönderdim. Dekont ekte.\n\n' +
      'Proje boyunca gösterdiğiniz ilgi ve titiz çalışma için çok teşekkür ederiz. ' +
      'Özellikle montaj ekibi çok düzenli çalıştı, evi tertemiz bıraktılar. ' +
      'Çevremde ihtiyacı olan herkese sizi tavsiye edeceğim.\n\n' +
      'Saygılarımla,\nUğur Bozkurt',
    tarih: '2026-07-14T17:30',
    okundu: true,
    yildizli: true
  },
  {
    id: 'mail-20',
    musteriId: 'mus-15',
    projeId: 'prj-28',
    klasor: 'gelen',
    gonderenAd: 'Derya Solmaz',
    gonderenEposta: 'derya.solmaz@example.com',
    aliciAd: 'Kaan Güneş',
    aliciEposta: 'kaan.gunes@raykonsept.com',
    konu: 'Keşif sonrası soru — ankastre ürünler',
    govde:
      'Kaan Bey merhaba,\n\n' +
      'Dünkü keşif için teşekkürler. Ankastre fırın ve ocak seçimiyle ilgili birkaç sorum olacak:\n\n' +
      '1. Önerdiğiniz Bosch serisi için bayide indirim uygulayabiliyor musunuz?\n' +
      '2. Davlumbaz gömme mi yoksa duvar tipi mi önerirsiniz? Mutfakta pencereye yakın olduğu için karar veremedik.\n' +
      '3. Buzdolabını ankastre yapmasak da olur, onun yerine dolap tasarımında boşluk bırakabilir miyiz?\n\n' +
      'Cevaplarınıza göre malzeme listesini netleştirelim.\n\n' +
      'Teşekkürler,\nDerya Solmaz',
    tarih: '2026-08-05T09:50',
    okundu: false,
    yildizli: false
  },
  {
    id: 'mail-21',
    musteriId: 'mus-12',
    klasor: 'giden',
    gonderenAd: 'Beste Yardımcı',
    gonderenEposta: 'beste.yardimci@raykonsept.com',
    aliciAd: 'Tolga Menteş',
    aliciEposta: 'tolga.mentes@example.com',
    konu: 'Sözleşme hatırlatması',
    govde:
      'Tolga Bey merhaba,\n\n' +
      'Geçen hafta üzerinde anlaştığımız sözleşmeyi imzalamanızı bekliyoruz. ' +
      'Ankara Yenimahalle\'deki daireniz için mutfak projesine başlayabilmemiz için sözleşmenin tarafımıza ulaşması gerekiyor.\n\n' +
      'Dilerseniz Docusign üzerinden dijital imza ile de halledebiliriz, link gönderebilirim.\n\n' +
      'İyi günler,\nBeste Yardımcı',
    tarih: '2026-08-05T14:00',
    okundu: true,
    yildizli: false
  },
  {
    id: 'mail-22',
    musteriId: 'mus-7',
    projeId: 'prj-21',
    klasor: 'gelen',
    gonderenAd: 'Sibel Erdoğan',
    gonderenEposta: 'sibel.erdogan@example.com',
    aliciAd: 'Beste Yardımcı',
    aliciEposta: 'beste.yardimci@raykonsept.com',
    konu: 'Banyo dolabı — renk onayı',
    govde:
      'Beste Hanım merhaba,\n\n' +
      'Gönderdiğiniz renk kartelasından "Mat Antrasit" modelini seçtik. Kapak kulpları için de fırçalanmış altın rengi olsun.\n\n' +
      'Bu seçimlerle üretime başlayabilirsiniz. Tezgâh için daha önce konuştuğumuz krem mermer geçerli.\n\n' +
      'Sevgiler,\nSibel Erdoğan',
    tarih: '2026-08-05T20:15',
    okundu: false,
    yildizli: false
  }
]

// Yardımcı fonksiyonlar — projeler.ts deseninde
export const musterininMailleri = (musteriId: string) =>
  mailler.filter(mail => mail.musteriId === musteriId)

export const klasorunMailleri = (klasor: Mail['klasor']) =>
  mailler.filter(mail => mail.klasor === klasor)

export const mailBul = (id: string) => mailler.find(mail => mail.id === id)
