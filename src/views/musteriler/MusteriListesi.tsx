'use client'

// React Imports
import { useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

// Third-party Imports
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import type { SortingState } from '@tanstack/react-table'

// Type Imports
import type { Musteri } from '@/types/musteriTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import RolSecici from '@components/RolSecici'

// Context Imports
import { useAktifKullanici } from '@/contexts/rolContext'

// Data Imports
import { musteriler } from '@/data/musteriler'
import { projeler } from '@/data/projeler'
import { iller, kaynakEtiketi, mimarlar, projeDurumEtiketi, projeDurumRenkleri } from '@/data/secenekler'

// Util Imports
import { paraYaz, telefonBicimle } from '@/utils/bicim'
import { fiyatGorebilir, gorunurMusteriler, musteriDuzenleyebilir, musteriEkleyebilir } from '@/utils/yetki'

type MusteriSatiri = Musteri & {
  projeSayisi: number
  sonDurum?: ReturnType<typeof projeDurumEtiketi>
  sonDurumKodu?: (typeof projeler)[number]['durum']
  toplamButce: number
  duzenlenebilir: boolean
}

const sutunYardimcisi = createColumnHelper<MusteriSatiri>()

const MusteriListesi = () => {
  // Context
  const { aktifKullanici } = useAktifKullanici()

  // States
  const [arama, setArama] = useState('')
  const [ilFiltresi, setIlFiltresi] = useState('')
  const [sadeceBenim, setSadeceBenim] = useState(false)
  const [siralama, setSiralama] = useState<SortingState>([])

  // Vars
  const fiyatAcik = fiyatGorebilir(aktifKullanici)
  const mimarMi = aktifKullanici.rol === 'mimar'

  const satirlar = useMemo<MusteriSatiri[]>(() => {
    const izinliler = gorunurMusteriler(aktifKullanici, musteriler, projeler)

    return izinliler
      .filter(musteri => (sadeceBenim && mimarMi ? musteri.sorumluMimarId === aktifKullanici.id : true))
      .filter(musteri => (ilFiltresi ? musteri.il === ilFiltresi : true))
      .map(musteri => {
        const kendiProjeleri = projeler.filter(proje => proje.musteriId === musteri.id)
        const sonProje = kendiProjeleri[kendiProjeleri.length - 1]

        return {
          ...musteri,
          projeSayisi: kendiProjeleri.length,
          sonDurum: sonProje ? projeDurumEtiketi(sonProje.durum) : undefined,
          sonDurumKodu: sonProje?.durum,
          toplamButce: kendiProjeleri.reduce((toplam, proje) => toplam + (proje.tahminiButce ?? 0), 0),
          duzenlenebilir: musteriDuzenleyebilir(aktifKullanici, musteri)
        }
      })
  }, [aktifKullanici, ilFiltresi, mimarMi, sadeceBenim])

  const sutunlar = useMemo(() => {
    const temel = [
      sutunYardimcisi.accessor('ad', {
        header: 'Müşteri',
        cell: bilgi => (
          <div className='flex flex-col'>
            <Typography
              component={Link}
              href={`/musteriler/${bilgi.row.original.id}`}
              color='primary.main'
              className='font-medium hover:underline'
            >
              {bilgi.getValue()}
            </Typography>
            <Typography variant='body2'>
              {bilgi.row.original.tip === 'kurumsal'
                ? (bilgi.row.original.yetkiliKisi ?? 'Kurumsal')
                : 'Bireysel'}
            </Typography>
          </div>
        )
      }),
      sutunYardimcisi.accessor('telefon', {
        header: 'Telefon',
        cell: bilgi => telefonBicimle(bilgi.getValue())
      }),
      sutunYardimcisi.accessor('il', {
        header: 'Konum',
        cell: bilgi => [bilgi.getValue(), bilgi.row.original.ilce].filter(Boolean).join(' / ') || '—'
      }),
      sutunYardimcisi.accessor('projeSayisi', {
        header: 'Proje',
        cell: bilgi => (
          <div className='flex items-center gap-2'>
            <Typography color='text.primary'>{bilgi.getValue()}</Typography>
            {bilgi.row.original.sonDurumKodu && (
              <Chip
                size='small'
                variant='tonal'
                label={bilgi.row.original.sonDurum}
                color={projeDurumRenkleri[bilgi.row.original.sonDurumKodu]}
              />
            )}
          </div>
        )
      }),
      sutunYardimcisi.accessor('sorumluMimarId', {
        header: 'Sorumlu Mimar',
        cell: bilgi => mimarlar.find(mimar => mimar.id === bilgi.getValue())?.ad ?? '—'
      }),
      sutunYardimcisi.accessor('kaynak', {
        header: 'Kaynak',
        cell: bilgi => {
          const kaynak = bilgi.getValue()

          return kaynak ? kaynakEtiketi(kaynak) : '—'
        }
      })
    ]

    // Fiyat sütunu üretim rollerine hiç render edilmez — gizlenmez, yok.
    if (fiyatAcik) {
      temel.push(
        sutunYardimcisi.accessor('toplamButce', {
          header: 'Toplam Bütçe',
          cell: bilgi => (bilgi.getValue() ? paraYaz(bilgi.getValue()) : '—')
        }) as (typeof temel)[number]
      )
    }

    temel.push(
      sutunYardimcisi.display({
        id: 'islem',
        header: 'İşlem',
        cell: bilgi =>
          bilgi.row.original.duzenlenebilir ? (
            <Tooltip title='Düzenle'>
              <IconButton size='small' component={Link} href={`/musteriler/${bilgi.row.original.id}`}>
                <i className='tabler-edit' />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title='Bu müşteri başka bir mimara ait; görüntüleyebilir, düzenleyemezsiniz.'>
              <IconButton size='small' component={Link} href={`/musteriler/${bilgi.row.original.id}`}>
                <i className='tabler-lock' />
              </IconButton>
            </Tooltip>
          )
      }) as (typeof temel)[number]
    )

    return temel
  }, [fiyatAcik])

  const tablo = useReactTable({
    data: satirlar,
    columns: sutunlar,
    state: { globalFilter: arama, sorting: siralama },
    onGlobalFilterChange: setArama,
    onSortingChange: setSiralama,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  })

  return (
    <div className='flex flex-col gap-6'>
      <RolSecici />

      <Card>
        <CardHeader
          title='Müşteriler'
          subheader={
            aktifKullanici.rol === 'atolye-yoneticisi'
              ? 'Yalnızca üretime devredilmiş işi olan müşteriler listelenir.'
              : `${satirlar.length} müşteri`
          }
          action={
            musteriEkleyebilir(aktifKullanici) && (
              <Button variant='contained' component={Link} href='/musteriler/yeni' startIcon={<i className='tabler-plus' />}>
                Yeni Müşteri
              </Button>
            )
          }
        />
        <CardContent className='flex flex-wrap items-end gap-4'>
          <CustomTextField
            value={arama}
            onChange={olay => setArama(olay.target.value)}
            placeholder='Ad, telefon, ilçe ara'
            className='min-is-[260px]'
          />
          <CustomTextField
            select
            label=''
            value={ilFiltresi}
            onChange={olay => setIlFiltresi(olay.target.value)}
            className='min-is-[180px]'
          >
            <MenuItem value=''>Tüm iller</MenuItem>
            {iller
              .filter(il => musteriler.some(musteri => musteri.il === il))
              .map(il => (
                <MenuItem key={il} value={il}>
                  {il}
                </MenuItem>
              ))}
          </CustomTextField>
          {mimarMi && (
            <FormControlLabel
              control={<Switch checked={sadeceBenim} onChange={olay => setSadeceBenim(olay.target.checked)} />}
              label='Sadece benim müşterilerim'
            />
          )}
        </CardContent>

        <TableContainer>
          <Table>
            <TableHead>
              {tablo.getHeaderGroups().map(baslikGrubu => (
                <TableRow key={baslikGrubu.id}>
                  {baslikGrubu.headers.map(baslik => (
                    <TableCell key={baslik.id}>
                      {baslik.column.getCanSort() ? (
                        <TableSortLabel
                          active={Boolean(baslik.column.getIsSorted())}
                          direction={baslik.column.getIsSorted() === 'desc' ? 'desc' : 'asc'}
                          onClick={baslik.column.getToggleSortingHandler()}
                        >
                          {flexRender(baslik.column.columnDef.header, baslik.getContext())}
                        </TableSortLabel>
                      ) : (
                        flexRender(baslik.column.columnDef.header, baslik.getContext())
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {tablo.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={sutunlar.length} align='center'>
                    <Typography className='plb-6'>Kayıt bulunamadı.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                tablo.getRowModel().rows.map(satir => (
                  <TableRow key={satir.id} hover>
                    {satir.getVisibleCells().map(hucre => (
                      <TableCell key={hucre.id}>{flexRender(hucre.column.columnDef.cell, hucre.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component='div'
          count={tablo.getFilteredRowModel().rows.length}
          page={tablo.getState().pagination.pageIndex}
          rowsPerPage={tablo.getState().pagination.pageSize}
          onPageChange={(_, sayfa) => tablo.setPageIndex(sayfa)}
          onRowsPerPageChange={olay => tablo.setPageSize(Number(olay.target.value))}
          rowsPerPageOptions={[10, 25, 50]}
          labelRowsPerPage='Sayfa başına'
          labelDisplayedRows={({ from, to, count }) => `${count} kayıttan ${from}–${to}`}
        />
      </Card>
    </div>
  )
}

export default MusteriListesi
