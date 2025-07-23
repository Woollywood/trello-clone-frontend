import { useContext } from 'react'

import { BoardCtx } from '../context/context'

export const useBoardCtx = () => {
  return useContext(BoardCtx)
}
