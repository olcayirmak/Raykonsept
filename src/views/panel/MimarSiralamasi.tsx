'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Data Imports
import { mimarlar } from '@/data/secenekler'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { paraYaz } from '@/utils/bicim'

type Props = {
  siralama: { mimarId: string; tutar: number; adet: number }[]
  vurgulananMimarId?: string
  baslik?: string
}

const MimarSiralamasi = ({ siralama, vurgulananMimarId, baslik = 'En Çok Satış Yapan Mimarlar' }: Props) => {
  const enYuksek = siralama[0]?.tutar ?? 0

  return (
    <Card className='bs-full'>
      <CardHeader title={baslik} subheader='Sözleşmesi imzalanan işler üzerinden' />
      <CardContent className='flex flex-col gap-6'>
        {siralama.length === 0 && <Typography>Henüz sözleşmeye bağlanmış satış yok.</Typography>}
        {siralama.map((satir, sira) => {
          const mimar = mimarlar.find(kayit => kayit.id === satir.mimarId)
          const ad = mimar?.ad ?? satir.mimarId
          const kendisi = satir.mimarId === vurgulananMimarId

          return (
            <div key={satir.mimarId} className='flex items-center gap-4'>
              <CustomAvatar skin='light' color={kendisi ? 'primary' : 'secondary'} size={40}>
                {getInitials(ad)}
              </CustomAvatar>
              <div className='flex flex-col gap-1 is-full'>
                <div className='flex items-center justify-between gap-2'>
                  <Typography color='text.primary' className='font-medium'>
                    {sira + 1}. {ad}
                    {kendisi && ' (siz)'}
                  </Typography>
                  <Typography color='text.primary' className='font-medium'>
                    {paraYaz(satir.tutar)}
                  </Typography>
                </div>
                <LinearProgress
                  variant='determinate'
                  value={enYuksek ? Math.round((satir.tutar / enYuksek) * 100) : 0}
                  color='primary'
                  className='bs-2'
                />
                <Typography variant='body2'>{satir.adet} iş</Typography>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default MimarSiralamasi
