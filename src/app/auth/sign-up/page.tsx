import { NextPage } from 'next'
import Link from 'next/link'
import queryString from 'query-string'

import { AuthCard } from '@/components/ui/auth-card'
import { Button } from '@/components/ui/button'
import { SignUpForm } from '@/modules/SignUpForm'
import { ENV_CONFIG } from '@/utils/constants'

interface Props {
  searchParams: Promise<{ redirectURL?: string }>
}

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
            <Link
              href={queryString.stringifyUrl({
                url: ENV_CONFIG.SIGN_IN_URL,
                query: { redirectURL },
              })}
            >
              Sign in
            </Link>
          </Button>
        </p>
      }
    >
      <SignUpForm redirectURL={redirectURL} />
    </AuthCard>
  )
}

export default Page
