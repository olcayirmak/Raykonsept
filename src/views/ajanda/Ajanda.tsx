'use client'

// React Imports
import { useMemo, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Third-party Imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventClickArg, EventInput } from '@fullcalendar/core'
import trLocale from '@fullcalendar/core/locales/tr'

// Type Imports
import type { RandevuTipi, Randevu } from '@/types/randevuTypes'
import type { ThemeColor } from '@core/types'

// Component Imports
import AppFullCalendar from '@/libs/styles/AppFullCalendar'
import RolSecici from '@components/RolSecici'

// Context Imports
import { useAktifKullanici } from '@/contexts/rolContext'

// Data Imports
import { musteriler } from '@/data/musteriler'
import { mimarlar, randevuTipEtiketi, randevuDurumlari } from '@/data/secenekler'

// Util Imports
import { tarihSaatYaz, kisaTarihYaz, paraYaz } from '@/utils/bicim'
import { fiyatGorebilir } from '@/utils/yetki'
import {
  bugun,
  bekleyenTahsilatlar,
  gorunurRandevular,
  kullanicininProjeleri,
  onaydaBekleyenProjeler
} from '@/utils/ozet'

// YaklasanRandevularKarti.tsx:26-31 ile AYNI eşleme. İki yerde farklı renk olmasın.
const tipRenkleri: Record<RandevuTipi, ThemeColor> = {
  'ilk-gorusme': 'primary',
  kesif: 'info',
  sunum: 'warning',
  montaj: 'success'
}

