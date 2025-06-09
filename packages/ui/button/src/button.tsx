import { ComponentPropsWithoutRef, forwardRef } from 'react'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button {...props} ref={ref} />
  },
)
