'use client'

// React Imports
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

// MUI Imports
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// Type Imports
import type { IsTuru, YeniMusteriFormDegerleri } from '@/types/musteriTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Next Imports
import { useRouter } from 'next/navigation'

// Context Imports
import { useAktifKullanici } from '@/contexts/rolContext'

// Data Imports
import {
  iller,
  isTurleri as isTuruSecenekleri,
  kaynaklar,
  mekanTipleri,
  mimarlar,
  musteriTipleri,
  yapiDurumlari
} from '@/data/secenekler'
import { musteriEkle, telefonlaMusteriBul } from '@/data/musteriler'
import { projeEkle } from '@/data/projeler'

// Util Imports
import { paraYaz, telefonBicimle, telefonRakamlari } from '@/utils/bicim'

const baslangicDegerleri: YeniMusteriFormDegerleri = {
  tip: 'bireysel',
  ad: '',
  yetkiliKisi: '',
  telefon: '',
  ePosta: '',
  il: '',
  ilce: '',
  acikAdres: '',
  kaynak: undefined,
  tavsiyeEden: '',
  sorumluMimarId: '',
  notlar: '',
  isTurleri: [],
  mekanTipi: undefined,
  yapiDurumu: undefined,
  tahminiButce: undefined,
  istenenTeslim: ''
}

type Hatalar = Partial<Record<'ad' | 'telefon' | 'ePosta', string>>

