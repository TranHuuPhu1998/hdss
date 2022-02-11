import React from 'react';
import cx from '../../../utils/classnames';

import { BaseComponent, OverrideProps } from '../BaseComponent';
import styles from './styles.module.scss';

interface IconTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    width?: string | number;
    height?: string | number;
  };
  defaultComponent: D;
}

export type IconProps<
  D extends React.ElementType = IconTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<IconTypeMap<P, D>, D>;

interface IconDefaultProps {
  component: React.ElementType;
  width?: number;
  height?: number;
}

const defaultProps: IconDefaultProps = {
  component: 'svg',
  width: 24,
  height: 24,
};

export const Icon: BaseComponent<IconTypeMap> & {
  displayName: string;
} = (_props: IconProps) => {
  const {
    component: Component,
    className,
    ...rest
  } = {
    ...defaultProps,
    ..._props,
  };
  const classOfComponent = cx(styles.icon, className);

  return (
    <Component
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...rest}
      className={classOfComponent}
    />
  );
};

Icon.displayName = 'Icon';

export default Icon;
