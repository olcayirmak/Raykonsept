'use client'

// React Imports
import { useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import OzetKart from '@views/panel/OzetKart'
import RolSecici from '@components/RolSecici'

// Context Imports
import { useAktifKullanici } from '@/contexts/rolContext'

// Data Imports
import { odemeTuruEtiketi, odemeTurleri } from '@/data/secenekler'

// Util Imports
import { kisaTarihYaz, paraYaz } from '@/utils/bicim'
import { bekleyenTahsilatlar, gecikenTahsilatToplami } from '@/utils/ozet'
import { fiyatGorebilir } from '@/utils/yetki'

const TahsilatListesi = () => {
  // Context
  const { aktifKullanici } = useAktifKullanici()

  // States
  const [turFiltresi, setTurFiltresi] = useState('')
  const [sadeceGeciken, setSadeceGeciken] = useState(false)

  // Vars
  const yetkili = fiyatGorebilir(aktifKullanici)

  const satirlar = useMemo(
    () =>
      bekleyenTahsilatlar(aktifKullanici)
        .filter(satir => (turFiltresi ? satir.odeme.tur === turFiltresi : true))
        .filter(satir => (sadeceGeciken ? satir.gecikmeGunu > 0 : true)),
    [aktifKullanici, sadeceGeciken, turFiltresi]
  )

  if (!yetkili) {
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

  const toplam = satirlar.reduce((birikim, satir) => birikim + satir.odeme.tutar, 0)
  const geciken = gecikenTahsilatToplami(aktifKullanici)
  const gecikenAdet = bekleyenTahsilatlar(aktifKullanici).filter(satir => satir.gecikmeGunu > 0).length

  return (
    <div className='flex flex-col gap-6'>
      <RolSecici />

      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <OzetKart
            baslik='Bekleyen Tahsilat'
            deger={paraYaz(toplam)}
            ikon='tabler-cash'
            renk='warning'
            altMetin={`${satirlar.length} ödeme`}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <OzetKart
            baslik='Vadesi Geçen'
            deger={paraYaz(geciken)}
            ikon='tabler-alert-triangle'
            renk='error'
            altMetin={`${gecikenAdet} ödeme`}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <OzetKart
            baslik='Vadesi Gelmemiş'
            deger={paraYaz(toplam - geciken)}
            ikon='tabler-clock'
            renk='info'
            altMetin='henüz zamanı gelmedi'
          />
        </Grid>
      </Grid>

      <Card>
        <CardHeader title='Ödeme Planı' subheader='Vadesi geçenler üstte' />
        <CardContent className='flex flex-wrap items-end gap-4'>
          <CustomTextField
            select
            value={turFiltresi}
            onChange={olay => setTurFiltresi(olay.target.value)}
            className='min-is-[200px]'
          >
            <MenuItem value=''>Tüm ödeme türleri</MenuItem>
            {odemeTurleri.map(secenek => (
              <MenuItem key={secenek.deger} value={secenek.deger}>
                {secenek.etiket}
              </MenuItem>
            ))}
          </CustomTextField>
          <Chip
            label='Sadece vadesi geçenler'
            variant={sadeceGeciken ? 'filled' : 'tonal'}
            color={sadeceGeciken ? 'error' : 'secondary'}
            onClick={() => setSadeceGeciken(onceki => !onceki)}
          />
        </CardContent>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Müşteri</TableCell>
                <TableCell>Ödeme Türü</TableCell>
                <TableCell>Vade</TableCell>
                <TableCell>Gecikme</TableCell>
                <TableCell align='right'>Tutar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {satirlar.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align='center'>
                    <Typography className='plb-6'>Bekleyen tahsilat yok.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                satirlar.map(satir => (
                  <TableRow key={satir.odeme.id} hover>
                    <TableCell>
                      <Typography
                        component={Link}
                        href={`/musteriler/${satir.musteri?.id ?? ''}`}
                        color='primary.main'
                        className='font-medium hover:underline'
                      >
                        {satir.musteri?.ad ?? '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>{odemeTuruEtiketi(satir.odeme.tur)}</TableCell>
                    <TableCell>{kisaTarihYaz(satir.odeme.vadeTarihi)}</TableCell>
                    <TableCell>
                      {satir.gecikmeGunu > 0 ? (
                        <Chip size='small' variant='tonal' color='error' label={`${satir.gecikmeGunu} gün`} />
                      ) : (
                        <Typography variant='body2'>—</Typography>
                      )}
                    </TableCell>
                    <TableCell align='right'>
                      <Typography color='text.primary' className='font-medium'>
                        {paraYaz(satir.odeme.tutar)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}

export default TahsilatListesi
