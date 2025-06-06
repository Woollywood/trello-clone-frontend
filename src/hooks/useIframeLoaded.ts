import { useState, useEffect } from 'react'

interface UseIframeLoadedProps {
  src: string
}

export const useIframeLoaded = ({ src }: UseIframeLoadedProps) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const iframe = document.createElement('iframe')
    iframe.src = src
    iframe.style.display = 'none'

    const handleLoad = () => setLoaded(true)
    iframe.addEventListener('load', handleLoad)

    document.body.appendChild(iframe)

    return () => {
      iframe.removeEventListener('load', handleLoad)
      document.body.removeChild(iframe)
    }
  }, [src])

  return loaded
}
