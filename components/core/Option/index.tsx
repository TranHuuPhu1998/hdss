import React, { useContext } from 'react';

import { BaseComponent, OverrideProps } from '../BaseComponent';
import { InputSizes } from '../Input';
import ListItemText from '../ListItemText';
import ListItemIcon from './../ListItemIcon';
import MenuItem, { MenuItemComponent } from '../MenuItem';
import SelectContext from '../Select/select-context';
import CheckMark from 'icons/CheckMark';

interface OptionTypeMap<
  P = {},
  D extends React.ElementType = MenuItemComponent,
> {
  props: P & {
    value: any;
    size?: InputSizes;
  };
  defaultComponent: D;
}

export type OptionProps<
  D extends React.ElementType = OptionTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<OptionTypeMap<P, D>, D>;

interface OptionDefaultProps {
  component: React.ElementType;
}

const defaultProps: OptionDefaultProps = {
  component: MenuItem,
};

export type OptionComponent = BaseComponent<OptionTypeMap> & {
  displayName?: string;
};

export const Option: OptionComponent = (props: OptionProps) => {
  const {
    component: Component,
    value: valueProps,
    children,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  };

  const selectContext = useContext(SelectContext);

  function handleClick() {
    if (!rest.disabled && valueProps !== selectContext.value) {
      selectContext.onChange(valueProps, children?.toString() || valueProps);
    }
  }

  const activated = selectContext.value === valueProps;
  return (
    <Component
      {...rest}
      onClick={handleClick}
      activated={activated}
      size={rest.size}
    >
      <ListItemText size={rest.size}>{children}</ListItemText>
      {activated && (
        <ListItemIcon
          icon={CheckMark}
          size={rest.size}
        />
      )}
    </Component>
  );
};

Option.displayName = 'Option';

export default Option;
