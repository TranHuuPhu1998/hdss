import React, {
  forwardRef,
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'

import cn from '../../../utils/classnames'

// import ChevronBottom from '@hdbank/icons/components/ChevronBottom'
// import ChevronTop from '@hdbank/icons/components/ChevronTop'

import { BaseComponent, OverrideProps } from '../BaseComponent'
import Icon from '../Icon'
import Input, { InputComponent } from '../Input'
import InputAdornment from '../InputAdornment'
import Menu from '../Menu'

import SelectContext from './select-context'
import SelectInput from './SelectInput'

import styles from './styles.module.scss'

interface SelectTypeMap<P = {}, D extends React.ElementType = InputComponent> {
  props: P & {
    /**
     * Custom style for dropdown list.
     */
    menuClassName?: string
    /**
     * The select placeholder, work with value of select is `undefined` or `null`.
     */
    placeholder?: string
  }
  defaultComponent: D
}

export type SelectProps<
  D extends React.ElementType = SelectTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SelectTypeMap<P, D>, D>

interface SelectDefaultProps {
  component: React.ElementType
}

const defaultProps: SelectDefaultProps = {
  component: Input,
}

export type SelectComponent = BaseComponent<SelectTypeMap> & {
  displayName?: string
}

function calculatePopoverStyle (ref: HTMLElement) {
  if (!ref) {
    return {}
  }
  const width = Math.max(ref.getBoundingClientRect().width, 80)
  return {
    width: `${width}px`,
  }
}

function checkIsUsePlaceholder (value: any) {
  return value === undefined || value === null
}

export const Select: SelectComponent = forwardRef(
  (_props: SelectProps, ref: MutableRefObject<any>) => {
    const {
      component: Component,
      children,
      onChange,
      onClick,
      onBlur,
      onFocus,
      menuClassName,
      className,
      placeholder,
      ...rest
    } = {
      ...defaultProps,
      ..._props,
    }

    const wrapperRef = useRef<HTMLElement>()
    const popoverStyle = useRef(null)

    // @ts-ignore
    // const ownerRef = useForkRef(ref, wrapperRef);
    const [open, setOpen] = useState(false)
    const handleOpen = useCallback(
      (e) => {
        if (!open && !rest.disabled) {
          popoverStyle.current = calculatePopoverStyle(wrapperRef.current)
          setOpen(true)
        }
        if (onFocus) {
          onFocus(e)
        }
        if (onClick) {
          return onClick(e)
        }
      },
      [onClick, onFocus, open, rest.disabled],
    )

    const handleClose = useCallback((e) => {
      setOpen(false)
      if (onBlur) {
        return onBlur(e)
      }
    }, [])

    const selectContext = useMemo(
      () => ({
        onChange: (value) => {
          return onChange(value)
        },
        value: rest.value,
      }),
      [onChange, rest.value],
    )

    const afterInput = useMemo(
      () => (
        <InputAdornment
          size={rest.size}
          onClick={handleOpen}
          className={styles[`addon-size-${rest.size}`]}
        >
          <Icon
            className={styles.icon}
            // component={open ? ChevronTop : ChevronBottom}
            component={open ? null : null}
          />
        </InputAdornment>
      ),
      [handleOpen, open, rest.size],
    )

    const display = checkIsUsePlaceholder(rest.value)
      ? placeholder
      : React.Children.toArray(children)
        .filter((child: any) => child?.props?.value === rest.value)
        .map((child: any) => {
          if (typeof child === 'string') {
            return child
          }
          const innerChild = child.props.children
          if (typeof innerChild === 'string') {
            return innerChild
          }
          return ''
        })

    return (
      <>
        <Input
          {...rest}
          className={cn(className, styles.input, { [styles['is-open']]: open })}
          onClick={handleOpen}
          component={SelectInput}
          afterInput={afterInput}
          display={display}
          ref={ref}
          readOnly
          // @ts-ignore
          wrapperRef={wrapperRef}
        />
        {open && (
          <Menu
            anchorRef={wrapperRef}
            onClose={handleClose}
            menuClassName={menuClassName}
            style={popoverStyle.current}
          >
            <SelectContext.Provider value={selectContext}>
              {children}
            </SelectContext.Provider>
          </Menu>
        )}
      </>
    )
  },
)

Select.displayName = 'Select'

export default Select
