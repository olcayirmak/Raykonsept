'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

// Type Imports
import type { Proje } from '@/types/musteriTypes'

// Data Imports
import { musteriler } from '@/data/musteriler'
import { isTuruEtiketi, projeDurumEtiketi, projeDurumRenkleri } from '@/data/secenekler'

// Util Imports
import { paraYaz } from '@/utils/bicim'

type Props = {
  baslik: string
  altBaslik?: string
  projeler: Proje[]
  fiyatGoster: boolean
  bosMetin?: string
  adet?: number
}

/** Panelde kart içinde proje listeler. "Onayda bekleyenler", "üretimdekiler" gibi
 *  farklı süzülmüş listeler bu tek bileşenle gösterilir. */
const ProjeListeKarti = ({
  baslik,
  altBaslik,
  projeler,
  fiyatGoster,
  bosMetin = 'Gösterilecek proje yok.',
  adet = 6
}: Props) => (
  <Card className='bs-full'>
    <CardHeader
      title={baslik}
      subheader={altBaslik ?? `${projeler.length} proje`}
      action={
        <Button size='small' variant='tonal' component={Link} href='/projeler'>
          Tümü
        </Button>
      }
    />
    <CardContent className='flex flex-col gap-5'>
      {projeler.length === 0 && <Typography>{bosMetin}</Typography>}
      {projeler.slice(0, adet).map(proje => {
        const musteri = musteriler.find(kayit => kayit.id === proje.musteriId)

        return (
          <div key={proje.id} className='flex flex-wrap items-center justify-between gap-x-4 gap-y-1'>
            <div className='flex flex-col'>
              <Typography
                component={Link}
                href={`/musteriler/${proje.musteriId}`}
                color='text.primary'
                className='font-medium hover:underline'
              >
                {musteri?.ad ?? '—'}
              </Typography>
              <Typography variant='body2'>{proje.isTurleri.map(isTuruEtiketi).join(', ') || '—'}</Typography>
            </div>
            <div className='flex items-center gap-3'>
              {fiyatGoster && (proje.sozlesmeTutari ?? proje.tahminiButce) && (
                <Typography color='text.primary' className='font-medium'>
                  {paraYaz(proje.sozlesmeTutari ?? proje.tahminiButce ?? 0)}
                </Typography>
              )}
              <Chip
                size='small'
                variant='tonal'
                label={projeDurumEtiketi(proje.durum)}
                color={projeDurumRenkleri[proje.durum]}
              />
            </div>
          </div>
        )
      })}
    </CardContent>
  </Card>
)

export default ProjeListeKarti
