# Raykonsept - Mimar Dashboard

Mimarlık/İnşaat sektörü için modern admin dashboard.

**Canlı Site:** https://mimar.raykonsept.com

## Teknoloji Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5.9
- **UI:** MUI 7, Vuexy admin şablonu (Pixinvent) starter-kit tabanlı
- **Deploy:** Plesk üzerinde Node.js uygulaması (mimar.raykonsept.com)

Vuexy paketi repo dışında tutulur: `/Users/olcay/dev/Vuexy/`. Oradan yalnızca ihtiyaç
duyulan **dosya** kopyalanır, klasör toptan taşınmaz (155 MB'lık Figma zip'i GitHub
limitini aşıyor).

## Proje Yapısı

```
├── src/
│   ├── app/           # App Router rotaları
│   │   └── (dashboard)/musteriler/yeni/   → /musteriler/yeni
│   ├── views/         # Ekran bileşenleri
│   ├── data/          # TÜM mock veri buradan okunur (Faz 3'te DB ile değişecek)
│   ├── types/         # TypeScript tipleri (Musteri, Proje, ...)
│   ├── utils/         # bicim.ts — TRY/tarih/telefon biçimlendirme
│   ├── @core/         # Vuexy çekirdeği (tema, MUI sarmalayıcıları)
│   ├── @layouts/      # Yerleşim sistemi
│   └── @menu/         # Menü sistemi
├── public/            # Statik dosyalar + eski Bootstrap sitesi (login.html, dashboard.html)
├── server.js          # Plesk/Passenger başlangıç dosyası
└── .claude/           # DeepSeek delegasyon altyapısı
```

### Faz durumu

**Faz 1 (şu an):** Ekranlar gerçekçi mock veriyle hazırlanıyor, müşteriye onaylatılacak.
Veritabanı ve gerçek kimlik doğrulama henüz yok.

## Hızlı Başlangıç

```bash
npm install
npm run dev        # http://localhost:3000
npx tsc --noEmit   # tip kontrolü
npm run build      # üretim derlemesi
```

## Deployment

Sunucu: Plesk, subdomain `mimar.raykonsept.com`

- **Repo konumu:** `/var/www/vhosts/raykonsept.com/mimar.raykonsept.com/`
- **Auth:** GitHub Deploy Key (SSH), sunucudaki `raykonsept` kullanıcısına ait

> Not: Plesk'in kendi Git eklentisi bu sunucuda clone edemedi (`git/` dizini boş kalıyor),
> bu yüzden manuel clone kullanılıyor.

### Neden statik değil, Node uygulaması

Next.js statik export (`output: 'export'`) bu şablonla **çalışmaz**. İki engel var:

1. `src/@core/utils/serverHelpers.ts` tema modunu `cookies()` ile okur ve bu kök
   layout'ta çağrılır. `cookies()` statik export'ta kullanılamaz.
2. `next.config.ts` içindeki `redirects()` (`/` → `/home`) sunucu tarafı bir özelliktir,
   statik export desteklemez.

Ayrıca Faz 3'teki veritabanı ve gerçek kimlik doğrulama zaten bir sunucu gerektirecek.
Şablonu iki kez ameliyat etmek yerine sunucu bir kez ayarlandı.

`public/` altındaki eski Bootstrap sitesi Node sunucusundan servis edilmeye devam eder
(`/login.html`, `/dashboard.html`, `/robots.txt` erişilebilir kalır) — geçiş kesintisiz.

### Plesk kurulumu (bir kerelik)

Plesk panelinde **Websites & Domains → mimar.raykonsept.com → Node.js**:

| Ayar | Değer |
|---|---|
| Document Root | `/` (repo kökü — artık `public` değil) |
| Application Root | `/var/www/vhosts/raykonsept.com/mimar.raykonsept.com` |
| Application Startup File | `server.js` |
| Application Mode | `production` |
| Node.js Version | 20 veya üzeri |

Sonra sunucuda:

```bash
cd /var/www/vhosts/raykonsept.com/mimar.raykonsept.com
npm ci
npm run build
```

Plesk'te **Restart App**'e bas.

### Deploy (her değişiklikte)

`git pull` tek başına artık yetmez — derleme gerekiyor. Dakikalık cron kaldırılmalı,
yerine bu adımlar gelir:

```bash
cd /var/www/vhosts/raykonsept.com/mimar.raykonsept.com
sudo -u raykonsept git pull origin main
sudo -u raykonsept npm ci
sudo -u raykonsept npm run build
```

Ardından Plesk'ten **Restart App**.

> Uyarı: Eski dakikalık `git pull` cron'u çalışır durumda kalırsa, derlenmemiş kod
> çekilir ve çalışan uygulamayla derlenmiş çıktı uyuşmaz. Node'a geçerken o satır
> crontab'dan silinmeli.

## Erişim

Demo giriş: `demo` / `demo` (login formunda hazır dolu gelir)

Site aramaya kapalı: `robots.txt` + tüm sayfalarda `noindex, nofollow` meta etiketi.

