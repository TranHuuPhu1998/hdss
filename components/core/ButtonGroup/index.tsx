import React from 'react'
import cx from '../../../utils/classnames'
import { transformChildrenProps } from '../../../utils/handlePropsOfChildren'

import { BaseComponent, OverrideProps } from '../BaseComponent'
import Button, { ButtonSizes, ButtonVariants } from '../Button'
import ButtonBase from '../ButtonBase'

import styles from './styles.module.scss'

interface ButtonGroupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Pass `variant`  props to `Button` component
     */
    variant?: ButtonVariants
    /**
     * Pass `size`  props to `Button` component
     */
    size?: ButtonSizes
    /**
     * Pass `disabled`  props to `Button` component
     */
    disabled?: boolean
  }
  defaultComponent: D
}

type ButtonGroupProps<
  D extends React.ElementType = ButtonGroupTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonGroupTypeMap<P, D>, D>

interface ButtonGroupDefaultProps {
  component: React.ElementType
  variant?: ButtonVariants
  size?: ButtonSizes
}

const defaultProps: ButtonGroupDefaultProps = {
  component: 'div',
  variant: ButtonVariants.primary,
  size: ButtonSizes.md,
}

const componentsAllowHandle = [Button, ButtonBase]

export const ButtonGroup: BaseComponent<ButtonGroupTypeMap> & {
  displayName: string
} = (props: ButtonGroupProps) => {
  const {
    component: Component,
    className,
    children,
    variant,
    size,
    disabled,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  }

  const classOfComponent = cx(styles.btnGroup, className)

  const transformProps = (child: any): any => ({
    variant,
    size,
    disabled,
    ...child.props,
    className: cx(child.props.className, styles.item),
  })

  const childrenOfComponent = transformChildrenProps(
    children,
    transformProps,
    componentsAllowHandle,
  )

  return (
    <Component {...rest} className={classOfComponent}>
      {childrenOfComponent}
    </Component>
  )
}

ButtonGroup.displayName = 'ButtonGroup'

export default ButtonGroup
