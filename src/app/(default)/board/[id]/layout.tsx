import { NextPage } from 'next'

const Layout: NextPage<React.PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>
}

export default Layout
