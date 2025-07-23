import Link, { LinkProps } from 'next/link'
import { $path, AllRoutes, PathOptions } from 'next-typesafe-url'

type Props<T extends AllRoutes> = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  React.RefAttributes<HTMLAnchorElement> &
  Omit<LinkProps, 'href'> & { href: PathOptions<T> }

const TypedLink = <T extends AllRoutes>({
  href,
  ...props
}: Props<T>) => {
  return <Link href={$path(href)} {...props}></Link>
}

export default TypedLink
