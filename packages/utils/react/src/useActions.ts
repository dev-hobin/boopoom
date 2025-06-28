import { useCallback, useRef } from 'react'

export function useActions() {
  const actionQueueRef = useRef<VoidFunction[]>([])

  const enqueue = useCallback((...actions: VoidFunction[]) => {
    actionQueueRef.current.push(...actions)
  }, [])

  const clear = useCallback(() => {
    actionQueueRef.current = []
  }, [])

  return [actionQueueRef.current, { enqueue, clear }] as const
}
