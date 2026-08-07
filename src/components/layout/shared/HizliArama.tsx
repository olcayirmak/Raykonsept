'use client'

// React Imports
import { useCallback, useEffect, useRef, useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

// Type Imports
import type { AramaSonucu } from '@/utils/arama'

// Context Imports
import { useAktifKullanici } from '@/contexts/rolContext'

// Data Imports
import { musteriler } from '@/data/musteriler'
import { projeler } from '@/data/projeler'

// Util Imports
import { ara } from '@/utils/arama'

// Styled input alanı — MUI TextField'in stil tekrarı yerine doğrudan input öğesi.
const AramaInput = styled('input')(({ theme }) => ({
  inlineSize: '100%',
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 1.6,
  padding: theme.spacing(2, 3),
  border: 'none',
  outline: 'none',
  color: 'var(--mui-palette-text-primary)',
  backgroundColor: 'transparent',
  '&::placeholder': {
    color: 'var(--mui-palette-text-disabled)'
  }
}))

// Sonuç satırı — klavye seçimini de yansıtır.
const SonucSatiri = styled('button', {
  shouldForwardProp: prop => prop !== 'secili'
})<{ secili: boolean }>(({ theme, secili }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  inlineSize: '100%',
  padding: theme.spacing(2.5, 3),
  border: 0,
  borderRadius: 6,
  cursor: 'pointer',
  textAlign: 'start',
  backgroundColor: secili ? 'var(--mui-palette-action-hover)' : 'transparent',
  color: 'var(--mui-palette-text-primary)',
  transition: 'background-color 0.15s ease',
  '&:hover': {
    backgroundColor: 'var(--mui-palette-action-hover)'
  }
}))

const IkonYuvasi = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  inlineSize: 36,
  blockSize: 36,
  borderRadius: 6,
  flexShrink: 0,
  backgroundColor: 'var(--mui-palette-action-selected)',
  color: 'var(--mui-palette-text-secondary)'
})

