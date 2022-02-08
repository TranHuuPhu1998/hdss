import checkIsBrowser from './checkIsBrowser'

function getScrollOffset (
  child: HTMLElement,
): {
    top: number
    left: number
  } {
  const isBrowser = checkIsBrowser()
  if (!isBrowser) {
    return {
      top: -999,
      left: -999,
    }
  }

  let element = child
  let count = 0

  const parent = document.body
  const scroll = { top: 0, left: 0 }

  while (element && element !== parent) {
    element = (element.parentNode || {}) as HTMLElement
    // tslint:disable-next-line: no-bitwise
    scroll.top += ~~element.scrollTop
    // tslint:disable-next-line: no-bitwise
    scroll.left += ~~element.scrollLeft
    count += 1

    if (count >= 100 || !element.nodeType) {
      break
    }
  }

  return scroll
}

export default getScrollOffset
