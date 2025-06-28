import { useEffect, useReducer } from 'react'
import { useActions } from '@boopoom/react-utils'

export type AccordionStatus = 'idle'

export type AccordionContext = {}

export type AccordionActions = {}

export type AccordionState = {
  status: AccordionStatus | (string & {})
  context: AccordionContext
  actions: AccordionActions
  entryActions?: Partial<Record<AccordionStatus, VoidFunction[]>>
  exitActions?: Partial<Record<AccordionStatus, VoidFunction[]>>
}

export type AccordionEvent =
  | { type: 'SOME' }
  | { type: 'OTHER' }
  | { type: 'SYNC'; payload: AccordionContext }

export function useAccordion(initial: AccordionState) {
  const [actionQueue, actionQueueApi] = useActions()

  const [state, send] = useReducer(
    (state: AccordionState, event: AccordionEvent) => {
      if (state.status === 'idle') {
        switch (event.type) {
          case 'SOME':
            return {
              ...state,
            }
          case 'OTHER':
            return {
              ...state,
            }
          case 'SYNC':
            return {
              ...state,
              context: event.payload,
            }
        }
      }

      if (event.type === 'SYNC') {
        return {
          ...state,
          context: event.payload,
        }
      }

      return state
    },
    initial,
  )

  // handle actions
  useEffect(() => {
    if (actionQueue.length === 0) {
      return
    }

    actionQueue.forEach((action) => action())
    actionQueueApi.clear()
  })

  // handle activities
  useEffect(() => {
    if (state.status === 'open') {
      return () => {}
    }
  }, [state.status])

  return [state, send] as const
}
