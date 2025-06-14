/*
 * Based on:
 * - React Aria (Copyright 2020 Adobe, Apache-2.0)
 *
 * NOTICE: Removed mergeIds logic to simplify id handling
 */

import clsx from 'clsx'

interface Props {
  [key: string]: any
}

type PropsArg = Props | null | undefined

// taken from: https://stackoverflow.com/questions/51603250/typescript-3-parameter-list-intersection-type/51604379#51604379
type TupleTypes<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V }
  ? NullToObject<V>
  : never
type NullToObject<T> = T extends null | undefined ? {} : T

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never

/**
 * Merges multiple props objects together. Event handlers are chained,
 * classNames are combined, and ids are deduplicated - different ids
 * will trigger a side-effect and re-render components hooked up with `useId`.
 * For all other props, the last prop object overrides all previous ones.
 * @param args - Multiple sets of props to merge together.
 */
export function mergeProps<T extends PropsArg[]>(
  ...args: T
): UnionToIntersection<TupleTypes<T>> {
  // Start with a base clone of the first argument. This is a lot faster than starting
  // with an empty object and adding properties as we go.
  let result: Props = { ...args[0] }
  for (let i = 1; i < args.length; i++) {
    let props = args[i]
    for (let key in props) {
      let a = result[key]
      let b = props[key]

      // Chain events
      if (
        typeof a === 'function' &&
        typeof b === 'function' &&
        // This is a lot faster than a regex.
        key[0] === 'o' &&
        key[1] === 'n' &&
        key.charCodeAt(2) >= /* 'A' */ 65 &&
        key.charCodeAt(2) <= /* 'Z' */ 90
      ) {
        result[key] = chain(a, b)

        // Merge classnames, sometimes classNames are empty string which eval to false, so we just need to do a type check
      } else if (
        (key === 'className' || key === 'UNSAFE_className') &&
        typeof a === 'string' &&
        typeof b === 'string'
      ) {
        result[key] = clsx(a, b)
      } else {
        result[key] = b !== undefined ? b : a
      }
    }
  }

  return result as UnionToIntersection<TupleTypes<T>>
}

/**
 * Calls all functions in the order they were chained with the same arguments.
 */
function chain(...callbacks: any[]): (...args: any[]) => void {
  return (...args: any[]) => {
    for (let callback of callbacks) {
      if (typeof callback === 'function') {
        callback(...args)
      }
    }
  }
}
