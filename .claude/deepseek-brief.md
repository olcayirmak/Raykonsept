# DeepSeek Brief — Ray Konsept CRM

Bu dosya her görevin başına otomatik eklenir. Sen sıfır bağlamla başlıyorsun; önceki
oturumları görmüyorsun. Aşağıdakiler bu projede daha önce yapılmış hatalar ve konulmuş
kurallardır.

## Proje özeti

Ray Konsept, mimarlık/iç mimarlık işi yapan bir firma. Mutfak, dolap, banyo gibi projeleri
müşteriye satıp üretime devrediyor. Bu repo, o sürecin CRM'i.

- **Stack:** Next.js 16 (App Router) + TypeScript + MUI 7, Vuexy admin şablonu üzerine
- **Canlı:** https://mimar.raykonsept.com (Plesk sunucusu, `main`'e push → otomatik deploy)
- **Faz 1 (şu an):** Ekranlar gerçekçi **mock veriyle** hazırlanıyor, müşteriye onaylatılacak.
  Veritabanı ve gerçek kimlik doğrulama henüz YOK.

Süreç akışı (kod içinde bu sıra geçer):
`yeni talep → ön görüşme/fiyat → 3D çizim → revizyon → kesin teklif → sözleşme/kapora → üretime devredildi`
Üretim tarafı: `üretime alındı → hazırlanıyor → montaj planlandı → tamamlandı`

Roller: **yönetici** (hepsini görür) · **mimar** (kendi müşteri/projeleri) · **üretim**
(sadece devredilen işler, fiyat/teklif görmez).

## Tekrarlanmaması gereken hatalar

1. **Vuexy paketini repoya kopyalama.** Kaynak `/Users/olcay/dev/Vuexy/` — repo DIŞINDA.
   İçinde 155 MB'lık bir Figma zip'i var; GitHub'ın limiti 100 MB. Daha önce repoya girdi,
   push reddedildi, geçmişi sıfırlamak zorunda kaldık. Oradan sadece ihtiyacın olan dosyayı
   kopyala; klasörü olduğu gibi taşıma.

2. **"Tamamlandı" demek teslimat değil.** Bir görevde ajan "tablo yukarıda, hepsini
   doğruladım" dedi; ortada tablo yoktu. Raporun görevde belirtilen dosyaya yazılmalı.

3. **Rapordaki sayı ile yapılan iş çelişebiliyor.** Sayı veriyorsan gerçekten say. Verdiğin
   her sayı bağımsız olarak `git diff` / `grep -c` ile kontrol ediliyor.

4. **Sürüm numarasını uydurma.** Bir raporda "@tanstack/react-table v9 kullanılıyor" yazıldı;
   gerçek sürüm 8.21.3'tü. Kütüphanenin API'sine bakıp sürüm tahmin etme — `package.json`'dan
   oku ve satır numarasıyla göster.

5. **Ekran bileşeninin içine veri gömme.** Tüm mock veri `src/data/` altındaki tek kaynaktan
   okunur. Faz 3'te bu katmanın içi veritabanı sorgularıyla değiştirilecek; ekran kodu
   değişmeyecek. Bileşen içine dizi yazarsan o geçiş bozulur.

6. **Türkçe biçimlendirmeyi elle yapma.** Para `Intl.NumberFormat('tr-TR', { currency: 'TRY' })`,
   tarih `date-fns` + `tr` locale üzerinden. String birleştirerek "12.500 TL" yazma.

7. **`noindex, nofollow` kaybolmasın.** Site aramaya kapalı olmalı; yeni sayfa eklerken
   metadata'daki robots ayarını koru.

8. **Logonun yanına marka adını METİN olarak yazma.** `assets/img/logo/logo.svg` bir
   **wordmark**'tır — "RAYKONSEPT INTERIOR" yazısı logonun içinde vektör path olarak çizili
   (bu yüzden `grep` ile metin bulunmaz). Yanına ayrıca "Raykonsept" yazarsan marka adı
   ekranda iki kez görünür. Daha önce hem `dashboard.html` hem `login.html` bu hatayı
   içeriyordu.

9. **Logo tek renk `#1d1d1b`** (siyaha yakın). Koyu zemine koyarsan okunmaz;
   `filter: brightness(0) invert(1)` ile beyaza çevir. SVG dosyasını değiştirme.

10. **`output: 'export'` (statik export) önerme, çalışmaz.** Denendi ve iki yerde kırılıyor:
    `src/@core/utils/serverHelpers.ts` tema modunu `cookies()` ile okuyor ve bu kök
    layout'ta çağrılıyor (`cookies()` statik export'ta yasak); ayrıca `next.config.ts`
    içindeki `redirects()` sunucu tarafı bir özellik. Uygulama Plesk'te Node.js olarak
    çalışıyor, başlangıç dosyası kökteki `server.js`.

11. **`public/` altındaki eski Bootstrap sitesi silinmedi, bilerek duruyor.**
    `login.html`, `dashboard.html`, `assets/`, `libs/` — Next bunları statik olarak
    servis etmeye devam ediyor. Faz 1 boyunca erişilebilir kalmalı; temizlik kararı
    müşteri onayından sonra verilecek.

## Doğrulama kuralları

Raporunu yazmadan önce kendin kontrol et:

- Dosya yolu yazıyorsan `ls` ile gerçekten var olduğunu doğrula. Tahmin ettiğin yolu yazma;
  bulamadıysan "bulunamadı" yaz. Uydurma yol en pahalı hata türü.
- Kod değiştirdiysen `npx tsc --noEmit` ya da `npm run build` ile tip/derleme hatası
  bırakmadığını kontrol et.
- Emin olmadığın bir şeyi emin gibi yazma. "Muhtemelen" diyeceksen, kontrol et ya da
  raporda açıkça belirsiz olduğunu yaz.

## İyi pratikler

- Arayüz metinleri **Türkçe**. Kod tanımlayıcıları (değişken, tip, dosya adı) de Türkçe
  alan adları kullanıyor: `Musteri`, `Proje`, `Teklif`, `Randevu`, `Mimar`.
- Var olan bileşeni kopyalayıp uyarlamak, sıfırdan yazmaktan iyidir. Vuexy `full-version`
  içinde neredeyse her ihtiyacın hazır bir karşılığı var.
- Mevcut dosyaların stiline uy: aynı klasördeki dosyalar nasıl yazılmışsa öyle yaz.
- Yorum satırlarını çevredeki kod kadar seyrek tut.
