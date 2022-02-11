import React, { SyntheticEvent } from 'react';

export interface CheckboxGroupContextValue {
  name?: string;
  disabled?: boolean;
  selected: string | number | boolean;
  onChange: (event: SyntheticEvent) => void;
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue>(
  {} as CheckboxGroupContextValue
);

export default CheckboxGroupContext;
