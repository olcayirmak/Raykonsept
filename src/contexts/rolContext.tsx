'use client'

// React Imports
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

// Type Imports
import type { Kullanici } from '@/types/rolTypes'

// Data Imports
import { kullanicilar } from '@/data/kullanicilar'

// Faz 1'de oturum yok. Demoda rol davranışını gösterebilmek için aktif kullanıcı
// elle seçiliyor. Faz 3'te bu sağlayıcının içi gerçek oturumla değişecek;
// useAktifKullanici çağıran ekranlar aynı kalacak.

const varsayilanKullanici = kullanicilar[0]

const depolamaAnahtari = 'raykonsept-aktif-kullanici'

type RolContextTipi = {
  aktifKullanici: Kullanici
  kullaniciDegistir: (id: string) => void
}

const RolContext = createContext<RolContextTipi>({
  aktifKullanici: varsayilanKullanici,
  kullaniciDegistir: () => {}
})

export const RolSaglayici = ({ children }: { children: ReactNode }) => {
  const [aktifKullanici, setAktifKullanici] = useState<Kullanici>(varsayilanKullanici)

  // Sunucu ve istemci ilk render'ı aynı olsun diye seçim mount sonrası okunuyor.
  useEffect(() => {
    const kayitliId = window.localStorage.getItem(depolamaAnahtari)
    const kayitli = kullanicilar.find(kullanici => kullanici.id === kayitliId)

    if (kayitli) setAktifKullanici(kayitli)
  }, [])

  const kullaniciDegistir = (id: string) => {
    const secilen = kullanicilar.find(kullanici => kullanici.id === id)

    if (!secilen) return

    setAktifKullanici(secilen)
    window.localStorage.setItem(depolamaAnahtari, secilen.id)
  }

  return <RolContext.Provider value={{ aktifKullanici, kullaniciDegistir }}>{children}</RolContext.Provider>
}

export const useAktifKullanici = () => useContext(RolContext)
