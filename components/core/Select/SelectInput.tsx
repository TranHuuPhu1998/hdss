import React, { Fragment } from 'react';
import cx from '../../../utils/classnames';
import { BaseComponent, OverrideProps } from '../BaseComponent';
import { InputComponent } from '../Input';
import Typography, { TypoTypes } from '../Typography';
import styles from './styles.module.scss';

interface SelectInputTypeMap<
  P = {},
  D extends React.ElementType = InputComponent
> {
  props: P & {
    display: React.ReactNode;
  };
  defaultComponent: D;
}

export type SelectInputProps<
  D extends React.ElementType = SelectInputTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SelectInputTypeMap<P, D>, D>;

interface SelectDefaultProps {
  component: React.ElementType;
}
const defaultProps: SelectDefaultProps = {
  component: 'input',
};

export type SelectInputComponent = BaseComponent<SelectInputTypeMap> & {
  displayName?: string;
};

const SelectInput: SelectInputComponent = React.forwardRef(
  (_props: SelectInputProps, ref: any): any => {
    const {
      component: Component,
      className,
      onClick,
      display,
      placeholder,
      ...rest
    } = {
      ...defaultProps,
      ..._props,
    };

    const isDisplayPlaceholder = Array.isArray(display) && display.length === 0;

    return (
      <Fragment>
        <div
          className={cx(
            styles.select,
            styles[`select-size-${rest.size}`],
            className,
            {
              [styles.disabled]: rest.disabled,
              [styles.placeholder]: isDisplayPlaceholder,
            }
          )}
          ref={ref}
          onClick={onClick}
        >
          {isDisplayPlaceholder ? (
            <Typography
              truncate={1}
              type={TypoTypes.inherit}
              className={cx(
                styles['label-text'],
                styles[`label-size-${rest.size}`]
              )}
            >
              {placeholder}
            </Typography>
          ) : (
            <Typography
              truncate={1}
              type={TypoTypes.inherit}
              className={cx(
                styles['label-text'],
                styles[`label-size-${rest.size}`]
              )}
            >
              {display}
            </Typography>
          )}
        </div>
        <Component {...rest} type="hidden" />
      </Fragment>
    );
  }
);

SelectInput.displayName = 'SelectInput';

export default SelectInput;
