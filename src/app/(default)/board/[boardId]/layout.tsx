import { NextPage } from 'next'
import React from 'react'

interface Props extends React.PropsWithChildren {
  modal: React.ReactNode
}

const Layout: NextPage<Props> = ({ children, modal }) => {
  return (
    <div className="relative h-[calc(100vh-var(--header-height))] overflow-x-auto overflow-y-hidden">
      {children}
      <div>{modal}</div>
    </div>
  )
}

export default Layout
