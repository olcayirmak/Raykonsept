'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Type Imports
import type { CevapSatiri, Motivasyon } from '@/utils/whatsappOzet'

// Util Imports
import { getInitials } from '@/utils/getInitials'

type Props = {
  siralama: CevapSatiri[]
  cevapsizSayi: number
  motivasyon: Motivasyon | null
  kullaniciId: string
}

// Typography'nin color prop'u tema yolu bekler: 'warning' çözümlenmez, sessizce
// varsayılan metin rengine düşer. '.main' eki şart.
const tonRenkMap: Record<string, string> = {
  zirve: 'success.main',
  iyi: 'primary.main',
  geride: 'warning.main',
  baslangic: 'info.main'
}

const WhatsappRekabetKarti = ({ siralama, cevapsizSayi, motivasyon, kullaniciId }: Props) => {
  const enYuksek = siralama[0]?.musteriAdedi ?? 0

  return (
    <Card className='bs-full'>
      <CardHeader title='WhatsApp — Bu Ay' subheader='Kaç müşteriye dönüş yapıldı' />
      <CardContent className='flex flex-col gap-6'>
        {siralama.length === 0 && <Typography>Bu ay henüz veri yok.</Typography>}
        {siralama.map((satir, sira) => {
          const kendisi = satir.kullaniciId === kullaniciId

          return (
            <div key={satir.kullaniciId} className='flex items-center gap-4'>
              <CustomAvatar skin='light' color={kendisi ? 'primary' : 'secondary'} size={40}>
                {getInitials(satir.ad)}
              </CustomAvatar>
              <div className='flex flex-col gap-1 is-full'>
                <div className='flex items-center justify-between gap-2'>
                  <Typography color='text.primary' className='font-medium'>
                    {sira + 1}. {satir.ad}
                    {kendisi && ' (siz)'}
                  </Typography>
                  <Typography color='text.primary' className='font-medium'>
                    {satir.musteriAdedi}
                  </Typography>
                </div>
                <LinearProgress
                  variant='determinate'
                  value={enYuksek ? Math.round((satir.musteriAdedi / enYuksek) * 100) : 0}
                  color='primary'
                  className='bs-2'
                />
                <Typography variant='body2' color='text.secondary'>
                  · {satir.mesajAdedi} mesaj
                </Typography>
              </div>
            </div>
          )
        })}

        {cevapsizSayi > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 2,
              px: 3,
              bgcolor: 'var(--mui-palette-warning-lightOpacity)',
              borderRadius: 1
            }}
          >
            <Typography variant='body2' color='warning.main'>
              {cevapsizSayi} talep cevapsız bekliyor
            </Typography>
            <Button component={Link} href='/whatsapp' color='warning' size='small' variant='text'>
              Görüntüle
            </Button>
          </Box>
        )}

        {motivasyon && (
          <Box
            sx={{
              borderTop: 1,
              borderColor: 'divider',
              pt: 4
            }}
          >
            <Typography variant='body2' fontWeight='medium' color={tonRenkMap[motivasyon.ton]}>
              {motivasyon.baslik}
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
              {motivasyon.mesaj}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default WhatsappRekabetKarti
