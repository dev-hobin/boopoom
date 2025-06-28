import { useEffect, useReducer } from 'react'
import { useCallbackQueue } from '@boopoom/react-utils'
import { AccordionEvent, AccordionState } from './type'

export function useAccordion(initial: AccordionState) {
  const [callbackQueue, callbackQueueApi] = useCallbackQueue<VoidFunction>()

  const [state, dispatch] = useReducer(
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
    if (callbackQueue.length === 0) {
      return
    }

    callbackQueue.forEach((action) => action())
    callbackQueueApi.clear()
  })

  // handle activities
  useEffect(() => {
    if (state.status === 'idle') {
      return () => {}
    }
  }, [state.status])

  return { state, dispatch } as const
}
