import { Dispatch } from 'react'
import { buttonProps, elementProps } from '@boopoom/react-utils'
import {
  getRootBoopoomId,
  getItemBoopoomId,
  getItemTriggerBoopoomId,
  getItemPanelBoopoomId,
  getItemIndicatorBoopoomId,
  getItemTriggerId,
  getItemPanelId,
} from './id'

import type { AccordionState, AccordionEvent } from './type'
import { ariaAttr } from '@boopoom/dom-utils'

export function useAccordionProps(
  state: AccordionState,
  dispatch: Dispatch<AccordionEvent>,
) {
  const rootId = getRootBoopoomId(state.context)
  return {
    rootProps: elementProps({
      id: rootId,
      'data-boopoom-id': rootId,
    }),
    getItemProps: ({ value }: { value: string | number }) => {
      const id = getItemBoopoomId(state.context, value)

      return elementProps({
        id,
        'data-boopoom-id': id,
      })
    },
    getItemTriggerProps: ({ value }: { value: string | number }) => {
      const id = getItemTriggerBoopoomId(state.context, value)

      return buttonProps({
        id,
        'data-boopoom-id': id,
        'aria-expanded': ariaAttr(state.context.value.includes(value)),
        'aria-controls': getItemPanelId(state.context, value),
        onClick() {
          if (state.context.value.includes(value)) {
            dispatch({ type: 'COLLAPSE', value })
          } else {
            dispatch({ type: 'EXPAND', value })
          }
        },
      })
    },
    getItemPanelProps: ({ value }: { value: string | number }) => {
      const id = getItemPanelBoopoomId(state.context, value)

      return elementProps({
        id,
        'data-boopoom-id': id,
        'aria-labelledby': getItemTriggerId(state.context, value),
      })
    },
    getItemIndicatorProps: ({ value }: { value: string | number }) => {
      const id = getItemIndicatorBoopoomId(state.context, value)

      return elementProps({
        id,
        'data-boopoom-id': id,
      })
    },
  }
}
