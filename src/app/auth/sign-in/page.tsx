import { NextPage } from 'next'
import { InferPagePropsType } from 'next-typesafe-url'
import { withParamValidation } from 'next-typesafe-url/app/hoc'

import { Route, RouteType } from './routeType'

import TypedLink from '@/components/shared/TypedLink'
import { AuthCard } from '@/components/ui/auth-card'
import { Button } from '@/components/ui/button'
import { SignInForm } from '@/modules/SignInForm'

type Props = InferPagePropsType<RouteType>

const Page: NextPage<Props> = async ({ searchParams }) => {
  const { redirectURL } = await searchParams

  return (
    <AuthCard
      title="Sign in"
      description="Please login to continue to your account"
      footer={
        <p>
          Need an account?{' '}
          <Button asChild variant="link">
            <TypedLink
              href={{
                route: '/auth/sign-up',
                ...(redirectURL && { searchParams: { redirectURL } }),
              }}
            >
              Create one
            </TypedLink>
          </Button>
        </p>
      }
    >
      <SignInForm redirectURL={redirectURL} />
    </AuthCard>
  )
}

export default withParamValidation(Page, Route)
