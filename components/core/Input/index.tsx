import React, { forwardRef, MutableRefObject } from 'react';
import cx from '../../../utils/classnames';
import { getArrayOf } from '../../../utils/getArrayOf';
import { BaseComponent, OverrideProps } from '../BaseComponent';
import InputBase, { InputBaseType } from '../InputBase';
import styles from './styles.module.scss';
import { InputSizes, InputStatuses } from './types';

export * from './types';
export { InputSizes, InputStatuses };

interface InputTypeMap<P = {}, D extends React.ElementType = InputBaseType> {
  props: P & {
    status?: InputStatuses;
    size?: InputSizes;
    beforeInput?: React.ReactNode;
    afterInput?: React.ReactNode;
    wrapperRef?: MutableRefObject<HTMLDivElement>;
  };
  defaultComponent: D;
}

export type InputProps<
  D extends React.ElementType = InputTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<InputTypeMap<P, D>, D>;

interface InputDefaultProps {
  component: React.ElementType;
  status: InputStatuses;
  size: InputSizes;
}

const defaultProps: InputDefaultProps = {
  component: InputBase,
  size: InputSizes.lg,
  status: InputStatuses.primary,
};

export type InputComponent = BaseComponent<InputTypeMap> & {
  displayName?: string;
};

// @ts-ignore
export const Input: InputComponent = forwardRef(
  (_props: InputProps, ref: any) => {
    const {
      component: Component,
      className,
      status,
      beforeInput,
      afterInput,
      wrapperRef,
      ...rest
    } = {
      ...defaultProps,
      ..._props,
    };

    const classOfRoot = cx(
      styles.root,
      styles[`status-${status}`],
      className,
      rest.disabled && styles.disabled
    );

    const beforeInputs = getArrayOf(beforeInput);
    const afterInputs = getArrayOf(afterInput);

    const classOfInputBase = cx(
      styles.input,
      styles[`size-${rest.size}`],
      beforeInputs.length > 0 && styles['has-before'],
      afterInputs.length > 0 && styles['has-after'],
      rest.disabled && styles.disabled
    );

    return (
      <div className={classOfRoot} role="presentation" ref={wrapperRef}>
        {beforeInputs.map((component, index) =>
          // @ts-ignore
          React.cloneElement(component, {
            key: index.toString(),
            disabled: rest.disabled,
            size: rest.size,
          })
        )}
        <Component
          autoComplete="off"
          {...rest}
          ref={ref}
          className={classOfInputBase}
        />
        {afterInputs.map((component, index) =>
          // @ts-ignore
          React.cloneElement(component, {
            key: index.toString(),
            disabled: rest.disabled,
            size: rest.size,
          })
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