const Ajanda = () => {
  // Context
  const { aktifKullanici } = useAktifKullanici()

  // States
  const [secilenRandevu, setSecilenRandevu] = useState<Randevu | null>(null)

  // Vars
  const fiyatAcik = fiyatGorebilir(aktifKullanici)
  const simdi = bugun()

  // Randevu görünürlük kuralı ozet.ts'te tek yerde; burada tekrarlanmaz.
  const izinliRandevular = useMemo(() => gorunurRandevular(aktifKullanici), [aktifKullanici])

  // FullCalendar olay dizisi
  const takvimOlaylari = useMemo<EventInput[]>(
    () =>
      izinliRandevular.map(randevu => {
        const baslangic = new Date(randevu.tarih)

        return {
          id: randevu.id,
          title: `${randevuTipEtiketi(randevu.tip)} — ${musteriler.find(m => m.id === randevu.musteriId)?.ad ?? '—'}`,
          start: baslangic,
          end: new Date(baslangic.getTime() + 60 * 60 * 1000),
          extendedProps: {
            tip: randevu.tip
          }
        }
      }),
    [izinliRandevular]
  )

  // Bugünün randevuları, saat sırasıyla
  const bugunRandevulari = useMemo(
    () => izinliRandevular.filter(r => r.tarih.slice(0, 10) === simdi).sort((a, b) => a.tarih.localeCompare(b.tarih)),
    [izinliRandevular, simdi]
  )

  // Teslim tarihi önümüzdeki 14 gün içinde olan projeler
  const yaklasanTeslimler = useMemo(() => {
    const onDortGunSonra = new Date(Date.parse(simdi) + 14 * 86400000).toISOString().slice(0, 10)

    return kullanicininProjeleri(aktifKullanici)
      .filter(p => p.istenenTeslim && p.istenenTeslim >= simdi && p.istenenTeslim <= onDortGunSonra)
      .sort((a, b) => a.istenenTeslim!.localeCompare(b.istenenTeslim!))
      .map(p => ({
        ...p,
        musteri: musteriler.find(m => m.id === p.musteriId),
        kalanGun: Math.floor((Date.parse(p.istenenTeslim!) - Date.parse(simdi)) / 86400000)
      }))
  }, [aktifKullanici, simdi])

  // Vadesi bugün veya geçmiş, tahsil edilmemiş ödemeler
  const vadesiGelenTahsilatlar = useMemo(
    () => bekleyenTahsilatlar(aktifKullanici).filter(t => t.odeme.vadeTarihi <= simdi),
    [aktifKullanici, simdi]
  )

  // Onay bekleyen teklifler
  const onayBekleyenTeklifler = useMemo(
    () => (fiyatAcik ? onaydaBekleyenProjeler(aktifKullanici).map(p => ({
      ...p,
      musteri: musteriler.find(m => m.id === p.musteriId)
    })) : []),
    [aktifKullanici, fiyatAcik]
  )

  // Olay tıklanınca Dialog'da detay göster
  const olayTiklamasi = (arg: EventClickArg) => {
    arg.jsEvent.preventDefault()

    const randevu = izinliRandevular.find(r => r.id === arg.event.id)

    if (randevu) setSecilenRandevu(randevu)
  }

  const musteriBul = (id: string) => musteriler.find(m => m.id === id)

  const secilenMusteri = secilenRandevu ? musteriBul(secilenRandevu.musteriId) : null
  const secilenMimar = secilenRandevu ? mimarlar.find(m => m.id === secilenRandevu.mimarId) : null
  const secilenDurumEtiketi = secilenRandevu
    ? randevuDurumlari.find(d => d.deger === secilenRandevu.durum)?.etiket ?? secilenRandevu.durum
    : ''

  return (
    <div className='flex flex-col gap-6'>
      <RolSecici />

      <div className='flex gap-6 flex-col lg:flex-row'>
        {/* SOL — Takvim */}
        <div className='flex-1 min-w-0'>
          <Card>
            <AppFullCalendar className='app-calendar'>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                events={takvimOlaylari}
                locales={[trLocale]}
                locale='tr'
                firstDay={1}
                headerToolbar={{
                  start: 'prev, next, title',
                  end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                }}
                buttonText={{
                  today: 'Bugün',
                  month: 'Ay',
                  week: 'Hafta',
                  day: 'Gün',
                  list: 'Liste'
                }}
                dayMaxEvents={3}
                navLinks
                eventClassNames={arg => [`event-bg-${tipRenkleri[arg.event.extendedProps.tip as RandevuTipi]}`]}
                eventClick={olayTiklamasi}
                height='auto'
              />
            </AppFullCalendar>
          </Card>
        </div>

        {/* SAĞ — Bugün özeti kartları */}
        <div className='flex flex-col gap-4' style={{ width: '360px', flexShrink: 0 }}>
          {/* 1. Bugünün Randevuları */}
          <Card>
            <CardHeader title='Bugünün Randevuları' />
            <CardContent>
              {bugunRandevulari.length === 0 ? (
                <Typography color='text.secondary'>Bugün randevunuz yok.</Typography>
              ) : (
                <div className='flex flex-col gap-3'>
                  {bugunRandevulari.map(randevu => (
                    <div key={randevu.id} className='flex items-center gap-3'>
                      <Chip
                        size='small'
                        variant='tonal'
                        color={tipRenkleri[randevu.tip]}
                        label={randevuTipEtiketi(randevu.tip)}
                      />
                      <div className='flex flex-col'>
                        <Typography variant='body2' className='font-medium'>
                          {musteriBul(randevu.musteriId)?.ad ?? '—'}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {tarihSaatYaz(randevu.tarih)}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 2. Teslim Tarihi Yaklaşan Projeler */}
          <Card>
            <CardHeader title='Teslim Tarihi Yaklaşan Projeler' subheader='Önümüzdeki 14 gün' />
            <CardContent>
              {yaklasanTeslimler.length === 0 ? (
                <Typography color='text.secondary'>Yaklaşan teslim yok.</Typography>
              ) : (
                <div className='flex flex-col gap-3'>
                  {yaklasanTeslimler.map(proje => (
                    <div key={proje.id} className='flex items-center justify-between'>
                      <div className='flex flex-col'>
                        <Typography variant='body2' className='font-medium'>
                          {proje.musteri?.ad ?? '—'}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          Teslim: {kisaTarihYaz(proje.istenenTeslim!)}
                        </Typography>
                      </div>
                      <Chip
                        size='small'
                        variant='tonal'
                        color={proje.kalanGun <= 3 ? 'error' : proje.kalanGun <= 7 ? 'warning' : 'primary'}
                        label={`${proje.kalanGun} gün`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 3. Vadesi Gelen Tahsilatlar — SADECE fiyatGorebilir ise */}
          {fiyatAcik && (
            <Card>
              <CardHeader title='Vadesi Gelen Tahsilatlar' />
              <CardContent>
                {vadesiGelenTahsilatlar.length === 0 ? (
                  <Typography color='text.secondary'>Vadesi gelen tahsilat yok.</Typography>
                ) : (
                  <div className='flex flex-col gap-3'>
                    {vadesiGelenTahsilatlar.map(satir => (
                      <div key={satir.odeme.id} className='flex items-center justify-between'>
                        <div className='flex flex-col'>
                          <Typography variant='body2' className='font-medium'>
                            {satir.musteri?.ad ?? '—'}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            Vade: {kisaTarihYaz(satir.odeme.vadeTarihi)}
                          </Typography>
                        </div>
                        <div className='flex items-center gap-2'>
                          {satir.gecikmeGunu > 0 && (
                            <Chip size='small' variant='tonal' color='error' label={`${satir.gecikmeGunu} gün`} />
                          )}
                          <Typography variant='body2' className='font-medium'>
                            {paraYaz(satir.odeme.tutar)}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* 4. Onay Bekleyen Teklifler — SADECE fiyatGorebilir ise */}
          {fiyatAcik && (
            <Card>
              <CardHeader title='Onay Bekleyen Teklifler' />
              <CardContent>
                {onayBekleyenTeklifler.length === 0 ? (
                  <Typography color='text.secondary'>Onay bekleyen teklif yok.</Typography>
                ) : (
                  <div className='flex flex-col gap-3'>
                    {onayBekleyenTeklifler.map(proje => (
                      <div key={proje.id} className='flex items-center justify-between'>
                        <div className='flex flex-col'>
                          <Typography variant='body2' className='font-medium'>
                            {proje.musteri?.ad ?? '—'}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            {proje.durum === 'kesin-teklif' ? 'Kesin Teklif' : 'Revizyon'}
                          </Typography>
                        </div>
                        {proje.sozlesmeTutari && (
                          <Typography variant='body2' className='font-medium'>
                            {paraYaz(proje.sozlesmeTutari)}
                          </Typography>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Randevu Detay Dialog'u */}
      <Dialog open={Boolean(secilenRandevu)} onClose={() => setSecilenRandevu(null)} maxWidth='sm' fullWidth>
        <DialogTitle className='flex items-center justify-between'>
          Randevu Detayı
          <IconButton size='small' onClick={() => setSecilenRandevu(null)}>
            <i className='tabler-x' />
          </IconButton>
        </DialogTitle>
        {secilenRandevu && (
          <DialogContent className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <Typography variant='caption' color='text.secondary'>
                Müşteri
              </Typography>
              <Typography>{secilenMusteri?.ad ?? '—'}</Typography>
            </div>

            {secilenMusteri?.telefon && (
              <div className='flex flex-col gap-1'>
                <Typography variant='caption' color='text.secondary'>
                  Telefon
                </Typography>
                <Typography>{secilenMusteri.telefon}</Typography>
              </div>
            )}

            <div className='flex flex-col gap-1'>
              <Typography variant='caption' color='text.secondary'>
                Randevu Tipi
              </Typography>
              <Chip
                size='small'
                variant='tonal'
                color={tipRenkleri[secilenRandevu.tip]}
                label={randevuTipEtiketi(secilenRandevu.tip)}
                className='self-start'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <Typography variant='caption' color='text.secondary'>
                Tarih / Saat
              </Typography>
              <Typography>{tarihSaatYaz(secilenRandevu.tarih)}</Typography>
            </div>

            <div className='flex flex-col gap-1'>
              <Typography variant='caption' color='text.secondary'>
                Mimar
              </Typography>
              <Typography>{secilenMimar?.ad ?? '—'}</Typography>
            </div>

            <div className='flex flex-col gap-1'>
              <Typography variant='caption' color='text.secondary'>
                Durum
              </Typography>
              <Typography>{secilenDurumEtiketi}</Typography>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

export default Ajanda
