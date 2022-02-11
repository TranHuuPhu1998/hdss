import React from 'react';
import cx from '../../../utils/classnames';

import { BaseComponent, OverrideProps } from '../BaseComponent';

import styles from './styles.module.scss';

interface DialogFooterTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {};
  defaultComponent: D;
}

type DialogFooterProps<
  D extends React.ElementType = DialogFooterTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<DialogFooterTypeMap<P, D>, D>;

interface DialogFooterDefaultProps {
  component: React.ElementType;
}

const defaultProps: DialogFooterDefaultProps = {
  component: 'div',
};

export const DialogFooter: BaseComponent<DialogFooterTypeMap> & {
  displayName?: string;
} = (_props: DialogFooterProps) => {
  const {
    component: Component,
    className,
    ...rest
  } = {
    ...defaultProps,
    ..._props,
  };
  return <Component {...rest} className={cx(styles['dl-footer'], className)} />;
};

DialogFooter.displayName = 'DialogFooter';

export default DialogFooter;
