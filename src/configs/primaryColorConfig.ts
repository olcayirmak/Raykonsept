export type PrimaryColorConfig = {
  name?: string
  light?: string
  main: string
  dark?: string
}

// Ray Konsept marka paleti. İlk kayıt varsayılan ana renktir (altın sarısı).
// Diğerleri tema özelleştiricideki alternatifler; hepsi siyah/gri/bej ekseninde tutuldu.
const primaryColorConfig: PrimaryColorConfig[] = [
  {
    name: 'primary-1',
    light: '#D6B672',
    main: '#C79E44',
    dark: '#A17B2C'
  },
  {
    name: 'primary-2',
    light: '#E3DCD7',
    main: '#D7CCC5',
    dark: '#B3A49B'
  },
  {
    name: 'primary-3',
    light: '#6C757D',
    main: '#495057',
    dark: '#343A40'
  },
  {
    name: 'primary-4',
    light: '#3A3A3A',
    main: '#1A1A1A',
    dark: '#000000'
  },
  {
    name: 'primary-5',
    light: '#B08D6B',
    main: '#8C6B4A',
    dark: '#664D34'
  }
]

export default primaryColorConfig