const YeniMusteriForm = () => {
  // Hooks
  const router = useRouter()

  // Context
  const { aktifKullanici } = useAktifKullanici()

  // States
  const [degerler, setDegerler] = useState<YeniMusteriFormDegerleri>(baslangicDegerleri)
  const [hatalar, setHatalar] = useState<Hatalar>({})
  const [kaydedildi, setKaydedildi] = useState(false)

  // Vars
  const kurumsal = degerler.tip === 'kurumsal'
  const rakamlar = telefonRakamlari(degerler.telefon)

  // Aynı telefonla kayıtlı müşteri varsa mükerrer kayıt açılmasın diye uyarılır.
  const mevcutMusteri = useMemo(() => (rakamlar.length >= 10 ? telefonlaMusteriBul(rakamlar) : undefined), [rakamlar])

  const alanDegistir = <K extends keyof YeniMusteriFormDegerleri>(alan: K, deger: YeniMusteriFormDegerleri[K]) => {
    setDegerler(oncekiler => ({ ...oncekiler, [alan]: deger }))
    setKaydedildi(false)
  }

  const isTuruDegistir = (isTuru: IsTuru) => {
    const secili = degerler.isTurleri.includes(isTuru)

    alanDegistir(
      'isTurleri',
      secili ? degerler.isTurleri.filter(mevcut => mevcut !== isTuru) : [...degerler.isTurleri, isTuru]
    )
  }

  const dogrula = () => {
    const yeniHatalar: Hatalar = {}

    if (!degerler.ad.trim()) {
      yeniHatalar.ad = kurumsal ? 'Firma ünvanı zorunludur' : 'Ad soyad zorunludur'
    }

    if (rakamlar.length < 10) {
      yeniHatalar.telefon = 'Geçerli bir telefon numarası girin'
    }

    if (degerler.ePosta && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(degerler.ePosta)) {
      yeniHatalar.ePosta = 'Geçerli bir e-posta adresi girin'
    }

    return yeniHatalar
  }

  const gonder = (olay: FormEvent) => {
    olay.preventDefault()

    const yeniHatalar = dogrula()

    setHatalar(yeniHatalar)

    if (Object.keys(yeniHatalar).length > 0) return

    const { isTurleri, mekanTipi, yapiDurumu, tahminiButce, istenenTeslim, ...musteriAlanlari } = degerler

    const musteri = musteriEkle({ ...musteriAlanlari, telefon: rakamlar })

    // İlk proje yalnızca iş türü seçildiyse açılır; boş bırakılırsa sadece müşteri kaydı olur.
    if (isTurleri.length > 0) {
      projeEkle({
        musteriId: musteri.id,
        // Satış, kaydı açan mimara yazılır; yönetici açıyorsa seçilen sorumlu mimara.
        mimarId: aktifKullanici.rol === 'mimar' ? aktifKullanici.id : (musteri.sorumluMimarId ?? ''),
        isTurleri,
        mekanTipi,
        yapiDurumu,
        tahminiButce,
        istenenTeslim,
        durum: 'yeni-talep'
      })
    }

    setKaydedildi(true)
    router.push(`/musteriler/${musteri.id}`)
  }

  const temizle = () => {
    setDegerler(baslangicDegerleri)
    setHatalar({})
    setKaydedildi(false)
  }

  return (
    <form onSubmit={gonder}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader title='Müşteri Bilgileri' subheader='Ad soyad ve telefon dışındaki alanlar sonradan doldurulabilir.' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Müşteri Tipi'
                    value={degerler.tip}
                    onChange={olay => alanDegistir('tip', olay.target.value as YeniMusteriFormDegerleri['tip'])}
                  >
                    {musteriTipleri.map(secenek => (
                      <MenuItem key={secenek.deger} value={secenek.deger}>
                        {secenek.etiket}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    fullWidth
                    required
                    label={kurumsal ? 'Firma Ünvanı' : 'Ad Soyad'}
                    placeholder={kurumsal ? 'Akbay İnşaat Ltd. Şti.' : 'Ayşe Demirtaş'}
                    value={degerler.ad}
                    onChange={olay => alanDegistir('ad', olay.target.value)}
                    error={Boolean(hatalar.ad)}
                    helperText={hatalar.ad}
                  />
                </Grid>

                {kurumsal && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <CustomTextField
                      fullWidth
                      label='Yetkili Kişi'
                      placeholder='Murat Akbay'
                      value={degerler.yetkiliKisi}
                      onChange={olay => alanDegistir('yetkiliKisi', olay.target.value)}
                    />
                  </Grid>
                )}

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    fullWidth
                    required
                    label='Telefon'
                    placeholder='0(532) 111 44 55'
                    value={degerler.telefon}
                    onChange={olay => alanDegistir('telefon', telefonBicimle(olay.target.value))}
                    error={Boolean(hatalar.telefon)}
                    helperText={hatalar.telefon}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    fullWidth
                    type='email'
                    label='E-posta'
                    placeholder='ayse.demirtas@example.com'
                    value={degerler.ePosta}
                    onChange={olay => alanDegistir('ePosta', olay.target.value)}
                    error={Boolean(hatalar.ePosta)}
                    helperText={hatalar.ePosta ?? 'Teklif ve çizimler bu adrese gönderilir.'}
                  />
                </Grid>

                {mevcutMusteri && (
                  <Grid size={{ xs: 12 }}>
                    <Alert severity='warning'>
                      Bu telefon numarası <strong>{mevcutMusteri.ad}</strong> adına zaten kayıtlı. Yeni müşteri açmak
                      yerine mevcut kaydına yeni proje eklemeyi düşünün.
                    </Alert>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader title='Adres' subheader='Keşif ve montaj ekibi bu adrese gider.' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    select
                    fullWidth
                    label='İl'
                    value={degerler.il}
                    onChange={olay => alanDegistir('il', olay.target.value)}
                  >
                    {iller.map(il => (
                      <MenuItem key={il} value={il}>
                        {il}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    fullWidth
                    label='İlçe'
                    placeholder='Kadıköy'
                    value={degerler.ilce}
                    onChange={olay => alanDegistir('ilce', olay.target.value)}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <CustomTextField
                    fullWidth
                    multiline
                    rows={2}
                    label='Açık Adres'
                    placeholder='Mahalle, sokak, bina ve daire no'
                    value={degerler.acikAdres}
                    onChange={olay => alanDegistir('acikAdres', olay.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader
              title='İlk Proje'
              subheader='İsteğe bağlı. Doldurursanız müşteriyle birlikte "Yeni Talep" durumunda bir proje açılır.'
            />
            <CardContent>
              <Grid container spacing={6}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant='body2' className='mbe-2'>
                    İş Türü
                  </Typography>
                  <div className='flex flex-wrap gap-x-6'>
                    {isTuruSecenekleri.map(secenek => (
                      <FormControlLabel
                        key={secenek.deger}
                        label={secenek.etiket}
                        control={
                          <Checkbox
                            checked={degerler.isTurleri.includes(secenek.deger)}
                            onChange={() => isTuruDegistir(secenek.deger)}
                          />
                        }
                      />
                    ))}
                  </div>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Mekân Tipi'
                    value={degerler.mekanTipi ?? ''}
                    onChange={olay =>
                      alanDegistir('mekanTipi', (olay.target.value || undefined) as YeniMusteriFormDegerleri['mekanTipi'])
                    }
                  >
                    {mekanTipleri.map(secenek => (
                      <MenuItem key={secenek.deger} value={secenek.deger}>
                        {secenek.etiket}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Yapı Durumu'
                    value={degerler.yapiDurumu ?? ''}
                    onChange={olay =>
                      alanDegistir(
                        'yapiDurumu',
                        (olay.target.value || undefined) as YeniMusteriFormDegerleri['yapiDurumu']
                      )
                    }
                  >
                    {yapiDurumlari.map(secenek => (
                      <MenuItem key={secenek.deger} value={secenek.deger}>
                        {secenek.etiket}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    fullWidth
                    label='Tahmini Bütçe'
                    placeholder='450000'
                    value={degerler.tahminiButce ?? ''}
                    onChange={olay => {
                      const sadeceRakam = olay.target.value.replace(/\D/g, '')

                      alanDegistir('tahminiButce', sadeceRakam ? Number(sadeceRakam) : undefined)
                    }}
                    slotProps={{
                      input: {
                        startAdornment: <InputAdornment position='start'>₺</InputAdornment>
                      }
                    }}
                    helperText={degerler.tahminiButce ? paraYaz(degerler.tahminiButce) : 'Görüşmede konuşulan yaklaşık tutar.'}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    fullWidth
                    type='date'
                    label='İstenen Teslim Tarihi'
                    value={degerler.istenenTeslim}
                    onChange={olay => alanDegistir('istenenTeslim', olay.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader title='Kaynak ve Takip' subheader='Hangi kanalın iş getirdiği sonradan geriye dönük doldurulamaz.' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Nereden Ulaştı'
                    value={degerler.kaynak ?? ''}
                    onChange={olay =>
                      alanDegistir('kaynak', (olay.target.value || undefined) as YeniMusteriFormDegerleri['kaynak'])
                    }
                  >
                    {kaynaklar.map(secenek => (
                      <MenuItem key={secenek.deger} value={secenek.deger}>
                        {secenek.etiket}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>

                {degerler.kaynak === 'tavsiye' && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <CustomTextField
                      fullWidth
                      label='Tavsiye Eden'
                      placeholder='Ayşe Demirtaş'
                      value={degerler.tavsiyeEden}
                      onChange={olay => alanDegistir('tavsiyeEden', olay.target.value)}
                    />
                  </Grid>
                )}

                <Grid size={{ xs: 12, sm: 6 }}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Sorumlu Mimar'
                    value={degerler.sorumluMimarId}
                    onChange={olay => alanDegistir('sorumluMimarId', olay.target.value)}
                  >
                    {mimarlar.map(mimar => (
                      <MenuItem key={mimar.id} value={mimar.id}>
                        {mimar.ad}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <CustomTextField
                    fullWidth
                    multiline
                    rows={3}
                    label='Notlar'
                    placeholder='Görüşmede konuşulanlar, özel istekler'
                    value={degerler.notlar}
                    onChange={olay => alanDegistir('notlar', olay.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {kaydedildi && (
          <Grid size={{ xs: 12 }}>
            <Alert severity='success'>
              <strong>{degerler.ad}</strong> kaydedildi
              {degerler.isTurleri.length > 0 ? ' ve ilk projesi "Yeni Talep" durumunda açıldı' : ''}. (Faz 1: kayıt
              kalıcı değil, veritabanı henüz bağlı değil.)
            </Alert>
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <Divider className='mbe-6' />
          <div className='flex gap-4'>
            <Button type='submit' variant='contained'>
              Müşteriyi Kaydet
            </Button>
            <Button type='button' variant='tonal' color='secondary' onClick={temizle}>
              Temizle
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  )
}

export default YeniMusteriForm
