'use client'

import { AllRoutes } from 'next-typesafe-url'

import { ISidebarLink } from '../types'

import TypedLink from '@/components/shared/TypedLink'
import { cn } from '@/utils/helpers'

export const SidebarLink: React.FC<ISidebarLink<AllRoutes>> = ({
  href,
  icon,
  label,
}) => {
  return (
    <TypedLink href={href} className="block">
      {({ isActive }) => (
        <div
          className={cn(
            'my-1 flex items-center rounded-md px-2 py-1.5 hover:bg-gray-300',
            { 'bg-[#43699d] text-white': isActive },
            { 'hover:bg-[#43699d]': isActive }
          )}
        >
          {icon} {label}
        </div>
      )}
    </TypedLink>
  )
}
