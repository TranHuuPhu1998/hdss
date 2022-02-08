import React from 'react'

import cx from '../../../utils/classnames'

import { BaseComponent, OverrideProps } from '../BaseComponent'

import styles from './styles.module.scss'

interface DialogBodyTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {}
  defaultComponent: D
}

type DialogBodyProps<
  D extends React.ElementType = DialogBodyTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<DialogBodyTypeMap<P, D>, D>

interface DialogBodyDefaultProps {
  component: React.ElementType
}

const defaultProps: DialogBodyDefaultProps = {
  component: 'div',
}

export const DialogBody: BaseComponent<DialogBodyTypeMap> & {
  displayName?: string
} = (_props: DialogBodyProps) => {
  const { component: Component, className, ...rest } = {
    ...defaultProps,
    ..._props,
  }

  return <Component {...rest} className={cx(styles['dl-body'], className)} />
}

DialogBody.displayName = 'DialogBody'

export default DialogBody
