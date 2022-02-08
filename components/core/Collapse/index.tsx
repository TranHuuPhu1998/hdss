import React, { useRef, useEffect, forwardRef } from 'react'
import { Transition } from 'react-transition-group'
import cx from '../../../utils/classnames'

import { BaseComponent, OverrideProps } from '../BaseComponent'
import styles from './styles.module.scss'

function getAutoHeightDuration (height: number): number {
  if (!height) {
    return 0
  }

  const constant = height / 36

  // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10)
};

function getTransitionProps (props: any, options: any): {[key: string]: any} {
  const { timeout, style = {} } = props

  return {
    duration:
      style.transitionDuration || typeof timeout === 'number'
        ? timeout
        : timeout[options.mode] || 0,
    delay: style.transitionDelay,
  }
}

interface CollapseTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The height of the container when collapsed.
     */
    collapsedHeight?: number
    /**
     * If `true`, the component will transition in.
     */
    in?: boolean
    /**
     * @ignore
     */
    onEnter?: (node: HTMLElement, isAppearing: boolean) => void
    /**
     * @ignore
     */
    onEntered?: (node: HTMLElement, isAppearing: boolean) => void
    /**
     * @ignore
     */
    onEntering?: (node: HTMLElement, isAppearing: boolean) => void
    /**
     * @ignore
     */
    onExit?: (node: HTMLElement) => void
    /**
     * @ignore
     */
    onExiting?: (node: HTMLElement) => void
    /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     *
     * Set to 'auto' to automatically calculate transition time based on height.
     */
    timeout?: string | number
  }
  defaultComponent: D
}

type CollapseProps<
  D extends React.ElementType = CollapseTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<CollapseTypeMap<P, D>, D>

interface CollapseDefaultProps {
  component: React.ElementType
  collapsedHeight: number
  timeout: number
}

const defaultProps: CollapseDefaultProps = {
  component: 'div',
  collapsedHeight: 0,
  timeout: 300,
}

export const Collapse: BaseComponent<CollapseTypeMap> & {
  displayName?: string
} = forwardRef((props: CollapseProps, ref) => {
  const {
    children,
    className,
    collapsedHeight: collapsedHeightProp,
    component: Component,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExiting,
    style,
    timeout,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  }

  const timer = useRef(null)
  const wrapperRef = useRef(null)
  const autoTransitionDuration = useRef(null)
  const collapsedHeight = `${collapsedHeightProp}px`

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const handleEnter = (node: HTMLElement, isAppearing: boolean): void => {
    node.style.height = collapsedHeight

    if (onEnter) {
      onEnter(node, isAppearing)
    }
  }

  const handleEntering = (node: HTMLElement, isAppearing: boolean): void => {
    const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0

    const { duration: transitionDuration } = getTransitionProps(
      { style, timeout },
      {
        mode: 'enter',
      },
    )

    if (timeout === 'auto') {
      const duration2 = getAutoHeightDuration(wrapperHeight)
      node.style.transitionDuration = `${duration2}ms`
      autoTransitionDuration.current = duration2
    } else {
      node.style.transitionDuration =
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`
    }

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    node.style.height = `${wrapperHeight}px`

    if (onEntering) {
      onEntering(node, isAppearing)
    }
  }

  const handleEntered = (node: HTMLElement, isAppearing: boolean): void => {
    node.style.height = 'auto'

    if (onEntered) {
      onEntered(node, isAppearing)
    }
  }

  const handleExit = (node: HTMLElement): void => {
    const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    node.style.height = `${wrapperHeight}px`

    if (onExit) {
      onExit(node)
    }
  }

  const handleExiting = (node: HTMLElement): void => {
    const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0

    const { duration: transitionDuration } = getTransitionProps(
      { style, timeout },
      {
        mode: 'exit',
      },
    )

    if (timeout === 'auto') {
      const duration2 = getAutoHeightDuration(wrapperHeight)
      node.style.transitionDuration = `${duration2}ms`
      autoTransitionDuration.current = duration2
    } else {
      node.style.transitionDuration =
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`
    }

    node.style.height = collapsedHeight

    if (onExiting) {
      onExiting(node)
    }
  }

  const addEndListener = (_: any, next: any): void => {
    if (timeout === 'auto') {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      timer.current = setTimeout(next, autoTransitionDuration.current || 0)
    }
  }

  return (
    <Transition
      in={inProp}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onEntering={handleEntering}
      onExit={handleExit}
      onExiting={handleExiting}
      addEndListener={addEndListener}
      timeout={timeout === 'auto' ? null : timeout}
      {...rest}
    >
      {(state: any, childProps: any) => (
        <Component
          ref={ref}
          className={cx(styles.collapse, className, {
            [styles.entered]: state === 'entered',
            [styles.hidden]: state === 'exited' && !inProp && collapsedHeight === '0px',
          })}
          style={{
            minHeight: collapsedHeight,
            ...style,
          }}
          {...childProps}
        >
          <div className={styles.wrapper} ref={wrapperRef}>
            <div className={styles.wrapperInner}>{children}</div>
          </div>
        </Component>
      )}
    </Transition>
  )
})

Collapse.displayName = 'Collapse'

export default Collapse
