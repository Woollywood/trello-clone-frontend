import { NextPage } from 'next'
import Image from 'next/image'

const Layout: NextPage<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid h-screen grid-cols-[1fr_2fr]">
      <div className="container mx-auto flex items-center justify-center p-8 py-3">
        {children}
      </div>
      <div className="relative my-auto border-l border-black py-12">
        <Image
          className="relative z-10 w-full bg-contain"
          src="/auth/background.png"
          alt="background image"
          height={1000}
          width={1000}
        />
      </div>
    </div>
  )
}

export default Layout
