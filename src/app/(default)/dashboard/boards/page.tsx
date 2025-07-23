import { NextPage } from 'next'
import { InferPagePropsType } from 'next-typesafe-url'
import { withParamValidation } from 'next-typesafe-url/app/hoc'

import { UserBoardList } from '@/modules/UserBoardList'
import { SearchRoute, SearchRouteType } from '@/utils/constants'

type Props = InferPagePropsType<SearchRouteType>

const Page: NextPage<Props> = async (props) => {
  return <UserBoardList {...props} />
}

export default withParamValidation(Page, SearchRoute)
