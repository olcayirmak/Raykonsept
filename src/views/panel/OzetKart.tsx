'use client'

// MUI Imports
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import type { CardProps } from '@mui/material/Card'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { ThemeColor } from '@core/types'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Vuexy'nin card-statistics/HorizontalWithBorder bileşeninden uyarlandı.
// Fark: `stats` metin alır (₺ biçimli tutar geçirebilmek için) ve karşılaştırma
// metni Türkçe ve dışarıdan verilebilir.

type Props = CardProps & { color: ThemeColor }

const Card = styled(MuiCard)<Props>(({ color }) => ({
  transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out, margin 0.3s ease-in-out',
  borderBottomWidth: '2px',
  borderBottomColor: `var(--mui-palette-${color}-darkerOpacity)`,
  '[data-skin="bordered"] &:hover': {
    boxShadow: 'none'
  },
  '&:hover': {
    borderBottomWidth: '3px',
    borderBottomColor: `var(--mui-palette-${color}-main) !important`,
    boxShadow: 'var(--mui-customShadows-lg)',
    marginBlockEnd: '-1px'
  }
}))

export type OzetKartProps = {
  baslik: string
  deger: string
  ikon: string
  renk?: ThemeColor
  degisim?: number
  altMetin?: string
}

const OzetKart = ({ baslik, deger, ikon, renk = 'primary', degisim, altMetin }: OzetKartProps) => (
  <Card color={renk}>
    <CardContent className='flex flex-col gap-1'>
      <div className='flex items-center gap-4'>
        <CustomAvatar color={renk} skin='light' variant='rounded'>
          <i className={classnames(ikon, 'text-[28px]')} />
        </CustomAvatar>
        <Typography variant='h4'>{deger}</Typography>
      </div>
      <div className='flex flex-col gap-1'>
        <Typography>{baslik}</Typography>
        <div className='flex items-center gap-2'>
          {degisim !== undefined && (
            <Typography color={degisim < 0 ? 'error.main' : 'success.main'} className='font-medium'>
              {`${degisim > 0 ? '+' : ''}${degisim}%`}
            </Typography>
          )}
          {altMetin && (
            <Typography variant='body2' color='text.disabled'>
              {altMetin}
            </Typography>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
)

export default OzetKart
