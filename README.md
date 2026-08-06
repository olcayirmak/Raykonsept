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
├── app.js             # Plesk/Passenger başlangıç dosyası
├── deploy.sh          # Sunucuda çalışan deploy betiği
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

### Plesk yapılandırması

Aynı sunucudaki `takip.olcayirmak.com` da bir Next.js uygulaması; oradaki çalışan
kurulum örnek alındı.

| Ayar | Değer |
|---|---|
| Document Root | repo kökü (`.../mimar.raykonsept.com`) — artık `public` değil |
| Application Root | `/var/www/vhosts/raykonsept.com/mimar.raykonsept.com` |
| Application Startup File | `app.js` |
| Application Mode | `production` |
| Node.js | `/opt/plesk/node/20` |

Passenger `listen()` çağrısını yakalayıp kendi soketine bağlar; `PORT` değeri önemsizdir.

### Deploy

`git pull` tek başına yetmez — derleme gerekiyor. Sunucuda:

```bash
cd /var/www/vhosts/raykonsept.com/mimar.raykonsept.com
sudo -u raykonsept ./deploy.sh
```

Betik `git pull` → `npm ci` → `npm run build` → `touch tmp/restart.txt` yapar.
`set -e` sayesinde bir adım patlarsa build ve restart atlanır; Passenger bir önceki
sürümü servis etmeye devam eder, site ayakta kalır.

> Dakikalık `git pull` cron'u **kaldırıldı** (yedeği: `/root/raykonsept-crontab.yedek`).
> Geri konulmamalı: derlenmemiş kod çeker, çalışan uygulamayla derlenmiş çıktı uyuşmaz.

## Erişim

Demo giriş: `demo` / `demo` (login formunda hazır dolu gelir)

Site aramaya kapalı: `robots.txt` + tüm sayfalarda `noindex, nofollow` meta etiketi.

