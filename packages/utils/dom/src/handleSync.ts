export function handleSync<
  T extends Record<PropertyKey, unknown>,
  S extends Partial<T>,
  K extends PropertyKey,
>({
  target,
  source,
  keys,
  handler,
}: {
  target: T
  source: S
  keys: K[]
  handler: (syncedContext: T) => void
}) {
  if (
    keys.some(
      (key) =>
        key in source && (source[key] as unknown as T[K]) !== target[key],
    )
  ) {
    handler(mergeContext(target, source, keys))
  }
}

function mergeContext<
  T extends Record<PropertyKey, unknown>,
  S extends Partial<T>,
  K extends PropertyKey,
>(internalContext: T, externalContext: S, keys: K[]) {
  const merged = keys
    .filter((key) => key in externalContext)
    .reduce<Partial<T>>((acc, key) => {
      acc[key] = externalContext[key] as unknown as T[K]
      return acc
    }, {})

  return Object.assign(internalContext, merged)
}
