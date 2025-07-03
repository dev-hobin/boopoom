import { Dispatch, forwardRef, useId } from 'react'
import { Primitive, PrimitivePropsWithoutRef } from '@boopoom/primitive'
import { handleSync, mergeProps } from '@boopoom/dom-utils'
import { buildContext, useEventCallback } from '@boopoom/react-utils'
import { useAccordion } from './useAccordion'
import { useAccordionProps } from './useAccordionProps'

import type { AccordionEvent, AccordionState } from './type'
import { Presence } from '@radix-ui/react-presence'

const [AccordionProvider, useAccordionContext] = buildContext<{
  state: AccordionState
  dispatch: Dispatch<AccordionEvent>
}>('AccordionContext')

const [AccordionItemProvider, useAccordionItemContext] = buildContext<{
  value: string | number
}>('AccordionItemContext')

export interface RootProps
  extends Omit<
    PrimitivePropsWithoutRef<'section'>,
    'value' | 'defaultValue' | 'onValueChange'
  > {
  value?: (string | number)[]
  defaultValue?: (string | number)[]
  onValueChange?: (value: (string | number)[]) => void
}
export const Root = forwardRef<HTMLElement, RootProps>((props, ref) => {
  const defaultId = useId()

  const { state, dispatch } = useAccordion({
    status: 'idle',
    context: {
      id: props.id ?? defaultId,
      value: props.value ?? props.defaultValue ?? [],
    },
    callbacks: {
      onValueChange: useEventCallback(props.onValueChange),
    },
  })

  handleSync({
    target: state.context,
    source: props,
    keys: ['value'],
    handler: (syncedContext) => {
      dispatch({ type: 'SYNC', payload: syncedContext })
    },
  })

  const { rootProps } = useAccordionProps(state, dispatch)

  const { value, defaultValue, onValueChange, ...elementProps } = props
  return (
    <AccordionProvider value={{ state, dispatch }}>
      <Primitive.section ref={ref} {...mergeProps(rootProps, elementProps)} />
    </AccordionProvider>
  )
})

export interface ItemProps extends PrimitivePropsWithoutRef<'div'> {
  value: string | number
}
export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { state, dispatch } = useAccordionContext()
  const { getItemProps } = useAccordionProps(state, dispatch)

  return (
    <AccordionItemProvider value={{ value: props.value }}>
      <Primitive.div
        ref={ref}
        {...mergeProps(getItemProps({ value: props.value }), props)}
      />
    </AccordionItemProvider>
  )
})

export interface ItemTriggerProps extends PrimitivePropsWithoutRef<'button'> {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
}
export const ItemTrigger = forwardRef<HTMLButtonElement, ItemTriggerProps>(
  (props, ref) => {
    const { headingLevel = 3, ...buttonProps } = props

    const { state, dispatch } = useAccordionContext()
    const { value } = useAccordionItemContext()

    const { getItemTriggerProps } = useAccordionProps(state, dispatch)

    const HeadingLevel = `h${headingLevel}` as const

    /**
     * TODO:
     * 연관 panel이 열린 상태에서 panel 닫힘을 허용하지 않은 경우 버튼에 aria-disabled 반영
     */

    return (
      <HeadingLevel>
        <Primitive.button
          ref={ref}
          {...mergeProps(getItemTriggerProps({ value }), buttonProps)}
        />
      </HeadingLevel>
    )
  },
)

export interface ItemIndicatorProps extends PrimitivePropsWithoutRef<'span'> {}
export const ItemIndicator = forwardRef<HTMLSpanElement, ItemIndicatorProps>(
  (props, ref) => {
    const { state, dispatch } = useAccordionContext()
    const { value } = useAccordionItemContext()

    const { getItemIndicatorProps } = useAccordionProps(state, dispatch)

    return (
      <Primitive.span
        ref={ref}
        {...mergeProps(getItemIndicatorProps({ value }), props)}
      />
    )
  },
)

export interface ItemPanelProps extends PrimitivePropsWithoutRef<'div'> {}
export const ItemPanel = forwardRef<HTMLDivElement, ItemPanelProps>(
  (props, ref) => {
    const { state, dispatch } = useAccordionContext()
    const { value } = useAccordionItemContext()

    const { getItemPanelProps } = useAccordionProps(state, dispatch)

    return (
      <Presence present={state.context.value.includes(value)}>
        <Primitive.div
          ref={ref}
          {...mergeProps(getItemPanelProps({ value }), props)}
        />
      </Presence>
    )
  },
)
