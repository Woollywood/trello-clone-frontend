import { createContext } from 'react'

import { IBoardContext } from './types'

export const BoardCtx = createContext<IBoardContext>(
  {} as IBoardContext
)
