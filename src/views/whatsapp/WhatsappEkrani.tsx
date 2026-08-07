'use client'

// React Imports
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'
import RolSecici from '@components/RolSecici'

// Context Imports
import { useAktifKullanici } from '@/contexts/rolContext'

// Data Imports
import { whatsappMesajlar, whatsappSohbetler } from '@/data/whatsapp'
import { kullaniciBul } from '@/data/kullanicilar'

// Util Imports
import { tarihSaatYaz, tarihYaz, telefonBicimle } from '@/utils/bicim'
import { whatsappGorebilir } from '@/utils/yetki'
import {
  cevapsizMi,
  cevapsizSohbetler,
  gunlereBol,
  sohbetMesajlari
} from '@/utils/whatsapp'

// Type Imports
import type { WhatsappMesaj } from '@/types/whatsappTypes'

// Etiket renkleri ve metinleri — bileşene sabit yazılmaz, secenekler.ts'teki
// pattern'e uygun. WhatsApp'a özel olduğu ve şimdilik tek kullanım yeri burası
// olduğu için burada tanımlandı.
const etiketBilgisi: Record<string, { etiket: string; renk: 'warning' | 'info' | 'success' | 'default' | 'error' }> = {
  'yeni-talep': { etiket: 'Yeni Talep', renk: 'warning' },
  goruculuk: { etiket: 'Görücülük', renk: 'info' },
  teklif: { etiket: 'Teklif', renk: 'success' },
  uretim: { etiket: 'Üretim', renk: 'default' },
  kapandi: { etiket: 'Kapandı', renk: 'error' }
}

