import React, { useMemo } from 'react';
import cx from '../../../utils/classnames';

// import Times from '@hdbank/icons/components/Times'

import { BaseComponent, OverrideProps } from '../BaseComponent';
import Icon from '../Icon';

import styles from './styles.module.scss';

interface DialogCoverTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    image: string;
    onClose?: () => void;
  };
  defaultComponent: D;
}

type DialogCoverProps<
  D extends React.ElementType = DialogCoverTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<DialogCoverTypeMap<P, D>, D>;

interface DialogFooterDefaultProps {
  component: React.ElementType;
}

const defaultProps: DialogFooterDefaultProps = {
  component: 'div',
};

export const DialogCover: BaseComponent<DialogCoverTypeMap> & {
  displayName?: string;
} = (_props: DialogCoverProps) => {
  const {
    component: Component,
    className,
    children,
    onClose,
    image,
    style,
    ...rest
  } = {
    ...defaultProps,
    ..._props,
  };

  const contentOfClose = onClose && (
    <span className={styles.close} onClick={onClose} role="presentation">
      <Icon
        // component={Times}
        component={null}
        color="unset"
        width="16px"
        height="16px"
      />
    </span>
  );

  const styleOfRoot = useMemo(
    () => ({ ...style, backgroundImage: `url('${image}')` }),
    [image, style]
  );

  return (
    <Component
      {...rest}
      className={cx(styles['dl-cover'], className)}
      style={styleOfRoot}
    >
      {contentOfClose}
    </Component>
  );
};

DialogCover.displayName = 'DialogCover';

export default DialogCover;
