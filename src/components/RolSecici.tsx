'use client'

// MUI Imports
import Alert from '@mui/material/Alert'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Context Imports
import { useAktifKullanici } from '@/contexts/rolContext'

// Data Imports
import { kullanicilar, rolEtiketleri } from '@/data/kullanicilar'

// Faz 1 demo aracı. Gerçek oturum gelince bu bileşen kaldırılacak.
const RolSecici = () => {
  const { aktifKullanici, kullaniciDegistir } = useAktifKullanici()

  return (
    <Alert severity='info' icon={<i className='tabler-user-shield' />} className='flex items-center'>
      <div className='flex flex-wrap items-center gap-4'>
        <span>
          Demo: <strong>{rolEtiketleri[aktifKullanici.rol]}</strong> olarak bakıyorsunuz. Rolü değiştirip ekranın
          nasıl farklılaştığını görebilirsiniz.
        </span>
        <CustomTextField
          select
          size='small'
          value={aktifKullanici.id}
          onChange={olay => kullaniciDegistir(olay.target.value)}
          className='min-is-[220px]'
        >
          {kullanicilar.map(kullanici => (
            <MenuItem key={kullanici.id} value={kullanici.id}>
              {kullanici.ad} — {rolEtiketleri[kullanici.rol]}
            </MenuItem>
          ))}
        </CustomTextField>
      </div>
    </Alert>
  )
}

export default RolSecici
