import getSumOfScrollParent from './getScrollOffset';
import getWindow from './getWindow';

export default (
  el: HTMLElement
): { top: number; left: number; width: number; height: number } => {
  const element = el || ({} as HTMLElement);
  const win = getWindow();
  const isElementReady = element && 'getBoundingClientRect' in element;
  if (!isElementReady || !win) {
    return {
      top: -1,
      left: -1,
      width: -1,
      height: -1,
    };
  }

  const rect = element.getBoundingClientRect() || ({} as ClientRect);
  const sumOfScrollParent = getSumOfScrollParent(element);

  return {
    // tslint:disable-next-line: no-bitwise
    top: rect.top + win.pageYOffset + ~~sumOfScrollParent.top,
    // tslint:disable-next-line: no-bitwise
    left: rect.left + win.pageXOffset + ~~sumOfScrollParent.left,
    width: rect.width,
    height: rect.height,
  };
};
