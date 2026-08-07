'use client'

// React Imports
import { useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// Type Imports
import type { Mail, MailKlasoru } from '@/types/mailTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import RolSecici from '@components/RolSecici'

// Context Imports
import { useAktifKullanici } from '@/contexts/rolContext'

// Data Imports
import { mailler } from '@/data/mailler'
import { musteriBul } from '@/data/musteriler'

// Util Imports
import { tarihSaatYaz } from '@/utils/bicim'
import { fiyatGorebilir, musteriDuzenleyebilir } from '@/utils/yetki'

type KlasorSecenegi = {
  deger: MailKlasoru
  etiket: string
  ikon: string
}

const klasorSecenekleri: KlasorSecenegi[] = [
  { deger: 'gelen', etiket: 'Gelen Kutusu', ikon: 'tabler-inbox' },
  { deger: 'giden', etiket: 'Gönderilmiş', ikon: 'tabler-send' },
  { deger: 'taslak', etiket: 'Taslaklar', ikon: 'tabler-edit' },
  { deger: 'cop', etiket: 'Çöp Kutusu', ikon: 'tabler-trash' }
]

const MailEkrani = () => {
  // Context
  const { aktifKullanici } = useAktifKullanici()

  // States
  const [secilenKlasor, setSecilenKlasor] = useState<MailKlasoru>('gelen')
  const [secilenMailId, setSecilenMailId] = useState<string | null>(null)
  const [arama, setArama] = useState('')
  const [yildizliDurum, setYildizliDurum] = useState<Record<string, boolean>>({})
  const [okunduDurum, setOkunduDurum] = useState<Record<string, boolean>>({})
  const [yeniPostaAcik, setYeniPostaAcik] = useState(false)
  const [bildirim, setBildirim] = useState<string | null>(null)

  // Vars
  // Yazışmalar teklif, fiyat ve kapora bilgisi içerir; bu yüzden ekran satış
  // tarafına özeldir. Atölye yöneticisi giremez.
  const gorunurMu = fiyatGorebilir(aktifKullanici)

  // Role göre süzülmüş mail listesi
  const suzulenMailler = useMemo(() => {
    if (!fiyatGorebilir(aktifKullanici)) return []

    // Mimar yalnızca kendi müşterilerinin yazışmasını görür; yönetici hepsini.
    // musteriDuzenleyebilir tam bu ayrımı yapıyor, kural burada tekrarlanmıyor.
    return mailler.filter(mail => {
      if (!mail.musteriId) return true

      const musteri = musteriBul(mail.musteriId)

      return musteri ? musteriDuzenleyebilir(aktifKullanici, musteri) : true
    })
  }, [aktifKullanici])

  // Seçili klasördeki mailler
  const klasorMailleri = useMemo(() => {
    let liste = suzulenMailler.filter(mail => mail.klasor === secilenKlasor)

    if (arama.trim()) {
      const terim = arama.toLocaleLowerCase('tr')
      liste = liste.filter(
        mail =>
          mail.konu.toLocaleLowerCase('tr').includes(terim) ||
          mail.gonderenAd.toLocaleLowerCase('tr').includes(terim) ||
          mail.govde.toLocaleLowerCase('tr').includes(terim)
      )
    }

    // Tarihe göre yeniden eskiye sırala
    return [...liste].sort((a, b) => b.tarih.localeCompare(a.tarih))
  }, [suzulenMailler, secilenKlasor, arama])

  // Seçili mail
  const secilenMail = useMemo(() => {
    if (!secilenMailId) return null
    return mailler.find(mail => mail.id === secilenMailId) ?? null
  }, [secilenMailId])

  // Okunmamış sayıları (klasör başına)
  const okunmamisSayilari = useMemo(() => {
    const sayilar: Record<string, number> = {}
    for (const klasor of klasorSecenekleri) {
      const kendiMailleri = suzulenMailler.filter(mail => mail.klasor === klasor.deger)
      sayilar[klasor.deger] = kendiMailleri.filter(mail => !(okunduDurum[mail.id] ?? mail.okundu)).length
    }
    return sayilar
  }, [suzulenMailler, okunduDurum])

  // Yardımcılar
  const mailOkunduMu = (mail: Mail) => okunduDurum[mail.id] ?? mail.okundu
  const mailYildizliMi = (mail: Mail) => yildizliDurum[mail.id] ?? mail.yildizli

  const mailiSec = (id: string) => {
    setSecilenMailId(id)
    setOkunduDurum(oncekiler => ({ ...oncekiler, [id]: true }))
  }

  const yildiziDegistir = (mailId: string) => {
    setYildizliDurum(oncekiler => ({
      ...oncekiler,
      [mailId]: !(oncekiler[mailId] ?? mailler.find(m => m.id === mailId)?.yildizli ?? false)
    }))
  }

  const yeniPostaGonder = () => {
    setYeniPostaAcik(false)
    setBildirim('Faz 1: Gerçek e-posta gönderimi henüz yapılmıyor. Maket veri üzerinde demo.')
  }

  if (!gorunurMu) {
    return (
      <div className='flex flex-col gap-6'>
        <RolSecici />
        <Alert severity='warning'>
          <AlertTitle>Bu ekran üretim rollerine kapalı</AlertTitle>
          Tahsilat, teklif ve fiyat bilgileri yalnızca yönetici ve mimarlar tarafından görülebilir.
        </Alert>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-6'>
      <RolSecici />

      {/* Yeni E-posta butonu */}
      <div>
        <Button variant='contained' startIcon={<i className='tabler-pencil' />} onClick={() => setYeniPostaAcik(true)}>
          Yeni E-posta
        </Button>
      </div>

      <Grid container spacing={0} className='border rounded-md overflow-hidden'>
        {/* ── SOL: Klasör listesi ── */}
        <Grid size={{ xs: 12, md: 3, lg: 2 }} className='border-be md:border-be-0 md:border-ie'>
          <div className='p-4 flex flex-col gap-1'>
            {klasorSecenekleri.map(secenek => {
              const secili = secilenKlasor === secenek.deger
              const okunmamis = okunmamisSayilari[secenek.deger] || 0

              return (
                <div
                  key={secenek.deger}
                  onClick={() => {
                    setSecilenKlasor(secenek.deger)
                    setSecilenMailId(null)
                  }}
                  className={`flex items-center justify-between gap-2 px-3 py-2 rounded cursor-pointer ${
                    secili ? 'bg-primary text-white' : 'hover:bg-actionHover'
                  }`}
                >
                  <div className='flex items-center gap-2.5'>
                    <i className={secenek.ikon} />
                    <Typography
                      variant='body2'
                      color='inherit'
                      className={`${secili ? 'font-medium' : ''}`}
                    >
                      {secenek.etiket}
                    </Typography>
                  </div>
                  {okunmamis > 0 && (
                    <Badge
                      badgeContent={okunmamis}
                      color={secili ? 'default' : 'primary'}
                      slotProps={{
                        badge: {
                          style: secili
                            ? {
                                backgroundColor: 'rgb(0 0 0 / 0.16)',
                                color: 'var(--mui-palette-primary-contrastText)'
                              }
                            : {}
                        }
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </Grid>

        {/* ── ORTA: Mail listesi ── */}
        <Grid size={{ xs: 12, md: 5, lg: 4 }} className='border-be md:border-be-0 md:border-ie'>
          <div className='p-3 border-be'>
            <CustomTextField
              fullWidth
              size='small'
              placeholder='E-postalarda ara...'
              value={arama}
              onChange={olay => setArama(olay.target.value)}
              InputProps={{
                startAdornment: <i className='tabler-search text-textSecondary mr-1' />
              }}
            />
          </div>
          <div className='flex flex-col overflow-y-auto' style={{ maxHeight: 'calc(100vh - 320px)' }}>
            {klasorMailleri.length === 0 ? (
              <div className='p-6 text-center'>
                <Typography color='text.disabled'>
                  {arama ? 'Aramanızla eşleşen e-posta bulunamadı.' : 'Bu klasörde e-posta yok.'}
                </Typography>
              </div>
            ) : (
              klasorMailleri.map(mail => {
                const okundu = mailOkunduMu(mail)
                const yildizli = mailYildizliMi(mail)
                const secili = secilenMailId === mail.id

                return (
                  <div
                    key={mail.id}
                    onClick={() => mailiSec(mail.id)}
                    className={`flex items-start gap-3 p-3 cursor-pointer border-be transition-shadow hover:shadow-sm ${
                      secili ? 'bg-actionSelected' : okundu ? 'bg-backgroundPaper' : 'bg-actionHover'
                    }`}
                  >
                    <IconButton
                      size='small'
                      onClick={olay => {
                        olay.stopPropagation()
                        yildiziDegistir(mail.id)
                      }}
                    >
                      <i className={`tabler-star text-base ${yildizli ? 'text-warning' : 'text-textDisabled'}`} />
                    </IconButton>
                    <div className='flex-1 overflow-hidden'>
                      <div className='flex items-center justify-between gap-2'>
                        <Typography
                          variant='body2'
                          className={`${!okundu ? 'font-semibold' : ''}`}
                          noWrap
                        >
                          {mail.klasor === 'gelen' ? mail.gonderenAd : mail.aliciAd}
                        </Typography>
                        <Typography variant='caption' color='text.disabled' className='shrink-0'>
                          {tarihSaatYaz(mail.tarih)}
                        </Typography>
                      </div>
                      <Typography variant='body2' className={!okundu ? 'font-semibold' : ''} noWrap>
                        {mail.konu}
                      </Typography>
                      <Typography variant='caption' color='text.disabled' noWrap>
                        {mail.govde.split('\n')[0]}
                      </Typography>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </Grid>

        {/* ── SAĞ: Mail detayı ── */}
        <Grid size={{ xs: 12, md: 4, lg: 6 }}>
          {secilenMail ? (
            <div className='flex flex-col' style={{ maxHeight: 'calc(100vh - 320px)' }}>
              {/* Detay başlık */}
              <div className='p-4 border-be'>
                <Typography variant='h6'>{secilenMail.konu}</Typography>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-1 mt-2'>
                  <div>
                    <Typography variant='caption' color='text.disabled'>
                      {secilenMail.klasor === 'gelen' ? 'Gönderen' : 'Alıcı'}
                    </Typography>
                    <Typography variant='body2' className='font-medium'>
                      {secilenMail.klasor === 'gelen'
                        ? `${secilenMail.gonderenAd} <${secilenMail.gonderenEposta}>`
                        : `${secilenMail.aliciAd} <${secilenMail.aliciEposta}>`}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant='caption' color='text.disabled'>
                      Tarih
                    </Typography>
                    <Typography variant='body2'>{tarihSaatYaz(secilenMail.tarih)}</Typography>
                  </div>
                  {secilenMail.musteriId && (
                    <div>
                      <Typography variant='caption' color='text.disabled'>
                        Müşteri
                      </Typography>
                      <Typography variant='body2'>
                        <Link
                          href={`/musteriler/${secilenMail.musteriId}`}
                          className='text-primary no-underline hover:underline font-medium'
                        >
                          {musteriBul(secilenMail.musteriId)?.ad ?? secilenMail.musteriId}
                        </Link>
                      </Typography>
                    </div>
                  )}
                </div>
              </div>

              {/* Detay gövde */}
              <div className='p-4 overflow-y-auto flex-1'>
                <Card variant='outlined'>
                  <CardContent>
                    <div className='flex items-center gap-4 mb-4'>
                      <div>
                        <Typography variant='body2' className='font-medium'>
                          {secilenMail.klasor === 'gelen' ? secilenMail.gonderenAd : secilenMail.aliciAd}
                        </Typography>
                        <Typography variant='caption' color='text.disabled'>
                          {secilenMail.klasor === 'gelen'
                            ? secilenMail.gonderenEposta
                            : secilenMail.aliciEposta}
                        </Typography>
                      </div>
                    </div>
                    <Divider className='mb-4' />
                    <Typography variant='body2' style={{ whiteSpace: 'pre-wrap' }}>
                      {secilenMail.govde}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-center h-full p-6' style={{ minHeight: 300 }}>
              <div className='text-center'>
                <i className='tabler-mail text-5xl text-textDisabled mb-3' />
                <Typography color='text.disabled'>Görüntülemek için bir e-posta seçin</Typography>
              </div>
            </div>
          )}
        </Grid>
      </Grid>

      {/* Yeni E-posta Dialog */}
      <Dialog open={yeniPostaAcik} onClose={() => setYeniPostaAcik(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Yeni E-posta</DialogTitle>
        <DialogContent className='flex flex-col gap-4 pt-4!'>
          <TextField fullWidth size='small' label='Kime' placeholder='ornek@eposta.com' />
          <TextField fullWidth size='small' label='Konu' />
          <TextField fullWidth multiline rows={6} label='Mesaj' placeholder='Mesajınızı yazın...' />
        </DialogContent>
        <DialogActions className='px-6 pb-4'>
          <Button variant='tonal' color='secondary' onClick={() => setYeniPostaAcik(false)}>
            İptal
          </Button>
          <Button variant='contained' startIcon={<i className='tabler-send' />} onClick={yeniPostaGonder}>
            Gönder
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bildirim */}
      <Snackbar
        open={!!bildirim}
        autoHideDuration={4000}
        onClose={() => setBildirim(null)}
        message={bildirim ?? ''}
      />
    </div>
  )
}

export default MailEkrani
