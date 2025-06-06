import { RefObject, useEffect, useState } from 'react'

export default function useOnScreen<T>(ref: RefObject<T>) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      )
      observer.observe(ref.current as unknown as Element)
      return () => {
        observer.disconnect()
      }
    }
  }, [ref])

  return isIntersecting
}
