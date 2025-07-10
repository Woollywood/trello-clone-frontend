import React from 'react'

interface Props extends React.PropsWithChildren {
  value: React.ReactNode
}

export const Chips: React.FC<Props> = ({ value, children }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0">{value}</div>
      {children}
    </div>
  )
}
