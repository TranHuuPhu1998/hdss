/* eslint-disable no-fallthrough */
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import endOfDay from 'date-fns/endOfDay'
import endOfWeek from 'date-fns/endOfWeek'
import format from 'date-fns/format'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import isSameDay from 'date-fns/isSameDay'
import isWeekend from 'date-fns/isWeekend'
import isWithinInterval from 'date-fns/isWithinInterval'
import startOfDay from 'date-fns/startOfDay'
import startOfWeek from 'date-fns/startOfWeek'

import React, { PureComponent } from 'react'

import DayCell from '../DayCell'
import { getMonthDisplayRange } from '../utils'

function renderWeekdays (styles, dateOptions) {
  const now = new Date()
  return (
    <div className={styles.weekDays}>
      {eachDayOfInterval({
        start: startOfWeek(now, dateOptions),
        end: endOfWeek(now, dateOptions),
      }).map((day, i) => (
        <span className={styles.weekDay} key={i}>
          {format(day, 'EEEEE', dateOptions)}
        </span>
      ))}
    </div>
  )
}

class Month extends PureComponent<any, any> {
  render () {
    const now = new Date()
    const {
      displayMode,
      focusedRange,
      drag,
      styles,
      disabledDates,
    } = this.props
    const minDate = this.props.minDate && startOfDay(this.props.minDate)
    const maxDate = this.props.maxDate && endOfDay(this.props.maxDate)
    const monthDisplay = getMonthDisplayRange(
      this.props.month,
      this.props.dateOptions,
    )
    let ranges = this.props.ranges
    if (displayMode === 'dateRange' && drag.status) {
      const { startDate, endDate } = drag.range
      ranges = ranges.map((range, i) => {
        if (i !== focusedRange[0]) return range
        return {
          ...range,
          startDate,
          endDate,
        }
      })
    }
    const showPreview = this.props.showPreview && !drag.disablePreview
    return (
      <div className={styles.month} style={this.props.style}>
        {this.props.showMonthName ? (
          <div className={styles.monthName}>
            Tháng {format(this.props.month, this.props.monthDisplayFormat)}
          </div>
        ) : null}
        {this.props.showWeekDays &&
          renderWeekdays(styles, this.props.dateOptions)}
        <div className={styles.days} onMouseLeave={this.props.onMouseLeave}>
          {eachDayOfInterval({
            start: monthDisplay.start,
            end: monthDisplay.end,
          }).map((day, index) => {
            const isStartOfMonth = isSameDay(day, monthDisplay.startDateOfMonth)
            const ihdbankfMonth = isSameDay(day, monthDisplay.endDateOfMonth)
            const isOutsideMinMax =
              (minDate && isBefore(day, minDate)) ||
              (maxDate && isAfter(day, maxDate))
            const isDisabledSpecifically = disabledDates.some((disabledDate) =>
              isSameDay(disabledDate, day),
            )
            return (
              <DayCell
                {...this.props}
                ranges={ranges}
                day={day}
                preview={showPreview ? this.props.preview : null}
                isWeekend={isWeekend(day)}
                // NOTE: backup `date-fns` version 2 beta.
                // isWeekend={isWeekend(day, this.props.dateOptions)}
                isToday={isSameDay(day, now)}
                isStartOfWeek={isSameDay(
                  day,
                  startOfWeek(day, this.props.dateOptions),
                )}
                ihdbankfWeek={isSameDay(
                  day,
                  endOfWeek(day, this.props.dateOptions),
                )}
                isStartOfMonth={isStartOfMonth}
                ihdbankfMonth={ihdbankfMonth}
                key={index}
                disabled={isOutsideMinMax || isDisabledSpecifically}
                isPassive={
                  !isWithinInterval(day, {
                    start: monthDisplay.startDateOfMonth,
                    end: monthDisplay.endDateOfMonth,
                  })
                }
                styles={styles}
                onMouseDown={this.props.onDragSelectionStart}
                onMouseUp={this.props.onDragSelectionEnd}
                onMouseEnter={this.props.onDragSelectionMove}
                dragRange={drag.range}
                drag={drag.status}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Month
