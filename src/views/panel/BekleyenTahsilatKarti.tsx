'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

// Type Imports
import type { BekleyenTahsilat } from '@/utils/ozet'

// Data Imports
import { odemeTuruEtiketi } from '@/data/secenekler'

// Util Imports
import { kisaTarihYaz, paraYaz } from '@/utils/bicim'

type Props = {
  tahsilatlar: BekleyenTahsilat[]
  adet?: number
}

const BekleyenTahsilatKarti = ({ tahsilatlar, adet = 6 }: Props) => {
  const gecikenSayisi = tahsilatlar.filter(satir => satir.gecikmeGunu > 0).length

  return (
    <Card className='bs-full'>
      <CardHeader
        title='Tahsilat Bekleyenler'
        subheader={
          gecikenSayisi > 0
            ? `${tahsilatlar.length} ödeme bekliyor · ${gecikenSayisi} tanesinin vadesi geçti`
            : `${tahsilatlar.length} ödeme bekliyor`
        }
        action={
          <Button size='small' variant='tonal' component={Link} href='/tahsilat'>
            Tümü
          </Button>
        }
      />
      {tahsilatlar.length === 0 ? (
        <CardContent>
          <Typography>Bekleyen tahsilat yok.</Typography>
        </CardContent>
      ) : (
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Müşteri</TableCell>
                <TableCell>Tür</TableCell>
                <TableCell>Vade</TableCell>
                <TableCell align='right'>Tutar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tahsilatlar.slice(0, adet).map(satir => (
                <TableRow key={satir.odeme.id} hover>
                  <TableCell>
                    <Typography
                      component={Link}
                      href={`/musteriler/${satir.musteri?.id ?? ''}`}
                      color='text.primary'
                      className='font-medium hover:underline'
                    >
                      {satir.musteri?.ad ?? '—'}
                    </Typography>
                  </TableCell>
                  <TableCell>{odemeTuruEtiketi(satir.odeme.tur)}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <span>{kisaTarihYaz(satir.odeme.vadeTarihi)}</span>
                      {satir.gecikmeGunu > 0 && (
                        <Chip size='small' variant='tonal' color='error' label={`${satir.gecikmeGunu} gün`} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography color='text.primary' className='font-medium'>
                      {paraYaz(satir.odeme.tutar)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  )
}

export default BekleyenTahsilatKarti
