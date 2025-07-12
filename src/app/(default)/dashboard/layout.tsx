import { NextPage } from 'next'

import { UserSidebar } from '@/components/shared/sidebars/UserSidebar'

const Layout: NextPage<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="container mx-auto grid grid-cols-[1fr_9fr] gap-6 pt-6 pb-12">
      <UserSidebar />
      {children}
    </div>
  )
}

export default Layout
