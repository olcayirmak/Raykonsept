// Faz 1 mock veri kaynağı. Ödeme planı: kapora / ara ödeme / son ödeme.

// Type Imports
import type { Odeme } from '@/types/odemeTypes'

export const odemeler: Odeme[] = [
  {
    id: 'ode-1',
    projeId: 'prj-1',
    tur: 'kapora',
    tutar: 181000,
    vadeTarihi: '2025-09-17',
    odemeTarihi: '2025-09-27'
  },
  {
    id: 'ode-2',
    projeId: 'prj-1',
    tur: 'ara-odeme',
    tutar: 242000,
    vadeTarihi: '2025-10-25',
    odemeTarihi: '2025-11-03'
  },
  {
    id: 'ode-3',
    projeId: 'prj-1',
    tur: 'son-odeme',
    tutar: 181000,
    vadeTarihi: '2025-12-09',
    odemeTarihi: '2025-12-09'
  },
  {
    id: 'ode-4',
    projeId: 'prj-2',
    tur: 'kapora',
    tutar: 40000,
    vadeTarihi: '2025-10-01',
    odemeTarihi: '2025-09-28'
  },
  {
    id: 'ode-5',
    projeId: 'prj-2',
    tur: 'ara-odeme',
    tutar: 54000,
    vadeTarihi: '2025-11-08'
  },
  {
    id: 'ode-6',
    projeId: 'prj-2',
    tur: 'son-odeme',
    tutar: 40000,
    vadeTarihi: '2025-12-23'
  },
  {
    id: 'ode-7',
    projeId: 'prj-3',
    tur: 'kapora',
    tutar: 51000,
    vadeTarihi: '2025-09-29',
    odemeTarihi: '2025-09-30'
  },
  {
    id: 'ode-8',
    projeId: 'prj-3',
    tur: 'ara-odeme',
    tutar: 69000,
    vadeTarihi: '2025-11-06'
  },
  {
    id: 'ode-9',
    projeId: 'prj-3',
    tur: 'son-odeme',
    tutar: 51000,
    vadeTarihi: '2025-12-21'
  },
  {
    id: 'ode-10',
    projeId: 'prj-4',
    tur: 'kapora',
    tutar: 145000,
    vadeTarihi: '2025-10-02',
    odemeTarihi: '2025-10-03'
  },
  {
    id: 'ode-11',
    projeId: 'prj-4',
    tur: 'ara-odeme',
    tutar: 194000,
    vadeTarihi: '2025-11-09',
    odemeTarihi: '2025-11-11'
  },
  {
    id: 'ode-12',
    projeId: 'prj-4',
    tur: 'son-odeme',
    tutar: 145000,
    vadeTarihi: '2025-12-24',
    odemeTarihi: '2026-01-02'
  },
  {
    id: 'ode-13',
    projeId: 'prj-5',
    tur: 'kapora',
    tutar: 98000,
    vadeTarihi: '2025-10-17',
    odemeTarihi: '2025-10-19'
  },
  {
    id: 'ode-14',
    projeId: 'prj-5',
    tur: 'ara-odeme',
    tutar: 130000,
    vadeTarihi: '2025-11-24',
    odemeTarihi: '2025-11-21'
  },
  {
    id: 'ode-15',
    projeId: 'prj-5',
    tur: 'son-odeme',
    tutar: 98000,
    vadeTarihi: '2026-01-08',
    odemeTarihi: '2026-01-11'
  },
  {
    id: 'ode-16',
    projeId: 'prj-6',
    tur: 'kapora',
    tutar: 324000,
    vadeTarihi: '2025-10-10',
    odemeTarihi: '2025-10-11'
  },
  {
    id: 'ode-17',
    projeId: 'prj-6',
    tur: 'ara-odeme',
    tutar: 432000,
    vadeTarihi: '2025-11-17'
  },
  {
    id: 'ode-18',
    projeId: 'prj-6',
    tur: 'son-odeme',
    tutar: 324000,
    vadeTarihi: '2026-01-01',
    odemeTarihi: '2026-01-02'
  },
  {
    id: 'ode-19',
    projeId: 'prj-7',
    tur: 'kapora',
    tutar: 125000,
    vadeTarihi: '2025-10-29',
    odemeTarihi: '2025-10-31'
  },
  {
    id: 'ode-20',
    projeId: 'prj-7',
    tur: 'ara-odeme',
    tutar: 167000,
    vadeTarihi: '2025-12-06'
  },
  {
    id: 'ode-21',
    projeId: 'prj-7',
    tur: 'son-odeme',
    tutar: 125000,
    vadeTarihi: '2026-01-20',
    odemeTarihi: '2026-02-01'
  },
  {
    id: 'ode-22',
    projeId: 'prj-8',
    tur: 'kapora',
    tutar: 80000,
    vadeTarihi: '2025-10-24',
    odemeTarihi: '2025-10-30'
  },
  {
    id: 'ode-23',
    projeId: 'prj-8',
    tur: 'ara-odeme',
    tutar: 107000,
    vadeTarihi: '2025-12-01',
    odemeTarihi: '2025-12-02'
  },
  {
    id: 'ode-24',
    projeId: 'prj-8',
    tur: 'son-odeme',
    tutar: 80000,
    vadeTarihi: '2026-01-15'
  },
  {
    id: 'ode-25',
    projeId: 'prj-9',
    tur: 'kapora',
    tutar: 63000,
    vadeTarihi: '2025-11-20',
    odemeTarihi: '2025-11-29'
  },
  {
    id: 'ode-26',
    projeId: 'prj-9',
    tur: 'ara-odeme',
    tutar: 84000,
    vadeTarihi: '2025-12-28'
  },
  {
    id: 'ode-27',
    projeId: 'prj-9',
    tur: 'son-odeme',
    tutar: 63000,
    vadeTarihi: '2026-02-11',
    odemeTarihi: '2026-02-21'
  },
  {
    id: 'ode-28',
    projeId: 'prj-10',
    tur: 'kapora',
    tutar: 424000,
    vadeTarihi: '2025-11-29'
  },
  {
    id: 'ode-29',
    projeId: 'prj-10',
    tur: 'ara-odeme',
    tutar: 566000,
    vadeTarihi: '2026-01-06',
    odemeTarihi: '2026-01-11'
  },
  {
    id: 'ode-30',
    projeId: 'prj-10',
    tur: 'son-odeme',
    tutar: 424000,
    vadeTarihi: '2026-02-20',
    odemeTarihi: '2026-03-02'
  },
  {
    id: 'ode-31',
    projeId: 'prj-11',
    tur: 'kapora',
    tutar: 88000,
    vadeTarihi: '2026-01-03',
    odemeTarihi: '2026-01-05'
  },
  {
    id: 'ode-32',
    projeId: 'prj-11',
    tur: 'ara-odeme',
    tutar: 117000,
    vadeTarihi: '2026-02-10',
    odemeTarihi: '2026-02-22'
  },
  {
    id: 'ode-33',
    projeId: 'prj-11',
    tur: 'son-odeme',
    tutar: 88000,
    vadeTarihi: '2026-03-27',
    odemeTarihi: '2026-03-28'
  },
  {
    id: 'ode-34',
    projeId: 'prj-12',
    tur: 'kapora',
    tutar: 41000,
    vadeTarihi: '2025-12-19',
    odemeTarihi: '2025-12-31'
  },
  {
    id: 'ode-35',
    projeId: 'prj-12',
    tur: 'ara-odeme',
    tutar: 55000,
    vadeTarihi: '2026-01-26',
    odemeTarihi: '2026-02-06'
  },
  {
    id: 'ode-36',
    projeId: 'prj-12',
    tur: 'son-odeme',
    tutar: 41000,
    vadeTarihi: '2026-03-12'
  },
  {
    id: 'ode-37',
    projeId: 'prj-13',
    tur: 'kapora',
    tutar: 42000,
    vadeTarihi: '2025-12-13',
    odemeTarihi: '2025-12-22'
  },
  {
    id: 'ode-38',
    projeId: 'prj-13',
    tur: 'ara-odeme',
    tutar: 56000,
    vadeTarihi: '2026-01-20',
    odemeTarihi: '2026-01-31'
  },
  {
    id: 'ode-39',
    projeId: 'prj-13',
    tur: 'son-odeme',
    tutar: 42000,
    vadeTarihi: '2026-03-06',
    odemeTarihi: '2026-03-12'
  },
  {
    id: 'ode-40',
    projeId: 'prj-14',
    tur: 'kapora',
    tutar: 400000,
    vadeTarihi: '2026-01-21',
    odemeTarihi: '2026-01-24'
  },
  {
    id: 'ode-41',
    projeId: 'prj-14',
    tur: 'ara-odeme',
    tutar: 534000,
    vadeTarihi: '2026-02-28'
  },
  {
    id: 'ode-42',
    projeId: 'prj-14',
    tur: 'son-odeme',
    tutar: 400000,
    vadeTarihi: '2026-04-14',
    odemeTarihi: '2026-04-20'
  },
  {
    id: 'ode-43',
    projeId: 'prj-15',
    tur: 'kapora',
    tutar: 788000,
    vadeTarihi: '2026-01-27',
    odemeTarihi: '2026-02-01'
  },
  {
    id: 'ode-44',
    projeId: 'prj-15',
    tur: 'ara-odeme',
    tutar: 1051000,
    vadeTarihi: '2026-03-06'
  },
  {
    id: 'ode-45',
    projeId: 'prj-15',
    tur: 'son-odeme',
    tutar: 788000,
    vadeTarihi: '2026-04-20',
    odemeTarihi: '2026-04-17'
  },
  {
    id: 'ode-46',
    projeId: 'prj-16',
    tur: 'kapora',
    tutar: 55000,
    vadeTarihi: '2026-03-06',
    odemeTarihi: '2026-03-10'
  },
  {
    id: 'ode-47',
    projeId: 'prj-16',
    tur: 'ara-odeme',
    tutar: 74000,
    vadeTarihi: '2026-04-13',
    odemeTarihi: '2026-04-17'
  },
  {
    id: 'ode-48',
    projeId: 'prj-16',
    tur: 'son-odeme',
    tutar: 55000,
    vadeTarihi: '2026-05-28'
  },
  {
    id: 'ode-49',
    projeId: 'prj-17',
    tur: 'kapora',
    tutar: 154000,
    vadeTarihi: '2026-03-04',
    odemeTarihi: '2026-03-08'
  },
  {
    id: 'ode-50',
    projeId: 'prj-17',
    tur: 'ara-odeme',
    tutar: 205000,
    vadeTarihi: '2026-04-11',
    odemeTarihi: '2026-04-22'
  },
  {
    id: 'ode-51',
    projeId: 'prj-17',
    tur: 'son-odeme',
    tutar: 154000,
    vadeTarihi: '2026-05-26'
  },
  {
    id: 'ode-52',
    projeId: 'prj-18',
    tur: 'kapora',
    tutar: 58000,
    vadeTarihi: '2026-02-10',
    odemeTarihi: '2026-02-17'
  },
  {
    id: 'ode-53',
    projeId: 'prj-18',
    tur: 'ara-odeme',
    tutar: 77000,
    vadeTarihi: '2026-03-20',
    odemeTarihi: '2026-03-22'
  },
  {
    id: 'ode-54',
    projeId: 'prj-18',
    tur: 'son-odeme',
    tutar: 58000,
    vadeTarihi: '2026-05-04'
  },
  {
    id: 'ode-55',
    projeId: 'prj-19',
    tur: 'kapora',
    tutar: 646000,
    vadeTarihi: '2026-03-14'
  },
  {
    id: 'ode-56',
    projeId: 'prj-19',
    tur: 'ara-odeme',
    tutar: 862000,
    vadeTarihi: '2026-04-21',
    odemeTarihi: '2026-04-23'
  },
  {
    id: 'ode-57',
    projeId: 'prj-19',
    tur: 'son-odeme',
    tutar: 646000,
    vadeTarihi: '2026-06-05',
    odemeTarihi: '2026-06-14'
  },
  {
    id: 'ode-58',
    projeId: 'prj-20',
    tur: 'kapora',
    tutar: 52000,
    vadeTarihi: '2026-04-02',
    odemeTarihi: '2026-04-10'
  },
  {
    id: 'ode-59',
    projeId: 'prj-20',
    tur: 'ara-odeme',
    tutar: 70000,
    vadeTarihi: '2026-05-10',
    odemeTarihi: '2026-05-11'
  },
  {
    id: 'ode-60',
    projeId: 'prj-20',
    tur: 'son-odeme',
    tutar: 52000,
    vadeTarihi: '2026-06-24',
    odemeTarihi: '2026-06-27'
  },
  {
    id: 'ode-61',
    projeId: 'prj-21',
    tur: 'kapora',
    tutar: 83000,
    vadeTarihi: '2026-04-22',
    odemeTarihi: '2026-05-04'
  },
  {
    id: 'ode-62',
    projeId: 'prj-21',
    tur: 'ara-odeme',
    tutar: 110000,
    vadeTarihi: '2026-05-30',
    odemeTarihi: '2026-05-28'
  },
  {
    id: 'ode-63',
    projeId: 'prj-21',
    tur: 'son-odeme',
    tutar: 83000,
    vadeTarihi: '2026-07-14',
    odemeTarihi: '2026-07-14'
  },
  {
    id: 'ode-64',
    projeId: 'prj-22',
    tur: 'kapora',
    tutar: 41000,
    vadeTarihi: '2026-04-14',
    odemeTarihi: '2026-04-13'
  },
  {
    id: 'ode-65',
    projeId: 'prj-22',
    tur: 'ara-odeme',
    tutar: 55000,
    vadeTarihi: '2026-05-22'
  },
  {
    id: 'ode-66',
    projeId: 'prj-22',
    tur: 'son-odeme',
    tutar: 41000,
    vadeTarihi: '2026-07-06',
    odemeTarihi: '2026-07-14'
  },
  {
    id: 'ode-67',
    projeId: 'prj-23',
    tur: 'kapora',
    tutar: 426000,
    vadeTarihi: '2026-05-19',
    odemeTarihi: '2026-05-26'
  },
  {
    id: 'ode-68',
    projeId: 'prj-23',
    tur: 'ara-odeme',
    tutar: 568000,
    vadeTarihi: '2026-06-26',
    odemeTarihi: '2026-07-04'
  },
  {
    id: 'ode-69',
    projeId: 'prj-23',
    tur: 'son-odeme',
    tutar: 426000,
    vadeTarihi: '2026-08-10'
  },
  {
    id: 'ode-70',
    projeId: 'prj-25',
    tur: 'kapora',
    tutar: 401000,
    vadeTarihi: '2026-05-30',
    odemeTarihi: '2026-06-10'
  },
  {
    id: 'ode-71',
    projeId: 'prj-25',
    tur: 'ara-odeme',
    tutar: 535000,
    vadeTarihi: '2026-07-07'
  },
  {
    id: 'ode-72',
    projeId: 'prj-25',
    tur: 'son-odeme',
    tutar: 401000,
    vadeTarihi: '2026-08-21'
  },
  {
    id: 'ode-73',
    projeId: 'prj-26',
    tur: 'kapora',
    tutar: 321000,
    vadeTarihi: '2026-05-27',
    odemeTarihi: '2026-05-28'
  },
  {
    id: 'ode-74',
    projeId: 'prj-26',
    tur: 'ara-odeme',
    tutar: 429000,
    vadeTarihi: '2026-07-04'
  },
  {
    id: 'ode-75',
    projeId: 'prj-26',
    tur: 'son-odeme',
    tutar: 321000,
    vadeTarihi: '2026-08-18'
  },
  {
    id: 'ode-76',
    projeId: 'prj-27',
    tur: 'kapora',
    tutar: 110000,
    vadeTarihi: '2026-06-11',
    odemeTarihi: '2026-06-09'
  },
  {
    id: 'ode-77',
    projeId: 'prj-27',
    tur: 'ara-odeme',
    tutar: 146000,
    vadeTarihi: '2026-07-19',
    odemeTarihi: '2026-07-19'
  },
  {
    id: 'ode-78',
    projeId: 'prj-27',
    tur: 'son-odeme',
    tutar: 110000,
    vadeTarihi: '2026-09-02'
  },
  {
    id: 'ode-79',
    projeId: 'prj-28',
    tur: 'kapora',
    tutar: 276000,
    vadeTarihi: '2026-06-30'
  },
  {
    id: 'ode-80',
    projeId: 'prj-28',
    tur: 'ara-odeme',
    tutar: 368000,
    vadeTarihi: '2026-08-07'
  },
  {
    id: 'ode-81',
    projeId: 'prj-28',
    tur: 'son-odeme',
    tutar: 276000,
    vadeTarihi: '2026-09-21',
    odemeTarihi: '2026-08-03'
  },
  {
    id: 'ode-82',
    projeId: 'prj-29',
    tur: 'kapora',
    tutar: 61000,
    vadeTarihi: '2026-07-12',
    odemeTarihi: '2026-07-24'
  },
  {
    id: 'ode-83',
    projeId: 'prj-29',
    tur: 'ara-odeme',
    tutar: 82000,
    vadeTarihi: '2026-08-19'
  },
  {
    id: 'ode-84',
    projeId: 'prj-29',
    tur: 'son-odeme',
    tutar: 61000,
    vadeTarihi: '2026-10-03',
    odemeTarihi: '2026-08-02'
  },
  {
    id: 'ode-85',
    projeId: 'prj-30',
    tur: 'kapora',
    tutar: 34000,
    vadeTarihi: '2026-08-04'
  },
  {
    id: 'ode-86',
    projeId: 'prj-30',
    tur: 'ara-odeme',
    tutar: 45000,
    vadeTarihi: '2026-09-11'
  },
  {
    id: 'ode-87',
    projeId: 'prj-30',
    tur: 'son-odeme',
    tutar: 34000,
    vadeTarihi: '2026-10-26'
  },
  {
    id: 'ode-88',
    projeId: 'prj-31',
    tur: 'kapora',
    tutar: 98000,
    vadeTarihi: '2026-07-14',
    odemeTarihi: '2026-07-23'
  },
  {
    id: 'ode-89',
    projeId: 'prj-31',
    tur: 'ara-odeme',
    tutar: 130000,
    vadeTarihi: '2026-08-21'
  },
  {
    id: 'ode-90',
    projeId: 'prj-31',
    tur: 'son-odeme',
    tutar: 98000,
    vadeTarihi: '2026-10-05'
  },
  {
    id: 'ode-91',
    projeId: 'prj-41',
    tur: 'kapora',
    tutar: 41000,
    vadeTarihi: '2026-08-11'
  },
  {
    id: 'ode-92',
    projeId: 'prj-41',
    tur: 'ara-odeme',
    tutar: 55000,
    vadeTarihi: '2026-09-18'
  },
  {
    id: 'ode-93',
    projeId: 'prj-41',
    tur: 'son-odeme',
    tutar: 41000,
    vadeTarihi: '2026-11-02',
    odemeTarihi: '2026-08-05'
  },
  {
    id: 'ode-94',
    projeId: 'prj-42',
    tur: 'kapora',
    tutar: 227000,
    vadeTarihi: '2026-08-12'
  },
  {
    id: 'ode-95',
    projeId: 'prj-42',
    tur: 'ara-odeme',
    tutar: 302000,
    vadeTarihi: '2026-09-19',
    odemeTarihi: '2026-08-03'
  },
  {
    id: 'ode-96',
    projeId: 'prj-42',
    tur: 'son-odeme',
    tutar: 227000,
    vadeTarihi: '2026-11-03'
  }
]

export const projeninOdemeleri = (projeId: string) =>
  odemeler.filter(odeme => odeme.projeId === projeId)

export const odemeEkle = (yeni: Omit<Odeme, 'id'>) => {
  const odeme: Odeme = { ...yeni, id: `ode-${odemeler.length + 1}` }

  odemeler.push(odeme)

  return odeme
}
