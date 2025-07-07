import { useEffect } from 'react'

export const usePreventScrollRestoration = (disabled?: boolean) => {
  useEffect(() => {
    if (window) {
      window.history.scrollRestoration = disabled ? 'manual' : 'auto'
    }
  }, [disabled])
}
