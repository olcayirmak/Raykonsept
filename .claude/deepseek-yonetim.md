# DeepSeek Yönetim Rehberi — Ray Konsept CRM

Claude (ben) için çalışma talimatı: DeepSeek ajanlarına nasıl iş verilir, ne verilir,
sonucu nasıl doğrulanır. Bu dosya bu projenin kendi rehberi — başka projeye bakmaya gerek yok.

## 1. Görev verme

```bash
.claude/delege.sh --rol tester   "görev metni"                  # inceleme, test, araştırma
.claude/delege.sh --rol frontend "görev metni"                  # dosya değiştirerek çalışma
.claude/delege.sh --rol tester --rapor login-testi "görev metni" # rapor adını sabitle
```

Nasıl çalışır:

- DeepSeek ayrı bir süreç olarak, **sıfır bağlamla** başlar. Bu sohbeti görmez.
- `.claude/deepseek-brief.md` + `.claude/rol-<rol>.md` otomatik öne eklenir.
- Rapor `rapor/<ad>.md` dosyasına yazılır. **Dosya yoksa görev başarısızdır.**
- Uzun sürebilir; `run_in_background: true` ile başlat, bitince bildirim gelir.

## 2. İyi görev yazma

Görev metni kendi kendine yeterli olmalı — ajan projeyi tanımıyor.

**İyi:**

> `/Users/olcay/dev/Vuexy/.../full-version/src/views/apps/ecommerce/orders/list/` altındaki
> sipariş listesi bileşenini incele. Şunları raporla: hangi dosyalar var, tablo hangi
> kütüphaneyle kurulmuş, durum rozetleri (badge) nerede tanımlı, filtreleme nasıl çalışıyor.
> Her dosya yolunu `ls` ile doğrula. Tablo: `| Dosya | Sorumluluk | Satır sayısı |`

**Kötü:**

> "sipariş listesini incele"

(Belirsiz → ajan uydurur.)

Kurallar:
- Mutlak yol ver. "şu klasör" deme.
- Çıktı formatını tarif et (tablo başlıkları, satır formatı).
- Sayılabilir bir sonuç iste — doğrulamayı mümkün kılar.
- Tek görevde tek iş. "Hem incele hem düzelt hem test et" → hiçbiri düzgün olmaz.

## 3. Ne delege edilir, ne edilmez

**Delege edilir:**
- Araştırma/envanter: şablonda ne var, hangi dosya ne yapıyor, karşılaştırma tabloları
- Mekanik üretim: mock veri setleri, aynı desendeki liste ekranlarının çoğaltılması
- Tekrarlı düzenleme: 30 dosyada aynı import'un değişmesi, toplu etiket ekleme
- Test/denetim: ekran gezme, rol sızıntısı arama, kenar durum zorlama, build/lint taraması

**Delege edilmez (bende kalır):**
- Mimari, klasör yapısı, tip tanımları, veri erişim katmanının sözleşmesi
- Yerleşim/tasarım kararları — doğruluğu metin raporundan anlaşılmaz
- "Tam olarak şunu yaz" türü işler — tarif etmek yapmak kadar pahalı
- Plesk/deploy işlemleri
- **Doğrulamanın kendisi** — asla delege edilmez

## 4. Rapora inanma — doğrulama

**Kural: DeepSeek'in raporu bir iddiadır, kanıt değildir.** Her teslimat bağımsız kontrol
edilir. Bu projede fiilen yaşandı: ajan "8 ekranın tamamını doğruladım, tablo yukarıda"
dedi — ortada tablo yoktu.

Ucuz doğrulama yöntemleri:

```bash
# 1. Dosya/klasör iddialarını yeniden türet ve diff'le
ls -d */ | sed 's#/$##' | sort > /tmp/gercek.txt
grep '^- ' rapor/<ad>.md | sed 's/^- //' | sort > /tmp/rapor.txt
diff /tmp/gercek.txt /tmp/rapor.txt

# 2. Değişiklik iddiasını git ile say
git diff --stat
git diff -- <dosya> | grep -c "<aranan>"

# 3. Derleme gerçekten temiz mi
npx tsc --noEmit && npm run build

# 4. Ekran gerçekten açılıyor mu — tarayıcıda bak, raporda yazdığına değil
```

Rapordaki sayı ile listenin uzunluğu tutuyor mu, ona da bak; çelişki en sık görülen sinyal.

## 5. Bilinen tuzaklar (bu ortamda yaşandı)

| Belirti | Sebep | Çözüm |
|---|---|---|
| Süreç asılı kalır, çıktı boş | `--permission-mode plan` — başsız modda `ExitPlanMode` yok | Plan modu kullanma (`delege.sh` zaten kullanmıyor) |
| "İzin isteğini onaylamanız gerekiyor" | Okunacak klasör cwd dışında | `--add-dir` (Vuexy için `delege.sh` otomatik geçiyor) |
| "Tamamlandı" der ama içerik yok | Rapor stdout'a yazılmış | Teslimat dosyaya; `delege.sh` dosya yoksa hata veriyor |
| Uzun görev yarıda kesilir | Zaman aşımı | Görevi böl; arka planda çalıştır |
| Ajan raporu yazamıyor, "permission blocked" | `.claude/` altına yazma engelli (ajan kendi brief'ini değiştiremesin diye — bu koruma kalsın) | Raporlar `rapor/` altında, `.claude/` dışında |
| Rapor içeriği kayboldu | Çağrı `\| tail -N` ile kırpıldı | Betik stdout'u `rapor/<ad>.stdout.log` içine kaydediyor; oraya bak |
| "tester çalışma ağacını değiştirdi" ama masum | Görev sürerken **ben** dosya düzenledim | Yanlış alarm; `git diff` ile teyit et |

## 6. Yeni tuzak öğrenilince

`.claude/deepseek-brief.md` dosyasına ekle. Ajan sıfır bağlamla başladığı için, brief'e
yazılmayan ders öğrenilmemiş sayılır ve aynı hata tekrar eder.
