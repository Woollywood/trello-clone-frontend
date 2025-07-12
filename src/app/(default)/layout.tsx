import { NextPage } from 'next'

import { RootHeader } from '@/components/shared/RootHeader'
import { WebsocketProvider } from '@/features/websocket'

const Layout: NextPage<React.PropsWithChildren> = ({ children }) => {
  return (
    <WebsocketProvider>
      <div className="grid h-full min-h-screen grid-rows-[auto_1fr]">
        <RootHeader />
        {children}
      </div>
    </WebsocketProvider>
  )
}

export default Layout
