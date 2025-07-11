'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React from 'react'
import { toast } from 'sonner'

import { SignInSchema, signInSchema } from './schema'

import { useAuthControllerSignIn } from '@/api/generated'
import { publicInstance } from '@/api/instances'
import { Button } from '@/components/ui/button'
import { Form } from '@/features/form/Form'
import { Input } from '@/features/form/Input'
import { Password } from '@/features/form/Password'
import { createConnectForm } from '@/hocs/createConnectForm'
import { sessionClient } from '@/services/session/SessionClient'
import { ENV_CONFIG } from '@/utils/constants'

const ConnectForm = createConnectForm<SignInSchema>()

interface ISignInFormProps {
  redirectURL?: string
}

export const SignInForm: React.FC<ISignInFormProps> = ({
  redirectURL = ENV_CONFIG.AUTH_REDIRECT_URL,
}) => {
  const { push } = useRouter()
  const { mutateAsync: onSubmit } = useAuthControllerSignIn({
    client: { client: publicInstance },
    mutation: {
      async onSuccess(tokens) {
        await sessionClient.createSession(tokens)
        push(redirectURL)
      },
      onError(error) {
        toast(error.response?.data.message)
      },
    },
  })

  return (
    <Form
      className="space-y-6"
      useFormProps={{
        resolver: zodResolver(signInSchema),
        defaultValues: {
          email: '',
          password: '',
        },
      }}
      onSubmit={async (data) => onSubmit({ data })}
    >
      <ConnectForm>
        {({ control }) => (
          <Input control={control} name="email" label="Email" />
        )}
      </ConnectForm>
      <ConnectForm>
        {({ control }) => (
          <Password
            control={control}
            name="password"
            label="Password"
          />
        )}
      </ConnectForm>
      <ConnectForm>
        {({ formState: { isSubmitting } }) => (
          <Button disabled={isSubmitting} className="w-full">
            Sign in
          </Button>
        )}
      </ConnectForm>
      <p className="text-center">or</p>
      <Button asChild variant="outline" className="w-full" size="lg">
        <a
          href={queryString.stringifyUrl({
            url: `${ENV_CONFIG.API_ENDPOINT}/api/v1/auth/providers/google`,
            query: { redirectURL },
          })}
        >
          Sign in with Google
        </a>
      </Button>
    </Form>
  )
}
