import React, {
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';

import cn from '../../../utils/classnames';
import compose from '../../../utils/compose';

import { BaseComponent, OverrideProps } from '../BaseComponent';
import Icon, { IconProps } from '../Icon';
import InputBase from '../InputBase';
import { Context } from '../RadioGroup';

import styles from './styles.module.scss';
import { getIconByStatus, getStatusOfRadio } from './utils';

export * from './types';

interface RadioTypeMap<P = {}, D extends React.ElementType = 'label'> {
  props: P & {
    /**
     * Set name of `InputBase` component
     */
    name?: string;
    /**
     * Use ref of `Icon` component
     */
    iconRef?: React.Ref<unknown>;
    /**
     * Pass all props to `Icon` component
     */
    iconProps?: IconProps;
    /**
     * Set component is `checked`
     */
    checked?: boolean;
    /**
     * Value of component
     */
    value: string | number | boolean;
    /**
     * Callback fired on change value of checkbox, value is `boolean`
     */
    onChange?: React.EventHandler<React.SyntheticEvent>;
    /**
     * Set component is `disabled`
     */
    disabled?: boolean;
  };
  defaultComponent: D;
}

export type RadioProps<
  D extends React.ElementType = RadioTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<RadioTypeMap<P, D>, D>;

interface RadioDefaultProps {
  component: React.ElementType;
  disabled: boolean;
}

const defaultProps: RadioDefaultProps = {
  component: 'label',
  disabled: false,
};

export type RadioComponent = BaseComponent<RadioTypeMap> & {
  displayName?: string;
};

export const Radio: RadioComponent = forwardRef((props: RadioProps, ref) => {
  const {
    component: Component,
    className,
    disabled,
    onChange,
    value,
    checked,
    name,
    iconRef,
    iconProps,
    children,
    ...rest
  } = { ...defaultProps, ...props };

  const context = useContext(Context);
  const checkboxName = name || context.name;
  const isDisabled = disabled || context.disabled;
  const checkIsBoolean = typeof checked === 'boolean';
  const isChecked = checkIsBoolean ? checked : context.selected === value;
  const onChangeComposed = useCallback(compose(onChange, context.onChange), [
    onChange,
    context.onChange,
  ]);

  const refOfInput = useRef();
  const statusOfRadio = getStatusOfRadio(isChecked);
  const iconOfRadio = getIconByStatus(statusOfRadio);

  const classOfRoot = cn(styles.root, className, {
    [styles.disabled]: isDisabled,
    [styles.checked]: isChecked,
  });

  const _children = useMemo(
    () => children && <span className={styles.content}>{children}</span>,
    [children, styles.content]
  );

  return (
    <Component {...rest} ref={ref} className={classOfRoot} role="radio">
      <Icon
        viewBox="2 2 20 20"
        {...iconProps}
        ref={iconRef}
        className={styles.icon}
        component={iconOfRadio}
      />
      {_children}
      <InputBase
        readOnly
        type="radio"
        ref={refOfInput}
        name={checkboxName}
        value={value}
        className={styles.input}
        checked={isChecked}
        onChange={onChangeComposed}
      />
    </Component>
  );
});

Radio.displayName = 'Radio';

export default Radio;
