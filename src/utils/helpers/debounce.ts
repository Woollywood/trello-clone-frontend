// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunc = (...args: any[]) => any
interface DebounceMethods {
  cancel: () => void
}

/**
 *
 * @param func функция
 * @param wait время задержки ms
 * @returns вернет функционал который будет выполняться с указанной задержкой
 * @description функция декоратор для оптимизации, позволяет делать паузы при выполнении функций
 */
export const debounce = <F extends AnyFunc>(func: F, wait: number) => {
  let timeout = 0

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounced = (...args: Parameters<AnyFunc>) => {
    clearTimeout(timeout)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timeout = setTimeout(() => func(...args), wait)
  }
  debounced.cancel = () => {
    clearTimeout(timeout)
  }
  return debounced as unknown as ((...args: Parameters<F>) => ReturnType<F>) &
    DebounceMethods
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TDebouncedFunc<T extends AnyFunc> = ReturnType<
  typeof debounce<T> & DebounceMethods
>
