import { buttonProps, elementProps } from '@boopoom/react-utils'
import { AccordionState } from './type'

export function useAccordionProps(state: AccordionState) {
  return {
    rootProps: elementProps({}),
    itemProps: elementProps({}),
    itemTriggerProps: buttonProps({}),
    itemPanelProps: elementProps({}),
    itemIndicatorProps: elementProps({}),
  }
}
