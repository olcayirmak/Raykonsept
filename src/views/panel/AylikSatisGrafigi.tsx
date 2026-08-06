'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

// Util Imports
import { paraKisaYaz, paraYaz } from '@/utils/bicim'

const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

type Props = {
  seri: { etiket: string; tutar: number }[]
}

const AylikSatisGrafigi = ({ seri }: Props) => {
  // Hooks
  const theme = useTheme()

  const options: ApexOptions = {
    chart: { parentHeightOffset: 0, toolbar: { show: false } },
    dataLabels: { enabled: false },
    stroke: { width: 2, curve: 'smooth' },
    colors: [theme.palette.primary.main],
    fill: {
      type: 'gradient',
      gradient: { opacityFrom: 0.5, opacityTo: 0.05, shadeIntensity: 1, stops: [0, 100] }
    },
    grid: {
      strokeDashArray: 6,
      borderColor: 'var(--mui-palette-divider)',
      padding: { top: 0, left: 4, right: 4 }
    },
    xaxis: {
      categories: seri.map(nokta => nokta.etiket),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: 'var(--mui-palette-text-disabled)' } }
    },
    yaxis: {
      labels: {
        formatter: (deger: number) => paraKisaYaz(deger),
        style: { colors: 'var(--mui-palette-text-disabled)' }
      }
    },
    tooltip: { y: { formatter: (deger: number) => paraYaz(deger) } }
  }

  const toplam = seri.reduce((birikim, nokta) => birikim + nokta.tutar, 0)

  return (
    <Card>
      <CardHeader title='Aylık Satış' subheader={`Son 12 ay · toplam ${paraYaz(toplam)}`} />
      <CardContent>
        <AppReactApexCharts
          type='area'
          height={300}
          width='100%'
          options={options}
          series={[{ name: 'Satış', data: seri.map(nokta => nokta.tutar) }]}
        />
      </CardContent>
    </Card>
  )
}

export default AylikSatisGrafigi
