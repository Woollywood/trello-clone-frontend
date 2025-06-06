import { isBrowser } from '../constants'

/**
 *
 * @returns позволяет получить объект MediaQueryList, который представляет текущую ориентацию экрана пользовател, если окружение является браузером
 */
export function getScreenOrientation(): MediaQueryList | null {
  if (isBrowser) {
    const screenOrientation = window.matchMedia('(orientation: landscape)')
    return screenOrientation
  }

  return null
}
