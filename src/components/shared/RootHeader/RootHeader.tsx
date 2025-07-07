import Link from 'next/link'
import React from 'react'

import { Notifications } from './components/Notifications'
import { Profile } from './components/Profile'

export const RootHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <Link href="/">Лого</Link>
      <div className="flex items-center gap-4">
        <Notifications />
        <Profile />
      </div>
    </header>
  )
}
