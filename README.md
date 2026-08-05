# Raykonsept - Mimar Dashboard

Mimarlık/İnşaat sektörü için modern admin dashboard.

**Canlı Site:** https://mimar.raykonsept.com

## Teknoloji Stack

- **Frontend:** HTML5 + Bootstrap 5 + CSS3
- **Template:** Vuexy Admin Dashboard (Pixinvent)
- **Deploy:** Plesk (mimar.raykonsept.com)

## Proje Yapısı

```
├── public/          # Statik dosyalar (CSS, JS, görseller)
│   ├── assets/      # Tema assets
│   └── libs/        # Kütüphaneler
├── src/
│   ├── pages/       # HTML sayfaları
│   ├── components/  # Yeniden kullanılabilir bileşenler
│   ├── css/         # Custom CSS
│   └── js/          # Custom JavaScript
└── README.md
```

## Hızlı Başlangıç

1. Repo'yu clone et
2. Sayfaları `src/pages/` içine oluştur
3. `public/assets/` klasörünün yollarını kullan

## Deployment

Sunucu: Plesk, subdomain `mimar.raykonsept.com`

- **Document Root:** `mimar.raykonsept.com/public`
- **Repo konumu:** `/var/www/vhosts/raykonsept.com/mimar.raykonsept.com/`
  (repo doğrudan domain dizinine clone edildi; `public/` docroot olarak servis edilir)
- **Auth:** GitHub Deploy Key (SSH), sunucudaki `raykonsept` kullanıcısına ait

> Not: Plesk'in kendi Git eklentisi bu sunucuda clone edemedi (`git/` dizini boş kalıyor),
> bu yüzden manuel clone + cron pull kullanılıyor.

### Otomatik deploy

`raykonsept` kullanıcısının crontab'ında dakikalık pull çalışır:

```
* * * * * cd /var/www/vhosts/raykonsept.com/mimar.raykonsept.com && /usr/bin/git pull -q origin main
```

Yani `main`'e push yapmak yeterli; 1 dakika içinde canlıya yansır.

### Manuel deploy (gerekirse)

```bash
cd /var/www/vhosts/raykonsept.com/mimar.raykonsept.com && sudo -u raykonsept git pull
```

## Erişim

Demo giriş: `demo` / `demo` (login formunda hazır dolu gelir)

Site aramaya kapalı: `robots.txt` + tüm sayfalarda `noindex, nofollow` meta etiketi.

