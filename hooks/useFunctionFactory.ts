import { useCallback } from 'react'

export type Fn = (...args: any[]) => any

const noop = () => {}

export default function useFunctionFactory<T extends Fn> (
  condition: boolean,
  callback: T,
  dependencies: any[],
): any {
  return useCallback(condition ? callback : noop, dependencies)
}
