import { useCallback, useRef } from 'react'

export function useCallbackQueue<T extends (...args: any[]) => any>() {
  const actionQueueRef = useRef<T[]>([])

  const enqueue = useCallback((...actions: T[]) => {
    actionQueueRef.current.push(...actions)
  }, [])

  const clear = useCallback(() => {
    actionQueueRef.current = []
  }, [])

  return [actionQueueRef.current, { enqueue, clear }] as const
}
