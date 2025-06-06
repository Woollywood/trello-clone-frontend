import { useRef, useEffect, useCallback } from 'react'
import { AnyFunc } from '@/types/main.d'
import { debounce, TDebouncedFunc } from '@/utils/helpers/debounce'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDebounce<T extends AnyFunc>(callback: T, wait: number) {
  const createDebouncedCallback = useCallback(
    (function_: T): TDebouncedFunc<T> => {
      return debounce(function_, wait)
    },
    [wait]
  )

  const debouncedCallbackRef = useRef<TDebouncedFunc<T>>(
    createDebouncedCallback(callback)
  )

  useEffect(() => {
    debouncedCallbackRef.current = createDebouncedCallback(callback)
  }, [callback, createDebouncedCallback])

  return debouncedCallbackRef.current
}

export { useDebounce }
