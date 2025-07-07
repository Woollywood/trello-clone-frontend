import { NextPage } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

const Page: NextPage<Props> = async ({ params }) => {
  const { id } = await params

  return <div>{id}</div>
}

export default Page
