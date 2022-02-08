import React, { forwardRef } from 'react'

import useClickOutside from '../../../hooks/useClickOutside'
import useKeydown from '../../../hooks/useKeydown'
import cx from '../../../utils/classnames'

import Backdrop from '../Backdrop'
import { BaseComponent, OverrideProps } from '../BaseComponent'
import Container from '../Container'
import Grid, { GridBreakpoint } from '../Grid'
import Paper, { PaperComponent } from '../Paper'
import Portal, { PortalIds } from '../Portal'

import styles from './styles.module.scss'

interface DialogTypeMap<P = {}, D extends React.ElementType = PaperComponent> {
  props: P & {
    onClose?: () => void
  } & Partial<GridBreakpoint>
  defaultComponent: D
}

type DialogProps<
  D extends React.ElementType = DialogTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<DialogTypeMap<P, D>, D>

type DialogDefaultProps = {
  component: React.ElementType
} & GridBreakpoint

const defaultProps: DialogDefaultProps = {
  component: Paper,
  xs: 12,
  sm: 12,
  md: 6,
  lg: 4,
  xl: 3,
}

// @ts-ignore
export const Dialog: BaseComponent<DialogTypeMap> & {
  displayName?: string
} = forwardRef((_props: DialogProps, ref: any) => {
  const {
    component: Component,
    children,
    onClose,
    xl,
    lg,
    md,
    sm,
    xs,
    className,
    ...rest
  } = {
    ...defaultProps,
    ..._props,
  }

  const [onParentClick, onChildClick] = useClickOutside(onClose)

  useKeydown(27, onClose)

  return (
    <Portal id={PortalIds.dialog}>
      <Backdrop onClick={onParentClick}>
        <Container className={styles.dialog}>
          <Grid container spacing={4} justifyContent="space-around">
            <Grid item xl={xl} lg={lg} md={md} sm={sm} xs={xs}>
              <Component
                className={cx(styles.content, className)}
                onClick={onChildClick}
                elevation={2}
                {...rest}
                ref={ref}
              >
                {children}
              </Component>
            </Grid>
          </Grid>
        </Container>
      </Backdrop>
    </Portal>
  )
})

Dialog.displayName = 'Dialog'

export default Dialog
