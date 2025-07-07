import { NextPage } from 'next'
import Link from 'next/link'
import queryString from 'query-string'

import { AuthCard } from '@/components/ui/auth-card'
import { Button } from '@/components/ui/button'
import { SignInForm } from '@/modules/SignInForm'
import { ENV_CONFIG } from '@/utils/constants'

interface Props {
  searchParams: Promise<{ redirectURL?: string }>
}

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
            <Link
              href={queryString.stringifyUrl({
                url: ENV_CONFIG.SIGN_UP_URL,
                query: { redirectURL },
              })}
            >
              Create one
            </Link>
          </Button>
        </p>
      }
    >
      <SignInForm redirectURL={redirectURL} />
    </AuthCard>
  )
}

export default Page
