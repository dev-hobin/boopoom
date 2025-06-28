import { Primitive } from '@boopoom/primitive'
import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { useAccordion } from './useAccordion'

export interface RootProps extends ComponentPropsWithoutRef<'section'> {}
export const Root = forwardRef<HTMLElement, RootProps>((props, ref) => {
  const [state, send] = useAccordion({
    status: 'idle',
    context: {},
    actions: {},
  })

  return <Primitive.section {...props} ref={ref} />
})

export interface ItemProps extends ComponentPropsWithoutRef<'div'> {}
export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  return <Primitive.div {...props} ref={ref} />
})

export interface ItemTriggerProps extends ComponentPropsWithoutRef<'button'> {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
}
export const ItemTrigger = forwardRef<HTMLButtonElement, ItemTriggerProps>(
  (props, ref) => {
    const { headingLevel = 3, ...buttonProps } = props

    const HeadingLevel = `h${headingLevel}` as const

    /**
     * TODO:
     * 버튼에 aria-expanded 반영
     * 버튼에 aria-controls 반영 (연관된 Panel ID)
     * 연관 panel이 열린 상태에서 panel 닫힘을 허용하지 않은 경우 버튼에 aria-disabled 반영
     */

    return (
      <HeadingLevel>
        <Primitive.button {...buttonProps} ref={ref} />
      </HeadingLevel>
    )
  },
)

export interface ItemIndicatorProps extends ComponentPropsWithoutRef<'span'> {}
export const ItemIndicator = forwardRef<HTMLSpanElement, ItemIndicatorProps>(
  (props, ref) => {
    return <Primitive.span {...props} ref={ref} />
  },
)

export interface ItemPanelProps extends ComponentPropsWithoutRef<'div'> {}
export const ItemPanel = forwardRef<HTMLDivElement, ItemPanelProps>(
  (props, ref) => {
    /**
     * TODO:
     * aria-labelledby 반영 (연관된 Trigger ID)
     */
    return <Primitive.div {...props} ref={ref} />
  },
)
