import { NextPage } from 'next'

import { UserSidebar } from '@/components/shared/sidebars/UserSidebar'

const Layout: NextPage<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid grid-cols-[2fr_10fr] gap-6 px-8 pt-6 pb-12">
      <UserSidebar />
      {children}
    </div>
  )
}

export default Layout
