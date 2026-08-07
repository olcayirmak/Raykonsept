// React Imports
import type { SVGAttributes } from 'react'

// Ray Konsept "R" amblemi. Kaynak: public/images/logo/logo-icon-light.svg
// Renk currentColor ile geldiği için açık/koyu temada ayrı dosya gerekmiyor.
const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width='0.8133em' height='1em' viewBox='0 0 510.01 627.13' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M468,363.9Q510,305.88,510,231.33q0-98.76-70.65-165T249.69,0H0V36.78H258.43q91.95,0,151.46,56.16t59.48,138.39q0,81.28-59.95,137.44T257.48,424.86H38.75V214.71H0V627.13H38.75V461.65H181q104.46,0,128.71-3.87L457.78,627.13H510l-159.66-181Q425.85,422.05,468,363.9Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default Logo
