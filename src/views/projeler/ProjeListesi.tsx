'use client'

// React Imports
import { useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
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
import type { Proje, ProjeDurumu } from '@/types/musteriTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import RolSecici from '@components/RolSecici'

// Context Imports
import { useAktifKullanici } from '@/contexts/rolContext'

// Data Imports
import { musteriler } from '@/data/musteriler'
import {
  isTuruEtiketi,
  mimarlar,
  projeDurumEtiketi,
  projeDurumRenkleri,
  projeDurumlari
} from '@/data/secenekler'

// Util Imports
import { kisaTarihYaz, paraYaz } from '@/utils/bicim'
import { kullanicininProjeleri } from '@/utils/ozet'
import { fiyatGorebilir } from '@/utils/yetki'

type ProjeSatiri = Proje & { musteriAdi: string; mimarAdi: string }

const sutunYardimcisi = createColumnHelper<ProjeSatiri>()

const ProjeListesi = () => {
  // Context
  const { aktifKullanici } = useAktifKullanici()

  // States
  const [arama, setArama] = useState('')
  const [durumFiltresi, setDurumFiltresi] = useState<ProjeDurumu | ''>('')
  const [siralama, setSiralama] = useState<SortingState>([{ id: 'olusturmaTarihi', desc: true }])

  // Vars
  const fiyatAcik = fiyatGorebilir(aktifKullanici)

  const satirlar = useMemo<ProjeSatiri[]>(
    () =>
      kullanicininProjeleri(aktifKullanici)
        .filter(proje => (durumFiltresi ? proje.durum === durumFiltresi : true))
        .map(proje => ({
          ...proje,
          musteriAdi: musteriler.find(musteri => musteri.id === proje.musteriId)?.ad ?? '—',
          mimarAdi: mimarlar.find(mimar => mimar.id === proje.mimarId)?.ad ?? '—'
        })),
    [aktifKullanici, durumFiltresi]
  )

  const sutunlar = useMemo(() => {
    const temel = [
      sutunYardimcisi.accessor('musteriAdi', {
        header: 'Müşteri',
        cell: bilgi => (
          <div className='flex flex-col'>
            <Typography
              component={Link}
              href={`/musteriler/${bilgi.row.original.musteriId}`}
              color='primary.main'
              className='font-medium hover:underline'
            >
              {bilgi.getValue()}
            </Typography>
            <Typography
              variant='body2'
              component={Link}
              href={`/projeler/${bilgi.row.original.id}`}
              color='text.secondary'
              className='hover:underline'
            >
              {bilgi.row.original.isTurleri.map(isTuruEtiketi).join(', ') || '—'}
            </Typography>
          </div>
        )
      }),
      sutunYardimcisi.accessor('durum', {
        header: 'Durum',
        cell: bilgi => (
          <Chip
            size='small'
            variant='tonal'
            label={projeDurumEtiketi(bilgi.getValue())}
            color={projeDurumRenkleri[bilgi.getValue()]}
          />
        )
      }),
      sutunYardimcisi.accessor('mekanTipi', {
        header: 'Mekân',
        cell: bilgi => bilgi.getValue() ?? '—'
      }),
      sutunYardimcisi.accessor('mimarAdi', { header: 'Mimar' }),
      sutunYardimcisi.accessor('olusturmaTarihi', {
        header: 'Açılış',
        cell: bilgi => kisaTarihYaz(bilgi.getValue())
      }),
      sutunYardimcisi.accessor('istenenTeslim', {
        header: 'İstenen Teslim',
        cell: bilgi => (bilgi.getValue() ? kisaTarihYaz(bilgi.getValue()!) : '—')
      })
    ]

    // Fiyat sütunu üretim rollerinde hiç oluşturulmaz.
    if (fiyatAcik) {
      temel.splice(
        2,
        0,
        sutunYardimcisi.accessor('sozlesmeTutari', {
          header: 'Tutar',
          cell: bilgi => {
            const proje = bilgi.row.original

            return proje.sozlesmeTutari ? (
              <Typography color='text.primary' className='font-medium'>
                {paraYaz(proje.sozlesmeTutari)}
              </Typography>
            ) : (
              <Typography variant='body2'>
                {proje.tahminiButce ? `~${paraYaz(proje.tahminiButce)}` : '—'}
              </Typography>
            )
          }
        }) as (typeof temel)[number]
      )
    }

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
          title='Projeler'
          subheader={
            aktifKullanici.rol === 'atolye-yoneticisi' || aktifKullanici.rol === 'usta'
              ? 'Yalnızca üretime devredilmiş işler listelenir.'
              : `${satirlar.length} proje`
          }
        />
        <CardContent className='flex flex-wrap items-end gap-4'>
          <CustomTextField
            value={arama}
            onChange={olay => setArama(olay.target.value)}
            placeholder='Müşteri, mimar, iş türü ara'
            className='min-is-[260px]'
          />
          <CustomTextField
            select
            value={durumFiltresi}
            onChange={olay => setDurumFiltresi(olay.target.value as ProjeDurumu | '')}
            className='min-is-[200px]'
          >
            <MenuItem value=''>Tüm durumlar</MenuItem>
            {projeDurumlari.map(secenek => (
              <MenuItem key={secenek.deger} value={secenek.deger}>
                {secenek.etiket}
              </MenuItem>
            ))}
          </CustomTextField>
        </CardContent>

        <TableContainer>
          <Table>
            <TableHead>
              {tablo.getHeaderGroups().map(baslikGrubu => (
                <TableRow key={baslikGrubu.id}>
                  {baslikGrubu.headers.map(baslik => (
                    <TableCell key={baslik.id}>
                      <TableSortLabel
                        active={Boolean(baslik.column.getIsSorted())}
                        direction={baslik.column.getIsSorted() === 'desc' ? 'desc' : 'asc'}
                        onClick={baslik.column.getToggleSortingHandler()}
                      >
                        {flexRender(baslik.column.columnDef.header, baslik.getContext())}
                      </TableSortLabel>
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

export default ProjeListesi
