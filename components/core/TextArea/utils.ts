import getStyleOfElement from '../../../utils/getStyleOfElement';

const entriesOfStyles = Object.entries({
  paddingTop: 'padding-top',
  paddingBottom: 'padding-bottom',
  borderTopWidth: 'border-top-width',
  borderBottomWidth: 'border-bottom-width',
});

export const getBoxSize = (el: HTMLElement): number => {
  if (!el) {
    return 0;
  }

  const boxSizing = getStyleOfElement(el, 'box-sizing');
  const isBorderBox = boxSizing === 'border-box';
  if (!isBorderBox) {
    return 0;
  }

  const sizesOfInput = entriesOfStyles.reduce(
    (acc, [key, value]) =>
      Object.assign(acc, {
        [key]: parseInt(getStyleOfElement(el, value), 10),
      }),
    {} as any
  );

  const totalHeight = [
    sizesOfInput.paddingTop,
    sizesOfInput.paddingBottom,
    sizesOfInput.borderTopWidth,
    sizesOfInput.borderBottomWidth,
  ].reduce((acc: number, size: number) => acc + size, 0);
  return totalHeight;
};

const DEFAULT_LINE_HEIGHT = 18;

export const getLineHeight = (el: HTMLElement) => {
  if (!el) {
    return DEFAULT_LINE_HEIGHT;
  }

  const lineHeight = parseInt(getStyleOfElement(el, 'line-height'), 10);
  return Number.isNaN(lineHeight) ? DEFAULT_LINE_HEIGHT : lineHeight;
};

export const cloneStyleOfTextArea = (
  targetEl: HTMLElement,
  fromEl: HTMLElement
): void => {
  targetEl.style.width = getStyleOfElement(fromEl, 'width');
  targetEl.style.fontSize = getStyleOfElement(fromEl, 'font-size');
  targetEl.style.fontWeight = getStyleOfElement(fromEl, 'font-weight');
  targetEl.style.padding = getStyleOfElement(fromEl, 'padding');
  targetEl.style.border = getStyleOfElement(fromEl, 'border');
  targetEl.style.boxSizing = getStyleOfElement(fromEl, 'box-sizing');
};
