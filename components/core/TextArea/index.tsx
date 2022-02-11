import React from 'react';

import { BaseComponent, OverrideProps } from '../BaseComponent';

import Input, { InputProps, InputSizes } from '../Input';

import { useAutoHeight } from './hook';
import { getBoxSize, getLineHeight } from './utils';

interface TextAreaTypeMap<P = {}, D extends React.ElementType = 'textarea'> {
  props: P &
    InputProps & {
      /**
       * Max rows number of textarea component, default is: `Infinity`
       */
      maxRows?: number;
      /**
       * Min rows number of textarea component, default is: `1`
       */
      minRows?: number;
    };
  defaultComponent: D;
}

type TextAreaProps<
  D extends React.ElementType = TextAreaTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TextAreaTypeMap<P, D>, D>;

interface TextAreaDefaultProps {
  component: React.ElementType;
  maxRows: number;
  minRows: number;
  size: InputSizes;
}

const defaultProps: TextAreaDefaultProps = {
  component: 'textarea',
  minRows: 1,
  maxRows: Infinity,
  size: InputSizes.lg,
};

export type TextAreaComponent = BaseComponent<TextAreaTypeMap> & {
  displayName?: string;
};

export const TextArea: TextAreaComponent = (_props: TextAreaProps) => {
  const { minRows, maxRows, ...rest } = {
    ...defaultProps,
    ..._props,
  };

  const [otherInput, detailsOfSize] = useAutoHeight({ refInput: rest.ref });

  const elementOfInput = rest.ref && (rest.ref as any).current;
  const lineHeight = getLineHeight(elementOfInput);
  const minHeight = lineHeight + getBoxSize(elementOfInput);

  const rowsOfInput = Math.min(
    Math.max(detailsOfSize.linesNumber, minRows),
    maxRows
  );

  return (
    <>
      <Input
        {...rest}
        row={rowsOfInput}
        style={{
          ...rest.style,
          minHeight,
          overflow: detailsOfSize.overflow,
        }}
      />
      {otherInput}
    </>
  );
};

TextArea.displayName = 'TextArea';

export default TextArea;
