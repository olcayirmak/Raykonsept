'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Type Imports
import type { Musteri } from '@/types/musteriTypes'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { paraYaz } from '@/utils/bicim'

type Props = {
  musteriler: { musteri: Musteri; projeSayisi: number; tutar: number }[]
  fiyatGoster: boolean
}

const EnCokIsYapanlar = ({ musteriler, fiyatGoster }: Props) => (
  <Card className='bs-full'>
    <CardHeader title='En Çok İş Yapan Müşteriler' subheader='Proje sayısı ve ciroya göre' />
    <CardContent className='flex flex-col gap-5'>
      {musteriler.length === 0 && <Typography>Gösterilecek müşteri yok.</Typography>}
      {musteriler.map(satir => (
        <div key={satir.musteri.id} className='flex items-center gap-4'>
          <CustomAvatar skin='light' color='primary' size={38}>
            {getInitials(satir.musteri.ad)}
          </CustomAvatar>
          <div className='flex flex-wrap items-center justify-between gap-x-4 gap-y-1 is-full'>
            <div className='flex flex-col'>
              <Typography
                component={Link}
                href={`/musteriler/${satir.musteri.id}`}
                color='text.primary'
                className='font-medium hover:underline'
              >
                {satir.musteri.ad}
              </Typography>
              <Typography variant='body2'>
                {[satir.musteri.il, satir.musteri.ilce].filter(Boolean).join(' / ') || '—'}
              </Typography>
            </div>
            <div className='flex items-center gap-3'>
              <Chip size='small' variant='tonal' color='secondary' label={`${satir.projeSayisi} proje`} />
              {fiyatGoster && (
                <Typography color='text.primary' className='font-medium'>
                  {satir.tutar ? paraYaz(satir.tutar) : '—'}
                </Typography>
              )}
            </div>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
)

export default EnCokIsYapanlar
