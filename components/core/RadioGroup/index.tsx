import React, { forwardRef } from 'react'
import cx from '../../../utils/classnames'

import { BaseComponent, OverrideProps } from '../BaseComponent'
import { RadioProps } from '../Radio'

import Context from './Context'
import styles from './styles.module.scss'

export { default as Context } from './Context'

interface RadioGroupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Selected value of radio group
     */
    selected: string | number | boolean
    /**
     * Pass `name` props to `Radio` components
     */
    name?: RadioProps['name']
    /**
     * Callback fired on change, pass to `RadioGroup` components
     */
    onChange: RadioProps['onChange']
    /**
     * Pass `disabled` props to `RadioGroup` components
     */
    disabled?: RadioProps['disabled']
  }
  defaultComponent: D
}

type RadioGroupProps<
  D extends React.ElementType = RadioGroupTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<RadioGroupTypeMap<P, D>, D>

interface RadioGroupDefaultProps {
  component: React.ElementType
  disabled: boolean
}

const defaultProps: RadioGroupDefaultProps = {
  component: 'div',
  disabled: false,
}

export type RadioGroupComponent = BaseComponent<RadioGroupTypeMap> & {
  displayName?: string
}

export const RadioGroup: RadioGroupComponent = forwardRef(
  (props: RadioGroupProps, ref) => {
    const {
      component: Component,
      className,
      name,
      disabled,
      selected,
      onChange,
      children,
      ...rest
    } = {
      ...defaultProps,
      ...props,
    }

    const classOfComponent = cx(styles.root, className, {
      [styles.disabled]: disabled,
    })

    const context = {
      name,
      disabled,
      selected,
      onChange,
    }

    return (
      <Component {...rest} ref={ref} className={classOfComponent}>
        <Context.Provider value={context}>{children}</Context.Provider>
      </Component>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'

export default RadioGroup
