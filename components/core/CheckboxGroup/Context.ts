import React, { SyntheticEvent } from 'react'

export interface CheckboxGroupContext {
  name?: string
  disabled?: boolean
  selected: string[]
  onChange: (event: SyntheticEvent) => void
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const CheckboxGroupContext = React.createContext<CheckboxGroupContext>(
  {} as CheckboxGroupContext,
)

export default CheckboxGroupContext