const HizliArama = () => {
  // States
  const [acik, setAcik] = useState(false)
  const [terim, setTerim] = useState('')
  const [sonuclar, setSonuclar] = useState<AramaSonucu[]>([])
  const [seciliIndex, setSeciliIndex] = useState(-1)

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  const listeRef = useRef<HTMLDivElement>(null)

  // Hooks
  const router = useRouter()
  const { aktifKullanici } = useAktifKullanici()

  // Dialog'u açar, odağı metin kutusuna verir.
  const ac = useCallback(() => {
    setAcik(true)
    setTerim('')
    setSonuclar([])
    setSeciliIndex(-1)
    // DOM güncellendikten sonra odakla.
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const kapat = useCallback(() => {
    setAcik(false)
  }, [])

  // Arama — her tuş vuruşunda ara() çağrılır, kendi eşleştirme kodu YAZILMAZ.
  const aramaYap = useCallback(
    (aranan: string) => {
      setTerim(aranan)

      if (aranan.trim().length < 2) {
        setSonuclar([])
        setSeciliIndex(-1)
        return
      }

      const bulunan = ara(aranan, aktifKullanici, { musteriler, projeler })
      setSonuclar(bulunan)
      setSeciliIndex(bulunan.length > 0 ? 0 : -1)
    },
    [aktifKullanici]
  )

  // Seçili sonucun href'ine git ve dialog'u kapat.
  const secimeGit = useCallback(
    (sonuc?: AramaSonucu) => {
      const hedef = sonuc ?? (seciliIndex >= 0 && seciliIndex < sonuclar.length ? sonuclar[seciliIndex] : null)
      if (!hedef) return
      kapat()
      router.push(hedef.href)
    },
    [router, kapat, seciliIndex, sonuclar]
  )

  // Klavye: ↑/↓ gezinme, Enter seçim, Esc kapatma.
  const tusYakala = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSeciliIndex(i => (i < sonuclar.length - 1 ? i + 1 : i))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSeciliIndex(i => (i > 0 ? i - 1 : i))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        secimeGit()
      } else if (e.key === 'Escape') {
        kapat()
      }
    },
    [sonuclar.length, secimeGit, kapat]
  )

  // Seçili satır listede görünür olsun.
  useEffect(() => {
    if (seciliIndex < 0 || !listeRef.current) return
    const satir = listeRef.current.children[seciliIndex] as HTMLElement | undefined
    satir?.scrollIntoView({ block: 'nearest' })
  }, [seciliIndex])

  // Genel klavye kısayolu: ⌘K / Ctrl+K
  useEffect(() => {
    const kisaYol = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        acik ? kapat() : ac()
      }
    }

    window.addEventListener('keydown', kisaYol)
    return () => window.removeEventListener('keydown', kisaYol)
  }, [acik, ac, kapat])

  const musteriSonuclari = sonuclar.filter(sonuc => sonuc.tur === 'musteri')
  const projeSonuclari = sonuclar.filter(sonuc => sonuc.tur === 'proje')

  // Kullanıcı 2 karakterden az yazdıysa ipucu, sonuç yoksa bilgi.
  const durumIpuclari = () => {
    if (!terim.trim()) return null
    if (terim.trim().length < 2) {
      return (
        <Typography variant='body2' color='text.secondary' sx={{ px: 3, pt: 1 }}>
          En az 2 karakter yazın
        </Typography>
      )
    }
    if (sonuclar.length === 0) {
      return (
        <Typography variant='body2' color='text.secondary' sx={{ px: 3, pt: 1 }}>
          &ldquo;{terim}&rdquo; için sonuç bulunamadı
        </Typography>
      )
    }
    return null
  }

  const satirIcon = (tur: AramaSonucu['tur']) => (tur === 'musteri' ? 'tabler-user' : 'tabler-briefcase')

  return (
    <>
      {/* Tetikleyici düğme — navbar içinde gösterilir */}
      <div
        onClick={ac}
        className='flex items-center gap-2 pli-3 plb-1.5 rounded-md cursor-pointer border border-solid'
        style={{
          borderColor: 'var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-action-hover)'
        }}
      >
        <i className='tabler-search text-textSecondary' />
        <Typography variant='body2' color='text.disabled' sx={{ userSelect: 'none' }}>
          Ara...
        </Typography>
        <Chip
          label='⌘K'
          size='small'
          variant='tonal'
          color='secondary'
          sx={{
            blockSize: 20,
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: 0.5,
            borderRadius: 1,
            '.MuiChip-label': { px: 0.75 }
          }}
        />
      </div>

      {/* Arama Dialog'u */}
      <Dialog open={acik} onClose={kapat} maxWidth='sm' fullWidth>
        <DialogContent className='flex flex-col p-0!' sx={{ overflow: 'hidden' }}>
          {/* Arama kutusu */}
          <div className='flex items-center border-b' style={{ borderColor: 'var(--mui-palette-divider)' }}>
            <i className='tabler-search text-textSecondary ml-5 mr-1' style={{ fontSize: '1.25rem' }} />
            <AramaInput
              ref={inputRef}
              value={terim}
              onChange={e => aramaYap(e.target.value)}
              onKeyDown={tusYakala}
              placeholder='Müşteri, proje, ilçe ya da telefonla arayın...'
              autoComplete='off'
              spellCheck={false}
            />
            <IconButton onClick={kapat} size='small' className='mr-2'>
              <i className='tabler-x' />
            </IconButton>
          </div>

          {/* Sonuç listesi */}
          <div ref={listeRef} className='flex flex-col overflow-y-auto p-3' style={{ maxBlockSize: 360 }}>
            {durumIpuclari()}

            {musteriSonuclari.length > 0 && (
              <>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  sx={{ px: 3, pt: musteriSonuclari === sonuclar ? 0 : 1, pb: 1, fontWeight: 600, letterSpacing: 0.5 }}
                >
                  Müşteriler
                </Typography>
                {musteriSonuclari.map((sonuc, index) => (
                  <SonucSatiri
                    key={sonuc.id}
                    secili={seciliIndex === index}
                    onClick={() => secimeGit(sonuc)}
                  >
                    <IkonYuvasi>
                      <i className={satirIcon(sonuc.tur)} />
                    </IkonYuvasi>
                    <div className='flex flex-col overflow-hidden'>
                      <Typography variant='body2' noWrap>
                        {sonuc.baslik}
                      </Typography>
                      <Typography variant='caption' color='text.secondary' noWrap>
                        {sonuc.altBaslik}
                      </Typography>
                    </div>
                  </SonucSatiri>
                ))}
              </>
            )}

            {projeSonuclari.length > 0 && (
              <>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  sx={{ px: 3, pt: 2, pb: 1, fontWeight: 600, letterSpacing: 0.5 }}
                >
                  Projeler
                </Typography>
                {projeSonuclari.map((sonuc, index) => {
                  const globalIndex = musteriSonuclari.length + index
                  return (
                    <SonucSatiri
                      key={sonuc.id}
                      secili={seciliIndex === globalIndex}
                      onClick={() => secimeGit(sonuc)}
                    >
                      <IkonYuvasi>
                        <i className={satirIcon(sonuc.tur)} />
                      </IkonYuvasi>
                      <div className='flex flex-col overflow-hidden'>
                        <Typography variant='body2' noWrap>
                          {sonuc.baslik}
                        </Typography>
                        <Typography variant='caption' color='text.secondary' noWrap>
                          {sonuc.altBaslik}
                        </Typography>
                      </div>
                    </SonucSatiri>
                  )
                })}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default HizliArama
