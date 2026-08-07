'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// MUI Imports
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Styled Custom Components

// Showroom binası sol paneli tam kaplar. ::after katmanı sağ kenarda form
// paneline doğru söner, böylece iki panel tek yüzey gibi okunur; renk sabit
// değil paper jetonundan geldiği için açık/koyu temada kendiliğinden uyar.
const IntroGorsel = styled('div')({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(
      to right,
      rgb(var(--mui-palette-background-paperChannel) / 0) 45%,
      rgb(var(--mui-palette-background-paperChannel) / 0.55) 78%,
      rgb(var(--mui-palette-background-paperChannel) / 0.92) 94%,
      var(--mui-palette-background-paper) 100%
    )`
  }
})

const LoginV2 = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative overflow-hidden max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <IntroGorsel>
          <Image
            src='/images/content/giris-binasi.jpg'
            alt='Ray Konsept showroom binası'
            fill
            priority
            sizes='(max-width: 900px) 0px, 70vw'
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
        </IntroGorsel>
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px] relative'>
        <Link className='absolute block-start-6 inline-end-6 md:block-start-8 md:inline-end-8'>
          <Logo />
        </Link>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>Mimar Sayfasına Hoşgeldiniz!</Typography>
            <Typography>Devam etmek için hesabınızla giriş yapın.</Typography>
          </div>
          <form
            noValidate
            autoComplete='off'
            onSubmit={e => {
              e.preventDefault()
              router.push('/')
            }}
            className='flex flex-col gap-5'
          >
            <CustomTextField autoFocus fullWidth label='E-posta veya Kullanıcı Adı' placeholder='ornek@raykonsept.com' />
            <CustomTextField
              fullWidth
              label='Parola'
              placeholder='············'
              id='outlined-adornment-password'
              type={isPasswordShown ? 'text' : 'password'}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
              <FormControlLabel control={<Checkbox />} label='Beni hatırla' />
              <Typography className='text-end' color='primary.main' component={Link}>
                Parolamı unuttum
              </Typography>
            </div>
            <Button fullWidth variant='contained' type='submit'>
              Giriş Yap
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginV2
