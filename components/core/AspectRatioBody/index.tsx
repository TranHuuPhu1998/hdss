import React from 'react';
import cx from '../../../utils/classnames';

import { BaseComponent, OverrideProps } from '../BaseComponent';
import styles from './styles.module.scss';

interface AspectRatioBodyTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {};
  defaultComponent: D;
}

type AspectRatioBodyProps<
  D extends React.ElementType = AspectRatioBodyTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<AspectRatioBodyTypeMap<P, D>, D>;

interface AspectRatioBodyDefaultProps {
  component: React.ElementType;
}

const defaultProps: AspectRatioBodyDefaultProps = {
  component: 'div',
};

export const AspectRatioBody: BaseComponent<AspectRatioBodyTypeMap> & {
  displayName?: string;
} = (_props: AspectRatioBodyProps) => {
  const {
    component: Component,
    className,
    ...rest
  } = {
    ...defaultProps,
    ..._props,
  };

  const classOfRoot = cx(styles.aspectRatioBody, className);

  return <Component {...rest} className={classOfRoot} />;
};

AspectRatioBody.displayName = 'AspectRatioBody';

export default AspectRatioBody;
