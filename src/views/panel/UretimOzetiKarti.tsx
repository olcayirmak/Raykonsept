'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

// Type Imports
import type { ThemeColor } from '@core/types'
import type { UretimDurumu } from '@/types/musteriTypes'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Data Imports
import { projeDurumEtiketi } from '@/data/secenekler'

const asamaGorunumu: Record<UretimDurumu, { ikon: string; renk: ThemeColor }> = {
  'uretime-alindi': { ikon: 'tabler-package-import', renk: 'info' },
  hazirlaniyor: { ikon: 'tabler-tools', renk: 'warning' },
  'montaj-planlandi': { ikon: 'tabler-calendar-check', renk: 'primary' },
  tamamlandi: { ikon: 'tabler-circle-check', renk: 'success' }
}

type Props = {
  ozet: { durum: UretimDurumu; adet: number }[]
}

const UretimOzetiKarti = ({ ozet }: Props) => {
  const toplam = ozet.reduce((birikim, satir) => birikim + satir.adet, 0)

  return (
    <Card className='bs-full'>
      <CardHeader title='Üretim Durumu' subheader={`${toplam} iş atölyede`} />
      <CardContent className='flex flex-col gap-6'>
        {ozet.map(satir => {
          const gorunum = asamaGorunumu[satir.durum]

          return (
            <div key={satir.durum} className='flex items-center gap-4'>
              <CustomAvatar skin='light' color={gorunum.renk} variant='rounded'>
                <i className={gorunum.ikon} />
              </CustomAvatar>
              <div className='flex flex-col gap-1 is-full'>
                <div className='flex items-center justify-between gap-2'>
                  <Typography color='text.primary' className='font-medium'>
                    {projeDurumEtiketi(satir.durum)}
                  </Typography>
                  <Typography color='text.primary' className='font-medium'>
                    {satir.adet}
                  </Typography>
                </div>
                <LinearProgress
                  variant='determinate'
                  value={toplam ? Math.round((satir.adet / toplam) * 100) : 0}
                  color={gorunum.renk}
                  className='bs-2'
                />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default UretimOzetiKarti
