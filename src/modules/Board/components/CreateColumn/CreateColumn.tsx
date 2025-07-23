'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

import { useBoardCtx } from '../../hooks/useBoardCtx'

import { Schema, schema } from './schema'

import {
  Board,
  BoardColumn,
  boardControllerGetBoardQueryKey,
  useBoardControllerCreateColumn,
  useBoardControllerGetBoard,
} from '@/api/generated'
import { Button } from '@/components/ui/button'
import { Form, IFormRef } from '@/features/form/Form'
import { Textarea } from '@/features/form/Textarea'
import { Toggler } from '@/features/Toggler'
import { createConnectForm } from '@/hocs/createConnectForm'
import { useOutsideClick } from '@/hooks/useOutsideClick'

interface ICreateFormProps {
  onCancel: () => void
}

const ConnectForm = createConnectForm<Schema>()

const CreateForm: React.FC<ICreateFormProps> = ({ onCancel }) => {
  const { id } = useBoardCtx()
  const formRef = useRef<IFormRef<Schema>>(null)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const { data: board } = useBoardControllerGetBoard(id)
  useOutsideClick([wrapperRef], onCancel)

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollIntoView()
    }
  }, [board?.boardColumns])

  const queryClient = useQueryClient()
  const { mutateAsync: createColumn } =
    useBoardControllerCreateColumn({
      mutation: {
        async onMutate({ id, data: { title } }) {
          await queryClient.cancelQueries({
            queryKey: boardControllerGetBoardQueryKey(id),
          })
          const prevState = queryClient.getQueriesData({
            queryKey: boardControllerGetBoardQueryKey(id),
          })
          queryClient.setQueryData<Board>(
            boardControllerGetBoardQueryKey(id),
            (old) => {
              if (!old) {
                return old
              }

              const lastIdx =
                old.boardColumns?.slice()?.pop()?.idx ?? -1

              return {
                ...old,
                boardColumns: [
                  ...(old.boardColumns ?? []),
                  {
                    id: uuid(),
                    title,
                    idx: lastIdx + 1,
                    boardId: id,
                    tasks: [] as unknown[],
                  } as BoardColumn,
                ],
              }
            }
          )
          return { prevState }
        },
        onError(error, { id }, context) {
          queryClient.setQueryData(
            boardControllerGetBoardQueryKey(id),
            context?.prevState
          )
        },
        onSettled(data, error, { id }) {
          queryClient.invalidateQueries({
            queryKey: boardControllerGetBoardQueryKey(id),
          })
        },
      },
    })

  const onSubmit: SubmitHandler<Schema> = async ({ title }) => {
    formRef.current?.reset()
    await createColumn({
      id,
      data: { board: { connect: { id } }, title },
    })
    formRef.current?.setFocus('title')
  }

  return (
    <div className="w-[260px] pr-6" ref={wrapperRef}>
      <Form
        ref={formRef}
        className="space-y-2"
        useFormProps={{
          resolver: zodResolver(schema),
          defaultValues: {
            title: '',
          },
        }}
        onSubmit={onSubmit}
      >
        <ConnectForm>
          {({ control }) => (
            <Textarea
              autoFocus
              className="resize-none"
              control={control}
              name="title"
              placeholder="Введите название колонки"
            />
          )}
        </ConnectForm>
        <div className="flex items-center gap-2">
          <Button>Создать</Button>
          <Button variant="outline" onClick={onCancel}>
            <X />
          </Button>
        </div>
      </Form>
    </div>
  )
}

export const CreateColumn: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false)

  return (
    <Toggler
      toggled={isToggled}
      toggle={setIsToggled}
      renderToggle={({ onToggle }) => (
        <CreateForm onCancel={onToggle} />
      )}
    >
      {({ onToggle }) => (
        <div className="pr-6">
          <Button className="w-[260px]" onClick={onToggle}>
            Создать
          </Button>
        </div>
      )}
    </Toggler>
  )
}
