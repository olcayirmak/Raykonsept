'use client'

// React Imports
import { useMemo, useState } from 'react'

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
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

// Type Imports
import type { Musteri } from '@/types/musteriTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import RolSecici from '@components/RolSecici'

// Context Imports
import { useAktifKullanici } from '@/contexts/rolContext'

// Data Imports
import { musteriBul, musteriGuncelle } from '@/data/musteriler'
import { musterininProjeleri } from '@/data/projeler'
import {
  iller,
  isTuruEtiketi,
  kaynakEtiketi,
  mimarlar,
  projeDurumEtiketi,
  projeDurumRenkleri
} from '@/data/secenekler'

// Util Imports
import { paraYaz, telefonBicimle } from '@/utils/bicim'
import { fiyatGorebilir, musteriDuzenleyebilir } from '@/utils/yetki'

const Alan = ({ etiket, deger }: { etiket: string; deger?: string }) => (
  <Grid size={{ xs: 12, sm: 6 }}>
    <Typography variant='body2'>{etiket}</Typography>
    <Typography color='text.primary' className='font-medium'>
      {deger || '—'}
    </Typography>
  </Grid>
)

const MusteriDetay = ({ musteriId }: { musteriId: string }) => {
  // Context
  const { aktifKullanici } = useAktifKullanici()

  // States
  const [surum, setSurum] = useState(0)
  const [duzenleme, setDuzenleme] = useState(false)
  const [taslak, setTaslak] = useState<Partial<Musteri>>({})

  // Vars
  const musteri = useMemo(() => musteriBul(musteriId), [musteriId, surum])
  const projeler = useMemo(() => (musteri ? musterininProjeleri(musteri.id) : []), [musteri, surum])
  const fiyatAcik = fiyatGorebilir(aktifKullanici)

  if (!musteri) {
    return (
      <div className='flex flex-col gap-6'>
        <RolSecici />
        <Alert severity='error'>
          <AlertTitle>Müşteri bulunamadı</AlertTitle>
          <code>{musteriId}</code> numaralı kayıt yok. Faz 1&apos;de kayıtlar bellekte tutulduğu için sayfayı tam
          yenilediyseniz eklediğiniz müşteri silinmiş olabilir.
        </Alert>
        <div>
          <Button variant='tonal' component={Link} href='/musteriler'>
            Müşteri listesine dön
          </Button>
        </div>
      </div>
    )
  }

  const duzenlenebilir = musteriDuzenleyebilir(aktifKullanici, musteri)

  const duzenlemeyeGec = () => {
    setTaslak(musteri)
    setDuzenleme(true)
  }

  const kaydet = () => {
    musteriGuncelle(musteri.id, taslak)
    setDuzenleme(false)
    setSurum(onceki => onceki + 1)
  }

  const toplamButce = projeler.reduce((toplam, proje) => toplam + (proje.tahminiButce ?? 0), 0)

  return (
    <div className='flex flex-col gap-6'>
      <RolSecici />

      <Card>
        <CardHeader
          title={musteri.ad}
          subheader={musteri.tip === 'kurumsal' ? `Kurumsal · ${musteri.yetkiliKisi ?? 'yetkili girilmemiş'}` : 'Bireysel'}
          action={
            duzenlenebilir ? (
              duzenleme ? (
                <div className='flex gap-2'>
                  <Button variant='contained' onClick={kaydet}>
                    Kaydet
                  </Button>
                  <Button variant='tonal' color='secondary' onClick={() => setDuzenleme(false)}>
                    Vazgeç
                  </Button>
                </div>
              ) : (
                <Button variant='tonal' startIcon={<i className='tabler-edit' />} onClick={duzenlemeyeGec}>
                  Düzenle
                </Button>
              )
            ) : (
              <Chip size='small' variant='tonal' color='secondary' icon={<i className='tabler-lock' />} label='Salt okunur' />
            )
          }
        />
        <CardContent>
          {!duzenlenebilir && (
            <Alert severity='info' className='mbe-6'>
              Bu müşteri {mimarlar.find(mimar => mimar.id === musteri.sorumluMimarId)?.ad ?? 'başka bir mimara'} ait.
              Bilgileri görebilir, değiştiremezsiniz.
            </Alert>
          )}

          {duzenleme ? (
            <Grid container spacing={6}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomTextField
                  fullWidth
                  label={musteri.tip === 'kurumsal' ? 'Firma Ünvanı' : 'Ad Soyad'}
                  value={taslak.ad ?? ''}
                  onChange={olay => setTaslak(oncekiler => ({ ...oncekiler, ad: olay.target.value }))}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomTextField
                  fullWidth
                  label='Telefon'
                  value={taslak.telefon ?? ''}
                  onChange={olay => setTaslak(oncekiler => ({ ...oncekiler, telefon: olay.target.value }))}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomTextField
                  fullWidth
                  label='E-posta'
                  value={taslak.ePosta ?? ''}
                  onChange={olay => setTaslak(oncekiler => ({ ...oncekiler, ePosta: olay.target.value }))}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomTextField
                  select
                  fullWidth
                  label='İl'
                  value={taslak.il ?? ''}
                  onChange={olay => setTaslak(oncekiler => ({ ...oncekiler, il: olay.target.value }))}
                >
                  {iller.map(il => (
                    <MenuItem key={il} value={il}>
                      {il}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomTextField
                  fullWidth
                  label='İlçe'
                  value={taslak.ilce ?? ''}
                  onChange={olay => setTaslak(oncekiler => ({ ...oncekiler, ilce: olay.target.value }))}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <CustomTextField
                  fullWidth
                  multiline
                  rows={2}
                  label='Açık Adres'
                  value={taslak.acikAdres ?? ''}
                  onChange={olay => setTaslak(oncekiler => ({ ...oncekiler, acikAdres: olay.target.value }))}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <CustomTextField
                  fullWidth
                  multiline
                  rows={3}
                  label='Notlar'
                  value={taslak.notlar ?? ''}
                  onChange={olay => setTaslak(oncekiler => ({ ...oncekiler, notlar: olay.target.value }))}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={6}>
              <Alan etiket='Telefon' deger={telefonBicimle(musteri.telefon)} />
              <Alan etiket='E-posta' deger={musteri.ePosta} />
              <Alan etiket='Konum' deger={[musteri.il, musteri.ilce].filter(Boolean).join(' / ')} />
              <Alan etiket='Açık Adres' deger={musteri.acikAdres} />
              <Alan etiket='Kaynak' deger={musteri.kaynak ? kaynakEtiketi(musteri.kaynak) : undefined} />
              {musteri.kaynak === 'tavsiye' && <Alan etiket='Tavsiye Eden' deger={musteri.tavsiyeEden} />}
              <Alan
                etiket='Sorumlu Mimar'
                deger={mimarlar.find(mimar => mimar.id === musteri.sorumluMimarId)?.ad}
              />
              <Alan etiket='Kayıt Tarihi' deger={musteri.olusturmaTarihi} />
              {musteri.notlar && (
                <Grid size={{ xs: 12 }}>
                  <Divider className='mbe-4' />
                  <Typography variant='body2'>Notlar</Typography>
                  <Typography color='text.primary'>{musteri.notlar}</Typography>
                </Grid>
              )}
            </Grid>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title='Projeler'
          subheader={
            fiyatAcik && toplamButce > 0
              ? `${projeler.length} proje · toplam ${paraYaz(toplamButce)}`
              : `${projeler.length} proje`
          }
        />
        {projeler.length === 0 ? (
          <CardContent>
            <Typography>Bu müşteriye ait proje yok.</Typography>
          </CardContent>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>İş Türü</TableCell>
                  <TableCell>Mekân</TableCell>
                  <TableCell>Durum</TableCell>
                  {fiyatAcik && <TableCell>Tahmini Bütçe</TableCell>}
                  <TableCell>İstenen Teslim</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projeler.map(proje => (
                  <TableRow key={proje.id} hover>
                    <TableCell>{proje.isTurleri.map(isTuruEtiketi).join(', ') || '—'}</TableCell>
                    <TableCell>{proje.mekanTipi ?? '—'}</TableCell>
                    <TableCell>
                      <Chip
                        size='small'
                        variant='tonal'
                        label={projeDurumEtiketi(proje.durum)}
                        color={projeDurumRenkleri[proje.durum]}
                      />
                    </TableCell>
                    {fiyatAcik && <TableCell>{proje.tahminiButce ? paraYaz(proje.tahminiButce) : '—'}</TableCell>}
                    <TableCell>{proje.istenenTeslim ?? '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      <div>
        <Button variant='tonal' color='secondary' component={Link} href='/musteriler'>
          Müşteri listesine dön
        </Button>
      </div>
    </div>
  )
}

export default MusteriDetay
