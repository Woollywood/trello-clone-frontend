'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import {
  useAuthControllerIdentity,
  useAuthControllerSignOut,
} from '@/api/generated'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { sessionClient } from '@/services/session/SessionClient'
import { ENV_CONFIG } from '@/utils/constants'

export const Profile: React.FC = () => {
  const { data: user } = useAuthControllerIdentity({})
  const { push } = useRouter()
  const { mutateAsync: signOut } = useAuthControllerSignOut({
    mutation: {
      async onSuccess() {
        sessionClient.deleteSession()
        push(ENV_CONFIG.SIGN_IN_URL)
      },
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Профиль</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