const WhatsappEkrani = () => {
  // Context
  const { aktifKullanici } = useAktifKullanici()

  // States
  const [secilenSohbetId, setSecilenSohbetId] = useState<string | null>(null)
  const [arama, setArama] = useState('')
  const [mesajMetni, setMesajMetni] = useState('')
  const [yerelMesajlar, setYerelMesajlar] = useState<WhatsappMesaj[]>([])

  // Refs
  const mesajAlaniRef = useRef<HTMLDivElement>(null)

  // Vars
  const gorunurMu = whatsappGorebilir(aktifKullanici)

  // ── Türetilmiş: aranıp sıralanmış sohbet listesi ──
  const suzulenSohbetler = useMemo(() => {
    if (!gorunurMu) return []

    let liste = [...whatsappSohbetler]

    if (arama.trim()) {
      const terim = arama.toLocaleLowerCase('tr')
      liste = liste.filter(
        sohbet =>
          sohbet.ad.toLocaleLowerCase('tr').includes(terim) ||
          sohbet.telefon.includes(terim.replace(/\D/g, ''))
      )
    }

    // Cevapsızlar üste, sonra tarihe göre yeniden eskiye
    const cevapsizIds = new Set(
      cevapsizSohbetler(whatsappSohbetler, whatsappMesajlar).map(s => s.id)
    )

    return [...liste].sort((a, b) => {
      const aCevapsiz = cevapsizIds.has(a.id) ? 1 : 0
      const bCevapsiz = cevapsizIds.has(b.id) ? 1 : 0

      if (aCevapsiz !== bCevapsiz) return bCevapsiz - aCevapsiz

      return b.sonMesajTarihi.localeCompare(a.sonMesajTarihi)
    })
  }, [gorunurMu, arama])

  // ── Seçili sohbet ──
  const secilenSohbet = useMemo(() => {
    if (!secilenSohbetId) return null

    return whatsappSohbetler.find(s => s.id === secilenSohbetId) ?? null
  }, [secilenSohbetId])

  // ── Seçili sohbetin mesajları (mock + yerel) ──
  const tumMesajlar = useMemo(() => {
    if (!secilenSohbetId) return []

    const mockMesajlar = sohbetMesajlari(secilenSohbetId, whatsappMesajlar)
    const ekMesajlar = yerelMesajlar.filter(m => m.sohbetId === secilenSohbetId)

    return [...mockMesajlar, ...ekMesajlar].sort((a, b) => a.tarih.localeCompare(b.tarih))
  }, [secilenSohbetId, yerelMesajlar])

  // ── Gün grupları ──
  const gunGruplari = useMemo(() => gunlereBol(tumMesajlar), [tumMesajlar])

  // ── Scroll: yeni mesaj gelince en alta kaydır ──
  useEffect(() => {
    if (mesajAlaniRef.current) {
      mesajAlaniRef.current.scrollTop = mesajAlaniRef.current.scrollHeight
    }
  }, [tumMesajlar])

  // ── Gönder ──
  const mesajGonder = useCallback(() => {
    if (!mesajMetni.trim() || !secilenSohbetId) return

    const simdi = new Date()
    const tarihStr = `${simdi.getFullYear()}-${String(simdi.getMonth() + 1).padStart(2, '0')}-${String(simdi.getDate()).padStart(2, '0')}T${String(simdi.getHours()).padStart(2, '0')}:${String(simdi.getMinutes()).padStart(2, '0')}`

    const yeniMesaj: WhatsappMesaj = {
      id: `yerel-${Date.now()}`,
      sohbetId: secilenSohbetId,
      yon: 'giden',
      govde: mesajMetni.trim(),
      tarih: tarihStr,
      gonderenKullaniciId: aktifKullanici.id,
      durum: 'gonderildi'
    }

    setYerelMesajlar(oncekiler => [...oncekiler, yeniMesaj])
    setMesajMetni('')
  }, [mesajMetni, secilenSohbetId, aktifKullanici.id])

  // ── Yardımcılar ──
  const sohbetCevapsizMi = (sohbetId: string) => cevapsizMi(sohbetId, whatsappMesajlar)

  // ── Yetkisiz rol ──
  if (!gorunurMu) {
    return (
      <div className='flex flex-col gap-6'>
        <RolSecici />
        <Alert severity='warning'>
          <AlertTitle>Bu ekran üretim rollerine kapalı</AlertTitle>
          WhatsApp şirket hattı yazışmaları fiyat, teklif ve müşteri bilgisi içerdiği için yalnızca yönetici ve mimarlar
          tarafından görülebilir.
        </Alert>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-6'>
      <RolSecici />

      <Grid container spacing={0} className='border rounded-md overflow-hidden'>
        {/* ── SOL: Sohbet listesi ── */}
        <Grid size={{ xs: 12, md: 5, lg: 4 }} className='border-be md:border-be-0 md:border-ie'>
          {/* Arama */}
          <div className='p-3 border-be'>
            <CustomTextField
              fullWidth
              size='small'
              placeholder='Sohbetlerde ara...'
              value={arama}
              onChange={olay => setArama(olay.target.value)}
              InputProps={{
                startAdornment: <i className='tabler-search text-textSecondary mr-1' />
              }}
            />
          </div>

          {/* Liste */}
          <div className='flex flex-col overflow-y-auto' style={{ maxHeight: 'calc(100vh - 320px)' }}>
            {suzulenSohbetler.length === 0 ? (
              <div className='p-6 text-center'>
                <Typography color='text.disabled'>
                  {arama ? 'Aramanızla eşleşen sohbet bulunamadı.' : 'Henüz hiç sohbet yok.'}
                </Typography>
              </div>
            ) : (
              suzulenSohbetler.map((sohbet, sira) => {
                const cevapsiz = sohbetCevapsizMi(sohbet.id)
                const secili = secilenSohbetId === sohbet.id
                const oncekiCevapsiz = sira > 0 ? sohbetCevapsizMi(suzulenSohbetler[sira - 1].id) : false

                // Cevapsız grubu başlığı
                const baslikSatiri = cevapsiz && !oncekiCevapsiz

                return (
                  <div key={sohbet.id}>
                    {baslikSatiri && (
                      <div
                        className='flex items-center gap-2 px-3 py-2 border-be'
                        style={{ backgroundColor: 'var(--mui-palette-warning-lightOpacity)' }}
                      >
                        <i className='tabler-alert-triangle text-warning text-sm' />
                        <Typography variant='caption' className='font-medium text-warning'>
                          Cevapsız
                        </Typography>
                      </div>
                    )}
                    <div
                      onClick={() => setSecilenSohbetId(sohbet.id)}
                      className={`flex items-start gap-3 p-3 cursor-pointer border-be transition-shadow hover:shadow-sm ${
                        secili
                          ? 'bg-actionSelected'
                          : cevapsiz
                            ? ''
                            : 'bg-backgroundPaper'
                      }`}
                      style={
                        cevapsiz && !secili
                          ? { backgroundColor: 'var(--mui-palette-warning-lightOpacity)' }
                          : undefined
                      }
                    >
                      <CustomAvatar size={40} skin='light' color={cevapsiz ? 'warning' : 'primary'}>
                        {sohbet.ad.slice(0, 2).toUpperCase()}
                      </CustomAvatar>
                      <div className='flex-1 overflow-hidden'>
                        <div className='flex items-center justify-between gap-2'>
                          <Typography
                            variant='body2'
                            className={`${sohbet.okunmamisAdet > 0 ? 'font-semibold' : ''}`}
                            noWrap
                          >
                            {sohbet.ad}
                          </Typography>
                          <Typography variant='caption' color='text.disabled' className='shrink-0'>
                            {tarihSaatYaz(sohbet.sonMesajTarihi)}
                          </Typography>
                        </div>
                        <div className='flex items-center justify-between gap-2'>
                          <Typography variant='caption' color='text.disabled' noWrap>
                            {sohbet.telefon.length <= 11
                              ? telefonBicimle(sohbet.telefon)
                              : sohbet.telefon}
                          </Typography>
                          {sohbet.okunmamisAdet > 0 && (
                            // Badge çocuksuz kullanılınca sayacı mutlak konumla kutunun
                            // dışına taşıyor ve liste kenarında kırpılıyordu; düz rozet.
                            <Box
                              className='shrink-0 flex items-center justify-center rounded-full'
                              sx={{
                                minInlineSize: 20,
                                blockSize: 20,
                                paddingInline: 0.75,
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                fontSize: '0.6875rem',
                                fontWeight: 600,
                                lineHeight: 1
                              }}
                            >
                              {sohbet.okunmamisAdet}
                            </Box>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </Grid>

        {/* ── SAĞ: Sohbet detayı ── */}
        <Grid size={{ xs: 12, md: 7, lg: 8 }}>
          {secilenSohbet ? (
            <div className='flex flex-col' style={{ maxHeight: 'calc(100vh - 320px)' }}>
              {/* Başlık */}
              <div className='flex items-center justify-between p-4 border-be'>
                <div className='flex items-center gap-3'>
                  <Avatar className='is-10 bs-10'>
                    {secilenSohbet.ad.slice(0, 2).toUpperCase()}
                  </Avatar>
                  <div>
                    <div className='flex items-center gap-2'>
                      <Typography variant='h6' className='text-base'>
                        {secilenSohbet.ad}
                      </Typography>
                      {sohbetCevapsizMi(secilenSohbet.id) && (
                        <i className='tabler-alert-triangle text-warning text-sm' />
                      )}
                    </div>
                    <Typography variant='caption' color='text.disabled'>
                      {secilenSohbet.telefon.length <= 11
                        ? telefonBicimle(secilenSohbet.telefon)
                        : secilenSohbet.telefon}
                      {' · '}
                      {etiketBilgisi[secilenSohbet.etiket]?.etiket ?? secilenSohbet.etiket}
                    </Typography>
                  </div>
                </div>
                {secilenSohbet.musteriId && (
                  <Button
                    variant='tonal'
                    size='small'
                    component={Link}
                    href={`/musteriler/${secilenSohbet.musteriId}`}
                    startIcon={<i className='tabler-user' />}
                  >
                    Müşteri Kartı
                  </Button>
                )}
              </div>

              {/* Mesaj alanı */}
              <div ref={mesajAlaniRef} className='flex-1 overflow-y-auto p-4'>
                {gunGruplari.length === 0 ? (
                  <div className='flex items-center justify-center h-full'>
                    <Typography color='text.disabled'>Henüz mesaj yok.</Typography>
                  </div>
                ) : (
                  gunGruplari.map(grup => (
                    <div key={grup.gun}>
                      {/* Gün ayracı */}
                      <div className='flex items-center gap-3 my-4'>
                        <Divider className='flex-1' />
                        <Typography variant='caption' color='text.disabled' className='shrink-0 px-2'>
                          {tarihYaz(grup.gun)}
                        </Typography>
                        <Divider className='flex-1' />
                      </div>

                      {grup.mesajlar.map(mesaj => {
                        const giden = mesaj.yon === 'giden'
                        const gonderen = mesaj.gonderenKullaniciId
                          ? kullaniciBul(mesaj.gonderenKullaniciId)
                          : null
                        const saat = mesaj.tarih.split('T')[1]

                        return (
                          <div
                            key={mesaj.id}
                            className={`flex mb-3 ${giden ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[75%] ${giden ? 'items-end' : 'items-start'} flex flex-col`}>
                              {/* Mimar adı (yalnızca giden) */}
                              {giden && gonderen && (
                                <Typography variant='caption' color='text.disabled' className='mb-0.5 px-1'>
                                  {gonderen.ad}
                                </Typography>
                              )}

                              {/* Balon */}
                              <Card
                                variant='outlined'
                                className={`px-4 py-2 ${
                                  giden
                                    ? 'bg-primary text-[var(--mui-palette-primary-contrastText)] border-primary rounded-s rounded-b'
                                    : 'bg-actionHover rounded-e rounded-b'
                                }`}
                                style={{ wordBreak: 'break-word' }}
                              >
                                <Typography variant='body2' color='inherit' style={{ whiteSpace: 'pre-wrap' }}>
                                  {mesaj.govde}
                                </Typography>
                              </Card>

                              {/* Saat + durum */}
                              <div
                                className={`flex items-center gap-1 mt-0.5 px-1 ${
                                  giden ? 'justify-end' : 'justify-start'
                                }`}
                              >
                                <Typography variant='caption' color='text.disabled'>
                                  {saat}
                                </Typography>
                                {giden && mesaj.durum && (
                                  <>
                                    {mesaj.durum === 'okundu' ? (
                                      <i className='tabler-checks text-success text-xs' />
                                    ) : mesaj.durum === 'iletildi' ? (
                                      <i className='tabler-checks text-textSecondary text-xs' />
                                    ) : (
                                      <i className='tabler-check text-textSecondary text-xs' />
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Yazma alanı */}
              <div className='p-3 border-t'>
                <div className='flex items-end gap-2'>
                  <CustomTextField
                    fullWidth
                    multiline
                    maxRows={4}
                    size='small'
                    placeholder='Mesajınızı yazın...'
                    value={mesajMetni}
                    onChange={olay => setMesajMetni(olay.target.value)}
                    onKeyDown={olay => {
                      if (olay.key === 'Enter' && !olay.shiftKey) {
                        olay.preventDefault()
                        mesajGonder()
                      }
                    }}
                  />
                  <Button
                    variant='contained'
                    onClick={mesajGonder}
                    disabled={!mesajMetni.trim()}
                    className='shrink-0'
                  >
                    <i className='tabler-send' />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className='flex items-center justify-center h-full p-6'
              style={{ minHeight: 300 }}
            >
              <div className='text-center'>
                <i className='tabler-brand-whatsapp text-5xl text-textDisabled mb-3' />
                <Typography color='text.disabled'>Görüntülemek için bir sohbet seçin</Typography>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default WhatsappEkrani
