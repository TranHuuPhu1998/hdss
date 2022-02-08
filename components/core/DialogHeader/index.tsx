import React from 'react';
import cx from '../../../utils/classnames';

import Times from 'icons/Times'

import { BaseComponent, OverrideProps } from '../BaseComponent';
import Icon from '../Icon';

import styles from './styles.module.scss';

interface DialogHeaderTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    onClose?: () => void;
  };
  defaultComponent: D;
}

type DialogHeaderProps<
  D extends React.ElementType = DialogHeaderTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<DialogHeaderTypeMap<P, D>, D>;

interface DialogHeaderDefaultProps {
  component: React.ElementType;
}

const defaultProps: DialogHeaderDefaultProps = {
  component: 'div',
};

export const DialogHeader: BaseComponent<DialogHeaderTypeMap> & {
  displayName?: string;
} = (_props: DialogHeaderProps) => {
  const {
    component: Component,
    className,
    onClose,
    children,
    ...rest
  } = {
    ...defaultProps,
    ..._props,
  };

  const contentOfClose = onClose && (
    <span className={styles.close} onClick={onClose} role="presentation">
      {/* @ts-ignore */}
      <Icon
        component={Times}
        color="#BCC0CC"
        width={16}
        height={16}
      />
    </span>
  );

  return (
    <Component {...rest} className={cx(styles['dl-header'], className)}>
      <span className={styles.title}>{children}</span>
      {contentOfClose}
    </Component>
  );
};

DialogHeader.displayName = 'DialogHeader';

export default DialogHeader;
