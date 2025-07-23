import { NextPage } from 'next'
import { InferPagePropsType } from 'next-typesafe-url'
import { withParamValidation } from 'next-typesafe-url/app/hoc'

import { Route, RouteType } from './routeType'

import TypedLink from '@/components/shared/TypedLink'
import { AuthCard } from '@/components/ui/auth-card'
import { Button } from '@/components/ui/button'
import { SignUpForm } from '@/modules/SignUpForm'

type Props = InferPagePropsType<RouteType>

const Page: NextPage<Props> = async ({ searchParams }) => {
  const { redirectURL } = await searchParams

  return (
    <AuthCard
      title="Sign up"
      description="Sign up to enjoy the feature of Revolutie"
      footer={
        <p>
          Already have an account?{' '}
          <Button asChild variant="link">
            <TypedLink
              href={{
                route: '/auth/sign-in',
                ...(redirectURL && { searchParams: { redirectURL } }),
              }}
            >
              Sign in
            </TypedLink>
          </Button>
        </p>
      }
    >
      <SignUpForm redirectURL={redirectURL} />
    </AuthCard>
  )
}

export default withParamValidation(Page, Route)
