export type Diff<T, U> = T extends U ? never : T

export type EventOnChange<T = unknown> = (value: T) => void

export enum Colors {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Warning = 'warning',
  Default = 'default',
}

export enum Sizes {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

export enum Margins {
  none = 'none',
  normal = 'normal',
  dense = 'dense',
}

export enum Variants {
  standard = 'standard',
  outlined = 'outlined',
  filled = 'filled',
}

export enum LabelPlacements {
  end = 'end',
  start = 'start',
}

export enum Edgies {
  start = 'start',
  end = 'end',
}
