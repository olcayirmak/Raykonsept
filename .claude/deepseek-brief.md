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

8. **Wordmark'ın yanına marka adını METİN olarak yazma.**
   `public/images/logo/logo-light.svg` ve `logo-dark.svg` **wordmark**'tır — "RAYKONSEPT
   INTERIOR" yazısı logonun içinde vektör path olarak çizili (bu yüzden `grep` ile metin
   bulunmaz). Yanına ayrıca "Ray Konsept" yazarsan marka adı ekranda iki kez görünür.
   Daha önce hem `dashboard.html` hem `login.html` bu hatayı içeriyordu.
   Not: `src/@core/svg/Logo.tsx` bunun istisnası — o **wordmark değil**, yalnız "R"
   amblemi; yanındaki metin (`themeConfig.templateName`) bilerek duruyor, kaldırma.

9. **Logo dosyaları tek renktir ve tema başına ayrıdır.**
   `public/images/logo/` içinde: `logo-light.svg` / `logo-icon-light.svg` (`#1d1d1b`,
   şeffaf zemin — açık tema) ve `logo-dark.svg` / `logo-icon-dark.svg` (beyaz, ama
   içinde **tam sayfa siyah `<rect>` var** — açık zemine koyarsan siyah blok çıkar).
   SVG dosyalarını değiştirme. React tarafında dosya kullanma gereği yok:
   `src/@core/svg/Logo.tsx` amblemi `fill='currentColor'` ile çizer, iki temada da
   kendiliğinden doğru renkte gelir.

10. **`output: 'export'` (statik export) önerme, çalışmaz.** Denendi ve iki yerde kırılıyor:
    `src/@core/utils/serverHelpers.ts` tema modunu `cookies()` ile okuyor ve bu kök
    layout'ta çağrılıyor (`cookies()` statik export'ta yasak); ayrıca `next.config.ts`
    içindeki `redirects()` sunucu tarafı bir özellik. Uygulama Plesk'te Node.js olarak
    çalışıyor, başlangıç dosyası kökteki `server.js`.

11. **`public/` altındaki eski Bootstrap sitesi silinmedi, bilerek duruyor.**
    `login.html`, `dashboard.html`, `assets/`, `libs/` — Next bunları statik olarak
    servis etmeye devam ediyor. Faz 1 boyunca erişilebilir kalmalı; temizlik kararı
    müşteri onayından sonra verilecek.

## Projenin bugünkü hâli (kod yazmadan önce oku)

Ekranlar: `/home` (panel) · `/musteriler` · `/musteriler/yeni` · `/musteriler/[id]` ·
`/projeler` · `/randevular` · `/tahsilat`. Hepsi `src/app/(dashboard)/` altında;
sayfa dosyası sadece metadata + view'ı çağırır, iş `src/views/<alan>/` içindedir.

Uyman gereken katmanlar:

| Katman | Dosya | Kural |
|---|---|---|
| Veri | `src/data/*.ts` | TÜM veri buradan. Bileşene dizi yazma. |
| Tipler | `src/types/*.ts` | `Musteri`, `Proje`, `Randevu`, `Odeme`, `Kullanici` |
| Yetki | `src/utils/yetki.ts` | Ekranda `if (rol === 'mimar')` YAZMA, buradaki fonksiyonu çağır |
| Hesap | `src/utils/ozet.ts` | Panel/özet sayıları burada, saf fonksiyon. Widget hesap yapmaz. |
| Biçim | `src/utils/bicim.ts` | `paraYaz`, `tarihYaz`, `telefonBicimle`. Elle biçimlendirme yok. |
| Etiket | `src/data/secenekler.ts` | Türkçe etiketler ve durum renkleri |

Roller: **yönetici** (hepsi) · **mimar** (tüm müşterileri görür, yalnız kendininkini
düzenler) · **atölye yöneticisi** (yalnız üretime devredilmiş işler, fiyat görmez) ·
**usta** (yalnız kendi iş emri). Faz 1'de oturum yok; aktif kullanıcı
`src/contexts/rolContext.tsx` + ekranların üstündeki `RolSecici` ile seçilir.

**Fiyat sütunu/kartı yetkisiz rolde GİZLENMEZ, HİÇ OLUŞTURULMAZ.** `fiyatGorebilir()`
false ise o sütunu diziye ekleme. Faz 3'te bu gerçek bir güvenlik sınırı olacak.

Yeni liste ekranı yazacaksan `src/views/musteriler/MusteriListesi.tsx` dosyasını
örnek al: TanStack Table + arama + filtre + sayfalama + `RolSecici` deseni orada.

