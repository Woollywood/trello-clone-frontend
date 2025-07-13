import { NextPage } from 'next'
import React from 'react'

interface Props extends React.PropsWithChildren {
  modal: React.ReactNode
}

const Layout: NextPage<Props> = ({ children, modal }) => {
  return (
    <div>
      {children}
      <div className="forModal">{modal}</div>
    </div>
  )
}

export default Layout
