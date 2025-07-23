'use client'

import { isServer } from '@tanstack/react-query'
import React from 'react'

export interface INoSSRProps extends React.PropsWithChildren {
  fallback?: React.ReactNode
}

export const NoSSR: React.FC<INoSSRProps> = ({
  children,
  fallback,
}) => {
  return isServer ? fallback : children
}
