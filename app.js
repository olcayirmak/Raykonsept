// Plesk (Phusion Passenger) başlangıç dosyası.
//
// Passenger `next start` gibi bir CLI komutu değil, bir Node dosyası çalıştırır ve
// listen() çağrısını yakalayıp kendi soketine bağlar; bu yüzden PORT değeri önemsizdir.
// `dir: __dirname` şart: Passenger uygulamayı başka bir çalışma dizininden başlatabilir.
//
// Yerelde denemek için: NODE_ENV=production node app.js
// Not: derlenmiş çıktıyı sunar, önce `npm run build` çalışmış olmalı.

const { createServer } = require('http')
const next = require('next')

const port = process.env.PORT || 3000
const app = next({ dev: false, dir: __dirname })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Ray Konsept CRM hazır (port ${port})`)
  })
})
