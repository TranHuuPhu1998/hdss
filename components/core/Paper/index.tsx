import React, { forwardRef } from 'react';
import cx from '../../../utils/classnames';

import { BaseComponent, OverrideProps } from '../BaseComponent';

import styles from './styles.module.scss';
import { PaperRadius } from './types';

export * from './types';

type Elevation = 0 | 1 | 2 | 3 | 4;

interface PaperTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Border radius value
     */
    radius?: PaperRadius;
    /**
     * Callback fired on click to component
     */
    onClick?: React.EventHandler<React.SyntheticEvent>;

    elevation?: Elevation;
  };
  defaultComponent: D;
}

export type PaperProps<
  D extends React.ElementType = PaperTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<PaperTypeMap<P, D>, D>;

interface PaperDefaultProps {
  component: React.ElementType;
  radius: PaperRadius;
  elevation: Elevation;
}

const defaultProps: PaperDefaultProps = {
  component: 'div',
  radius: PaperRadius.regular,
  elevation: 0,
};

export type PaperComponent = BaseComponent<PaperTypeMap> & {
  displayName?: string;
};

export const Paper: PaperComponent = forwardRef((props: PaperProps, ref) => {
  const {
    component: Component,
    className,
    elevation,
    radius,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  };

  const classOfComponent = cx(styles.paper, className, {
    [styles[`radius-${String(radius)}`]]: radius,
    [styles[`elevation-${String(elevation)}`]]: !!elevation,
  });

  return <Component {...rest} className={classOfComponent} ref={ref} />;
});

Paper.displayName = 'Paper';

export default Paper;
