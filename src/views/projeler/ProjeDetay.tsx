'use client'

// React Imports
import { useMemo } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

// Component Imports
import RolSecici from '@components/RolSecici'

// Context Imports
import { useAktifKullanici } from '@/contexts/rolContext'

// Data Imports
import { musteriBul } from '@/data/musteriler'
import { projeBul } from '@/data/projeler'
import { projeninOdemeleri } from '@/data/odemeler'
import { projeninRandevulari } from '@/data/randevular'
import {
  isTuruEtiketi,
  mekanTipleri,
  mimarlar,
  odemeTuruEtiketi,
  projeDurumEtiketi,
  projeDurumRenkleri,
  randevuDurumlari,
  randevuTipEtiketi,
  yapiDurumlari
} from '@/data/secenekler'

// Util Imports
import { kisaTarihYaz, paraYaz, tarihSaatYaz } from '@/utils/bicim'
import { bugun, satisDurumlari, uretimDurumlari } from '@/utils/ozet'
import { fiyatGorebilir } from '@/utils/yetki'

const Alan = ({ etiket, deger }: { etiket: string; deger?: string }) => (
  <Grid size={{ xs: 12, sm: 6 }}>
    <Typography variant='body2'>{etiket}</Typography>
    <Typography color='text.primary' className='font-medium'>
      {deger || '—'}
    </Typography>
  </Grid>
)

