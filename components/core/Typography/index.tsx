import React from 'react'
import cn from '../../../utils/classnames'

import { BaseComponent, OverrideProps } from '../BaseComponent'

import { TypoTypes, TypoVariants, TypoWeights } from './types'

import styles from './styles.module.scss'

export * from './types'

interface TypoTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    type?: TypoTypes
    weight?: TypoWeights
    variant?: TypoVariants
    truncate?: number
  }
  defaultComponent: D
}

type TypoProps<
  D extends React.ElementType = TypoTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TypoTypeMap<P, D>, D>

interface TypoDefaultProps {
  component: React.ElementType
  type: TypoTypes
  weight: TypoWeights
  variant: TypoVariants
}

const defaultProps: TypoDefaultProps = {
  component: 'span',
  type: TypoTypes.default,
  weight: TypoWeights.regular,
  variant: TypoVariants.body2,
}

export const Typography: BaseComponent<TypoTypeMap> & {
  displayName?: string
} = (_props: TypoProps) => {
  const {
    component: Component,
    className,
    variant,
    type,
    weight,
    truncate,
    ...rest
  } = { ...defaultProps, ..._props }

  const hasTruncate = truncate > 0
  const classOfComponent = cn(className, {
    [styles.truncate]: hasTruncate,
    [styles[`truncate-${truncate}`]]: hasTruncate,
    [styles[`variant-${String(variant)}`]]: variant,
    [styles[`weight-${String(weight)}`]]: weight,
    [styles[`type-${String(type)}`]]: type,
  })

  return <Component className={classOfComponent} {...rest} />
}

Typography.displayName = 'Typography'

export default Typography
export { TypoVariants, TypoTypes, TypoWeights }
