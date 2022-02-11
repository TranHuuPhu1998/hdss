import React, { useMemo } from 'react';
import cx from '../../../utils/classnames';

import { BaseComponent, OverrideProps } from '../BaseComponent';
import Icon from '../Icon';
import { InputSizes } from '../Input';

import styles from './styles.module.scss';

interface ListItemTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Set icon for item
     */
    icon?: React.ElementType;
    size?: InputSizes;
  };
  defaultComponent: D;
}

type ListItemProps<
  D extends React.ElementType = ListItemTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ListItemTypeMap<P, D>, D>;

interface ListItemDefaultProps {
  component: React.ElementType;
}

const defaultProps: ListItemDefaultProps = {
  component: 'div',
};

export const ListItemIcon: BaseComponent<ListItemTypeMap> & {
  displayName?: string;
} = (props: ListItemProps) => {
  const {
    component: Component,
    className,
    children,
    icon,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  };

  const classOfComponent = cx(
    styles.listItemIcon,
    styles[`listItemIcon-size-${rest.size}`],
    className
  );
  const contentOfChildren = useMemo(
    () =>
      !icon ? (
        children
      ) : (
        <Icon className={styles[`icon-size-${rest.size}`]} component={icon} />
      ),
    [icon, children]
  );

  return (
    <Component {...rest} className={classOfComponent}>
      {contentOfChildren}
    </Component>
  );
};

ListItemIcon.displayName = 'ListItemIcon';

export default ListItemIcon;
