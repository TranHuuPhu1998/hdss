import { SyntheticEvent } from 'react'
import getWindow from '../utils/getWindow'
import useEventListener from './useEventListener'

export default function useKeydown (
  allowCode: number | number[],
  fn: (event: SyntheticEvent) => void,
  element?: HTMLElement,
) {
  const onKeydown = (event) => {
    const allowList = !Array.isArray(allowCode) ? [allowCode] : allowCode

    const shouldBreak = !allowList.includes(event.keyCode)
    if (shouldBreak) return

    fn(event)
  }

  const el = element || getWindow()
  const destroy = useEventListener(el, 'keydown', onKeydown)
  return destroy
}
