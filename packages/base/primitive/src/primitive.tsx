import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

interface PrimitiveForwardRefComponent<E extends React.ElementType>
  extends React.ForwardRefExoticComponent<PrimitivePropsWithRef<E>> {}

type PrimitivePropsWithRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E> & {
    asChild?: boolean
  }

type JsxElements = {
  [E in keyof React.JSX.IntrinsicElements]: PrimitiveForwardRefComponent<E>
}

function withAsChild<E extends React.ElementType>(
  Component: E,
  displayName: string,
) {
  const PrimitiveComponent = React.forwardRef<
    React.ComponentRef<E>,
    PrimitivePropsWithRef<E>
  >((props, ref) => {
    const { asChild, ...rest } = props

    const Comp = asChild ? Slot : Component

    return <Comp {...(rest as any)} ref={ref} />
  })

  PrimitiveComponent.displayName = displayName

  return PrimitiveComponent
}

const jsxFactory = (): JsxElements => {
  const cache = new Map()

  return new Proxy(withAsChild, {
    apply(target, thisArg, argArray) {
      return withAsChild(argArray[0], argArray[1])
    },
    get(target, prop: keyof React.JSX.IntrinsicElements) {
      const asElement = prop
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement, `Primitive.${asElement}`))
      }
      return cache.get(asElement)
    },
  }) as unknown as JsxElements
}

export const Primitive = jsxFactory()