const ProjeDetay = ({ projeId }: { projeId: string }) => {
  // Context
  const { aktifKullanici } = useAktifKullanici()

  // Vars
  const proje = useMemo(() => projeBul(projeId), [projeId])
  const musteri = useMemo(() => (proje ? musteriBul(proje.musteriId) : undefined), [proje])
  const odemeler = useMemo(() => (proje ? projeninOdemeleri(proje.id) : []), [proje])
  const randevular = useMemo(() => (proje ? projeninRandevulari(proje.id) : []), [proje])
  const fiyatAcik = fiyatGorebilir(aktifKullanici)

  // Proje bulunamadı
  if (!proje) {
    return (
      <div className='flex flex-col gap-6'>
        <RolSecici />
        <Alert severity='error'>
          <AlertTitle>Proje bulunamadı</AlertTitle>
          <code>{projeId}</code> numaralı kayıt yok. Faz 1&apos;de kayıtlar bellekte tutulduğu için sayfayı tam
          yenilediyseniz eklediğiniz proje silinmiş olabilir.
        </Alert>
        <div>
          <Button variant='tonal' component={Link} href='/projeler'>
            Proje listesine dön
          </Button>
        </div>
      </div>
    )
  }

  // ---- B) Süreç ----
  const tumAsamalar = [...satisDurumlari, ...uretimDurumlari]
  const mevcutIndex = tumAsamalar.indexOf(proje.durum)

  // ---- C) Ödeme durumu (türetilen) ----
  const odemeDurumBilgisi = (odeme: (typeof odemeler)[number]) => {
    const simdi = bugun()

    if (odeme.odemeTarihi) return { etiket: 'Ödendi', color: 'success' as const }

    if (odeme.vadeTarihi < simdi) {
      const gecikmeGunu = Math.floor((Date.parse(simdi) - Date.parse(odeme.vadeTarihi)) / 86400000)

      return { etiket: `Gecikti (${gecikmeGunu} gün)`, color: 'error' as const }
    }

    return { etiket: 'Bekliyor', color: 'warning' as const }
  }

  // ---- Randevu durum rengi ----
  const randevuDurumRengi = (durum: string) => {
    if (durum === 'tamamlandi') return 'success' as const
    if (durum === 'iptal') return 'default' as const

    return 'info' as const
  }

  return (
    <div className='flex flex-col gap-6'>
      <RolSecici />

      {/* A) Üst kart */}
      <Card>
        <CardHeader
          title={projeDurumEtiketi(proje.durum)}
          subheader={
            <Typography
              component={Link}
              href={musteri ? `/musteriler/${musteri.id}` : '#'}
              color='primary.main'
              className='font-medium hover:underline'
            >
              {musteri?.ad ?? '—'}
            </Typography>
          }
          action={
            <div className='text-end'>
              {fiyatAcik && proje.sozlesmeTutari ? (
                <Typography variant='h5' color='text.primary' className='font-medium'>
                  {paraYaz(proje.sozlesmeTutari)}
                </Typography>
              ) : proje.tahminiButce ? (
                <Typography variant='h5' color='text.secondary'>
                  ~{paraYaz(proje.tahminiButce)}
                </Typography>
              ) : null}
            </div>
          }
        />
        <CardContent>
          <Grid container spacing={6}>
            <Alan
              etiket='İş Türü'
              deger={proje.isTurleri.map(isTuruEtiketi).join(', ') || '—'}
            />
            <Alan
              etiket='Mekân Tipi'
              deger={mekanTipleri.find(secenek => secenek.deger === proje.mekanTipi)?.etiket}
            />
            <Alan
              etiket='Yapı Durumu'
              deger={yapiDurumlari.find(secenek => secenek.deger === proje.yapiDurumu)?.etiket}
            />
            <Alan etiket='Açılış Tarihi' deger={kisaTarihYaz(proje.olusturmaTarihi)} />
            <Alan
              etiket='İstenen Teslim'
              deger={proje.istenenTeslim ? kisaTarihYaz(proje.istenenTeslim) : undefined}
            />
            <Alan
              etiket='Mimar'
              deger={mimarlar.find(mimar => mimar.id === proje.mimarId)?.ad}
            />
          </Grid>
        </CardContent>
      </Card>

      {/* B) Süreç */}
      <Card>
        <CardHeader title='Süreç' />
        <CardContent>
          <div className='flex flex-wrap gap-2'>
            {tumAsamalar.map((asama, index) => {
              const gecti = index < mevcutIndex
              const aktif = index === mevcutIndex

              return (
                <Chip
                  key={asama}
                  size='small'
                  variant={aktif ? 'filled' : 'tonal'}
                  label={projeDurumEtiketi(asama)}
                  color={
                    aktif ? 'primary' : gecti ? 'success' : 'default'
                  }
                />
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* C) Ödeme planı — yalnız fiyat yetkisi varsa oluşturulur */}
      {fiyatAcik && (
        <Card>
          <CardHeader
            title='Ödeme Planı'
            subheader={
              odemeler.length > 0
                ? `${odemeler.length} ödeme · toplam ${paraYaz(odemeler.reduce((toplam, o) => toplam + o.tutar, 0))}`
                : undefined
            }
          />
          {odemeler.length === 0 ? (
            <CardContent>
              <Typography>Bu projeye ait ödeme planı yok.</Typography>
            </CardContent>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tür</TableCell>
                    <TableCell>Vade</TableCell>
                    <TableCell>Tutar</TableCell>
                    <TableCell>Durum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {odemeler.map(odeme => {
                    const durumBilgisi = odemeDurumBilgisi(odeme)

                    return (
                      <TableRow key={odeme.id} hover>
                        <TableCell>{odemeTuruEtiketi(odeme.tur)}</TableCell>
                        <TableCell>{kisaTarihYaz(odeme.vadeTarihi)}</TableCell>
                        <TableCell>
                          <Typography color='text.primary' className='font-medium'>
                            {paraYaz(odeme.tutar)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size='small'
                            variant='tonal'
                            label={durumBilgisi.etiket}
                            color={durumBilgisi.color}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      )}

      {/* D) Randevular */}
      <Card>
        <CardHeader
          title='Randevular'
          subheader={randevular.length > 0 ? `${randevular.length} randevu` : undefined}
        />
        {randevular.length === 0 ? (
          <CardContent>
            <Typography>Bu projeye ait randevu yok.</Typography>
          </CardContent>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tür</TableCell>
                  <TableCell>Tarih / Saat</TableCell>
                  <TableCell>Mimar</TableCell>
                  <TableCell>Durum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {randevular
                  .sort((a, b) => b.tarih.localeCompare(a.tarih))
                  .map(randevu => (
                    <TableRow key={randevu.id} hover>
                      <TableCell>{randevuTipEtiketi(randevu.tip)}</TableCell>
                      <TableCell>{tarihSaatYaz(randevu.tarih)}</TableCell>
                      <TableCell>
                        {mimarlar.find(mimar => mimar.id === randevu.mimarId)?.ad ?? '—'}
                      </TableCell>
                      <TableCell>
                        <Chip
                          size='small'
                          variant='tonal'
                          label={
                            randevuDurumlari.find(secenek => secenek.deger === randevu.durum)?.etiket ??
                            randevu.durum
                          }
                          color={randevuDurumRengi(randevu.durum)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      <div>
        <Button variant='tonal' color='secondary' component={Link} href='/projeler'>
          Proje listesine dön
        </Button>
      </div>
    </div>
  )
}

export default ProjeDetay
