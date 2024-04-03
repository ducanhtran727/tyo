"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"

export const ScreenSizeContext = React.createContext<any>(null)

const isServer = typeof window === "undefined"

const ScreenSizeContextProVider: React.FC<any> = ({ children }) => {
  const [deviceDetect, setDeviceDetect] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
  })

  const [screenSize, setScreenSize] = useState({
    width: isServer ? null : window.innerWidth,
    height: isServer ? null : window.innerHeight,
  })

  const [deviceMobileTablet, setDeviceMobileTablet] = useState(false)
  const [iosDevice, setIosDevice] = useState(false)

  const handleResize = useCallback(() => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    if (window.innerWidth < 576) {
      setDeviceDetect({
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isLargeDesktop: false,
      })
    } else if (window.innerWidth >= 567 && window.innerWidth < 992) {
      setDeviceDetect({
        isMobile: false,
        isTablet: true,
        isDesktop: false,
        isLargeDesktop: false,
      })
    } else if (window.innerWidth >= 992 && window.innerWidth < 1600) {
      setDeviceDetect({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isLargeDesktop: false,
      })
    } else if (window.innerWidth >= 1600) {
      setDeviceDetect({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        isLargeDesktop: true,
      })
    }
  }, [])

  useEffect(() => {
    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [handleResize])
  return (
    <ScreenSizeContext.Provider
      value={{ ...screenSize, ...deviceDetect, deviceMobileTablet, iosDevice }}
    >
      {children}
    </ScreenSizeContext.Provider>
  )
}
export default ScreenSizeContextProVider
