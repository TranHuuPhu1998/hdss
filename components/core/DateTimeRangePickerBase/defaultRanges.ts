import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import endOfDay from 'date-fns/endOfDay'
import endOfMonth from 'date-fns/endOfMonth'
import endOfWeek from 'date-fns/endOfWeek'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import isSameDay from 'date-fns/isSameDay'
import startOfDay from 'date-fns/startOfDay'
import startOfMonth from 'date-fns/startOfMonth'
import startOfWeek from 'date-fns/startOfWeek'

const defineds = {
  startOfWeek: startOfWeek(new Date(), { weekStartsOn: 1 }),
  endOfWeek: endOfWeek(new Date(), { weekStartsOn: 1 }),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7), { weekStartsOn: 1 }),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7), { weekStartsOn: 1 }),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
}

const staticRangeHandler = {
  range: {},
  isSelected (range) {
    // @ts-ignore
    const definedRange = this.range()
    return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
    )
  },
  isDisabled (minDate, maxDate) {
    // @ts-ignore
    const currentRange = this.range()

    return (
      isBefore(currentRange.startDate, minDate) ||
      isAfter(currentRange.endDate, maxDate)
    )
  },
}

export function createStaticRanges (ranges) {
  return ranges.map((range) => ({ ...staticRangeHandler, ...range }))
}

export const defaultStaticRanges = createStaticRanges([
  {
    label: 'Hôm nay',
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday,
    }),
  },
  {
    label: 'Hôm qua',
    range: () => ({
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday,
    }),
  },

  {
    label: 'Tuần này',
    range: () => ({
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek,
    }),
  },
  {
    label: 'Tuần trước',
    range: () => ({
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek,
    }),
  },
  {
    label: 'Tháng này',
    range: () => ({
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth,
    }),
  },
  {
    label: 'Tháng trước',
    range: () => ({
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth,
    }),
  },
])

export const defaultInputRanges = [
  {
    label: 'Ngày trước',
    range (value, { minDate }) {
      if (value === null) {
        return {
          startDate: null,
          endDate: null,
        }
      }

      const startDate = addDays(
        defineds.startOfToday,
        (Math.max(Number(value), 1) - 1) * -1,
      )

      const nextStartDate = isAfter(minDate, startDate) ? minDate : startDate

      return {
        startDate: nextStartDate,
        endDate: defineds.endOfToday,
      }
    },
    getCurrentValue (range) {
      if (!isSameDay(range.endDate, defineds.endOfToday)) return ''
      if (!range.startDate) return '∞'
      return differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1
    },
    isDisabled (minDate, maxDate) {
      return (
        isAfter(minDate, startOfDay(new Date())) ||
        isBefore(maxDate, endOfDay(new Date()))
      )
    },
  },
  {
    label: 'Ngày từ hôm nay',
    range (value, { maxDate }) {
      if (value === null) {
        return {
          startDate: null,
          endDate: null,
        }
      }

      const today = new Date()
      const endDate = addDays(today, Math.max(Number(value), 1) - 1)
      const nextEndDate = isBefore(maxDate, endDate) ? maxDate : endDate

      return {
        startDate: today,
        endDate: nextEndDate,
      }
    },
    getCurrentValue (range) {
      if (!isSameDay(range.startDate, defineds.startOfToday)) return ''
      if (!range.endDate) return '∞'
      return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1
    },
    isDisabled (minDate, maxDate) {
      return (
        isBefore(maxDate, endOfDay(new Date())) ||
        isAfter(minDate, startOfDay(new Date()))
      )
    },
  },
]
