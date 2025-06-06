import { useEffect, RefObject } from 'react'

type Evts = keyof DocumentEventMap

export const useOnDOMEvent = <T extends HTMLElement = HTMLElement>(
  refs: RefObject<T>[],
  evts: Evts[],
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const someEl = refs.some((item) => {
        const el = item?.current

        return !el || el.contains((event?.target as Node) || null)
      })

      if (someEl) {
        return
      }

      handler(event)
    }

    evts.forEach((evt) => {
      document.addEventListener(evt, listener)
    })

    return () => {
      evts.forEach((evt) => {
        document.removeEventListener(evt, listener)
      })
    }
  }, [refs, handler, evts])
}
