import { NextPage } from 'next'

import { UserSidebar } from '@/components/shared/sidebars/UserSidebar'

const Layout: NextPage<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className=" px-8 grid grid-cols-[2fr_10fr] gap-6 pt-6 pb-12">
      <UserSidebar />
      {children}
    </div>
  )
}

export default Layout
