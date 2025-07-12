'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React from 'react'
import { toast } from 'sonner'

import { SignUpSchema, signUpSchema } from './schema'

import {
  authControllerSignIn,
  useAuthControllerSignUp,
} from '@/api/generated'
import { publicInstance } from '@/api/instances'
import { Button } from '@/components/ui/button'
import { Form } from '@/features/form/Form'
import { Input } from '@/features/form/Input'
import { Password } from '@/features/form/Password'
import { createConnectForm } from '@/hocs/createConnectForm'
import { sessionClient } from '@/services/session/SessionClient'
import { ENV_CONFIG } from '@/utils/constants'

const ConnectForm = createConnectForm<SignUpSchema>()

interface ISignUpFormProps {
  redirectURL?: string
}

export const SignUpForm: React.FC<ISignUpFormProps> = ({
  redirectURL = ENV_CONFIG.AUTH_REDIRECT_URL,
}) => {
  const { push } = useRouter()
  const { mutateAsync: onSubmit } = useAuthControllerSignUp({
    client: { client: publicInstance },
    mutation: {
      async onSuccess(undefined, { data }) {
        const tokens = await authControllerSignIn(data, {
          client: publicInstance,
        })
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
        resolver: zodResolver(signUpSchema),
        defaultValues: {
          email: '',
          password: '',
          username: '',
          confirmPassword: '',
        },
      }}
      onSubmit={async (data) => onSubmit({ data })}
    >
      <ConnectForm>
        {({ control }) => (
          <Input control={control} name="username" label="Username" />
        )}
      </ConnectForm>
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
        {({ control }) => (
          <Password
            control={control}
            name="confirmPassword"
            label="Confirm password"
          />
        )}
      </ConnectForm>
      <ConnectForm>
        {({ formState: { isSubmitting } }) => (
          <Button
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            Sign up
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
          Continue in with Google
        </a>
      </Button>
    </Form>
  )
}
