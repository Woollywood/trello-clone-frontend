import React from 'react'

export interface IAuthCardProps {
  title: string
  description: string
  footer?: React.ReactNode
}

export const AuthCard: React.FC<
  React.PropsWithChildren<IAuthCardProps>
> = ({ title, description, children, footer }) => {
  return (
    <div>
      <h2 className="mb-3 text-4xl font-bold text-black">{title}</h2>
      <p className="mb-8 text-lg text-gray-500">{description}</p>
      <div className="space-y-8">
        {children}
        <div className="text-center">{footer}</div>
      </div>
    </div>
  )
}
