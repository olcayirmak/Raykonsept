// Plesk (Phusion Passenger) başlangıç dosyası.
//
// Passenger `next start` gibi bir CLI komutu değil, bir Node dosyası çalıştırır ve
// dinlenecek portu PORT ortam değişkeniyle verir. Bu dosya Next'i o portta ayağa
// kaldırır. Yerelde denemek için: NODE_ENV=production node server.js
//
// Not: Bu dosya derlenmiş çıktıyı sunar; önce `npm run build` çalışmış olmalı.

const { createServer } = require('http')
const next = require('next')

const port = parseInt(process.env.PORT || '3000', 10)
const app = next({ dev: false })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Ray Konsept CRM ${port} portunda çalışıyor`)
  })
})
