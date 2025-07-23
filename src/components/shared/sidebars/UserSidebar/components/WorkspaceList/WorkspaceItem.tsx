'use client'

import React from 'react'

import { Workspace } from '@/api/generated'
import TypedLink from '@/components/shared/TypedLink'
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
            <TypedLink
              href={{
                route: '/dashboard/workspace/[id]/boards',
                routeParams: { id },
              }}
            >
              Доски
            </TypedLink>
            <TypedLink
              href={{
                route: '/dashboard/workspace/[id]/members',
                routeParams: { id },
              }}
            >
              Участники
            </TypedLink>
            <TypedLink
              href={{
                route: '/dashboard/workspace/[id]/settings',
                routeParams: { id },
              }}
            >
              Настройки
            </TypedLink>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
