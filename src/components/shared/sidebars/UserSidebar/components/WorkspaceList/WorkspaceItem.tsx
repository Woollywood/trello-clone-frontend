'use client'

import Link from 'next/link'
import React from 'react'

import { Workspace } from '@/api/generated'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const WorkspaceItem: React.FC<Workspace> = ({ id, title }) => {
  return (
    <Accordion type="multiple">
      <AccordionItem value={id}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-1">
            <Link href={`/dashboard/workspace/${id}/boards`}>
              Доски
            </Link>
            <Link href={`/dashboard/workspace/${id}/members`}>
              Участники
            </Link>
            <Link href={`/dashboard/workspace/${id}/settings`}>
              Настройки
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
