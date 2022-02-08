/**
 * Corresponds to 10 frames at 60 Hz.
 * A few bytes payload overhead when lodash/debounce is ~3 kB and debounce ~300 B.
 * Ref: https://github.com/mui-org/material-ui/blob/0f968fc5400e0e6bbb6f9296fe1c6a29d0bde0d1/packages/material-ui/src/utils/debounce.js#L3
 * @param func {Function} Handler
 * @param wait {Number} Wait time
 */
export default function debounce (func: (...args: any[]) => any, wait = 166): any {
  let timeout: NodeJS.Timeout
  function _debounce (...args: any[]): void {
    const later = (): void => {
      func.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }

  _debounce.clear = () => {
    clearTimeout(timeout)
  }

  return _debounce
}
