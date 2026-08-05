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

## Plesk Deployment

Plesk'te subdomain yapılandırıldı: `mimar.raykonsept.com`

### Deploy Adımları
1. Dosyaları `public/` klasöründen Plesk'teki hosting dizinine kopyala
2. HTML dosyalarını `src/pages/` içinde geliştir