## Tekrarlanmaması gereken hatalar (devam)

12. **Sol menü `src/data/navigation/*.tsx` dosyasından gelir — ama gelmiyordu.**
    Starter-kit'in `VerticalMenu.tsx` ve `HorizontalMenu.tsx` dosyaları menü
    öğelerini kodun içine sabit yazmıştı ve `menuData` kullanan satır yorumdaydı.
    Bağlandı. Menüye öğe eklerken data dosyasını düzenle; bileşene sabit `<MenuItem>`
    yazma. Menü role göre süzülür (`verticalMenuData(kullanici)`).

13. **ApexCharts sürümü 3.49.0 — v4 API'si kullanma.** Örnek: `legend.markers.size`
    v4'te var, 3.49'da yok (`width`/`height` kullanılır). Sürümü `package.json`'dan
    oku, ApexCharts belgelerinin son sürümüne bakıp yazma. Grafikler
    `dynamic(() => import('@/libs/styles/AppReactApexCharts'))` ile yüklenir ve
    `'use client'` olmak zorundadır.

14. **Tarihe bağlı durumu SAKLAMA, türet.** Ödemenin "gecikti" bilgisi veritabanında
    tutulmaz; `odemeTarihi` boş ve `vadeTarihi < bugün` ise gecikmiştir. Saklanan
    bayrak zaman ilerledikçe yalan söyler.

15. **Mock veri üretirken ay aritmetiğini 30 gün sayma.** `bugün - 30*n gün` takvim
    aylarında kayar ve bir ayı tamamen atlar; grafikte boş ay olarak görünür.
    Ay/yıl üzerinden hesapla. Ayrıca içinde bulunulan ay için **bugünü aşan tarih
    üretme**.

16. **`generated-icons.css` repoda yok, `postinstall` üretir.** Eksik görünmesi hata
    değil. Silme, commit'leme.

17. **Rol kuralını EKRANA KOPYALAMA.** Üç görevde iki kez yapıldı ve ikisi de hataya
    yol açtı: bir kez üretim rolüne fiyat içeren yazışmalar açıldı, bir kez randevu
    süzme kuralı ekrana kopyalandı. Kural `src/utils/yetki.ts` ve `src/utils/ozet.ts`
    içindedir. İhtiyacın olan süzme orada yoksa **oraya fonksiyon ekle**, ekranda
    `if (kullanici.rol === '...')` yazma.

18. **Ustalar sistemi kullanmıyor.** Rol seti: yönetici · mimar · atölye yöneticisi.
    Atölye yöneticisi müşteri bilgisi, teknik çizim, teslim tarihi ve satan mimarı
    görür; **fiyat ve proje bedelini görmez**. İşi A4 çıktı ya da sözlü dağıtır.

19. **Çalıştırmadığın komuta ✅ koyma.** `npx tsc --noEmit` ve `npm run build`
    çalıştıramıyorsan raporda "çalıştıramadım" yaz. Uyum tablosuna ✅ koyup altta
    "onay bekliyor" yazmak çelişki; rapor bağımsız olarak kontrol ediliyor.

20. **Renk paleti tema katmanından gelir, ekrana hex YAZILMAZ.** Vuexy'nin mor paleti
    2026-08-07'de tamamen kaldırıldı. Marka paleti: primary `#C79E44` (altın,
    `contrastText: '#1A1A1A'` — altın üstüne beyaz yazı kontrast testini geçmiyor),
    secondary `#495057`, açık zemin `#F8F9FA`/`#FFFFFF`, koyu zemin `#17191C`/`#212529`,
    bej `#D7CCC5`. Tanımlar yalnızca üç dosyada: `src/@core/theme/colorSchemes.ts`,
    `src/@core/theme/index.ts` (`mainColorChannels` — metin/ayraç/gölge ekseni buradan
    türer), `src/configs/primaryColorConfig.ts`. Bileşene `#7367F0` gibi sabit renk
    yazma; `var(--mui-palette-*)` ya da `theme.palette.*` kullan.

21. **Durum renkleri (success/error/warning/info) markaya çekilmedi, bilerek duruyor.**
    Yeşil/kırmızı/turuncu/camgöbeği anlamsal; "mor kalmış" gibi bunları da bulgu
    olarak raporlama.

22. **`public/images/illustrations/auth/` altındaki PNG'ler hâlâ Vuexy'nin mor
    karakterli görselleri.** Bilinen durum, açık iş. Bunu yeni bulgu diye yazma.

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
