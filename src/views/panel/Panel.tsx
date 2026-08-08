'use client'

// React Imports
import { useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import RolSecici from '@components/RolSecici'
import AylikSatisGrafigi from './AylikSatisGrafigi'
import BekleyenTahsilatKarti from './BekleyenTahsilatKarti'
import EnCokIsYapanlar from './EnCokIsYapanlar'
import KaynakDagilimi from './KaynakDagilimi'
import MimarSiralamasi from './MimarSiralamasi'
import OzetKart from './OzetKart'
import PipelineDagilimi from './PipelineDagilimi'
import ProjeListeKarti from './ProjeListeKarti'
import UretimOzetiKarti from './UretimOzetiKarti'
import WhatsappRekabetKarti from './WhatsappRekabetKarti'
import YaklasanRandevularKarti from './YaklasanRandevularKarti'

// Context Imports
import { useAktifKullanici } from '@/contexts/rolContext'

// Data Imports
import { rolEtiketleri } from '@/data/kullanicilar'

// Util Imports
import { paraYaz } from '@/utils/bicim'
import { fiyatGorebilir, whatsappGorebilir } from '@/utils/yetki'
import {
  aktifProjeSayisi,
  aylikSatis,
  bekleyenTahsilatlar,
  bekleyenTahsilatToplami,
  buAyinSatisi,
  enCokIsYapanMusteriler,
  gecenAyinSatisi,
  gecikenTahsilatToplami,
  kaynakDagilimi,
  kullanicininProjeleri,
  mimarSatisSiralamasi,
  onaydaBekleyenProjeler,
  pipelineDagilimi,
  uretimOzeti,
  uretimdeMi,
  yaklasanRandevular,
  yeniTalepSayisi,
  yuzdeDegisim
} from '@/utils/ozet'
import { aylikCevapSiralamasi, ayAnahtari, cevapsizTalepAdedi, motivasyonMesaji } from '@/utils/whatsappOzet'

const Panel = () => {
  // Context
  const { aktifKullanici } = useAktifKullanici()

  // Vars
  const fiyatAcik = fiyatGorebilir(aktifKullanici)
  const uretimRolu = aktifKullanici.rol === 'atolye-yoneticisi'

  const ozet = useMemo(
    () => ({
      satisSerisi: aylikSatis(aktifKullanici),
      buAy: buAyinSatisi(aktifKullanici),
      gecenAy: gecenAyinSatisi(aktifKullanici),
      aktifProje: aktifProjeSayisi(aktifKullanici),
      yeniTalep: yeniTalepSayisi(aktifKullanici),
      tahsilatlar: bekleyenTahsilatlar(aktifKullanici),
      bekleyenTahsilat: bekleyenTahsilatToplami(aktifKullanici),
      gecikenTahsilat: gecikenTahsilatToplami(aktifKullanici),
      randevular: yaklasanRandevular(aktifKullanici),
      onayda: onaydaBekleyenProjeler(aktifKullanici),
      pipeline: pipelineDagilimi(aktifKullanici),
      uretim: uretimOzeti(aktifKullanici),
      kaynaklar: kaynakDagilimi(aktifKullanici),
      mimarlar: mimarSatisSiralamasi(aktifKullanici),
      enCokIs: enCokIsYapanMusteriler(aktifKullanici),
      uretimdekiler: kullanicininProjeleri(aktifKullanici).filter(proje => uretimdeMi(proje.durum))
    }),
    [aktifKullanici]
  )

  const ay = useMemo(() => ayAnahtari(new Date().toISOString()), [])
  const whatsappSiralama = useMemo(() => aylikCevapSiralamasi(ay), [ay])
  const whatsappCevapsiz = useMemo(() => cevapsizTalepAdedi(), [])
  const whatsappMotivasyon = useMemo(
    () => motivasyonMesaji(whatsappSiralama, aktifKullanici.id),
    [whatsappSiralama, aktifKullanici.id]
  )

  const karsilama = (
    <Card>
      <CardContent className='flex flex-wrap items-center justify-between gap-4'>
        <div className='flex flex-col gap-1'>
          <Typography variant='h5'>Merhaba {aktifKullanici.ad} 👋</Typography>
          <Typography>
            {rolEtiketleri[aktifKullanici.rol]} olarak bakıyorsunuz.
            {fiyatAcik
              ? ` Bu ay ${paraYaz(ozet.buAy)} satış yapıldı.`
              : ` Atölyede ${ozet.uretimdekiler.length} iş var.`}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )

  // ——— Üretim rolleri: para içeren hiçbir kart oluşturulmaz ———
  if (uretimRolu) {
    return (
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <RolSecici />
        </Grid>
        <Grid size={{ xs: 12 }}>{karsilama}</Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <OzetKart
            baslik='Atölyedeki İş'
            deger={String(ozet.uretimdekiler.length)}
            ikon='tabler-tools'
            renk='primary'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <OzetKart
            baslik='Hazırlanıyor'
            deger={String(ozet.uretim.find(satir => satir.durum === 'hazirlaniyor')?.adet ?? 0)}
            ikon='tabler-hammer'
            renk='warning'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <OzetKart
            baslik='Montaj Planlandı'
            deger={String(ozet.uretim.find(satir => satir.durum === 'montaj-planlandi')?.adet ?? 0)}
            ikon='tabler-calendar-check'
            renk='info'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <OzetKart
            baslik='Tamamlandı'
            deger={String(ozet.uretim.find(satir => satir.durum === 'tamamlandi')?.adet ?? 0)}
            ikon='tabler-circle-check'
            renk='success'
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <UretimOzetiKarti ozet={ozet.uretim} />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <YaklasanRandevularKarti randevular={ozet.randevular} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ProjeListeKarti
            baslik='Atölyedeki İşler'
            projeler={ozet.uretimdekiler}
            fiyatGoster={false}
            bosMetin='Atölyeye devredilmiş iş yok.'
            adet={8}
          />
        </Grid>
      </Grid>
    )
  }

  // ——— Yönetici ve mimar ———
  const mimarMi = aktifKullanici.rol === 'mimar'

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <RolSecici />
      </Grid>
      <Grid size={{ xs: 12 }}>{karsilama}</Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <OzetKart
          baslik='Aktif Proje'
          deger={String(ozet.aktifProje)}
          ikon='tabler-briefcase'
          renk='primary'
          altMetin='tamamlanmamış işler'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <OzetKart
          baslik='Yeni Talep'
          deger={String(ozet.yeniTalep)}
          ikon='tabler-inbox'
          renk='info'
          altMetin='henüz görüşülmedi'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <OzetKart
          baslik='Bu Ay Satış'
          deger={paraYaz(ozet.buAy)}
          ikon='tabler-chart-line'
          renk='success'
          degisim={yuzdeDegisim(ozet.buAy, ozet.gecenAy)}
          altMetin='geçen aya göre'
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <OzetKart
          baslik='Bekleyen Tahsilat'
          deger={paraYaz(ozet.bekleyenTahsilat)}
          ikon='tabler-cash'
          renk={ozet.gecikenTahsilat > 0 ? 'error' : 'warning'}
          altMetin={
            ozet.gecikenTahsilat > 0 ? `${paraYaz(ozet.gecikenTahsilat)} vadesi geçti` : 'vadesi geçen yok'
          }
        />
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        <AylikSatisGrafigi seri={ozet.satisSerisi} />
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <PipelineDagilimi dagilim={ozet.pipeline} />
      </Grid>

      <Grid size={{ xs: 12, lg: 7 }}>
        <BekleyenTahsilatKarti tahsilatlar={ozet.tahsilatlar} />
      </Grid>
      <Grid size={{ xs: 12, lg: 5 }}>
        <YaklasanRandevularKarti randevular={ozet.randevular} />
      </Grid>

      <Grid size={{ xs: 12, lg: 6 }}>
        <MimarSiralamasi
          siralama={ozet.mimarlar}
          vurgulananMimarId={mimarMi ? aktifKullanici.id : undefined}
          baslik={mimarMi ? 'Mimar Sıralaması' : 'En Çok Satış Yapan Mimarlar'}
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <EnCokIsYapanlar musteriler={ozet.enCokIs} fiyatGoster={fiyatAcik} />
      </Grid>

      {whatsappGorebilir(aktifKullanici) && (
        <Grid size={{ xs: 12, lg: 6 }}>
          <WhatsappRekabetKarti
            siralama={whatsappSiralama}
            cevapsizSayi={whatsappCevapsiz}
            motivasyon={whatsappMotivasyon}
            kullaniciId={aktifKullanici.id}
          />
        </Grid>
      )}

      <Grid size={{ xs: 12, lg: 6 }}>
        <ProjeListeKarti
          baslik='Onayda Bekleyen Projeler'
          altBaslik={`${ozet.onayda.length} teklif müşteride`}
          projeler={ozet.onayda}
          fiyatGoster={fiyatAcik}
          bosMetin='Onay bekleyen teklif yok.'
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <KaynakDagilimi dagilim={ozet.kaynaklar} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <UretimOzetiKarti ozet={ozet.uretim} />
      </Grid>
    </Grid>
  )
}

export default Panel
