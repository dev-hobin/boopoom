import { createContext, ReactNode, useContext, useMemo } from 'react'

type ProviderProps<TContext> = { value: TContext; children: ReactNode }

export function buildContext<TContext extends Record<PropertyKey, unknown>>(
  contextName: string,
  defaultValue?: TContext,
) {
  const Context = createContext<TContext | undefined>(defaultValue ?? undefined)

  function Provider({ children, value }: ProviderProps<TContext>) {
    return (
      <Context.Provider
        value={
          useMemo(
            () => (Object.keys(value).length > 0 ? value : null),
            [...Object.values(value)],
          ) as TContext
        }
      >
        {children}
      </Context.Provider>
    )
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
