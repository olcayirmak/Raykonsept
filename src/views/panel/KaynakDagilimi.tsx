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
import type { Kaynak } from '@/types/musteriTypes'

// Data Imports
import { kaynakEtiketi } from '@/data/secenekler'

const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

type Props = {
  dagilim: { kaynak: string; adet: number }[]
}

const KaynakDagilimi = ({ dagilim }: Props) => {
  const options: ApexOptions = {
    chart: { parentHeightOffset: 0, toolbar: { show: false } },
    plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: '60%', distributed: true } },
    colors: [
      'var(--mui-palette-primary-main)',
      'var(--mui-palette-info-main)',
      'var(--mui-palette-success-main)',
      'var(--mui-palette-warning-main)',
      'var(--mui-palette-error-main)',
      'var(--mui-palette-secondary-main)',
      'var(--mui-palette-primary-dark)'
    ],
    dataLabels: { enabled: false },
    legend: { show: false },
    grid: { show: false, padding: { top: -10, bottom: -10 } },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: 'var(--mui-palette-text-disabled)' } }
    },
    yaxis: {
      labels: { style: { colors: 'var(--mui-palette-text-secondary)' } }
    },
    tooltip: { y: { formatter: (deger: number) => `${deger} müşteri` } }
  }

  return (
    <Card className='bs-full'>
      <CardHeader title='Müşteri Kaynağı' subheader='Hangi kanal iş getiriyor' />
      <CardContent>
        {dagilim.length === 0 ? (
          <p className='text-center plb-10'>Kaynak bilgisi girilmiş müşteri yok.</p>
        ) : (
          <AppReactApexCharts
            type='bar'
            height={300}
            width='100%'
            options={{ ...options, xaxis: { ...options.xaxis, categories: dagilim.map(satir => kaynakEtiketi(satir.kaynak as Kaynak)) } }}
            series={[{ name: 'Müşteri', data: dagilim.map(satir => satir.adet) }]}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default KaynakDagilimi
