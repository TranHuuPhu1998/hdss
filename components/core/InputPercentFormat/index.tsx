import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';

import { BaseComponent, OverrideProps } from '../BaseComponent';

import { formatPercent } from './utils';

export interface InputPercentFormatTypeMap<
  P = {},
  D extends React.ElementType = 'input'
> {
  props: P & {
    format?: (value: string) => any;
  };
  defaultComponent: D;
}

type InputPercentFormatProps<
  D extends React.ElementType = InputPercentFormatTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<InputPercentFormatTypeMap<P, D>, D>;

interface InputPercentFormatDefaultProps {
  component: React.ElementType;
  format: (value: string) => any;
}

const defaultProps: InputPercentFormatDefaultProps = {
  component: NumberFormat,
  format: formatPercent,
};

export type InputPercentFormatType =
  BaseComponent<InputPercentFormatTypeMap> & {
    displayName?: string;
  };

export const InputPercentFormat: InputPercentFormatType = forwardRef(
  (props: InputPercentFormatProps, ref: any) => {
    const { component: Component, ...rest } = {
      ...defaultProps,
      ...props,
    };

    return <Component {...rest} ref={ref} />;
  }
);

InputPercentFormat.displayName = 'InputPercentFormat';

export default InputPercentFormat;
