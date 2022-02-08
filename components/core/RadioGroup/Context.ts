import React, { SyntheticEvent } from 'react'

export interface CheckboxGroupContext {
  name?: string
  disabled?: boolean
  selected: string | number | boolean
  onChange: (event: SyntheticEvent) => void
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContext>(
  {} as CheckboxGroupContext,
)

export default CheckboxGroupContext
