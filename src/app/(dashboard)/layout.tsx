import { NextPage } from 'next'

import { RootHeader } from '@/components/shared/RootHeader'

const Layout: NextPage<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid h-full min-h-screen grid-rows-[auto_1fr]">
      <RootHeader />
      {children}
    </div>
  )
}

export default Layout
