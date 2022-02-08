const getStyleOfElement = (el: HTMLElement, prop: string) =>
  getComputedStyle(el, null).getPropertyValue(prop)

export default getStyleOfElement
