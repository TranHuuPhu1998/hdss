import React from 'react'
import cx from '../../../utils/classnames'

import { BaseComponent, OverrideProps } from '../BaseComponent'
import { AspectRatios } from './types'

import styles from './styles.module.scss'

export * from './types'

interface AspectRatioTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    ratio: AspectRatios
  }
  defaultComponent: D
}

type AspectRatioProps<
  D extends React.ElementType = AspectRatioTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<AspectRatioTypeMap<P, D>, D>

interface AspectRatioDefaultProps {
  component: React.ElementType
}

const defaultProps: AspectRatioDefaultProps = {
  component: 'div',
}

export const AspectRatio: BaseComponent<AspectRatioTypeMap> & {
  displayName?: string
} = (_props: AspectRatioProps) => {
  const { component: Component, className, ratio, ...rest } = {
    ...defaultProps,
    ..._props,
  }

  const classOfRoot = cx(styles.aspectRatio, className, {
    [styles[`ratio-${String(ratio)}`]]: ratio,
  })

  return <Component {...rest} className={classOfRoot} />
}

AspectRatio.displayName = 'AspectRatio'

export default AspectRatio
