import {
  Children,
  cloneElement,
  DOMAttributes,
  ElementType,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

import checkIsComponentsOf from './checkIsComponentsOf';
import compose from './compose';

export const transformChildrenProps = <T extends {}>(
  children: ElementType | ReactNode,
  transformProps: (child: ReactElement<T>, index: number) => T,
  listComponentExtends?: ElementType[],
  nested = 1,
): any => {
  // @ts-ignore
  const content = Children.map(children, (child: ReactElement<any>, index) => {
    const elementIsValid = isValidElement(child);
    if (!elementIsValid) {
      return child;
    }

    const isAllowExtend = !listComponentExtends
      ? true
      : checkIsComponentsOf(child.type, listComponentExtends);

    // @ts-ignore
    const isHaveChildren = !!child.props.children;
    const shouldTransformChildren =
      !isAllowExtend && isHaveChildren && nested > 0;
    if (shouldTransformChildren) {
      return transformChildrenProps(
        // @ts-ignore
        child.props.children,
        transformProps,
        listComponentExtends,
        nested - 1,
      );
    }

    if (!isAllowExtend) {
      return child;
    }

    // @ts-ignore
    return cloneElement(child, transformProps(child, index));
  });

  return content;
};

export const extendChildrenProps = <T extends {}>(
  children: ElementType | ReactNode,
  extendProps: T,
  listComponentExtends?: ElementType[],
  nested?: number,
): any =>
  transformChildrenProps<T>(
    children,
    (child) => ({ ...child.props, ...extendProps }),
    listComponentExtends,
    nested,
  );

export const extendEventsChildProps = <T extends {}>(
  children: ElementType | ReactNode,
  events: DOMAttributes<T>,
  nested?: number,
): any =>
  transformChildrenProps<T>(
    children,
    (child) => {
      const types = Object.keys(events);
      const mergedProps = (types || []).reduce(
        (props, type) => ({
          ...props,
          // @ts-ignore
          [type]: compose(props[type], events[type]),
        }),
        { ...child.props },
      );

      return mergedProps;
    },
    undefined,
    nested,
  );
