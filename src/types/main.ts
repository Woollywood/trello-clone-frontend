/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyFunc = (...args: any[]) => any | Promise<any>
export type AnyFuncAsync = (...args: any[]) => Promise<any>
export type Nullable<T> = T | null
export type PartialSome<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>
