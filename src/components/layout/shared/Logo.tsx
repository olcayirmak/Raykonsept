'use client'

// Third-party Imports
import styled from '@emotion/styled'

// Type Imports
import type { VerticalNavContextProps } from '@menu/contexts/verticalNavContext'

// Component Imports
import LogoWordmark from '@core/svg/LogoWordmark'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'

type WrapperProps = {
  isCollapsed?: VerticalNavContextProps['isCollapsed']
  isHovered?: VerticalNavContextProps['isHovered']
  isBreakpointReached?: VerticalNavContextProps['isBreakpointReached']
  transitionDuration?: VerticalNavContextProps['transitionDuration']
}

// Wordmark tek parçadır: "RAYKONSEPT INTERIOR" yazısı SVG'nin içinde vektör olarak
// çizilidir, bu yüzden yanına amblem ya da metin konmaz.
// Daraltılmış menüde wordmark'ın tam boyu sığmaz; yükseklik küçültülerek sığdırılır.
const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  overflow: hidden;
  color: var(--mui-palette-text-primary);
  font-size: ${({ isCollapsed, isHovered, isBreakpointReached }) =>
    !isBreakpointReached && isCollapsed && !isHovered ? '12px' : '30px'};
  transition: ${({ transitionDuration }) => `font-size ${transitionDuration}ms ease-in-out`};
`

const Logo = () => {
  // Hooks
  const { isHovered, isCollapsed, isBreakpointReached, transitionDuration } = useVerticalNav()
  const { settings } = useSettings()

  return (
    <Wrapper
      isHovered={isHovered}
      isCollapsed={settings.layout === 'collapsed' || isCollapsed}
      isBreakpointReached={isBreakpointReached}
      transitionDuration={transitionDuration}
    >
      <LogoWordmark aria-label='Ray Konsept' role='img' />
    </Wrapper>
  )
}

export default Logo
