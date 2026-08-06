'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Timeline from '@mui/lab/Timeline'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'

// Type Imports
import type { RandevuTipi } from '@/types/randevuTypes'
import type { ThemeColor } from '@core/types'
import type { YaklasanRandevu } from '@/utils/ozet'

// Data Imports
import { mimarlar, randevuTipEtiketi } from '@/data/secenekler'

// Util Imports
import { tarihSaatYaz } from '@/utils/bicim'

const tipRenkleri: Record<RandevuTipi, ThemeColor> = {
  'ilk-gorusme': 'primary',
  kesif: 'info',
  sunum: 'warning',
  montaj: 'success'
}

type Props = {
  randevular: YaklasanRandevu[]
  gunSayisi?: number
}

const YaklasanRandevularKarti = ({ randevular, gunSayisi = 14 }: Props) => (
  <Card className='bs-full'>
    <CardHeader title='Yaklaşan Randevular' subheader={`Önümüzdeki ${gunSayisi} gün`} />
    <CardContent>
      {randevular.length === 0 ? (
        <Typography>Yaklaşan randevu yok.</Typography>
      ) : (
        <Timeline className='pis-0 [&_.MuiTimelineItem-root:before]:hidden'>
          {randevular.slice(0, 6).map((satir, sira) => (
            <TimelineItem key={satir.randevu.id}>
              <TimelineSeparator>
                <TimelineDot variant='tonal' color={tipRenkleri[satir.randevu.tip]} />
                {sira < Math.min(randevular.length, 6) - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent className='flex flex-col gap-0.5 pbe-5'>
                <div className='flex flex-wrap items-center justify-between gap-x-4'>
                  <Typography color='text.primary' className='font-medium'>
                    {randevuTipEtiketi(satir.randevu.tip)} · {satir.musteri?.ad ?? '—'}
                  </Typography>
                  <Typography variant='body2' color='text.disabled'>
                    {tarihSaatYaz(satir.randevu.tarih)}
                  </Typography>
                </div>
                <Typography variant='body2'>
                  {mimarlar.find(mimar => mimar.id === satir.randevu.mimarId)?.ad ?? '—'}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </CardContent>
  </Card>
)

export default YaklasanRandevularKarti
