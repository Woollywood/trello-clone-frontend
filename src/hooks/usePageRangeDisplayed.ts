import { useEffect, useState } from 'react'

export const usePageRangeDisplayed = () => {
  const [windowWithd, setWindowWithd] = useState(0)

  useEffect(() => {
    function updateSize() {
      setWindowWithd(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  if (windowWithd < 768) {
    return 1
  }
  return 3
}
