import '@/styles/globals.css'

import type { Metadata } from 'next'

import { Geist, Geist_Mono } from 'next/font/google'

import { ProvidersLayout } from '@/layouts/ProvidersLayout'
import { cn } from '@/utils/helpers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Trello Clone',
  description: 'Trello Clone App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'antialiased'
        )}
      >
        <ProvidersLayout>{children}</ProvidersLayout>
      </body>
    </html>
  )
}
