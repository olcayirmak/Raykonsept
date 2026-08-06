#!/bin/bash
# Sunucuda çalışır (app kökünden). Bağımlılıkları kurar, üretim build'i alır ve
# Passenger'ı yeniden başlatır.
#
#   cd /var/www/vhosts/raykonsept.com/mimar.raykonsept.com && ./deploy.sh
#
# set -e bilerek: bir adım patlarsa build ve restart ATLANIR, Passenger bir önceki
# sürümü servis etmeye devam eder, site ayakta kalır. Yarım deploy'dan iyidir.
set -e
export PATH=/opt/plesk/node/20/bin:$PATH
export NEXT_TELEMETRY_DISABLED=1

echo "[deploy] git pull"
git pull origin main

echo "[deploy] npm ci"
npm ci --no-audit --no-fund

echo "[deploy] next build"
npm run build

echo "[deploy] Passenger restart"
mkdir -p tmp && touch tmp/restart.txt

echo "[deploy] TAMAM"
