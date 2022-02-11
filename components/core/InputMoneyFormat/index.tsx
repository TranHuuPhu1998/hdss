import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';

import { BaseComponent, OverrideProps } from '../BaseComponent';

export interface InputMoneyFormatTypeMap<
  P = {},
  D extends React.ElementType = 'input'
> {
  props: P & {
    thousandSeparator?: string;
    decimalSeparator?: string;
    suffix?: string;
  };
  defaultComponent: D;
}

type InputMoneyFormatProps<
  D extends React.ElementType = InputMoneyFormatTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<InputMoneyFormatTypeMap<P, D>, D>;

interface InputMoneyFormatDefaultProps {
  component: React.ElementType;
  thousandSeparator: string;
  decimalSeparator: string;
  suffix: string;
}

const defaultProps: InputMoneyFormatDefaultProps = {
  component: NumberFormat,
  thousandSeparator: '.',
  decimalSeparator: ',',
  suffix: ' đ',
};

export type InputMoneyFormatType = BaseComponent<InputMoneyFormatTypeMap> & {
  displayName?: string;
};

// @ts-ignore
export const InputMoneyFormat: InputMoneyFormatType = forwardRef(
  (props: InputMoneyFormatProps, ref: any) => {
    const { component: Component, ...rest } = {
      ...defaultProps,
      ...props,
    };

    return <Component {...rest} ref={ref} />;
  }
);

InputMoneyFormat.displayName = 'InputMoneyFormat';
export default InputMoneyFormat;
