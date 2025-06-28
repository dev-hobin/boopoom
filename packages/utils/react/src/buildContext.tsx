import { createContext, ReactNode, useContext, useMemo } from 'react'

type ProviderProps<TContext> = { context: TContext; children: ReactNode }

export function buildContext<TContext extends Record<PropertyKey, unknown>>(
  contextName: string,
  defaultValue?: TContext,
) {
  const Context = createContext<TContext | undefined>(defaultValue ?? undefined)

  function Provider({ children, context }: ProviderProps<TContext>) {
    const value = useMemo(
      () => (Object.keys(context).length > 0 ? context : null),
      [...Object.values(context)],
    ) as TContext

    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  function useInnerContext() {
    const context = useContext(Context)

    if (context != null) {
      return context
    }

    if (defaultValue != null) {
      return defaultValue
    }

    throw new Error(
      `\`${contextName}Context\` must be used within \`${contextName}Provider\``,
    )
  }

  return [Provider, useInnerContext] as const
}
