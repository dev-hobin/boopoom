import { buttonProps, elementProps } from '@boopoom/react-utils'
import { AccordionState } from './type'
import {
  getRootBoopoomId,
  getItemBoopoomId,
  getItemTriggerBoopoomId,
  getItemPanelBoopoomId,
  getItemIndicatorBoopoomId,
} from './id'

export function useAccordionProps(state: AccordionState) {
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
      })
    },
    getItemPanelProps: ({ value }: { value: string | number }) => {
      const id = getItemPanelBoopoomId(state.context, value)

      return elementProps({
        id,
        'data-boopoom-id': id,
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
