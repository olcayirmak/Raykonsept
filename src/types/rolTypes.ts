export type Rol = 'yonetici' | 'mimar' | 'atolye-yoneticisi' | 'usta'

export type Kullanici = {
  id: string
  ad: string
  rol: Rol
}
