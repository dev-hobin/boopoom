export const dataAttr = (guard: boolean | undefined) => {
  return guard ? '' : undefined
}

export const ariaAttr = (
  guard: boolean | undefined,
): boolean | 'true' | 'false' | undefined => {
  return guard ? 'true' : undefined
}
