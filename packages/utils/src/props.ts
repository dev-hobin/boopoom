import { ComponentPropsWithoutRef, HTMLAttributes } from 'react'

type DataAttr = { [key in `data-${string}`]?: string | undefined }

export const elementProps = (props: HTMLAttributes<HTMLElement> & DataAttr) =>
  props

export const inputProps = (
  props: ComponentPropsWithoutRef<'input'> & DataAttr,
) => props

export const labelProps = (
  props: ComponentPropsWithoutRef<'label'> & DataAttr,
) => props

export const buttonProps = (
  props: ComponentPropsWithoutRef<'button'> & DataAttr,
) => props

export const imgProps = (props: ComponentPropsWithoutRef<'img'> & DataAttr) =>
  props
