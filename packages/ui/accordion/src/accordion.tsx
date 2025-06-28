import { Primitive } from '@boopoom/primitive'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

export interface RootProps extends ComponentPropsWithoutRef<'section'> {}
export const Root = forwardRef<HTMLElement, RootProps>((props, ref) => {
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
    return <Primitive.div {...props} ref={ref} />
  },
)
