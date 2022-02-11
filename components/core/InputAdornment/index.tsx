import React, { forwardRef } from 'react';

import cx from '../../../utils/classnames';

import { BaseComponent, OverrideProps } from '../BaseComponent';
import { InputSizes } from '../Input';
import styles from './styles.module.scss';

interface InputAdornmentTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    size?: InputSizes;
  };
  defaultComponent: D;
}

type InputAdornmentProps<
  D extends React.ElementType = InputAdornmentTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<InputAdornmentTypeMap<P, D>, D>;

interface InputAdornmentDefaultProps {
  component: React.ElementType;
  size: InputSizes;
}

const defaultProps: InputAdornmentDefaultProps = {
  component: 'div',
  size: InputSizes.lg,
};

export const InputAdornment: BaseComponent<InputAdornmentTypeMap> & {
  displayName?: string;
} = forwardRef((_props: InputAdornmentProps, ref) => {
  const {
    component: Component,
    className,
    size,
    ...rest
  } = {
    ...defaultProps,
    ..._props,
  };

  const classOfComponent = cx(
    styles.addon,
    {
      [styles[`addon-size-${size}`]]: !!size,
    },
    className
  );

  return <Component {...rest} ref={ref} className={classOfComponent} />;
});

export default InputAdornment;
