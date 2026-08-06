'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

// Type Imports
import type { ProjeDurumu } from '@/types/musteriTypes'

// Data Imports
import { projeDurumEtiketi } from '@/data/secenekler'

const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

type Props = {
  dagilim: { durum: ProjeDurumu; adet: number }[]
}

const PipelineDagilimi = ({ dagilim }: Props) => {
  const dolu = dagilim.filter(satir => satir.adet > 0)
  const toplam = dolu.reduce((birikim, satir) => birikim + satir.adet, 0)

  const options: ApexOptions = {
    chart: { parentHeightOffset: 0 },
    labels: dolu.map(satir => projeDurumEtiketi(satir.durum)),
    colors: [
      'var(--mui-palette-secondary-main)',
      'var(--mui-palette-info-main)',
      'var(--mui-palette-info-dark)',
      'var(--mui-palette-warning-main)',
      'var(--mui-palette-primary-main)',
      'var(--mui-palette-primary-dark)',
      'var(--mui-palette-success-main)'
    ],
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    legend: {
      position: 'bottom',
      labels: { colors: 'var(--mui-palette-text-secondary)' },
      markers: { width: 10, height: 10 },
      itemMargin: { horizontal: 8, vertical: 4 }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            value: { fontSize: '24px', color: 'var(--mui-palette-text-primary)' },
            total: {
              show: true,
              label: 'Toplam',
              color: 'var(--mui-palette-text-secondary)',
              formatter: () => String(toplam)
            }
          }
        }
      }
    }
  }

  return (
    <Card className='bs-full'>
      <CardHeader title='Satış Hattı' subheader='Projelerin bulunduğu aşamalar' />
      <CardContent>
        {toplam === 0 ? (
          <p className='text-center plb-10'>Satış aşamasında proje yok.</p>
        ) : (
          <AppReactApexCharts
            type='donut'
            height={340}
            width='100%'
            options={options}
            series={dolu.map(satir => satir.adet)}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default PipelineDagilimi
