import { NextPage } from 'next'

import { UserBoardList } from '@/modules/UserBoardList'
import { PaginationAsyncProps } from '@/types'

type Props = PaginationAsyncProps

const Page: NextPage<Props> = async (props) => {
  return <UserBoardList {...props} />
}

export default Page
