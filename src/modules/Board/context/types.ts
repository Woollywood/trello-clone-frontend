import { Board, BoardColumn, Task } from '@/api/generated'

export interface IBoardContext {
  id: string

  board: Board | undefined
  isPendingBoard: boolean

  columns: BoardColumn[]
  tasks: Task[]
  setLocalColumns: React.Dispatch<
    React.SetStateAction<BoardColumn[] | null>
  >

  activeTask: Task | null
  activeColumn: BoardColumn | null
  setActiveTask: React.Dispatch<React.SetStateAction<Task | null>>
  setActiveColumn: React.Dispatch<
    React.SetStateAction<BoardColumn | null>
  >
}
