// Ustalar sistemi kullanmıyor: atölye yöneticisi işi alır, A4 çıktı ya da sözlü
// olarak dağıtır. Bu yüzden 'usta' diye bir rol yok.
export type Rol = 'yonetici' | 'mimar' | 'atolye-yoneticisi'

export type Kullanici = {
  id: string
  ad: string
  rol: Rol
}
