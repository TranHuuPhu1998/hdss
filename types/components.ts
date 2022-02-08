export enum GridAlignContent {
  stretch = 'stretch', // default
  center = 'center',
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  spaceBetween = 'space-between',
  spaceAround = 'space-around',
}

export enum GridAlignItems {
  flexStart = 'flex-start',
  center = 'center',
  flexEnd = 'flex-end',
  stretch = 'stretch', // default
  baseline = 'baseline',
}

export enum GridDirection {
  row = 'row', // default
  rowReverse = 'row-reverse',
  column = 'column',
  columnReverse = 'column-reverse',
}

export enum GridJustifyContent {
  flexStart = 'flex-start', // default
  center = 'center',
  flexEnd = 'flex-end',
  spaceBetween = 'space-between',
  spaceAround = 'space-around',
  spaceEvenly = 'space-evenly',
}

export enum GridWrap {
  nowrap = 'nowrap',
  wrap = 'wrap', // default
  wrapReverse = 'wrap-reverse',
}

/**
 * Read more at https://www.w3schools.com/tags/att_input_type.asp
 */
export enum InputTypes {
  button = 'button',
  checkbox = 'checkbox',
  color = 'color',
  date = 'date',
  datetimeLocal = 'datetime-local',
  email = 'email',
  file = 'file',
  hidden = 'hidden',
  image = 'image',
  month = 'month',
  number = 'number',
  password = 'password',
  radio = 'radio',
  range = 'range',
  reset = 'reset',
  search = 'search',
  submit = 'submit',
  tel = 'tel',
  text = 'text',
  time = 'time',
  url = 'url',
  week = 'week',
}
