import { useEffect } from 'react'

export const useKeydown = (callback: () => void, eventKey: string) => {
  const keydownHandler = (evt: KeyboardEvent) => {
    if (evt.key === eventKey) {
      callback()
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', keydownHandler)
    return () => document.removeEventListener('keydown', keydownHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
