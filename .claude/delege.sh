#!/usr/bin/env bash
# Ray Konsept CRM — DeepSeek'e görev devretme
#
#   .claude/delege.sh --rol frontend "görev metni"   → dosya yazabilir
#   .claude/delege.sh --rol tester   "görev metni"   → proje dosyalarına dokunmamalı (kontrol edilir)
#   .claude/delege.sh --rol tester --rapor login-testi "görev metni"
#
# Her çağrı SIFIR BAĞLAMDAN başlar. Otomatik öne eklenenler:
#   .claude/deepseek-brief.md   (projedeki tuzaklar)
#   .claude/rol-<rol>.md        (rol tanımı)
#
# Rapor rapor/<ad>.md dosyasına yazılır. Dosya yoksa görev BAŞARISIZ sayılır —
# ajanın stdout'a "tamamlandı" demesi teslimat değildir.
# Ajanın tam çıktısı her hâlükârda rapor/<ad>.stdout.log içine kaydedilir.
#
# Neden plan modu yok: --permission-mode plan, başsız (-p) çalışan ajanı kilitliyor
# (o ortamda ExitPlanMode aracı yok), çıktı yutuluyor. Bu yüzden kullanılmıyor.

set -euo pipefail

kok="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
brief="$kok/.claude/deepseek-brief.md"

# Rapor dizini BİLEREK .claude/ dışında: ajanın .claude/ altına yazması engelli
# (kendi brief'ini ve rol tanımını değiştirememeli — bu koruma korunuyor).
rapor_dizin="$kok/rapor"

# Vuexy paketi repo dışında; ajan --add-dir olmadan okuyamaz ve başsız modda izin isteyemez.
vuexy="/Users/olcay/dev/Vuexy"

rol=""
rapor_ad=""

while [ $# -gt 0 ]; do
  case "$1" in
    --rol)   rol="${2:-}";      shift 2 ;;
    --rapor) rapor_ad="${2:-}"; shift 2 ;;
    --)      shift; break ;;
    -*)      echo "bilinmeyen bayrak: $1" >&2; exit 1 ;;
    *)       break ;;
  esac
done

case "$rol" in
  frontend|tester) ;;
  *) echo "kullanım: .claude/delege.sh --rol frontend|tester [--rapor ad] \"görev metni\"" >&2; exit 1 ;;
esac

if [ $# -eq 0 ]; then
  echo "hata: görev metni verilmedi" >&2
  exit 1
fi

rol_dosya="$kok/.claude/rol-$rol.md"
[ -f "$brief" ]     || { echo "hata: brief yok → $brief" >&2; exit 1; }
[ -f "$rol_dosya" ] || { echo "hata: rol dosyası yok → $rol_dosya" >&2; exit 1; }

mkdir -p "$rapor_dizin"
[ -n "$rapor_ad" ] || rapor_ad="$rol-$(date +%Y%m%d-%H%M%S)"
rapor="$rapor_dizin/${rapor_ad}.md"
# Ajan rapor dosyasını yazmasa bile içerik kaybolmasın diye stdout her zaman kaydedilir.
stdout_log="$rapor_dizin/${rapor_ad}.stdout.log"
rm -f "$rapor" "$stdout_log"

# tester proje dosyalarına dokunmamalı — öncesi/sonrası karşılaştırılacak
onceki=""
if [ "$rol" = "tester" ]; then
  onceki="$(cd "$kok" && git status --porcelain 2>/dev/null || true)"
fi

# shellcheck disable=SC1091
. "$HOME/.claudex/generated/aliases.sh"

cd "$kok"

set +e
__claudex_run_deepseek -p "$(cat "$brief")

---

$(cat "$rol_dosya")

---

# Görevin

$*

---

# Teslimat (zorunlu)

Raporunu şu dosyaya YAZ: $rapor

stdout'a yazdığın hiçbir şey teslimat sayılmaz. Bu dosyayı yazmadan görevi bitirme.
Raporda sayı veriyorsan (kaç dosya, kaç öğe), o sayıyı gerçekten sayarak yaz — bağımsız
olarak kontrol edilecek." \
  --permission-mode acceptEdits \
  --add-dir "$vuexy" \
  < /dev/null 2>&1 | tee "$stdout_log"
cikis=${PIPESTATUS[0]}
set -e

echo
echo "──────── DELEGE SONUCU ────────"
if [ -s "$rapor" ]; then
  echo "rapor  : $rapor ($(wc -l < "$rapor" | tr -d ' ') satır)"
else
  echo "BAŞARISIZ: rapor dosyası yazılmadı → $rapor"
  echo "           ajanın tam çıktısı burada: $stdout_log"
  cikis=1
fi

if [ "$rol" = "tester" ]; then
  sonraki="$(git status --porcelain 2>/dev/null || true)"
  if [ "$onceki" != "$sonraki" ]; then
    echo "UYARI  : çalışma ağacı değişti — 'git diff' ile incele."
    echo "           (Görev sürerken sen de dosya düzenlediysen bu yanlış alarmdır.)"
  else
    echo "tester : çalışma ağacına dokunmadı ✓"
  fi
fi

exit "$cikis"
