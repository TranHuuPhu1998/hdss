import * as React from 'react'

export default (
  childComponent: string | React.JSXElementConstructor<any>,
  allowComponents: React.ElementType[],
): boolean => allowComponents.some((comp) => comp === childComponent)
