import React from 'react'
import cx from '../../../utils/classnames'

import { BaseComponent, OverrideProps } from '../BaseComponent'

import { ContainerSizes } from './types'

import styles from './styles.module.scss'

export * from './types'

interface ContainerTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    container?: boolean
    width?: ContainerSizes
    fluid?: boolean
  }
  defaultComponent: D
}

type ContainerProps<
  D extends React.ElementType = ContainerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ContainerTypeMap<P, D>, D>

interface ContainerDefaultProps {
  component: React.ElementType
  width: ContainerSizes
  fluid: boolean
}

const defaultProps: ContainerDefaultProps = {
  component: 'div',
  width: ContainerSizes.auto,
  fluid: false,
}

export const Container: BaseComponent<ContainerTypeMap> & {
  displayName?: string
} = (_props: ContainerProps) => {
  const { component: Component, className, width, fluid, ...rest } = {
    ...defaultProps,
    ..._props,
  }

  const classOfComponent = cx(styles.container, className, {
    [styles[`max-${width}`]]: width !== ContainerSizes.auto,
    [styles.fluid]: fluid,
  })

  return <Component className={classOfComponent} {...rest} />
}

Container.displayName = 'Container'

export default Container
export { ContainerSizes }
