'use client'

// React Imports
import { useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'

// Type Imports
import type { RandevuTipi } from '@/types/randevuTypes'
import type { ThemeColor } from '@core/types'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import RolSecici from '@components/RolSecici'

// Context Imports
import { useAktifKullanici } from '@/contexts/rolContext'

// Data Imports
import { musteriler } from '@/data/musteriler'
import { randevular } from '@/data/randevular'
import { mimarlar, randevuTipEtiketi, randevuTipleri } from '@/data/secenekler'

// Util Imports
import { tarihSaatYaz } from '@/utils/bicim'
import { bugun } from '@/utils/ozet'

const tipRenkleri: Record<RandevuTipi, ThemeColor> = {
  'ilk-gorusme': 'primary',
  kesif: 'info',
  sunum: 'warning',
  montaj: 'success'
}

const durumRenkleri: Record<string, ThemeColor> = {
  planlandi: 'info',
  tamamlandi: 'success',
  iptal: 'error'
}

const durumEtiketleri: Record<string, string> = {
  planlandi: 'Planlandı',
  tamamlandi: 'Tamamlandı',
  iptal: 'İptal'
}

const RandevuListesi = () => {
  // Context
  const { aktifKullanici } = useAktifKullanici()

  // States
  const [sekme, setSekme] = useState<'yaklasan' | 'gecmis'>('yaklasan')
  const [tipFiltresi, setTipFiltresi] = useState<RandevuTipi | ''>('')

  const satirlar = useMemo(() => {
    const simdi = bugun()

    return randevular
      .filter(randevu => {
        const gun = randevu.tarih.slice(0, 10)
        const yaklasan = gun >= simdi && randevu.durum === 'planlandi'

        if (sekme === 'yaklasan' ? !yaklasan : yaklasan) return false

        if (tipFiltresi && randevu.tip !== tipFiltresi) return false

        if (aktifKullanici.rol === 'mimar') return randevu.mimarId === aktifKullanici.id

        // Atölye yalnız montaj randevularını görür.
        if (aktifKullanici.rol === 'atolye-yoneticisi') return randevu.tip === 'montaj'

        return true
      })
      .sort((a, b) => (sekme === 'yaklasan' ? a.tarih.localeCompare(b.tarih) : b.tarih.localeCompare(a.tarih)))
  }, [aktifKullanici, sekme, tipFiltresi])

  return (
    <div className='flex flex-col gap-6'>
      <RolSecici />

      <Card>
        <CardHeader title='Randevular' subheader={`${satirlar.length} kayıt`} />
        <Tabs value={sekme} onChange={(_, deger) => setSekme(deger)} className='border-be plb-1 pli-6'>
          <Tab value='yaklasan' label='Yaklaşan' />
          <Tab value='gecmis' label='Geçmiş' />
        </Tabs>
        <CardContent className='flex flex-wrap items-end gap-4'>
          <CustomTextField
            select
            value={tipFiltresi}
            onChange={olay => setTipFiltresi(olay.target.value as RandevuTipi | '')}
            className='min-is-[200px]'
          >
            <MenuItem value=''>Tüm randevu türleri</MenuItem>
            {randevuTipleri.map(secenek => (
              <MenuItem key={secenek.deger} value={secenek.deger}>
                {secenek.etiket}
              </MenuItem>
            ))}
          </CustomTextField>
        </CardContent>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tarih</TableCell>
                <TableCell>Tür</TableCell>
                <TableCell>Müşteri</TableCell>
                <TableCell>Mimar</TableCell>
                <TableCell>Durum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {satirlar.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align='center'>
                    <Typography className='plb-6'>
                      {sekme === 'yaklasan' ? 'Yaklaşan randevu yok.' : 'Geçmiş randevu yok.'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                satirlar.map(randevu => {
                  const musteri = musteriler.find(kayit => kayit.id === randevu.musteriId)

                  return (
                    <TableRow key={randevu.id} hover>
                      <TableCell>{tarihSaatYaz(randevu.tarih)}</TableCell>
                      <TableCell>
                        <Chip
                          size='small'
                          variant='tonal'
                          label={randevuTipEtiketi(randevu.tip)}
                          color={tipRenkleri[randevu.tip]}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          component={Link}
                          href={`/musteriler/${randevu.musteriId}`}
                          color='primary.main'
                          className='font-medium hover:underline'
                        >
                          {musteri?.ad ?? '—'}
                        </Typography>
                      </TableCell>
                      <TableCell>{mimarlar.find(mimar => mimar.id === randevu.mimarId)?.ad ?? '—'}</TableCell>
                      <TableCell>
                        <Chip
                          size='small'
                          variant='tonal'
                          label={durumEtiketleri[randevu.durum]}
                          color={durumRenkleri[randevu.durum]}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}

export default RandevuListesi
