/* eslint-disable react-hooks/exhaustive-deps */
import useForkRef from '@rooks/use-fork-ref';
import React, {
  cloneElement,
  ElementType,
  forwardRef,
  Fragment,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { BaseComponent, OverrideProps } from '../BaseComponent';
import Popper, { PopperComponent, PopperPlacements } from '../Popper';

import styles from './styles.module.scss';

export * from './types';

interface TooltipTypeMap<P = {}, D extends ElementType = PopperComponent> {
  props: P & {
    content: ReactNode;
    enterDelay?: number;
    leaveDelay?: number;
    placement?: PopperPlacements;
  };
  defaultComponent: D;
}

export type TooltipProps<
  D extends ElementType = TooltipTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TooltipTypeMap<P, D>, D>;

interface TooltipDefaultProps {
  component: ElementType;
  enterDelay: number;
  leaveDelay: number;
  placement: PopperPlacements;
}

const defaultProps: TooltipDefaultProps = {
  component: Popper,
  enterDelay: 0,
  leaveDelay: 0,
  placement: PopperPlacements.top,
};

const defaultPopperOptions = {
  modifiers: [
    {
      name: 'arrow',
      options: {
        element: '[data-popper-arrow]',
        padding: 10,
      },
    },
    {
      name: 'offset',
      options: {
        offset: [0, 10],
      },
    },
  ],
};

let hystersisOpen = false;
let hystersisTimer = null;

export const Tooltip: BaseComponent<TooltipTypeMap> & {
  displayName?: string;
} = forwardRef((_props: TooltipProps, ref) => {
  const {
    component: Component,
    placement,
    content,
    children,
    enterDelay,
    leaveDelay,
    ...rest
  } = {
    ...defaultProps,
    ..._props,
  };

  const [anchorEl, setAnchorEl] = useState();
  // @ts-ignore
  const ownerRef = useForkRef(setAnchorEl, ref);
  const hasChildRef = !children && children.ref;
  // @ts-ignore
  // eslint-disable-next-line
  const handleRef = hasChildRef ? useForkRef(children.ref, ownerRef) : ownerRef;

  const closeTimer = useRef<NodeJS.Timeout>();
  const enterTimer = useRef<NodeJS.Timeout>();
  const leaveTimer = useRef<NodeJS.Timeout>();
  const touchTimer = useRef<NodeJS.Timeout>();
  const [open, setOpenState] = useState(false);

  useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      clearTimeout(touchTimer.current);
    };
  }, []);
  const handleOpen = (event) => {
    clearTimeout(hystersisTimer);
    hystersisOpen = true;

    setOpenState(true);
  };

  const handleEnter = (event) => {
    const _childrenProps = children.props;

    if (
      event.type === 'mouseover' &&
      _childrenProps.onMouseOver &&
      event.currentTarget === anchorEl
    ) {
      _childrenProps.onMouseOver(event);
    }

    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    if (enterDelay && !hystersisOpen) {
      event.persist();
      enterTimer.current = setTimeout(() => {
        handleOpen(event);
      }, enterDelay);
    } else {
      handleOpen(event);
    }
  };

  const handleClose = (event) => {
    clearTimeout(hystersisTimer);
    hystersisTimer = setTimeout(() => {
      hystersisOpen = false;
    }, 500);
    setOpenState(false);
  };

  const handleLeave = (event) => {
    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    event.persist();
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveDelay);
  };

  const childrenProps = {
    onMouseOver: handleEnter,
    onMouseLeave: handleLeave,
  };

  const popperOptions = useMemo(
    () => ({
      ...defaultPopperOptions,
      placement,
    }),
    [placement]
  );

  return (
    <Fragment>
      {cloneElement(children, { ref: handleRef, ...childrenProps })}
      {open && (
        <Component
          ref={ref}
          className={styles.tooltip}
          popperOptions={popperOptions}
          anchorEl={anchorEl}
          {...rest}
        >
          <>
            {content}
            <div className={styles.arrow} data-popper-arrow />
          </>
        </Component>
      )}
    </Fragment>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
