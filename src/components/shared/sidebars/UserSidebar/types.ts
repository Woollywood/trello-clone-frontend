import { AllRoutes, PathOptions } from 'next-typesafe-url'

export interface ISidebarLink<T extends AllRoutes> {
  label: string
  href: PathOptions<T>
  icon: React.ReactNode
}
