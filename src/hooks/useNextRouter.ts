import { Url } from 'next/dist/shared/lib/router/router'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { getAppPrevPath } from '@/hooks/usePreviousPath'
import { NEXT_LOCALES } from '@/types'

const calculatePrevPath = (path: string, slashToSlice = 1) => {
  const slashToSliceAsArrayIdx = slashToSlice - 1
  return path
    .split('/')
    .reverse()
    .filter((_, idx) => idx > slashToSliceAsArrayIdx)
    .reverse()
    .join('/')
}

interface TransitionOptions {
  shallow?: boolean
  scroll?: boolean
}

export const useNextRouter = () => {
  const router = useRouter()
  const query = router.query
  const asPath = router.asPath
  const pathname = router.pathname
  const routesArr = router.route.split('/')

  const locale = router.locale as NEXT_LOCALES
  const locales = router.locales as NEXT_LOCALES[]

  const isNestedPath = useMemo(() => {
    return asPath.split('/').filter((item) => item.length).length > 1
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const prevPath = useMemo(() => {
    return calculatePrevPath(router.asPath)
  }, [router.asPath])

  const lastPathname = routesArr[routesArr.length - 1]

  const toPrevPath = (slashToSlice?: number) => {
    router.push(calculatePrevPath(router.asPath, slashToSlice))
  }

  const toHomePath = () => {
    router.push('/')
  }

  const toCustomRoute = (route: Url, as?: Url, options?: TransitionOptions) => {
    router.push(route, as, options)
  }

  const toNotFound = () => {
    router.push('/404')
  }

  const toBack = (withRouterEmit?: boolean) => {
    // если нужно чтобы работало как window.history.back() - нужно делать свой ивент и отслеживать в useDirtyFormRedirect
    if (withRouterEmit) {
      router.events.emit('routeChangeStart', getAppPrevPath())
    }
    router.back()
  }
  const toBackByUrl = (route: Url) => {
    const isStringPath = typeof route === 'string'
    const toPath = isStringPath ? route : route.pathname
    const prevPath = getAppPrevPath()
    if (prevPath && toPath && prevPath.includes(toPath)) {
      toBack()
    }
    return router.push(route)
  }

  const toReload = () => {
    router.reload()
  }

  const toAuth = () => {
    router.push('/signin')
  }

  const toShallowRoute = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    arg: Record<any, any>,
    {
      as,
      pathname,
      argsToDelete,
      options,
    }: {
      as?: string
      pathname?: string
      argsToDelete?: string[]
      options?: Omit<TransitionOptions, 'shallow'>
    } = {}
  ) => {
    argsToDelete?.forEach((key) => {
      delete query[key]
    })
    router.push(
      {
        query: {
          ...query,
          ...arg,
        },
        pathname,
      },
      as,
      {
        shallow: true,
        ...options,
      }
    )
  }

  return {
    isNestedPath,
    prevPath,
    toAuth,
    toPrevPath,
    toHomePath,
    toCustomRoute,
    toNotFound,
    toBack,
    toReload,
    toShallowRoute,
    toBackByUrl,
    router,
    locale,
    lastPathname,
    query,
    locales,
    asPath,
    pathname,
  }
}
