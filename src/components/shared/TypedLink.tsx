'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { $path, AllRoutes, PathOptions } from 'next-typesafe-url'
import React from 'react'

import { Children } from '@/types'

export type TypedLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'children'
> & {
  children: Children
}

export type Props<T extends AllRoutes> = Omit<
  TypedLinkProps,
  keyof LinkProps
> &
  React.RefAttributes<HTMLAnchorElement> &
  Omit<LinkProps, 'href'> & { href: PathOptions<T> }

const TypedLink = <T extends AllRoutes>({
  href,
  ...props
}: Props<T>) => {
  const path = usePathname()
  const isActive = path === href.route
  const children =
    typeof props.children === 'function'
      ? props.children({ isActive })
      : props.children

  return (
    <Link href={$path(href)} {...props}>
      {children}
    </Link>
  )
}

export default TypedLink
