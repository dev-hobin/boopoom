import { AccordionContext } from './type'

export function getRootBoopoomId(context: AccordionContext) {
  return `accordion-${context.id}-root`
}

export function getItemBoopoomId(
  context: AccordionContext,
  value: string | number,
) {
  return `accordion-${context.id}-item-${value}`
}

export function getItemTriggerBoopoomId(
  context: AccordionContext,
  value: string | number,
) {
  return `accordion-${context.id}-item-trigger-${value}`
}

export function getItemPanelBoopoomId(
  context: AccordionContext,
  value: string | number,
) {
  return `accordion-${context.id}-item-panel-${value}`
}

export function getItemIndicatorBoopoomId(
  context: AccordionContext,
  value: string | number,
) {
  return `accordion-${context.id}-item-indicator-${value}`
}

export function getRootId(context: AccordionContext) {
  const boopoomId = getRootBoopoomId(context)
  return (
    document.querySelector(`[data-boopoom-id="${boopoomId}"]`)?.id || boopoomId
  )
}

export function getItemId(context: AccordionContext, value: string | number) {
  const boopoomId = getItemBoopoomId(context, value)
  return (
    document.querySelector(`[data-boopoom-id="${boopoomId}"]`)?.id || boopoomId
  )
}

export function getItemTriggerId(
  context: AccordionContext,
  value: string | number,
) {
  const boopoomId = getItemTriggerBoopoomId(context, value)
  return (
    document.querySelector(`[data-boopoom-id="${boopoomId}"]`)?.id || boopoomId
  )
}

export function getItemPanelId(
  context: AccordionContext,
  value: string | number,
) {
  const boopoomId = getItemPanelBoopoomId(context, value)
  return (
    document.querySelector(`[data-boopoom-id="${boopoomId}"]`)?.id || boopoomId
  )
}

export function getItemIndicatorId(
  context: AccordionContext,
  value: string | number,
) {
  const boopoomId = getItemIndicatorBoopoomId(context, value)
  return (
    document.querySelector(`[data-boopoom-id="${boopoomId}"]`)?.id || boopoomId
  )
}
