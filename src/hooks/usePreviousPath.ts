import { useRouter } from 'next/router'
import { useEffect } from 'react'

const DEFAULT_PREV_URL = '/'
const keys = {
  prevPath: 'prevPath',
  currentPath: 'currentPath',
}

// если нужна полная альтернатива window.history.back() - нужно сохранять всю историю
export const usePreviousPath = () => {
  const router = useRouter()
  useEffect(() => {
    return storePathValues
  }, [router.asPath])
  useEffect(() => {
    const prevPath = getAppPrevPath()
    if (!prevPath) {
      storePathValues()
    }
  }, [])
  function storePathValues() {
    const storage = globalThis?.sessionStorage
    if (!storage) return
    const pathname = globalThis.location.pathname
    const prevPath = storage.getItem(keys.currentPath)
    if (pathname === prevPath && prevPath !== undefined) {
      return
    }
    storage.setItem(keys.prevPath, prevPath || DEFAULT_PREV_URL)
    storage.setItem(keys.currentPath, pathname)
  }
}

export const getAppPrevPath = () => {
  const storage = globalThis?.sessionStorage
  if (!storage) return
  return storage.getItem(keys.prevPath)
}
