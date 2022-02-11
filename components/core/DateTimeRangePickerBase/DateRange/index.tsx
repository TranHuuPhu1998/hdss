import addDays from 'date-fns/addDays'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'
import isBefore from 'date-fns/isBefore'
import isWithinInterval from 'date-fns/isWithinInterval'
import max from 'date-fns/max'
import min from 'date-fns/min'

import React, { Component } from 'react'

import cx from '../../../../utils/classnames'
import Calendar from '../Calendar'
import { findNextRangeIndex } from '../utils'
import styles from './styles.module.scss'

class DateRange extends Component<any, any> {
  static defaultProps = {
    classNames: {},
    ranges: [],
    moveRangeOnFirstSelection: false,
    rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
    disabledDates: [],
  }

  calendar: any

  constructor (props, context) {
    super(props, context)
    this.setSelection = this.setSelection.bind(this)
    this.handleRangeFocusChange = this.handleRangeFocusChange.bind(this)
    this.updatePreview = this.updatePreview.bind(this)
    this.calcNewSelection = this.calcNewSelection.bind(this)
    this.setTime = this.setTime.bind(this)
    this.state = {
      focusedRange: props.initialFocusedRange || [
        findNextRangeIndex(props.ranges),
        0,
      ],
      preview: null,
    }
  }

  calcNewSelection (value, isSingleValue = true) {
    const focusedRange = this.props.focusedRange || this.state.focusedRange
    const {
      ranges,
      onChange,
      maxDate,
      moveRangeOnFirstSelection,
      disabledDates,
    } = this.props
    const focusedRangeIndex = focusedRange[0]
    const selectedRange = ranges[focusedRangeIndex]
    if (!selectedRange || !onChange) return {}

    let { startDate, endDate } = selectedRange
    if (!endDate) endDate = new Date(startDate)
    let nextFocusRange
    if (!isSingleValue) {
      startDate = value.startDate
      endDate = value.endDate
    } else if (focusedRange[1] === 0) {
      // startDate selection
      const dayOffset = differenceInCalendarDays(endDate, startDate)
      startDate = value
      endDate = moveRangeOnFirstSelection ? addDays(value, dayOffset) : null
      if (maxDate && endDate !== null) {
        endDate = min([endDate, maxDate])
      }
      nextFocusRange = [focusedRange[0], 1]
    } else {
      endDate = endOfDay(value)
    }

    // reverse dates if startDate before endDate
    let isStartDateSelected = focusedRange[1] === 0
    if (isBefore(endDate, startDate)) {
      isStartDateSelected = !isStartDateSelected;
      [startDate, endDate] = [startOfDay(endDate), endOfDay(startDate)]
    }

    const inValidDatesWithinRange = disabledDates.filter((disabledDate) =>
      isWithinInterval(disabledDate, {
        start: startDate,
        end: endDate,
      }),
    )

    if (inValidDatesWithinRange.length > 0) {
      if (isStartDateSelected) {
        startDate = addDays(max(inValidDatesWithinRange), 1)
      } else {
        endDate = addDays(min(inValidDatesWithinRange), -1)
      }
    }

    if (!nextFocusRange) {
      const nextFocusRangeIndex = findNextRangeIndex(
        this.props.ranges,
        focusedRange[0],
      )
      nextFocusRange = [nextFocusRangeIndex, 0]
    }
    return {
      wasValid: !(inValidDatesWithinRange.length > 0),
      range: { startDate, endDate },
      nextFocusRange,
    }
  }

  setSelection (value, isSingleValue) {
    const { onChange, ranges, onRangeFocusChange } = this.props
    const focusedRange = this.props.focusedRange || this.state.focusedRange
    const focusedRangeIndex = focusedRange[0]
    const selectedRange = ranges[focusedRangeIndex]
    if (!selectedRange) return
    const newSelection = this.calcNewSelection(value, isSingleValue)

    onChange({
      [selectedRange.key || `range${(focusedRangeIndex as number) + 1}`]: {
        ...selectedRange,
        ...newSelection.range,
      },
    })
    this.setState({
      focusedRange: newSelection.nextFocusRange,
      preview: null,
    })

    if (typeof onRangeFocusChange === 'function') {
      onRangeFocusChange(newSelection.nextFocusRange)
    }
  }

  setTime (value, type) {
    const { onChange, ranges } = this.props

    const focusedRange = this.props.focusedRange || this.state.focusedRange
    const focusedRangeIndex = focusedRange[0]
    const selectedRange = ranges[focusedRangeIndex]
    if (!selectedRange) return

    const startDate = type === 'startTime' ? value : selectedRange.startDate
    const endDate = type === 'endTime' ? value : selectedRange.endDate

    onChange({
      [selectedRange.key || `range${(focusedRangeIndex as number) + 1}`]: {
        ...selectedRange,
        startDate,
        endDate,
      },
    })
  }

  handleRangeFocusChange (focusedRange) {
    this.setState({ focusedRange })

    if (typeof this.props.onRangeFocusChange === 'function') {
      this.props.onRangeFocusChange(focusedRange)
    }
  }

  updatePreview (val) {
    if (!val) {
      this.setState({ preview: null })
      return
    }
    const { rangeColors, ranges } = this.props
    const focusedRange = this.props.focusedRange || this.state.focusedRange
    const color = ranges[focusedRange[0]].color || rangeColors[focusedRange[0]]
    this.setState({ preview: { ...val.range, color } })
  }

  render () {
    return (
      <Calendar
        focusedRange={this.state.focusedRange}
        onRangeFocusChange={this.handleRangeFocusChange}
        preview={this.state.preview}
        onPreviewChange={(value) => {
          this.updatePreview(value ? this.calcNewSelection(value) : null)
        }}
        {...this.props}
        displayMode="dateRange"
        className={cx(styles.dateRangeWrapper, this.props.className)}
        onChange={this.setSelection}
        onSetTime={this.setTime}
        updateRange={(val) => this.setSelection(val, false)}
        ref={(target) => {
          this.calendar = target
        }}
      />
    )
  }
}

export default DateRange
