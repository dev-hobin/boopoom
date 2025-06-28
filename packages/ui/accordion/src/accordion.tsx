import { ComponentPropsWithoutRef, Dispatch, forwardRef } from 'react'
import { Primitive, PrimitivePropsWithoutRef } from '@boopoom/primitive'
import { mergeProps } from '@boopoom/dom-utils'
import { buildContext } from '@boopoom/react-utils'
import { useAccordion } from './useAccordion'
import { useAccordionProps } from './useAccordionProps'

import type { AccordionEvent, AccordionState } from './type'

const [AccordionProvider, useAccordionContext] = buildContext<{
  state: AccordionState
  dispatch: Dispatch<AccordionEvent>
}>('Accordion')

export interface RootProps extends PrimitivePropsWithoutRef<'section'> {}
export const Root = forwardRef<HTMLElement, RootProps>((props, ref) => {
  const { state, dispatch } = useAccordion({
    status: 'idle',
    context: {},
    callbacks: {},
  })
  const { rootProps } = useAccordionProps(state)

  return (
    <AccordionProvider value={{ state, dispatch }}>
      <Primitive.section ref={ref} {...mergeProps(rootProps, props)} />
    </AccordionProvider>
  )
})

export interface ItemProps extends PrimitivePropsWithoutRef<'div'> {}
export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { state } = useAccordionContext()
  const { itemProps } = useAccordionProps(state)

  return <Primitive.div ref={ref} {...mergeProps(itemProps, props)} />
})

export interface ItemTriggerProps extends PrimitivePropsWithoutRef<'button'> {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
}
export const ItemTrigger = forwardRef<HTMLButtonElement, ItemTriggerProps>(
  (props, ref) => {
    const { headingLevel = 3, ...buttonProps } = props
    const { state } = useAccordionContext()
    const { itemTriggerProps } = useAccordionProps(state)

    const HeadingLevel = `h${headingLevel}` as const

    /**
     * TODO:
     * 버튼에 aria-expanded 반영
     * 버튼에 aria-controls 반영 (연관된 Panel ID)
     * 연관 panel이 열린 상태에서 panel 닫힘을 허용하지 않은 경우 버튼에 aria-disabled 반영
     */

    return (
      <HeadingLevel>
        <Primitive.button
          ref={ref}
          {...mergeProps(itemTriggerProps, buttonProps)}
        />
      </HeadingLevel>
    )
  },
)

export interface ItemIndicatorProps extends PrimitivePropsWithoutRef<'span'> {}
export const ItemIndicator = forwardRef<HTMLSpanElement, ItemIndicatorProps>(
  (props, ref) => {
    const { state } = useAccordionContext()
    const { itemIndicatorProps } = useAccordionProps(state)

    return (
      <Primitive.span ref={ref} {...mergeProps(itemIndicatorProps, props)} />
    )
  },
)

export interface ItemPanelProps extends PrimitivePropsWithoutRef<'div'> {}
export const ItemPanel = forwardRef<HTMLDivElement, ItemPanelProps>(
  (props, ref) => {
    const { state } = useAccordionContext()
    const { itemPanelProps } = useAccordionProps(state)

    /**
     * TODO:
     * aria-labelledby 반영 (연관된 Trigger ID)
     */
    return <Primitive.div ref={ref} {...mergeProps(itemPanelProps, props)} />
  },
)
