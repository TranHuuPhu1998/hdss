import React, { forwardRef } from 'react';
import cx from '../../../utils/classnames';

import { BaseComponent, OverrideProps } from '../BaseComponent';
import styles from './styles.module.scss';

export interface ButtonBaseTypeMap<
  P = {},
  D extends React.ElementType = 'div'
> {
  props: P & {};
  defaultComponent: D;
}

type ButtonBaseProps<
  D extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonBaseTypeMap<P, D>, D>;

interface ButtonBaseDefaultProps {
  component: React.ElementType;
}

const defaultProps: ButtonBaseDefaultProps = {
  component: 'button',
};

export const ButtonBase: BaseComponent<ButtonBaseTypeMap> & {
  displayName?: string;
} = forwardRef((_props: ButtonBaseProps, ref) => {
  const {
    component: Component,
    className,
    ...rest
  } = {
    ...defaultProps,
    ..._props,
  };

  const classOfComponent = cx(styles.btn, className);

  return <Component {...rest} ref={ref} className={classOfComponent} />;
});

ButtonBase.displayName = 'ButtonBase';

export default ButtonBase;
