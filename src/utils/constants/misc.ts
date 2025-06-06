export const isBrowser =
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  typeof document !== 'undefined'

export const isIosDevice =
  isBrowser &&
  window.navigator &&
  (/iP(ad|hone|od)/.test(window.navigator.userAgent) ||
    (window.navigator.userAgent === 'MacIntel' &&
      window.navigator.maxTouchPoints > 1))
